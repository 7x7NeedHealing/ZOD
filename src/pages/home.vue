    
<template>
    <div class="mainx">
        <!-- 内容 -->

        <div class="body">
            <el-scrollbar height="870px">
                <ul v-infinite-scroll="loadBlog"  :infinite-scroll-disabled="busy">
                    <li class="container" v-for="index, i in blogData">
                        <div class="infoBox">
                            <img src="../assets/menuIcon/testAva.png" alt="">
                            <div class="info">
                                <a href="javascript:" class="userName" @click="showUserInfo(index)">
                                    {{ index.nickname }}
                                    <!-- <span class="userName"></span> -->
                                </a>

                                <span class="time">{{ beijingTime(index.releaseTime) }}</span>
                            </div>
                            <div class="title">
                                <span>{{ index.title }}</span>
                            </div>
                        </div>
                        <a href="javascript:" @click="show(index)">
                            <div class="content">
                                <el-divider />
                                <span class="realContent">{{ index.content }}</span> <el-divider />
                            </div>
                        </a>

                        <div class="footer">
                            <ul class="footerContainer">
                                <li class="comments">
                                    <a href="javascript:" class="commentsObj" @mouseenter="changeCommentsIcon()"
                                        @mouseleave="removeCommentsIcon">
                                        <img :src="commentFlag ? commentsHoverIcon : commentsNormalIcon" class="footerIcon">
                                        <span class="commentsNumber">{{ blogCommentNumber[i] }}</span>
                                    </a>

                                </li>
                                <li class="favorite">
                                    <a href="javascript:" @mouseenter="changeFavoriteIcon()"
                                        @mouseleave="removeFavoriteIcon" @click="addFavorite(index)">
                                        <img :src="favoriteFlag ? favoriteHoverIcon : favoriteNormalIcon" alt=""
                                            class="footerIcon">
                                    </a>

                                </li>
                            </ul>
                        </div>

                    </li>
                </ul>
            </el-scrollbar>
        </div>

        <!-- 热搜榜 -->
        <div class="hot">
            <div class="hotTitle">
                微博热搜
            </div>
            <el-divider />
            <div class="hotNews">
                <el-scrollbar>
                    <ul>
                        <li v-for="e, index in hotNews">
                            <span class="number">{{ index }}、</span>
                            <el-scrollbar><span class="info">{{ e.note }}</span></el-scrollbar>

                        </li>
                    </ul>
                </el-scrollbar>
            </div>
        </div>
    </div>
</template>
    
<script setup lang="ts">
import axios from 'axios';
import { onMounted, reactive, Ref, ref } from 'vue';
import { useMain } from '../store/home';
import router from '../router/index'
import commentsNormalIcon from '../assets/menuIcon/comment.png'
import commentsHoverIcon from '../assets/menuIcon/commentHover.png'
import favoriteNormalIcon from '../assets/menuIcon/shoucang.png'
import favoriteHoverIcon from '../assets/menuIcon/shoucangHover.png'
// let commentsIcon = commentsNormalIcon;
// let favoriteIcon = favoriteNormalIcon;
let commentFlag = ref(false);
let favoriteFlag = ref(false);
let blogPage: Ref<number> = ref(0);
    let busy = ref(false);
let state = useMain();
interface hotNewsInfo {
    note: string
}
interface blogAndUserInfo {
    Id: number,
    account: string,
    blogId: string,
    content: string,
    email: string,
    fromId: string,
    nickname: string,
    phone: string,
    ps: string,
    releaseTime: string,
    status: string,
    title: string
}
let blogData: Array<blogAndUserInfo> = reactive([])
let blogCommentNumber: Array<number> = reactive([])
let hotNews: Array<hotNewsInfo> = reactive([])
const addFavorite = (index: blogAndUserInfo) => {
    // console.log(index.blogId);
    axios.get('http://localhost:888/deleteFavorite?blogId=' + `${index.blogId}` + '&account=' + `${state.account}`)
        .then((res) => {
            // console.log(res);
            axios.post('http://localhost:888/addFavorite', { blogId: index.blogId, account: state.account })
                .then((res) => {
                    // console.log(res);

                })
                .catch((err) => {
                    console.log(err);

                })
        })
        .catch((err) => {
            console.log(err);

        })



}

