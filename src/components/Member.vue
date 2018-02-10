<template>
    <div class="member ta_l">
         <img class="mb" :src="'http:'+ member.avatar_large">
         <div class="mb mb-info">
             <strong class="block">{{member.username}}</strong> 
             <div class = "myfade">
                 V2EX第{{member.id}}号会员，加入于{{member.created | toLocale}}
             </div>
         </div>
    </div>
</template>
<script>
export default {
    name: 'member',
    data(){
        return {
            member: {}
        }
    },
    mounted(){
        this.$nextTick(function(){
            this.initMember();
        });
    },
    methods: {
        initMember(){
            var member_id = this.$route.params.id;
            this.$http.get('/api/members/show.json',{params:{id:member_id}}).then(function(response){
                this.member = response.body;

            }).catch(function(err){
                console.log(err);
            });
        }
    }


}
</script>
<style>
.member{
    padding: 12px;
}
.mb{
    display: inline-block;
}
.mb img{
    border-radius: 4px;
}
.mb-info{
    margin-left: 10px;
}
</style>