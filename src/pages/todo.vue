    
<template>
    <div class="todoContainer">
        <div class="top">
            <div class="left">
                <div class="leftTop">
                    <span class="todayTodo">今日待办</span>
                    <el-button text @click="dialogFormVisible = true">
                        创建待办
                    </el-button>

                    <el-dialog v-model="dialogFormVisible" title="创建待办">
                        <el-form :model="todoForm">
                            <el-form-item label="待办事件" :label-width="formLabelWidth">
                                <el-input placeholder="输入将要做的事情." v-model="todoForm.content" autocomplete="off" />
                            </el-form-item>
                        </el-form>
                        <template #footer>
                            <span class="dialog-footer">
                                <el-button @click="dialogFormVisible = false">取消</el-button>
                                <el-button type="primary" @click="createTodo()">
                                    创建
                                </el-button>
                            </span>
                        </template>
                    </el-dialog>
                </div>
                <!-- <el-scrollbar height='470px'> -->
                    <div v-show="todoInfo.length === 0">
                        <el-empty :image-size="300" />
                    </div>
                    <ul v-show="todoInfo.length > 0" class="leftBody">
                        <li class="todoList" v-for="(e, index) in todoInfo">
                            <a href="javascript:" class="todoInfo">
                                <div class="main">
                                    <div class="doneBtn">
                                        <div :style="e.status === '0' ? beautyColor : beautyColorX" class="beauty"></div>
                                        <div v-if="e.status === '1'" @click="changeDoneFlag(e.status, index)">
                                            <el-button type="success" size="large" :icon="Check"
                                                style="margin-top: 16px;margin-left: 16px;" circle />
                                        </div>
                                        <div v-else>
                                            <el-button @click="changeDoneFlag(e.status, index)" size="large"
                                                style="margin-top: 16px;margin-left: 16px;" circle />
                                        </div>
                                    </div>
                                    <div class="body">
                                        <el-scrollbar height='70px'>
                                            <span class="content">{{ e.content }}</span>
                                        </el-scrollbar>
                                        <div class="operation">
                                            <!-- todo事件的删除和编辑 -->
                                            <a href="javascript:" @click="deleteTodo(e.todoId, index)">
                                                <img :src="deleteTodoIcon" alt="">
                                            </a>
                                            <a href="javascript:"
                                                @click="dialogFormVisible1 = true; editIndex = index; editContent = e.content">
                                                <img :src="changeTodoIcon" alt="">
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>
                    </ul>
                <!-- </el-scrollbar> -->


                <el-dialog v-model="dialogFormVisible1" title="更改内容">
                    <el-form>
                        <el-form-item label="内容" :label-width="formLabelWidth">
                            <el-input v-model="editContent" autocomplete="off" placeholder="输入将要做的事情." />
                        </el-form-item>
                    </el-form>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="dialogFormVisible1 = false">取消</el-button>
                            <el-button type="primary" @click="editTodo">
                                更改
                            </el-button>
                        </span>
                    </template>
                </el-dialog>
            </div>
            <div class="right">
                <el-calendar v-model="value" @click="changeTodoList()">
                    <template #date-cell="{ data }">
                        <p :class="data.isSelected ? 'is-selected' : ''">
                            {{ data.day.split('-').slice(1).join('-').slice(3) }}
                            {{ data.isSelected ? '✔️' : '' }}
                        </p>
                    </template>
                </el-calendar>
                <span class="go">享受好心情</span>
            </div>
        </div>
        <div class="bottom">
            <div class="left">
                <div class="leftTop">
                    <span class="todayTodo">全部待办</span>
                </div>
                <el-scrollbar height="250px">
                    <ul v-show="allTodoNoDoneInfo.length > 0" class="leftBody">
                        <li class="todoList" v-for="(e, index) in allTodoNoDoneInfo">
                            <a href="javascript:" class="todoInfo">
                                <div class="main">
                                    <div class="doneBtn">
                                        <div :style="e.status === '0' ? beautyColor : beautyColorX" class="beauty"></div>
                                        <!-- 当处于未完成状态的情况被点击的时候，把按钮改成’完成‘状态 -->
                                        <div v-if="e.status === '1'" @click="changeDoneFlag1(e.status, index)">
                                            <el-button type="success" size="large" :icon="Check"
                                                style="margin-top: 16px;margin-left: 16px;" circle />
                                        </div>
                                        <!-- 当处于完成状态的情况被点击的时候，把按钮改成’未完成‘状态 -->
                                        <div v-else>
                                            <el-button @click="changeDoneFlag1(e.status, index)" size="large"
                                                style="margin-top: 16px;margin-left: 16px;" circle />
                                        </div>
                                    </div>
                                    <div class="body">
                                        <el-scrollbar height='70px'>
                                            <span class="content">{{ e.content }}</span>

                                        </el-scrollbar>
                                        <div class="operation">
                                            <!-- todo事件的删除和编辑 -->
                                            <a href="javascript:" @click="deleteTodo1(e.todoId, index)">
                                                <img :src="deleteTodoIcon" alt="">
                                            </a>
                                            <a href="javascript:"
                                                @click="dialogFormVisible1 = true; editIndex = index; editContent = e.content">
                                                <img :src="changeTodoIcon" alt="">
                                            </a>

                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <div v-show="allTodoNoDoneInfo.length === 0">
                        <el-empty :image-size="120" />
                    </div>
                </el-scrollbar>


            </div>

            <div class="right">
                <countDown></countDown>
            </div>

        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { getCurrentInstance } from 'vue';