// 改变主页博客下方图标的方法
const changeCommentsIcon = () => {
    commentFlag.value = true

}
const removeCommentsIcon = () => {
    commentFlag.value = false

}
const changeFavoriteIcon = () => {
    favoriteFlag.value = true

}
const removeFavoriteIcon = () => {
    favoriteFlag.value = false

}
// 将时间转换为北京时间
const beijingTime = (time: string) => {
    let date = new Date(time);
    return date.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
}
const show = (e: blogAndUserInfo) => {
    let date = new Date()
    // router.push()
    router.push({ path: '/detail', query: { blogId: e.blogId, nickname: e.nickname } })

    axios.get(state.http+'/deleteBlogHistoryById?blogId=' + e.blogId + '&account=' + state.account)
        .then(function (response) {
            // console.log(response);
            // console.log('点击了', e.blogId, date.toLocaleString());
            axios.post(state.http+'/addHistory', { account: state.account, blogId: e.blogId, time: date.toLocaleString() })
                .then((response) => {
                    // console.log(response);

                })
                .catch(function (error) {
                    console.log(error);
                });
        })
        .catch(function (error) {
            console.log(error);
        });

}
const showUserInfo = (e: blogAndUserInfo) => {

    router.push({ name: 'userInfo', query: { account: e.account } })
}
const loadBlog = () => {
    // console.log('进入底部', blogPage.value);
    busy.value = true;
    axios.get(state.http+'/checkBlogAndInfo?page=' + blogPage.value)
        .then(response => {
            blogPage.value = blogPage.value + 4;
            response.data.forEach((element: blogAndUserInfo) => {
                // 因为返回的数据是从新到旧，即往下滑的时候请求的数据都是旧的。所以直接push进数组尾部即可。
                blogData.push(element)
                axios.get(state.http+'/checkCommentsByBlogId?toBlog=' + element.blogId)
                    .then(response => {
                        blogCommentNumber.push(response.data[0].count)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            });
            // console.log(blogData);
            busy.value = false;
        })
        .catch(error => {
            console.log(error)
        })
}
onMounted(() => {
    // axios.get('http://localhost:888/checkBlogAndInfo?page='+blogPage.value)
    //     .then(response => {
    //         // console.log(response.data);
    //         blogPage.value = blogPage.value + 4;
    //         response.data.forEach((element: blogAndUserInfo) => {
    //             blogData.unshift(element)
    //             axios.get('http://localhost:888/checkCommentsByBlogId?toBlog=' + element.blogId)
    //                 .then(response => {
    //                     blogCommentNumber.unshift(response.data[0].count)
    //                 })
    //                 .catch(error => {
    //                     console.log(error)
    //                 })
    //         });
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })


    axios.get(state.http + '/weiboHotNews')
        .then(response => {
            // console.log(response.data.data.realtime);
            let data = response.data.data.realtime;
            data.forEach((e: any) => {
                hotNews.push(e)
            })
            // console.log(hotNews);
        })
        .catch(error => {
            console.log(error)
        })
})

</script>
    
<style scoped lang="scss">
//  /* 隐藏滚动条 */
// ::-webkit-scrollbar {
//     width: 0 !important;
// }


