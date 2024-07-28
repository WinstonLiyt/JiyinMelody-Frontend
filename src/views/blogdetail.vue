<template>
  <div class="main-container" style="min-height: 800px;">
    <mainheader />

    <div class="main-content">
      <div style="display: flex; grid-gap: 10px">

        <div style="flex: 1; width: 0">

          <div class="card" style="padding: 30px; margin-bottom: 10px">
            <div style="font-weight: bold; font-size: 24px; margin-bottom: 20px">{{ this.blog.title }}</div>
            <div style="color: #666; margin-bottom: 20px">
              <span style="margin-right: 20px"><i class="el-icon-user"></i> {{ this.blog.author.nickname ||
                "用户" + this.blog.author.id
              }}</span>
              <span style="margin-right: 20px"><i class="el-icon-date"></i> {{ this.blog.timestamp }}</span>
              <span>
                <el-tag v-for="item in this.blog.tags" :key="item" type="primary" style="margin-right:5px">{{ item
                }}</el-tag>
              </span>
            </div>

            <div class="w-e-text" style="margin-bottom: 20px">
              <div v-html="this.blog.content"></div>
            </div>

            <div style="margin-bottom: 20px" v-if="blog.video_url !== '' && blog.video_url !== null">
              <div style="font-weight: bold; font-size: 24px; margin-bottom: 20px">视频</div>
              <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true"
                :options="playerOptions" />
            </div>

            <div v-if="blog.music_url !== null && blog.music_url !== ''">
              <div style="font-weight: bold; font-size: 24px; margin-bottom: 20px">音乐</div>
              <audio controls ref="audio" class="aud">
                <source :src="blog.music_url" />
              </audio>
            </div>

            <!--     点赞和收藏数据，转发按钮   -->
            <div class="card" style="text-align: center; font-size: 20px; color: #666; margin-bottom: 10px">
              <span style="margin-right: 20px; cursor: pointer;" @click="setlike" :class="{ 'active': blog.is_liked }"><i
                  class="el-icon-like"></i> {{ blog.like_count }}</span>
              <span style="margin-right: 20px; cursor: pointer" @click="setcollect"
                :class="{ 'active': blog.is_collected }"><i class="el-icon-star-off"></i> {{ blog.collect_count }}</span>
              <span style=" cursor: pointer" @click="openshareblog"><i class="el-icon-share"></i> </span>
              <shareblog ref="shareblog" :postId=blog.id />
            </div>

            <!--        评论-->
            <div class="card">
              <h2 style="margin-bottom: 20px">评论(共{{ blog.comment_count }}条)</h2>

              <div style="margin-bottom: 20px">
                <el-input type="textarea" placeholder="请输入评论内容" v-model="comment"></el-input>
                <div style="text-align: right; margin-top: 5px">
                  <el-button type="primary" @click="submitcomments(null)">发 布</el-button>
                </div>
              </div>

              <div>
                <div style="display: flex; grid-gap: 20px; margin-bottom: 20px" v-for="(item, index) in flagcomments"
                  :key=index v-if="item.parent_comment_id === null">
                  <img :src="item.author.image_url || defaultAvatar" alt=""
                    style="width: 50px; height: 50px; border-radius: 50%" @click="touserinfo(item.author.id)">
                  <div style="flex: 1">
                    <!--                这是第一级评论-->
                    <div style="margin-bottom: 10px">
                      <div style="color: #666; margin-bottom: 10px">{{ item.author.nickname || "用户" + item.author.id }}
                      </div>
                      <div style="color: #444; margin-bottom: 10px">{{ item.content }}</div>
                      <div style="color: #888; font-size: 13px; margin-bottom: 10px"><span style="margin-right: 20px">{{
                        item.timestamp }}</span>
                        <span style="cursor: pointer;" :class="{ 'comment-active': item.isreply }" @click="reply(item)"><i
                            class="el-icon-s-comment"></i>评论</span>
                        <span style="margin-left: 20px; cursor: pointer" @click="deletecomments(item.id)"
                          v-if="item.author.id === user.id"><i class="el-icon-delete"></i>删除</span>
                      </div>
                      <div v-if="item.isreply">
                        <el-input type="textarea" placeholder="请输入回复内容" v-model="comm_comment"></el-input>
                        <div style="text-align: right; margin-top: 5px">
                          <el-button type="primary" @click="submitcomments(item.id)">回 复</el-button>
                        </div>
                      </div>
                    </div>
                    <!--                这是回复-->
                    <div style="display: flex;  grid-gap: 20px; margin-bottom: 20px"
                      v-for="(citem, cindex) in commentreplies(item.id)" :key=cindex
                      v-if="commentreplies(item.id).length">
                      <img :src="citem.author.image_url || defaultAvatar" alt=""
                        style="width: 50px; height: 50px; border-radius: 50%" @click="touserinfo(citem.author.id)">
                      <div style="flex: 1">
                        <div style="color: #666; margin-bottom: 10px">{{ citem.author.nickname || "用户" + citem.author.id
                        }}
                          <span style="color: #333" v-if="findcommentauthor(citem.parent_comment_id).id !== user.id">回复
                            @{{
                              findcommentauthor(citem.parent_comment_id).author.nickname || "用户" +
                              findcommentauthor(citem.parent_comment_id).author.id }}</span>
                        </div>
                        <div style="color: #444; margin-bottom: 10px">{{ citem.content }}</div>
                        <div style="color: #888; font-size: 13px; margin-bottom: 10px"><span style="margin-right: 20px">{{
                          citem.timestamp }}</span>
                          <span style="cursor: pointer;" :class="{ 'comment-active': citem.isreply }"
                            @click="reply(citem)"><i class="el-icon-s-comment"></i>评论</span>
                          <span style="margin-left: 20px; cursor: pointer" @click="deletecomments(citem.id)"
                            v-if="citem.author.id === user.id"><i class="el-icon-delete"></i>删除</span>
                        </div>
                        <div v-if="citem.isreply">
                          <el-input type="textarea" placeholder="请输入回复内容" v-model="comm_comment"></el-input>
                          <div style="text-align: right; margin-top: 5px">
                            <el-button type="primary" @click="submitcomments(citem.id)">回 复</el-button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div style="width: 260px">

          <div class="card" style="margin-bottom: 10px">
            <div style="display: flex; align-items: center; grid-gap: 10px; margin-bottom: 10px">
              <img :src="blog.author.image_url || defaultAvatar" alt=""
                style="width: 50px; height: 50px; border-radius: 50%" @click="touserinfo(blog.author.id)">
              <div style="flex: 1;">
                <div style="font-weight: bold; margin-bottom: 5px">{{ blog.author.nickname || "用户" + blog.author.id }}
                </div>
                <div style="display:flex">

                  <el-tag v-if="ismusician" type="primary" style="margin-top: 5px;">
                    乐手
                  </el-tag>
                  <el-tag v-else type="success" style="margin-top: 5px;">
                    非乐手
                  </el-tag>

                </div>
              </div>

            </div>
          </div>

          <div class="card" style="margin-bottom: 10px; display: flex; align-items: center;"
            v-if="blog.author.medal_group">
            <img :src="blog.author.medal_group.url" alt="乐队标识"
              style="width: 50px; height: 50px; border-radius: 50%; margin-right: 10px;">
            <div style="font-weight: bold;">{{ blog.author.medal_group.name }}</div>
          </div>
          <div class="card" style="margin-bottom: 10px; display: flex; align-items: center; " v-else-if="ismusician">
            <div style="font-weight: bold;">暂无乐队</div>
          </div>

          <div class="card" style="margin-bottom: 10px">
            <div style=" font-size: 20px; padding-bottom: 10px; border-bottom: 1px solid #ddd; margin-bottom: 10px">
              个性推荐</div>

            <div>
              <div style="margin-bottom: 15px" v-for="(item, index) in topblogs" :key=index
                v-if="index >= 0 && index < 5">
                <router-link :to="{ name: 'blogdetail', params: { blogid: item.id } }" target="_blank">
                  <span class="recommend-title">{{ item.title }}</span>
                  <div style="color: #888">
                    <span>点赞</span> <span>{{ item.like_count }}</span>
                    <span style="margin-left: 10px">收藏</span> <span>{{ item.collect_count }}</span>
                  </div>
                </router-link>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import * as auth from '../utils/auth'
