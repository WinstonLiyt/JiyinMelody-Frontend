<template>
  <div style="width:100%; height:100%">
    <mainheader />
    <div class="flex h-screen">
      <Contacts_Container class="w-1/4 bg-gray-100 overflow-y-auto"></Contacts_Container>
      <Chat class="w-3/4 bg-white overflow-y-auto" ref="chat"></Chat>
    </div>
  </div>
</template>

<script>
import Contacts_Container from '@/components/Contacts-container.vue';
import mainheader from '@/components/mainheader.vue';
import Chat from '@/components/Chat.vue';
import { getfriends, getgroups } from '@/api/friends';
import { searchFriendChats, searchGroupChats } from '@/api/interface';

export default {
  name: 'chatMain',
  components: {
    Contacts_Container,
    Chat,
    mainheader
  },
  data() {
    return {
      user: {
        username: '111',
        password: '222'
      },
      activeIndex: '2', // 确保选中聊天选项
      pollingInterval: null
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(`Selected: ${key}, ${keyPath}`);
    },
    goToHome() {
      this.$router.push({ name: 'home' });
      this.activeIndex = '1'; // 更新选中的菜单项
    },
    goToActivity() {
      this.$router.push({ name: 'activities' });
      this.activeIndex = '3'; // 更新选中的菜单项
    },
    async fetchMessages() {
      if (this.$store.state.current.type === 'friend') {
        try {
          const response = await searchFriendChats({
            user_id: this.$store.state.current.id
          });
          const newMessages = response.data.data.chats;
          this.updateMessages(newMessages);
        } catch (error) {
          console.error('Error fetching friend chats:', error);
        }
      } else if (this.$store.state.current.type === 'group') {
        try {
          const response = await searchGroupChats({
            group_id: this.$store.state.current.id
          });
          const newMessages = response.data.data.chats;
          this.updateMessages(newMessages);
        } catch (error) {
          console.error('Error fetching group chats:', error);
        }
      }
    },
    async fetchFriendsAndGroups() {
      try {
        const friendsResponse = await getfriends();
        const groupsResponse = await getgroups();

        this.$store.state.friends = friendsResponse.data.data.friends;
        this.$store.state.groups = groupsResponse.data.data.groups;
      } catch (error) {
        console.error('Error fetching friends and groups:', error);
      }
    },
    updateMessages(newMessages) {
      const existingMessages = this.$store.state.messagesToDisplay;
      const latestMessageTimestamp = existingMessages.length ? new Date(existingMessages[existingMessages.length - 1].datetime).getTime() : 0;

      newMessages.forEach(message => {
        const messageTimestamp = new Date(this.formatDate(message.timestamp)).getTime();
        if (messageTimestamp > latestMessageTimestamp) {
          const formattedMessage = {
            id: message.from_user.id,
            img_url: message.from_user.image_url,
            keyname: message.from_user.id === this.user.id ? '你' : message.from_user.nickname,
            content: message.content,
            datetime: this.formatDate(message.timestamp),
            blog_id: message.blog_id,
            is_musician: message.from_user.is_musician,
            status: message.from_user.id === this.user.id ? 'sent' : 'received'
          };
          this.$store.state.messagesToDisplay.push(formattedMessage);
        }
      });

      this.$refs.chat.scrollToBottom();
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    handleNewMessage(message) {
      this.$store.state.messagesToDisplay.push(message);
      if (!this.isCurrentChat(message.contactId)) {
        let contact = this.$store.state.friends.find(c => c.id === message.contactId);
        if (contact) {
          contact.unread_count++;
        }
      }
    },
    isCurrentChat(contactId) {
      return this.$store.state.current.id === contactId;
    }
  },
  created() {
    /* 保存当前用户信息至本地 */
    this.user = JSON.parse(localStorage.getItem('loginuser'));

    /* 初始化 */
    this.$store.state.nameToDisplay = '欢迎来到聊天界面🙂';
    this.$store.state.friends = [];
    this.$store.state.groups = [];

    /* 拉取当前用户的全部好友 */
    this.fetchFriendsAndGroups();

    /* 创建通知管理员 */
    if(this.$store.state.notices.length == 0) {
      this.$store.state.notices.push({
        "id": -1,
        "nickname": "系统通知",
        "image_url": "@/assets/default.png",
        "unread_count": 0,
      });
      this.$store.state.notices.push({
        "id": -2,
        "nickname": "邀请通知",
        "image_url": "@/assets/default.png",
        "unread_count": 0,
      });
    }

    this.$store.state.current.id = null;

    // 每5秒poll一次
    this.pollingInterval = setInterval(() => {
      this.fetchMessages();
      this.fetchFriendsAndGroups();
    }, 5000);
  },
  beforeDestroy() {
    // 组件销毁前清除定时器
    clearInterval(this.pollingInterval);
  }
}
</script>

<style scoped>
.h-15 {
  height: 60px;
}
</style>
./chatMain.vue./ChatMain.vue./chatMain.vue./chatMain.vue./chatMain.vue./chatMain.vue./chatMain.vue