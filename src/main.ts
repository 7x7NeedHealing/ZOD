
import { createApp } from 'vue'
import App from './App.vue'

//  routes
import router from "./router";
//pinia
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)

// 全局函数
// 将时间转换为北京时间
app.config.globalProperties.$beijingTime = (time:string)=>{
    let date = new Date(time);
    return date.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
    
}


// 扩充app声明，否则全局函数报错。
declare module 'vue' {
    export interface ComponentCustomProperties{
        $beijingTime:Function

    }
}

// 挂载
app.use(router)
app.use(pinia)
app.mount('#app')