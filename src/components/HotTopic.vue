<template>
    <div class="ht ta_l">
    <div class="panel panel-default">
        <div class="panel-heading">
            <span class="myfade">今日热议话题</span>
        </div>
        <div class="panel-body">
              <div class="cell" v-for = "hot in hots">
        <table class="table" >
            <tr v-cloak>
                <td class ="ht img">
                    <router-link :to ="{name:'detail',params:{user_id:hot.id}}"> <img :src="'http:'+ hot.member.avatar_mini">
                    </router-link>
                </td>
                <td class="separator"></td>
                <td>
                   <router-link :to = "{name:'detail',params:{user_id: hot.id}}" v-html = "hot.title"></router-link> 
                </td>
            </tr>
        </table>
       </div>
        </div>
    </div>

  
    </div>
</template>
<script>
export default {
    name: 'hottopic',
    data(){
        return {
            hots:[]
        }
    },
    mounted(){
        this.$nextTick(function(){
            this.initHot();
        });
    },
    methods:{
        initHot(){
            this.$http.get('/api/topics/hot.json').then(function(response){
                this.hots = response.body;

            }).catch(function(err){
                console.log(err);
            });
        }
    }
}
</script>
<style>
    .ht{
        background-color: #fff;
    }
    .ht .panel-body{
        padding: 0;
    }
    .ht.img{
        width: 24px;
    }
</style>