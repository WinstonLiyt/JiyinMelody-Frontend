<template>
  <div class="main-container">
    <mainheader />
    <div class="main-content">
      <div style="display: flex; align-items: flex-start; grid-gap: 10px">

        <div class="card" style="height: 100%; max-width:15%">
          <h1>搜索结果</h1>
          <p>搜索内容: {{ keyword.length > maxLength ? keyword.substring(0, maxLength) + '...' : keyword }}</p>
          <p>搜索标签: {{ selectedtag }}</p>

        </div>

        <div style="flex: 1;">
          <div>
            <div class="card" style="margin-bottom: 5px">
              <h1>用户</h1>
              <div v-if="users.length > 0">
                <div class="blog-box" v-for="(user, userindex) in users" :key="userindex"
                  style="display: flex; align-items: flex-start; margin-bottom: 20px;">
                  <!-- Avatar -->
                  <div style="flex-shrink: 0; margin-right: 15px;">
                    <img :src="user.image_url || defaultAvatar" alt=""
                      style="width: 50px; height: 50px; border-radius: 50%" @click="touserinfo(user.id)">
                  </div>
                  <!-- User Info -->
                  <div style="flex-grow: 1;">
                    <div style="font-weight: bold; margin-top: 15px">{{ user.nickname || "用户" + user.id }}</div>
                  </div>
                  <!-- Tag -->
                  <div style="flex-shrink: 0; margin-left: auto;">
                    <el-tag v-if="user.is_musician" type="primary" style="margin-right: 5px; margin-top: 10px">乐手</el-tag>
                    <el-tag v-else type="success" style="margin-right: 5px; margin-top: 10px">普通用户</el-tag>
                  </div>
                </div>
              </div>
              <div v-else style="padding: 20px; text-align: center; font-size: 16px; color: #666">暂无用户</div>
            </div>


            <div class="card" style="min-height: 80vh">
              <h1>博客</h1>
              <div v-if="total > 0">
                <div class="blog-box" v-for="(item, index) in blogs" :key="index">
                  <div style="flex: 1; width: 0">
                    <router-link :to="{ name: 'blogdetail', params: { blogid: item.id } }" target="_blank">
                      <div class="blog-title">{{ item.title }}</div>
                    </router-link>

                    <div class="line1" style="color: #666; margin-bottom: 10px; font-size: 13px">{{ item.content }}
                    </div>
                    <div style="display: flex; align-items: center">
                      <div style="flex: 1; font-size: 13px">
                        <span style="color: #666; margin-right: 30px"><i class="el-icon-user"></i> {{
                          item.author.nickname || "用户" + item.author.id }}</span>
                        <span style="color: #666; margin-right: 30px"><i class="el-icon-like"></i> {{ item.like_count
                        }}</span>
                        <span style="color: #666; margin-right: 30px"><i class="el-icon-star-off"></i> {{
                          item.collect_count }}</span>
                        <span style="color: #666; margin-right: 30px"><i class="el-icon-date"></i> {{ item.timestamp
                        }}</span>
                      </div>
                      <div style="width: fit-content">
                        <el-tag v-for="(item, index) in item.tags " :key="index" type="primary"
                          style="margin-right:5px">{{ item }}</el-tag>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else style="padding: 20px ;text-align: center; font-size: 16px; color: #666">暂无数据</div>

            </div>
          </div>

        </div>


        <div style="width: 260px" class="fixed-content">
          <div class="card" style="margin-bottom: 10px">
            <div style="font-size: 20px; font-weight: bold; margin-bottom: 10px">欢迎您！😊</div>
            <a href="/createblog" target="_blank">
              <div style="color: #666">写下博客记录美好的一天</div>
            </a>
          </div>

          <div class="card" style="margin-bottom: 10px">
            <div style="display: flex; align-items: center; padding-bottom: 10px; border-bottom: 1px solid #ddd">
              <div style="font-size: 20px;  flex: 1">热门帖子</div>
              <div style="font-size: 12px; color: #666; cursor: pointer;" @click="refreshtop"><i
                  class="el-icon-refresh"></i> 换一换</div>
            </div>
            <div>
              <div v-for="(item, index) in topblogs" :key="index" style="margin: 15px 0" class="topline"
                v-if="index >= topstart && index < topend">
                <router-link :to="{ name: 'blogdetail', params: { blogid: item.id } }" target="_blank">
                  <span style="width: 18px; display: inline-block; text-align: right; margin-right: 10px">
                    <span style="color: orangered" v-if="index === 0">{{ index + 1 }}</span>
                    <span style="color: goldenrod" v-else-if="index === 1">{{ index + 1 }}</span>
                    <span style="color: dodgerblue" v-else-if="index === 2">{{ index + 1 }}</span>
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
import * as auth from '../utils/auth'
import { search } from '@/api/search.js'
import mainheader from '@/components/mainheader.vue'

