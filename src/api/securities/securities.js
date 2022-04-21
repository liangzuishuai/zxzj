import axios from 'axios'
import store from '@/store'
import request from '@/utils/request'
// 约券部分
// 约券
// 100 专项头寸股份信息查询
// 101 券单查询
// 102 券单明细
// 103 汇总
// 104 （篮子）借入委托
// 105 （篮子）借入展期委托
// 106 （篮子）归还委托
// 107 （篮子）借入撤单委托
// 108 （篮子）借入委托明细查询
// 109 （篮子）借入委托查询
// 110 （篮子）借入合约查询
// 111 方案cats查询
// 112 方案确认
// 113 可出借篮子查询
// 114 篮子明细查询
// 115 定价
// 116 自动展期参数
export function securitiesRequest(data, code) {
    return request({
        url: 'v2/service/account/prime/bond/service',
        method: 'post',
        data: { 
            ...data, 
            code: code 
        }
    })
}

//测试获取token
export function postToken(openid) {
    
    return new Promise((resolve, reject) => {
        //展期使用 8009215348
        // 8009237165
        // 8009249736
        axios.post(process.env.VUE_APP_BASE_API + '/v1/service/account/employee/miniApps/generateToken?openId='+openid)
            .then(res => {
                var fundAccountList = "8009252935;8009215348;8009249736"
                store.dispatch("set_userToken", res.data.data); // 设置用户token
                store.dispatch("set_FundAccount", openid); // 设置用户token
                store.dispatch("set_fundNames", fundAccountList); // 设置用户fundAccountList
                resolve(res.data);
            })
            .catch(err =>{
                reject(err)
            })
    });
}