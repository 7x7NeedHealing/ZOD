<template >
    <div class="blogContainer">

        <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" class="formSize">
            <el-divider />
            <el-form-item label="标题(字数小于20哦)">
                <el-input v-model="blog.title" maxlength="20" placeholder="输入你的博客标题."/>
            </el-form-item>
            <el-form-item label="内容(字数小于220哦)">
                <el-input v-model="blog.content" type="textarea" maxlength="220" placeholder="输入你的博客内容."/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">发布</el-button>
                <el-button>重置</el-button>
            </el-form-item>
            <el-divider />
        </el-form>
    </div>
</template>
  
<script lang="ts" setup>
// 生成唯一blogID
import { nanoid } from 'nanoid';

import { getCurrentInstance } from 'vue';
import axios from 'axios';
import { reactive, ref } from 'vue'
import { useMain } from '../store/home';
interface blogObj {
    releaseTime: string,
    fromId: string,
    title: string,
    content: string,
    blogId: string
}

// 属性
let state = useMain()
const instance = getCurrentInstance();
let blog: blogObj = reactive({
    releaseTime: '',
    fromId: state.account,
    title: '',
    content: '',
    blogId: ''
})
const labelPosition = ref('top')

const formLabelAlign = reactive({
    name: '',
    region: '',
    type: '',
})
// 方法
const onSubmit = (e: any) => {
    blog.releaseTime = getTime()
    blog.blogId = nanoid()
    // console.log(blog);
    if (blog.title.length>20){
        ElMessage({
                showClose: true,
                message: '发表失败，标题太长啦',
                type: 'error',
            })
    }else{
        axios.post(state.http+'/addBlog', blog)
        .then(function (response) {
            console.log(response);
            blog.content = '',
            blog.title = ''
            ElMessage({
                showClose: true,
                message: '发表成功',
                type: 'success',
            })
        })
        .catch(function (error) {
            console.log(error);
            ElMessage({
                showClose: true,
                message: '发表失败，请检查内容',
                type: 'error',
            })
        });
    }
    
}

const getTime = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const day = now.getDate()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const seconds = now.getSeconds()

    return (`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`)
}


</script>
  
  
  
    
<style lang="scss">
// 表格
.blogContainer {
    width: 1350px;
    height: 870px;
    background-color: #fff;
    box-sizing: border-box;
    padding-top: 60px;

    .formSize {
        width: 850px;
        height: 750px;
        box-sizing: border-box;
        padding: 30px;
        margin: 0 auto;

        // background-color: #fff;
        // border: 1px solid rgba(0,0,0,.2);
        // border-radius: 8px;
    }

    .el-form-item {
        // margin-top: 100px;
        margin-top: 40px;
    }

    // label
    .el-form-item__label {
        font-size: 24px;
    }

    // 输入框
    .el-input__inner {
        height: 40px;
        font-size: 24px;
    }

    // 内容框
    .el-textarea__inner {
        height: 300px;
        min-height: 300px;
        max-height: 400px;
        font-size: 22px;
    }

    // 发布按钮
    .el-form-item__content {
        justify-content: space-around;
    }

    .el-button {
        width: 110px;
        height: 50px;
        font-size: 20px;
    }
}
</style>

