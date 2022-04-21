<template>
    <div class="header_box">
        <div class="header">
            <div class="header_logo">
                <img @click="gotoHomePage" src="~@/assets/logo.png" alt />
                <span></span>
                <p>证金机构综合服务平台</p>
            </div>
            <div class="header_nav">
                <ul>
                    <template v-for="(item, index) in navData">
                        <li
                            v-if="item.isShow"
                            :key="index + 'a'"
                            @click="pageNavigation(index)"
                            :class="[curIndex == index ? 'curnav' : '']"
                        >
                            {{ item.title }}
                        </li>
                    </template>
                </ul>
                <!-- 未登录 -->
                <router-link v-if="!token" to="/login" :class="[isLogin ? 'header_login_cur' : '' ,'header_login']"
                    >登录</router-link
                >
                <!-- 已登录  -->
                <div v-else class="header_user j_c_a_i">
                    <img src="../assets/icon_head.png" alt="" />
                    <p>{{ userMobile }}</p>
                    <span class="line"></span>
                    <div class="header_login outstyle" @click="outLogin">
                        <img class="outimg" src="../assets/outlogin.png" alt="">
                        退出
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    name: "header_comp",
    props: {
        // 当前导航下标
        curIndex: {
            type: Number,
            default: 0,
        },
        isLogin:{
            type:Boolean,
            default:false
        }
    },
    data() {
        return {
            // nav 数据
            navData: [],
        };
    },
    computed: {
        ...mapState({
            userInfo: "userInfo",
            token: "token",
            fundAccount:'fundAccount',
            showcoupon:"showcoupon"
        }),
        // 用户手机号
        userMobile() {
            return this.userInfo && JSON.parse(this.userInfo).mobile;
        },
    },
    created() {
        // var isshow = false
        // if(this.token&&this.fundAccount){
        //     if(this.showcoupon==1){
        //         isshow = true
        //     }
        // }
        this.navData = [
                {
                    title: "首页",
                    path: "/index",
                    isShow:true,
                },
                {
                    title: "出借业务",
                    path: "/business",
                    isShow: this.token ? true : false,
                },
                {
                    title: "融券业务",
                    path: "/securities",
                    isShow: this.token && this.fundAccount ? this.showcoupon == 1 ? true : false : false, // 登录并有权限展示
                },
                {
                    title: "个人中心",
                    path: "/information",
                    isShow: this.token ? true : false,
                },
            ];
    },
    // watch:{
    //     'showcoupon'(val){
    //         console.log(val)
    //         var isshow = false
    //         if(this.token&&this.fundAccount){
    //             if(this.val==1){
    //                 isshow = true
    //             }
    //         }
    //         this.navData = [
    //                 {
    //                     title: "首页",
    //                     path: "/index",
    //                     isShow:true,
    //                 },
    //                 {
    //                     title: "出借业务",
    //                     path: "/business",
    //                     isShow: this.token ? true : false,
    //                 },
    //                 {
    //                     title: "融券业务",
    //                     path: "/securities",
    //                     isShow: isshow, // 登录并有权限展示
    //                 },
    //                 {
    //                     title: "个人中心",
    //                     path: "/information",
    //                     isShow: this.token ? true : false,
    //                 },
    //             ];
    //     }
    // },
    methods: {
        // 路由跳转
        pageNavigation(index) {
            const path = this.navData[index].path;
            this.$router.push(`${path}`);
        },
        // 首页
        gotoHomePage() {
            if (this.$store.state.token) {
                // 已登录转首页
                this.$router.push("/index");
            } else {
                // 未登录转登录
                this.$router.push("/login");
            }
        },
        // 退出登录
        outLogin() {
            this.$confirm("是否退出登录?", "退出登录", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                // 清理用户信息和token并跳转到登录页
                this.$store.dispatch("set_userToken", ""); // 清理token
                this.$store.dispatch("set_userInfo", ""); // 清理用户信息
                this.$store.dispatch("set_fundNames", ""); // 资金账号列表
                this.$store.dispatch("set_account", ""); // 资金账号列表
                this.$store.dispatch("showcoupon", ""); // 融券权限
                this.$store.dispatch('set_codeData', ""); // 股票代码 
                // this.$message({
                //     type: "success",
                //     message: "退出成功",
                // });
                this.$router.push("/login");
            }).catch(() => {});
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header_box {
    width: 100%;
    background: #ffffff;
}
.line{
    width: 2px;
    height: 14px;
    background: #E5E5E5;
    display: block;
    margin-left: 20px;
}
.outstyle{
    margin-left: 0 !important;
}
.header {
    max-width: 1440px;
    min-width: 1280px;
    padding: 0 20px;
    box-sizing: border-box;
    height: 80px;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;

    .header_logo {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        & img {
            width: 141px;
            height: 40px;
            cursor: pointer;
        }
        & span {
            width: 1px;
            height: 24px;
            background: #dddddd;
            margin: 0 14px;
        }
        & p {
            font-size: 18px;
            font-family: SourceHanSansCN-Medium, SourceHanSansCN;
            font-weight: 600;
            color: #1c1d1c;
        }
    }

    .header_nav {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        & ul {
            display: flex;
            height: 100%;
            justify-content: flex-start;
            align-items: center;

            li {
                padding: 0 20px;
                height: 100%;
                font-size: 16px;
                font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                font-weight: 400;
                color: #666666;
                cursor: pointer;
                display: flex;
                align-items: center;
                margin-left: 10px;
            }

            .curnav {
                background: #c5181f;
                color: #ffffff;
            }
        }

        & .header_login {
            padding: 0 20px;
            height: 100%;
            color: #666666;
            border-radius: 2px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;
            font-family: SourceHanSansCN-Medium, SourceHanSansCN;
            font-weight: 600;
            margin-left: 20px;
            cursor: pointer;

            & .outimg{
                width: 14px;
                height: 14px;
                margin-right: 10px;
            }
        }
        .header_login_cur{
            color: #ffffff;
            background: #c5181f;
        }
        .header_user {
            cursor: pointer;
            margin-left: 30px;
            & img {
                width: 30px;
                height: 30px;
            }
            & p {
                color: #666666;
                margin-left: 10px;
                font-size: 16px;
            }
        }
    }
}
</style>
