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
    align: {
      default: 'left',
      validator:(val) => ~['left', 'center', 'right'].indexOf(val)
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
    }
  },
  data: () => ({
    
  }),
  created () {
    this.$watch(() => (
      this.autoResize,
      this.line,
      this.align,
      this.maxLineGap,
      this.minLinGap,
      this.singleMaxWidth
    ), this.reflowHandle)
  },
  methods: {
    autoResizeHandle,
    reflowHandle
  },
  // utils
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
    if (!)
  }


  function on (ele, type, listener, useCapture = false) {
    // 默认参数, 表示在冒泡阶段调用事件处理
    ele.addEventListener(type, listener, useCapture)
  }
  
  function off (ele, type, listener, useCapture = false) {
    ele.removeEventListener(type, listener, useCapture)
  }


}
</script>