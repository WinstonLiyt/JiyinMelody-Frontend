<template>
  <div class="main-container" style="min-height: 800px;">
    <mainheader />
    <div class="main-content">
      <div style="width: 50%; margin: 5px auto; align-items: center; justify-content: center;">
        <div class="card" style="margin-bottom: 100px;  flex-wrap: wrap;">
          <div style="display:flex; align-items: center; justify-content: center;  flex-wrap: wrap;/*关键*/">
            <div style="font-weight: bold; font-size: 24px; margin-bottom: 30px;">发表新博客</div>
          </div>


          <el-form :model="blog" label-width="100px" align="left" style="padding-right: 50px; text-align: left"
            :rules="rules" ref="blogref">
            <el-form-item label="标题" prop="title">
              <el-input v-model="blog.title" placeholder="标题"></el-input>
            </el-form-item>
            <el-form-item label="标签" prop="tags">
              <el-select v-model="blog.tags" multiple style="width: 100%">
                <el-option v-for="(item, index) in tags" :key=index :value="item.name" :label="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="内容" prop="content">
              <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="blog.content"></el-input>
            </el-form-item>
            <el-form-item label="上传音乐" prop="music">
              <input type="file" ref="fileInput" accept="audio/*" @change="handleFileChange" style="display: none">
              <el-button type="primary" @click="triggerFileInput">上传<i
                  class="el-icon-upload el-icon--right"></i></el-button>
            </el-form-item>
            <div v-if="blog.music_file_id !== null">
              <audio controls ref="audio" class="aud">
                <source :src="object.url" />
              </audio>
            </div>
            <el-form-item label="取消上传" prop="music">
              <el-button type="warning" @click="deletefile">取消</el-button>
            </el-form-item>

            <el-form-item label="仅乐手可见" prop="music" v-if="this.user.is_musician">
              <el-switch v-model="blog.is_only_for_musician" active-color="#1e80ff" inactive-color="#ff4949">
              </el-switch>

            </el-form-item>
          </el-form>
          <div style="text-align: center"><el-button type="primary" size="medium" style="width: 100px"
              @click="createblog()">发布</el-button></div>
        </div>
      </div>
    </div>
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import * as auth from '../utils/auth'
import { gettags, createblog } from '@/api/blogs.js'
import { upload } from '@/api/upload.js'
import mainheader from '@/components/mainheader.vue'
import { Loading } from 'element-ui';

export default {

  name: 'createblog',
  data() {
    return {
      mockuser: {
        "nickname": "安妮",
        "image_url": " //game.gtimg.cn/images/lol/act/img/champion/Annie.png"
      },
      selectedfile: null,
      music_url: null,
      blog: {
        "title": "",
        "content": "",
        "video_file_id": null,
        "music_file_id": null,
        "tags": [],
        "is_only_for_musician": false
      },
      rules: {
        "title": [
          { required: true, message: '请输入标题', trigger: 'blur' },
        ],
        "content": [
          { required: true, message: '请输入内容', trigger: 'blur' },
        ],
        "tags": [
          { required: false, message: '请选择标签', trigger: 'blur' },
        ],
      },
      tags: [{ name: "英文歌曲" }, { name: "中文歌曲" }],
      object: {},

      user: {
        nickname: '',// 从API获取的用户昵称
        image_url: '' // 从API获取的用户头像URL
      },
      activeIndex: '1',
      defaultName: '未知用户',
      defaultAvatar: require('@/assets/default.png'), // 默认头像URL
    };

  },
  created() {

    this.user = JSON.parse(localStorage.getItem('loginuser'));
    this.gettaglist();

  },
  beforedestroyed() {

  },
  components: {

    mainheader
  },
  methods: {
    deletefile() {
      this.blog.music_file_id = null;
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    logout() {
      auth.removeuserInfo();
      this.$router.push({ path: '/login' });
      this.$message.success('退出成功')
    },
    info() {
      this.$router.push({ path: '/me' });
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
    createblog() {
      this.$refs['blogref'].validate((valid) => {
        if (valid) {
          //验证通过，向后端发送请求
          createblog({
            title: this.blog.title,
            content: this.blog.content,
            video_file_id: this.blog.video_file_id,
            music_file_id: this.blog.music_file_id,
            tags: this.blog.tags,
            is_only_for_musician: this.blog.is_only_for_musician
          }).then(response => {
            console.log(response.data);
            const blogid = response.data.data.id;
            if (response.data.code === 200) {
              this.blogid = response.data.data.id;
              this.$router.push({
                name: 'blogdetail',
                params: { blogid } // 将 blogId 作为路由参数传递
              })
            } else {
              // 获取标签列表失败，显示失败消息
              this.$message.error(response.data.msg);
            }
          })
            .catch(error => {
              // 处理请求失败的逻辑
              console.error('请求失败:', error);
            });
        }
      })

    },
    upload() {
      this.blog.music_file_id = null;
      const loadingInstance = Loading.service({
        lock: true,
        text: '正在上传',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });

      console.log(this.selectedfile);
      upload({
        file: this.selectedfile,
        usage: "博客音乐",
        category: "音乐"
      }).then(response => {
        loadingInstance.close(); // 关闭加载指示器
        if (response.data.code === 200) {
          this.object = response.data.data;
          this.blog.music_file_id = response.data.data.id;
          this.music_url = response.data.data.url;
        } else {
          this.$message.error(response.data.msg);
        }
      })
        .catch(error => {
          // 处理请求失败的逻辑
          loadingInstance.close(); // 关闭加载指示器
          this.$message.error("上传失败");
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

    save() {

    },
  }
}
</script>


<style src="@/assets/css/iconfont/iconfont.css" scoped></style>
<style scoped>
.main-container {
  width: 100%;
  height: 100%;
  min-height: 800px;
  background-color: rgb(223, 223, 223);
  overflow: visible;
}

.main-content {
  display: flex;
  height: 100%;
  width: 80%;
  margin: 10px auto;
}

.el-form-item__label {
  text-align: center;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  box-sizing: border-box;
}

.aud {
  width: 100%;
}</style>