.mainx {
    display: flex;
    justify-content: space-between;
    width: 1350px;
    height: 870px;
    border-radius: 8px;
    background-color: rgba(241, 242, 245);

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
        width: 1040px;
        height: 870px;
        margin-right: 10px;
        border-radius: 8px;
        overflow: auto;
        box-sizing: border-box;
        // padding: 24px;
        // padding-top: 16px;
        padding-bottom: 0;

        // background-color: violet;
        .container {
            display: block;
            width: 1040px;
            // height: 540px;
            border-radius: 8px;
            margin-bottom: 10px;
            background-color: white;

            .el-divider--horizontal {
                margin: 0 0 10px 0;
            }

            a {
                color: black
            }

            .infoBox {
                display: flex;

                // border-radius: 8px;
                img {
                    width: 60px;
                    height: 60px;
                    border-radius: 30px;
                    margin: 10px 20px;
                    background-color: #fff;
                    border: 1px solid rgba(0, 0, 0, .3);
                }

                .info {
                    width: 400px;
                    height: 80px;
                    // background-color: salmon;
                    display: flex;
                    flex-direction: column;

                    .userName {
                        display: inline-block;
                        height: 50px;
                        line-height: 60px;
                        font-size: 20px;
                        font-weight: 600;
                        color: black;

                        &:hover {
                            text-decoration: underline;
                        }
                    }



                    .time {
                        height: 30px;
                        line-height: 30px;
                        font-size: 16px;
                        color: #666;
                    }
                }

                .title {
                    width: 400px;
                    height: 82px;
                    text-align: center;
                    font-size: 22px;
                    line-height: 82px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }

            .content {

                width: 1040px;
                height: 460px;
                box-sizing: border-box;
                padding: 20px 80px;
                padding-top: 0;
                font-size: 24px;

                .realContent {
                    // display: inline-block;
                    width: 880px;
                    height: 440px;
                    // 允许文本在单词之间自动换行，并保留换行符。
                    white-space: pre-wrap;
                    // 当字数过多时出现省略号
                    /* 行数 */
                    display: -webkit-box;
                    -webkit-line-clamp: 14;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

            }

            .footer {
                width: 1040px;
                // height: 40px;
                border-radius: 8px;
                font-size: 0;

                // background-color: rgba(0,0,0,.3);
                .footerContainer {
                    display: flex;
                    justify-content: space-around;

                    .comments {
                        width: 100px;
                        height: 40px;
                        position: relative;


                        .commentsObj {
                            // display: block;
                            // width: 100px;
                            // height: 40px;

                            .commentsNumber {
                                font-size: 18px;
                                color: #888;
                                position: absolute;
                                top: 4px;
                                right: 6px;
                            }

                            &:hover .commentsNumber {
                                color: rgb(100, 172, 245);
                            }
                        }


                    }

                    .favorite {
                        width: 100px;
                        height: 40px;
                    }
                }
            }
        }
    }

    .hot {
        width: 300px;
        height: 870px;
        border-radius: 8px;
        // background-color: pink;
        background-color: #fff;

        .el-divider--horizontal {
            width: 80%;
            margin: 0 auto;
        }

        .hotTitle {
            height: 82px;
            box-sizing: border-box;
            padding-left: 20px;
            line-height: 82px;
            font-size: 24px;
            font-weight: 600;
        }

        .hotNews {
            height: 760px;
            box-sizing: border-box;
            padding-top: 20px;
            padding-left: 20px;

            ul {
                font-size: 0;

                li {
                    display: flex;
                    // justify-content: space-between;
                    width: 240px;
                    height: 40px;
                    line-height: 40px;
                    font-size: 20px;
                    border-radius: 8px;
                    box-sizing: border-box;
                    padding-left: 10px;

                    .number {
                        height: 40px;
                        line-height: 40px;
                    }

                    .info {
                        position: relative;
                        display: inline-block;
                        ;
                        height: 40px;
                        line-height: 40px;
                        // text-overflow: ellipsis;
                        // overflow: hidden;
                        // white-space: nowrap;

                    }

                    &:hover {
                        color: white;
                        background-color: rgba(0, 0, 0, .3);

                    }
                }
            }
        }
    }
}

// 通用样式
// 博客底部栏Icon大小
.footerIcon {
    display: block;
    width: 28px;
    height: 28px;
    margin: 4px auto;
}
</style>
