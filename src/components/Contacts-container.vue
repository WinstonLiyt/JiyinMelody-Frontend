<template>
  <div class="container mx-auto">
    <div class="flex justify-between items-center">
      <h1 class="text-black text-3xl font-semibold px-5 py-5 cursor-pointer" @click="refreshPage">消息列表</h1>
      <div class="flex items-center">
        <button @click="createGroupChat" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2">新建群聊</button>
      </div>
    </div>
    
    <div class="flex justify-center py-3 bg-gray-100">
      <label :class="{'bg-gray-200': contactType === 'friends', 'px-4 py-2 cursor-pointer flex-1 text-center bg-gray-100': true}" class="mr-4 rounded">
        <input type="radio" v-model="contactType" value="friends" class="hidden" @change="selectContactType">
        好友
      </label>
      <label :class="{'bg-gray-200': contactType === 'groups', 'px-4 py-2 cursor-pointer flex-1 text-center bg-gray-100': true}" class="mr-4 rounded">
        <input type="radio" v-model="contactType" value="groups" class="hidden" @change="selectContactType">
        群聊
      </label>
      <label :class="{'bg-gray-200': contactType === 'notices', 'px-4 py-2 cursor-pointer flex-1 text-center bg-gray-100': true}" class="mr-4 rounded">
        <input type="radio" v-model="contactType" value="notices" class="hidden" @change="selectContactType">
        通知
      </label>
    </div>
    
    <div class="container px-5 py-3">
      <form>
        <div class="relative">
          <input @input="searchContact" v-model="input"
            class="py-1 px-10 rounded-full bg-gray-200 focus:outline-none text-black w-full"
            type="text" placeholder="Search people or message">
          <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
        </div>
      </form>
    </div>
    
    <div class="container">
      <div v-for="item in nameToDisplay" :key="item.id" @click="handleClick(item)">
        <Contact 
          :name="contactType === 'friends' ? item.nickname : contactType === 'groups' ? item.name : item.nickname" 
          :count="item.unread_count" 
          :img_url="contactType === 'notices' ? null : item.image_url" 
        />
      </div>
    </div>

    <!-- 新建群聊弹窗 -->
    <el-dialog title="新建群聊" :visible.sync="dialogVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="群名" :label-width="formLabelWidth">
          <el-input v-model="form.groupName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="群描述" :label-width="formLabelWidth">
          <el-input v-model="form.groupDescription" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="群头像" :label-width="formLabelWidth">
          <input type="file" @change="handleAvatarChange">
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Contact from '@/components/Contact.vue'
import { mapState } from 'vuex'
import { searchFriendChats, searchGroupChats, searchNotices, searchInvitations } from '@/api/interface'
import { upload } from '@/api/upload.js'
import { createGroup } from '@/api/group_manage.js'
import { getgroups } from '@/api/friends.js'
import default_img from "@/assets/default.png"

