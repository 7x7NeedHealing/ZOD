<<<<<<< HEAD
 
 <!-- 
   此页面需要接收以下参数：
   blogId:博客Id,
   nickname：博客发布者的昵称
  -->
<template>
   <div class="detailContainer">
      <div class="header">
         <div class="title">
            {{ detailInfo.title }}
         </div>
         <div class="info">
            {{ beijingTime(detailInfo.releaseTime) }}
         </div>
         <div class="userInfo">
            作者： {{ blogNickname }}
         </div>

      </div>
      <el-divider />
      <div class="body">
         <el-scrollbar>
            <div class="content">
               {{ detailInfo.content }}
            </div>
            <el-divider />
            <div class="comment">
               <div class="releaseComments  ">
                  <el-input v-model="releaseCommentObj" maxlength="90" :autosize="{ minRows: 3, maxRows: 3 }"
                     type="textarea" placeholder="发一条友善的评论." class="textarea" />
                  <!-- <button class="release">发表评论</button> -->
                  <el-button type="primary" class="release" @click="releaseCommentFunction()">发表评论</el-button>
               </div>

               <div class="comments">
                  <el-divider />
                  <ul v-show="userComment.length > 0">
                     <li class="theComment" v-for="e, index in userComment">
                        <div class="main">
                           <div class="left">
                              <img src="../assets/menuIcon/testAva.png" alt="">
                           </div>
                           <div class="right">
                              <div class="rightTop">
                                 <div class="nickname">
                                    {{ e.fromId }}
                                 </div>
                                 <div class="releaseTime">
                                    {{ beijingTime(e.releaseTime) }}
                                 </div>
                                 <a href="javascript:" class="report" @click="dialogFormVisible = true;form.content = e.content;">举报</a>
                                 <el-dialog v-model="dialogFormVisible" title="举报此评论">
                                    <el-form :model="form">
                                       <el-form-item label="评论" :label-width="formLabelWidth">
                                          <!-- <el-input v-model="form.reason" autocomplete="off" /> -->
                                          <span>{{ form.content }}</span>
                                       </el-form-item>
                                       <el-form-item label="举报原因" :label-width="formLabelWidth">
                                          <el-input v-model="form.reason" autocomplete="off" />
                                       </el-form-item>
                                       <!-- <el-form-item label="Zones" :label-width="formLabelWidth">
                                          <el-select v-model="form.region" placeholder="Please select a zone">
                                             <el-option label="Zone No.1" value="shanghai" />
                                             <el-option label="Zone No.2" value="beijing" />
                                          </el-select>
                                       </el-form-item> -->
                                    </el-form>
                                    <template #footer>
                                       <span class="dialog-footer">
                                          <el-button @click="dialogFormVisible = false">取消</el-button>
                                          <el-button type="primary" @click="report(e)">
                                             确认
                                          </el-button>
                                       </span>
                                    </template>
                                 </el-dialog>
                              </div>

                              <div class="detailContent">
                                 {{ e.content }}
                              </div>

                           </div>
                        </div>
                        <el-divider />
                     </li>
                  </ul>
                  <span v-show="userComment.length === 0" class="noComments">没有评论哦~</span>

               </div>
            </div>
         </el-scrollbar>

      </div>

   </div>
</template>
    
<script setup lang="ts">
import axios from 'axios';
import { nanoid } from 'nanoid';
import { StateTree } from 'pinia';
import { onMounted, reactive, Ref, ref } from 'vue';
import { LocationQueryValue } from 'vue-router';
import router from '../router/index'
import { useMain } from '../store/home';
let state = useMain()
interface blogInfo {
   releaseTime: string,
   fromId: string,
   title: string,
   content: string,
   blogId: string
}
interface commentInfo {
   content: string,
   fromId: string,
   releaseTime: string,
   commentId: string
}
interface commentForm {
   releaseTime: string,
   fromId: string,
   content: string
   toBlog: string,
   commentId: string
}
let detailInfo: blogInfo = reactive({
   releaseTime: '',
   fromId: '',
   title: '',
   content: '',
   blogId: ''
})
// 存储此博客的ID
let BLOGID: string = '';
// 存储博客发帖人的变量
let blogNickname = ref()
// 存储评论区的数组
let userComment: Array<commentInfo> = reactive([])
// 存储用户发布的评论
let releaseCommentObj = ref('')
// 将时间转换为北京时间
const beijingTime = (time: string) => {
   let date = new Date(time);
   return date.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
}
// 弹出框内容
const dialogFormVisible = ref(false);
const formLabelWidth = '140px';
const form = reactive({
   content:'',
   reason:'',
   commentId:''
})
// 发表评论
const releaseCommentFunction = () => {
   // console.log('发表评论');

   let date = new Date()
   let data: commentForm = {
      releaseTime: date.toLocaleString(),
      content: releaseCommentObj.value,
      fromId: state.account as string,
      toBlog: BLOGID,
      commentId: nanoid()
   };
   axios.post(state.http + '/addComments', data)
      .then((response) => {

      })
      .catch((error) => {
         console.log(error);

      })
   userComment.unshift(data)
   // 重置输入框内容
   releaseCommentObj = ref('')

}

