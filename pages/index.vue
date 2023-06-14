    
<template>
    <div class="container">
        <div class="main">
            <div class="left">
                <div class="menu">
                    <div class="head">
                        <logo></logo>
                    </div>
                    <hr>
                    <div class="body">
                        <ul class="function">
                            <li v-for="index in bodyFunction" @click="go(index)">
                                <RouterLink :to=index.to>
                                    <div class="logo">
                                        <img :src=index.iconUrl alt="">
                                    </div>
                                    <span>{{ index.name }}</span>
                                </RouterLink>
                            </li>
                        </ul>
                    </div>
                    <hr>
                    <div class="foot">
                        <ul class="function">
                            <li v-for="index in footFunction" @click="go(index)">
                                <RouterLink :to=index.to>
                                    <div class="logo">
                                        <img :src=index.iconUrl alt="">
                                    </div>
                                    <span>{{ index.name }}</span>
                                </RouterLink>
                            </li>
                        </ul>
                    </div>
                    <hr>
                    <div class="tips">
                        <clock></clock>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="right-head">
                    <div class="search">
                        <input type="text" v-model="searchText" placeholder="在主页才可以搜索哦">
                        <a href="javascript:" @click="search()">
                            <img :src=searchIcon alt="">
                        </a>
                    </div>
                    <div class="info">
                        <a href="javascript:">
                            <img :src="testAvaIcon" alt="" @click="showUserInfo(state.account as string)">
                        </a>
                        <a class="loginFlag" href="javascript:" v-if="state.account === ''" @click="logIn()">登录</a>
                        <a class="loginFlag" href="javascript:" v-else @click="logOut()">注销</a>

                    </div>
                </div>
                <div class="right-body">

                    <router-view>
                    </router-view>
                </div>
            </div>
        </div>

    </div>
    <!-- <router-view></router-view> -->
</template>
    
<script setup lang="ts">
// 引入body的icon
import zhuyeIcon from '../assets/menuIcon/zhuye.png'
import bokeIcon from '../assets/menuIcon/boke.png'
import todoIcon from '../assets/menuIcon/daiban.png'
import shujutongjiIcon from '../assets/menuIcon/shujutongji.png'
import settingIcon from '../assets/menuIcon/shezhi.png'
import guanyuIcon from '../assets/menuIcon/guanyu.png'
// 引入foot的icon
import shoucangIcon from '../assets/menuIcon/shoucang.png'
import liulanjiluIcon from '../assets/menuIcon/liulanjilu.png'
import jianyiIcon from '../assets/menuIcon/jianyifankui.png'
import meIcon from '../assets/menuIcon/me.png'

// 其它Icon
import searchIcon from '../assets/menuIcon/search.png'
import testAvaIcon from '../assets/menuIcon/testAva.png'
import { nextTick, onMounted, reactive, Ref, ref } from 'vue'
import axios from 'axios'
import { useMain } from '../store/home';
import router from '../router'
let state = useMain()

// props: {
//   data: {
//     type: Array,
//     required: true
//   }
// }
let searchText: Ref<string> = ref('');


const bodyFunction = [
    {
        iconUrl: zhuyeIcon,
        name: '我的主页',
        to: '/'
    },
    {
        iconUrl: bokeIcon,
        name: '发表博客',
        to: '/blog'
    },
    {
        iconUrl: todoIcon,
        name: '待办事项',
        to: '/todo'
    },
    {
        iconUrl: shujutongjiIcon,
        name: '数据统计',
        to: '/shujutongji'
    },
    // {
    //     iconUrl: settingIcon,
    //     name: '设置',
    //     to: '/setting'
    // },
    {
        iconUrl: guanyuIcon,
        name: '关于',
        to: '/about'
    }
]
const footFunction = [
    {
        iconUrl: shoucangIcon,
        name: '我的收藏',
        to: '/favorite'
    },
    {
        iconUrl: liulanjiluIcon,
        name: '浏览记录',
        to: '/history'
    },
    {
        iconUrl: jianyiIcon,
        name: '建议反馈',
        to: '/idea'
    },
    {
        iconUrl: meIcon,
        name: '我的信息',
        to: '/myInfo'
    }
]

// 点击功能按键
const go = (e: { name: string }) => {
    // console.log(e.name);

}
const showUserInfo = (e: string) => {

    router.push({ name: 'userInfo', query: { account: e } })

}
// 点击搜索
const search = () => {
    // console.log('点击了搜索', searchText.value);
    router.push({
        name: 'search',
        query: {
            searchText: searchText.value
        }
    });
    searchText.value = '';


}
// 退出登录
const logOut = () => {
    console.log('点击了注销');
    localStorage.setItem('token', '');
    localStorage.setItem('account', '');
    state.account = '';
    location.reload()

}
const logIn = () => {
    router.push('/login')
}


onMounted(() => {
    // if(state.account!=='')
    // {
    //     router.push('/login')
    // }
})
</script>
    
