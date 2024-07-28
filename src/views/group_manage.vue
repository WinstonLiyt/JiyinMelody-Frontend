<template>
    <div class="main-container">

        <!-- 上方的首页栏 -->
        <el-header style="padding: 0">
            <div
                style="height: 60px; background-color: #1e80ff"
                class="flexcenter"
            ></div>
        </el-header>



        <div class="parent-container">
            <div class="centered-container">
                <div class="container">
                    <div class="img_top">
                        <img src="@/assets/findpass.png" alt="" />
                    </div>
                    <div class="image-container">
                        <img
                            style="width: 100px; height: 100px"
                            :src=  "group.image_url"
                            alt="Default Image"
                            class="round-image"
                        />
                        <div class="left_name" style="display: flex; flex-direction: column;">
                            <div>
                                <label for="name">群名:</label>
                            </div>
                            <div>
                                <label for="">{{ group.name }}</label>
                            </div>   
                        </div>

                    </div>
                    <div class="form-container">
                        <div class="message_title">简介: <i class="el-icon-edit icon" @click="Click_UpdateInfo"></i></div>
                        <div class="message_text">
                            {{ group.description }}
                        </div>
                    </div>
                </div>

                <div class="right_container"  >
                    <div class="card">
                        <div class="image-container1" style="max-height: 300px; overflow-y: auto;">
                            <div v-for="(item, index) in Group_users"
                                :key="index"
                                class="image-wrapper">

                                <img
                                    :src="item.image_url"
                                    alt="Default Image"
                                    class="rounded-image"
                                />
                                <div class="name">{{ item.nickname }} <span v-if="index == 0" class="Group-dot"></span></div>
                            </div>

                            <!-- <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
                                <li v-for="i in count" class="infinite-list-item">{{ i }}</li>
                            </ul> -->



                        </div>
                        <div class="btn_options">
                                <img
                                    src="@/assets/addhead.jpg"
                                    @click="Click_AddUser"
                                    alt="Default Image"
                                    class="rounded-image"/>
                                <img
                                    v-if="group.is_owner === true"
                                    src="@/assets/minus.png"
                                    @click="Click_DeleteUser"
                                    alt="Default Image"
                                    class="rounded-image"/>
                        </div>
                        <div class = "back" >

                            <div
                            style="
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                margin-top: 20px;
                            "
                        >
                            <el-button
                                style="margin-top: 20px;"
                                type="danger"
                                @click="delete_exit"
                                > {{ group.is_owner === true ? '解散群聊' : '退出群聊' }}</el-button>

                            </div>
                            <div
                            style="
                                margin-top: 20px;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                            "
                        >
                            <el-button 
                            style="border: 5px,red;"
                            type="primary"
                            @click="returnGroup"
                                >返回群聊</el-button
                            >
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>


        <el-backtop></el-backtop>


        <el-dialog
            title="修改群信息"
            :visible.sync="GroupEditFlag"
            width="30%">

            <el-form ref="form" label-width="80px" >
                <el-form-item label="新的群名:">
                    <el-input v-model="Edit_group.new_name"></el-input>
                </el-form-item>



                <el-form-item label="上传头像" prop="image">
                    <input type="file" ref="fileInput" accept="image/*" @change="handleFileChange" style="display: none">
                    <el-button type="primary" @click="triggerFileInput">上传<i class="el-icon-upload el-icon--right"></i></el-button>
                </el-form-item>

                <div v-if="object.url !== null">
                    <img :src= "object.url" alt="" />
                </div>



                <el-form-item label="新的简介:">
                    <el-input type="textarea" v-model="Edit_group.new_description"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="Click_UpdateInfo_True"
                    >确 定</el-button
                >
                <el-button @click="Click_UpdateInfo_False">取 消</el-button>
            </span>
        </el-dialog>


        <el-dialog
            title="添加群成员"
            :visible.sync="AddUserFlag"
            width="30%">

            <el-form ref="form" label-width="80px">
                <el-form-item label="群聊人员">
                    <el-select v-model="form_addUser.id" placeholder="请选择群聊人员">
                        <el-option
                            v-for="(item, index) in New_users"
                            :key="index"
                            :label="item.nickname"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="Click_AddUser_True"
                    >确 定</el-button
                >
                <el-button @click="Click_AddUser_False">取 消</el-button>
                <!-- <el-button @click="AddUserFlag = false, form_addUser.id = fo_user.id, form_addUser.nickname = fo_user.nickname">取 消</el-button> -->
            </span>

        </el-dialog>


        <el-dialog
            title="减少人员"
            :visible.sync="DeleteUserFlag"
            width="30%">

            <el-form ref="form" label-width="80px">
                <el-form-item label="群聊人员">
                    <el-select v-model="form_deleteUser.id" placeholder="请选择群聊人员">
                        <el-option
                            v-for="(item, index) in Old_users"
                            :key="index"
                            :label="item.nickname"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="Click_DeleteUser_True"
                    >确 定</el-button
                >
                <el-button @click="Click_DeleteUser_False">取 消</el-button>
                <!-- <el-button @click="DeleteUserFlag = false, form_deleteUser.id = fo_user.id, form_deleteUser.nickname = fo_user.nickname">取 消</el-button> -->
            </span>

        </el-dialog>


    </div>
