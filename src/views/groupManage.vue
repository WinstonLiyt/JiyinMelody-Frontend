<template>
    <div class="main-container">

        <!-- 上方的首页栏 -->
        <el-header style="padding: 0">
            <div style="height: 60px; background-color: #1e80ff" class="flexcenter"></div>
        </el-header>


        <div class="parent-container">
            <div class="centered-container">
                <div class="container">
                    <div class="img_top">
                        <img src="@/assets/findpass.png" alt="" />
                    </div>
                    <div class="image-container">
                        <img style="width: 100px; height: 100px" :src="group.image_url" alt="Default Image"
                            class="round-image" />
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
                        <div class="message_title">简介: <i class="el-icon-edit icon" @click="clickUpdateInfo"></i></div>
                        <div class="message_text">
                            {{ group.description }}
                        </div>
                    </div>
                </div>

                <div class="right_container">
                    <div class="card">
                        <div class="image-container1" style="max-height: 300px; overflow-y: auto;">
                            <div v-for="(item, index) in groupUser" :key="index" class="image-wrapper">

                                <img :src="item.image_url" alt="Default Image" class="rounded-image" />
                                <div class="name">{{ item.nickname }} <span v-if="index == 0" class="Group-dot"></span>
                                </div>
                            </div>

                        </div>
                        <div class="btn_options">
                            <img src="@/assets/addhead.jpg" @click="clickAddUser" alt="Default Image"
                                class="rounded-image" />
                            <img v-if="group.is_owner === true" src="@/assets/minus.png" @click="clickDeleteUser"
                                alt="Default Image" class="rounded-image" />
                        </div>
                        <div class="back">

                            <div style="
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                margin-top: 20px;
                            ">
                                <el-button style="margin-top: 20px;" type="danger" @click="handleDeleteExit"> {{ group.is_owner
                                    === true ? '解散群聊' : '退出群聊' }}</el-button>

                            </div>
                            <div style="
                                margin-top: 20px;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                            ">
                                <el-button style="border: 5px,red;" type="primary" @click="returnGroup">返回群聊</el-button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>


        <el-backtop></el-backtop>


        <el-dialog title="修改群信息" :visible.sync="groupEditFlag" width="30%">

            <el-form ref="form" label-width="80px">
                <el-form-item label="新的群名:">
                    <el-input v-model="editGroup.new_name"></el-input>
                </el-form-item>


                <el-form-item label="上传头像" prop="image">
                    <input type="file" ref="fileInput" accept="image/*" @change="handleFileChange" style="display: none">
                    <el-button type="primary" @click="triggerFileInput">上传<i
                            class="el-icon-upload el-icon--right"></i></el-button>
                </el-form-item>

                <div v-if="object.url !== null">
                    <img :src="object.url" alt="" />
                </div>


                <el-form-item label="新的简介:">
                    <el-input type="textarea" v-model="editGroup.new_description"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="clickUpdateInfoTrue">确 定</el-button>
                <el-button @click="clickUpdateInfoFalse">取 消</el-button>
            </span>
        </el-dialog>


        <el-dialog title="添加群成员" :visible.sync="addUserFlag" width="30%">

            <el-form ref="form" label-width="80px">
                <el-form-item label="群聊人员">
                    <el-select v-model="formAddUser.id" placeholder="请选择群聊人员">
                        <el-option v-for="(item, index) in newUsers" :key="index" :label="item.nickname"
                            :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="clickAddUserTrue">确 定</el-button>
                <el-button @click="clickAddUserFalse">取 消</el-button>
            </span>

        </el-dialog>


        <el-dialog title="减少人员" :visible.sync="deleteUserFlag" width="30%">

            <el-form ref="form" label-width="80px">
                <el-form-item label="群聊人员">
                    <el-select v-model="formDeleteUser.id" placeholder="请选择群聊人员">
                        <el-option v-for="(item, index) in oldUsers" :key="index" :label="item.nickname"
                            :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="clickDeleteUserTrue">确 定</el-button>
                <el-button @click="clickDeleteUserFalse">取 消</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import * as auth from "../utils/auth";
import { getGroupInfo, getAllFriend, UpdateGroupInfo, AddGroupUser, DeleteGroupUser, DeleteGroup, ExitGroup, upload } from "@/api/groupManage";

