<template>
  <div id="app" class="row">
    <div class="container">
      <div class="navbar navbar-default t-left hidden-xs">
        <router-link class="head-title" :to="{name:'index'}">
          <span class="title">V2EX CLONE</span>
        </router-link >
        <ul class="nav navbar-nav p-right">
          <li><router-link :to = "{name: 'index',query:{tab:home}}" replace>首页</router-link></li>
          <li><router-link :to = "{name: 'userlogin'}" replace>登录</router-link></li>
          <li><router-link :to="{name:'swiper'}" replace>注册</router-link></li>
        </ul>
      </div>
      
      
    <div class="wrapper">
        <phone-left></phone-left>
        <phoneNav></phoneNav>
        <!-- <div class="rightbar hidden-xs" > -->
         <div class="main">
        <!-- <transition name="fade"> -->
        <router-view class="main-left"></router-view>
        
        <!-- </transition> -->
        <!-- <V2ex></V2ex> -->
        </div>
        <div class="rightbar" >
        <div class="panel panel-default">
            <div class="panel-heading">
              <strong>V2EX = way to explore</strong>
              <span class = "grey">V2EX 是一个关于分享和探索的地方</span>
            </div>
            <div class="panel-body">
              <router-link :to = "{name:'swiper'}"><button class="registBtn btn btn-default">现在注册</button></router-link replace>
              <p class="mt_10">已注册用户请 <router-link :to="{name: 'userlogin'}" replace>登录</router-link></p>
            </div>
        </div>
          <div class="sep20"></div>
        <hot-topic class="rightbar1"></hot-topic>
        <status class="rightbar1"></status>
        </div>
       
    </div>
    </div>
  </div>
</template>

<script>
// export default {} 经过vue-loader后返回组件对象
import HotTopic from './HotTopic'
import Status from './Status'
import PhoneNav from './phoneNav'
import PhoneLeft from './PhoneLeft'
export default {
  name: 'app',
  data: function(){
    return{
      home:"all",
      isPhone: false
    }
  },
  components: {
    HotTopic,Status,PhoneNav,PhoneLeft
  },
  mounted(){
    window.onresize = function(){
      var userAgent = navigator.userAgent;
      var h5 =/Android|H5|IPHONE/i.test(userAgent);
      if(!h5){
        $('.container').removeClass('leftopen');
        // console.log(userAgent)
      }
    };
    this.$nextTick(function(){
      // console.log("change")
      // store.commit('increment');
    });
  },
  methods:{
    add(){
      jQuery.noConflict();
      this.$http.get('/api/topics/hot.json').then(function(response){
        // console.log(response.body);
      }).catch(function(err){
        console.log(err);
      });
    }
    /*ajax跨域访问v2ex不能获取数据
      $.ajax({
        // https://www.v2ex.com/api/topics/hot.json
        type: 'get',
        url: 'https://www.v2ex.com/api/topics/hot.json',
        dataType: 'jsonp',
        crossDomain: true,
        jsonpCallback: 'handleData',
        success: function(data){
          console.log(data);
        }
      });
    },
    */
    /*ajax跨域访问豆瓣api，可以获取到数据
      $.ajax({
        // https://www.v2ex.com/api/topics/hot.json
        type: 'get',
        url: 'https://api.douban.com/v2/book/search?q=javascript&count=2',
        dataType: 'jsonp',
        crossDomain: true,
        jsonpCallback: 'handleData',
        success: function(data){
        console.log( data)
        var books = data["books"];
        console.log(books);
        var len = books.length;
        for(var i = 0;i<len;i++){
          console.log(books[0].summary);
        }
        }
      });
    },
    */
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
[v-cloak]{
  display: none;
}
body{
  background-color: #ddd;
  overflow-y: scroll;
  overflow-x: hidden;
}
.navbar{
  min-height: 0px;
  margin-bottom: 10px;
}


.item.img{
    width:48px;
    vertical-align: top;
}
.avatar{
    border-radius: 4px;
}
.item.title{
    font-size: 16px;
    display: block;
}
.separator{
    width: 10px;
}
.fr{
    float: right;
}
.head-title{
  display: inline-block;
  font-size: 24px;
  font-weight: 900;
  height: 50px;
  line-height: 50px;
  padding: 0 15px;
}
.head-title, .head-title:hover,.head-title:focus{
  text-decoration: none ;
  color: #000 ;
}
.panel-body{
  min-height: 0;
}
.p-right{
  float: right;
}
.t-left{
  text-align: left;
}
.myfade{
    color: #ccc !important;
}

@media (min-width: 768px){
    .rightbar{
    float: right;
    width: 30%;
    padding-left: 1em;
  }
  .main{
    float: left;
    width: 70%;
  }
}


@media screen and (max-width: 768px){
    .rightbar{
    /*display: inline-block;
    width: 100%;*/
    display: block;
    /*padding-left: 0;*/
    /*min-width: 500px;*/
  }
   /*.rightbar1{
    display: inline-block;
    width: 100%;
  }*/
  .main{
    /*display: inline-block;
    width: 100%;*/
    display: block;
    /*min-width: 500px;*/
  }
}

.table{
    margin-bottom: 0;
}
.cell{
  border-bottom: 1px solid #ddd;
   padding: 10px;
}
.fade{
  display: block;
  color: #ccc;
}
.panel{
  border: 1px solid inherit;
}
.grey{
  color: #ccc;
  display: block;
  margin-top: 5px;
}
.panel-body a,.panel-heading a{
 color: #778087; 
}

.mt_10{
  margin-top: 10px;
}
.main{
  background-color: #f8f8f8;
  overflow: hidden;
}
.ta_l{
  text-align: left;
}
.ta_c{
  text-align: center;
}
.panel{
  margin-bottom: 0;
}
.clearfix{
  zoom:0;
}

.clearfix:after{
  content:'.';
  display:block;
  clear:both;
  height:0;
  line-height:0;
  font-size:0;
  visibility:hidden
}

.sep20{
  height: 20px;
}
.leftopen .wrapper{
  margin-left:120px;
  margin-right: -120px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0
}

</style>
