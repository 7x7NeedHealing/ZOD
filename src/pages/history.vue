    
<template>
    <div class="container">
        <div class="header">
            <span class="title">浏览记录</span>
        </div>
        <el-divider />

        <div class="body">
            <el-scrollbar>
                <!-- <el-timeline v-infinite-scroll="load" :infinite-scroll-disabled="busy" > 
                    <el-timeline-item  center v-for="(e, index) in historyArray"
                        :timestamp="beijingTime(historyTimeArray[index])" placement="top">
                        <el-card>
                            <a href="javascript:" class="info" @click="go(e, index)">
                                <h4>{{ e.title }}</h4>
                                <p>作者：{{ e.nickname }}</p>
                            </a>
                        </el-card>
                    </el-timeline-item>
                </el-timeline> -->
                <el-timeline > 
                    <el-timeline-item  center v-for="(e, index) in historyArray"
                        :timestamp="beijingTime(historyTimeArray[index])" placement="top">
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

        <el-divider />
        <div class="footer"></div>

    </div>
</template>
    
<script setup lang="ts">
import axios from 'axios';
import { onMounted, reactive, Ref, ref } from 'vue';
import router from '../router';
import { useMain } from '../store/home';
const state = useMain()
interface historyObj {
    blogId: string,
    time: string
}
interface historyInfo {
    title: string,
    nickname: string
}
let historyArray: Array<historyInfo> = reactive([]);
let historyTimeArray: Array<string> = reactive([]);
let blogInfo: Array<string> = reactive([]);
let historyPage: Ref<number> = ref(0);
let busy = ref(false);
const beijingTime = (time: string) => {
    let date = new Date(time);
    return date.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
}
const go = (e: historyInfo, index: number) => {
    router.push({ path: '/detail', query: { blogId: blogInfo[index], nickname: e.nickname } })
    // console.log(e);

}
const load = () => {
    busy.value = true;
    axios.get(state.http + '/checkHistory?account=' + `${state.account}` + '&page=' + historyPage.value)
        .then(response => {
            // console.log(response.data);
            response.data.forEach((element: historyObj) => {
                // historyArray.push(element)
                blogInfo.push(element.blogId)
                historyTimeArray.unshift(element.time)
                axios.get(state.http + '/checkBlogById?blogId=' + `${element.blogId}`)
                    .then(response => {
                        historyArray.push(response.data[0]);
                        historyPage.value += 5;
                        busy.value = false;
                    })
                    .catch(error => {
                        console.log(error)
                    })
            });


        })
        .catch(error => {
            console.log(error)
        })
}

onMounted(() => {
    // axios.get('http://localhost:888/checkHistory?account=' + `${state.account}`)
    //     .then(response => {
    //         // console.log(response.data);
    //         response.data.forEach((element: historyObj) => {
    //             // historyArray.push(element)
    //             blogInfo.unshift(element.blogId)
    //             historyTimeArray.unshift(element.time)
    //             axios.get('http://localhost:888/checkBlogById?blogId=' + `${element.blogId}`)
    //                 .then(response => {
    //                     historyArray.unshift(response.data[0])
    //                 })
    //                 .catch(error => {
    //                     console.log(error)
    //                 })
    //         });
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })
    axios.get(state.http + '/checkHistory?account=' + `${state.account}` + '&page=' + historyPage.value)
        .then(response => {
            console.log(response.data);
            response.data.forEach((element: historyObj) => {
                // historyArray.push(element)
                blogInfo.unshift(element.blogId)
                historyTimeArray.unshift(element.time)
                axios.get(state.http + '/checkBlogById?blogId=' + `${element.blogId}`)
                    .then(response => {
                        historyArray.unshift(response.data[0]);
                        historyPage.value += 5;
                        busy.value = false;
                    })
                    .catch(error => {
                        console.log(error)
                    })
            });


        })
        .catch(error => {
            console.log(error)
        })
})

</script>
    
<style scoped lang="scss">
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
                h4{
                    font-size: 22px;
                    color: black;
                }
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
