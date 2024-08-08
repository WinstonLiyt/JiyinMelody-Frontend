<template>
  <div class="blog-box">
    <div style="flex: 1; width: 0">
      <router-link :to="{ name: 'blogdetail', params: { blogid: item.id } }" target="_blank">
        <div class="blog-title">{{ item.title }}</div>
      </router-link>

      <div class="line1">{{ item.content }}</div>
      <div class="blog-meta">
        <span class="meta-item"><i class="el-icon-user"></i>{{ item.author.nickname }}</span>
        <span class="meta-item"><i class="el-icon-like"></i>{{ item.like_count }}</span>
        <span class="meta-item"><i class="el-icon-star-off"></i>{{ item.collect_count }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogBox',
  props: ['item']
}
</script>

<style scoped>
.blog-box {
  display: flex;
  gap: 15px;
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

.line1 {
  color: #666;
  margin-bottom: 10px;
  font-size: 13px;
}

.blog-meta {
  display: flex;
  align-items: center;
  font-size: 13px;
}

.meta-item {
  color: #666;
  margin-right: 30px;
}
</style>
