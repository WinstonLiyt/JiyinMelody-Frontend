<template>
  <div class="main-container" style="min-height: 800px">
    <mainheader />

    <div class="main-content">
      <div style="display: flex; align-items: flex-start; grid-gap: 10px">
        <div style="width: 150px; display: flex; align-items: center" class="card fixed-content"
          v-if="out_dated == 'false'">
          <div style="margin: auto">
            <router-link :to="{ name: 'creatework', params: { activityid: activityid } }" target="_blank">
              <el-button type="primary"> 新建作品 </el-button>
            </router-link>
          </div>
        </div>

        <div style="flex: 1">
          <div>
            <div class="card" style="min-height: 80vh">
              <div class="blog-box" v-for="(item, index) in works" :key="index" v-if="total > 0">
                <div style="flex: 1; width: 0">
                  <router-link :to="{ name: 'blogdetail', params: { blogid: item.id } }" target="_blank">
                    <div class="blog-title">{{ item.title }}</div>
                  </router-link>

                  <div class="line1" style="color: #666; margin-bottom: 10px; font-size: 13px">
                    {{ item.content }}
                  </div>
                  <div style="display: flex; align-items: center">
                    <div style="flex: 1; font-size: 13px">
                      <span style="color: #666; margin-right: 30px"><i class="el-icon-user"></i>
                        {{ item.author.nickname }}</span>
                      <span style="color: #666; margin-right: 30px"><i class="el-icon-like"></i>
                        {{ item.like_count }}</span>
                      <span style="color: #666; margin-right: 30px"><i class="el-icon-star-off"></i>
                        {{ item.collect_count }}</span>
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
import { getblogs, gettags } from "@/api/blogs.js";
import { getActivityworks } from "@/api/activities";
import mainheader from "@/components/mainheader.vue";

export default {
  name: "activitydetail",
  props: ["activityid", "out_dated"],
  data() {
    return {
      current: "全部博客", //当前选中的分类名称
      total: 0,
      blogs: [],
      works: [],
      tags: [],
      topstart: 0,
      topend: 5,
      user: {
        nickname: "", // 从API获取的用户昵称
        image_url: "", // 从API获取的用户头像URL
      },
      activeIndex: "1",
      defaultName: "未知用户",
      defaultAvatar: require("@/assets/default.png"), // 默认头像URL
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
    this.getWorks();
    this.getbloglist();
    console.log(this.activityid);
    console.log(this.out_dated);
    // this.gettaglist();
  },
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
    getbloglist() {
      getblogs()
        .then((response) => {
          console.log(response.data);
          if (response.data.code /*=== 200*/) {
            this.blogs = response.data.data.blogs;
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
    selectCategory(categoryName) {
      this.current = categoryName;
      console.log(this.current);
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
    loadTopActivity() {
      this.$request.get("/activity/selectTop").then((res) => {
        this.topActivityList = res.data || [];
      });
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
    getWorks() {
      getActivityworks({ activity_id: this.activityid })
        .then((response) => {
          console.log(response);
          this.works = response.data.data.blogs;
          this.total = this.works.length;
          console.log(this.works);
        })
        .catch((error) => {
          console.error("请求失败:", error);
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

.blog-box {
  display: flex;
  grid-gap: 15px;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

.blog-box:first-child {
  padding-top: 0;
}

.blog-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  cursor: pointer;
}

.blog-title:hover {
  color: #2a60c9;
}
</style>
