<template>
  <div class="lj-waterfll">
    <slot></slot>
  </div>
</template>
<style>
  .lj-waterfll{position: relative;overflow: hidden;}
</style>
<script>
export default {
  name: 'Waterfall',
  props: {
    autoResize: {
      default: true
    },
    interval: {
      default: 200,
      validator: (val) => val >= 0
    },
    align: {
      default: 'left',
      validator: (val) => ~['left', 'center', 'right'].indexOf(val)
    },
    line: {
      default: 'v',
      validator: (val) => ~['v', 'h'].indexOf(val) // indexOf是===全等
    },
    lineGap: {
      default: 200,
      validator: (val) => val >= 0
    },
    maxLineGap: {
      validator: (val) => val >= 0
    },
    minLineGap: {
      validator: (val) => val >= 0
    },
    singleMaxWidth: {
      validator: (val) => val >= 0
    },
    fixHeight: {
      default: false
    },
    grow: {
      type: Array
    }
  },
  data: () => ({
    token: null
  }),
  created () {
    console.log('父组件created')
    // 多个数据变化执行统一函数，用函数检测
    this.virtualRects = []
    this.$watch(() => (
      this.autoResize,
      this.line,
      this.align,
      this.maxLineGap,
      this.minLineGap,
      this.singleMaxWidth,
      this.fixHeight,
      this.grow
    ), this.reflowHandler)
    this.$on('reflow', () => {
      this.reflowHandler()
    })
  },
  mounted () {
    console.log('父组件挂载')
    this.$watch("autoResize", this.autoResizeHandler)
    on(this.$el, getTransitionEndEvent(), tidyUpAnimations, true)
    this.autoResizeHandler(this.autoResize)
  },
  beforeDestroy () {
    off(this.$el, getTransitionEndEvent(), tidyUpAnimations, true)
    this.autoResizeHandler(false)
  },
  methods: {
    autoResizeHandler,
    reflowHandler,
    reflow
  }
}

