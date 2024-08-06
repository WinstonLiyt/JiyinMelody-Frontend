<template>
  <div>
    <div class="alluser">
      <div class="head">
        <h3>好友列表</h3>
      </div>

      <div class="fanorfollow_box">
        <div class="fanorfollow" v-for="item in friends" :key="item.id">

          <div class="fanorfollow_left">
            <img class="fanorfollow_img" :src="item.image_url"
              @click="$router.push({ name: 'OtherView', params: { id: item.id } })" />
          </div>

          <div class="fanorfollow_info">
            <div class="fanorfollow_info_top">
              <span>{{ item.nickname }}</span>
            </div>

            <div class="fanorfollow_info_bottom">
              <span>{{ item.design }}</span>
            </div>
          </div>

          <div class="fanorfollow_botton">
            <el-button @click="deleteFriend(item.id)" type="danger" size="small" round icon="el-icon-delete">
              删除
            </el-button>
          </div>

        </div>

        <div>
          <el-empty v-if="friends.length === 0" :image-size="250" description="好友列表为空"></el-empty>
        </div>

      </div>
    </div>
    <!-- 分页组件 -->
    <div class="block">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize"
        layout="prev, pager, next" :total="friends.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getfriends, delet } from '@/api/friends';

export default {
  name: "MyFanAndFollow",
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      friends: [],
      user: {
        id: '',
      },
      searchUser: '',
      currentPage: 1, // 当前页码
      pageSize: 5, // 每页显示的好友数量
    };
  },
  created() {
    this.getfriends();
  },

  methods: {
    personal(id) {
      this.$router.push({ path: `/newsuser/personal/${id}` });
    },

    getfriends() {
      getfriends().then(response => {
        console.log(response.data.data.friends);
        if (response.data.code === 200) {
          this.friends = response.data.data.friends;
          console.log(this.friends)
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

    deleteFriend(id) {
      delet({ user_id: id }).then(response => {
        if (response.data.code === 200) {
          console.log("ok")
          this.getfriends()
        } else {
          this.$message.error(response.data.msg);
        }
      })
        .catch(error => {
          // 处理请求失败的逻辑
          console.error('请求失败:', error);
        });
    },




    handleCurrentChange(val) {
      this.currentPage = val;
      this.updateDisplayedUsers();
    },

    updateDisplayedUsers() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = this.currentPage * this.pageSize;
      this.friends = this.friends.slice(start, end);
    },

  },

  mounted() {
    // 初始化时显示全部用户
    this.updateDisplayedUsers();
  },



};
</script>

<style>
/* 这里添加你的样式 */
fanorfollow_box:hover {
  border-width: 1px;
  border-color: deepskyblue;
}

.fanorfollow {
  padding: 15px 40px 15px 30px;
  height: 50px;
  display: flex;
  align-items: center;
  border: 1px solid #ebebeb;
}

.fanorfollow:hover {
  border-width: 1px;
  border-color: deepskyblue;
}

.fanorfollow_left {
  width: 45px;
  height: 45px;
}

.fanorfollow_img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid #ebebeb;
  vertical-align: top;
}

.fanorfollow_info {
  display: inline-block;
  margin-left: 20px;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  overflow: hidden;
}

.fanorfollow_info_top {
  display: inline-block;
  font-size: 15px;
  /* 修正字体大小单位为 px */
  line-height: 14px;
  vertical-align: top;
  cursor: pointer;
}

.fanorfollow_info_top:hover {
  color: deepskyblue;
}

.fanorfollow_info_bottom {
  line-height: 14px;
  color: #999;
  margin-top: 5px;
  cursor: pointer;
}

.fanorfollow_img:hover {
  cursor: pointer;
}
</style>
