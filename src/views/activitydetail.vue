<template>
  <div class="main-container">
    <mainheader />

    <div class="main-content">
      <div class="content-wrapper">
        <div v-if="!isOutdated" class="card fixed-content">
          <div class="create-work">
            <router-link :to="{ name: 'creatework', params: { activityid: activityid } }" target="_blank">
              <el-button type="primary">新建作品</el-button>
            </router-link>
          </div>
        </div>

        <div class="works-list">
          <div class="card works-card">
            <div v-if="total > 0">
              <blog-box v-for="(item, index) in works" :key="index" :item="item" />
            </div>
            <div v-else class="no-data">暂无数据</div>
          </div>
        </div>

        <div class="fixed-content right-sidebar">
          <div class="card popular-posts-card">
            <div class="card-header">
              <div class="header-title">热门帖子</div>
              <div class="refresh-button" @click="refreshtop">
                <i class="el-icon-refresh"></i> 换一换
              </div>
            </div>
            <div>
              <top-line v-for="(item, index) in topblogs" :key="index" :item="item" :index="index" :isTop="index >= topstart && index < topend" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-backtop />
  </div>
</template>

<script>
import * as auth from "../utils/auth";
import { getblogs, gettags } from "@/api/blogs.js";
import { getActivityworks } from "@/api/activities";
import mainheader from "@/components/mainheader.vue";
import BlogBox from "@/components/BlogBox.vue";
import TopLine from "@/components/TopLine.vue";

export default {
  name: "activitydetail",
  props: ["activityid", "out_dated"],
  data() {
    return {
      total: 0,
      works: [],
      topstart: 0,
      topend: 5,
      user: {},
      defaultName: "未知用户",
      defaultAvatar: require("@/assets/default.png"),
    };
  },
  components: {
    mainheader,
    BlogBox,
    TopLine,
  },
  computed: {
    isOutdated() {
      return this.out_dated === 'true';
    },
    topblogs() {
      return this.blogs.sort((a, b) => b.like_count - a.like_count);
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.initData();
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    initData() {
      this.user = JSON.parse(localStorage.getItem("loginuser"));
      this.getWorks();
      this.getbloglist();
    },
    getbloglist() {
      getblogs()
        .then(response => {
          if (response.data.code) {
            this.blogs = response.data.data.blogs;
          } else {
            this.$message.error(response.data.msg);
          }
        })
        .catch(error => {
          console.error("请求失败:", error);
        });
    },
    refreshtop() {
      const end = this.blogs.length > 10 ? 10 : this.blogs.length;
      this.topstart = this.topend === end ? 0 : this.topstart + 5;
      this.topend = this.topstart + 5 > end ? end : this.topstart + 5;
    },
    handleScroll() {
      const scrollPosition = window.scrollY;
      const elements = document.querySelectorAll(".fixed-content");
      elements.forEach(element => {
        if (!element.initialContentPosition) {
          element.initialContentPosition = element.getBoundingClientRect().top + window.scrollY;
        }
        const offset = scrollPosition - element.initialContentPosition;
        element.style.transform = scrollPosition > 100 ? `translateY(${offset}px)` : "none";
      });
    },
    getWorks() {
      getActivityworks({ activity_id: this.activityid })
        .then(response => {
          this.works = response.data.data.blogs;
          this.total = this.works.length;
        })
        .catch(error => {
          console.error("请求失败:", error);
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
  min-height: 800px;
}

.main-content {
  width: 80%;
  margin: 5px auto;
}

.content-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.card {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
}

.create-work {
  margin: auto;
}

.works-list {
  flex: 1;
}

.works-card {
  min-height: 80vh;
}

.no-data {
  padding: 20px;
  text-align: center;
  font-size: 16px;
  color: #666;
}

.right-sidebar {
  width: 260px;
}

.popular-posts-card {
  margin-bottom: 10px;
}

.card-header {
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
}

.header-title {
  font-size: 20px;
  flex: 1;
}

.refresh-button {
  font-size: 12px;
  color: #666;
  cursor: pointer;
}
</style>