<style scoped lang="scss">
.container {
    // 默认浏览器宽度
    width: 100%;
    height: 937px;
    border-radius: 8px;
    // background-color: $white;
    background-color: rgb(241, 242, 245);

    .main {
        // 让盒子居中，两边留白自适应
        margin: 0 auto;
        width: 1620px;
        min-width: 1620px;
        height: 937px;
        display: flex;
        justify-content: start;
        background-color: rgb(241, 242, 245);
        border-radius: 8px;

        .left {
            width: 260px;
            height: 100%;
            border-radius: 8px;

            .menu {
                width: 260px;
                height: 100%;
                background-color: white;
                border-radius: 8px;

                .head {
                    width: 260px;
                    height: 180px;
                }

                .body {
                    width: 260px;
                    height: 400px;

                    .function {
                        font-size: 0;
                    }

                }

                .foot {
                    width: 260px;
                    height: 300px;

                    .function {
                        font-size: 0;
                    }

                }

                .tips {
                    height: 50px;
                    border-radius: 0 0 8px 8px;
                }
            }
        }

        .right {
            width: 1350px;
            height: 937px;
            margin-left: 10px;
            border-radius: 8px;
            background-color: rgb(241, 242, 245);

            .right-head {
                width: 100%;
                height: 60px;
                border-radius: 8px;
                background-color: white;
                box-sizing: border-box;
                padding-left: 300px;
                padding-right: 60px;
                margin-bottom: 7px;
                display: flex;
                justify-content: space-between;

                .search {
                    width: 60%;
                    height: 60px;
                    display: flex;
                    justify-content: start;

                    // background-color: pink;
                    input {
                        display: block;
                        width: 70%;
                        height: 44px;
                        margin: 6px 0;
                        box-sizing: border-box;
                        padding-left: 14px;
                        font-size: 24px;
                        border-radius: 6px 0 0 6px;
                        background-color: rgba(241, 242, 245, .3);
                        // 改变边框
                        border: 2px solid rgba(0, 0, 0, .3);
                        border-right: none;
                    }

                    input:focus {
                        outline: none;
                        border: 2px solid rgba(0, 0, 0, .6);
                        border-right: none;
                    }

                    a {
                        display: block;
                        width: 8%;
                        height: 44px;
                        margin: 6px 0;
                        border-radius: 0 6px 6px 0;
                        background-color: rgba(0, 0, 0, .3);

                        img {
                            display: block;
                            width: 30px;
                            height: 30px;
                            margin: 6px 8px;
                        }
                    }

                    input:focus+a {
                        background-color: rgba(0, 0, 0, 6);
                    }
                }

                .info {
                    width: 14%;
                    height: 60px;
                    // background-color: black;
                    display: flex;
                    justify-content: space-between;

                    img {
                        // display: block;
                        width: 40px;
                        height: 40px;
                        margin: 10px 8px;
                        border-radius: 20px;
                    }

                    .loginFlag {
                        // display: block;
                        width: 80px;
                        height: 32px;
                        font-size: 24px;
                        margin: 14px 0;
                        text-align: center;
                        border-radius: 8px;
                        color: #888;

                        // align-items: center;
                        &:hover {
                            color: white;
                            background-color: rgb(209, 223, 255);
                            // background-color: rgba(0, 0, 0, .3);
                        }
                    }



                }
            }

            .right-body {
                width: 1350px;
                height: 870px;
                border-radius: 8px;
                // background-color: #fff;

                a {
                    width: 100%;
                    height: 870px;
                    // border-radius: 8px;
                    // background-color: #fff;
                }
            }
        }
    }
}

// 通用的样式-菜单ul列表
.function {
    display: block;
    width: 260px;
    padding-top: 40px;
    box-sizing: border-box;

    li {
        margin: 6px auto;

        justify-content: space-between;
        width: 182px;
        height: 42px;
        border-radius: 8px;

        a {
            display: flex;
            width: 182px;
            height: 42px;
            border-radius: 8px;

            .logo {
                width: 30%;
                height: 42px;
                position: relative;

                img {
                    position: absolute;
                    display: block;
                    width: 30px;
                    height: 30px;
                    right: 20px;
                    top: 6px;
                }
            }

            span {
                display: block;
                width: 70%;
                font-size: 22px;
                text-align: center;
                // align-items: center;
                line-height: 42px;
                color: #888;
            }
        }

        // margin-top: 6px;

    }

    li:hover {
        // background-color: rgba(0, 0, 0, .2);
        background-color: rgba(209, 223, 255);
        color: white;
    }
}

// 通用样式-菜单分隔横线
hr {
    height: 1px;
    width: 200px;
    border: none;
    border-top: 1px solid rgba(0, 0, 0, .3);
    margin: 0 auto;
}

// router-link被点击后应用的样式
.router-link-active {
    // background-color: rgba(0, 0, 0, .2);
    background-color: rgb(209, 223, 255);

}
</style>



