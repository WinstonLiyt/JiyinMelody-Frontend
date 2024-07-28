import { createStore } from 'vuex'

export const store = createStore({
  state() {
    return {
      contacts: [],
      nameToDisplay: '',
      current: {
        id: Number,
        nickname: String,
        image_url: String,
        type: String,
      },
      senderinfo: [],
      messagesToDisplay: [],
      unread_num:'',
      friends: [],
      groups: [],
      notices: [],
    }
  },
})