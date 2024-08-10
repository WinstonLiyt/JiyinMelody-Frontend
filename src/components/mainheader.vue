<template>
  <el-header class="header">
    <div class="header-content">
      <div class="logo-container">
        <img src="@/assets/logo.png" alt="" class="logo">
      </div>
      <div class="welcome-text">欢迎使用济知音平台</div>
      <div class="menu-container">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
          background-color="#1e80ff" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item index="1" @click="navigateTo('/blogs')">帖子</el-menu-item>
          <el-menu-item index="2" @click="navigateTo('/activities')">活动</el-menu-item>
          <el-menu-item index="3" @click="navigateTo('/chatMain')">聊天</el-menu-item>
          <el-menu-item index="4" @click="navigateTo('/admin')" v-if="user.is_staff">管理员</el-menu-item>
        </el-menu>
      </div>
      <div class="right-container">
        <div class="search-container">
          <el-input placeholder="搜索内容" v-model="searchQuery" size="small" class="search-input">
            <el-select v-model="searchFilter" slot="prepend" placeholder="无" class="search-select">
              <el-option v-for="(tag, index) in tags" :key="index" :label="tag.name" :value="tag.name"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="tosearch"></el-button>
          </el-input>
        </div>
        <div class="user-container">
          <el-dropdown class="user-dropdown" @command="handleCommand">
            <span class="el-dropdown-link">
              <img :src="user.image_url || defaultAvatar" alt="" class="default-avatar">
              <i class="el-icon-arrow-down"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item disabled class="user-nickname"><b>{{ user.nickname || "用户" + user.id
              }}</b></el-dropdown-item>
              <el-dropdown-item command="info">个人信息</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </el-header>
</template>

<script>
import { getinfo } from '@/api/account.js'
import { getTags } from '@/api/blogs.js'
import * as auth from '../utils/auth'

export default {
  name: "mainheader",
  data() {
    return {
      reload: true,
      visible: true,
      user: {},
      tags: [],
      activeIndex: '1',
      defaultAvatar: require('@/assets/default.png'), // 默认头像URL
      searchQuery: '',
      searchFilter: "全部"
    };
  },
  methods: {
	navigateTo(path) {
	    this.$router.push(path).catch(error => {
	      if (error.name !== 'NavigationDuplicated') {
	        throw error;
	      }
	    });
	  },
    handleSelect(key, keyPath) {
      this.activeIndex = key;
      console.log(key, keyPath);
    },
    logout() {
      auth.removeuserInfo();
      //localStorage.removeItem("loginuser");
      this.$router.push({ path: '/login' });
      this.$message.success('退出成功');
    },
    info() {
      this.$router.push({ name: 'UserView', params: { id: this.user.id } });
    },
    gettaglist() {
      getTags().then(response => {
        if (response.data.code === 200) {
          this.tags = response.data.data;
          this.tags.push({ name: "全部" });
        } else {
          this.$message.error(response.data.msg);
        }
      }).catch(error => {
        console.error('请求失败:', error);
      });
    },
    tosearch() {
      const query = {
        query: this.searchQuery,
        filter: this.searchFilter
      };
      const currentPath = this.$route.path;

      if (currentPath === '/search') {
        this.$router.push({
          path: '/search',
          query: query
        }).catch(error => {
          if (error.name !== 'NavigationDuplicated') {
            throw error;
          }
        });
        this.$router.go(0);
      } else {
        this.$router.push({
          path: '/search',
          query: query
        }).catch(error => {
          if (error.name !== 'NavigationDuplicated') {
            throw error;
          }
        });
      }
    },
    handleCommand(command) {
      if (command === 'info') {
        this.info();
      } else if (command === 'logout') {
        this.logout();
      }
    },
    updateActiveIndex() {
      const path = this.$route.path;
      if (path.startsWith('/blogs')) {
        this.activeIndex = "1";
      } else if (path.startsWith('/activities')) {
        this.activeIndex = "2";
      } else if (path.startsWith('/chatMain')) {
        this.activeIndex = "3";
      } else if (path.startsWith('/admin')) {
        this.activeIndex = "4";
      } else {
        this.activeIndex = "1"; // 默认值
      }
    },

    getmyInfo() {
      getinfo().then(
        response => {
          if (response.data.code === 200) {/*同上*/
            console.log("yonghu" + response.data);
            localStorage.setItem("loginuser", JSON.stringify(response.data.data))//存储用户信息
            this.user = JSON.parse(localStorage.getItem('loginuser'));
          } else {
            // 请求信息失败，显示失败消息
            this.$message.error(response.data.msg)
          }
        }
      )
        .catch(error => {
          // 处理请求失败的逻辑
          console.error('请求失败:', error);
        });
    },
  },
  created() {
    this.getmyInfo();
    this.gettaglist();
    this.updateActiveIndex();
    //this.user = JSON.parse(localStorage.getItem('loginuser'));
  },

};
</script>

<style scoped>
.header {
  padding: 0;
}

.header-content {
  display: flex;
  height: 60px;
  background-color: #1e80ff;
  align-items: center;
}

.logo-container {
  height: 60px;
  width: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 100%;
  width: auto;
}

.welcome-text {
  width: 200px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-container {
  flex: 1;
  width: 80%;
}

.right-container {
  display: flex;
  align-items: center;
}

.search-container {
  display: flex;
  align-items: center;
  color: #fff;
}

.search-input {
  width: 300px;
  margin-right: 10px;
}

.search-select {
  width: 80px;
}

.user-container {
  display: flex;
  align-items: center;
}

.user-dropdown {
  width: 150px;
  color: #fff;
  cursor: pointer;
  text-align: right;
  margin-left: 10px;
}

.el-dropdown-link {
  display: flex;
  align-items: center;
}

.default-avatar {
  margin-right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.user-nickname {
  display: flex;
  align-items: center;
}

.dropdown-item {
  font-size: 14px;
  padding: 5px 0;
  cursor: pointer;
}
</style>