export default {

  components: {
    mainheader
  },
  name: 'search',
  data() {
    return {
      maxLength: 10, // 设置最大长度为10
      keyword: this.$route.query.query,
      selectedtag: [this.$route.query.filter],
      total: 1,
      topstart: 0,
      topend: 5,
      blogs: [],
      users: [],
      tags: [],
      user: {
        nickname: '',// 从API获取的用户昵称
        image_url: '' // 从API获取的用户头像URL
      },
      activeIndex: '1',
      defaultName: '未知用户',
      defaultAvatar: require('@/assets/default.png'), // 默认头像URL


    };
  },

  computed: {
    topblogs() {
      // 克隆原始博客数组
      const clonedBlogs = this.blogs.slice();
      // 对克隆的数组进行排序，不改变原始博客数组的顺序
      return clonedBlogs.sort((a, b) => b.like_count - a.like_count);
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  created() {
    this.user = JSON.parse(localStorage.getItem('loginuser'));
    this.getsearch();
  },
  methods: {
    touserinfo(sendid) {
      if (this.user.id === sendid) {
        this.$router.push({ name: 'UserView', params: { id: this.user.id } });
      }
      else {
        this.$router.push({ name: 'OtherView', params: { id: sendid } });
      }
    },
    getsearch() {
      console.log(this.keyword, this.selectedtag)
      if (this.$route.query.filter === "全部") {
        this.selectedtag = [];
      }
      search({
        keyword: this.keyword,
        tags: this.selectedtag
      }).then(response => {
        console.log(response.data);
        if (response.data.code === 200) {
          this.blogs = response.data.data.blogs;
          this.total = this.blogs.length;
          this.users = response.data.data.users;
          console.log("boke")
          console.log(this.blogs)
          console.log("user")
          console.log(response.data.data.users)

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
    refreshtop() {
      const end = this.blogs.length > 10 ? 10 : this.blogs.length;
      this.topstart = this.topend === end ? 0 : this.topstart + 5;
      this.topend = (this.topstart + 5) > end ? end : this.topstart + 5;
      console.log(end)
      console.log(this.topend === end)
      console.log(this.topstart)

      console.log((this.topstart + 5) > end)
      console.log(this.topend)
    },
    loadTopActivity() {
      this.$request.get('/activity/selectTop').then(res => {
        this.topActivityList = res.data || []
      })
    },
    handleScroll() {//设置部分内容跟随页面滚动
      const scrollPosition = window.scrollY;
      const elements = document.querySelectorAll('.fixed-content');
      elements.forEach(element => {
        if (!element.initialContentPosition) {
          // 记录每个元素的初始位置
          element.initialContentPosition = element.getBoundingClientRect().top + window.scrollY;
        }
        const offset = scrollPosition - element.initialContentPosition;
        if (scrollPosition > 100) {
          // 当滚动超过100像素时，应用偏移量
          element.style.transform = `translateY(${offset}px)`;
        } else {
          // 如果未超过100像素，则移除偏移量
          element.style.transform = 'none';
        }
      });
    }
  }
}
</script>


<style src="@/assets/css/iconfont/iconfont.css" scoped></style>
<style>
.main-container {
  width: 100%;
  height: 100%;
  min-height: 800px;
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

.fixed-content {
  /*表示跟随页面滚动的类*/
}
</style>
