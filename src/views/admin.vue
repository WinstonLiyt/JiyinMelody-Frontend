<template>
    <div>
        <mainheader />
        <el-container style="min-height: 100vh">
            <el-aside :width="sideWidth" style="background-color: rgb(238, 241, 246);">
                <el-menu :default-openeds="['1', '3']"
                    style="min-height: 100%;overflow-x: hidden; box-shadow: 2px 0 6px rgb(0 21 41/35%);"
                    background-color="rgb(48, 65, 86)" text-color="#fff" active-text-color="#ffd04b"
                    :collapse-transition="false" :collapse="isCollapse">

                    <div style="height: 60px; line-height: 60px; text-align: center;">
                        <b style="color: white;" v-show="logoTexthow">管理员系统</b>
                    </div>

                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span slot="title">通知管理</span>
                        </template>
                        <el-menu-item index="1-1" @click="Click_noticeGlobal">全局通知</el-menu-item>
                    </el-submenu>


                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-message"></i>
                            <span slot="title">申请管理</span>
                        </template>

                        <el-menu-item-group>
                            <template slot="title">待处理</template>
                            <el-menu-item index="2-1" @click="Click_applicationMusic">乐手申请</el-menu-item>

                        </el-menu-item-group>

                    </el-submenu>
                </el-menu>
            </el-aside>

            <el-container>


                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>管理员系统</el-breadcrumb-item>
                        <el-breadcrumb-item>{{ submenuFirst }}</el-breadcrumb-item>
                        <el-breadcrumb-item>{{ submenuSecond }}</el-breadcrumb-item>
                    </el-breadcrumb>


                    <div v-if="firstPageChosen" style="margin-top: 20px;">


                        <div style="margin-bottom: 20px;">
                            <el-button type="primary" @click="noticeEditFlag = true">创建新通知<i
                                    class="el-icon-circle-plus-outline"></i></el-button>
                        </div>


                        <el-table :data="visibleNoticeData" stripe header-cell-class-name="headerb-g-c">
                            <el-table-column prop="id" label="通知id" width="140">
                            </el-table-column>

                            <el-table-column prop="category" label="通知类型" width="120">
                            </el-table-column>

                            <el-table-column prop="timestamp" label="通知时间">
                            </el-table-column>

                            <el-table-column prop="content" label="通知内容">
                            </el-table-column>

                        </el-table>

                        <div style="padding: 10px 0;">
                            <el-pagination :page-sizes="[5, 10, 15, 20]" :page-size="pageSizeNotice"
                                layout="total, sizes, prev, pager, next, jumper" :total="tableNoticeData.length"
                                @size-change="handleSizeChange_Notice" @current-change="handleCurrentChange_Notice">
                            </el-pagination>
                        </div>
                    </div>

                    <div v-if="secondPageChosen" style="margin-top: 50px;">

                        <el-table :data="visibleApplicationData" stripe header-cell-class-name="headerb-g-c"
                            :default-sort="{ prop: 'id', order: 'descending' }">
                            <el-table-column prop="id" label="id" width="140">
                            </el-table-column>

                            <el-table-column prop="user_id" label="用户ID" width="120">
                            </el-table-column>

                            <el-table-column prop="video_url" label="视频">
                                <template slot-scope="scope">
                                    <a @click="playVideo(scope.row.video_url)"
                                        style="cursor: pointer; color: blue;">播放视频</a>
                                </template>
                            </el-table-column>

                            <el-table-column prop="status" label="审核状态" width="120">
                            </el-table-column>

                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button type="success" @click="approve_application(scope.row)">通过<i
                                            class="el-icon-edit"></i></el-button>
                                    <el-button type="danger" @click="reject_application(scope.row)">驳回<i
                                            class="el-icon-remove-outline"></i></el-button>
                                </template>
                            </el-table-column>

                        </el-table>

                        <div style="padding: 10px 0;">
                            <el-pagination :page-sizes="[5, 10, 15, 20]" :page-size="pageSizeApplication"
                                layout="total, sizes, prev, pager, next, jumper" :total="tableApplicationData.length"
                                @size-change="handleSizeChange_Application"
                                @current-change="handleCurrentChange_Application">

                            </el-pagination>
                        </div>
                    </div>

                </el-main>


                <el-dialog title="创建全局通知" :visible.sync="noticeEditFlag" width="30%">

                    <el-form ref="form" label-width="80px">
                        <el-form-item label="通知内容:">
                            <el-input type="textarea" v-model="helpCreateNotice.content"></el-input>
                        </el-form-item>

                    </el-form>

                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="Click_createNotice_True">确 定</el-button>
                        <el-button @click="Click_createNotice_False">取 消</el-button>
                    </span>
                </el-dialog>


                <el-dialog :visible.sync="dialogVisible" title="视频播放" width="50%">
                    <video controls :src="videoUrl" style="width: 100%;"></video>
                </el-dialog>


            </el-container>
        </el-container>
    </div>
