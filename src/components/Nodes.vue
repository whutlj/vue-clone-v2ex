<template>
    <div class="nodes ta_l">
       <div class="cell">
           <table class="table">
               <td class="img">
                    <img :src="'http:'+ nodes.avatar_large">
               </td>
               <td>
                    <router-link :to = "{name:'index'}">V2EX</router-link>
                    <span> > </span>
                    <span class="">{{nodes.title}}</span>
                    <span>主题数：{{nodes.topics}}</span>
                    <div>{{nodes.header}}</div>                   
               </td>
           </table>
       </div> 
    </div>
</template>

<script>
export default {
    name: 'nodes',
    data(){
        return{
            nodes: {},
            index: 1,//当前是第几页
            name: '',//当前主题的名字
        }
    },
    mounted(){
        this.$nextTick(function(){
            this.name = this.$route.params.name;
            this.initNode();
        });
    },
    watch:{
        "$route" : function(){
            // console.log('watch')
            this.initNode();
        }
    },
    methods: {
        initNode(){
            var name = this.$route.params.name;
            this.$http.get('api/nodes/show.json',{params:{name:name}}).then(function(response){
                this.nodes = response.body;
            }).catch(function(err){
                console.log(err);
            });
        }
    }
}
</script>

<style>
.nodes .img{
    width: 73px;
}
</style>