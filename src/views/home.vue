<template>
  <mainheader />
</template>

<script>
import * as auth from '../utils/auth'
import mainheader from '@/components/mainheader.vue'

export default {
  name: 'home',
  components: {
    mainheader
  },
  data() {
    return {
      user: {
        nickname: '', // 从API获取的用户昵称
        image_url: '' // 从API获取的用户头像URL
      },
      activeIndex: '1',
      defaultName: '未设置昵称',
      defaultAvatar: require('@/assets/default.png') // 默认头像URL
    };
  },
  created() {
    this.user = JSON.parse(localStorage.getItem('loginuser'));
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    goToChatmain() {
      this.$router.push({ name: 'Chatmain' });
    },
    logout() {
      auth.removeuserInfo();
      this.$router.push({ path: '/login' });
      this.$message.success('退出成功');
    },
    info() {
      this.$router.push({ path: '/me' });
    }
  }
}
</script>

<style scoped>
.flexcenter {
  @apply flex items-center justify-center;
}

.default-avatar {
  @apply w-10 h-10 rounded-full;
}

.el-dropdown-menu {
  @apply w-24 text-center;
}

.user-nickname {
  @apply inline-block text-sm py-1 border-b border-black max-w-full;
}</style>
