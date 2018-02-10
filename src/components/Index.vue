<template>
    <div class = "box">
        <div class="panel panel-default">
            <div class="panel-heading">
                <subnav ref="subnav"></subnav>
            </div>
            <div class="panel-body">
                <div v-if = "loading" class="alert alert-info" role="alert">
                    数据加载中，请稍后......
                </div>
                <div v-if ="isError" class="alert alert-warning" role="alert">
                    数据加载失败......
                </div>
                <div v-if ="noData" class="alert alert-info" role="alert">
                    暂无数据
                </div>
                <div class="{'hidden':hidderTopic}">
                    <div class="cell item" v-for = "topic in topics">
                        <table class="table">
                            <tr>
                                <td class="item img">
                                    <router-link :to= "{name:'detail',params:{user_id: topic.id}}"><img class="avatar" :src="getImg(topic.member.avatar_normal)" alt=""></router-link>
                                </td>
                                <td class="item separator">
                                    
                                </td>
                                <td class="ta_l myfade">
                                    <span class="item title">
                                        <router-link :to="{name:'detail',params:{user_id: topic.id}}">{{topic.title}}</router-link>
                                    </span>
                                    <span class="small">
                                        <span class="topic title"><router-link class="node" :to="{name:'nodes',params:{name: topic.node.name}}">{{topic.node.title}}</router-link></span>
                                        &nbsp;•&nbsp;
                                        <span class="topic username"><strong><router-link :to="{name:'member',params:{id: topic.member.id}}">{{topic.member.username}}</router-link></strong></span>
                                        &nbsp;•&nbsp;
                                        <span class="topic created">{{topic.created | dateHelper}}</span> 
                                    </span>
                                </td>
                                <td class="reply-td"> 
                                   <router-link :to="{name:'detail',params:{user_id:topic.id}}" class="topic rc">{{topic.replies}}</router-link>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Subnav from './Subnav'
import {publicMethod} from '../public/dataInfo'
export default {
    name: 'index',
    data(){
        return {
            loading: true,
            isError: false,
            topics:[],
            hidderTopic: true,
            noData: false
        }
    },
    components:{
        Subnav
    },
    mounted: function () {
        // publicMethod('lijie');
        // var key = this.$route.query.tab;
        // console.log(key)
        // console.log(this.$route.query.tab)
        this.$nextTick(function () {
        this.initData();
        // console.log('index mounted');
      });
    },
    // created: function(){
    //     var key = this.$route.query.tab;
    //     if(!key){
    //         this.$route.query.tab = 'all';
    //     }

    // },
    watch:{
        '$route':function(){
            this.initData();
        }
    },
    beforeRouteEnter(to,from,next){
        // console.log('enter index component');
        next(vm =>{
            // console.log('next');
            // console.log(vm.$data);
        });
    },
    beforeRouteUpdate(to,from,next){
        // console.log('update index component route');
        next();
    },
    beforeRouteLeave(to,from,next){
        // console.log('leave index component');
        next();
    }
    ,
    filters:{
        getTime(timestamp){
            var result = '';
            var now = Date.parse(new Date()) / 1000;
            var seconds = now - timestamp;//获取秒数
            if(seconds < 1){
                result+= '刚刚';
                return result;
            }
            if(seconds  <10){
                result += '几秒前';
                return result;
            }
            var minutes = seconds / 60;
            if(minutes < 1){
                result += Math.floor(seconds) + '秒钟前';
                return result;
            }
            var hours = minutes / 60;
            if(hours < 1){
                result += Math.floor(minutes) + '分钟前';
                return result;
            }
            var days = hours / 24;
            if(days < 1){
                result += Math.floor(hours) + '小时前';
                return result;
            }else{
                result += Math.floor(days) + '天前';
                return result;
            }
        }
    },
    methods: {
        initData: function(){
            var key = this.$route.query.tab;
            // console.log(key)
            if(key == undefined){
                key = 'tech';
            }
            
            //根据key调取API,获取
            this.$http.get("/api/topics/latest.json").then(function(response){
                this.topics = [];
                this.loading = false;
                this.isError = false;
                var data = response.body;//Array
                if(key == 'all'){
                    this.topics = data;
                    this.noData =false;
                }else{
                    for(var topic of data){
                        var node = topic.node.name;
                        if(node == key){
                            this.topics.push(topic);
                        }
                    }
                    if(this.topics.length == 0){
                        this.hidderTopic = true;
                        this.noData = true;
                    }else{
                        this.hidderTopic =false;
                        this.noData = false;
                    } 
                }
            }).catch(function(err){
                console.log(err);
                this.isError = true;
                this.hidderTopic = true;
            })
        },
        getImg(url){
            var imgUrl = "http:" + url;
            return imgUrl;
        },
        
    }
}
</script>
<style>


.box .panel-body{
    padding: 0;
}
.topic{
    display: inline-block;
}
.topic.title{
    color: #999;
    padding: 4px;
}
.topic.rc{
    display: inline-block;
    width:50%;
    background-color: #aab0c6;
    color: #fff;
    font-size: 1.4;
    border-radius: 10px;
    text-decoration: none;

}
.node{
    text-decoration: none !important;  
    background-color: #ddd;
    border-radius: 2px;
    color: #999 !important;
    background-color: #f5f5f5;
}
.node:hover{
    background-color:#ccc;
}
.box .panel-heading{
    padding: 0;
}

.reply-td{
    width: 70px;
}

.alert{
    margin-top: 10px;
    margin-bottom: 0;
}
</style>
