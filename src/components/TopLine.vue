<template>
  <div class="topline" v-if="isTop">
    <router-link :to="{ name: 'blogdetail', params: { blogid: item.id } }" target="_blank">
      <span class="rank">{{ index + 1 }}</span>
      <span class="top-text">{{ item.title }}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'TopLine',
  props: ['item', 'index', 'isTop']
}
</script>

<style scoped>
.topline {
  margin: 15px 0;
}

.rank {
  width: 18px;
  display: inline-block;
  text-align: right;
  margin-right: 10px;
}

.rank:nth-child(1) {
  color: orangered;
}

.rank:nth-child(2) {
  color: goldenrod;
}

.rank:nth-child(3) {
  color: dodgerblue;
}

.rank {
  color: #666;
}

.top-text {
  color: #666;
}
</style>
