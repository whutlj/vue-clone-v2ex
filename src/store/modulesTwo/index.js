const moduleTwo = {
  namespaced: true,
  state: {
    count: 1
  },
  mutations: {
    incrementCount (state) {
      state.count = state.count + 2;
    },
    increment (state) {
      state.count = state.count + 1;
    }
  },
  getters: {
    getTwoFirst: function (state) {
      return state.count;
    },
    getTwoCount: function (state, getters) {
      console.log(getters.getFirst);
      return 10;
    }
  },
  actions: {
    incrementCountAction ({dispatch,commit, statte}) {
      commit('incrementCount');
      dispatch('incrementAC',null,{root:true});
    }
  }
}
export {moduleTwo}