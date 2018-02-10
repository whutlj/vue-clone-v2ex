const moduleOne = {
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
    getFirst: function (state) {
      return state.count;
    },
    getCount: function (state, getters) {
      console.log(getters.getFirst);
      return 10;
    }
  },
  actions: {
    incrementCountAction ({dispatch,commit, state}) {
      dispatch('incrementAC',null,{root:true});
    }
  }
}
export {moduleOne}
