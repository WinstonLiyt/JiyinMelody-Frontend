<template>
  <div class="header-container">
    <div class="header-background" :style="backgroundStyle"></div>

    <!-- Profile Section -->
    <div class="center1">
      <div class="center2">
        <div class="left" style="margin: 20px;">
          <!-- Avatar -->
          <div class="avatar-container">
            <div class="avatar">
              <img src="../assets/default.png" alt="User Avatar" />
              <!-- <img :src="user.image_url" alt="User Avatar" /> -->
            </div>
          </div>
          <!-- Username -->
          <div style="display: flex; justify-content: center; top: 0;">
            <h1 class="username">{{ user.nickname }}</h1>
          </div>
          <!-- Musician Tag -->
          <div v-if="user.is_musician" class="musician-tag">
            乐手
          </div>
          <!-- Medal Group -->
          <div v-if="user.medal_group" class="medal-group">
            乐队：
            <img :src="user.medal_group.url" alt="Medal Group" class="medal-group-image" />
            <span>{{ user.medal_group.name }}</span>
          </div>
          <!-- Edit Profile Button -->
          <div style="margin-top: 40px; margin: 20px;">
            <el-button type="primary" round style="width: 100%; background-color:#5f9592; font-size: 20px"
              @click="$router.push({ name: 'EditView', params: { id: user.id } })">
              修改个人资料<i class="el-icon-edit el-icon--right"></i>
            </el-button>
          </div>
          <!-- Upload Video Button -->
          <div style="margin: 20px;">
            <input type="file" ref="fileInput" accept="video/*" @change="handleFileChange" style="display: none" />
            <el-button type="primary" round style="width: 100%; background-color:#5f9592; font-size: 20px"
              @click="triggerFileInput">
              申请乐手<i class="el-icon-upload el-icon--right"></i>
            </el-button>
          </div>

          <div style="margin: 20px;">
            <el-button type="primary" round style="width: 100%; background-color:#6bcce9; font-size: 20px"
              @click="goblogs">
              返回主页面
            </el-button>
          </div>
        </div>

        <!-- Right Section -->
        <div class="right">
          <el-menu :default-active="String(activeTabIndex)" class="el-menu-demo" mode="horizontal">
            <el-menu-item v-for="(tab, index) in tabs" :key="index" :index="String(index)" @click="goToTab(tab)"
              class="custom-menu-item">
              {{ tab.name }}
            </el-menu-item>
          </el-menu>
          <!-- Main Content -->
          <div class="body-right">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getInfoById } from '@/api/account.js'
import { upload, applymusic } from '@/api/upload.js';

