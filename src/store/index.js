import Vue from 'vue';
import Vuex from 'vuex';
import { ChatRoom } from '../core/chat/chatRoom';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    chatRoom: new ChatRoom()
  },
  getters:{
    chatRoom(state){
      return state.chatRoom;
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