// 举报评论
const report = (e: commentInfo) => {
   form.content = e.content;
   // dialogFormVisible.value = true;
   // console.log('举报评论',e);
   axios.post(state.http + '/reportComment', { content: form.content, reason: form.reason, commentId: e.commentId })
      .then((response) => {
         dialogFormVisible = false;
         ElMessage({
            showClose: true,
            message: '举报成功',
            type: 'success',
         })
      })
      .catch((error) => {
         console.log(error);

      })

}


onMounted(() => {
   // console.log(router.currentRoute.value.query.blogId);
   let blogId = router.currentRoute.value.query.blogId
   // 强制转换成string类型
   BLOGID = blogId as string;
   blogNickname.value = router.currentRoute.value.query.nickname
   // 查询博客内容具体信息
   axios.get(state.http + '/checkBlogInfo?blogId=' + blogId)
      .then(function (response) {
         // console.log(BLOGID);     
         detailInfo.releaseTime = response.data[0].releaseTime
         detailInfo.fromId = response.data[0].fromId
         detailInfo.title = response.data[0].title
         detailInfo.content = response.data[0].content
         detailInfo.blogId = response.data[0].blogId

      })
      .catch(function (error) {
         console.log(error);
      });
   // 查询博客评论内容
   axios.get(state.http + '/checkCommentsContentByBlogId?toBlog=' + blogId)
      .then(function (response) {
         // console.log(response.data);
         // detailInfo = response.data[0]
         response.data.forEach((e: commentInfo) => {
            userComment.unshift(e)
         })


      })
      .catch(function (error) {
         console.log(error);
      });
})
</script>
    
<style scoped lang="scss">
.el-select {
   width: 300px;
}

.el-input {
   width: 300px;
}

.dialog-footer button:first-child {
   margin-right: 10px;
}

