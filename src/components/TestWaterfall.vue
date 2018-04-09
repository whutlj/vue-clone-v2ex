<template>
  <div>
    <waterfall :line="line"
      :lineGap="lineGap"
      :minLineGap = "minLineGap"
      :maxLineGap = "maxLineGap"
      :align= "align"
      :singleMaxWidth = "singleMaxWidth"
      @reflowed="reflowed"
      :interval="0">
      <waterfall-slot v-for="(item, index)  in list" class="slot"
        :order="index"
        :width="width"
        :height="item.height"
        :key="index">
        <div class="slot-item" :style="{'background': item.background}">
          这是第{{index}}个
        </div>
      </waterfall-slot>
    </waterfall>
  </div>
</template>
<style>
.slot {padding: 5px;}
.slot-item {width: 100%;height: 100%;overflow: hidden;}
</style>
<script>
import {ItemFactory, on, off} from '@/assets/js/utils.js'
import Waterfall from './common/Waterfall'
import WaterfallSlot from './common/WaterfallSlot'
export default {
  data: () => ({
    line: 'v',
    lineGap: 200,
    minLineGap: 150,
    singleMaxWidth: 200,
    maxLineGap: 240,
    width: 220,
    height: 180,
    align: 'center',
    grow: [1, 2, 2, 1],
    list: ItemFactory.generateItem(40)
  }),
  components: {
    Waterfall,
    WaterfallSlot
  },
  mounted () {

    on(window, 'scroll', this.scrollAddItem, false)
  },
  beforeDestroy () {
    off(window, 'scroll', this.scrollAddItem, false)
  },
  methods: {
    reflowed () {
      console.log('父组件重拍完毕')
    },
    scrollAddItem() {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      if(scrollTop + window.innerHeight >= document.body.clientHeight) {
        this.list.push.apply(this.list, ItemFactory.generateItem(20))
      }
    }
  }
}
  
</script>