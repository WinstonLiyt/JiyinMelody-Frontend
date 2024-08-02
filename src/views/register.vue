<template>
  <div
    style="height: 100vh;display: flex; align-items: center; justify-content: center; background-color:burlywood">
    <div style="display :flex; background-color:aliceblue;  width:max-content; min-width:50%;border-radius: 5px; overflow: hidden">
      <div style="flex: 1; display: flex">
        <img src="@/assets/register.png" alt="" style="height:100%;width:100%;">
      </div>
      <div style="flex: 1; display: flex; align-items: center; justify-content: center;">
        <el-form :model="user" style="width: 80%" :rules="rules" ref="registerref">
          <div style="font-size: 20px; font-weight: bold; margin-bottom: 20px;">欢迎使用济知音交流平台</div>
          <el-form-item prop="username">
            <el-input prefix-icon="el-icon-user" size="large" placeholder="请输入账号" v-model="user.username"
              clearable></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-lock" size="large" show-password placeholder="请输入密码" v-model="user.password"
              clearable></el-input>
          </el-form-item>
          <el-form-item prop="confirmpass">
            <el-input prefix-icon="el-icon-lock" size="large" show-password placeholder="请确认密码" v-model="user.confirmpass"
              clearable></el-input>
          </el-form-item>
          <el-form :model="user" :rules="specialrule" ref="verifyref">
            <el-form-item prop="email">
              <el-input prefix-icon="el-icon-message" size="large" placeholder="请输入邮箱" v-model="user.email"
                clearable></el-input>
            </el-form-item>
          </el-form>

          <div style="flex: 1; display: flex;">
            <div style="flex: 1;">
              <el-form-item prop="code">
                <el-input prefix-icon="el-icon-chat-dot-round" size="large" placeholder="请输入验证码" v-model="user.code"
                  clearable></el-input>
              </el-form-item>
            </div>
            <div style="flex: 1;text-align: right;">
              <el-form-item>
                <el-button type="primary" style="width: 90%" @click="verify">获取验证码</el-button>
              </el-form-item>
            </div>

          </div>
          <el-form-item>
            <el-button type="primary" style="width: 100%" @click="register">注册</el-button>
          </el-form-item>
          <div style="display:flex">
            <div style="flex: 1">已有账号?去<span style="color:lightseagreen; cursor: pointer; text-decoration: underline;"
                @click="$router.push('/login')">登录</span></div>
          </div>

        </el-form>
      </div>
    </div>

  </div>
</template>
  
<script>

import { register, verify } from '@/api/account'

export default {
  name: "register",
  data() {
    //密码一致校验
    const confirm = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请确认密码'))
      }
      else if (value !== this.user.password) {
        callback(new Error('两次密码不一致'))
      }
      else {
        callback()
      }
    }

    return {
      user: {
        username: '',
        password: '',
        confirmpass: '',
        email: '',
        code: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        confirmpass: [
          { validator: confirm, trigger: 'blur' },
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ]
      },
      specialrule: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
  },
  methods: {
    //注册
    register() {
      // 同时验证两个表单
      Promise.all([
        this.$refs.registerref.validate(),
        this.$refs.verifyref.validate()
      ])
        .then(() => {
          // 两个表单都验证通过
          // 执行注册逻辑
          register({
            username: this.user.username,
            password: this.user.password,
            email: this.user.email,
            code: this.user.code
          })
            .then(response => {
              console.log(response.data);
              if (response.data.code === 200) {
                this.$router.push('/login'); // 跳转到登录页面
                this.$message.success(/*response.data.msg*/'注册成功');
              } else {
                // 注册失败，显示失败消息
                this.$message.error(response.data.msg);
              }
            })
            .catch(error => {
              // 处理请求失败的逻辑
              if (error.response) {
                // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                const { data } = error.response;
                if (data && data.email) {
                  // 显示错误信息
                  this.$message.error(data.email);
                } else if (data && data.username) {
                  this.$message.error(data.username);
                }
                else if (data && data.code) {
                  this.$message.error(data.code);
                } else {
                  this.$message.error(data)
                }
              }
              console.error('请求失败:', error);
            });
        })
        .catch((errors) => {
          // 如果有任何一个表单验证失败
          // 处理验证错误
          console.error('请求失败:', errors);
        });
    },
    //获取验证码
    verify() {
      this.$refs['verifyref'].validate((valid) => {
        if (valid) {
          //验证通过，向后端发送请求
          verify({
            email: this.user.email
          })
            .then(response => {
              console.log(response.data);
              // 根据后端返回的 code 判断请求是否成功
              if (response.data.code === 200) {
                this.$message.success("验证码：" + response.data.data.code)
              } else {
                // 请求失败，显示失败消息
                this.$message.error(response.data.msg)
              }
            })
            .catch(error => {
              // 处理请求失败的逻辑
              console.error('请求失败:', error);
            });
        }
      })

    }
  }

}


</script>
  