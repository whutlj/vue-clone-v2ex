<template>
    <div class="pleftNav ta_l  visible-xs-block">
        <div class="left">
            <ul class="nav nav-stacked">
              <li class="lfbar" :class="{a:isCurrent('index')}" @click.stop="close"><router-link  :to = "{name: 'index'}" >首页</router-link></li>
              <li class="lfbar" :class="{a:isCurrent('userlogin') }" @click.stop="close"><router-link  :to = "{name: 'userlogin'}">登录</router-link></li>
              <li class="lfbar" :class="{a:isCurrent('swiper')}" @click.stop="close"><router-link  :to = "{name: 'swiper'}">注册</router-link></li>
            </ul>
        </div>
        
    </div>    
</template>
<script>
    export default {
        name: 'pleftNav',
        created(){
            this.current = this.$route.name;
        },
        watch:{
            '$route': function(){
                this.current = this.$route.name;
            }
        },
        data(){
            return {
                current: ''
            }
        },
        methods:{
            isCurrent(param){
                return this.current == param;
            },
            close(){
                // $('.container').toggleClass('leftopen');            
            }
        }
    }
</script>
<style>
    .left{
        display: none;
    }
    .leftopen .left{
        position: absolute;
        left: 0;
        top: 0;    
        width: 120px;
        height: 100%;
        padding-top: 15px;
        background-color: #333;
        display: block;
        /*display: block !important;*/
    }
    .lfbar:before{
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        /*display: block;*/
        height:100%;
        width: 0;
        background-color: #1c1c1c;
        -webkit-transition: width 0.2s ease-in;
        transition: width 0.2s ease-in;
        
    }
    .lfbar:hover:before,.a:before{
        width: 100%;
        /* -webkit-transition: width 0.2s ease-out;
        */transition: width 0.2s ease-out;
    }
    
    
    .nav>.lfbar>a:focus,.nav>.lfbar>a:hover{
    text-decoration: none;
    background-color: inherit ;
}

</style>