.detailContainer {
   width: 1350px;
   height: 870px;
   border-radius: 8px;
   background-color: #fff;
   font-size: 24px;
   box-sizing: border-box;
   padding: 0 80px;

   .header {
      display: flex;
      flex-direction: column;
      height: 170px;
      box-sizing: border-box;
      padding: 0 40px;
      padding-top: 20px;

      .title {
         height: 60px;
         font-size: 34px;
         font-weight: 600;
         line-height: 60px;
         text-align: left;
         overflow: hidden;
         white-space: nowrap;
         text-overflow: ellipsis;

      }

      .info {
         height: 30px;
         line-height: 30px;
         font-size: 16px;
      }

      .userInfo {
         height: 60px;
         font-size: 22px;
         line-height: 60px;
      }



   }

   .el-divider--horizontal {
      margin: 0 0 10px 0;
      // margin: 0;
   }

   .scrollbar-demo-item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      margin: 10px;
      text-align: center;
      border-radius: 4px;
      background: var(--el-color-primary-light-9);
      color: var(--el-color-primary);
   }

   .body {
      width: 1190px;
      height: 687px;

      // 允许文本在单词之间自动换行，并保留换行符。
      .content {
         min-height: 500px;
         white-space: pre-wrap;
         box-sizing: border-box;
         padding: 30px 40px;
      }

      .comment {
         min-height: 200px;
         display: flex;
         justify-content: start;
         flex-direction: column;
         box-sizing: border-box;
         padding: 20px 0;
         --el-fill-color-blank: rgb(241, 242, 245);

         .releaseComments {
            display: flex;
            justify-content: center;

            .textarea {
               width: 600px;
               height: 60px;
               max-height: 82px;
               font-size: 16px;
               margin-right: 10px;

               .el-textarea__inner {
                  max-height: 82px;
               }

               // background-color: #888;
            }

            .release {
               width: 92px;
               height: 82px;
               font-size: 16px;
               white-space: pre;
            }
         }
      }

      .comments {
         width: 992px;
         margin: 0 auto;
         margin-top: 30px;
         font-size: 0;

         .noComments {
            display: block;
            width: 200px;
            margin: 40px auto;
            font-size: 26px;
            color: #666;
         }

         .theComment {
            // height: 110px;
            box-sizing: border-box;
            // padding: 0 20px 10px 20px;
            // background-color: blanchedalmond;
            margin-bottom: 10px;
            font-size: 0;

            .main {
               display: flex;
               justify-content: start;

               .left {
                  width: 100px;
                  height: 100px;
                  // margin-top: 20px;
                  margin-right: 10px;
                  display: flex;
                  justify-content: center;

                  img {
                     width: 80px;
                     height: 80px;
                     border-radius: 80px;
                     margin-top: 10px;
                  }
               }

               .right {
                  width: 842px;
                  // height: 90px;
                  display: flex;
                  flex-direction: column;
                  justify-content: start;

                  .rightTop {
                     display: flex;
                     height: 26px;
                     line-height: 26px;
                     position: relative;

                     .nickname {
                        margin-right: 20px;
                        font-size: 20px;
                     }

                     .releaseTime {
                        font-size: 14px;
                     }

                     .report {
                        display: block;
                        position: absolute;
                        top: 0;
                        right: 0;
                        font-size: 16px;
                        color: #666;

                        &:hover {
                           color: rgb(0, 161, 214);
                        }
                     }
                  }

                  .detailContent {
                     width: 642px;
                     // height: 30px;
                     font-size: 24px;
                     white-space: pre-wrap;
                     margin: 10px 0;
                  }
               }
            }
         }
      }
   }
}</style>
=======
 
 <!-- 
   此页面需要接收以下参数：
   blogId:博客Id,
   nickname：博客发布者的昵称
  -->
<template>
   <div class="detailContainer">
      <div class="header">
         <div class="title">
            {{ detailInfo.title }}
         </div>
         <div class="info">
            {{ beijingTime(detailInfo.releaseTime) }}
         </div>
         <div class="userInfo">
            作者： {{ blogNickname }}
         </div>

      </div>
      <el-divider />
      <div class="body">
         <el-scrollbar>
            <div class="content">
               {{ detailInfo.content }}
            </div>
            <el-divider />
            <div class="comment">
               <div class="releaseComments  ">
                  <el-input v-model="releaseCommentObj" maxlength="90" :autosize="{ minRows: 3, maxRows: 3 }"
                     type="textarea" placeholder="发一条友善的评论." class="textarea" />
                  <!-- <button class="release">发表评论</button> -->
                  <el-button type="primary" class="release" @click="releaseCommentFunction()">发表评论</el-button>
               </div>

               <div class="comments">
                  <el-divider />
                  <ul v-show="userComment.length > 0">
                     <li class="theComment" v-for="e, index in userComment">
                        <div class="main">
                           <div class="left">
                              <img src="../assets/menuIcon/testAva.png" alt="">
                           </div>
                           <div class="right">
                              <div class="rightTop">
                                 <div class="nickname">
                                    {{ e.fromId }}
                                 </div>
                                 <div class="releaseTime">
                                    {{ beijingTime(e.releaseTime) }}
                                 </div>
                                 <a href="javascript:" class="report" @click="dialogFormVisible = true;form.content = e.content;">举报</a>
                                 <el-dialog v-model="dialogFormVisible" title="举报此评论">
                                    <el-form :model="form">
                                       <el-form-item label="评论" :label-width="formLabelWidth">
                                          <!-- <el-input v-model="form.reason" autocomplete="off" /> -->
                                          <span>{{ form.content }}</span>
                                       </el-form-item>
                                       <el-form-item label="举报原因" :label-width="formLabelWidth">
                                          <el-input v-model="form.reason" autocomplete="off" />
                                       </el-form-item>
                                       <!-- <el-form-item label="Zones" :label-width="formLabelWidth">
                                          <el-select v-model="form.region" placeholder="Please select a zone">
                                             <el-option label="Zone No.1" value="shanghai" />
                                             <el-option label="Zone No.2" value="beijing" />
                                          </el-select>
                                       </el-form-item> -->
                                    </el-form>
                                    <template #footer>
                                       <span class="dialog-footer">
                                          <el-button @click="dialogFormVisible = false">取消</el-button>
                                          <el-button type="primary" @click="report(e)">
                                             确认
                                          </el-button>
                                       </span>
                                    </template>
                                 </el-dialog>
                              </div>

                              <div class="detailContent">
                                 {{ e.content }}
                              </div>

                           </div>
                        </div>
                        <el-divider />
                     </li>
                  </ul>
                  <span v-show="userComment.length === 0" class="noComments">没有评论哦~</span>

               </div>
            </div>
         </el-scrollbar>

      </div>

   </div>
