<template>
    <div class="home">
        <Header :curIndex="-1" :isLogin="true" msg="Welcome to Your Vue.js App" />
        <div class="home_content">
            <div class="home_login_div">
                <div class="home_title">
                    <div
                        @click="tabChange(0)"
                        :class="[curIndex == 0 ? 'home_titlecur' : '']"
                    >
                        密码登录
                        <span></span>
                    </div>
                    <div
                        @click="tabChange(1)"
                        :class="[curIndex == 1 ? 'home_titlecur' : '']"
                    >
                        短信登录
                        <span></span>
                    </div>
                </div>
                <!-- 密码登录 -->
                <div class="home_show" v-show="curIndex == 0">
                    <el-input
                        class="home_number"
                        placeholder="请输入账号/手机号"
                        maxlength=""
                        @input="inputChange"
                        v-model="userMsg.number"
                        @keyup.enter.native="handleNameChang"
                    >
                        <i slot="prefix" class="home_i">
                            <img
                                class="home_icon"
                                src="@/assets/numbericon.png"
                                alt
                            />
                        </i>
                    </el-input>
                    <el-input
                        ref="passInput"
                        class="home_number home_passd"
                        placeholder="请输入密码"
                        auto-complete="new-password"
                        show-password
                        maxlength="20"
                        @keyup.enter.native="handlePassChang"
                        @input="inputChange"
                        v-model="userMsg.password"
                    >
                        <i slot="prefix" class="home_i">
                            <img
                                class="home_icon"
                                src="@/assets/passdicon.png"
                                alt
                            />
                        </i>
                    </el-input>
                    <!-- 图形验证 -->
                    <div id="captcha"></div>
                </div>
                <!-- 短信登录 -->
                <div class="home_show" v-show="curIndex == 1">
                    <el-input
                        class="home_number"
                        placeholder="请输入手机号"
                        maxlength="11"
                        type="text"
                        @input="inputChange"
                        @keyup.enter.native="handleNameChang"
                        autocomplete="off"
                        v-model="userMsg.number"
                    >
                        <i slot="prefix" class="home_i">
                            <img
                                class="home_icon"
                                src="@/assets/numbericon.png"
                                alt
                            />
                        </i>
                    </el-input>
                    <div class="verification">
                        <el-input
                            ref="vcodeInput"
                            class="home_number home_passd"
                            placeholder="请输入验证码"
                            autocomplete="off"
                            @input="inputChange"
                            @keyup.enter.native="handlePassChang"
                            v-model="userMsg.vcode"
                            maxlength="6"
                        >
                            <i slot="prefix" class="home_i">
                                <img
                                    class="home_icon"
                                    src="@/assets/ingyzm.png"
                                    alt
                                />
                            </i>
                        </el-input>
                        <span
                            v-if="!timesOff"
                            class="span"
                            @click="getVerification"
                            >获取短信验证码</span
                        >
                        <span v-else class="span">{{ times }}s</span>
                    </div>
                    <!-- 图形验证 -->
                    <div id="captcha"></div>
                </div>
                <div v-loading="loading"
                    :class="[isare ? 'curbtn' : '', 'home_login_btn']"
                    @click="login()"
                >
                    登录
                </div>
                <!-- <p class="home_registered">注册账号</p> -->
                <router-link class="home_registered" to="/registered"
                    >注册账号</router-link
                >
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import { checkStr } from "@/utils/index.js";
import { userSendCode, userCodeLogin, getAccountInfo, passLogin } from "@/api/login/login";
let Base64 = require('js-base64').Base64;

