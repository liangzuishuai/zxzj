import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import Qs from 'qs';
// import { delete } from 'vue/types/umd';

// 创建axios实例
// .env.dev 开发环境
// .env.prod 线上环境
// .env.test 测试环境
// console.log('process.env.VUE_APP_BASE_API',process.env.VUE_APP_BASE_API);
// 获取当前地址判断设置请求地址
// let baseURL = 'http://10.23.179.46:8000/api';
// console.log(window.location.href);
// console.log(window.location.href.includes('10.23.179.46'));
// console.log(window.location.href.includes('123.103.83.56'));

console.log('request', process.env)
let baseURL
if(process.env.VUE_APP_BASE_API === 'production'){
    baseURL = 'https://kong.citics.com/api'
}else {
    // 内网
    if(window.location.href.includes('10.23.179.46')){
        baseURL = 'http://10.23.179.46:8000/api';
    }else{ // 外网
        baseURL = 'http://123.103.83.56:8000/api';
    }
}
const service = axios.create({
    baseURL: baseURL, // url = base url + request url  process.env.VUE_APP_BASE_API
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000, // request timeout
    headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
    transformRequest: [function (data) {
        
        // 对 data 进行任意转换处理
        let newData = {
            sysNo: 'CSE038',
            ...data
        };

        if(!newData.noNeedToken){
            newData.token = store.state.token
        }else {
            delete newData.noNeedToken
        }
        data = newData;
        return Qs.stringify(data);
    }], // 设置固定参数
})

// 请求前拦截处理
service.interceptors.request.use(
    config => {
        //  在请求被发送之前做些什么
        if (store.state.token) {
            // 让每个请求携带令牌
            // ['X-Token']是一个自定义头键
            // 请根据实际情况修改
            // config.headers['X-Token'] = store.state.token;
        }
        return config
    },
    error => {
        // 处理请求错误
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

//  响应拦截器处理
service.interceptors.response.use(
    /**
     * 如果你想要获取http信息，例如头信息或状态信息
     * Please return  response => response
    */

    /**
     * 通过自定义代码确定请求状态
     * 这里只是一个例子
     * 您也可以通过HTTP状态码来判断状态
     */
    // 请求响应成功
    response => {
        const res = response.data;
        if(res.mobile){
            // 返回数据
            return res
        }
        // 如果自定义代码不是20000，则判断为错误。
        if ((res.errorCode || res.code) != 0) {
            // 40002 100096 token失效   
            if ((res.errorCode || res.code) == 40002 || (res.errorCode || res.code) == 100096 || (res.errorCode || res.code) == 90003) {
                Message({
                    message: '登录已过期请重新登录',
                    type: 'error'
                })
                // 重新登陆
                // 删除 token 刷新页面 路由会判断没有 token 而跳转到登录页
                store.dispatch('set_userInfo','');
                store.dispatch('set_account','');
                store.dispatch('set_fundNames','');
                store.dispatch('showcoupon','');
                store.dispatch('set_userToken', '').then(() => {
                    window.location.reload();
                    this.$route.path('/login')
                })
                return Promise.reject(new Error(res.errorMessage || res.errorMsg || 'Error')); // 过期错误
            }
            return Promise.reject(res); // 非过期错误
        } else {
            // 返回数据
            return res
        }
    },
    // 请求响应失败
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

// 抛出请求
export default service