function getTransitionEndEvent () {
    let isWebkitTransition = window.ontransitionend === undefined && window.onwebkittransitionend !== undefined
    return isWebkitTransition ? 'webkitTransitionEnd' : 'transitionend'
  }

  function tidyUpAnimations (event) {
    let node = event.target
    let moveClass = node[MOVE_CLASS_PROP]
    if (moveClass) {
      removeClass(node, moveClass)
    }
  }

  function autoResizeHandler (autoResize) {
    if (autoResize === false || !this.autoResize) {
      off(window, 'resize', this.reflowHandler, false)
    } else {
      on(window, 'resize', this.reflowHandler, false)
    }

  }


  function reflowHandler () {
    clearTimeout(this.token)
    this.token = setTimeout(this.reflow, this.interval)
  }

  function reflow () {
    // 先确保组件挂载到Dom
    if (!this.$el) return
    let width = this.$el.clientWidth
    // $children 并不能保证顺序，所以需要根据根据传入的order确定位置
    let metas = this.$children.map((slot) => slot.getMeta())
    // 从小到大进行排序
    metas.sort((a, b) => (a.order - b.order))
    this.virtualRects = metas.map(() => ({}))
    // 已已经计算好大小位置，等待赋值
    // 当前所有事件(同步事件和消息队列中的任务执行完毕，再下一轮事件循环开始时执行)
    setTimeout(() => {
      // 箭头函数已经绑定this，不用再换指向，如果不是箭头函数，执行时this将指向window
      let curWidth = this.$el.width
      if (curWidth !== width) {
        calculate(this, metas, this.virtualRects)
      }
      // 给dom元素设置属性
      applyRect(metas, this.virtualRects)
      // 触发渲染完毕的事件，显示slot
      this.$emit('reflowed')
    }, 0)
  }

  function calculate (vm, metas, rects) {
    let processor = vm.line === 'h' ? horizontalProcessor : verticalProcessor
    let options = getOptions(vm)
    processor.calculate(vm, metas, rects, options)
  }

  function getOptions (vm) {
    const maxLineGap = vm.maxLineGap ? +vm.maxLineGap : +vm.lineGap
    const minLineGap = vm.minLineGap ? +vm.minLineGap : +vm.lineGap
    return {
      lineGap: +vm.lineGap,
      maxLineGap: maxLineGap,
      minLineGap: minLineGap,
      align: ~['left', 'center', 'right'].indexOf(vm.align) ? vm.align : 'left',
      fixHeight: !!vm.fixHeight,
      grow: vm.grow && vm.grow.map((val)=> val),
      singleMaxWidth: Math.max(vm.singleMaxWidth || 0, maxLineGap)
    }
  }

  const verticalProcessor = (() => {
    // 这是为了计算每个slot的宽高
    function calculate(vm, metas, rects, options) {
      let width = vm.$el.clientWidth
      let grow = options.grow
      let strategy = grow ? getRowStrategyWithGrow (width, grow) : getRowStrategy (width, options)
      // 宽度和列数确定后，确定位置,tops位每一列的高度存放
      let tops = getArrayFillWith(0, strategy.count)
      // 对每一个meta进行位置设置
      metas.map((meta, index) => {
        //找到tops中位置最低的一个,last为上计算后的值，最小位置,找到到最小的位置 
        let offset = tops.reduce((last, cur, i) => cur < tops[last] ? i : last, 0)
        let width = strategy.width[offset % strategy.count]
        let rect = rects[index]
        rect.top = tops[offset]
        rect.left = strategy.left + (offset ? sum(strategy.width.slice(0, offset)) : 0)
        rect.width = width
        rect.height = meta.height * (options.fixHeight ? 1 : width / meta.width)
        tops[offset] = tops[offset] + rect.height
      })
      vm.$el.style.height = Math.max.apply(Math, tops) + 'px'
    }

    function getRowStrategy (width, options) {
      let count = width / options.lineGap // 带有小数的个数
      let slotWidth
      if (options.singleMaxWidth >= width) {
        count = 1
        slotWidth = Math.max(width, options.minLineGap)
      } else {
        let maxContentWidth = options.maxLineGap * ~~count 
        let minContentGreedyWidth = options.minLineGap * ~~(count + 1)
        let canFit = maxContentWidth >= width
        let canFitGreedy = minContentGreedyWidth <= width
        console.log('canFit:' + canFit)
      console.log('canFitGreedy:' + canFitGreedy)
        if (canFit && canFitGreedy) {
          count = Math.round(count)
          slotWidth = width / count
        } else if (canFit) {
          count = ~~count
          slotWidth = width / count
        } else if (canFitGreedy) {
          count = ~~(count + 1)
          slotWidth = width / count 
        } else {
          count = ~~count
          slotWidth = options.maxLineGap
        }
        
        if (count === 1) {
          slotWidth = Math.min(width, options.singleMaxWidth)
          slotWidth = Math.max(slotWidth,options.minLineGap)
        }
      }


      return {
        width: getArrayFillWith(slotWidth, width),
        count: count,
        left: getLeft(width, slotWidth * count, options.align)
      }
    }

    function getRowStrategyWithGrow (width, grow) {
      let total = sum(grow)
      return {
        width: grow.map((cur) => width * cur / total),
        count: grow.length,
        left: 0
      }
    }

    return {
      calculate: calculate
    }
  })()

 function applyRect (metas, rects) {
    metas.forEach((meta, index) => {
      metas[index].vm.rect = rects[index]
      let style = meta.node.style
      let rect = rects[index]
      for(let prop in rect) {
        style[prop] = rect[prop] + 'px'
      }
    })
 }

  const horizontalProcessor = (()=> {
    function calculate () {
      console.log('水平')
    }
    return {
      calculate: calculate
    }
  })()

  function getLeft (width, contentWidth, align) {
    switch(align) {
      case 'right': return width - contentWidth
      case 'center': return (width - contentWidth) / 2
      default: return 0
    }
  }
  function getArrayFillWith (item, count) {
    let getter = (typeof item === 'function') ? () => item() : () => item
    let arr = []
    for (let i = 0; i < count; i++) {
      arr[i] = getter()
    }
    return arr
  }


  // utils
  function sum (arr) {
    return arr.reduce((a, b) => a + b, 0)
  }

  function attr(ele, name, value) {
    if (value !== undefined) {
      ele.setAttribute(name, value)
    } else {
      ele.getAttribute(name)
    }
  }
  
  function hasClass(ele, name) {
    return new RegExp('\\b' + name + '\\b').test(attr(ele, 'class'))
  }

  function addClass(ele, name) {
    if (!hasClass(ele, name)) {
      let cur = attr(ele, 'class')
      let res = (cur + ' ' + name).trim()
      attr(ele, 'class', res)
    }
  }

  function removeClass(ele, name) {
    if (hasClass(ele, name)) {
      let cur = attr(ele, 'class')
      let res = cur.replace(new RegExp('\\s*\\b' + name + '\\b\\s*', 'gi'), ' ')
      attr(ele, 'class', res)
    }
  }


  function on (ele, type, listener, useCapture = false) {
    // 默认参数, 表示在冒泡阶段调用事件处理
    ele.addEventListener(type, listener, useCapture)
  }
  
  function off (ele, type, listener, useCapture = false) {
    ele.removeEventListener(type, listener, useCapture)
  }

</script>