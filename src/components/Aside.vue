<template>
    <el-menu :default-openeds="['1', '3']" style="min-height: 100%;overflow-x: hidden; box-shadow: 2px 0 6px rgb(0 21 41/35%);" 
   background-color="rgb(48, 65, 86)"
              text-color="#fff"
              active-text-color="#ffd04b"
              :collapse-transition="false"
              :collapse="isCollapse"
    >
    <div style="height: 60px; line-height: 60px; text-align: center;">
        <img src="../assets/logo.png" alt="" style="width: 20px;position: relative;top: 5px;margin-right: 5px;">
         <b style="color: white;" v-show="logotextshow">超级管理员系统</b>
       </div>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span slot="title">权限管理</span>
        </template>
          <el-menu-item index="1-1">管理员名单</el-menu-item>
        </el-submenu>  
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-message"></i>
          <span slot="title">申请管理</span>
        </template>
        <el-menu-item-group>
          <template slot="title">待处理</template>
          <el-menu-item index="2-1">管理员申请</el-menu-item>
          <el-menu-item index="2-2">乐队申请</el-menu-item>
        </el-menu-item-group>
      </el-submenu>  
    </el-menu> 
</template>

<script>
export default {
    name:"Aside",
    props:{
        isCollapse:Boolean,
        logotextshow:Boolean
    }

}
</script>

<style>

</style>