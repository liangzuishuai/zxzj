import $axios from 'axios'
import request from '@/utils/request'

// 用户验证码登录
export function userCodeLogin(data) {
    return request({
        url: '/v1/account/securitiesFinance/login',
        method: 'post',
        data
    })
}

// 用户发送验证码
export function userSendCode(data) {
    return request({
        url: '/v2/account/mobile/sendCode',
        method: 'post',
        data
    })
}

// 用户注册
export function userRegister(data) {
    return request({
        url: '/v1/account/securitiesFinance/register',
        method: 'post',
        data
    })
}

// 用户密码登录
export function passLogin(data) {
    return request({
        url: '/v1/account/securitiesFinance/login/password',
        method: 'post',
        data
    })
}

// 用户设置密码
export function setPassword(data) {
    return request({
        url: '/v1/account/securitiesFinance/setPassword',
        method: 'post',
        data
    })
}

// 用户忘记密码
export function forgetPassword(data) {
    return request({
        url: '/v1/account/securitiesFinance/forgetPassword',
        method: 'post',
        data
    })
}

// 用户修改密码
export function modifyPassword(data) {
    return request({
        url: '/v1/account/securitiesFinance/modifyPassword',
        method: 'post',
        data
    })
}

// 获取用个人账号信息
export function getAccountInfo(data) {
    return request({
        url: '/v1/account/securitiesFinance/getAccountInfo',
        method: 'post',
        data
    })
}

// 修改用户个人账号信息   设置通知方式
export function updateAccountInfo(data) {
    return request({
        url: '/v1/account/securitiesFinance/updateAccountInfo',
        method: 'post',
        data
    })
}

// 获取省市
export function getCityList(data) {
    data.noNeedToken = true
    return request({
        url: '/v1/account/common/findCityInfo',
        method: 'post',
        data
    })
}

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


// console.log(window.location.href);
// console.log(window.location.href.includes('10.23.179.46'));
// console.log(window.location.href.includes('123.103.83.56'));

//上传文件
export function fileUpload(url,params) {
    const formData = new FormData();
    params.sysNo = 'CSE038';
    for(var key in params){
        formData.append(key,params[key])
    };
    return new Promise((resolve, reject) => {
        $axios({
            headers:{"Content-Type":"multipart/form-data"},
            method: 'post',
            url: baseURL + url,
            data: formData
        }).then(res=>{
            resolve(res);
        }).catch(err=>{
            reject(err)
        })
    });
}