import { nanoid } from 'nanoid';
import deleteTodoIcon from '../assets/menuIcon/deleteTodo.png'
import changeTodoIcon from '../assets/menuIcon/changeTodo.png'
import { useMain } from '../store/home';
import { onMounted, reactive, ref, VueElement } from 'vue'
import { Check } from '@element-plus/icons-vue'
import axios, { all } from 'axios';

interface todo {
    releaseTime: string,
    endTime: string,
    fromId: string,
    content: string,
    status: string,
    todoId: string
}

// 存储要展示的todo的列表
let todoInfo: Array<todo> = reactive([])
// 存储所有未做的todo数组
let allTodoNoDoneInfo: Array<todo> = reactive([])

// 创建时的弹出框旗帜
const dialogFormVisible = ref(false)
// 编辑时的弹出框旗帜
const dialogFormVisible1 = ref(false)
const formLabelWidth = '140px'

let editIndex = 0;
let editContent = ref('');

let state = useMain()
// 创建时用的对象
let todoForm = reactive({
    content: '',
    releaseTime: '',
    endTime: '2000-01-01',
    fromId: state.account as string,
    todoId: nanoid(),
    // 默认为未完成状态
    status: '0'
})
// 提交时用的对象
// const todoFormList: Array<todo> = reactive([])


const value = ref(new Date())
// todo事件状态(默认为未完成)
// const doneFlag = ref(false)

const calendarTime = () => {
    let date = new Date(value.value);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    // console.log((`${year}-${month}-${day}`));
    // console.log(value);
    return (`${year}-${month}-${day}`);
}
const getTime = () => {
    let date = new Date()
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    return (`${year}-${month}-${day}`);
}

