import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    friends: [],
    groups: [],
    notices: [],
    nameToDisplay: '',
    messagesToDisplay: [],
    current: {
      id: Number,
      nickname: String,
      image_url: String
    },
  },
  mutations: {
    setNameToDisplay(state, name) {
      state.nameToDisplay = name
    },
    setMessagesToDisplay(state, messages) {
      state.messagesToDisplay = messages
    },
    addMessageToDisplay(state, message) {
      state.messagesToDisplay.push(message)
    }
  },
  actions: {
    searchFriendChats(context, payload) {
      // Implement the action
    },
    searchGroupChats(context, payload) {
      // Implement the action
    }
  }
})
