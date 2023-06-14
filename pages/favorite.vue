    
<template>
   <div class="container">
      <div class="header">
         <span class="title">我的收藏</span>
      </div>
      <el-divider />

      <div class="body">
         <div v-if="busyFlag">
            <el-empty :image-size="400" description="加载中" />
         </div>
         <div v-else>
            <div v-if="favoriteInfoArray.length > 0">
               <el-scrollbar height="570px">
                  <el-timeline>
                     <el-timeline-item v-for="(e, index) in favoriteInfoArray" center placement="top">
                        <el-card>
                           <a href="javascript:" class="info" @click="go(e, index)">
                              <h4>{{ e.title }}</h4>
                              <p>作者：{{ e.nickname }}</p>
                           </a>
                        </el-card>
                     </el-timeline-item>
                  </el-timeline>
               </el-scrollbar>
            </div>
            <div v-else>
               <el-empty :image-size="400" description="No Data" />
            </div>

         </div>
      </div>

      <el-divider />
      <div class="footer"></div>

   </div>
</template>
   
<script setup lang="ts">
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
import router from '../router';
import { useMain } from '../store/home';
import { ElLoading } from 'element-plus'
const state = useMain();
let busyFlag = ref(true);
interface favoriteObj {
   blogId: string
}
interface favoriteInfo {
   title: string,
   nickname: string
}
let favoriteArray: Array<string> = reactive([])
let favoriteInfoArray: Array<favoriteInfo> = reactive([])

const beijingTime = (time: string) => {
   let date = new Date(time);
   return date.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
}
const go = (e: favoriteInfo, index: number) => {
   // console.log(favoriteArray[index]);
   let blogId = favoriteArray[index] as string
   router.push({ path: '/detail', query: { blogId: blogId, nickname: e.nickname } })
}

onMounted(() => {
   // // 加载动画
   // const openFullScreen2 = () => {
   //    const loading = ElLoading.service({
   //       lock: true,
   //       text: 'Loading',
   //       background: 'rgba(0, 0, 0, 0.7)',
   //    })
   //    setTimeout(() => {
   //       loading.close();
   //       // 判定,无数据时显示no data
   //       if(favoriteInfoArray.length>0){
   //          busyFlag.value = false;
   //       }else{
   //          busyFlag.value = true;
   //       }

   //    }, 1500)
   // };
   // openFullScreen2();
   // 请求
   axios.get(state.http + '/checkFavoriteById?account=' + state.account)
      .then((res) => {
         // console.log(res.data);

         res.data.forEach((element: favoriteObj) => {
            favoriteArray.unshift(element.blogId)
            let blogId = element.blogId
            axios.get(state.http + '/checkBlogById?blogId=' + blogId)
               .then((res) => {
                  favoriteInfoArray.unshift(res.data[0])
               })
               .catch((err) => {
                  console.log(err);
               })
         })

      })
      .catch((err) => {
         console.log(err);
      })
   setTimeout(() => {
      // 判定,无数据时显示no data
      busyFlag.value = false;

      // if(favoriteInfoArray.length>0){
      //    busyFlag.value = false;
      // }else{
      //    busyFlag.value = true;
      // }
   }, 1500)
   // console.log(favoriteArray);

   // // 1.5s后显示内容
   // setTimeout(() => {
   //    busyFlag.value = false;
   // }, 1500);
   // console.log(favoriteInfoArray);

})

</script>
   
<style scoped lang="scss">
.example-showcase .el-loading-mask {
   z-index: 9;
}

.container {
   width: 1350px;
   height: 870px;
   border-radius: 8px;
   box-sizing: border-box;
   padding: 40px;
   // padding: 70px 300px;
   background-color: #fff;

   .el-divider {
      margin: 0;
   }

   .header {
      height: 72px;

      .title {
         font-size: 24px;
         line-height: 72px;
         color: rgb(0, 161, 214);
      }
   }

   .body {
      height: 578px;
      padding: 30px 200px;

      .el-timeline {
         width: 760px;

         .info {
            text-decoration: none;
            font-size: 22px;
            color: black;

            p {
               margin-top: 6px;
               font-size: 14px;
               font-weight: 600;
               color: rgba(0, 0, 0, .7)
            }

            &:hover {
               color: rgb(90, 131, 235);
            }
         }
      }

   }

   .footer {
      height: 34px;
   }
}

// 滚动条必须的样式
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
</style>