export default {
  name: 'Contacts_Container',
  components: {
    Contact,
  },
  data() {
    return {
      input: '',
      contactType: 'friends',
      dialogVisible: false,
      form: {
        groupName: '',
        groupDescription: '',
        groupAvatar: null,
      },
      formLabelWidth: '120px'
    }
  },
  computed: {
    ...mapState({
      friends: state => state.friends,
      groups: state => state.groups,
      notices: state => state.notices
    }),
    nameToDisplay() {
      let contacts = this.contactType === 'friends' ? this.friends 
                      : this.contactType === 'groups' ? this.groups 
                      : this.notices;
      contacts = Array.isArray(contacts) ? contacts : [];
      return contacts.filter(contact => {
        const name = contact.nickname || contact.name;
        return name.toLowerCase().includes(this.input.toLowerCase());
      });
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    handleClick(item) {
      if (this.contactType === 'friends') {
        this.setfriendChat(item.id, item.nickname, item.image_url);
      } else if (this.contactType === 'groups') {
        this.setgroupChat(item.id, item.name, item.image_url);
      } else if (this.contactType === 'notices') {
        this.setnoticeChat(item.id, item.nickname, item.image_url);
      }
      item.unread_count = 0;
    },
    setfriendChat(id, name, img_url) {
      searchFriendChats({ user_id: id }).then(res => {
        this.user = JSON.parse(localStorage.getItem('loginuser'));
        this.$store.state.nameToDisplay = name;
        this.$store.state.messagesToDisplay = [];

        this.$store.state.current = {
          id: id,
          nickname: name,
          image_url: img_url,
          type: 'friend',
        };

        res.data.data.chats.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

        res.data.data.chats.forEach(chat => {
          if (chat.from_user.id !== this.user.id) {
            this.$store.state.messagesToDisplay.push({
              id: chat.from_user.id,
              img_url: chat.from_user.image_url, 
              keyname: chat.from_user.nickname,
              content: chat.content,
              datetime: this.formatDate(chat.timestamp),
              blog_id: chat.blog_id,
              is_musician: chat.from_user.is_musician,
              status: 'received'
            });
          } else {
            this.$store.state.messagesToDisplay.push({
              id: chat.from_user.id,
              img_url: chat.from_user.image_url, 
              keyname: '你',
              content: chat.content,
              datetime: this.formatDate(chat.timestamp),
              blog_id: chat.blog_id,
              is_musician: chat.from_user.is_musician,
              status: 'sent'
            });
          }
        });
      }).catch(err => {
        console.log(err);
      });
    },
    setgroupChat(id, name, img_url) {
      searchGroupChats({ group_id: id }).then(res => {
        this.user = JSON.parse(localStorage.getItem('loginuser'));
        this.$store.state.nameToDisplay = name;
        this.$store.state.messagesToDisplay = [];

        this.$store.state.current = {
          id: id,
          nickname: name,
          image_url: img_url,
          type: 'group',
        };

        res.data.data.chats.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

        res.data.data.chats.forEach(chat => {
          if (chat.from_user.id !== this.user.id) {
            this.$store.state.messagesToDisplay.push({
              id: chat.from_user.id,
              img_url: chat.from_user.image_url, 
              keyname: chat.from_user.nickname,
              content: chat.content,
              datetime: this.formatDate(chat.timestamp),
              blog_id: chat.blog_id,
              is_musician: chat.from_user.is_musician,
              status: 'received'
            });
          } else {
            this.$store.state.messagesToDisplay.push({
              id: chat.from_user.id,
              img_url: chat.from_user.image_url, 
              keyname: '你',
              content: chat.content,
              datetime: this.formatDate(chat.timestamp),
              blog_id: chat.blog_id,
              is_musician: chat.from_user.is_musician,
              status: 'sent'
            });
          }
        });
      }).catch(err => {
        console.log(err);
      });
    },
    setnoticeChat(id, name, img_url) {
      if (id === -1) {
        searchNotices().then(res => {
          this.user = JSON.parse(localStorage.getItem('loginuser'));
          this.$store.state.nameToDisplay = name;
          this.$store.state.messagesToDisplay = [];
          this.$store.state.current = {
            id: null,
            nickname: name,
            image_url: default_img,
            type: 'notice'
          };

          res.data.data.notices.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

          res.data.data.notices.forEach(notice => {
            this.$store.state.messagesToDisplay.push({
              id: notice.id,
              img_url: default_img,
              keyname: name,
              content: notice.content,
              datetime: this.formatDate(notice.timestamp),
              blog_id: notice.blog_id,
              status: 'received'
            });
          });
        }).catch(err => {
          console.log(err);
        });
      } else if (id === -2) {
        searchInvitations().then(res => {
          this.user = JSON.parse(localStorage.getItem('loginuser'));
          this.$store.state.nameToDisplay = name;
          this.$store.state.messagesToDisplay = [];

          this.$store.state.current = {
            id: null,
            nickname: name,
            image_url: default_img,
            type: 'invitation'
          };

          res.data.data.invitations.forEach(invitation => {
            this.$store.state.messagesToDisplay.push({
              id: invitation.from_user.id,
              invite_id: invitation.id,
              img_url: invitation.from_user.image_url,
              keyname: invitation.from_user.nickname,
              dst_group: invitation.dst_group,
              invitationStatus: invitation.status,
            });
          });
        }).catch(err => {
          console.log(err);
        });
      }
    },

    createGroupChat() {
      this.dialogVisible = true;
    },
    handleAvatarChange(event) {
      const file = event.target.files[0];
      this.form.groupAvatar = file;
    },
    submitForm() {
      let that = this
      console.log('提交新建群聊表单')      
      upload({
        file: this.form.groupAvatar,
        category: "图像",
        usage: "群组头像",
      }).then(response => {
        const img_id = response.data.data.id;
        createGroup({
          name: this.form.groupName,
          description: this.form.groupDescription,
          image_file_id: img_id,
        }).then(response => {
          this.refreshGroupList();
        }).catch(error => {
          console.error(error);
        });
      }).catch(error => {
        that.$message.error('群组头像上传失败，群组创建失败')
        console.error('群组头像上传失败', error);
      });

      this.dialogVisible = false;
    },
    refreshGroupList() {
      getgroups().then(res => {
        this.$store.commit('setGroups', res.data.data.groups);
      }).catch(err => {
        console.error(err);
      });
    },
    refreshPage() {
      this.$forceUpdate();
    },
    searchContact() {
      // Implement search logic here
    },
    selectContactType() {
      console.log('Selected contact type:', this.contactType)
    }
  }
}
</script>

<style>
input[type="radio"]:checked + label {
  @apply bg-gray-200;
}
</style>
