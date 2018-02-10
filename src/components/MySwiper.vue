<!-- <template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <img class="img" src="../assets/img/ts_1.png">
            </div>
            <div class="swiper-slide">
                <img class="img" src="../assets/img/ts_2.png">
            </div>
            <div class="swiper-slide">
                <img class="img" src="../assets/img/ts_3.png">
            </div>
        </div>
    </div>
</template>
<script>
import {publicMethod} from '../public/dataInfo'
// import Swpier from '../public/swiper-3.4.2.jquery.min.js'
    export default {
        name: 'myswiper',
        mounted(){
            this.$nextTick(function(){
                this.initSwiper();
            })
        },
        methods:{
            initSwiper(){
                // var mySwiper = new Swiper('.swiper-container',{
                //     direction: 'horizontal',
                //     loop: true,
                //     autoplay: 2000,
                //     autoplayDisplayOnInteraction: false,
                //     speed: 500
                // });
                publicMethod(12);
            }
        }
    }
</script>
<style scoped>
    .img{
        width: 100%;
    }
</style> -->
<template>
    <div>
        <div class="panel panel-default">
        <div class="panel-heading ta_l">
            <router-link :to = "{name:'index'}">V2EX</router-link>
            <span> > </span>
            <!-- <span class="">轮播{{count}}</span> -->
            <span class="">轮播</span>
           
        </div>
        <div class="panel-body">
            <swiper :options = "swiperOption" :not-next-tick="notNextTick" ref="mySwiper">
                <swiper-slide><img class="img" src="../assets/img/ts_1.png"/></swiper-slide>
                <swiper-slide><img class="img" src="../assets/img/ts_2.png"/></swiper-slide>
                <swiper-slide><img class="img" src="../assets/img/ts_3.png"></swiper-slide>
                <swiper-slide><img class="img" src="../assets/img/ts_4.png"></swiper-slide>
                <swiper-slide><img class="img" src="../assets/img/ts_5.png"></swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
                <div class="swiper-scroller" slot="scroller"></div>
            </swiper>
        </div>
        </div>
        <div>
            <input type="button" @click="moduleOneChange" value="改变moduleOne">
            <input type="button" @click="moduleTwoChange" value="改变moduleTwo">
        </div>
    </div>
    
</template>

<script>
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
import {mapActions} from "vuex"
    export default {
        name: 'myswiper',
        mounted(){
            this.$nextTick(function(){
                // this.$store.commit('increment');
                this.incrementTest({test:10});
            });
        },
        data(){
            return {
                notNextTick: true,
                swiperOption: {
                    direction: 'horizontal',
                    loop: true,
                    autoplay: 2000,
                    autoplayDisplayOnInteraction: false,
                    speed: 500,
                    prevButton:'.swiper-button-prev',
                    nextButton:'.swiper-button-next'

                },
                localCount:10
            }
        },
        beforeRouteEnter: function(to,from,next){
                // console.log('before enter the swiper');
                next(vm=>{
                    if(to.matched.some(record => record.meta.auth)){
                        //判断是否登录
                        if(!vm.$store.state.login){
                            // console.log('need login!');
                            next({
                                name:'userlogin'
                            })
                        }else{
                            next();
                        }
                    }else{
                        next();
                    }
                })
        },
            // count(){
            //     return this.$store.state.count;
            // }
        computed:{
            ...mapState({
            count:state => state.count,
            countAlias: 'count',
            countPlusLocalState(state){
                return state.count + this.localCount;
            },
            num:state => state.num,
            test:state =>state.test,
        }),
            localcompute(){
                return this.localCount;
            },
        },
        methods:{
            ...mapMutations([
                'incrementTest',

            ]),
            ...mapMutations({
                add: 'increment',
                addd: 'increment'
                
            }),
            ...mapActions({
                action:'incrementAC'
            }),
            moduleOneChange () {
              this.$store.commit('second/increment');
              console.log(this.$store.state.first.count)
            },
            moduleTwoChange () {
              this.$store.dispatch('second/incrementCountAction')  
            },
        }
        
    }
</script>
<style scoped>
    .img {
        width: 100% ;
    }
   
</style>