export default {
  name: 'UserView',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isHovering: false,
      backgroundImage: null,
      showPrompt: true,
      currentTime: '',
      selectedfile: null,
      video_file_url: null,
      user: {
        id: '',
        username: "",
        email: "",
        nickname: "",
        description: "",
        is_musician: false,
        is_staff: false,
        is_superuser: false,
        medal_group: [],
        image_url: '',
        prefer_tags: [],
        code: '',
        msg: "",
      },
      blog: {
        "video_file_id": null,
      },
      object: {},
      tabs: [
        { name: '作品', routename: 'workView' },
        { name: '收藏', routename: 'collect' },
        { name: '好友', routename: 'friendView' },
      ],
      activeTabIndex: 0
    };
  },
  created() {
    this.updateTime();
    setInterval(this.updateTime, 1000);
    this.getinfoment();
    console.log("乐队" + this.user.medal_group.id)
  },
  computed: {
    backgroundStyle() {
      return {
        backgroundColor: this.backgroundImage ? 'transparent' : '#5f9592',
        backgroundImage: `url(${this.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      };
    }
  },
  methods: {
    upload() {
      upload({ file: this.selectedfile, usage: "申请视频", category: "视频" }).then(response => {
        if (response.data.code === 200) {
          this.object = response.data.data;
          this.blog.video_file_id = response.data.data.id;
          this.video_file_url = response.data.data.url;
          this.applymusic();
        } else {
          this.$message.error(response.data.msg);
        }
      }).catch(error => {
        console.error('请求失败:', error);
      });
    },
    goblogs() {
      this.$router.push({ path: '/blogs' });
    },
    applymusic() {
      applymusic({ video_file_id: this.blog.video_file_id }).then(response => {
        if (response.data.code === 200) {
          // 显示成功提示
          this.$message({
            message: '提交成功',
            type: 'success'
          });
        } else {
          // 显示错误提示
          this.$message.error(response.data.msg);
        }
      }).catch(error => {
        // 请求失败的处理
        // 请求失败的处理
        if (this.user.is_musician) {
          // 如果是乐手，提示已经是乐手
          this.$message.error('已经是乐手，无需再次提交');
        } else {
          // 其他情况提示提交失败
          this.$message.error('提交失败，请稍后再试');
        }
        console.error('请求失败:', error);
      });
    },
    triggerFileInput() {
      this.$refs.fileInput.value = '';
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      this.selectedfile = event.target.files[0];
      if (this.selectedfile) {
        this.upload();
      }
    },
    goToTab(tab) {
      this.$router.push({ name: tab.routename, params: { id: this.user.id } });
    },
    updateTime() {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      this.currentTime = `${this.formatTime(hours)}:${this.formatTime(minutes)}:${this.formatTime(seconds)}`;
    },
    formatTime(time) {
      return time < 10 ? '0' + time : time;
    },
    getinfoment() {
      getInfoById().then(response => {
        if (response.data.code === 200) {
          this.user = response.data.data;
          console.log(this.user.medal_group);
          console.log(response.data.data);
          this.$router.push({ name: 'workView', params: { id: this.user.id } });
          if (this.user.medal_group_id) {
            this.user.medal_group_image = response.data.data.medal_group_image;
            this.user.medal_group_name = response.data.data.medal_group_name;
          }
        } else {
          this.$message.error(response.data.msg);
        }
      }).catch(error => {
        console.error('请求失败:', error);
      });
    },
  }
};
</script>

<style scoped>
.header-container {
  position: relative;
  width: 100%;
  height: 800px;
  background-color: #f9f9f9;
}

.header-background {
  width: 100%;
  height: 266px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.header-background input[type="file"] {
  display: none;
}

.ProfileBanner-prompt-yBZ {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.ProfileBanner-dropIcon-jnp {
  width: 66px;
  height: 66px;
  fill: currentColor;
}

.ProfileBanner-promptHeading-tkX {
  font-size: 20px;
  font-weight: bold;
  background-color: transparent;
  cursor: pointer;
}

.ProfileBanner-assetSuggestion-ADZ {
  font-size: 16px;
  font-weight: bold;
  margin-top: 4px;
}

.center1 {
  top: 0;
  width: calc(100% - 140px);
  margin-left: 70px;
  margin-right: 70px;
  background-color: transparent;
  height: 100%;
  border: 1px solid transparent;
  position: absolute;
  pointer-events: none;
}

.center2 {
  top: 80px;
  bottom: 80px;
  display: flex;
  width: calc(100% - 200px);
  margin-left: 100px;
  margin-right: 100px;
  background-color: transparent;
  position: absolute;
}

.left {
  width: 360px;
  height: 660px;
  background-color: white;
  pointer-events: auto;
}

.avatar-container {
  width: 122px;
  height: 122px;
  margin: 20px auto 0;
}

.avatar img {
  width: 110px;
  height: 110px;
}

.musician-tag {
  text-align: center;
  font-size: 20px;
  color: #5f9592;
}

.medal-group {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

.medal-group-image {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.username {
  color: black;
  width: 300px;
  height: 29px;
  font-size: 18px;
  text-align: center;
}

.right {
  flex: 1;
}

.el-menu-demo {
  top: 190px;
}

.custom-menu-item {
  color: #333;
  font-weight: bold;
  font-size: large;
  padding: 10px 20px;
  pointer-events: auto;
}

.body-right {
  margin-top: 200px;
  height: 420px;
  width: 100%;
  border-radius: 5px;
  background-color: white;
  pointer-events: auto;
}

.description {
  font-size: 16px;
  font-weight: normal;
  line-height: 1.5;
  color: #333;
  margin: 20px;
}

.bordered-div {
  border: 5px solid rgb(18, 154, 199);
  /* 绿色边框 */
  border-radius: 20px;
  padding: 10px;
  /* 内边距 */
  display: inline-block;
  /* 使宽度和高度生效 */
  text-align: center;
  /* 使内容居中 */
}</style>