</template>
    
<script setup lang="ts">
import axios from 'axios';
import { nanoid } from 'nanoid';
import { StateTree } from 'pinia';
import { onMounted, reactive, Ref, ref } from 'vue';
import { LocationQueryValue } from 'vue-router';
import router from '../router/index'
import { useMain } from '../store/home';
let state = useMain()
interface blogInfo {
   releaseTime: string,
   fromId: string,
   title: string,
   content: string,
   blogId: string
}
interface commentInfo {
   content: string,
   fromId: string,
   releaseTime: string,
   commentId: string
}
interface commentForm {
   releaseTime: string,
   fromId: string,
   content: string
   toBlog: string,
   commentId: string
}
let detailInfo: blogInfo = reactive({
   releaseTime: '',
   fromId: '',
   title: '',
   content: '',
   blogId: ''
})
// 存储此博客的ID
let BLOGID: string = '';
// 存储博客发帖人的变量
let blogNickname = ref()
// 存储评论区的数组
let userComment: Array<commentInfo> = reactive([])
// 存储用户发布的评论
let releaseCommentObj = ref('')
// 将时间转换为北京时间
const beijingTime = (time: string) => {
   let date = new Date(time);
   return date.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
}
// 弹出框内容
const dialogFormVisible = ref(false);
const formLabelWidth = '140px';
const form = reactive({
   content:'',
   reason:'',
   commentId:''
})
// 发表评论
const releaseCommentFunction = () => {
   // console.log('发表评论');

   let date = new Date()
   let data: commentForm = {
      releaseTime: date.toLocaleString(),
      content: releaseCommentObj.value,
      fromId: state.account as string,
      toBlog: BLOGID,
      commentId: nanoid()
   };
   axios.post(state.http + '/addComments', data)
      .then((response) => {

      })
      .catch((error) => {
         console.log(error);

      })
   userComment.unshift(data)
   // 重置输入框内容
   releaseCommentObj = ref('')

}

// 举报评论
const report = (e: commentInfo) => {
   form.content = e.content;
   // dialogFormVisible.value = true;
   // console.log('举报评论',e);
   axios.post(state.http + '/reportComment', { content: form.content, reason: form.reason, commentId: e.commentId })
      .then((response) => {
         dialogFormVisible = false;
         ElMessage({
            showClose: true,
            message: '举报成功',
            type: 'success',
         })
      })
      .catch((error) => {
         console.log(error);

      })

}


onMounted(() => {
   // console.log(router.currentRoute.value.query.blogId);
   let blogId = router.currentRoute.value.query.blogId
   // 强制转换成string类型
   BLOGID = blogId as string;
   blogNickname.value = router.currentRoute.value.query.nickname
   // 查询博客内容具体信息
   axios.get(state.http + '/checkBlogInfo?blogId=' + blogId)
      .then(function (response) {
         // console.log(BLOGID);     
         detailInfo.releaseTime = response.data[0].releaseTime
         detailInfo.fromId = response.data[0].fromId
         detailInfo.title = response.data[0].title
         detailInfo.content = response.data[0].content
         detailInfo.blogId = response.data[0].blogId

      })
      .catch(function (error) {
         console.log(error);
      });
   // 查询博客评论内容
   axios.get(state.http + '/checkCommentsContentByBlogId?toBlog=' + blogId)
      .then(function (response) {
         // console.log(response.data);
         // detailInfo = response.data[0]
         response.data.forEach((e: commentInfo) => {
            userComment.unshift(e)
         })


      })
      .catch(function (error) {
         console.log(error);
      });
})
</script>
    
