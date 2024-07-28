<template>
  <div>
    <el-dialog :visible.sync="visible" title="选择好友">
      <el-select v-model="selectedFriend" style="width:80%" placeholder="选择好友">
        <el-option v-for="friend in friends" :key="friend.id" :label="friend.nickname" :value="friend.id">
          <template #default="{ item }">
            <div class="friend-option">
              <img :src="friend.image_url" alt="avatar" class="friend-avatar" />
              <span>{{ friend.nickname }}</span>
            </div>
          </template>
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="sendPost">发送</el-button>
      </span>
    </el-dialog>
  </div>
</template>
  
<script>
import { getfriends, sendmessage } from '@/api/friends.js'
export default {
  name: "shareblog",
  props: {
    postId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      visible: false,
      selectedFriend: null,
      friends: [
        { id: 1, nickname: '安妮', image_url: '//game.gtimg.cn/images/lol/act/img/champion/Annie.png' },
        { id: 2, nickname: '阿里', image_url: '//game.gtimg.cn/images/lol/act/img/champion/Annie.png' },
      ] // 好友列表
    };
  },
  methods: {
    open() {
      this.visible = true;
    },
    getfriendlist() {
      getfriends().then(response => {
        console.log(response.data);
        if (response.data.code === 200) {
          this.friends = response.data.data.friends;
          console.log("好友")
          console.log(this.friends)

        } else {
          // 获取列表失败，显示失败消息
          this.$message.error(response.data.msg);
        }
      })
        .catch(error => {
          // 处理请求失败的逻辑
          console.error('请求失败:', error);
        });
    },
    sendPost() {
      if (this.selectedFriend) {
        sendmessage({
          user_id: this.selectedFriend,
          content: "🎶分享博客🎶",
          blog_id: this.postId
        }).then(response => {
          console.log(response.data);
          if (response.data.code === 200) {
            this.$message.success("分享成功")
          } else {
            // 分享失败，显示失败消息
            this.$message.error(response.data.msg);
          }
        })
          .catch(error => {
            // 处理请求失败的逻辑
            console.error('请求失败:', error);
          });
        console.log(`Post ID ${this.postId} sent to Friend ID ${this.selectedFriend}`);
        this.visible = false;
      } else {
        this.$message.error('请选择一个好友');
      }
    }
  },
  created() {
    this.getfriendlist();
  }
};
</script>

<style>
.friend-avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 8px;
}

.friend-option {
  display: flex;
  align-items: center;
}
</style>