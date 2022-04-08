<template>
	<div class="registered">
		<Header :curIndex="-1" msg="Welcome to Your Vue.js App" />
		<div class="home_content">
			<div class="home_login_div">
				<div class="home_title"><div class="home_titlecur">注册账号</div></div>
				<!-- 密码登录 -->
				<div class="home_show">
					<el-input class="home_number" placeholder="请输入手机号" maxlength="11" @input="inputChange()" v-model="userMsg.number">
						<i slot="prefix" class="home_i"><img class="home_icon" src="@/assets/numbericon.png" alt /></i>
					</el-input>
					<div class="re_address j_c_a_i">
						<img class="home_icon" src="@/assets/icon_11.png" alt />
                        <el-cascader :props="props" clearable class="home_number home_passd" placeholder="请选择常驻区域" v-model="userMsg.address" @change="inputChange"></el-cascader>
					</div>
					<el-input class="home_number home_passd" placeholder="请输入中信对接人的6位工号（选填）" maxlength="6" v-model="userMsg.worknumber">
						<i slot="prefix" class="home_i"><img class="home_icon" src="@/assets/icon_10.png" alt /></i>
					</el-input>
					<div class="verification">
						<el-input class="home_number home_passd" @keyup.enter.native="handlePassChang" placeholder="请输入验证码" @input="inputChange()" maxlength="6" v-model="userMsg.vcode">
							<i slot="prefix" class="home_i"><img class="home_icon" src="@/assets/ingyzm.png" alt /></i>
						</el-input>
						<span v-if="!timesOff" class="span" @click="getVerification">获取短信验证码</span>
						<span v-else class="span">{{ times }}s</span>
					</div>
				</div>
				<div :class="[isare ? 'curbtn' : '', 'home_login_btn']" @click="login()">注册</div>
			</div>
			<!-- 图形验证 -->
			<div id="captcha"></div>
		</div>
	</div>
</template>

<script>

import Header from '@/components/Header.vue';
import { checkStr } from '@/utils/index.js';
import { userRegister, userSendCode, getCityList } from '@/api/login/login';

