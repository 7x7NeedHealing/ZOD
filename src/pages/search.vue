    
<template>
    <div class="searchContainer">
        <div class="blog">
            <el-scrollbar>
                <ul style="font-size: 0;" v-if="blogArr.length>0">
                    <li class="blogBox" v-for="e in blogArr">
                        <a href="javascript:" class="blogBoxA" @click="showDetail(e)">
                            <span class="title">{{ e.title }}</span>
                            <div class="info">
                                <span class="auther">作者：{{ e.nickname }}</span>
                                <span class="time">发布时间：{{ app?.proxy?.$beijingTime(e.releaseTime) }}</span>
                            </div>
                        </a>

                    </li>
                </ul>
                <div class="noBlogData" v-else>
                    没有搜索到相关博客哦~
                </div>
            </el-scrollbar>
        </div>
        <div class="user">
            <el-scrollbar height="860px">
                <ul v-if="userArr.length>0">
                    <li class="userBox" v-for="e in userArr" >
                        <a href="javascript:" class="userContainer" @click="showUserInfo(e.account)">
                            <div class="userAva">
                                <img :src="userAva" alt="">
                            </div>
                            <div class="userInfo">
                                <span class="nickname">{{ e.nickname }}</span>
                                <!-- <span class="blogNumber">博客发布：222</span> -->
                            </div>
                        </a>
                    </li>
                </ul>
                <div class="noUserData" v-else>
                    没有搜索到相关用户哦~
                </div>
            </el-scrollbar>

        </div>
    </div>
</template>
    
<script setup lang="ts">
import axios from 'axios';
import { getCurrentInstance, onMounted, reactive } from 'vue';
import router from '../router';
import { useMain } from '../store/home';
import userAva from '../assets/menuIcon/testAva.png'

let state = useMain()
const app = getCurrentInstance();
interface blogInfo {
    blogId: string;
    title: string;
    fromId: string;
    releaseTime: string;
    nickname: string;
}
interface userInfo {
    nickname: string;
    account: string;
}
let blogArr: Array<blogInfo> = reactive([]);
let userArr: Array<userInfo> = reactive([]);
const showDetail = (e: blogInfo) => {
    router.push({ name: 'detail', query: { nickname: e.nickname, blogId: e.blogId } })
}
const showUserInfo = (e:string)=>{
    router.push({ name: 'userInfo', query: { account:e } })

}
onMounted(() => {
    const str = router.currentRoute.value.query.searchText
    axios.get(state.http + '/checkBlogbyTitle?str=' + str)
        .then((res) => {
            // console.log(res.data);
            res.data.forEach((element: blogInfo) => {
                blogArr.unshift(element)
            });

        })
        .catch((err) => {
            console.log(err);

        })
    axios.get(state.http + '/checkBlogbyContent?str=' + str)
        .then((res) => {
            // console.log(res.data);
            res.data.forEach((element: blogInfo) => {
                blogArr.push(element)
            });
        })
        .catch((err) => {
            console.log(err);

        })
    axios.get(state.http + '/checkUser?nickname=' + str)
        .then((res) => {
            // console.log(res.data);
            res.data.forEach((element: userInfo) => {
                userArr.unshift(element)
            });
        })
        .catch((err) => {
            console.log(err);

        })


})
</script>
    
<style scoped lang="scss">
$bgc: rgb(241, 242, 245);

.scrollbar-demo-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    // margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
}

.searchContainer {
    width: 1350px;
    height: 870px;
    border-radius: 8px;
    display: flex;
    background-color: $bgc;

    .blog {
        width: 1040px;
        height: 870px;
        margin-right: 10px;
        border-radius: 8px;
        background-color: #fff;
        padding: 10px;
        box-sizing: border-box;
        .noBlogData{
            display: block;
            width: 500px;
            font-size: 40px;
            color: rgba(0, 0, 0, .4);
            margin: 330px auto;
        }
        .blogBox {
            display: block;
            width: 1020px;
            height: 184px;
            border-radius: 8px;
            margin-bottom: 10px;
            box-sizing: border-box;
            padding-left: 60px;
            border: 1px solid rgba(0, 0, 0, .1);

            &:hover {
                border: 1px solid rgba(0, 0, 0, .3);

            }

            .blogBoxA {
                display: flex;
                // width: 960px;
                height: 184px;
                flex-direction: column;
                justify-content: space-between;
                color: black;

                // background-color: black;
                .title {
                    width: 800px;
                    height: 100px;
                    font-size: 34px;
                    line-height: 100px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    // background-color: blueviolet;
                }

                .info {
                    height: 60px;

                    .auther {
                        font-size: 24px;
                        line-height: 60px;
                        margin-right: 20px;
                    }

                    .time {
                        font-size: 20px;
                        color: rgba(0, 0, 0, .6);
                    }
                }
            }
        }

    }

    .user {
        width: 300px;
        height: 870px;
        border-radius: 8px;
        box-sizing: border-box;
        padding: 10px;
        background-color: #fff;
        font-size: 0;

        .noUserData{
            display: block;
            width: 220px;
            font-size: 20px;
            color: rgba(0, 0, 0, .4);
            margin: 330px auto;
        }
        .userBox {
            display: block;
            width: 278px;
            height: 180px;
            border-radius: 8px;
            box-sizing: border-box;
            border: 1px solid rgba(0, 0, 0, .1);
            margin-right: 0;
            margin-bottom: 10px;

            &:hover {
                border: 1px solid rgba(0, 0, 0, .3);

            }

            .userContainer {
                display: flex;
                width: 278px;
                height: 180px;
                color: black;

                .userAva {
                    width: 100px;
                    height: 180px;
                    margin-right: 8px;

                    img {
                        display: block;
                        width: 80px;
                        height: 80px;
                        margin: 50px 10px;
                        border-radius: 100px;
                    }
                }

                .userInfo {
                    width: 170px;
                    height: 180px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;

                    .nickname {
                        width: 140px;
                        height: 80px;
                        font-size: 22px;
                        text-align: center;
                        margin: 0 15px;
                        // overflow: hidden;
                        white-space: pre-line;
                        line-height: 40px;
                    }

                    .blogNumber {
                        height: 40px;
                        font-size: 20px;
                        line-height: 40px;
                    }
                }
            }
        }
    }
}
</style>