import { getblogs, gettheblog, set_like, set_collect, gettopblogs } from '@/api/blogs.js'
import { getcomments, submitcomments, deletecomments } from '@/api/comment.js'
import shareblog from '@/components/shareblog.vue'
import mainheader from '@/components/mainheader.vue'
import { getotherinfo } from '@/api/account.js'

export default {
  components: {
    shareblog,
    mainheader,
  },
  name: 'blogdetail',
  props: ['blogid'],
  data() {
    return {
      mockuser: {
        "nickname": "安妮",
        "image_url": " //game.gtimg.cn/images/lol/act/img/champion/Annie.png"
      },
      current: '全部博客',  //当前选中的分类名称
      ismusician: false,
      total: 0,
      comment: "",
      comm_comment: "",
      blog: {
        "id": 99,
        "author": {
          "id": 21,
          "nickname": "扎克",
          "image_url": "//game.gtimg.cn/images/lol/act/img/champion/Zac.png"
        },
        "title": "电子舞曲+大触打击乐永远的神",
        "content": "今天听了听电子舞曲+大触打击乐，巨好听，撼动了高能流行+迪斯科在我心中的地位",
        "video_url": null,
        "music_url": null,
        "timestamp": "1972-10-14 21:04:40",
        "tags": [
          "电子舞曲", "大触打击乐"
        ],
        "is_liked": true,
        "like_count": 200,
        "is_collected": true,
        "collect_count": 47,
        "comment_count": 4
      },
      blogs: [

      ],
      topblogs: [],
      comments: [],
      flagcomments: [

      ],
      user: {
        nickname: '',// 从API获取的用户昵称
        image_url: '' // 从API获取的用户头像URL
      },
      activeIndex: '1',
      defaultName: '未知用户',
      defaultAvatar: require('@/assets/default.png'), // 默认头像URL
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "video/mp4",// 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
          src: '' // url地址
        }],
        //poster: "https://p1.music.126.net/5zs7IvmLv7KahY3BFzUmrg==/109951163635241613.jpg?param=600y500", // 你的封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true  // 全屏按钮
        }
      },
    };

  },

  computed: {
  },
  created() {
    this.user = JSON.parse(localStorage.getItem('loginuser'));
    this.showid();
    this.getbloglist();
    this.getblog();
    this.gettopbloglist();

  },
  methods: {
    touserinfo(sendid) {
      if (this.user.id === sendid) {
        this.$router.push({ name: 'UserView', params: { id: this.user.id } });
      }
      else {
        this.$router.push({ name: 'OtherView', params: { id: sendid } });
      }
    },
    showid() {
      console.log(this.blogid)
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    logout() {
      auth.removeuserInfo();
      this.$router.push({ path: '/login' });
      this.$message.success('退出成功')
    },
    info() {
      this.$router.push({ path: '/me' });
    },
    getbloglist() {
      getblogs().then(response => {
        console.log(response.data);
        if (response.data.code /*=== 200*/) {
          this.blogs = response.data.data.blogs;
          this.total = this.blogs.length;
          console.log("boke")
          console.log(this.blogs)

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
    gettopbloglist() {
      gettopblogs().then(response => {
        console.log(response.data);
        if (response.data.code /*=== 200*/) {
          this.topblogs = response.data.data.blogs;

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
    getblog() {
      gettheblog({ blog_id: this.blogid }).then(response => {
        console.log(response.data);
        if (response.data.code === 200) {
          this.blog = response.data.data;
          this.getotherinfo();
          this.playerOptions.sources[0].src = this.blog.video_url;
          this.getcomments();
          console.log(this.blogid)
          console.log("boke")
          console.log(this.blog)
        } else {
          // 获取博客失败，显示失败消息
          this.$message.error(response.data.msg);
        }
      })
        .catch(error => {
          // 处理请求失败的逻辑
          console.error('请求失败:', error);
        });
    },
    getotherinfo() {
      getotherinfo({ user_id: this.blog.author.id }).then(response => {
        console.log(response.data);
        if (response.data.code === 200) {
          this.ismusician = response.data.data.is_musician;
          console.log("乐手：" + this.ismusician)
        } else {
          // 获取博客失败，显示失败消息
          this.$message.error(response.data.msg);
        }
      })
        .catch(error => {
          // 处理请求失败的逻辑
          console.error('请求失败:', error);
        });
    },
    setlike() {
      this.blog.is_liked = !this.blog.is_liked;
      set_like({
        blog_id: this.blog.id,
        is_liked: this.blog.is_liked
      }).then(response => {
        console.log(response.data);
        if (response.data.code === 200) {
          this.blog.is_liked = response.data.data.is_liked;
          this.blog.like_count = response.data.data.like_count;
        } else {
          // 修改点赞状态失败，显示失败消息
          this.$message.error(response.data.msg);
        }
      })
        .catch(error => {
          // 处理请求失败的逻辑
          console.error('请求失败:', error);
        });
    },

    setcollect() {
      this.blog.is_collected = !this.blog.is_collected;
      set_collect({
        blog_id: this.blog.id,
        is_collected: this.blog.is_collected
      }).then(response => {
        console.log(response.data);
        if (response.data.code /*=== 200*/) {
          this.blog.is_collected = response.data.data.is_collected;
          this.blog.collect_count = response.data.data.collect_count;
        } else {
          // 修改收藏状态失败，显示失败消息
          this.$message.error(response.data.msg);
        }
      })
        .catch(error => {
          // 处理请求失败的逻辑
          console.error('请求失败:', error);
        });
    },
    getcomments() {
      getcomments({ blog_id: this.blog.id }).then(response => {
        console.log(response.data);
        if (response.data.code === 200) {
          this.comments = response.data.data.comments;
          this.blog.comment_count = this.comments.length;
          this.flagcomments = this.comments.map(comment => ({
            ...comment,
            isreply: false // 假设初始状态下都未被标记
          }));
          console.log(this.comments)
        } else {
          // 获取评论失败，显示失败消息
          this.$message.error(response.data.msg);
        }
      })
        .catch(error => {
          // 处理请求失败的逻辑
          console.error('请求失败:', error);
        });
    },
    submitcomments(index) {
      console.log(index)
      if (index) {
        submitcomments({
          blog_id: this.blog.id,
          parent_comment_id: index,
          content: this.comm_comment
        }).then(response => {
          console.log("xinzeng:" + response.data);
          if (response.data.code === 200) {
            this.comm_comment = "";
            this.comments.push(response.data.data);
            this.flagcomments = this.comments.map(comment => ({
              ...comment,
              isreply: false // 假设初始状态下都未被标记
            }));
            console.log(this.comments)
          } else {
            // 发布评论失败，显示失败消息
            this.$message.error(response.data.msg);
          }
        })
          .catch(error => {
            this.$message.error("发表评论失败");
            // 处理请求失败的逻辑
            console.error('请求失败:', error);
          });
      }

      else {
        submitcomments({
          blog_id: this.blog.id,
          parent_comment_id: index,
          content: this.comment
        }).then(response => {
          console.log("xinzeng:" + response.data);
          if (response.data.code === 200) {
            this.comment = "";
            this.comments.push(response.data.data);
            this.flagcomments = this.comments.map(comment => ({
              ...comment,
              isreply: false // 假设初始状态下都未被标记
            }));
            console.log(this.comments)
          } else {
            // 发布评论失败，显示失败消息
            this.$message.error(response.data.msg);
          }
        })
          .catch(error => {
            this.$message.error("发表评论失败");
            // 处理请求失败的逻辑
            console.error('请求失败:', error);
          });
      }
    },
    deletecomments(id) {
      deletecomments({ comment_id: id }).then(response => {
        console.log(response.data);
        if (response.data.code === 200) {
          this.getcomments();
          //删除成功
        } else {
          // 获取评论失败，显示失败消息
          this.$message.error(response.data.msg);
        }
      })
        .catch(error => {
          // 处理请求失败的逻辑
          console.error('请求失败:', error);
        });
    },
    reply(item) {//更改评论状态
      this.comment = "";
      this.flagcomments.forEach(thecomment => {
        thecomment.isreply = false;
      });
      item.isreply = !item.isreply;
    },
    commentreplies(commentid) {//递归获取子评论的评论
      const replies = this.flagcomments.filter(child => (child.parent_comment_id !== null && child.parent_comment_id === commentid));
      return replies.concat(replies.flatMap(reply => { return this.commentreplies(reply.id); }
      )
      );
    },
    findcommentauthor(commentid) {//通过父评论id找父评论发布人
      const thecomment = this.flagcomments.find(thecomment => thecomment.id === commentid);
      return thecomment;
    },
    openshareblog() {
      this.$refs.shareblog.open();
    }
  }
}
</script>


<style src="@/assets/css/iconfont/iconfont.css" scoped></style>
<style scoped>
.main-container {
  width: 100%;
  height: 100%;
  min-height: 800px;
  background-color: rgb(223, 223, 223);
}

.main-content {
  height: 100%;
  width: 80%;
  margin: 5px auto;
}

.aud {
  width: 100%;
}

/* blockquote 样式 */
blockquote {
  display: block;
  border-left: 8px solid #d0e5f2;
  padding: 20px 10px;
  margin: 10px 0;
  line-height: 1.4;
  font-size: 100%;
  background-color: #f1f1f1;
}

/* code 样式 */
code {
  display: inline-block;
  display: inline;
  zoom: 1;
  background-color: #f1f1f1;
  border-radius: 3px;
  padding: 3px 5px;
  margin: 0 3px;
}

pre code {
  display: block;
}

p {
  line-height: 30px
}

.active {
  color: orange !important;
}

.recommend-title {
  margin-bottom: 5px;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  /* 超出几行省略 */
  overflow: hidden;
  font-size: 16px;
  font-weight: 450;
}

.recommend-title:hover {
  color: #2a60c9;
}

.comment-active {
  color: #2a60c9;
}

pre {
  white-space: pre-wrap;
  /*css-3*/
  white-space: -moz-pre-wrap;
  /*Mozilla,since1999*/
  white-space: pre-wrap;
  /*Opera4-6*/
  white-space: -o-pre-wrap;
  /*Opera7*/
  word-wrap: break-word;
  /*InternetExplorer5.5+*/
}</style>