// 改变todo事件状态(默认为未完成)
const changeDoneFlag = (e: string, index: number) => {
    // console.log('===>', e, index);

    if (e === '0') {
        todoInfo[index].status = '1'
        allTodoNoDoneInfo.forEach((t, i) => {
            if (t.todoId === todoInfo[index].todoId) {
                t.status = '1'
            }
        })
        // 更改为完成状态，并添加endTime
        todoInfo[index].endTime = getTime()
        axios.post(state.http + '/updateTodoStatus', { status: '1', endTime: todoInfo[index].endTime, todoId: todoInfo[index].todoId })
            .then(function (response) {
                // console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    } else {
        todoInfo[index].status = '0'
        todoInfo[index].endTime = '2000-01-01'
        allTodoNoDoneInfo.forEach((t, i) => {
            if (t.todoId === todoInfo[index].todoId) {
                t.status = '0'
                t.endTime = '2000-01-01'
            }
        })
        axios.post(state.http + '/updateTodoStatus', { status: '0', endTime: todoInfo[index].endTime, todoId: todoInfo[index].todoId })
            .then(function (response) {
                // console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

}

// 改变下方全部todo事件状态(默认为未完成)
const changeDoneFlag1 = (e: string, index: number) => {
    // console.log('===>', e, index);

    if (e === '0') {
        allTodoNoDoneInfo[index].status = '1'
        // 更改为完成状态，并添加endTime
        allTodoNoDoneInfo[index].endTime = getTime()
        todoInfo.forEach((t, i) => {
            if (t.todoId === allTodoNoDoneInfo[index].todoId) {
                t.status = '1';
                t.endTime = '2000-01-01';
                return
            }
        })
        axios.post(state.http + '/updateTodoStatus', { status: '1', endTime: allTodoNoDoneInfo[index].endTime, todoId: allTodoNoDoneInfo[index].todoId })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    } else {
        allTodoNoDoneInfo[index].status = '0'
        allTodoNoDoneInfo[index].endTime = '2000-01-01'
        todoInfo.forEach((t, i) => {
            if (t.todoId === allTodoNoDoneInfo[index].todoId) {
                t.status = '0';
                t.endTime = '2000-01-01'
                return
            }
        })
        axios.post(state.http + '/updateTodoStatus', { status: '0', endTime: allTodoNoDoneInfo[index].endTime, todoId: allTodoNoDoneInfo[index].todoId })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

}
// 创建todo事件
const createTodo = () => {
    todoForm.releaseTime = calendarTime()
    axios.post(state.http + '/addTodo', todoForm)
        .then(function (response) {
            // console.log(response);
            todoInfo.push(todoForm)
            allTodoNoDoneInfo.unshift(todoForm)
            todoForm = reactive({
                content: '',
                releaseTime: '',
                endTime: '2000-01-01',
                fromId: state.account as string,
                todoId: nanoid(),
                // 默认为未完成状态
                status: '0'
            })
            dialogFormVisible.value = false
        })
        .catch(function (error) {
            console.log(error);
        });

    dialogFormVisible.value = false
}
// 删除todo事件
const deleteTodo = (e: string, index: number) => {
    // console.log('删除！', index);
    axios.get(state.http + '/deleteTodo?todoId=' + e)
        .then(function (response) {
            // console.log(response);
            allTodoNoDoneInfo.forEach((t, index1) => {
                if (t.todoId === e) {
                    allTodoNoDoneInfo.splice(index1, 1)
                    return
                }
            })
            todoInfo.splice(index, 1)

            // console.log('删除成功！', e, todoInfo);
        })
        .catch(function (error) {
            console.log(error);
        });

}
// 下方删除todo事件
const deleteTodo1 = (e: string, index: number) => {
    // console.log('删除！', index);
    axios.get(state.http + '/deleteTodo?todoId=' + e)
        .then(function (response) {
            // console.log(response);
            todoInfo.forEach((t, index1) => {
                if (t.todoId === e) {
                    todoInfo.splice(index1, 1)
                    return
                }
            })
            allTodoNoDoneInfo.splice(index, 1)

            // console.log('删除成功！', e, todoInfo);
        })
        .catch(function (error) {
            console.log(error);
        });

}
// 编辑todo事件
const editTodo = () => {

    axios.post(state.http + '/updateTodo', { content: editContent.value, todoId: todoInfo[editIndex].todoId })
        .then(response => {
            todoInfo[editIndex].content = editContent.value
        })
        .catch(error => {
            console.log(error)
        })
    dialogFormVisible1.value = false
}

const instance = getCurrentInstance();

// 展示某一天的todo事件
const changeTodoList = () => {

    // 请求到新一天的todolist时，将原来的todolist列表清空
    todoInfo = reactive([])
    todoForm.releaseTime = calendarTime()
    axios.get(state.http + '/checkTodo?fromId=' + `${todoForm.fromId}` + '&releaseTime=' + `${todoForm.releaseTime}`)
        .then(response => {
            response.data.forEach((element: todo) => {
                element.releaseTime = new Date(element.releaseTime).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
                element.endTime = new Date(element.endTime).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
                todoInfo.push(element)
            });
            // 强制刷新页面，否则渲染不到数据
            instance?.proxy?.$forceUpdate()
        })
        .catch(error => {
            console.log(error)
        })
}
// todo事件未完成时标识颜色
const beautyColor = ref({
    backgroundColor: 'rgba(0,0,0,.3)'

})
// todo事件完成时的标识颜色
const beautyColorX = ref({
    backgroundColor: 'rgb(149, 212, 117)'

})
onMounted(() => {
    todoForm.releaseTime = calendarTime()
    axios.get(state.http + '/checkTodo?fromId=' + `${todoForm.fromId}` + '&releaseTime=' + `${todoForm.releaseTime}`)
        .then(response => {
            response.data.forEach((element: todo) => {
                element.releaseTime = new Date(element.releaseTime).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
                element.endTime = new Date(element.endTime).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
                todoInfo.push(element)
                // console.log('销毁');

            });
        })
        .catch(error => {
            console.log(error)
        })
    axios.get(state.http + '/checkTodoNoDone?fromId=' + `${state.account}`)
        .then(response => {
            response.data.forEach((element: todo) => {
                // element.releaseTime = new Date(element.releaseTime).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
                // element.endTime = new Date(element.endTime).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
                allTodoNoDoneInfo.unshift(element)
                // console.log('销毁');

            });
            // console.log(allTodoNoDoneInfo);

        })
        .catch(error => {
            console.log(error)
        })
})


</script>
  
    <!-- 因为用了日历组件，所以得去掉scoped，否则样式无法应用 -->
<style lang="scss">
// ::-webkit-scrollbar {
//     width: 0;
// }

// 日历两个字的字体大小
.todoContainer {
    width: 1350px;
    height: 870px;
    background-color: rgba(241, 242, 245);


    .top {
        width: 1350px;
        height: 543px;
        display: flex;
        margin-bottom: 10px;

        .left {
            display: inline-block;
            width: 790px;
            height: 543px;
            margin-right: 10px;
            border-radius: 8px;
            background-color: white;
            box-sizing: border-box;
            padding: 10px;

            .el-button--text {
                margin-right: 15px;
            }

            .el-select {
                width: 300px;
            }

            // 弹框中两个按钮的距离
            .dialog-footer button:first-child {
                margin-right: 10px;
            }

            // 弹框的边框
            .el-dialog {
                border-radius: 8px;
            }

            .el-dialog__title {
                font-size: 28px;
            }

            // 弹框中的输入框相关
            .el-input__inner {
                --el-input-inner-height: 100px;
                font-size: 24px;
            }

            // 弹框事件中[待办事件]的字体大小
            .el-form-item__label {
                font-size: 22px;
            }

            // 弹框中输出框大小
            .el-input {
                width: 700px;
                // border: 1px solid rgba(0, 0, 0, .3);
            }

            .el-button.is-text {
                border-radius: 8px;
                margin-right: 10px;
                margin-top: 6px;
                color: white;
                background-color: rgb(100, 172, 245);
            }

            // .el-icon svg{
            //     height: 2em;
            //     width: 2em;
            // }

            .leftTop {
                width: 770px;
                height: 43px;
                display: flex;
                justify-content: end;
                position: relative;
                border-bottom: 1px solid rgba(0, 0, 0, .1);

                // border-width: 80%;
                .todayTodo {
                    display: block;
                    position: absolute;
                    font-size: 24px;
                    line-height: 43px;
                    left: 40%;
                }
            }

            ::-webkit-scrollbar {
                width: 0;
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

            .leftBody {
                display: block;
                width: 770px;
                // font-size: 0;

                height: 470px;
                overflow: auto;
                .todoList {
                    // font-size: 0;
                    width: 100%;
                    height: 70px;
                    // background-color: black;
                    margin-top: 6px;
                    border-radius: 8px;

                    .todoInfo {
                        display: block;
                        // border: 1px solid rgba(0,0,0,.1);
                        border-radius: 12px;

                        .main {
                            width: 100%;
                            height: 100%;
                            display: flex;

                            .doneBtn {
                                width: 100px;
                                height: 70px;
                                display: flex;
                                justify-content: start;

                                // 完成时那个勾的大小，以下两个el-xx都需要存在，否则失效
                                .el-icon {
                                    height: 2em;
                                    width: 2em;

                                }

                                .el-icon svg {
                                    height: 2em;
                                    width: 2em;
                                }

                                .beauty {
                                    width: 4px;
                                    height: 60px;
                                    margin: 6px;
                                    margin-left: 10px;
                                    border-radius: 70px;
                                    background-color: rgba(0, 0, 0, .3)
                                }

                                .done {
                                    // display: block;
                                    width: 34px;
                                    height: 34px;
                                    border-radius: 34px;
                                    margin: 0 auto;
                                    margin-top: 18px;
                                    background-color: white;
                                    border: 1px solid rgba(0, 0, 0, .3);


                                }

                                // background-color: pink;
                            }

                            .body {
                                width: 690px;
                                height: 100%;
                                // background-color: black;
                                display: flex;
                                justify-content: start;

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

                                .content {
                                    display: inline-block;
                                    width: 540px;
                                    // height: 70px;
                                    font-size: 24px;
                                    line-height: 70px;
                                    box-sizing: border-box;
                                    padding-left: 20px;
                                    color: black;
                                    // white-space: nowrap; //不允许换行
                                    // overflow: hidden; //超出包裹器隐藏
                                    // text-overflow: ellipsis; //显示省略符号来代表被修剪的文本。
                                }

                                .operation {
                                    width: 150px;
                                    height: 100%;
                                    display: flex;
                                    justify-content: space-around;

                                    .el-overlay {
                                        background-color: rgba(0, 0, 0, .1);
                                        --el-overlay-color-lighter: rgba(0, 0, 0, .1)
                                    }

                                    a {
                                        width: 30px;
                                        height: 30px;
                                        margin-top: 20px;
                                        // background-color: white;
                                        border-radius: 8px;

                                        img {
                                            display: block;
                                            width: 30px;
                                            height: 30px;
                                        }
                                    }
                                }
                            }


                        }

                        &:hover {
                            background-color: rgb(241, 242, 245);
                        }
                    }

                }
            }

        }

        .right {
            display: inline-block;
            width: 550px;
            height: 100%;

            // background-color: black;
            .el-calendar {
                box-sizing: border-box;
                // padding-top: 20px;
                // padding-left: 20px;
                // padding-right: 20px;
                padding: 20px;
                border-radius: 8px;
                // 日历表字体大小
                font-size: 20px;
                // 日历表长度
                // --el-calendar-cell-width: 72px;
                --el-calendar-cell-width: 60px;

                // 年月份栏
                // span {
                //     font-size: 14px;
                // }

                // .el-button--small {
                //     height: 30px;
                //     font-size: 16px;

                // }

                .el-button {
                    height: 34px;
                    font-size: 16px;
                }

                .el-calendar__body {
                    padding: 12px 20px 16px 20px;
                    transition: height 5s;
                    // .el-calendar-table {
                    //     width: 100%;

                    // }

                }



            }

            .go {
                display: block;
                width: 100%;
                height: 48px;
                line-height: 48px;
                font-size: 22px;
                box-sizing: border-box;
                margin: 10px 0;
                padding: 0 14px;
                text-align: center;
                background-color: #fff;
                border-radius: 8px;
            }

            // }
        }
    }

    .bottom {
        display: flex;
        justify-content: start;
        width: 1350px;
        height: 316px;
        box-sizing: border-box;
        padding: 10px;
        border-radius: 8px;
        // background-color: rgba(0, 0, 0, .1);
        background-color: #fff;

        .left {
            width: 770px;

            // height: 300px;
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

            // 不设置的话，全部待办栏会莫名奇妙多出几十px的长度
            .el-scrollbar {
                height: 89%;
            }

            // overflow: auto;
            .leftTop {
                width: 770px;
                height: 42px;
                display: flex;
                justify-content: end;
                position: relative;
                border-bottom: 1px solid rgba(0, 0, 0, .1);

                // border-width: 80%;
                .todayTodo {
                    display: block;
                    position: absolute;
                    font-size: 24px;
                    line-height: 43px;
                    left: 40%;
                }
            }

            .leftBody {
                display: block;
                width: 770px;
                // height: 258px;
                // overflow: auto;

                .todoList {
                    // font-size: 0;
                    width: 100%;
                    height: 70px;
                    // background-color: black;
                    margin-top: 6px;
                    border-radius: 8px;

                    .todoInfo {
                        display: block;
                        // border: 1px solid rgba(0,0,0,.1);
                        border-radius: 12px;

                        .main {
                            width: 100%;
                            height: 100%;
                            display: flex;

                            .doneBtn {
                                width: 100px;
                                height: 70px;
                                display: flex;
                                justify-content: start;

                                // 完成时那个勾的大小，以下两个el-xx都需要存在，否则失效
                                .el-icon {
                                    height: 2em;
                                    width: 2em;

                                }

                                .el-icon svg {
                                    height: 2em;
                                    width: 2em;
                                }

                                .beauty {
                                    width: 4px;
                                    height: 60px;
                                    margin: 6px;
                                    margin-left: 10px;
                                    border-radius: 70px;
                                    background-color: rgba(0, 0, 0, .3)
                                }

                                .done {
                                    // display: block;
                                    width: 34px;
                                    height: 34px;
                                    border-radius: 34px;
                                    margin: 0 auto;
                                    margin-top: 18px;
                                    background-color: white;
                                    border: 1px solid rgba(0, 0, 0, .3);


                                }

                                // background-color: pink;
                            }

                            .body {
                                width: 675px;
                                height: 100%;
                                // background-color: black;
                                display: flex;
                                justify-content: start;

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

                                .content {
                                    display: inline-block;
                                    width: 574px;
                                    font-size: 16px;
                                    font-weight: 600;
                                    line-height: 70px;
                                    box-sizing: border-box;
                                    // padding-left: 20px;
                                    color: black;
                                    // white-space: nowrap; //不允许换行
                                    // overflow: hidden; //超出包裹器隐藏
                                    // text-overflow: ellipsis; //显示省略符号来代表被修剪的文本。
                                }

                                .operation {
                                    width: 100px;
                                    height: 100%;
                                    display: flex;
                                    justify-content: space-around;

                                    .el-overlay {
                                        background-color: rgba(0, 0, 0, .1);
                                        --el-overlay-color-lighter: rgba(0, 0, 0, .1)
                                    }

                                    a {
                                        width: 30px;
                                        height: 30px;
                                        margin-top: 20px;
                                        // background-color: white;
                                        border-radius: 8px;

                                        img {
                                            display: block;
                                            width: 30px;
                                            height: 30px;
                                        }
                                    }
                                }
                            }


                        }

                        &:hover {
                            background-color: rgb(241, 242, 245);
                        }
                    }

                }
            }
        }

        .center {
            width: 340px;

        }

        .right {
            width: 560px;
        }

    }



}

.is-selected {
    color: #1989fa;
}
</style>
