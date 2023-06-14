    
<template>
    <div class="container">
        
        <span class="title">
            {{ title }}
            <span class="type">{{ type }}</span>
        </span>
        <el-divider />
        <!-- 长度刚好可以显示到“难点”两个字 -->
        <el-scrollbar height="574px" >
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
                <div class="content">
                    <div class="whatIDo">
                        <ul>
                            <li v-for="e in difficultPoint">
                                <span>{{ e.content }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </el-scrollbar>


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
let difficultPoint = [
    {
        content:'\n\t难点：'
    },
    {
        content: '1、对整个项目的架构、功能、界面等有一个清晰的规划和设计，这是一个挑战。'
    },
    {
        content: '2、使用Vue框架的最新语法糖，虽然可以提高开发效率和代码可读性，但也需要适应新的语法和写法，以及处理一些兼容性和稳定性的问题。'
    },
    {
        content: '3、前后端的通讯需要考虑数据的格式、传输、安全、异常处理等方面，以保证用户体验和数据准确性。'
    },
    {
        content: '4、选择合适的图表类型、样式、交互等，以展示出数据的特点和趋势，同时也要考虑性能和响应式的问题。'
    }
]


const size = ref('large')
</script>
    
<style scoped lang="scss">
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
    overflow: hidden;
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

            li {
                display: block;
                width: 950px;
                // height: 60px;
                line-height: 30px;
                margin-top: 20px;
                // margin-bottom: 30px;
            }
        }
    }


}
</style>
