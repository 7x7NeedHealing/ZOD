import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

let routes: Array<RouteRecordRaw> = [
    {
        // 默认页面是-主页
        path: '/',
        name: 'index',
        //使用import可以路由懒加载，如果不使用，太多组件一起加载会造成白屏
        component: () => import('../pages/home.vue')
       

    },
    {
        path: '/blog',
        name: 'blog',
        component: () => import('../pages/blog.vue'),
    },
    {
        path: '/todo',
        name: 'todo',
        component: () => import('../pages/todo.vue'),
        meta: { keepAlive: true }

    },
    {
        path: '/shujutongji',
        name: 'shujutongji',
        component: () => import('../pages/shujutongji.vue')
    },
    {
        path: '/setting',
        name: 'setting',
        component: () => import('../pages/setting.vue')
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../pages/about.vue')
    },
    {
        path: '/favorite',
        name: 'favorite',
        component: () => import('../pages/favorite.vue')
    },
    {
        path: '/history',
        name: 'history',
        component: () => import('../pages/history.vue')
    },
    {
        path: '/idea',
        name: 'idea',
        component: () => import('../pages/idea.vue')
    },
    {
        path: '/myInfo',
        name: 'myInfo',
        component: () => import('../pages/myInfo.vue')
    },
    {
        path: '/detail',
        name: 'detail',
        component: () => import('../pages/detail.vue')
    },
    {
        path: '/userInfo',
        name: 'userInfo',
        //使用import可以路由懒加载，如果不使用，太多组件一起加载会造成白屏
        component: () => import('../pages/userInfo.vue'),
    },
    {
        path: '/search',
        name: 'search',
        component: () => import('../pages/search.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../pages/login.vue')
    }

    //{
    //配置404页面
    //path: '/:catchAll(.*)',
    //name: '404',
    //component: () => import(''),
    //}
]

// 路由
const router = createRouter({
    history: createWebHistory(),
    routes
})

const whiteList = ['/', '/login']
router.beforeEach((to, from, next) => {
    // console.log(whiteList.includes(to.path) );

    if (whiteList.includes(to.path) || localStorage.getItem('token')) {
        if (to.matched.some(record => record.meta.keepAlive)) {
            // 如果当前路由包含meta.keepAlive，则需要缓存
            to.meta.isKeepAlive = true
        } else {
            // 否则不需要缓存
            to.meta.isKeepAlive = false
        }
        next()
    } else {
        ElMessage({
            showClose: true,
            message: '您还未登录,登录后才能使用哦',
            type: 'error',
        })
        // console.log('???');

        next('/login')
        // router.push('/login')
    }
})
// 导出
export default router 