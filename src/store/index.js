import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)



const state = {
  Authorization: "",
  ormToken:"",
  path:""
}
const mutations ={
  setAuthorization(state,Authorization) {  //同上
      state.Authorization = Authorization;
  },
  setOrmToken(state,ormToken){
      state.ormToken=ormToken;
  },
  setPath(state,path){
      state.path=path;
  }
}

const store = new Vuex.Store({
  state,
  mutations
});

export default store;