export default {
    name: "login",
    data() {
        return {
            curIndex: 0, // 当前tab
            loading:false,
            userMsg: {
                number: "", // 13717701816
                password: "",
                vcode: "",
            },
            isare: false, // 是否账号 密码 验证码 都已输入
            timesOff: false, // 倒计时展示
            times: 59, // 验证码倒计时
            timer: null, // 计时器
            isSendCode:false, // 是否已发送验证码
            uploadUrl: process.env.VUE_APP_BASE_API, // 当前api地址
            NECaptchaValidate: "", // 图形验证
        };
    },
    components: {
        Header,
    },
    created() {
    },
    methods: {
        // tabs 切换
        tabChange(index) {
            this.curIndex = index;
            // 清空密码验证码
            this.userMsg.password = "";
            this.userMsg.vcode = "";
            this.userMsg.number = "";
            this.isare = false;
        },
        // 账号回车事件
        handleNameChang(){
            if(this.curIndex == 0){
                // 密码输入框获取焦点
                this.$refs.passInput.focus();
            }else{
                // 密码输入框获取焦点
                this.$refs.vcodeInput.focus();
            }
        },
        // 密码回车事件
        handlePassChang(){
            // 调登录
            this.login();
        },
        // 发送验证码
        userSendCode() {
            userSendCode({
                // sysNo:'CSE038',
                mobile: this.userMsg.number,
                NECaptchaValidate: this.NECaptchaValidate,
            }).then((res) => {
                this.isSendCode = true;
                // 发送成功倒计时
                this.getSms();
            }).catch(err=>{
                this.$message({
                    message:err.errorMsg || err.errorMessage,
                    type: 'error'
                })
            })
        },
        // 验证码登录
        userCodeLogin() {
            this.loading = true;
            userCodeLogin({
                mobile: this.userMsg.number,
                validCode: this.userMsg.vcode,
            }).then((res) => {
                this.loginSuccess(res);
            }).catch(err=>{
                this.loading = false;
                this.$message({
                    message:err.errorMsg || err.errorMessage,
                    type: 'error'
                })
            })
        },
        // 登录成功
        loginSuccess(res){
            this.$message({
                message: "登录成功",
                type: "success",
                duration:2000,
            });
            this.$store.dispatch("set_userToken", res.token); // 设置用户token
            if(res.fundAccount){
                let fundAccountList = res.fundAccount.split(";")
                this.$store.dispatch("set_fundNames", res.fundNames); // 设置用户fundAccountList
                this.$store.dispatch("set_account", fundAccountList[0]); // 设置用户权限
            }
            // let privilege = parseInt(res.privilege,2) //转化为10进制
            let privilege = res.privilege
            if((privilege&2)==2){ //位于运算 001 = 1 出借 010 = 2 约券 011=3 出借+约券 100 = 4 策略 101=5策略+出借
                this.$store.dispatch("showcoupon",1);
            }else{
                this.$store.dispatch("showcoupon",0);
            }
            
            setTimeout(() => {
                let redirect = decodeURIComponent(
                    this.$route.query.redirect || "/index"
                );
                this.$router.push({
                    path: redirect,
                });
                this.getAccountInfo(res.token); // 获取用户信息
            }, 1000);
        },
        // 用户账号密码登录
        passLogin(){
            // PBB0000000027
            this.loading = true;
            let data = {
                captchaId: "e5179e080c06499d8f1f9373930b42cc",
                neCaptchaValidate:this.NECaptchaValidate,
                password: Base64.encode(this.userMsg.password),
            }
            if(!this.userMsg.pbAccount){
                data.mobile = this.userMsg.number;
            }else{
                data.pbAccount = this.userMsg.pbAccount;
            }
            passLogin({
                ...data
            }).then(res=>{
                this.loading = false;
                this.loginSuccess(res);
            }).catch(err=>{
                this.loading = false;
                this.$message({
                    message:err.errorMsg || err.errorMessage,
                    type: 'error'
                })
            })
        },
        // 获取用户个人账号信息
        getAccountInfo(token){
            getAccountInfo({token,queryType:'1'}).then(res=>{
                // 设置vuex
                this.$store.dispatch('set_userInfo', JSON.stringify(res));
            })
        },
        // 登录
        login() {
            //  短信验证码登录
            if (this.curIndex == 1) {
                // 短信验证码登录
                if ( this.userMsg.number.trim() && this.userMsg.vcode.trim() ) {
                    if (!checkStr(this.userMsg.number, "mobile")) {
                        this.$message({
                            message: "请填写正确的手机号",
                            type: "warning",
                        });
                        return;
                    } else {
                        if(!this.isSendCode){
                            this.$message({
                                message:"请发送验证码",
                                type: "warning",
                            });
                            return;
                        }
                        // 验证码登录
                        this.userCodeLogin();
                    }
                } else {
                    let message;
                    if (!this.userMsg.number.trim()) {
                        message = "请输入手机号";
                    }else{
                        message = "请输入验证码";
                    }
                    this.$message({
                        message,
                        type: "warning",
                    });
                }
            }
            // 账号密码登录
            else {
                // 账号验证码验证
                if (this.userMsg.number.trim() && this.userMsg.password.trim()) {
                    if (!checkStr(this.userMsg.number, "mobile")) {
                        // this.$message({
                        //     message: "请填写正确的手机号",
                        //     type: "warning",
                        // });
                        this.userMsg.pbAccount = this.userMsg.number;
                       
                        // 验证码
                        initNECaptcha(
                            {
                                captchaId: "e5179e080c06499d8f1f9373930b42cc",
                                element: "#captcha",
                                mode: "popup",
                                width:'400px',
                                onVerify: (err, data) => {
                                    this.NECaptchaValidate = data.validate;
                                    // 账号密码登录
                                    this.passLogin();
                                },
                            },
                            (instance) => {
                                // 初始化成功后得到验证实例instance，可以调用实例的方法
                                instance.popUp();
                            },
                            (err) => {
                                console.log(err);
                                // 初始化失败后触发该函数，err对象描述当前错误信息
                            }
                        );
                    }else{
                        this.userMsg.pbAccount = '';
                        // 验证码
                        initNECaptcha(
                            {
                                captchaId: "e5179e080c06499d8f1f9373930b42cc",
                                element: "#captcha",
                                mode: "popup",
                                width:'400px',
                                onVerify: (err, data) => {
                                    this.NECaptchaValidate = data.validate;
                                    // 账号密码登录
                                    this.passLogin();
                                },
                            },
                            (instance) => {
                                // 初始化成功后得到验证实例instance，可以调用实例的方法
                                instance.popUp();
                            },
                            (err) => {
                                console.log(err);
                                // 初始化失败后触发该函数，err对象描述当前错误信息
                            }
                        );
                        // 账号密码登录
                        // this.passLogin();
                    }
                } else {
                    let message;
                    if (!this.userMsg.number.trim()) {
                        message = "请输入手机号";
                    }else{
                        message = "请输入密码";
                    }
                    this.$message({
                        message,
                        type: "warning",
                    });
                }
            }
        },
        // input改变
        inputChange() {
            // 修改 登录状态
            if (
                this.userMsg.number.trim().length > 0 &&
                (this.userMsg.password.trim().length > 0 ||
                    this.userMsg.vcode.trim().length > 0)
            ) {
                this.isare = true;
            } else {
                this.isare = false;
            }
        },
        // 发送验证码判断
        getVerification() {
            if (!this.userMsg.number) {
                this.$message({
                    message: "请输入手机号",
                    type: "warning",
                });
            } else {
                if (!checkStr(this.userMsg.number, "mobile")) {
                    this.$message({
                        message: "请填写正确的手机号",
                        type: "warning",
                    });
                    return;
                }
                // 发送验证码
                initNECaptcha(
                    {
                        captchaId: "e5179e080c06499d8f1f9373930b42cc",
                        element: "#captcha",
                        mode: "popup",
                        width:'400px',
                        onVerify: (err, data) => {
                            this.NECaptchaValidate = data.validate;
                            this.userSendCode();
                        },
                    },
                    (instance) => {
                        // 初始化成功后得到验证实例instance，可以调用实例的方法
                        instance.popUp();
                    },
                    (err) => {
                        console.log(err);
                        // 初始化失败后触发该函数，err对象描述当前错误信息
                    }
                );
            }
        },
        // 发送验证码
        getSms() {
            // 开启倒计时
            this.timesOff = true;
            this.timer = setInterval(() => {
                this.times = this.times - 1;
                if (this.times == 0) {
                    this.timesOff = false;
                    clearInterval(this.timer);
                    this.times = 59;
                }
            }, 1000);
            this.$message({
                message: "发送成功",
                type: "success",
                duration:2000,
            });
        },
    },
    mounted() {
        // console.log(process.env.VUE_APP_BASE_API);
    },
};
</script>

