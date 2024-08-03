import Vue from "vue";
import VueRouter from "vue-router";
import home from "../views/home.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: home,
        meta: {
            needLogin: true,
        },
    },
    {
        path: "/login/",
        name: "login",
        component: () => import("../views/login.vue"),
    },
    {
        path: "/me/",
        name: "user",
        component: () => import("../views/user.vue"),
    },
    {
        path: "/register/",
        name: "register",
        component: () => import("../views/register.vue"),
    },
    {
        path: "/findpass/",
        name: "findpass",
        component: () => import("../views/findpass.vue"),
    },
    {
        path: "/blogs/",
        name: "blogs",
        component: () => import("../views/blogs.vue"),
    },
    {
        path: "/blogs/:blogid",
        name: "blogdetail",
        component: () => import("../views/blogdetail.vue"),
        props: true,
    },
    {
        path: "/createblog",
        name: "createblog",
        component: () => import("../views/createblog.vue"),
    },
    {
        path: "/search",
        name: "search",
        component: () => import("../views/search.vue"),
    },
    {
        path: "/Chatmain",
        name: "Chatmain",
        component: () => import("../views/chatMain.vue"),
    },
    {
        path: "/activities",
        name: "activities",
        component: () => import("../views/activities.vue"),
    },
    {
        path: "/activities/:activityid/:out_dated",
        name: "activitydetail",
        component: () => import("../views/activitydetail.vue"),
        props: true,
    },
    {
        path: "/createactivity",
        name: "createactivity",
        component: () => import("../views/createActivity.vue"),
    },
    {
        path: "/creatework/:activityid",
        name: "creatework",
        component: () => import("../views/creatework.vue"),
        props: true,
    },

    //群聊管理
    {
        path: "/group/:groupid",
        name: "group_manage",
        component: () => import("../views/group_manage.vue"),
        props: true,
    },
    {
        path: "/admin/",
        name: "admin",
        component: () => import("../views/admin.vue"),
    },
    {
        path: "/user/:id",
        name: "UserView",
        component: () => import("@/views/UserView.vue"),
        children: [
            {
                path: "/workView/:id",
                name: "workView",
                component: () => import("@/views/workView.vue"),
                props: true,
            },
            {
                path: "/collectView/:id",
                name: "collect",
                component: () => import("@/views/collectView.vue"),
                props: true,
            },
            {
                path: "/friendView/:id",
                name: "friendView",
                component: () => import("@/views/friendView.vue"),
                props: true,
            },
        ],
        props: true,
    },

    {
        path: "/other/:id",
        name: "OtherView",
        component: () => import("@/views/OtherView.vue"),
        children: [
            {
                path: "/otehr/workView/:id",
                name: "otherworkView",
                component: () => import("@/views/otherworkView.vue"),
                props: true,
            },
            {
                // path: '/personal/info/:id',
                path: "/other/infoView/:id",
                name: "otherinfoView",
                component: () => import("@/views/infotherView.vue"),
                props: true,
            },
        ],
        props: true,
    },

    {
        path: "/EditView/:id",
        name: "EditView",
        component: () => import(/* webpackChunkName: "about" */ "../views/EditView.vue"),
        children: [
            {
                // path: '/personal/info/:id',
                path: "/EditView/infoView/:id",
                name: "editinfoView",
                component: () => import("@/views/infoView.vue"),
                props: true,
            },
        ],
        props: true,
    },

    {
        path: "/editblog/:blogid",
        name: "editblog",
        component: () => import(/* webpackChunkName: "about" */ "@/views/editblog.vue"),
        props: true,
    },
];

const router = new VueRouter({
    mode: "hash",
    base: process.env.BASE_URL,
    routes,
});

export default router;
