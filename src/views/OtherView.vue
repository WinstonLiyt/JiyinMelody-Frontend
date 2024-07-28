<template>
    <div class="header-container" >
      <div class="header-background" :style="backgroundStyle">
      </div>
  
      <!-- 资料框 -->
     <div class="center1">
      <div  class="center2">
        <div class="left" style="margin: 20px;">
            <div class="avatar-container">
              <div class="avatar">
              <img :src="user.image_url">
               </div>
            </div>
            <div style="  display: flex;justify-content: center;top:0; /* 水平居中 */">
              <h1 class="username">{{ user.nickname }}</h1>
            </div>
            <div style="margin-top:  40px;margin: 20px;">
              <el-button type="primary" round style="width: 100%; background-color:#5f9592;font-size: 20px" @click="addfri1(id)">
                <i class="el-icon-edit">加为好友</i></el-button>
            </div>
              <!-- Musician Tag -->
          <div v-if="user.is_musician" class="musician-tag">
            乐手
          </div>
          <div style="margin: 20px;">
            <el-button type="primary" round style="width: 100%; background-color:#6bcce9; font-size: 20px" @click="goblogs">
              返回主页面
            </el-button>
          </div>
          <!-- Medal Group -->
             <div style="margin: 20px;">
            <div v-if="this.me.is_superuser">
            <el-button  type="primary" round style="width: 100%; background-color:#5f9592;font-size: 20px" @click="Click_UpdateAdmin_2">设置为管理员</el-button>
            </div>
            </div>
      </div>
  
      <div class="right">
        <el-menu
      :default-active="activeTabIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item
        v-for="(tab, index) in tabs"
        :key="index"
        :index="String(index)"
        @click="goToTab(tab)"
        class="custom-menu-item"
      >
        {{ tab.name }}
      </el-menu-item>
    </el-menu>
  
  <!-- 工作区域 -->
      <div class="body-right">
          <router-view></router-view>
      </div>
      </div>
      </div>
    </div>
    </div>
  
    </template>
    
    <script>
   import {getinfo_other} from '@/api/account.js'
    import {add_fri} from '@/api/friends';
    import {updateAdmin} from '@/api/admin.js'
    export default {
      name: 'OtherView',
      props: {
      id: {
        type: Number,
        required: true
      }
    },
      data() {
        return {
          isHovering: false,
          backgroundImage: null,
          showPrompt: true,
          currentTime: '',
          me: {

          },
          user:{
            id:'',
            username: "马小跳" ,
            email:"",
            nickname:"",
            description:"这是我的个性签名",
            is_musician:" ",
            is_staff:'',
            is_superuser:'',
            password: '' ,
            image_url:'//game.gtimg.cn/images/lol/act/img/champion/Annie.png',
            code: '',
            msg:""
          },
  
          tabs: [
          {  name: '信息',  routername: 'otherinfoView'},
          {  name: '作品',  routername: 'otherworkView'},
        ],
        activeTabIndex: 0         // 当前活动选项卡的索引
        };
      },

      created() {
      //获取用户信息
      this.getinfoment();
      console.log(this.id)
      this.me = JSON.parse(localStorage.getItem("loginuser"));
    },
  
      computed: {
        backgroundStyle() {
          return {
            backgroundColor: this.backgroundImage ? 'transparent' : '#5f9592',
            backgroundImage: `url(${this.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          };
        }
      },
      methods: {
          triggerFileInput() {
        this.$refs.fileInput.click();


      },
      onFileChange(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.backgroundImage = e.target.result;
            this.showPrompt = false; // 图片上传成功后，隐藏提示信息
          };
          reader.readAsDataURL(file);
        }
      },
      goblogs(){
        this.$router.push({ name: 'UserView', params: { id: this.user.id } });
      },

      goToTab(tab) {
              this.$router.push({ name: tab.routername, params: { id: this.user.id } });
       },
      getinfoment() {
        getinfo_other({user_id:this.id}).then(response => {
        console.log(response.data);
        if (response.data.code === 200) {
          this.user=response.data.data;
          this.$router.push({ name: 'otherinfoView', params: { id: this.user.id } });
          } else {
            // 获取博客列表失败，显示失败消息
            this.$message.error(response.data.msg);
          }
        })
        .catch(error => {
          // 处理请求失败的逻辑
          console.error('请求失败:', error);
        });
    },

   addfri1(data) {
  add_fri({ user_id: data }).then(response => {
    if (response.data.code === 200) {
      // 添加成功输出成功提示
      console.log("成功");
      this.$message({
        message: '添加成功',
        type: 'success'
      });
    } else {
      // 添加失败输出错误提示
      this.$message.error(response.data.msg);
    }
  }).catch(error => {
    // 处理请求失败的逻辑
    console.error('请求失败:', error);
    this.$message.error('请求失败，请稍后再试');
  });
},

    Click_UpdateAdmin_2() {
      console.log("设置的管理员id"+this.user.id);
      console.log("设置的管理员"+this.user.is_staff);
            updateAdmin(
                {
                    user_id: this.user.id,
                    is_staff: true,
                }
            ).then(response => {
                console.log(response.data);
                if (response.data.code === 200) {
                    console.log("boke")
                } else {
                // 获取特定用户失败，显示失败消息
                    this.$message.error(response.data.msg);
                }
            })
            .catch(error => {
                // 处理请求失败的逻辑
                console.error('请求失败:', error);
            });
      }


    },

    

    };
    </script>
    
    <style scoped>
    .header-container {
      position: relative;
      width: 100%;
   /* 根据需要调整高度 */
      height:800px;
      background-color: #f9f9f9;;
    }
    
    .header-background {
      width: 100%;
      height: 266px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      position: relative;
    }
    
    .header-background input[type="file"] {
      display: none;
    }
    
  
    
    .ProfileBanner-prompt-yBZ {
      /* 根据需要添加样式 */
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
    }
   
    .ProfileBanner-dropIcon-jnp {
      /* 根据需要添加样式 */
      width: 66px;
      height: 66px;
      fill: currentColor;
    }
    
    .ProfileBanner-promptHeading-tkX {
      /* 根据需要添加样式 */
      font-size: 20px; /* 设置字体大小 */
      font-weight: bold; /* 设置字体加粗 */
      background-color: transparent; /* 设置背景透明 */
      cursor: pointer;
    }
    
    .ProfileBanner-assetSuggestion-ADZ {
      /* 根据需要添加样式 */
      font-size: 16px;
      font-weight: bold;
      margin-top: 4px;
    }
  
    /*第二个底层 :背景图插入有问题*/
    .center1{
      top:0;
      width: calc(100% - 140px); /* 宽度为100%减去左右边距 */
     margin-left: 70px; /* 左边距 */
     margin-right: 70px; /* 右边距 */
     background-color: transparent; /* 设置背景色为透明 */
     height: 100%;
    /* 如果需要的话，可以添加边框 */
    border: 1px solid transparent;
    position: absolute; /* 将叠加层设为绝对定位 */
    pointer-events: none; /* 禁用点击行为 */
    }
  
     /*第三个底层 */
     .center2{
      top:80px;
      bottom: 80px;
      display: flex;
      width: calc(100% - 200px); /* 宽度为100%减去左右边距 */
     margin-left: 100px; /* 左边距 */
     margin-right: 100px; /* 右边距 */
     background-color: transparent; /* 设置背景色为透明 */
    position: absolute; /* 将叠加层设为绝对定位 */  
    }
    /*用户资料显示 */
  
    .left {
      width: 360px; /* 设置宽度为 360 像素 */
    height: 660px; /* 设置高度为 660 像素 */
    background-color: white; /* 设置底色为白色 */
    pointer-events: auto; /* 使得left部分可点击 */
  }
  .avatar-container {
    width: 122px;
    height: 122px;
    margin: 20px auto 0;
  }
  
  .avatar img {
    width: 110px;
    height: 110px;
  }
  
  .username {
    color: black; /* 设置文本颜色为黑色 */
    width: 300px;
    height: 29px;
    font-size: 18px; /* 设置字体大小为 17px */
    text-align: center; /* 设置文本水平居中 */
  }
  /*右侧格式*/
  .right {
    flex: 1; /* 自动扩展填充剩余空间 */
  }
  .el-menu-demo{
    top:190px;
  }
  .custom-menu-item {
    color: #333; /* 设置菜单项文字颜色 */
    font-weight: bold; /* 设置菜单项文字加粗 */
    font-size: large;
    padding: 10px 20px; /* 设置菜单项内边距 */
    pointer-events: auto; /* 使得部分可点击 */
  }
  
  .body-right{
    margin-top: 200px;
    height: 420px;
    width: 100%;
    /* height: 500px; */
    border-radius: 5px;
    background-color: white;
    pointer-events: auto; /* 使得right部分可点击 */
  }
  .musician-tag {
  text-align: center;
  font-size: 20px;
  color: #5f9592;
}
.medal-group {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}
.medal-group-image {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
    </style>
    