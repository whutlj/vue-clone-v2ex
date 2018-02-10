<template>
    <div class="detail">
        <div class="panel panel-default">
            <div class="panel-heading ta_l first">
                <div class="fr clearfix">
                    <img class="avatar" :src="getImg(content.member.avatar_large)">
                </div>
                <router-link :to = "{name:'index'}">V2EX</router-link>
                <span> > </span>
                <span class="">{{content.node.title}}</span>
                <h3>{{content.title}}</h3>
                <span class="small myfade">
                    <span><strong><router-link :to="{name:'member',params:{id: content.member.id}}">{{content.member.username}}
                    </router-link></strong></span>
                    &nbsp;•&nbsp;
                    <span >{{content.created | dateHelper}}</span> 
                </span>
            </div>
            <div class="panel-body ta_l" v-html="content.content_rendered"></div>
            <div class="panel-footer ta_l">
                <span class="ft">加入收藏</span>
                <span class="ft">Tweet</span>
                <span class="ft">Weibo</span>
                <span class="ft">忽略主题</span>
            </div>
        </div>
        <div class="reply ta_l">
            <div class="panel panel-default">
                <div class="panel-heading second">
                    <div class="title">
                        <span>{{replies.length}}回复</span>
                        &nbsp;|&nbsp;
                        <span>直到{{content.last_touched | toLocale}}</span>
                    </div>
                </div>
                <div class="panel-body">
                    <div class="cell item" v-for="reply in replies">
                        <table class="table">
                            <td class="item img">
                                <router-link :to="{name:'member',params:{id:reply.member.id}}"><img class="avatar" :src="getImg(reply.member.avatar_normal)" alt=""></router-link>
                            </td>
                            <td class="item separator"></td>
                            <td>
                                <span><router-link :to="{name:'member',params:{id:reply.member.id}}">{{reply.member.username}}</router-link></span>&nbsp;&nbsp;
                                <span>{{reply.last_modified | dateHelper}}</span><br>
                                <span v-html="reply.content_rendered"></span>
                            </td>
                        </table>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    name: 'detal',

    data(){
        return {
            content:{},
            replies:[]
        }
    },
    mounted(){
        this.$nextTick(function(){
            this.initContent();
        });
    },
    filters: {
        toLocale(timestamp){
            // console.log(timestamp);
            var last_reply = new Date()
            last_reply.setTime(timestamp * 1000);
            return last_reply.toLocaleString();
            
        }
    },
    watch:{
        '$route' : function(){
            this.initContent();
        }
    },
    methods:{
        initContent: function(){
            var userId = this.$route.params['user_id'];
            this.$http.get("/api/topics/show.json?id=" + userId).then(function(response){
                var data = response.body[0];
                this.content = data;
                // console.log(this.content.content)
                var topicId = this.content.id;
                return this.$http.get("/api/replies/show.json?topic_id=" + topicId);
            }).then(function(response){
                this.replies = response.body;
            }).catch(function(err){
                console.log(err);
            });
        },
         getImg(url){
            var imgUrl = "http:" + url;
            return imgUrl;
        },
    }

}
</script>

<style>
.detail{
    position: relative;
    overflow: hidden;
    background-color: #ddd;
}
.detail .first.panel-heading{
    min-height: 93px;
}

.detail h3{
    margin: 0 0 5px 0;
    line-height: 36px;
}
.ss{
    height: 5px;
}
.detail .panel-footer{
    padding: 4px;
}
.reply{
    margin-top: 50px;
}
.ft{
    display: inline-block;
    border-radius: 5px; 
    margin-left: 10px;
    cursor: pointer;
    padding: 1px;
}
.ft:hover{
    background-color: #ff0;
}

.reply .panel-body{
    padding: 0;
}
</style>