<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script>
import { getAccountInfo } from "@/api/login/login";

export default {
    name:'app',
    data() {
        return {
            
        }
    },
    created() {
        // 是否登录过期 更新数据/清理数据
        if(this.$store.state.token){
            // this.getAccountInfo(this.$store.state.token);
        }
    },
    methods: {
        // 获取用户信息
        getAccountInfo(token){
            getAccountInfo({token,queryType:'1'}).then(res=>{
                // console.log(res);
                this.$store.dispatch('set_userInfo',JSON.stringify(res));
            }).catch(err=>{
                this.$message({
                    message: '登录已过期，请重新登录',
                    type: 'error'
                })
                console.log(err);
                // 删除 token 刷新页面 路由会判断没有 token 而跳转到登录页
                this.$store.dispatch('set_userInfo','');
                this.$store.dispatch('set_userToken', '').then(() => {
                    location.reload();
                })
            })
        }
    },
}
</script>
<style lang="scss">
* {
    margin: 0;
    padding: 0;
}
html,
body {
    height: auto;
    min-height: 100%;
}
li,
a {
    text-decoration: none;
    list-style: none;
}

#app {
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    min-height: 100%;
    background-color: #ffffff;
    overflow-x: hidden;
    overflow-y: auto;
    font-size: 14px;
}
.business_box {
    width: 100%;
    background: #f8f9fc;
}

// 弹框遮罩
.index_intention {
    position: fixed;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 9;

    .intention_box {
        position: absolute;
        width: 1200px;
        height: 88%;
        background: #f8f9fc;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        padding-top: 0.1px;
        display: flex;
        flex-direction: column;

        .in_close {
            cursor: pointer;
            position: absolute;
            top: 0;
            right: 0;
            width: 30px;
            height: 30px;
            margin: 30px;
        }
    }
}

// tr动画组件
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}

// 公共弹性盒子布局

.f_d_a_i {
    // 竖向排列 && 内容左右居中
    display: flex;
    flex-direction: column;
    align-items: center;
}
.f_d_a_i_c {
    // 竖向排列 && 内容上下左右居中
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.f_d_a_i_s {
    // 竖向排列 && 内容从左到右
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.j_c_a_i {
    // 横向排列 内容 上下左右居中
    display: flex;
    justify-content: center;
    align-items: center;
}

.j_c_a_i_s {
    // 横向排列 内容 上下居中 从左到右
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.martop10 {
    margin-top: 10px;
}

.martop20 {
    margin-top: 18px;
}

.martop30 {
    margin-top: 28px;
}

.martop40 {
    margin-top: 38px;
}

.martop50 {
    margin-top: 48px;
}

.marbot10 {
    margin-bottom: 10px;
}

.marbot20 {
    margin-bottom: 18px;
}

.marbot30 {
    margin-bottom: 28px;
}

.marbot40 {
    margin-bottom: 38px;
}

.marbot50 {
    margin-bottom: 48px;
}

.curpo {
    cursor: pointer;
}

// 公共大标题
.infor_title{
    width: 100%;
    margin: 20px 0;

    .infor_line{
        width: 60px;
        height: 2px;
    }

    .infor_my{
        font-size: 36px;
        color: #1c1d1c;
        margin: 0 20px;
        font-weight: bold;
    }
}

// 公共模块标题
.common_title{
    position: relative;
    width: 100%;
    justify-content: flex-start;
    color: #333333;
    font-size: 20px;
    font-weight: 600;

    &>span{
        width: 5px;
        height: 20px;
        background: #c5181f;
        border-radius: 3px;
        margin-right: 15px;
    }

    &>p{
        right: 0;
        position: absolute;
        font-size: 14px;
        color: #333333;
        font-weight: 400;

        & .span_2{
            font-size: 14px;
            color: #666666;
        }
        & img{
            width: 16px;
            height: 16px;
        }
    }
}

//搜索样式
.bus_search{
    margin: 20px 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    &>span{
        font-weight: 600;
        font-size: 14px;
        color: #333333;
        margin-right: 15px;
        display: flex;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .bus_input{
        width: 516px;
        height: 36px;
	    line-height: normal;
        background: #ffffff;
        border-radius: 4px;
        justify-content: flex-start;
    }

    .bus_btn{
        width: 80px;
        height: 36px;
        background: #c5181f;
        font-size: 14px;
        color: #ffffff;
        border-radius: 6px;
        margin-left: 30px;
        cursor: pointer;
    }

    .buswhite{
        background: #ffffff;
        border: 1px solid #cb3238;
        color: #c5181f;
        margin-left: 10px;
    }
}

// 切换tab样式
.invitation_left{
    width: 166px;
    height: 200px;
    background: #ffffff;
    margin-right: 20px;
    display: flex;
    flex-direction: column;

    & .left_item{
        width: 130px;
        padding: 0 18px;
        height: 50px;
        font-size: 14px;
        color: #666666;
        border-left: 4px solid #ffffff;
        font-weight: 600;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        cursor: pointer;
    }

    & .left_cur{
        background: rgba(197, 24, 31, 0.05);
        border-left: 4px solid #c5181f;
        color: #c5181f;
    }
}


.el-switch.is-checked .el-switch__core::after{
    margin-left: -27px !important;
    top: 2px !important;
}

.el-switch__core:after{
    width: 26px !important;
    height: 26px !important;
}

.el-switch__core{
    width: 58px !important;
    height: 32px !important;
    border-radius: 18px !important;
}

// 滚动条样式修改
.el-table ::-webkit-scrollbar {
    width: 4px;
    height: 6px;
    background-color: #fff;
  }
.el-table ::-webkit-scrollbar-thumb {
    background:#C5181F;
    border-radius: 3px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
}
.el-table__header .has-gutter th.is-leaf:nth-last-child(2) {
    border-right: none;
}
.el-table table{
    width: calc(100% - 4px)  !important;
}
.el-table__fixed-right,.el-table__fixed{
    height: calc(100% - 6px) !important;
}

.el-table .sort-caret.descending{
    border-top-color:rgba(255, 255, 255, .5) !important;
}
.el-table .sort-caret.ascending{
    border-bottom-color:rgba(255, 255, 255, .5) !important;
}
.el-table .ascending .sort-caret.ascending{
    // border-bottom-color:rgba(255, 255, 255, 1) !important;
    border-bottom-color:#ffffff !important;
}
.el-table .descending .sort-caret.descending{
    border-top-color:#ffffff !important;
}
</style>
