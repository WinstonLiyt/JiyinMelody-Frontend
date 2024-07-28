<template>
  <div
    style="height: 100vh; overflow: hidden; display: flex; align-items: center; justify-content: center; background-color:darkcyan">
    <div style="display :flex; background-color:aliceblue; width:50%; border-radius: 5px; overflow: hidden">
      <div style="flex: 1; display: flex">
        <img src="@/assets/login.png" alt="" style="height:100%;width:100%;">
      </div>
      <div style="flex: 1; display: flex; align-items: center; justify-content: center;">
        <el-form :model="user" style="width: 80%" :rules="rules" ref="loginref">
          <div style="font-size: 20px; font-weight: bold; margin-bottom: 20px;">欢迎使用济知音交流平台</div>
          <el-form-item prop="username">
            <el-input prefix-icon="el-icon-user" size="large" placeholder="请输入账号或邮箱" v-model="user.username"
              clearable></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-lock" size="large" show-password placeholder="请输入密码" v-model="user.password"
              clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 100%" @click="login">登录</el-button>
          </el-form-item>
          <div style="display:flex">
            <div style="flex: 1">还没有账号?去<span style="color:darkcyan; cursor: pointer; text-decoration: underline;"
                @click="$router.push('/register')">注册</span></div>
            <div style="flex: 1;text-align: right;"><span
                style="color:darkcyan; cursor: pointer; text-decoration: underline;"
                @click="$router.push('/findpass')">忘记密码?</span></div>
          </div>

        </el-form>
      </div>
    </div>

  </div>
</template>
  
<script>

import { login, getinfo } from '@/api/account'
import * as auth from '../utils/auth'


export default {
  name: "login",
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
      }
    }
  },
  created() {

  },
  methods: {
    login() {
      this.$refs['loginref'].validate((valid) => {
        if (valid) {
          //验证通过，向后端发送请求

          login({
            username: this.user.username,
            password: this.user.password
          })
            .then(response => {
              console.log(response.data);
              // 根据后端返回的 code 判断登录是否成功
              if (response.data.code === 200) {/*由于未对接后端接口，使用apifox本地mock测试，返回的code不是200，注释掉，真正对接的时候取消注释*/
                localStorage.setItem("token", response.data.data.token)//存储用户token
                getinfo().then(
                  response => {
                    if (response.data.code === 200) {/*同上*/
                      console.log(response.data);
                      localStorage.setItem("loginuser", JSON.stringify(response.data.data))//存储用户信息
                    } else {
                      // 请求信息失败，显示失败消息
                      this.$message.error(response.data.msg)
                    }
                  }
                )
                  .catch(error => {
                    // 处理请求失败的逻辑
                    console.error('请求失败:', error);
                  });
                this.$message.success(/*response.data.msg*/'登录成功')
                auth.setuserInfo(this.user)

                this.$router.push('/blogs')//回到主页
              } else {
                // 登录失败，显示失败消息
                this.$message.error(response.data.msg)
              }
            })
            .catch(error => {
              // 处理请求失败的逻辑
              this.$message.error("登录失败，请检查用户名或密码")
              console.error('请求失败:', error);
            });
        }
      })

    }
  }
}


</script>

<style>
.flexcenter {
  display: flex;
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
}</style>