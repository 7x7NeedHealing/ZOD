    <!-- 
        此页面需要传入
        account：用户账号
     -->
<template>
    <div class="userInfoContainer">
        <div class="userInfo">
            <div class="left">
                <img :src="userAva" alt="">
            </div>
            <div class="right">
                <span class="nickname">{{ userNickname }}</span>
                <div class="blogNumber">发布博客量：{{ blogNumber }}</div>
            </div>
        </div>
        <div class="blogInfo">
            <div class="title">
                <span>博客</span>
            </div>
            <div class="content">
                <el-scrollbar height="520px">
                    <el-timeline v-infinite-scroll="load" :infinite-scroll-disabled="busy">
                        <el-timeline-item v-for="e in blog" center :timestamp="app?.proxy?.$beijingTime(e.releaseTime)"
                            placement="top">
                            <el-card>
                                <a href="javascript:" class="blogTitle" @click="goInfo(e)">{{ e.title }}</a>
                            </el-card>
                        </el-timeline-item>
                    </el-timeline>
                </el-scrollbar>

            </div>
        </div>
    </div>
</template>
    
<script setup lang="ts">
import userAva from '../assets/menuIcon/testAva.png'
import { onMounted, reactive, Ref, ref } from 'vue';
import router from '../router';
import axios from 'axios';
import { useMain } from '../store/home';
import { getCurrentInstance } from 'vue';
const state = useMain()
const app = getCurrentInstance();
interface blogInfo {
    releaseTime: string;
    title: string;
    blogId: string;
}
let blogNumber = ref(0);
let blog: Array<blogInfo> = reactive([]);
let userNickname: Ref<string> = ref('');
let page:number = 0;
let busy = ref(false)
const load = () => {
    busy.value = true;
    axios.get(state.http + '/checkSomeoneBlog?fromId=' + router.currentRoute.value.query.account + '&page=' + page)
        .then((res) => {
            res.data.forEach((element: blogInfo) => {
                blog.push(element)
            });
            busy.value = false;
        })
        .catch((err) => {
            console.log(err);

        })
        page+=4;
}


const goInfo = (e: blogInfo) => {
    let date = new Date()
    // router.push()
    router.push({ path: '/detail', query: { blogId: e.blogId, nickname: userNickname.value } })
    axios.get(state.http+'/deleteBlogHistoryById?blogId=' + e.blogId + '&account=' + state.account)
        .then(function (response) {
            axios.post(state.http+'/addHistory', { account: state.account, blogId: e.blogId, time: date.toLocaleString() })
                .then((response) => {
                })
                .catch(function (error) {
                    console.log(error);
                });
        })
        .catch(function (error) {
            console.log(error);
        });
}

onMounted(() => {

    let account = router.currentRoute.value.query.account
    axios.get(state.http + '/checkSomeoneBlogNumber?fromId=' + account)
        .then((res) => {
            blogNumber.value = res.data[0].count
        })
        .catch((err) => {
            console.log(err);

        })
    // axios.get(state.http + '/checkSomeoneBlog?fromId=' + account + '&page=' + page)
    //     .then((res) => {
    //         res.data.forEach((element: blogInfo) => {
    //             blog.unshift(element)
    //         });
    //         page++;
    //     })
    //     .catch((err) => {
    //         console.log(err);

    //     })
    axios.get(state.http + '/checkUserInfo?account=' + account)
        .then((res) => {
            userNickname.value = res.data[0].nickname;
        })
        .catch((err) => {
            console.log(err);

        })



})
</script>
    
<style scoped lang="scss">
.userInfoContainer {
    width: 1350px;
    height: 870px;
    font-size: 24px;
    background-color: #fff;
    border-radius: 8px;
    box-sizing: border-box;
    padding: 20px;

    .userInfo {
        height: 180px;
        box-sizing: border-box;
        padding: 0 40px;
        display: flex;
        border-bottom: 1px solid rgba(0, 0, 0, .2);
        margin-bottom: 40px;

        // background-color: black;
        .left {
            width: 180px;
            height: 180px;

            img {
                width: 140px;
                height: 140px;
                margin: 20px;
                border-radius: 140px;
            }
        }

        .right {
            height: 180px;
            margin-left: 30px;

            .nickname {
                display: block;
                height: 100px;
                line-height: 100px;
                font-size: 30px;
            }
        }
    }

    .blogInfo {
        height: 610px;

        .title {
            height: 60px;
            margin-bottom: 30px;

            span {

                margin-left: 20px;
                font-size: 46px;
            }
        }

        .content {
            height: 520px;

            .el-card__body {
                .blogTitle {
                    font-size: 28px;
                    color: black;

                    &:hover {
                        color: rgb(100, 172, 245);
                    }
                }

            }
        }
    }
}
</style>
