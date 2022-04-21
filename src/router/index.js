import Vue from 'vue'
import VueRouter from 'vue-router'
import $store from '../store'
import { MessageBox, Message } from 'element-ui'
import { getAccountInfo } from "@/api/login/login";

// 重写路由捕获方法
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter);

const routes = [
    {path: '/', redirect: '/index'},
    {
        path: '/login', // 登录页
        name: 'home',
        component: () => import('../views/login/login.vue'),
        meta: {
            requireAuth: false // 添加此字段 表示进入这个路由需要登录
        }
    },
    {
        path: '/information', // 个人中心
        name: 'information',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/information/information.vue'),
        meta: {
            requireAuth: true // 添加此字段 表示进入这个路由需要登录
        }
    },
    {
        path: '/registered', // 注册页面
        name: 'registered',
        component: () => import('../views/login/registered.vue'),
        meta: {
            requireAuth: false // 添加此字段 表示进入这个路由需要登录
        }
    },
    {
        path: '/index', // 首页
        name: 'index',
        component: () => import('../views/index/index.vue'),
        meta: {
            requireAuth: false // 添加此字段 表示进入这个路由需要登录
        }
    },
    {
        path: '/business', // 出借业务
        name: 'business',
        component: () => import('../views/business/business.vue'),
        meta: {
            requireAuth: true // 添加此字段 表示进入这个路由需要登录
        }
    },
    //------新增二期------融券业务
    {
        // path: '/securities', // 融券业务
        path: '/securities', // 融券业务
        redirect: '/securities/couponPool',
        name: 'layouts',
        component: () => import('../views/securities/layouts/layouts_qy.vue'),
        meta: {
            requireAuth: true // 添加此字段 表示进入这个路由需要登录
        },
        children: [
            //券池
            {
                path: '/securities/couponPool',
                name: 'couponPool',
                breadcrumbName: '券池',
                meta: { 
                    pname: 'couponPool',
                    requireAuth: true // 添加此字段 表示进入这个路由需要登录
                },
                component: () => import('../views/securities/couponPool.vue')
            },
            //委托
            //借入委托
            {
                path: '/securities/entrust/borrow',
                name: 'entrustBorrow',
                breadcrumbName: '借入委托',
                meta: { 
                    pname: 'entrustBorrow',
                    requireAuth: true // 添加此字段 表示进入这个路由需要登录
                 },
                component: () => import('../views/securities/entrust/borrow.vue')
            },
            //委托查询
            {
                path: '/securities/entrust/query',
                name: 'entrustQuery',
                breadcrumbName: '委托查询',
                meta: { 
                    pname: 'entrustBorrow',
                    requireAuth: true // 添加此字段 表示进入这个路由需要登录
                 },
                component: () => import('../views/securities/entrust/query.vue')
            },
            //委托导入
            {
                path: '/securities/entrust/import',
                name: 'entrustImport',
                breadcrumbName: '委托导入',
                meta: { 
                    pname: 'entrustBorrow',
                    requireAuth: true // 添加此字段 表示进入这个路由需要登录
                },
                component: () => import('../views/securities/entrust/import.vue')
            },
            //委托定制
            {
                path: '/securities/entrust/custom',
                name: 'entrustCustom',
                breadcrumbName: '委托定制',
                meta: { 
                    pname: 'entrustBorrow' ,
                    requireAuth: true // 添加此字段 表示进入这个路由需要登录
                },
                component: () => import('../views/securities/entrust/custom.vue')
            },
            //查询
            {
                path: '/securities/Inquiry',
                name: 'inquiry',
                breadcrumbName: '查询',
                meta: { 
                    pname: 'inquiry',
                    requireAuth: true // 添加此字段 表示进入这个路由需要登录
                 },
                component: () => import('../views/securities/Inquiry.vue')
            },
            //存续
            //未了结合约查询
            {
                path: '/securities/contract/unfinishedQuery',
                name: 'contract',
                breadcrumbName: '未了结合约查询',
                meta: { 
                    pname: 'contract',
                    requireAuth: true // 添加此字段 表示进入这个路由需要登录 
                },
                component: () => import('../views/securities/contract/unfinishedQuery.vue')
            },
            //展期/了结合约查询
            {
                path: '/securities/contract/finishedQuery',
                name: 'finishedQuery',
                breadcrumbName: '展期/了结合约查询',
                meta: { 
                    pname: 'contract',
                    requireAuth: true // 添加此字段 表示进入这个路由需要登录
                },
                component: () => import('../views/securities/contract/finishedQuery.vue')
            },
            {
                path: '/securities/contract/extension',
                name: 'extension',
                breadcrumbName: '展期',
                meta: { 
                    pname: 'contract',
                    requireAuth: true // 添加此字段 表示进入这个路由需要登录 
                },
                component: () => import('../views/securities/contract/extension.vue')
            },
            {
                path: '/securities/contract/return',
                name: 'return',
                breadcrumbName: '归还',
                meta: { 
                    pname: 'contract',
                    requireAuth: true // 添加此字段 表示进入这个路由需要登录
                },
                component: () => import('../views/securities/contract/return.vue')
            },
        ]
    },
];

const routerConfig = {
    mode: 'history',
    // base: '/pbtrade', // process.env.BASE_URL
    routes
}

console.log('VUE_APP_NODE_ENV_CONFIG', process.env)
if(process.env.VUE_APP_BASE_API === 'test'){
    // routerConfig.base = '/dist/'
    routerConfig.base = '/pbtrade/'
} 

console.log('routerConfig', routerConfig)
const router = new VueRouter(routerConfig)

// 拦截路由验证
// console.log($store.state.token);
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) { // 判断是否需要验证 
        if ($store.state.token) { // 是否已登陆
            next() // 正常跳转
        } else {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            }); // 需要验证 未登录 跳转到登录页  并且携带上 想要进入的路由 待登陆之后再跳转
            Message({
                message: '请先登录',
                type: 'error'
            })
        }
    } else {
        // 不需要验证直接下一步
        next()
    };

    /*如果已登陆不允许直接跳转到 登录页面*/
    let fullPath = to.fullPath.substring(0, 6);
    // console.log(fullPath);
    // console.log(from.fullPath);
    if (fullPath == "/login" || fullPath.includes('/login/?')) {
        if ($store.state.token) {
            // 做一个 个人信息请求 来判断 token是否过期 
            getAccountInfo({token:$store.state.token,queryType:'1'}).then(res=>{
                // 设置vuex
                $store.dispatch('set_userInfo', JSON.stringify(res));
                Message({
                    message: '您已登录',
                    type: 'success'
                })
                setTimeout(() => {
                    next({
                        path: '/index'
                    });
                }, 1000);
            })
        } else {
            next();
        }
    }
})

export default router
