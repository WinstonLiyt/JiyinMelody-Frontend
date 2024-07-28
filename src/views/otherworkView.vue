<template>
  <div class="main-content">
    <div style="display: flex; align-items: flex-start; gap: 10px">
      <div style="flex: 1;">
        <div v-if="total !== 0">
          <div class="card">
            <div class="blog-box" v-for="(item, index) in blogs" :key="index">
              <div style="flex: 1;">
                <router-link :to="{ name: 'blogdetail', params: { blogid: item.id } }" target="_blank">
                  <div class="blog-title">{{ item.title }}</div>
                </router-link>

                <div class="line1">{{ item.content }}</div>

                <div class="blog-footer">
                  <div class="blog-meta">
                    <span><i class="el-icon-user"></i> {{ item.author.nickname || "用户" + item.author.id }}</span>
                    <span><i class="el-icon-like"></i> {{ item.like_count }}</span>
                    <span><i class="el-icon-star-off"></i> {{ item.collect_count }}</span>
                  </div>
                  <div class="blog-actions">
                    <el-tag v-for="(tag, index) in item.tags" :key="index" type="primary" class="blog-tag">{{ tag
                    }}</el-tag>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <el-empty v-if="total === 0" :image-size="250" description="暂未发表任何新闻"></el-empty>
      </div>
    </div>
  </div>
</template>
  
<script>
import { getownblog } from '@/api/blogs';

export default {
  name: "MyArticle",
  props: {
    id: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      blogs: [],
      total: 0,
    };
  },

  mounted() {
  },
  created() {
    this.getownblog()
  },

  methods: {
    getownblog() {

      getownblog({ user_id: this.id }).then(response => {
        console.log(response.data);
        if (response.data.code === 200) {
          this.blogs = response.data.data.blogs;
          this.total = this.blogs.length;
          console.log("blog")
          console.log(this.blogs)
        } else {
          // 获取博客列表失败，显示失败消息
          this.$message.error(response.data.msg);
        }
      })
        .catch(error => {
          // 处理请求失败的逻辑
          console.error('请求失败:', error);
        });
    }

  }
};
</script>
  
<style src="@/assets/css/iconfont/iconfont.css" scoped></style>
<style>
.main-content {
  height: 100%;
  margin: 5px auto;
}

.card {
  min-height: 80vh;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.blog-box {
  display: block;
  padding: 15px 0;
  border-bottom: 1px solid #ddd;
}

.blog-box:first-child {
  padding-top: 0;
}

.blog-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  cursor: pointer;
  text-align: left;
}

.blog-title:hover {
  color: #2a60c9;
}

.line1 {
  color: #666;
  margin-bottom: 10px;
  font-size: 14px;
  text-align: left;
}

.blog-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.blog-meta {
  display: flex;
  align-items: center;
}

.blog-meta span {
  color: #666;
  margin-right: 20px;
  font-size: 14px;
}

.blog-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.blog-tag {
  margin-right: 5px;
}
</style>
  