export default {
	name: 'registered',
	data() {
		return {
			userMsg: {
				number: '', // 手机号
				address: [], // 区域地址
				worknumber: '', // 工号
				vcode: '' // 验证码
			},
			isare: false, // 是否账号 地区 验证码 都已输入
			timesOff: false, // 倒计时展示
			times: 60, // 验证码倒计时
			timer: null, // 计时器
            isSendCode:false, // 是否已发送验证码 
            props: {
                lazy: true,
                lazyLoad: this.lazyLoad
            }
		};
	},
	components: {
		Header,
	},
	methods: {
		// 验证码回车事件
        handlePassChang(){
            // 调登录
            this.login();
        },
		// 注册方法
		userRegister(){
			let data = {
				mobile: this.userMsg.number, // 手机号
				residentArea:this.userMsg.address.toString(), // 常驻区域
				citicsWorkId: this.userMsg.worknumber, // 中信对接人工号
				validCode: this.userMsg.vcode, // 短信验证码
			};
			// return
			userRegister({...data}).then(res=>{
				this.$message({
					message: '注册成功',
					type: 'success'
				});
				setTimeout(() => {
					this.$router.push({
						path: '/',
						query: {
							index:0
        				}
					});
				}, 1000);
			}).catch(err=>{
                this.$message({
                    message:err.errorMsg || err.errorMessage,
                    type: 'error'
                })
            })
		},
		// 注册并登录
		login() {
			// 账号区域验证码验证
			if (this.userMsg.address && this.userMsg.vcode.trim() && this.userMsg.number.trim()) {
				if(this.userMsg.worknumber && this.userMsg.worknumber.length != 6){
					this.$message({
						message: '工号必须是6位数',
						type: 'warning'
					});
					return;
				};
				if (!checkStr(this.userMsg.number, 'mobile')) {
					this.$message({
						message: '请填写正确的手机号',
						type: 'warning'
					});
					return;
				}else{
					if(!this.isSendCode){
						this.$message({
							message:"请先发送验证码",
							type: "warning",
						});
						return;
					}else{
						 // 注册
                        this.userRegister();
					}
				}
			} else {
				let message;
				if (!this.userMsg.number.trim()) {
					message = '请输入手机号';
				} else if (!this.userMsg.address) {
					message = '请选择区域';
				} else if(!this.isSendCode){
					message = '请先发送验证码';
				} else {
					message = '请输入验证码';
				}
				this.$message({
					message,
					type: 'warning'
				});
			}
		},
		// 发送验证码
        userSendCode() {
            userSendCode({
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
		// input改变
		inputChange(data) {
			// 区域选择
			if(data){
				this.userMsg.address = data;
			}
			// 修改 登录状态
			if (this.userMsg.number.trim().length > 0 && this.userMsg.address.length > 0 && this.userMsg.vcode.trim().length > 0) {
				this.isare = true;
			} else {
				this.isare = false;
			}
		},
		// 区域选择数据取出
		reClear() {
			this.userMsg.address = '';
		},
		// 发送验证码判断
		getVerification() {
			if (!this.userMsg.number) {
				this.$message({
					message: '请输入手机号',
					type: 'warning'
				});
			} else {
				if (!checkStr(this.userMsg.number, 'mobile')) {
					this.$message({
						message: '请填写正确的手机号',
						type: 'warning'
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
			this.timesOff = true;
			this.timer = setInterval(() => {
				this.times = this.times - 1;
				if (this.times == 0) {
					this.timesOff = false;
					clearInterval(this.timer);
					this.times = 60;
				}
			}, 1000);
			this.$message({
				message: '发送成功',
				type: 'success'
			});
		},
        lazyLoad(node, resolve) {
            setTimeout(() => {
                this.getCityList(node, resolve)
            }, 100)
        },
        getCityList(node, resolve){
            let params = {}
            if(node.level == 0){
                params.type = 1
            }
            if(node.level == 1){
                params.type = 2
                params.code = node.value
            }
            const { level } = node;
            getCityList(params).then((res) => {
                const nodes = res.entrys.map(item => ({
                    value: item.code, 
                    label: item.name,
                    leaf: level >= 1
                }));
                console.log("🚀 ~ file: registered.vue ~ line 254 ~ getCityList ~ nodes", nodes)
				if(!level){
					nodes.push({
						value: '999999', 
						label: '港澳台及海外',
						leaf: true
					})
				}
                resolve(nodes)
            }).catch(err=>{
				console.log(err);
                this.$message({
                    message:err.errorMsg || err.errorMessage,
                    type: 'error'
                })
            })
        }
	}
};
</script>
<style lang="scss">
body,
html {
	height: 100%;
	max-height: unset;
}
#app {
	height: 100%;
}
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
.registered {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	background: #ffffff;

	.home_content {
		width: 100%;
		height: 100%;
		background-image: url('~@/assets/bjimg2.png');
		background-repeat: no-repeat;
		background-size: cover;
		display: flex;
		justify-content: center;
		align-items: center;

		.home_login_div {
			width: 490px;
			height: 458px;
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
				padding: 20px 0 10px 0;
				margin: 0 60px;

				.home_titlecur {
					color: #c5181f;
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
				margin-top: 19px;
				color: #1c1d1c;
				font-size: 14px;

				.el-input__inner:focus {
					border-color: #cfcfcf !important;
				}
			}

			.home_passd {
				margin-top: 20px;
			}

			.home_show {
				display: flex;
				flex-direction: column;
				justify-content: center;
				transition: all 0.3s ease;

				.re_address {
					position: relative;
					display: flex;
					align-items: center;

					.home_icon {
						left: 3px;
						top: 22px;
						position: absolute;
						z-index: 9;
					}

					.re_title {
						position: absolute;
						left: 46px;
						top: 31px;
						font-size: 14px;
						color: #999999;
					}
				}
			}

			.home_login_btn {
				margin-top: 50px;
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
.el-input--prefix .el-input__inner {
	padding-left: 45px !important;
	color: #1c1d1c;
}
</style>
<style lang="scss">
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

.region-picker__search input {
	padding: 0 45px;
}
.region-picker__label {
	padding: 0 45px;
	color: #1c1d1c;
}
.el-cascader .el-input .el-input__inner{
    padding-left: 45px;
}
</style>