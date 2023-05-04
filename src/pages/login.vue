  
<template>
    <div
        style="width: 1350px;height: 870px;display: flex;flex-direction: column;justify-content: center;background-color: #fff;border-radius: 8px;">
        <div class="container" id="container">
            <div class="form-container sign-up-container">
                <!-- <form> -->
                <div class="form">
                    <h1>注 册</h1>
                <!-- <div class="social-container">
                        <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                        <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
                                                                </div> -->
                    <span>or use your email for registration</span>
                    <input type="text" placeholder="昵称(长度3~10以内哦)" v-model="registNickname" maxlength="10" />
                    <input type="text" placeholder="账号(长度4~12以内哦)" v-model="registAccount" maxlength="12" />
                    <input type="password" placeholder="密码" v-model="registPassword" />
                    <a href="#">tips:昵称可以随意更改,但账号不行哦~</a>
                    <button @click="regist()">注册</button>
                </div>
                <!-- </form> -->
            </div>
            <div class="form-container sign-in-container">
                <!-- <form> -->
                <div class="form">
                    <h1>登 录</h1>
                <!-- <div class="social-container">
                        <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                        <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
                                                                    </div> -->
                    <span>use your account</span>
                    <input type="text" placeholder="账号/昵称" v-model="loginStr" />
                    <input type="password" placeholder="密码" v-model="loginPassword" />
                    <a href="#">忘记密码?</a>
                    <button @click="login()">登录</button>
                </div>
                <!-- </form> -->
            </div>
            <div class="overlay-container">
                <div class="overlay">
                    <div class="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>已有账号?点击下方登录吧~</p>
                        <button class="ghost" id="signIn">登录</button>
                    </div>
                    <div class="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>注册账号尝试高效率功能吧~</p>
                        <button class="ghost" id="signUp">注册</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
    
<script setup lang="ts">
import axios from 'axios';
import { onMounted, getCurrentInstance, ref } from 'vue';
import router from '../router';
import { useMain } from '../store/home';
const state = useMain();
let registNickname = ref('');
let registAccount = ref('');
let registPassword = ref('');
let loginStr = ref('');
let loginPassword = ref('');

const login = () => {
    // console.log('login', loginStr.value, loginPassword.value);
    axios.get(state.http+'/login?loginStr=' + loginStr.value + '&password=' + loginPassword.value)
        .then((res) => {
            console.log(res.data[0].account);
            let account = res.data[0].account;
            console.log(account);

            axios.get(state.http+'/getToken?account=' + account)
                .then((res) => {
                    console.log(res.data.token);
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('account', account);
                    loginStr.value = '';
                    loginPassword.value = '';
                    location.reload();
                    router.push('/');
                })

        })
        .catch((error) => {
            console.log(error);

        })


}
const regist = () => {
    console.log('regist', registNickname.value, registAccount.value, registPassword.value);
    // 昵称长度为3~10位时进入下一步判断
    const nicknameLength = registNickname.value.length;
    const accountLength = registAccount.value.length;
    if (nicknameLength > 2 && nicknameLength < 11) {
        if (accountLength > 3 && accountLength < 13) {
            axios.post(state.http + '/addUser', {
                account: registAccount.value,
                ps: registPassword.value,
                nickname: registNickname.value
            })
                .then((res) => {
                    loginStr.value = registAccount.value;
                    loginPassword.value = registPassword.value;
                    // 自动登录
                    login()
                    ElMessage({
                        showClose: true,
                        message: '注册成功,已自动登录',
                        type: 'success',
                    })
                    registNickname.value = '';
                    registAccount.value = '';
                    registPassword.value = '';
                })
                .catch((err) => {
                    console.log(err);

                })
        }else{
            ElMessage({
                showClose: true,
                message: '账号长度需在3~12位以内哦',
                type: 'error',
            })
        }
    }
    else{
        ElMessage({
                showClose: true,
                message: '昵称长度需在3~10位以内哦',
                type: 'error',
            })
    }

}



onMounted(() => {
    const signUpButton = document.getElementById('signUp') as HTMLElement;
    const signInButton = document.getElementById('signIn') as HTMLElement;
    const container = document.getElementById('container') as HTMLElement;

    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });
    if (localStorage.getItem('token')) {
        router.push('/')
    }
})
</script>
    
<style scoped lang="scss">
// @import url("https://fonts.googleapis.com/css?family=Montserrat:400,800");

* {
    box-sizing: border-box;
}

body {
    background: #f6f5f7;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: "Montserrat", sans-serif;
    height: 100vh;
    margin: -20px 0 50px;
}

h1 {
    font-weight: bold;
    margin: 0;
}

h2 {
    text-align: center;
}

p {
    font-size: 14px;
    font-weight: 100;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
}

span {
    font-size: 12px;
}

a {
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
}

button {
    border-radius: 20px;
    border: 1px solid #ff4b2b;
    background-color: #ff4b2b;
    color: #ffffff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
}

button:active {
    transform: scale(0.95);
}

button:focus {
    outline: none;
}

button.ghost {
    background-color: transparent;
    border-color: #ffffff;
}

// form {
//     background-color: #ffffff;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     flex-direction: column;
//     padding: 0 50px;
//     height: 100%;
//     text-align: center;
// }
.form {
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    text-align: center;
}

input {
    background-color: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
}

.container {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
    margin: 0 auto;
}

.form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
}

.sign-in-container {
    left: 0;
    width: 50%;
    z-index: 2;
}

.container.right-panel-active .sign-in-container {
    transform: translateX(100%);
}

.sign-up-container {
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
}

.container.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show 0.6s;
}

@keyframes show {

    0%,
    49.99% {
        opacity: 0;
        z-index: 1;
    }

    50%,
    100% {
        opacity: 1;
        z-index: 5;
    }
}

.overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
}

.container.right-panel-active .overlay-container {
    transform: translateX(-100%);
}

.overlay {
    background: #ff416c;
    background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
    background: linear-gradient(to right, #ff4b2b, #ff416c);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
    color: #ffffff;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
    transform: translateX(50%);
}

.overlay-panel {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
}

.overlay-left {
    transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
    transform: translateX(0);
}

.overlay-right {
    right: 0;
    transform: translateX(0);
}

.container.right-panel-active .overlay-right {
    transform: translateX(20%);
}

.social-container {
    margin: 20px 0;
}

.social-container a {
    border: 1px solid #dddddd;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    height: 40px;
    width: 40px;
}

footer {
    background-color: #222;
    color: #fff;
    font-size: 14px;
    bottom: 0;
    position: fixed;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 999;
}

footer p {
    margin: 10px 0;
}

footer i {
    color: red;
}

footer a {
    color: #3c97bf;
    text-decoration: none;
}
</style>
