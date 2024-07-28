<template>
    <div >
      <el-card style="height: 100%;">
    <el-descriptions class="margin-top" title="简介" :column="2" border>
      <template slot="extra" v-if="showProfileButton">
        <el-button type="primary" size="small" @click="isEditing = !isEditing;saveProfile()">{{ isEditing ? '保存' : '修改个人信息' }}</el-button>
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
            <input type="file" ref="fileInput"  @change="handleFileChange" style="display: none">
            <el-button type="primary" @click="triggerFileInput">上传<i class="el-icon-upload el-icon--right"></i></el-button>
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
  <span>{{ user.is_staff ? '是' : '否'}}</span>
</el-descriptions-item>
<el-descriptions-item>
  <template slot="label">
    <i class="el-icon-s-tools"></i>
    是否为超级管理员
  </template>
  <span>{{ user.is_superuser ? '是' : '否'}}</span>
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
</el-descriptions-item>


<!-- Prefer Tags Field -->
<el-descriptions-item>
  <template slot="label">
    <i class="el-icon-basketball"></i>
    兴趣喜好
  </template>
  <span v-if="!isEditing">{{ user.prefer_tags }}</span>
  <el-input v-else v-model="user.prefer_tags"></el-input>
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

import {getinfo_other} from '@/api/account.js'
  export default {
    name: "infotherView",
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
       
        user:{
          id:'user123',
          username: "" ,
          email:"user@example.com",
          nickname:"",
          description:"生活就像海洋，只有意志坚强的人才能到达彼岸。",
          is_musician:" ",
          is_staff:'',
          is_superuser:'',
          medal_group:[],
          image_file_id: null, // 头像文件ID，可以为null
          image_url:'//game.gtimg.cn/images/lol/act/img/champion/Annie.png',
          prefer_tags:[],
          code: '',
          msg:"",
        },
      };
    },
    created() {
      if (!this.isEditing) {
        this.getinfoment();
        
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
        getinfo_other({user_id:this.id}).then(response => {
        console.log(response.data);
        if (response.data.code === 200) {
            this.user=response.data.data;

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
  