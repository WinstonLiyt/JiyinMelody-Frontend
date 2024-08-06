<template>
  <div class="main-container" style="min-height: 800px;">
    <mainheader />

    <div class="main-content">
      <div class="flex items-start gap-2">
        <div class="w-36 card fixed-content">
          <div class="category-item" :class="{ 'category-item-active': '全部博客' === current }"
            @click="selectCategory('全部博客')">全部博客</div>
          <div class="category-item" :class="{ 'category-item-active': item.name === current }"
            v-for="(item, index) in tags" :key="index" @click="selectCategory(item.name)">{{ item.name }}</div>
        </div>

        <div class="flex-1">
          <div class="card" style="min-height:20rem">
            <div v-for="(item, index) in blogs" :key="index"
              v-if="total > 0 && (item.tags.includes(current) || current === '全部博客')" class="blog-box">
              <div class="flex-1 w-0">
                <router-link :to="{ name: 'blogdetail', params: { blogid: item.id } }" target="_blank">
                  <div class="blog-title">{{ item.title }}</div>
                </router-link>
                <div class="line1 text-gray-600 mb-2 text-sm">{{ item.content }}</div>
                <div class="flex items-center">
                  <div class="flex-1 text-sm text-gray-600">
                    <span class="mr-6"><i class="el-icon-user"></i> {{ item.author.nickname || "用户" + item.author.id
                    }}</span>
                    <span class="mr-6"><i class="el-icon-like"></i> {{ item.like_count }}</span>
                    <span class="mr-6"><i class="el-icon-star-off"></i> {{ item.collect_count }}</span>
                  </div>
                  <div class="flex">
                    <el-tag v-for="(tag, index) in item.tags" :key="index" type="primary" class="mr-1">{{ tag }}</el-tag>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="total === 0" class="p-5 text-center text-gray-600 text-lg">暂无数据</div>
          </div>
        </div>

        <div class="w-64 fixed-content">
          <div class="card mb-2">
            <div class="text-lg font-bold mb-2">欢迎您！😊</div>
            <el-button type="primary" @click="tocreate" target="_blank" class="" style="color: white;">
              点此新建博客记录美好的一天
            </el-button>
          </div>

          <div class="card mb-2">
            <div class="flex items-center pb-2 border-b border-gray-300 mb-2">
              <div class="flex-1 text-lg">热门帖子</div>
              <div class="text-sm text-gray-600 cursor-pointer" @click="refreshtop"><i class="el-icon-refresh"></i> 换一换
              </div>
            </div>
            <div>
              <div v-for="(item, index) in topblogs" :key="index" class="topline mb-4"
                v-if="index >= topstart && index < topend">
                <router-link :to="{ name: 'blogdetail', params: { blogid: item.id } }" target="_blank">
                  <span class="inline-block w-6 text-right mr-2">
                    <span
                      :class="{ 'text-orange-500': index === 0, 'text-yellow-500': index === 1, 'text-blue-500': index === 2, 'text-gray-600': index > 2 }">
                      {{ index + 1 }}
                    </span>
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
import { getblogs, gettags } from '@/api/blogs.js'
import mainheader from '@/components/mainheader.vue'

export default {
  name: 'blogs',
  data() {
    return {
      mockuser: {
        nickname: "安妮",
        image_url: "//game.gtimg.cn/images/lol/act/img/champion/Annie.png"
      },
      current: "全部博客",  //当前选中的分类名称
      total: 11,
      blogs: [],
      tags: [],
      activities: [],
      topstart: 0,
      topend: 5,
      user: {
        nickname: '', // 从API获取的用户昵称
        image_url: '' // 从API获取的用户头像URL
      },
      activeIndex: '1',
      defaultName: '未知用户',
      defaultAvatar: require('@/assets/default.png'), // 默认头像URL
    };
  },
  computed: {
    topblogs() {
      return this.blogs.sort((a, b) => b.like_count - a.like_count);
    }
  },
  components: {

    mainheader
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  created() {
    this.user = JSON.parse(localStorage.getItem('loginuser'));
    this.getbloglist();
    this.gettaglist();
  },
  methods: {
    tocreate() {
      this.$router.push('/createblog')
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
    getbloglist() {
      getblogs().then(response => {
        console.log(response.data);
        if (response.data.code === 200) {
          this.blogs = response.data.data.blogs;
          this.total = this.blogs.length;
          console.log("boke")
          console.log(this.blogs)
        } else {
          // 获取博客列表失败，显示失败消息
          this.$message.error(response.data.msg);
        }
      }).catch(error => {
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
      }).catch(error => {
        // 处理请求失败的逻辑
        console.error('请求失败:', error);
      });
    },
    selectCategory(categoryName) {
      this.current = categoryName;
      console.log(this.current)
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

<style scoped>
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
  gap: 15px;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  height: auto;
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

.flexcenter {
  display: flex;
  justify-content: center;
  align-items: center;
}

.default-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.user-nickname {
  text-align: center;
  margin-bottom: 10px;
}

.card {
  background-color: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  height: auto;
}

.min-h-80 {
  min-height: 80vh;
}
</style>
