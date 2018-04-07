<template>
<div class="login-box">
    <div class="panel panel-default">
        <div class="panel-heading ta_l">
            <router-link :to = "{name:'index'}">V2EX</router-link>
            <span> > </span>
            <span class="">登录</span>
        </div>
        <div class="panel-body ">
           <form class="form-horizontal">
           <div class="form-group has-feedback has-success">
            <label class="control-label col-sm-3 col-xs-3 " for="user">用户名</label>
            <div class="col-sm-9 col-xs-9">
              <input type="text" class="form-control" v-model="inputName" id="user" placeholder="输入用户名或邮箱">
              <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
            </div>
           </div>
           <div class="form-group has-success has-feedback">
            <label class="control-label col-sm-3 col-xs-3" for="pwd">密码</label>
            <div class="col-sm-9 col-xs-9">
              <input type="text" class="form-control " id="pwd">
              <span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>
            </div>
           </div>
            <button type="button" class="btn btn-primary btn-sm" @click="login">登录</button>  
            <button type="button" class="btn btn-danger btn-sm" @click="logout">退出</button>
           </form>
        </div>
    </div>
    <!-- <subnav></subnav> -->
    <div>
      <button type="button" @click="refreshRoute">点击</button>
    </div>
</div>

</template>
<script>
// import Subnav from './Subnav'
import message from '@/assets/message.js'
import {person} from '@/assets/js/constants.js'
export default {
    name: 'UserLogin',
    data(){
      return {
        from: '',
        inputName: ''
      }
    },
    beforeRouteEnter:function(to,from,next){
      console.log(from);
      console.log(to);
      next(vm=>{
        vm.from = from.name;
        next();
      });
    },
     beforeRouteUpdate (to, from, next) {
        this.init()
        next()
      },
    methods:{
      login(){
        this.$store.commit('login');
        // alert('登录成功');
        //路由跳转
        if(!this.from){
          this.$router.replace({name:this.from});
        }else{
          this.$router.replace({name:'index'});
        }
      },
      init (){
        this.inputName = 'lj'
        console.log('初始化')
      },
      logout(){
        this.$store.commit('logout');
        this.$router.push({name:'index'});
      },

      refreshRoute () {
        // this.$router.push({
        //   name: this.$route.name,
        //   query: {timestamp: new Date().getTime()}
        // })
        // message.$emit('onComponentMessage', {param: 1})
        person.count = person.count + 1
        console.log(person)
      }
    }
}
</script>
<style scoped>
@media (max-width: 768px){
  .control-label{
    margin-bottom: 0;
    padding: 7px;
    text-align: right;
  }
} 
/*.boxshadow{
  border: 1px solid #ccc;
  border-radius: 4px;

}
.boxshadow:focus{
  outline: none;
  border-color: #66afe9;
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
}*/

.modal-mark {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      overflow: auto;
      background: #000;
      opacity: .4;
      z-index: 1000;
    }
  
  .lj-modal {
    position: fixed;
    top: 20px;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    width: 500px;
    height: 200px;
    margin: 0 auto;
    background: #fff;
    z-index: 1000;
  }
</style>
