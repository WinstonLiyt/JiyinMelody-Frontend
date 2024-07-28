<template>
  <div
    class="container px-5 py-4 hover:bg-slate-100 hover:cursor-pointer flex flex-row items-center border-b-2 bg-slate-100"
    :name="name">
    <div class="w-10 h-10 flex items-center rounded-full justify-center overflow-hidden bg-slate-300">
      <img :src="computedImgUrl" alt="avatar" class="w-full h-full object-cover">
    </div>
    <h2 class="text-black text-xl px-3 flex-grow">{{ name }}</h2>
    <span v-if="count > 0" class="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{{ count }}</span>
  </div>
</template>

<script>
import default_img from "@/assets/default.png"

export default {
  name: 'Contact',
  props: {
    name: String,
    count: Number,
    img_url: String
  },
  computed: {
    computedImgUrl() {
      return this.img_url ? this.img_url : default_img;
    }
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>
