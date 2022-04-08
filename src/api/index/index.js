import request from '@/utils/request'

// 出借行情查询
export function queryService128(data) {
    return request({
        url: '/v2/service/account/prime/bond/service',
        method: 'post',
        data: { ...data, code: 128 }
    })
}

// 接入行情查询
export function queryService129(data) {
    return request({
        url: '/v2/service/account/prime/bond/service',
        method: 'post',
        data: { ...data, code: 129 }
    })
}

// 出借意向查询
export function queryService120(data) {
    return request({
        url: '/v2/service/account/prime/bond/service',
        method: 'post',
        data: { ...data, code: 120 }
    })
}

// 查询股东账号信息
export function queryService118(data) {
    return request({
        url: '/v2/service/account/prime/bond/service',
        method: 'post',
        data: { ...data, code: 118 }
    })
}

// 提交出借意向申请
export function queryService119(data) {
    return request({
        url: '/v2/service/account/prime/bond/service',
        method: 'post',
        data: { ...data, code: 119 }
    })
}

// 出借邀约 待处理数据查询
export function queryService121(data) {
    return request({
        url: '/v2/service/account/prime/bond/service',
        method: 'post',
        data: { ...data, code: 121 }
    })
}

// 出借邀约列表
export function queryService122(data) {
    return request({
        url: '/v2/service/account/prime/bond/service',
        method: 'post',
        data: { ...data, code: 122 }
    })
}

// 出借邀约通知模板列表
export function queryService124(data) {
    return request({
        url: '/v2/service/account/prime/bond/service',
        method: 'post',
        data: { ...data, code: 124 }
    })
}

// 出借邀约通知模板更新
export function queryService125(data) {
    return request({
        url: '/v2/service/account/prime/bond/service',
        method: 'post',
        data: { ...data, code: 125 }
    })
}

// 出借邀约状态设置
export function queryService123(data) {
    return request({
        url: '/v2/service/account/prime/bond/service',
        method: 'post',
        data: { ...data, code: 123 }
    })
}

// 通知方式查询
export function queryService126(data) {
    return request({
        url: '/v2/service/account/prime/bond/service',
        method: 'post',
        data: { ...data, code: 126 }
    })
}

// 出借意向 证券名称查询
export function createStock(data) {
    return request({
        url: '/v1/Xin/createStock?_=1645768604',
        // http://kong.citics.com/api/v1/Xin/createStock
        method: 'get',
        data: { ...data, code: 129 }
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

// 首页不需要token 128 129 118
// v2/service/account/prime/bond/noLogin/service
// 出借行情查询
export function queryService128no(data) {
    return request({
        url: '/v2/service/account/prime/bond/noLogin/service',
        method: 'post',
        data: { ...data, code: 128 }
    })
}

// 接入行情查询
export function queryService129no(data) {
    return request({
        url: '/v2/service/account/prime/bond/noLogin/service',
        method: 'post',
        data: { ...data, code: 129 }
    })
}

// 查询股东账号信息
export function queryService118no(data) {
    return request({
        url: '/v2/service/account/prime/bond/service',
        method: 'post',
        data: { ...data, code: 118 }
    })
}