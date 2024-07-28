<template>
  <div class="container" :message="message" :img_url="img_url">
    <!-- Sent Messages -->
    <div class="container" v-if="message.status == 'sent'">
      <div class="flex justify-end items-start">
        <div class="flex flex-col items-end">
          <div class="flex items-center">
            <h2 class="text-black"> {{ message.keyname }} </h2>
            <span :class="message.is_musician ? 'tag-musician' : 'tag-regular'">{{ message.is_musician ? '乐手' : '普通用户' }}</span>
          </div>
          <div class="bg-regal-blue w-fit p-3 rounded-md text-end mt-1">
            <div v-if="message.blog_id !== null" class="text-center mt-2">
              <router-link :to="{ name: 'blogdetail', params: { blogid: message.blog_id } }" target="_blank" class="hover:text-blue-800">
                <h2 class="text-white">{{ message.content }}</h2>
              </router-link>
            </div>
            <div v-else class="text-end mt-2">
              <h2 class="text-white">{{ message.content }}</h2>
            </div>
            <p class="text-white">{{ message.datetime }}</p>
          </div>
        </div>
        <img :src="message.img_url" alt="img_url" class="w-8 h-8 rounded-full mr-2 cursor-pointer" @click="goToMe">
      </div>
    </div>

    <!-- Received Messages -->
    <div class="container" v-else-if="message.status == 'received'">
      <div class="flex justify-start items-start">
        <img :src="message.img_url" alt="img_url" class="w-8 h-8 rounded-full mr-2 cursor-pointer" @click="goToOther">
        <div class="flex flex-col items-start">
          <div class="flex items-center">
            <h2 class="text-black">{{ message.keyname }}</h2>
            <div v-if="this.$store.state.current.type !== 'notice'">
              <span :class="message.is_musician ? 'tag-musician' : 'tag-regular'">{{ message.is_musician ? '乐手' : '普通用户' }}</span>
            </div>
          </div>
          <div class="bg-slate-200 w-fit p-3 rounded-md text-start mt-1">
            <div v-if="message.blog_id !== null" class="text-center mt-2">
              <router-link :to="{ name: 'blogdetail', params: { blogid: message.blog_id } }" target="_blank" class="hover:text-blue-800">
                <h2 class="text-blue-600">{{ message.content }}</h2>
              </router-link>
            </div>
            <div v-else class="text-start mt-2">
              <h2 class="text-black">{{ message.content }}</h2>
            </div>
            <p class="text-black">{{ message.datetime }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Invitation Messages -->
    <div class="container" v-if="this.$store.state.current.type === 'invitation'">
      <div class="flex justify-start items-start">
        <img :src="message.img_url" alt="img_url" class="w-8 h-8 rounded-full mr-2 cursor-pointer" @click="goToOther">
        <div class="flex flex-col items-start">
          <div class="flex items-center">
            <h2 class="text-black">{{ message.keyname }}</h2>
          </div>
          <div class="bg-slate-200 w-fit p-3 rounded-md text-start mt-1">
            <span v-if="!message.dst_group">邀请你成为他的好友</span>
            <span v-else>邀请你加入群聊：{{ message.dst_group.name }}</span>
            <div class="mt-2 flex justify-center">
              <template v-if="message.invitationStatus === '待处理'">
                <button @click="acceptInvitation(message)" class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2">接受</button>
                <button @click="rejectInvitation(message)" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">拒绝</button>
              </template>
              <template v-else>
                <button class="bg-gray-500 text-white px-3 py-1 rounded cursor-not-allowed" disabled>{{ message.invitationStatus }}</button>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { backinvitations } from '@/api/interface.js'
import { getinfo_other } from '@/api/account.js'

export default {
  name: 'Message',
  props: {
    message: Object
  },
  mounted() {
    this.checkIfMusician();
  },
  methods: {
    checkIfMusician() {
      getinfo_other({ user_id: this.message.id }).then(res => {
        this.$set(this.message, 'isMusician', res.data.data.is_musician);
      }).catch(err => {
        console.error(err);
      });
    },
    goToMe() {
      this.user = JSON.parse(localStorage.getItem('loginuser'));
      this.$router.push({ name: 'UserView', params: { id: this.user.id } });
    },
    goToOther() {
      this.$router.push({ name: 'OtherView', params: { id: this.message.id } });
    },
    acceptInvitation(message) {
      this.$set(message, 'invitationStatus', '已接受');
      // 处理接受邀请的逻辑
      backinvitations({
        invitation_id: this.message.invite_id,
        agree: true,
      }).then().catch(error => { console.error(error) })
    },
    rejectInvitation(message) {
      this.$set(message, 'invitationStatus', '已拒绝');
      // 处理拒绝邀请的逻辑
      backinvitations({
        invitation_id: this.message.invite_id,
        agree: false,
      }).then().catch(error => { console.error(error) })
    }
  }
}
</script>

<style scoped>
.text-blue-600 {
  color: #2563eb;
}

.text-blue-800 {
  color: #1d4ed8;
}

.text-center {
  text-align: center;
}

.underline {
  text-decoration: underline;
}

.hover\:text-blue-800:hover {
  color: #1d4ed8;
}

.cursor-pointer {
  cursor: pointer;
}

.bg-green-500 {
  background-color: #48bb78;
}

.bg-green-600 {
  background-color: #38a169;
}

.bg-red-500 {
  background-color: #f56565;
}

.bg-red-600 {
  background-color: #e53e3e;
}

.bg-gray-500 {
  background-color: #a0aec0;
}

.cursor-not-allowed {
  cursor: not-allowed;
}

.flex {
  display: flex;
}

.tag-musician {
  background-color: #f06292;
  color: white;
  font-size: 0.75rem;
  padding: 0.1rem 0.4rem;
  border-radius: 0.25rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}

.tag-regular {
  background-color: #2196f3;
  color: white;
  font-size: 0.75rem;
  padding: 0.1rem 0.4rem;
  border-radius: 0.25rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
</style>
