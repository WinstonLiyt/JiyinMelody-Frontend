<template>
  <div class="main-container">
    <mainheader />
    <div class="main-content">
      <div style="
          width: 50%;
          margin: 5px auto;
          align-items: center;
          justify-content: center;
        ">
        <div class="card" style="margin-bottom: 100px; flex-wrap: wrap">
          <div style="
              display: flex;
              align-items: center;
              justify-content: center;
              flex-wrap: wrap; /*关键*/
            ">
            <div style="font-weight: bold; font-size: 24px; margin-bottom: 30px">
              发布新活动
            </div>
          </div>

          <el-form :model="activity" label-width="100px" align="left" style="padding-right: 50px; text-align: left"
            :rules="rules" ref="activityref">
            <el-form-item label="标题" prop="title">
              <el-input v-model="activity.title" placeholder="标题"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="description">
              <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="activity.description"></el-input>
            </el-form-item>
            <el-form-item label="结束时间" prop="end_at">
              <el-date-picker type="datetime" placeholder="请选择时间" v-model="activity.end_at"
                :picker-options="pickerOptions"></el-date-picker>
            </el-form-item>
          </el-form>
          <div style="text-align: center">
            <el-button type="primary" size="medium" style="width: 100px" @click="createActivity()">发布</el-button>
          </div>
        </div>
      </div>
    </div>
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import * as auth from "../utils/auth";
import { createActivity } from "@/api/activities.js";
import mainheader from '@/components/mainheader.vue'

export default {
  name: "createActivity",
  data() {
    return {
      activity: {
        title: "",
        description: "",
        end_at: null,
      },
      rules: {
        title: [
          { required: true, 
            message: "请输入标题", 
            trigger: "blur" }
        ],
        description: [
          { required: true, 
            message: "请输入介绍", 
            trigger: "blur" },
        ],
        end_at: [
          { required: true, 
            message: "请选择结束时间", 
            trigger: "blur" },
        ],
      },
      activeIndex: "1",
      defaultName: "未知用户",
      defaultAvatar: require("@/assets/default.png"), // 默认头像URL
      pickerOptions: {
        disabledDate(time) {
          // 禁用过去的日期时间（当前时间之前的日期时间）
          return time.getTime() < Date.now();
        },
      },
    };
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("loginuser"));
  },
  components: {
    mainheader
  },
  beforedestroyed() { },
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
    createActivity() {
      this.$refs["activityref"].validate((valid) => {
        if (valid) {
          //验证通过，向后端发送请求
          createActivity({
            title: this.activity.title,
            description: this.activity.description,
            end_at: this.activity.end_at,
          })
            .then((response) => {
              console.log(response.data);
              const activityid = response.data.data.id;
              if (response.data.code) {
                this.activityid = response.data.data.id;
                this.$router.push({
                  name: "activitydetail",
                  params: { activityid }, // 将 blogId 作为路由参数传递
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
