<template>
  <div>
    <waterfall :line="line"
      :lineGap="lineGap"
      :minLineGap = "minLineGap"
      :maxLineGap = "maxLineGap"
      :align= "align"
      :singleMaxWidth = "singleMaxWidth"
      :interval="0">
      <waterfall-slot v-for="(item, index)  in list" class="slot"
        :order="index"
        :width="width"
        :height="item.height"
        :key="index">
        <div class="slot-item" :style="{'background': getRandomColor()}">
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
    list: [{id: 1, height: 100},{id: 2, height: 50},{id: 3, height: 200},{id: 4, height: 130},{id: 5, height: 120},{id: 6, height: 110},{id: 7, height: 100},{id: 8, height: 50},{id: 9, height: 58},{id: 10, height: 176},{id: 11, height: 210},{id: 12, height: 80}]
  }),
  components: {
    Waterfall,
    WaterfallSlot
  },
  methods: {
    getRandomColor () {
      let color = ''
      for (let i = 0; i < 3; i++) {
        let c = Math.floor(Math.random() * 256).toString(16)
        c = c.length === 1 ? '0' + c : c
        color += c 
      }
      return '#' + color
    }
  }
}
</script>