</template>

<script>
import * as auth from "../utils/auth";
import {getGroupInfo,getAllFriend,UpdateGroupInfo,AddGroupUser,DeleteGroupUser,DeleteGroup,ExitGroup,upload} from "@/api/group_manage";

export default {

    name: "group_manage",
    props: ['groupid'],

    data() {
        return {
            GroupEditFlag: false,

            AddUserFlag: false,

            DeleteUserFlag: false,


            images: [
                "@/assets/logo.png",
                "@/assets/logo.png",
                "@/assets/logo.png",
                // 添加更多图片路径
            ],

            textarea: "测试简介",

            current_user: {
            },
            
            group: 
            {
            },

            Friends: [
            ],

            Group_users: [
            ],


            New_users: [
            ],

            Old_users: [
            ],



            //储存修改的群信息
            Edit_group: {
                new_name: "",
                new_img: "",
                new_description: "",
            },

            // fo_user: {
            //     id: "",
            //     nickname: "",
            // },

            //储存添加的群成员信息
            form_addUser: {
                id: "",
                nickname: "",
            },

            //储存删除的群成员信息
            form_deleteUser: {
                id: "",
                nickname: "",
            },



            imageUrl: "",


            object:{
            }
        };
    },

    computed: {
  },

    created() {
        this.current_user = JSON.parse(localStorage.getItem('loginuser'));
        this.get_GroupInfo();
        this.get_Fridendlist();
    },


    
    methods: {

        Update_new_user()
        {
            const newFriend = [];
            this.Friends.forEach( (friend) => {
                let tag = 1;
                this.Group_users.forEach( (member) => {
                    if(friend.id == member.id)
                    {
                        tag=0;
                    }
                })
                if(tag)
                    newFriend.push(friend);
            })

            // 更新 New_users 数组  
            this.New_users = newFriend;
        },


        Update_old_user()
        {
            const newFriend = [];
            this.Group_users.forEach( (Group_user) => {
                let tag = 1;
                if(Group_user.id == this.current_user.id)
                {
                    tag = 0;
                }
                if (tag)
                    newFriend.push(Group_user);
            })

            // 更新 New_users 数组  
            this.Old_users = newFriend;
        },

        Click_UpdateInfo()
        {
            if(this.group.is_owner === true)
            {
                this.GroupEditFlag = true;
            }
            else{
                this.$message.error('这有群主才能修改群信息');
            }
        },

        Click_UpdateInfo_True()
        {
            if(this.Edit_group.new_name && this.Edit_group.new_description && this.object.id)
            {
                this.GroupEditFlag = false;
                this.update_GroupInfo();

                this.Edit_group.new_name = null;
                this.Edit_group.new_description = null;
                this.object.id = null;

                this.$message({
                    message: '群信息已经成功修改',
                    type: 'success'
                });
            }
            else{
                this.$message.error('信息未填写完成');
            }

        },

        Click_UpdateInfo_False()
        {
            this.Edit_group.new_name = null;
            this.Edit_group.new_description = null;
            this.object.id = null;
            this.GroupEditFlag = false;
            this.$message.error('群信息未修改');
        },

        Click_AddUser()
        {
            this.Update_new_user();
            this.AddUserFlag = true;
        },

        Click_AddUser_True()
        {
            if(this.form_addUser.id)
            {
                this.AddUserFlag = false;
                this.add_User();

                this.form_addUser.id = null;

                this.$message({
                    message: '成功发送邀请',
                    type: 'success'
                });
            }
            else{
                this.$message.error('信息未填写完成');
            }

        },

        Click_AddUser_False()
        {
            this.form_addUser.id = null;
            this.AddUserFlag = false;

            this.$message.error('未发送邀请');
        },

        Click_DeleteUser()
        {
            this.Update_old_user();
            if(this.group.is_owner === true)
            {
                this.DeleteUserFlag = true;
            }
            else{
                this.$message.error('你并不是管理员，无法操作');
            }
        },

        Click_DeleteUser_True()
        {
            if(this.form_deleteUser.id)
            {
                this.DeleteUserFlag = false;
                this.delete_User();

                this.form_deleteUser.id = null;

                this.$message({
                    message: '已经将其移出群聊',
                    type: 'success'
                });
            }
            else{
                this.$message.error('信息未填写完成');
            }
        },

        Click_DeleteUser_False()
        {
            this.form_deleteUser.id = null;

            this.DeleteUserFlag = false;

            this.$message.error('操作已取消');
        },



        // 接口函数
        get_GroupInfo(){
            getGroupInfo(
                {
                    group_id: this.groupid
                }
            ).then(response => {
                console.log(response.data);
                if (response.data.code === 200) {
                    this.group = response.data.data;
                    this.Group_users = response.data.data.members;
                    console.log("boke")
                    console.log(this.group)
                    console.log(this.Group_users)
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
        

        // 获得所有的朋友列表
        get_Fridendlist(){
            getAllFriend().then(response => {
                console.log(response.data);
                if (response.data.code === 200) {
                    this.Friends = response.data.data.friends;
                    console.log("boke")
                    console.log(this.New_users)
                } else {
                // 获取朋友失败，显示失败消息
                    this.$message.error(response.data.msg);
                }
            })
            .catch(error => {
                // 处理请求失败的逻辑
                console.error('请求失败:', error);
            });
        },  


        //更新群组的信息
        update_GroupInfo(){
            UpdateGroupInfo(
                {
                    group_id: this.group.id,
                    name: this.Edit_group.new_name,
                    description: this.Edit_group.new_description,
                    image_file_id: this.object.id
                }
            ).then(response => 
            {
                console.log(response.data);
                if (response.data.code === 200) {
                    this.group.id = response.data.data.id;
                    this.group.name = response.data.data.name;
                    this.group.description = response.data.data.description;
                    this.group.count = response.data.data.count;
                    this.group.image_file = response.data.data.image_url;
                } else {
                    // 更新群组信息失败，显示失败消息
                    this.$message.error(response.data.msg);
                }
            })
            .catch(error => {
                // 处理请求失败的逻辑
                console.error('请求失败:', error);
            });
        },


        add_User(){
            AddGroupUser({
                user_id: this.form_addUser.id,
                group_id: this.group.id
            }).then(response => 
            {
                console.log(response.data);
                if (response.data.code === 200) {
                } else {
                    // 邀请好友失败，显示失败消息
                    this.$message.error(response.data.msg);
                }
            })
            .catch(error => {
                // 处理请求失败的逻辑
                console.error('请求失败:', error);
            });
        },

        delete_User(){
            DeleteGroupUser({
                user_id: this.form_deleteUser.id,
                group_id: this.group.id
            }).then(response => 
            {
                console.log(response.data);
                if (response.data.code === 200) {
                } else {
                    // 邀请好友失败，显示失败消息
                    this.$message.error(response.data.msg);
                }
            })
            .catch(error => {
                // 处理请求失败的逻辑
                console.error('请求失败:', error);
            });
        },

        delete_exit()
        {
            if(this.group.is_owner === true){
                this.$confirm('此操作将解散这个群组, 是否继续?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delete_Group();
                    this.$router.back();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });

            }
            else{
                this.$confirm('此操作将退出这个群组, 是否继续?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.exit_Group();
                    this.$router.back();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            }
        },


        exit_Group(){
            ExitGroup({
                group_id: this.group.id
            }).then(response => 
            {
                console.log(response.data);
                if (response.data.code === 200) {
                } else {
                    // 退出群聊失败，显示失败消息
                    this.$message.error(response.data.msg);
                }
            })
            .catch(error => {
                // 处理请求失败的逻辑
                console.error('请求失败:', error);
            });
        },


        delete_Group(){
            DeleteGroup({
                group_id: this.group.id
            }).then(response => 
            {
                console.log(response.data);
                if (response.data.code === 200) {
                } else {
                    // 解散群聊失败，显示失败消息
                    this.$message.error(response.data.msg);
                }
            })
            .catch(error => {
                // 处理请求失败的逻辑
                console.error('请求失败:', error);
            });
        },

        //返回群聊
        returnGroup() {
            this.$router.back(); //这个路由是群聊的路由
        },

        triggerFileInput() {
            this.$refs.fileInput.value = '';
            this.$refs.fileInput.click();
        },
        handleFileChange(event) {
            this.selectedfile = event.target.files[0];
            if (this.selectedfile) {
                this.upload_file();
            }
        },

        upload_file(){
            console.log(this.selectedfile);
            upload({file: this.selectedfile,
                    usage: "群组头像",
                    category: "图像"
            }).then(response => {
                
                if (response.data.code === 200) {
                    this.object = response.data.data;
                } else {
                    this.$message.error(response.data.msg);
                }
                })
                .catch(error => {
                // 处理请求失败的逻辑
                console.error('请求失败:', error);
                });
        },

    },
};

</script>



<style scoped>

.main-container {
    width: 100%;
    height: 100%;
    background-color: rgb(243, 243, 243);
}

.parent-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh; /* 父容器的高度设置为视口高度 */
    width: 100vw; /* 父容器的宽度设置为视口宽度 */
}

.centered-container {
    width: 50%;
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 20px;
    overflow: hidden;
}

.container {
    width: 50%;
    height: 100%;
    background-color: #517a9d;
}

.img_top {
    width: 100%;
    height: 40%;
}

.img_top img {
    width: 100%;
    height: 100%;
}

.image-container {
    height: 100px;
    width: 100%;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
}

.left_name {
    width: 50%;
    /* margin-left: 10px; */
    font-size: 20px;
}

.round-image {
    height: 100%;
    border-radius: 50%;
    width: 50%;
}

.name {
    color: #0f0f0f;
    width: 50%;
}


.form-container {
    margin-top: 30px;
    width: 100%;
    margin-left: 20px; /* 添加间距使表单与图片分开 */
    color: #fff;
    text-align: left; /* 确保文本左对齐 */
}


.message_title {
    font-size: 26px;
    font-weight: 600;
}
.message_text {
    margin-top: 20px;
    width: 80%;
    font-size: 18px;
    padding: 20px;
}

.rounded-image {
    height: 40px;
    width: 40px;
    border-radius: 50%;
}



.right_container {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    grid-gap: 10px;
}

.card {
    width: 100%;
    height: 100%;
}


.image-container1 {
    /* display: flex; */
    gap: 10px; /* 图片之间的间距 */
    padding: 20px;
}


.image-wrapper {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}


.btn_options {
    position: fixed;
    bottom: 200px; 

    width: 344px;
    display: flex;
    justify-content: space-around;
    margin: 30px auto 0 auto;

}



.btn_options img {
    
    cursor: pointer;
}


.icon {
    margin-left: 20px;
    cursor: pointer;
}

.avatar {
    width: 100px;
    height: 100px;
    display: block;
}


.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.back{
    position: fixed;
    bottom: 70px;
    padding-left: 175px;

    width: 10%;
    justify-content: space-around;
    margin: 30px auto 0 auto;
} 


.Group-dot {
    display: inline-block;
    width: 15px;
    height: 15px;
    background-color: rgb(135, 206, 235);
    border-radius: 50%;
    margin-left: 5px; /* 可根据需要调整位置 */
}

</style>