<style scoped lang="scss">
.el-select {
   width: 300px;
}

.el-input {
   width: 300px;
}

.dialog-footer button:first-child {
   margin-right: 10px;
}

.detailContainer {
   width: 1350px;
   height: 870px;
   border-radius: 8px;
   background-color: #fff;
   font-size: 24px;
   box-sizing: border-box;
   padding: 0 80px;

   .header {
      display: flex;
      flex-direction: column;
      height: 170px;
      box-sizing: border-box;
      padding: 0 40px;
      padding-top: 20px;

      .title {
         height: 60px;
         font-size: 34px;
         font-weight: 600;
         line-height: 60px;
         text-align: left;
         overflow: hidden;
         white-space: nowrap;
         text-overflow: ellipsis;

      }

      .info {
         height: 30px;
         line-height: 30px;
         font-size: 16px;
      }

      .userInfo {
         height: 60px;
         font-size: 22px;
         line-height: 60px;
      }



   }

   .el-divider--horizontal {
      margin: 0 0 10px 0;
      // margin: 0;
   }

   .scrollbar-demo-item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      margin: 10px;
      text-align: center;
      border-radius: 4px;
      background: var(--el-color-primary-light-9);
      color: var(--el-color-primary);
   }

   .body {
      width: 1190px;
      height: 687px;

      // 允许文本在单词之间自动换行，并保留换行符。
      .content {
         min-height: 500px;
         white-space: pre-wrap;
         box-sizing: border-box;
         padding: 30px 40px;
      }

      .comment {
         min-height: 200px;
         display: flex;
         justify-content: start;
         flex-direction: column;
         box-sizing: border-box;
         padding: 20px 0;
         --el-fill-color-blank: rgb(241, 242, 245);

         .releaseComments {
            display: flex;
            justify-content: center;

            .textarea {
               width: 600px;
               height: 60px;
               max-height: 82px;
               font-size: 16px;
               margin-right: 10px;

               .el-textarea__inner {
                  max-height: 82px;
               }

               // background-color: #888;
            }

            .release {
               width: 92px;
               height: 82px;
               font-size: 16px;
               white-space: pre;
            }
         }
      }

      .comments {
         width: 992px;
         margin: 0 auto;
         margin-top: 30px;
         font-size: 0;

         .noComments {
            display: block;
            width: 200px;
            margin: 40px auto;
            font-size: 26px;
            color: #666;
         }

         .theComment {
            // height: 110px;
            box-sizing: border-box;
            // padding: 0 20px 10px 20px;
            // background-color: blanchedalmond;
            margin-bottom: 10px;
            font-size: 0;

            .main {
               display: flex;
               justify-content: start;

               .left {
                  width: 100px;
                  height: 100px;
                  // margin-top: 20px;
                  margin-right: 10px;
                  display: flex;
                  justify-content: center;

                  img {
                     width: 80px;
                     height: 80px;
                     border-radius: 80px;
                     margin-top: 10px;
                  }
               }

               .right {
                  width: 842px;
                  // height: 90px;
                  display: flex;
                  flex-direction: column;
                  justify-content: start;

                  .rightTop {
                     display: flex;
                     height: 26px;
                     line-height: 26px;
                     position: relative;

                     .nickname {
                        margin-right: 20px;
                        font-size: 20px;
                     }

                     .releaseTime {
                        font-size: 14px;
                     }

                     .report {
                        display: block;
                        position: absolute;
                        top: 0;
                        right: 0;
                        font-size: 16px;
                        color: #666;

                        &:hover {
                           color: rgb(0, 161, 214);
                        }
                     }
                  }

                  .detailContent {
                     width: 642px;
                     // height: 30px;
                     font-size: 24px;
                     white-space: pre-wrap;
                     margin: 10px 0;
                  }
               }
            }
         }
      }
   }
}</style>
>>>>>>> 6baed668da1778a7d529e7992585132fd3296210
