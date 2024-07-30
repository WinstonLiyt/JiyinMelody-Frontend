<template>
  <div class="main-container" style="min-height: 800px">
    <mainheader />

    <div class="main-content">
      <div style="display: flex; align-items: flex-start; grid-gap: 10px">
        <div>
          <div style="width: 150px" class="card fixed-content">
            <div class="category-item" :class="{ 'category-item-active': '全部活动' === current }"
              @click="selectCategory('全部活动')">
              全部活动
            </div>
            <div class="category-item" :class="{ 'category-item-active': item.name === current }"
              v-for="(item, index) in types" :key="index" @click="selectCategory(item.name)">
              {{ item.name }}
            </div>
            <div class="category-item" v-if="user.is_staff">
              <router-link :to="{ name: 'createactivity' }" target="_blank">
                <el-button type="primary">新建活动</el-button>
              </router-link>
            </div>
          </div>
        </div>

        <div style="flex: 1">
          <div>
            <div class="card" style="min-height: 80vh">
              <div class="activity-box" v-for="(item, index) in activities" :key="index"
                v-if="total > 0 && checkShow(item)">
                <div style="flex: 1; width: 0">
                  <router-link :to="{
                    name: 'activitydetail',
                    params: {
                      activityid: item.id,
                      out_dated: !checkTime(item),
                    },
                  }" target="_blank">
                    <div class="activity-title">
                      {{ item.title }}
                    </div>
                  </router-link>

                  <div class="line1" style="color: #666; margin-bottom: 10px; font-size: 13px">
                    {{ item.description }}
                  </div>
                  <div style="display: flex; align-items: center">
                    <div style="flex: 1; font-size: 13px">
                      <span style="color: #666; margin-right: 30px"><i class="el-icon-circle-check"></i>
                        {{ formatDate(item.create_at) }}</span>
                      <span style="color: #666; margin-right: 30px"><i class="el-icon-circle-close"></i>
                        {{ formatDate(item.end_at) }}</span>
                      <span v-if="checkTime(item)" style="color: #666; margin-right: 30px"><i class="el-icon-loading"
                          style="color: blue"></i>
                        正在进行中
                      </span>
                      <span v-if="!checkTime(item)" style="color: #666; margin-right: 30px"><i class="el-icon-error"
                          style="color: red"></i>
                        已结束
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="total === 0" style="
                  padding: 20px;
                  text-align: center;
                  font-size: 16px;
                  color: #666;
                ">
                暂无数据
              </div>
            </div>
          </div>
        </div>

        <div style="width: 260px" class="fixed-content">
          <!-- <div class="card" style="margin-bottom: 10px">
            <div
              style="font-size: 20px; font-weight: bold; margin-bottom: 10px"
            >
              欢迎您！😊
            </div>
            <a href="/createblog" target="_blank"
              ><div style="color: #666">写下博客记录美好的一天</div></a
            >
          </div> -->

          <div class="card" style="margin-bottom: 10px">
            <div style="
                display: flex;
                align-items: center;
                padding-bottom: 10px;
                border-bottom: 1px solid #ddd;
              ">
              <div style="font-size: 20px; flex: 1">热门帖子</div>
              <div style="font-size: 12px; color: #666; cursor: pointer" @click="refreshtop">
                <i class="el-icon-refresh"></i> 换一换
              </div>
            </div>
            <div>
              <div v-for="(item, index) in topblogs" :key="index" style="margin: 15px 0" class="topline"
                v-if="index >= topstart && index < topend">
                <router-link :to="{ name: 'blogdetail', params: { blogid: item.id } }" target="_blank">
                  <span style="
                      width: 18px;
                      display: inline-block;
                      text-align: right;
                      margin-right: 10px;
                    ">
                    <span style="color: orangered" v-if="index === 0">{{
                      index + 1
                    }}</span>
                    <span style="color: goldenrod" v-else-if="index === 1">{{
                      index + 1
                    }}</span>
                    <span style="color: dodgerblue" v-else-if="index === 2">{{
                      index + 1
                    }}</span>
                    <span style="color: #666" v-else>{{ index + 1 }}</span>
                  </span>
                  <span class="top-text">{{ item.title }}</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import * as auth from "../utils/auth";
import { gettags, getblogs } from "@/api/blogs.js";
import { getActivities } from "@/api/activities.js";

import mainheader from "@/components/mainheader.vue";

