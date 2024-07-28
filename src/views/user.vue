<template>
    <el-container style="min-height: 100vh">

      <el-aside :width="sidewidth" style="background-color: rgb(238, 241, 246);">
       <Aside :isCollapse="isCollapse" :logotextshow="logotextshow"/>
  </el-aside>  

  <el-container>
    <el-header style="border-bottom: 1px solid #ccc;">
     <Header :collapseBtnClass="collapseBtnClass" :collapse="collapse"/>
    </el-header>

    <el-main>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>超级管理员系统</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>管理员名单</el-breadcrumb-item>
      </el-breadcrumb>

    
      <div style="margin: 10px 0;">
        <el-input style="width: 220px;" placeholder="请输入id" suffix-icon="el-icon-user-solid"></el-input>
        <el-input style="width: 220px;" placeholder="请输入名称" suffix-icon="el-icon-search"></el-input>
        <el-input style="width: 220px;" placeholder="请输入邮箱" suffix-icon="el-icon-message"></el-input>
        <el-button style="margin-left: 5 ;" type="primary">搜索</el-button>
      </div>
      <div style="margin: 10px 0;">
        <el-button type="primary">新增<i class="el-icon-circle-plus-outline"></i></el-button>
        <el-button type="danger">批量删除<i class="el-icon-remove-outline"></i></el-button>
        <el-button type="primary">导入<i class="el-icon-bottom"></i></el-button>
        <el-button type="primary">导出<i class="el-icon-top"></i></el-button>
      </div>
      <el-table :data="tableData" border stripe header-cell-class-name="headerb-g-c">
        <el-table-column prop="userid" label="id" width="140">
        </el-table-column>
        <el-table-column prop="username" label="名称" width="120">
        </el-table-column>
        <el-table-column prop="useremail" label="邮箱">
        </el-table-column>
        <el-table-column label="操作">
           <el-button type="success">编辑<i class="el-icon-edit"></i></el-button>
           <el-button type="danger">删除<i class="el-icon-remove-outline"></i></el-button>
        </el-table-column>
      </el-table>
      <div style="padding: 10px 0;">
        <el-pagination

      :page-sizes="[5, 10, 15, 20]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>

      </div>
    </el-main>
  </el-container>

</el-container>

</template>

<script>
import Aside from "@/components/Aside"
import Header from "@/components/Header";
export default {
    name:"user",
    data() {
      const item = {
        userid: 'chuanbo',
        username: '渔船',
        useremail: '999.@qq.com'
      };
      return {
        tableData: Array(10).fill(item),
        collapseBtnClass:'el-icon-s-fold',
        isCollapse:false,
        sidewidth:200,
        logotextshow:true
      }
    },
  
components:{
  Aside,
  Header
},
methods:{
    collapse(){//点击收缩按钮触发
      this.isCollapse=!this.isCollapse
      if(this.isCollapse){//收缩
          this.sidewidth=64
          this.collapseBtnClass='el-icon-s-unfold'
          this.logotextshow=false
    } 
    else {//展开
      this.sidewidth=200
      this.collapseBtnClass='el-icon-s-fold'
      this.logotextshow=true
    }
  }
}
}

</script>

<style scoped>
.headerb-g-c{
  background: rgb(1, 117, 117) !important;
}
</style>