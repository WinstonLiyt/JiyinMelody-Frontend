<template>
  <div>
    <el-card style="height: 100%;">
      <el-descriptions class="margin-top" title="简介" :column="2" border>
        <template slot="extra" v-if="showProfileButton">
          <el-button type="primary" size="small" @click="isEditing = !isEditing; saveProfile()">{{ isEditing ? '保存' :
            '修改个人信息' }}</el-button>
        </template>
        <!-- Image File ID Field -->
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-picture-outline"></i>
            头像
          </template>

          <img v-if="!isEditing" class="img" :src="user.image_url" alt="" />

          <div v-else>
            <img v-if="user.image_url" :src="user.image_url" class="img" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <input type="file" ref="fileInput" @change="handleFileChange" style="display: none">
            <el-button type="primary" @click="triggerFileInput">上传<i
                class="el-icon-upload el-icon--right"></i></el-button>
          </div>

        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            账户名
          </template>
          <span>{{ user.username }}</span>
        </el-descriptions-item>
        <!-- Nickname Field -->
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-s-custom"></i>
            昵称
          </template>
          <span v-if="!isEditing">{{ user.nickname }}</span>
          <el-input v-else v-model="user.nickname"></el-input>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-music"></i>
            是否为乐手
          </template>
          <span>{{ user.is_musician ? '是' : '否' }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user-solid"></i>
            是否为管理员
          </template>
          <span>{{ user.is_staff ? '是' : '否' }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-s-tools"></i>
            是否为超级管理员
          </template>
          <span>{{ user.is_superuser ? '是' : '否' }}</span>
        </el-descriptions-item>

        <!-- Medal Group ID Field -->
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-trophy"></i>
            勋章乐队ID
          </template>
          <span v-if="!isEditing">
            <span v-if="user.medal_group">
              {{ user.medal_group.name }}
            </span>
            <span v-else>无</span>
          </span>

          <el-select v-else v-model="groupid" style="width: 100%">
            <el-option v-for="(item, index) in group" :key=index :value="item.id" :label="item.name"></el-option>
          </el-select>


        </el-descriptions-item>

        <!-- Prefer Tags Field -->
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-basketball"></i>
            兴趣喜好
          </template>
          <span v-if="!isEditing">{{ user.prefer_tags.join(', ') }}</span>
          <el-select v-else v-model="user.prefer_tags" multiple style="width: 100%">
            <el-option v-for="tag in tags" :key="tag.id" :value="tag.name" :label="`${tag.name}`">
            </el-option>

          </el-select>
        </el-descriptions-item>
        <!-- Description Field -->
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-magic-stick"></i>
            个人介绍
          </template>
          <span v-if="!isEditing">{{ user.description }}</span>
          <el-input v-else v-model="user.description"></el-input>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>
  
<script>

import { getInfoById } from '@/api/account.js'
import { getmedal } from '@/api/friends.js'
import { upload, updateUserInfo } from '@/api/upload.js'
import { gettags } from '@/api/blogs.js'
export default {
  name: "infoView",
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isEditing: false,
      createDate: Date.now(),
      selectedfile: null, // 新的文件对象
      groupid: '',
      group: [],
      tags: [],

      user: {
        id: 'user123',
        username: "",
        email: "user@example.com",
        nickname: "",
        description: "生活就像海洋，只有意志坚强的人才能到达彼岸。",
        is_musician: " ",
        is_staff: '',
        is_superuser: '',
        medal_group: [],
        image_file_id: null, // 头像文件ID，可以为null
        image_url: '//game.gtimg.cn/images/lol/act/img/champion/Annie.png',
        prefer_tags: [],
        code: '',
        msg: "",
      },
    };
  },
  created() {
    if (!this.isEditing) {
      this.getinfoment();
      this.getmedal();
      this.gettaglist();

    }

  },

  computed: {
    showProfileButton() {
      // 检查当前路由的父路由名称
      return this.$route.matched.some(route => route.name === 'EditView');
    }
  },
  methods: {
    //信息
    getinfoment() {
      getInfoById().then(response => {
        if (response.data.code === 200) {
          this.user = response.data.data;
          console.log("信息"),
            console.log(this.user);
        } else {
          // 获取博客列表失败，显示失败消息
          this.$message.error(response.data.msg);
        }
      })
        .catch(error => {
          // 处理请求失败的逻辑
          console.error('请求失败:', error);
        });
    },

    getmedal() {
      getmedal().then(response => {
        console.log(response.data);
        if (response.data.code === 200) {
          this.group = response.data.data.groups;
        } else {
          // 获取博客列表失败，显示失败消息
          this.$message.error(response.data.msg);
        }
      })
        .catch(error => {
          // 处理请求失败的逻辑
          console.error('请求失败:', error);
        });
    },
    gettaglist() {
      gettags().then(response => {
        console.log(response.data);

        if (response.data.code === 200) {
          this.tags = response.data.data;
          console.log("biaoqian")
          console.log(this.tags)
        } else {
          // 获取标签列表失败，显示失败消息
          this.$message.error(response.data.msg);
        }
      })
        .catch(error => {
          // 处理请求失败的逻辑
          console.error('请求失败:', error);
        });
    },

    //更改
    customUpload() {
      console.log(this.selectedfile); // 打印出整个 event 对象
      upload({
        file: this.selectedfile,
        usage: "个人头像",
        category: "图像"
      }).then(response => {
        if (response.data.code === 200) {
          this.handleAvatarSuccess(response.data);
          console.log('Event object:', this.user.image_url);
        } else {
          this.$message.error('上传头像失败，请重试');
        }
      }).catch(error => {
        // 处理请求失败的逻辑
        console.error('请求失败:', error);
      });
    },
    handleAvatarSuccess(response) {
      this.user.image_url = response.data.url;
      this.user.image_file_id = response.data.id; // 保存新的头像文件ID
    },
    triggerFileInput() {
      this.$refs.fileInput.value = '';
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      this.selectedfile = event.target.files[0];
      if (this.selectedfile) {
        this.customUpload();
      }
    },

    saveProfile() {
      if (!this.isEditing) {
        const payload = {
          nickname: this.user.nickname,
          description: this.user.description,
          medal_group_id: this.groupid,
          image_file_id: this.user.image_file_id,
          prefer_tags: this.user.prefer_tags
        };
        console.log(this.groupid);

        // 发送请求更新用户信息
        updateUserInfo(payload).then(response => {
          if (response.data.code === 200) {
            this.isEditing = false;

            this.$message.success('保存成功');
            this.getinfoment();
          } else {
            this.$message.error('保存失败，请重试');
          }
        }).catch(error => {
          console.error('请求失败:', error);
        });
      }
    },
  }
}
</script>
  
<style scoped>
/* 样式保持不变 */
.img {
  width: 80px;
  height: 80px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
}
</style>
  