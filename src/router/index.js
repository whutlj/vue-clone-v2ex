import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
// import HelloWorld from '@/components/HelloWorld'
// import UserLogin from '@/components/UserLogin'
// import Index from '@/components/Index'
// import Detail from '@/components/Detail'
// import Member from '@/components/Member'
// import Nodes from '@/components/Nodes'
// import Swiper from '@/components/MySwiper' 
import config from '../public/config'
const HelloWorld = () => { return import(/* webpackChunkName: "group-foo" */ '@/components/HelloWorld')}
const UserLogin = () => {return import(/* webpackChunkName: "group-foo" */'@/components/UserLogin')}
const Index = () => {return import(/* webpackChunkName: "group-foo" */'@/components/Index')}
const Detail = () => {return import(/* webpackChunkName: "group-foo" */'@/components/Detail')}
const Member = () => {return import(/* webpackChunkName: "group-foo" */'@/components/Member')}
const Nodes = () => {return import(/* webpackChunkName: "group-foo" */'@/components/Nodes')}
const Swiper = () => {return import(/* webpackChunkName: "group-foo" */'@/components/MySwiper')}
var router =  new Router({
  mode:'history',
  base:'/app/',
  routes: [
    {
      path: '/login',
      name: 'userlogin',
      component: UserLogin,
      beforeEnter:(to,from,next)=>{
        console.log('enter login');
        next();
      }
    },{
        path:'/',
        name: 'index',
        component: Index
    },
    {
      path:'/show/:user_id',
      name:'detail',
      component: Detail
    },
    {
      path:'/member/:id',
      name: 'member',
      component: Member
    },
    {
      path:'/go/:name',
      name: 'nodes',
      component: Nodes
    },
    {
      path:'/register',
      name:'swiper',
      component: Swiper,
      meta:{
        auth: config.auth
      }
    }
  ],
  // scrollBehavior(to,from,savedPosition){
  //   return {x:0,y:0}
  // }
  scrollBehavior:(to,from,savedPosition) => {
    if(savedPosition){
      return savedPosition;
    }else{
      return {x:0,y:0}
    }
  }
})
router.beforeResolve((to,from,next)=>{
  // console.log('this is resolve');
  next()

});
router.beforeEach((to,from,next)=>{
  // console.log('this is beforeEach');
  next();
});
router.afterEach((to,from)=>{
  // console.log('this is after');
});
export default router;