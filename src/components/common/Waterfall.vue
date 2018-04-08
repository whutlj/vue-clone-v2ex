<template>
  <div class="lj-waterfll">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Waterfall',
  prpos: {
    autoResize: {
      default: true
    },
    interval: {
      default: 200,
      validator: (val) => val >= 0
    }
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
    minLinGap: {
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
    // 多个数据变化执行统一函数，用函数检测
    this.virtualRects = []
    this.$watch(() => (
      this.autoResize,
      this.line,
      this.align,
      this.maxLineGap,
      this.minLinGap,
      this.singleMaxWidth,
      this.fixHeight,
      this.grow
    ), this.reflowHandler)
    this.$on('reflow', () => {
      this.reflowHandler()
    })
  },
  mounted () {
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
    setTimeout(this.reflow, this.interval)
  }

  function reflow () {
    // 先确保组件挂载到Dom
    if (!this.$el) return
    let width = this.$el.clientWidth
    // $children 并不能保证顺序，所以需要根据根据传入的order确定位置
    let metas = this.$children.map((slot) => child.getMeta())
    // 从小到大进行排序
    metas.sort((a, b) => (a.order - b.order))
    this.virtualRects = metas.map(() => ({}))
    calculate(this, metas, this.virtualRects)
  }

  function calculate (vm, metas, rects) {
    let processor = vm.line === 'h' ? horizontalProcessor : verticalProcessor
    let options = getOptions(vm)
    processor.calculate(vm, metas, rects, options)
  }

  const verticalProcessor = (() => {
    // 这是为了计算每个slot的宽高
    function calculate(vm, metas, rects, options) {
      let width = vm.$el.clientWidth
      let grow = options.grow
      let strategy = grow ? getRowStrategyWithGrow (width, grow) : gtRowStrategy (width, options)

    }

    function getRowStrategy (width, options) {
      let count = width / options.lineGap // 带有小数的个数
      let slotWidth
      if (lineGap >= width) {
        count = 1
        slotWidth = width
      } else {
        let maxContentWidth = options.maxLineGap * ~~count 
        let minContentGreedyWidth = options.minLinGap * ~~(count + 1)
        let canFit = maxContentWidth >= width
        let canFitGreedy = minContentGreedyWidth <= width
        if (canFit && canFitGreedy) {
          count = Math.round(count)
          slotWidth = width / count
        } else if (canFit) {
          count = 
          slotWidth = 
        } else if (canFitGreedy) {
          slotWidth = 
          count = 
        }
      
      }

      

      return {
        width: ,
        count: ,
        left: 
      }
    }

    function getRowStrategyWithGrow (width, grow) {
      let total = sum(grow)
      return {
        width: grow.map((cur) => width * cur / total)
        count: grow.length,
        left: 0
      }
    }

    function getRowStrategy (width, options) {

    }
    return {
      calculate: calculate
    }
  })()

  const horizontalProcessor = (()=> {
    console.log('水平')
  })()



  function getOptions (vm) {
    const maxLineGap = vm.maxLineGap ? +vm.maxLineGap : +vm.lineGap
    const minLinGap = vm.minLinGap ? +vm.minLinGap : +lineGap
    return {
      lineGap: +vm.lineGap,
      maxLineGap: maxLineGap,
      minLinGap: minLinGap,
      align: ~['left', 'center', 'right'].indexOf(vm.align) ? vm.align : 'left'
      fixHeight: !!vm.fixHeight,
      grow: vm.grow && vm.grow.map((val)=> val)
    }
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