    
<template>
    <div class="container">
        <div class="header">
            <span>我的信息</span>
        </div>
        <el-divider />
        <div class="body">
            <ul>
                <li class="formRow">
                    <label class="formClass">
                        <span>昵称:</span>
                        <!-- <el-input v-model="user.nickname" minlength="3" maxlength="10" placeholder="Please input"
                            show-word-limit type="text"  class="input"/> -->
                        <input type="text" v-model="user.nickname" maxlength="10" minlength="3">
                    </label>
                </li>
                <li class="formRow">
                    <label class="formClass">
                        <span>账号:</span>
                        <span>{{ user.account }}</span>
                        <!-- <input type="text" v-model="user.account"> -->
                    </label>
                </li>
                <li class="formRow">
                    <label class="formClass">
                        <span>密码:</span>
                        <!-- <span>{{ user.ps }}</span> -->
                        <input type="text" v-model="user.ps" minlength="2">
                    </label>
                </li>
                <li class="formRow">
                    <label class="formClass">
                        <span>邮箱:</span>
                        <input type="text" v-model="user.email" minlength="7">
                    </label>
                </li>
                <li class="formRow">
                    <label class="formClass">
                        <span>电话:</span>
                        <input type="text" v-model="user.phone" maxlength="11" minlength="11">
                    </label>
                </li>
            </ul>
        </div>
        <!-- <el-button type="primary">保存</el-button> -->
        <el-divider />
        <el-button type="primary" @click="submit">保存</el-button>

    </div>
</template>
     
<script setup lang="ts">
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
import { useMain } from '../store/home';
const state = useMain()
interface userInfo {
    account: string,
    email: string,
    nickname: string,
    phone: string,
    ps: string
}
let user: userInfo = reactive({
    account: '',
    email: '',
    nickname: '',
    phone: '',
    ps: ''
})
const submit = () => {
    if(user.ps==='' ||user.ps.length<2){
        ElMessage({
                showClose: true,
                message: '密码不能为空,且至少7位哦',
                type: 'error',
            })
    }
    else{
        axios.post(state.http+'/updateUserInfo', user)
        .then((response) => {
            // console.log(response);
            // console.log('保存成功');
            ElMessage({
                showClose: true,
                message: '保存成功',
                type: 'success',
            })


        })
        .catch((error) => {
            console.log(error);

        })
    }
   
}
onMounted(() => {
    console.log(state);

    axios.get(state.http+'/checkUserInfo?account=' + state.account)
        .then((response) => {
            // console.log(response.data[0]);
            user.account = response.data[0].account
            user.email = response.data[0].email
            user.nickname = response.data[0].nickname
            user.phone = response.data[0].phone
            user.ps = response.data[0].ps

        })
        .catch((error) => {
            console.log(error);

        })
})
</script>
     
<style scoped lang="scss">
.container {
    width: 1350px;
    height: 870px;
    box-sizing: border-box;
    padding: 40px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    background-color: #fff;

    .header {
        height: 72px;
        font-size: 24px;
        line-height: 72px;
        color: rgb(0, 161, 214);
        // margin: 0 auto;
    }

    .el-divider {
        margin: 0;
    }

    .body {
        font-size: 0;
        box-sizing: border-box;
        padding: 100px 380px;

        .formRow {
            display: block;
            height: 40px;
            margin-bottom: 36px;

            // margin-top: 100px;
            // margin-left: 220px;
            .formClass {
                display: inline-block;
                height: 40px;
                font-size: 20px;
                font-weight: 600;
                line-height: 40px;
                vertical-align: middle;

                span {
                    display: inline-block;
                    box-sizing: border-box;
                    margin: 0 36px;
                }

                input {
                    // display: block;
                    height: 32px;
                    border-radius: 8px;
                    font-size: 18px;
                    font-weight: 600;
                    line-height: 32px;
                    // margin-left: 36px;
                    box-sizing: border-box;
                    padding-left: 20px;
                    border: 2px solid rgba(0, 0, 0, .4);
                }
                .input{
                    height: 32px;
                    border-radius: 8px;
                    font-size: 18px;
                    font-weight: 600;
                    line-height: 32px;
                    // margin-left: 36px;
                    box-sizing: border-box;
                    padding-left: 20px;
                    border: 2px solid rgba(0, 0, 0, .4);
                }
            }
        }
    }

    // .submit{
    //     display: block;
    //     width: 80px;
    //     height: 30px;
    // }
    .el-button {
        width: 120px;
        height: 50px;
        font-size: 20px;
        margin: 0 auto;
        margin-top: 30px;
    }
}
</style>
 