export default {
  name: "activities",
  data() {
    return {
      total: 0,
      activities: [],
      types: [{ name: "正在进行" }, { name: "已结束" }],
      blogs: [],
      tags: [],
      topstart: 0,
      topend: 5,
      user: {
        nickname: "", // 从API获取的用户昵称
        image_url: "", // 从API获取的用户头像URL
      },
      activeIndex: "2",
      defaultName: "未知用户",
      defaultAvatar: require("@/assets/default.png"), // 默认头像URL
      okcode: 200,

      current: "全部活动",
    };
  },
  components: {
    mainheader,
  },
  computed: {
    topblogs() {
      return this.blogs.sort((a, b) => b.like_count - a.like_count);
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("loginuser"));
    this.getActivitylist();
    this.gettaglist();
    this.getbloglist();
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
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
    logout() {
      auth.removeuserInfo();
      this.$router.push({ path: "/login" });
      this.$message.success("退出成功");
    },
    info() {
      this.$router.push({ path: "/me" });
    },
    getActivitylist() {
      getActivities()
        .then((response) => {
          console.log(response.data);
          if (response.data.code === this.okcode) {
            this.activities = response.data.data.activities;
            console.log(this.activities);
            this.total = this.activities.length;
            console.log("boke");
            console.log(this.activities);
          } else {
            // 获取活动列表失败，显示失败消息
            this.$message.error(response.data.msg);
          }
        })
        .catch((error) => {
          // 处理请求失败的逻辑
          console.error("请求失败:", error);
        });
    },
    refreshtop() {
      const end = this.blogs.length > 10 ? 10 : this.blogs.length;
      this.topstart = this.topend === end ? 0 : this.topstart + 5;
      this.topend = this.topstart + 5 > end ? end : this.topstart + 5;
      console.log(end);
      console.log(this.topend === end);
      console.log(this.topstart);

      console.log(this.topstart + 5 > end);
      console.log(this.topend);
    },
    handleScroll() {
      //设置部分内容跟随页面滚动
      const scrollPosition = window.scrollY;
      const elements = document.querySelectorAll(".fixed-content");
      elements.forEach((element) => {
        if (!element.initialContentPosition) {
          // 记录每个元素的初始位置
          element.initialContentPosition =
            element.getBoundingClientRect().top + window.scrollY;
        }
        const offset = scrollPosition - element.initialContentPosition;
        if (scrollPosition > 100) {
          // 当滚动超过100像素时，应用偏移量
          element.style.transform = `translateY(${offset}px)`;
        } else {
          // 如果未超过100像素，则移除偏移量
          element.style.transform = "none";
        }
      });
    },
    getbloglist() {
      getblogs()
        .then((response) => {
          console.log(response.data);
          if (response.data.code === 200) {
            this.blogs = response.data.data.blogs;
            this.total = this.blogs.length;
            console.log("boke");
            console.log(this.blogs);
          } else {
            // 获取博客列表失败，显示失败消息
            this.$message.error(response.data.msg);
          }
        })
        .catch((error) => {
          // 处理请求失败的逻辑
          console.error("请求失败:", error);
        });
    },
    gettaglist() {
      gettags()
        .then((response) => {
          console.log(response.data);
          if (response.data.code === 200) {
            this.tags = response.data.data;
            console.log("biaoqian");
            console.log(this.tags);
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

    selectCategory(categoryName) {
      this.current = categoryName;
      console.log(this.current);
    },

    checkShow(item) {
      const currentTime = new Date();
      const endTime = new Date(item.end_at);
      if (this.current == "全部活动") return true;
      else if (this.current == "正在进行") {
        return currentTime <= endTime;
      } else return currentTime > endTime;
    },

    checkTime(item) {
      const currentTime = new Date();
      const endTime = new Date(item.end_at);
      return currentTime <= endTime;
    },

    sendFriend() {
      sendFriend({ user_id: 2 })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>


<style src="@/assets/css/iconfont/iconfont.css" scoped></style>
<style>
.main-container {
  width: 100%;
  height: 100%;
  background-color: rgb(223, 223, 223);
}

.main-content {
  height: 100%;
  width: 80%;
  margin: 5px auto;
}

.category-item {
  text-align: center;
  padding: 10px 0;
  font-size: 16px;
  cursor: pointer;
}

.category-item-active {
  background-color: #1890ff;
  color: #fff;
  border-radius: 5px;
}

.activity-box {
  display: flex;
  grid-gap: 15px;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

.activity-box:first-child {
  padding-top: 0;
}

.activity-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  cursor: pointer;
}

.activity-title:hover {
  color: #2a60c9;
}
</style>
