<template>
  <div class="container flex flex-col relative">
    <div class="container p-10 flex flex-row items-center h-fit sticky">
      <div class="avatar-container">
        <router-link
          v-if="$store.state.current.id && $store.state.current.image_url"
          :to="currentRoute"
          class="hover:text-blue-800"
        >
          <img
            :src="$store.state.current.image_url"
            alt="User Avatar"
            class="avatar-image cursor-pointer"
          />
        </router-link>
        <img v-else :src="localAvatar" alt="User Avatar" class="avatar-image">
      </div>
      <h2 class="text-black text-3xl px-6">{{ $store.state.nameToDisplay }}</h2>
    </div>
    <div class="container overflow-auto h-auto mb-20" id="chat" ref="chat">
      <div class="container p-6" v-for="message in $store.state.messagesToDisplay" :key="message.datetime">
        <Message :message="message" />
      </div>
    </div>
    <div
      v-if="$store.state.current.type !== 'notice' && $store.state.current.type !== 'invitation'"
      class="container bg-slate-50 mt-6 p-5 h-fit absolute bottom-0"
    >
      <form @submit.prevent="sendMessage">
        <input
          v-model="input"
          class="bg-white border border-l-2 rounded-s-full py-2 border-slate-200 text-black focus:outline-none w-11/12"
          type="text"
          placeholder="Type a new message"
        />
        <button
          type="submit"
          class="text-white bg-zinc-800 border border-l-2 border-slate-200 w-1/12 rounded-e-full py-2 active:bg-zinc-700"
        >
          <i class="fa-solid fa-paper-plane"></i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Message from '@/components/Message.vue';
import { sendfriendchats, sendgroupchats } from '@/api/interface';
import localAvatar from '@/assets/default.png'; // 导入本地图片

export default {
  name: 'Chat',
  props: ['id'],
  components: {
    Message,
  },
  data() {
    return {
      input: '',
      localAvatar, // 使用本地图片
    };
  },
  computed: {
    currentRoute() {
      this.user = JSON.parse(localStorage.getItem('loginuser'));
      return this.$store.state.current.type === 'friend'
        ? { name: 'OtherView', params: { id: this.$store.state.current.id } }
        : { name: 'group_manage', params: { groupid: this.$store.state.current.id } };
    },
  },
  methods: {
    async sendMessage() {
      this.user = JSON.parse(localStorage.getItem('loginuser'));

      let message = {
        datetime: this.getDate(),
        keyname: '你',
        content: this.input,
        blog_id: null,
        img_url: this.user.image_url,
        status: 'sent',
        is_musician: this.user.is_musician,
        contactId: this.$store.state.current.id,
      };

      if (this.$store.state.current.type === 'friend') {
        await sendfriendchats({
          user_id: this.$store.state.current.id,
          content: this.input,
          blog_id: null,
        }).catch((err) => {
          console.log(err);
        });
      } else {
        await sendgroupchats({
          group_id: this.$store.state.current.id,
          content: this.input,
          blog_id: null,
        }).catch((err) => {
          console.log(err);
        });
      }

      this.$store.state.messagesToDisplay.push(message);
      this.input = '';
      this.scrollToBottom();
    },
    getDate() {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();

      let newDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

      return newDate;
    },
    scrollToBottom() {
      const chat = this.$refs.chat;
      if (chat) {
        chat.scrollTop = chat.scrollHeight;
      }
    }
  },
  updated() {
    this.scrollToBottom();
  }
};
</script>

<style scoped>
.avatar-container {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