</template>

<script>
import { createNoticeGlobal, getMusicApplication, getMusicianList, getNoticeGlobal, reviewMusicApplication, reviewMusician, searchUser, updateAdmin } from "@/api/admin";
import Aside from "@/components/Aside"
import Header from "@/components/Header";
import mainheader from '@/components/mainheader.vue'


export default {
    name: "user",

    computed: {

        //显示表格中的申请信息
        visibleApplicationData() {
            const startIndexApplication = (this.currentPageApplication - 1) * this.pageSizeApplication;
            const endIndexApplication = startIndexApplication + this.pageSizeApplication;
            return this.tableApplicationData.slice(startIndexApplication, endIndexApplication);
        },

        //显示表格中的通知信息
        visibleNoticeData() {
            const startIndexNotice = (this.currentPageNotice - 1) * this.pageSizeNotice;
            const endIndexNotice = startIndexNotice + this.pageSizeNotice;
            return this.tableNoticeData.slice(startIndexNotice, endIndexNotice);
        }
    },

    data() {
        return {
            //实现界面切换的数据（乐手申请界面 和 全局通知界面）
            submenuFirst: "",
            submenuSecond: "",

            firstPageChosen: 0,
            secondPageChosen: 0,

            //实现申请换页的数据
            pageSizeApplication: 20,
            currentPageApplication: 1,

            //实现通知换页的数据
            pageSizeNotice: 20,
            currentPageNotice: 1,

            noticeEditFlag: false,
            dialogVisible: false,

            videoUrl: '',

            //当前用户的信息
            currentUser: {

            },

            collapseBtnClass: 'el-icon-s-fold',
            isCollapse: false,
            sideWidth: "200",
            logoTexthow: true,

            helpCreateNotice: {
                content: "",
                category: "全局通知",
            },

            helpReviewApplication: {
                applicationId: 0,
                agree: 0,
            },

            tableApplicationData: [
            ],

            tableNoticeData: [
            ],

        }
    },

    components: {
        Aside,
        Header,
        mainheader
    },


    created() {
        this.currentUser = JSON.parse(localStorage.getItem('loginuser'));
        this.handleGetMusicApplication();
        this.handleGetNoticeGlobal();

    },

    methods: {

        playVideo(videoUrl) {
            this.videoUrl = videoUrl;
            this.dialogVisible = true;
        },


        //实现申请换页的方法
        handleSizeChangeApplication(size) {
            this.pageSizeApplication = size;
        },

        handleCurrentChangeApplication(val) {
            this.currentPageApplication = val;
            console.log(val);
        },


        //实现通知换页的方法
        handleSizeChangeNotice(size) {
            this.pageSizeNotice = size;
        },

        handleCurrentChangeNotice(val) {
            this.currentPageNotice = val;
            console.log(val);
        },

        clickNoticeGlobal() {
            this.submenuFirst = "通知管理";
            this.submenuSecond = "全局通知";

            this.firstPageChosen = 1;
            this.secondPageChosen = 0;

            // 对获取的数据按照 timestamp 属性进行降序排序
            this.tableNoticeData.sort((a, b) => {
                return b.timestamp - a.timestamp;
            });
        },

        clickApplicationMusic() {
            this.submenuFirst = "申请管理";
            this.submenuSecond = "乐手申请";

            this.firstPageChosen = 0;
            this.secondPageChosen = 1;
            // this.ThreePage = 1;


            this.tableApplicationData.sort((a, b) => {
                return a.id - b.id;
            });

        },

        clickCreateNoticeTrue() {
            if (this.helpCreateNotice.content) {
                this.noticeEditFlag = false;
                this.handleCreateNoticeGlobal();
                this.helpCreateNotice.content = null;

                this.$message({
                    message: '通知已发布',
                    type: 'success'
                });
                //创建通知成功提示
            }
            else {
                this.$message.error('信息未填写完成');
            }
        },

        clickCreateNoticeFalse() {
            this.helpCreateNotice.content = null;

            this.noticeEditFlag = false;

            this.$message.error('通知未发布');

            //创建通知成功提示
        },

        approveApplication(row) {
            this.helpReviewApplication.applicationId = row.id;
            this.helpReviewApplication.agree = true;
            console.log(this.helpReviewApplication.applicationId);
            console.log(this.helpReviewApplication.agree);

            this.Review_MusicApplication();
        },

        rejectApplication(row) {
            this.helpReviewApplication.applicationId = row.id;
            this.helpReviewApplication.agree = false;
            console.log(this.helpReviewApplication.applicationId);
            console.log(this.helpReviewApplication.agree);

            this.Review_MusicApplication();
        },

        collapse() {//点击收缩按钮触发
            this.isCollapse = !this.isCollapse
            if (this.isCollapse) {//收缩
                this.sideWidth = 64
                this.collapseBtnClass = 'el-icon-s-unfold'
                this.logoTexthow = false
            }
            else {//展开
                this.sideWidth = "200"
                this.collapseBtnClass = 'el-icon-s-fold'
                this.logoTexthow = true
            }
        },

        //接口函数
        getNoticeGlobal() {
            getNoticeGlobal().then(response => {
                console.log(response.data);
                if (response.data.code === 200) {
                    this.tableNoticeData = response.data.data.notices;
                    console.log("boke")
                } else {
                    // 获取音乐家列表失败，显示失败消息
                    this.$message.error(response.data.msg);
                }
            })
                .catch(error => {
                    // 处理请求失败的逻辑
                    console.error('请求失败:', error);
                });
        },


        handleCreateNoticeGlobal() {
            createNoticeGlobal({
                content: this.helpCreateNotice.content,
                category: this.helpCreateNotice.category,
            }).then(response => {
                console.log(response.data);
                if (response.data.code === 200) {
                    console.log("boke")
                } else {
                    // 审核音乐家失败，显示失败消息
                    this.$message.error(response.data.msg);
                }
            })
                .catch(error => {
                    // 处理请求失败的逻辑
                    console.error('请求失败:', error);
                });
        },


        handleGetMusicApplication() {
            getMusicApplication().then(response => {
                console.log(response.data);
                if (response.data.code === 200) {
                    this.tableApplicationData = response.data.data.applications;
                    console.log("boke")
                } else {
                    // 获取音乐家列表失败，显示失败消息
                    this.$message.error(response.data.msg);
                }
            })
                .catch(error => {
                    // 处理请求失败的逻辑
                    console.error('请求失败:', error);
                });
        },


        handleReviewMusicApplication() {
            reviewMusicApplication({
                application_id: this.helpReviewApplication.applicationId,
                agree: this.helpReviewApplication.agree,
            }).then(response => {
                console.log(response.data);
                if (response.data.code === 200) {
                    console.log("boke")
                } else {
                    // 审核音乐家失败，显示失败消息
                    this.$message.error(response.data.msg);
                }
            })
                .catch(error => {
                    // 处理请求失败的逻辑
                    console.error('请求失败:', error);
                });
        },
    },



}

</script>

<style scoped>
.headerb-g-c {
    background: rgb(1, 117, 117) !important;
}
</style>