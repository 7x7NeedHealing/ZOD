    
<template>
    <div class="container">
        <el-divider />
        <span class="title">
            {{ title }}
            <span class="type">{{ type }}</span>
        </span>
        <span class="info">{{ info }}</span>

        <div class="content">
            <span class=" tech">{{ tech }}</span>
            <div class="whatIDo">
                <ul>
                    <li v-for="e in whatIDo">
                        <span>{{ e.content }}</span>
                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>
    
<script setup lang="ts">
import { computed, ref } from 'vue'
let title = '待办与博客平台'
let type = '个人项目'
let info = '该项目是一个多功能网站，统合待办事项和发布、浏览文字博客等功能。'
let tech = '采用Vue3、Typescript、Vite、Mysql、Webpack、Echarts、Element-plus、Pinia、Node.js、Express等主流技术'
let whatIDo = [
    {
        content: '1、从零到一实现项目、完成项目搭建。'
    },
    {
        content: '2、使用 Vue3<set up >语法糖，运用其最新特性进行开发。'
    },
    {
        content: '3、前端:首页、登录、发布博客、发布待办、相关信息数据可视化、相关详情页等模块化开发。'
    },
    {
        content: '4、用 Axios 与后端进行通讯。Element-plus 组件进行基础按钮统一样式，日历和倒计时组件再配合 Echarts 图表完成数据可视化'
    },
    {
        content: '5、后端:数据库设计。运用 Express 和路由进行相关 CRUD 的模块化接口开发。'
    },
    {
        content: '6、采用 Pinia 替代 Vuex 作为全局状态管理器。'
    }

]


const size = ref('large')
</script>
    
<style scoped lang="scss">
span {
    display: block;
}

.container {
    width: 1350px;
    height: 870px;
    box-sizing: border-box;
    border-radius: 8px;
    padding: 75px 200px;
    background-color: white;

    .title {
        height: 100px;
        font-size: 40px;
        line-height: 100px;
        font-weight: 600;
        position: relative;

        .type {
            position: absolute;
            top: 10px;
            left: 300px;
            font-size: 20px;
        }
    }

    .info {
        height: 70px;
        font-size: 26px;
    }

    .content {
        .tech {
            height: 60px;
            font-size: 22px;
            margin-bottom: 80px;
        }

        .whatIDo {
            font-size: 22px;
            li{
                display: block;
                width: 950px;
                // height: 60px;
                line-height: 30px;
                margin-top: 20px;
            }
        }
    }


}</style>
