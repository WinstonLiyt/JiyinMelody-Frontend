<template>
    <div>
        <mainheader />
        <el-container style="min-height: 100vh">
            <el-aside :width="sidewidth" style="background-color: rgb(238, 241, 246);">
                <el-menu :default-openeds="['1', '3']"
                    style="min-height: 100%;overflow-x: hidden; box-shadow: 2px 0 6px rgb(0 21 41/35%);"
                    background-color="rgb(48, 65, 86)" text-color="#fff" active-text-color="#ffd04b"
                    :collapse-transition="false" :collapse="isCollapse">

                    <div style="height: 60px; line-height: 60px; text-align: center;">
                        <b style="color: white;" v-show="logotextshow">管理员系统</b>
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
                            <!-- <el-menu-item index="2-1" @click="Click_applicationAdmin">管理员申请</el-menu-item> -->
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
                        <el-breadcrumb-item>{{ page_one }}</el-breadcrumb-item>
                        <el-breadcrumb-item>{{ page_two }}</el-breadcrumb-item>
                    </el-breadcrumb>


                    <div v-if="OnePage" style="margin-top: 20px;">


                        <div style="margin-bottom: 20px;">
                            <el-button type="primary" @click="NoticeEditFlag = true">创建新通知<i
                                    class="el-icon-circle-plus-outline"></i></el-button>
                        </div>


                        <el-table :data="visible_NoticeData" stripe header-cell-class-name="headerb-g-c">
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
                            <el-pagination :page-sizes="[5, 10, 15, 20]" :page-size="pageSize_Notice"
                                layout="total, sizes, prev, pager, next, jumper" :total="table_NoticeData.length"
                                @size-change="handleSizeChange_Notice" @current-change="handleCurrentChange_Notice">
                            </el-pagination>
                        </div>
                    </div>

                    <div v-if="TwoPage" style="margin-top: 50px;">
                        <!-- <div style="margin: 10px 0;">
                        <el-input style="width: 220px; margin-left: 25px" placeholder="请输入id" suffix-icon="el-icon-user-solid"></el-input>
                        <el-button style="margin-left: 25px;" type="primary">搜索</el-button>
                    </div> -->

                        <el-table :data="visible_ApplicationData" stripe header-cell-class-name="headerb-g-c"
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
                            <el-pagination :page-sizes="[5, 10, 15, 20]" :page-size="pageSize_Application"
                                layout="total, sizes, prev, pager, next, jumper" :total="table_ApplicationData.length"
                                @size-change="handleSizeChange_Application"
                                @current-change="handleCurrentChange_Application">

                            </el-pagination>
                        </div>
                    </div>

                </el-main>


                <el-dialog title="创建全局通知" :visible.sync="NoticeEditFlag" width="30%">

                    <el-form ref="form" label-width="80px">
                        <el-form-item label="通知内容:">
                            <el-input type="textarea" v-model="help_create_notice.content"></el-input>
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
        visible_ApplicationData() {
            const startIndex_Application = (this.currentPage_Application - 1) * this.pageSize_Application;
            const endIndex_Application = startIndex_Application + this.pageSize_Application;
            return this.table_ApplicationData.slice(startIndex_Application, endIndex_Application);
        },

        //显示表格中的通知信息
        visible_NoticeData() {
            const startIndex_Notice = (this.currentPage_Notice - 1) * this.pageSize_Notice;
            const endIndex_Notice = startIndex_Notice + this.pageSize_Notice;
            return this.table_NoticeData.slice(startIndex_Notice, endIndex_Notice);
        }
    },

    data() {
        return {


            //实现界面切换的数据（乐手申请界面 和 全局通知界面）
            page_one: "",
            page_two: "",

            OnePage: 0,
            TwoPage: 0,
            // ThreePage: 0,


            //实现申请换页的数据
            pageSize_Application: 20,
            currentPage_Application: 1,

            //实现通知换页的数据
            pageSize_Notice: 20,
            currentPage_Notice: 1,

            NoticeEditFlag: false,
            dialogVisible: false,

            videoUrl: '',




            //当前用户的信息
            current_user: {

            },


            collapseBtnClass: 'el-icon-s-fold',
            isCollapse: false,
            sidewidth: "200",
            logotextshow: true,


            help_create_notice: {
                content: "",
                category: "全局通知",
            },


            help_review_Application: {
                application_id: 0,
                agree: 0,
            },


            table_ApplicationData: [
            ],


            table_NoticeData: [
            ],

        }
    },

    components: {
        Aside,
        Header,
        mainheader
    },


    created() {
        this.current_user = JSON.parse(localStorage.getItem('loginuser'));
        this.Get_MusicApplication();
        this.Get_NoticeGlobal();
    },

    methods: {

        playVideo(videoUrl) {
            this.videoUrl = videoUrl;
            this.dialogVisible = true;
        },


        //实现申请换页的方法
        handleSizeChange_Application(size) {
            this.pageSize_Application = size;
        },

        handleCurrentChange_Application(val) {
            this.currentPage_Application = val;
            console.log(val);
        },


        //实现通知换页的方法
        handleSizeChange_Notice(size) {
            this.pageSize_Notice = size;
        },

        handleCurrentChange_Notice(val) {
            this.currentPage_Notice = val;
            console.log(val);
        },

        Click_noticeGlobal() {
            this.page_one = "通知管理";
            this.page_two = "全局通知";

            this.OnePage = 1;
            this.TwoPage = 0;
            // this.ThreePage = 1;


            // 对获取的数据按照 timestamp 属性进行降序排序
            this.table_NoticeData.sort((a, b) => {
                return b.timestamp - a.timestamp;
            });
        },

        Click_applicationMusic() {
            this.page_one = "申请管理";
            this.page_two = "乐手申请";

            this.OnePage = 0;
            this.TwoPage = 1;
            // this.ThreePage = 1;


            this.table_ApplicationData.sort((a, b) => {
                return a.id - b.id;
            });

        },

        Click_createNotice_True() {
            if (this.help_create_notice.content) {
                this.NoticeEditFlag = false;
                this.Create_NoticeGlobal();

                this.help_create_notice.content = null;

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

        Click_createNotice_False() {
            this.help_create_notice.content = null;

            this.NoticeEditFlag = false;

            this.$message.error('通知未发布');

            //创建通知成功提示
        },

        approve_application(row) {
            this.help_review_Application.application_id = row.id;
            this.help_review_Application.agree = true;
            console.log(this.help_review_Application.application_id);
            console.log(this.help_review_Application.agree);

            this.Review_MusicApplication();
        },

        reject_application(row) {
            this.help_review_Application.application_id = row.id;
            this.help_review_Application.agree = false;
            console.log(this.help_review_Application.application_id);
            console.log(this.help_review_Application.agree);

            this.Review_MusicApplication();
        },

        collapse() {//点击收缩按钮触发
            this.isCollapse = !this.isCollapse
            if (this.isCollapse) {//收缩
                this.sidewidth = 64
                this.collapseBtnClass = 'el-icon-s-unfold'
                this.logotextshow = false
            }
            else {//展开
                this.sidewidth = "200"
                this.collapseBtnClass = 'el-icon-s-fold'
                this.logotextshow = true
            }
        },

        //接口函数
        Get_NoticeGlobal() {
            getNoticeGlobal().then(response => {
                console.log(response.data);
                if (response.data.code === 200) {
                    this.table_NoticeData = response.data.data.notices;
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


        Create_NoticeGlobal() {
            createNoticeGlobal({
                content: this.help_create_notice.content,
                category: this.help_create_notice.category,
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


        Get_MusicApplication() {
            getMusicApplication().then(response => {
                console.log(response.data);
                if (response.data.code === 200) {
                    this.table_ApplicationData = response.data.data.applications;
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


        Review_MusicApplication() {
            reviewMusicApplication({
                application_id: this.help_review_Application.application_id,
                agree: this.help_review_Application.agree,
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