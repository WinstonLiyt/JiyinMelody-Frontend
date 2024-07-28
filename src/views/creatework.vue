<template>
  <div class="main-container"  style="min-height: 800px;">
    <mainheader/>
    <div class="main-content">
      <div
        style="
          width: 50%;
          margin: 5px auto;
          align-items: center;
          justify-content: center;
        "
      >
        <div class="card" style="margin-bottom: 100px; flex-wrap: wrap">
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: center;
              flex-wrap: wrap; /*关键*/
            "
          >
            <div
              style="font-weight: bold; font-size: 24px; margin-bottom: 30px"
            >
              发表新作品
            </div>
          </div>

          <input
            type="file"
            ref="fileInput"
            accept="audio/*"
            @change="handleFileChange"
            style="display: none"
          />
          <el-form
            :model="work"
            label-width="100px"
            align="left"
            style="padding-right: 50px; text-align: left"
            :rules="rules"
            ref="workref"
          >
            <el-form-item label="标题" prop="title">
              <el-input v-model="work.title" placeholder="标题"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="content">
              <el-input
                type="textarea"
                :rows="10"
                placeholder="请输入内容"
                v-model="work.content"
              ></el-input>
            </el-form-item>
            <el-form-item label="上传音乐" prop="music">
              <el-button type="primary" @click="uploadfile"
                >上传<i class="el-icon-upload el-icon--right"></i
              ></el-button>
            </el-form-item>
            <div v-if="work.music_file_id !== null">
              <audio controls ref="audio" class="aud">
                <source :src="object.url" />
              </audio>
            </div>
          </el-form>
          <div style="text-align: center">
            <el-button
              type="primary"
              size="medium"
              style="width: 100px"
              @click="createWork()"
              >发布</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import * as auth from "../utils/auth";
import { gettags, createblog } from "@/api/blogs.js";
import { createWork } from "@/api/activities.js";
import { upload } from "@/api/upload.js";
import mainheader from '@/components/mainheader.vue'

export default {
  name: "creatework",
  props: ["activityid"],
  components: {

  mainheader
  },
  data() {
    return {
      selectedfile: null,
      music_url: null,
      work: {
        title: "",
        content: "",
        music_file_id: null,
      },
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
      },
      object: {},

      user: {
        nickname: "", // 从API获取的用户昵称
        image_url: "", // 从API获取的用户头像URL
      },
      activeIndex: "1",
      defaultName: "未知用户",
      defaultAvatar: require("@/assets/default.png"), // 默认头像URL

      fileList: [],
    };
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("loginuser"));
    console.log(this.activityid);
    //this.gettaglist();
  },
  beforedestroyed() {},
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    logout() {
      auth.removeuserInfo();
      this.$router.push({ path: "/login" });
      this.$message.success("退出成功");
    },
    info() {
      this.$router.push({ path: "/me" });
    },
    createWork() {
      // 要对文件验证
      console.log(this.activityid);
      this.$refs["workref"].validate((valid) => {
        if (valid) {
          //验证通过，向后端发送请求
          createWork({
            title: this.work.title,
            content: this.work.content,
            music_file_id: this.work.music_file_id,
            activity_id: this.activityid,
          })
            .then((response) => {
              console.log(response.data);
              const blogid = response.data.data.id;
              if (response.data.code /*=== 200*/) {
                this.blogid = response.data.data.id;
                this.$router.push({
                  name: "blogdetail",
                  params: { blogid }, // 将 blogId 作为路由参数传递
                });
              } else {
                // 获取标签列表失败，显示失败消息
                this.$message.error(response.data.msg);
              }
            })
            .catch((error) => {
              // 处理请求失败的逻辑
              console.error("请求失败:", error);
            });
        }
      });
    },
    upload() {
      console.log(this.selectedfile);
      upload({
        file: this.selectedfile,
        category: "音乐",
        usage: "作品音乐",
      })
        .then((response) => {
          console.log(response.data);
          if (response.data.code /*=== 200*/) {
            this.object = response.data.data;
            this.work.music_file_id = response.data.data.id;
          } else {
            // 获取标签列表失败，显示失败消息
            this.$message.error(response.data.msg);
          }
        })
        .catch((error) => {
          // 处理请求失败的逻辑
          console.error("请求失败:", error);
        });
    },
    uploadfile() {
      this.$refs.fileInput.value = "";
      this.$refs.fileInput.click();
      this.selectedfile = this.$refs.fileInput.files[0];
      return;
    },
    handleFileChange() {
      this.selectedfile = this.$refs.fileInput.files[0];
      if (this.selectedfile !== null) this.upload();
    },
    save() {},
  },
};
</script>


<style src="@/assets/css/iconfont/iconfont.css" scoped></style>
<style scoped>
.main-container {
  width: 100%;
  height: 100%;
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
}
</style>
