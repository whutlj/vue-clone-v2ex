<template>
  <div class="lj-waterfall-slot">
    <slot></slot>
  </div>
</template>
<style>
  .lj-waterfall-slot {position: absolute;}
</style>
<script>
export default {
  name: 'WaterfallSlot',
  props: {
    width: {
      required: true,
      validator: (val) => val >= 0 
    },
    height: {
      required: true,
      validator: (val) => val >= 0
    },
    order: {
      default: 0
    }
  },
  data: ()=> ({
    isShow: false
  }),
  created () {
    // created还没有$el
    // console.log('子组件created')
    this.rect = {
      top: 0,
      left: 0,
      width: 0,
      height: 0
    }

    this.$watch(()=> (this.width, this.height), ()=> {
      this.notify()
    })

  },
  mounted () {
    // console.log('子组件挂载' + this.order)
    this.$parent.$once('reflowed', () => {
      this.isShow = true
    })
    this.notify()
  },
  beforeDestroy () {
    this.notify()
  },
  methods: {
    notify () {
      this.$parent.$emit('reflow', this)
      console.log('子组件触发')
    },
    getMeta () {
      return {
        vm: this,
        node: this.$el,
        order: this.order,
        width: this.width,
        height: this.height
      }
    }
  }
}
</script>