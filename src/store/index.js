import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: '' || localStorage.getItem('token'), // token
        userInfo: '' || localStorage.getItem('userInfo'), // 用户信息
        codeData: '' || localStorage.getItem('codeData'), // 缓存证券代码数据
        fundAccount: ''|| localStorage.getItem('fundAccount'),
        fundAccountList: ''|| localStorage.getItem('fundAccountList')?localStorage.getItem('fundAccountList').split(";"):'',
        showcoupon:0||localStorage.getItem('showcoupon'),
        notLoggeData: '' || localStorage.getItem('notLoggeData'), // 未登录数据
    },
    mutations: {
        // 设置用户token
        SET_USER_TOKEN(state, token) {
            state.token = token;
        },
        // 设置用户信息
        SET_USER_INFO(state, userInfo) {
            state.userInfo = userInfo;
        },
        // 缓存证券代码数据
        SET_CODE_DATA(state, codeData) {
            state.codeData = codeData;
        },
        // 缓存用户权限
        SET_ACCOUNT(state, fundAccount) {
            state.fundAccount = fundAccount;
        },
        // 缓存资金账号列表
        SET_FUNDACCOUNTLIST(state, codeData) {
            state.fundAccountList = codeData;
        },
        // 缓存是否显示
        SHOWCOUPON(state, showcoupon) {
            state.showcoupon = showcoupon;
        },
        // 未登录数据
        NOT_LOOGE_DATA(state, notLoggeData) {
            state.notLoggeData = notLoggeData;
        },
    },
    actions: {
        // 设置用户信息
        set_userToken({
            commit
        }, token) {
            localStorage.setItem('token', token);
            commit('SET_USER_TOKEN', token);
        },
        // 设置用户信息
        set_userInfo({
            commit
        }, userInfo) {
            localStorage.setItem('userInfo', userInfo);
            commit('SET_USER_INFO', userInfo)
        },
        // 缓存证券代码数据
        set_codeData({
            commit
        }, codeData) {
            localStorage.setItem('codeData', JSON.stringify(codeData));
            commit('SET_CODE_DATA', JSON.stringify(codeData));
        },
        //设置资金账号列表
        set_FundAccountList({
            commit
        }, fundAccountList) {
            localStorage.setItem('fundAccountList', fundAccountList);
            commit('SET_FUNDACCOUNTLIST', fundAccountList.split(";"));
        },
        // 设置登录用户的资金账号
        set_account({
            commit
        }, fundAccount) {
            localStorage.setItem('fundAccount', fundAccount);
            commit('SET_ACCOUNT', fundAccount);
        },
        //设置是否显示融券栏目
        showcoupon({
            commit
        }, showcoupon) {
            localStorage.setItem('showcoupon', showcoupon);
            commit('SHOWCOUPON', showcoupon);
        },
        //设置未登录数据
        notLoggeData({
            commit
        }, notLoggeData) {
            localStorage.setItem('notLoggeData', notLoggeData);
            commit('NOT_LOOGE_DATA', notLoggeData);
        },
    }
})