export default {

    name: "groupManage",
    props: ['groupid'],

    data() {
        return {
            groupEditFlag: false,

            addUserFlag: false,

            deleteUserFlag: false,


            images: [
                "@/assets/logo.png",
                "@/assets/logo.png",
                "@/assets/logo.png",
                // 添加更多图片路径
            ],

            textarea: "测试简介",

            currentUser: {
            },

            group:
            {
            },

            friends: [
            ],

            groupUser: [
            ],


            newUsers: [
            ],

            oldUsers: [
            ],



            //储存修改的群信息
            editGroup: {
                new_name: "",
                new_img: "",
                new_description: "",
            },

            //储存添加的群成员信息
            formAddUser: {
                id: "",
                nickname: "",
            },

            //储存删除的群成员信息
            formDeleteUser: {
                id: "",
                nickname: "",
            },



            imageUrl: "",


            object: {
            }
        };
    },

    computed: {
    },

    created() {
        this.currentUser = JSON.parse(localStorage.getItem('loginuser'));
        this.handleGetGroupInfo();
        this.handleGetFridendlist();
    },



    methods: {

        updateNewUser() {
            const newFriend = [];
            this.friends.forEach((friend) => {
                let tag = 1;
                this.groupUser.forEach((member) => {
                    if (friend.id == member.id) {
                        tag = 0;
                    }
                })
                if (tag)
                    newFriend.push(friend);
            })

            // 更新 newUsers 数组  
            this.newUsers = newFriend;
        },


        updateOldUser() {
            const newFriend = [];
            this.groupUser.forEach((Group_user) => {
                let tag = 1;
                if (Group_user.id == this.currentUser.id) {
                    tag = 0;
                }
                if (tag)
                    newFriend.push(Group_user);
            })

            // 更新 newUsers 数组  
            this.oldUsers = newFriend;
        },

        clickUpdateInfo() {
            if (this.group.is_owner === true) {
                this.groupEditFlag = true;
            }
            else {
                this.$message.error('这有群主才能修改群信息');
            }
        },

        clickUpdateInfoTrue() {
            if (this.editGroup.new_name && this.editGroup.new_description && this.object.id) {
                this.groupEditFlag = false;
                this.handleUpdateGroupInfo();

                this.editGroup.new_name = null;
                this.editGroup.new_description = null;
                this.object.id = null;

                this.$message({
                    message: '群信息已经成功修改',
                    type: 'success'
                });
            }
            else {
                this.$message.error('信息未填写完成');
            }

        },

        clickUpdateInfoFalse() {
            this.editGroup.new_name = null;
            this.editGroup.new_description = null;
            this.object.id = null;
            this.groupEditFlag = false;
            this.$message.error('群信息未修改');
        },

        clickAddUser() {
            this.updateNewUser();
            this.addUserFlag = true;
        },

        clickAddUserTrue() {
            if (this.formAddUser.id) {
                this.addUserFlag = false;
                this.handleAddUser();

                this.formAddUser.id = null;

                this.$message({
                    message: '成功发送邀请',
                    type: 'success'
                });
            }
            else {
                this.$message.error('信息未填写完成');
            }

        },

        clickAddUserFalse() {
            this.formAddUser.id = null;
            this.addUserFlag = false;

            this.$message.error('未发送邀请');
        },

        clickDeleteUser() {
            this.updateOldUser();
            if (this.group.is_owner === true) {
                this.deleteUserFlag = true;
            }
            else {
                this.$message.error('你并不是管理员，无法操作');
            }
        },

        clickDeleteUserTrue() {
            if (this.formDeleteUser.id) {
                this.deleteUserFlag = false;
                this.handleDeleteUser();

                this.formDeleteUser.id = null;

                this.$message({
                    message: '已经将其移出群聊',
                    type: 'success'
                });
            }
            else {
                this.$message.error('信息未填写完成');
            }
        },

        clickDeleteUserFalse() {
            this.formDeleteUser.id = null;

            this.deleteUserFlag = false;

            this.$message.error('操作已取消');
        },



        // 接口函数
        handleGetGroupInfo() {
            getGroupInfo(
                {
                    group_id: this.groupid
                }
            ).then(response => {
                console.log(response.data);
                if (response.data.code === 200) {
                    this.group = response.data.data;
                    this.groupUser = response.data.data.members;
                    console.log("boke")
                    console.log(this.group)
                    console.log(this.groupUser)
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
        handleGetFridendlist() {
            getAllFriend().then(response => {
                console.log(response.data);
                if (response.data.code === 200) {
                    this.friends = response.data.data.friends;
                    console.log("boke")
                    console.log(this.newUsers)
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
        handleUpdateGroupInfo() {
            UpdateGroupInfo(
                {
                    group_id: this.group.id,
                    name: this.editGroup.new_name,
                    description: this.editGroup.new_description,
                    image_file_id: this.object.id
                }
            ).then(response => {
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


        handleAddUser() {
            AddGroupUser({
                user_id: this.formAddUser.id,
                group_id: this.group.id
            }).then(response => {
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

        handleDeleteUser() {
            DeleteGroupUser({
                user_id: this.formDeleteUser.id,
                group_id: this.group.id
            }).then(response => {
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

        handleDeleteExit() {
            if (this.group.is_owner === true) {
                this.$confirm('此操作将解散这个群组, 是否继续?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.handleDeleteGroup();
                    this.$router.back();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            }
            else {
                this.$confirm('此操作将退出这个群组, 是否继续?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.handleExitGroup();
                    this.$router.back();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },


        handleExitGroup() {
            ExitGroup({
                group_id: this.group.id
            }).then(response => {
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


        handleDeleteGroup() {
            DeleteGroup({
                group_id: this.group.id
            }).then(response => {
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
                this.uploadFile();
            }
        },

        uploadFile() {
            console.log(this.selectedfile);
            upload({
                file: this.selectedfile,
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
    height: 90vh;
    /* 父容器的高度设置为视口高度 */
    width: 100vw;
    /* 父容器的宽度设置为视口宽度 */
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
    margin-left: 20px;
    /* 添加间距使表单与图片分开 */
    color: #fff;
    text-align: left;
    /* 确保文本左对齐 */
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
    gap: 10px;
    /* 图片之间的间距 */
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

.back {
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
    margin-left: 5px;
    /* 可根据需要调整位置 */
}
</style>