<style lang="scss" scoped>
.verification {
    position: relative;
    display: flex;
    justify-content: flex-start;

    & .span {
        top: 30.5px;
        right: 15px;
        position: absolute;
        font-size: 14px;
        color: #c5181f;
        cursor: pointer;
    }
}
.home {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #ffffff;

    .home_content {
        width: 100%;
        height: 100%;
        background-image: url("~@/assets/bjimg2.png");
        background-repeat: no-repeat;
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;

        .home_login_div {
            width: 490px;
            height: 414px;
            background: #ffffff;
            border-radius: 5px;
            opacity: 0.9;
            padding: 30px 0 0 0;
            display: flex;
            flex-direction: column;
            align-items: center;

            .home_title {
                font-size: 24px;
                font-family: SourceHanSansCN-Medium, SourceHanSansCN;
                font-weight: 600;
                color: #666666;
                display: flex;
                justify-content: center;
                border-bottom: 1px solid #c0c6cf;
                padding: 20px 0;
                margin: 0 60px;

                .home_titlecur {
                    color: #c5181f;

                    & span {
                        border-top: 2px solid #c5181f;
                    }
                }

                & div {
                    position: relative;
                    margin: 0 35px;
                    cursor: pointer;
                    & span {
                        position: absolute;
                        bottom: -20.5px;
                        left: 26px;
                        width: 40px;
                    }
                }
            }

            .home_number {
                width: 370px;
                height: 44px;
                border-radius: 5px;
                margin-top: 49px;

                .el-input__inner:focus {
                    border-color: #cfcfcf !important;
                }
            }

            .home_passd {
                margin-top: 20px;
            }

            .home_show {
                position: relative;
                display: flex;
                flex-direction: column;
                justify-content: center;
                transition: all 0.3s ease;
            }

            .home_login_btn {
                margin-top: 49px;
                width: 368px;
                height: 48px;
                background: rgba(197, 24, 31, 0.3);
                border-radius: 24px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #ffffff;
                font-size: 18px;
                cursor: pointer;
            }

            .curbtn {
                background: #c5181f;
            }

            .home_registered {
                margin-top: 30px;
                font-size: 14px;
                font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                font-weight: 400;
                color: #c5181f;
                cursor: pointer;
            }
        }
    }
}

.home_icon {
    width: 18px;
    height: 18px;
    margin-top: 11px;
    margin-left: 11px;
}

#captcha{
    margin-top: 20px;
    position: absolute;
    bottom: 0;
    right: 0;
}
</style>
<style lang="scss">
.el-input--prefix .el-input__inner {
    padding-left: 45px !important;
}

#app {
    height: 100%;
}
html,
body {
    height: 100%;
}
.home_show {
    & input::-webkit-input-placeholder {
        color: #999999;
        font-size: 14px;
    }
    & input:-moz-placeholder {
        color: #999999;
        font-size: 14px;
    }
    & input:-ms-input-placeholder {
        color: #999999;
        font-size: 14px;
    }
}
</style>
