import Vue from 'vue'
import Vuex from 'vuex'
import {moduleOne} from './modulesOne'
import {moduleTwo} from './modulesTwo'
Vue.use(Vuex);
const store = new Vuex.Store({
    state:{
        count: 0,
        num: 0,
        test: 0,
        login: false
    },
    mutations:{
        increment(state){
            state.count++;
        },
        incrementNum(state){
            state.num++;
        },
        incrementTest(state,payload){
            state.test =  state.test + payload.test;
        },
        login(state){
            state.login = true;
        },
        logout(state){
            state.login = false;
        }

    },
    actions:{
        incrementAC(context){
            setTimeout(function () {
              console.log('haha')
              context.commit('increment');//提交mutation
            },2000)
        },
    },
    modules: {
        first: moduleOne,
        second: moduleTwo
    }
});

export default store;