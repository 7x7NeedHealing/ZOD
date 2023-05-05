    
<template>
    <div class="ideaContainer">
        <div class="header">
            <span class="title">建议反馈</span>
        </div>
        <el-divider />
        <div class="body">
            <div class="outline">
                <label>
                    <span class="outlineTitle">大纲/标题</span>
                    <input type="text" placeholder="Please input" class="outlineInput" v-model="idea.title">
                    <span class="outlineTips">tips:描述准确的反馈标题将有助于我们第一时间处理您的反馈意见。</span>
                </label>
            </div>
            <div class="content">
                <span class="contentTitle">内容</span>
                <el-input v-model="idea.content" :rows="6" type="textarea" maxlength="220" placeholder="Please input"
                    class="contentInput" />
                <span class="contentTips">tips:请尽可能详细的描述您的意见与建议，或是您所遭遇的问题。</span>
            </div>
            <div class="contact">
                <label for="">
                    <span class="contactTitle">联系方式</span>
                    <input type="text" placeholder="Please input" class="contactInput" maxlength="20" v-model="idea.contact">
                    <span class="contactTips">tips:非必填项。如需要管理员反馈接纳结果可填。</span>
                </label>

            </div>
        </div>
        <el-divider />
        <el-button type="primary" @click="submit">反馈</el-button>
    </div>
</template>
    
<script setup lang="ts">

import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
import { useMain } from '../store/home';
import { nanoid } from 'nanoid';
const state = useMain()
interface ideaInfo {
    account:string,
    title:string,
    content:string,
    contact:string,
    feedbackId:string
}
let idea:ideaInfo = reactive({
    account:'',
    title:'',
    content:'',
    contact:'',
    feedbackId:''
})
const submit = () =>{
    idea.account = state.account as string;
    idea.feedbackId = nanoid();
    axios.post(state.http+'/addFeedback',idea)
    .then((response)=>{
        console.log(response);
        idea.title = '';
        idea.content = '';
        idea.contact = '';
        idea.feedbackId = '';
        ElMessage({
                showClose: true,
                message: '反馈成功',
                type: 'success',
            });
            
    })
    .catch((error)=>{
    })
}

</script>
    
<style lang="scss">
.ideaContainer {
    width: 1350px;
    height: 870px;
    background-color: #fff;
    border-radius: 8px;
    box-sizing: border-box;
    padding: 40px;

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
        width: 1000px;
        margin: 0 auto;
        box-sizing: border-box;
        padding-top: 60px;

        .outline {
            height: 40px;
            position: relative;
            margin-bottom: 80px;

            .outlineTitle {
                height: 40px;
                font-size: 22px;
                line-height: 40px;
                margin-right: 30px;
                vertical-align: middle;
            }

            .outlineInput {
                width: 300px;
                height: 38px;
                font-size: 18px;
                line-height: 38px;
                box-sizing: border-box;
                padding-left: 10px;
                border-radius: 4px;
                outline: none;
                border: 1px solid rgba(64,158,255,.3);
                &:focus{
                    border-color: rgb(64,158,255);
                }
            }

            .outlineTips {
                position: absolute;
                top: 54px;
                left: 10px;
                font-weight: 600;
                color: rgba(0, 0, 0, .4);
            }

        }

        .content {
            height: 240px;
            position: relative;
            margin-bottom: 60px;

            .contentTitle {
                display: inline-block;
                width: 90px;
                height: 40px;
                font-size: 22px;
                line-height: 40px;
                text-align: center;
                margin-right: 34px;
                vertical-align: top;
            }

            .contentInput {
                width: 800px;
                height: 28px;
                max-height: 300px;
                font-size: 20px;
            }

            .el-textarea__inner {
                width: 800px;
                max-height: 210px;
            }

            .contentTips {
                position: absolute;
                bottom: 8px;
                left: 10px;
                font-size: 16px;
                font-weight: 600;
                color: rgba(0, 0, 0, .4);
            }
        }

        .contact {
            height: 40px;
            position: relative;
            margin-bottom: 80px;
            display: flex;


            .contactTitle {
                width: 100px;
                height: 40px;
                font-size: 22px;
                line-height: 40px;
                margin-right: 36px;
                vertical-align: middle;
            }
            .contactInput{
                width: 300px;
                height: 38px;
                font-size: 18px;
                line-height: 38px;
                box-sizing: border-box;
                padding-left: 10px;
                border-radius: 4px;
                outline: none;
                border: 1px solid rgba(64,158,255,.3);
                &:focus{
                    border-color: rgb(64,158,255);
                }
            }
            .contactTips {
                position: absolute;
                bottom: -28px;
                left: 10px;
                font-size: 16px;
                font-weight: 600;
                color: rgba(0, 0, 0, .4);
            }
        }
    }
    .el-button {
        width: 120px;
        height: 50px;
        font-size: 20px;
        // margin: 0 auto;
        margin-top: 30px;
        margin-left: 40%;

    }
}
</style>
