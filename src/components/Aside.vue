<!-- 
1. 样式抽离：将内联样式移到 <style> 标签中，保持模板的简洁。、
2. 使用 Vue 的插槽语法：使用 Vue 的插槽语法替换 slot 属性，符合 Vue 3 的最佳实践。
3. 图片路径：使用 require 语法确保图片路径正确。
4. 简化 HTML 语法：删除多余的 slot="title" 属性，使 HTML 语法更清晰。 -->

<template>
  <el-menu :default-openeds="['1', '3']"
    style="min-height: 100%;overflow-x: hidden; box-shadow: 2px 0 6px rgb(0 21 41/35%);"
    background-color="rgb(48, 65, 86)" text-color="#fff" active-text-color="#ffd04b" :collapse-transition="false"
    :collapse="isCollapse">
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
  name: "Aside",
  props: {
    isCollapse: Boolean,
    logotextshow: Boolean
  }

}
</script>

<style></style>

<!-- 
<template>
  <el-menu
    :default-openeds="['1', '3']"
    class="menu"
    background-color="rgb(48, 65, 86)"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse-transition="false"
    :collapse="isCollapse"
  >
    <div class="menu-header">
      <img :src="require('../assets/logo.png')" alt="Logo" class="logo" />
      <b class="logo-text" v-show="logotextshow">超级管理员系统</b>
    </div>
    <el-submenu index="1">
      <template #title>
        <i class="el-icon-setting"></i>
        <span>权限管理</span>
      </template>
      <el-menu-item index="1-1">管理员名单</el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template #title>
        <i class="el-icon-message"></i>
        <span>申请管理</span>
      </template>
      <el-menu-item-group>
        <template #title>待处理</template>
        <el-menu-item index="2-1">管理员申请</el-menu-item>
        <el-menu-item index="2-2">乐队申请</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "Aside",
  props: {
    isCollapse: Boolean,
    logotextshow: Boolean
  }
}
</script>

<style scoped>
.menu {
  min-height: 100%;
  overflow-x: hidden;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
}

.menu-header {
  height: 60px;
  line-height: 60px;
  text-align: center;
}

.logo {
  width: 20px;
  position: relative;
  top: 5px;
  margin-right: 5px;
}

.logo-text {
  color: white;
}
</style> -->
