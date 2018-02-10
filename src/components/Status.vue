<template>
    <div class="site ta_l" v-cloak>
        <div class="panel panel-default">
            <div class="panel-heading">
                <span class="myfade">
                    社区运行状况
                </span>
            </div>
            <div class="panel-body">
                <div>注册会员：{{memberMax}}</div>
                <div>主题：{{topicMax}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'site',
        data(){
            return {
                topicMax :'',
                memberMax : ''
            }
        },
        mounted(){
            this.$nextTick(function(){
                this.initSite();
            });
        },
        methods: {
            initSite(){
                this.$http.get('/api/site/stats.json').then(function(response){
                    this.topicMax = response.body.topic_max;
                    this.memberMax = response.body.member_max;
                    // console.log(response)
                }).catch(function(err){
                    console.log(err);
                });
            }
        }
    }
</script>

<style>
    
</style>