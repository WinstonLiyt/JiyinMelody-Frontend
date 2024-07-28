<template>
  <div style="font-size: 12px;line-height: 60px;display: flex;">
    <div style="flex: 1;font-size:18px">
      <span :class="collapseBtnClass" style="cursor:pointer" @click="collapse"></span>
    </div>
   
    <el-dropdown style="width: 100px; cursor: pointer;">
      <span>{{ current_user.nickname }}</span><i class="el-icon-arrow-down" style="margin-left: 5px;"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人主页</el-dropdown-item>
        <el-dropdown-item>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
   
</template>

<script>
import mainheader from '@/components/mainheader.vue'
export default {
    name:"Header",
    props:{
        collapseBtnClass:String,
        collapse:Boolean,
        nickname:String
    },
    components: {
      mainheader
    },

    data(){
      return{
        current_user:{

        }
      }
    },

    created(){
      this.current_user = JSON.parse(localStorage.getItem('loginuser'));
    }

}
</script>

<style>

</style>