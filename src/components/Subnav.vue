<template>
<div class="inner-nav ta_c">
    <nav class="nav nav-pills">
        <li v-for="item in tabs" :class="{'active': isTheTab(item.key)}" role="presentation">
            <router-link :to = "{name: 'index',query:{tab:item.key}}">{{item.value}}</router-link>
        </li>
    </nav>    
       
</div>
</template>
<script>
export default {
    name: 'subnav',
    data: function(){
      return {
        tabs:[
          {key: 'tech', value: '技术'},
          {key: 'creative', value: '创意'},
          {key: 'play', value: '好玩'},
          {key: 'apple', value: 'Apple'},
          {key: 'jobs', value: '酷工作'},
          {key: 'deals', value: '交易'},
          {key: 'city', value: '城市'},
          {key: 'qna', value: '问与答'},
          {key: 'hot', value: '最热'},
          {key: 'all', value: '全部'},
          {key: 'r2', value: 'R2'}
        ],
        home:'all'
      }
    },
    created: function(){
      this.$route.query.tab = this.home;
    } ,
    methods:{
        isTheTab(key){
          // console.log(this.$route.query.tab)
          return this.$route.query.tab === key;
        }
    }
}
</script>
<style>
.inner-nav{
    min-height: 0px;
    /*max-height: 50px;*/
    padding: 2px 2px;
}

</style>
