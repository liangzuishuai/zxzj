<template>
	<div class="information f_d_a_i">
		<!-- 头部导航 -->
		<Header :curIndex="3" msg="Welcome to Your Vue.js App" />
            <div class="information_box f_d_a_i"><img src="@/assets/bj_img4.png" alt /></div>
            <div class="infor_message j_c_a_i" v-if="isComplete"><p class="infor_msg">您的信息不全，可以完善信息</p></div>
            <div class="infor_title j_c_a_i">
                <div class="infor_line j_c_a_i">
                    <span class="line"></span>
                    <span class="round"></span>
                </div>
                <div class="infor_my" v-if="curInvIndex == 0">我的信息</div>
                <div class="infor_my" v-else-if="curInvIndex == 1 && passwordFlag == 0">设置密码</div>
                <div class="infor_my" v-else-if="curInvIndex == 1">修改密码</div>
                <div class="infor_line j_c_a_i">
                    <span class="round"></span>
                    <span class="line line2"></span>
                </div>
            </div>
            <div class="invitation j_c_a_i">
                <div class="invitation_left">
                    <div v-for="(item, index) in invitationData" @click="invChange(index)" :key="index + 'a'" :class="[curInvIndex == index ? 'left_cur' : '', 'left_item']">
                        {{ item.title }}
                    </div>
                </div>
                <!-- 我的信息 -->
                <div class="infor_content j_c_a_i" v-if="curInvIndex == 0">
						<div class="infor_left"  @mouseenter="mouseSuspension(true)" @mouseleave="mouseSuspension(false)">
							<img v-if="!isUpdata" :src="showImg" alt />
							<img class="index_updata" v-else :src="fileShow ? fileShow : defaultImg" alt />
							<p>我的名片</p>
							<!-- 编辑遮罩 -->
							<transition name="fade">
								<el-upload action="#" ref="upload" :show-file-list="false" :http-request="httpRequest">
									<div class="infor_mask f_d_a_i_c" v-if="isShowMask">
										<img src="@/assets/icon_16.png" alt="">
										<p>上传名片</p>
									</div>
								</el-upload>
							</transition>
						</div>
                    <div class="infor_right f_d_a_i">
                        <p class="infor_list">
                            <span class="infor_h1">手机号</span>
                            <span v-if="!isUpdata">{{mobile}}</span>
                            <el-input class="infor_input" v-else v-model="mobile" disabled placeholder="请输入手机号"></el-input>
                        </p>
                        <p class="infor_list">
                            <span class="infor_h1">姓名</span>
                            <span v-if="!isUpdata">{{userMsg.name}}</span>
                            <el-input class="infor_input" v-else v-model="userMsg.name" placeholder="请输入姓名"></el-input>
                        </p>
                        <p class="infor_list">
                            <span class="infor_h1">邮箱</span>
                            <span v-if="!isUpdata">{{userMsg.email}}</span>
                            <el-input class="infor_input" v-else v-model="userMsg.email" placeholder="请输入邮箱"></el-input>
                        </p>
                        <p class="infor_list">
                            <span class="infor_h1">单位名称</span>
                            <span v-if="!isUpdata">{{userMsg.companyName}}</span>
                            <el-input class="infor_input" v-else v-model="userMsg.companyName" placeholder="请输入单位名称"></el-input>
                        </p>
                        <p class="infor_list">
                            <span class="infor_h1">单位职务</span>
                            <span v-if="!isUpdata">{{userMsg.position}}</span>
                            <el-input class="infor_input" v-else v-model="userMsg.position" placeholder="请输入单位职务"></el-input>
                        </p>
						<div class="infor_list">
                            <span class="infor_h1">常住区域</span>
                            <span v-if="!isUpdata">{{dealData(residentAreaData)}}</span>
                            <p v-if="isUpdata&&!showpicker" class="infor_input_p" @click="showpickerM">
                                {{dealData(residentAreaData)}}
                            </p>
                        	<el-cascader class="infor_input" style="width:450px" v-if="isUpdata&&showpicker" :props="props" clearable placeholder="请选择常驻区域" :value="residentArea" @change="inputChange"></el-cascader>
                        </div>
                        <p class="infor_list">
                            <span class="infor_h1">常驻办公地址</span>
                            <span v-if="!isUpdata">{{userMsg.workPlace}}</span>
                            <el-input class="infor_input" v-else v-model="userMsg.workPlace" placeholder="请输入常驻办公地址"></el-input>
                        </p>
						<p class="infor_list">
                            <span class="infor_h1">对接人工号</span>
                            <span v-if="!isUpdata">{{userMsg.citicsWorkId}}</span>
                            <el-input class="infor_input" v-else v-model="userMsg.citicsWorkId" maxlength="6" placeholder="请输入对接人工号"></el-input>
                        </p>
                        <div v-if="!isUpdata && !authFlag" class="infor_updata_btn j_c_a_i" @click="inforUpdata">编辑</div>
                        <div v-if="isUpdata" class="infor_submit_btn j_c_a_i" @click="inforSubmit">提交</div>
                    </div>
                </div>
                <!-- 密码设置修改 -->
                <div class="password_content" v-if="curInvIndex == 1">
                    <div class="pass_item">
                        <span>手机号</span>
                        <el-input class="pass_input" v-model="mobile" disabled maxlength="11" placeholder="请输入手机号">
                            <i slot="prefix"><img class="home_icon" src="@/assets/numbericon.png" alt /></i>
                        </el-input>
						<!-- 图形验证 -->
                    	<div id="captcha"></div>
                    </div>
                    <div :class="[error ? 'input_inner_cur' : '', 'pass_item']" v-if="passwordFlag == 0">
                        <span>密码</span>
                        <el-input
                            class="pass_input"
                            v-model="userPass.password"
                            minlength="8"
                            maxlength="20"
                            auto-complete="new-password"
                            show-password
                            @input="newPassChange()"
                            placeholder="请输入密码"
                        >
                            <i slot="prefix"><img class="home_icon" src="@/assets/passdicon.png" alt /></i>
                        </el-input>
                        <!-- 提示 -->
                        <p class="pass_prompt" v-if="error">密码长度为8-20位，必须含数字和字母，字母须区分大小写</p>
                    </div>
                    <div class="pass_item" v-if="!(passwordFlag == 0)">
                        <span>旧密码</span>
                        <el-input class="pass_input" ref="oldPass" v-model="userPass.oldPassword" minlength="8" maxlength="20" auto-complete="new-password" show-password placeholder="请输入密码">
                            <i slot="prefix">
                                <img class="home_icon" src="@/assets/passdicon.png" alt /></i>
                        </el-input>
                        <!-- 提示 -->
                        <!-- <p class="pass_prompt">密码长度为8-20位，必须含数字和字母，字母须区分大小写</p> -->
                    </div>
                    <div :class="[error ? 'input_inner_cur' : '', 'pass_item']" v-if="!(passwordFlag == 0)">
						<!-- v-if="!(passwordFlag == 0)" -->
                        <span>新密码</span>
                        <el-input
                            class="pass_input"
                            v-model="userPass.password"
                            minlength="8"
                            maxlength="20"
                            auto-complete="new-password"
                            show-password
                            placeholder="请输入密码"
                            @input="newPassChange()"
                        >
                            <i slot="prefix"><img class="home_icon" src="@/assets/passdicon.png" alt /></i>
                        </el-input>
                        <!-- 提示 -->
                        <p v-if="error" class="pass_prompt">
                            <!-- <img  src="@/assets/icon_13.png" alt /> -->
                            密码长度为8-20位，必须含数字和字母，字母须区分大小写
                        </p>
                    </div>
                    <div class="pass_item">
                        <span>确认密码</span>
                        <el-input
                            class="pass_input"
                            v-model="userPass.confirPassword"
                            minlength="8"
                            maxlength="20"
                            auto-complete="new-password"
                            show-password
                            placeholder="请再次输入密码"
                        >
                            <i slot="prefix"><img class="home_icon" src="@/assets/passdicon.png" alt /></i>
                        </el-input>
                    </div>
                    <div class="pass_item">
                        <span>验证码</span>
                        <el-input class="pass_input" ref="vcode" v-model="userPass.vCode" maxlength="6" placeholder="请输入验证码">
                            <i slot="prefix"><img class="home_icon" src="@/assets/ingyzm.png" alt /></i>
                        </el-input>
                        <span v-if="!timesOff" class="span" @click="getVerification">获取短信验证码</span>
                        <span v-else class="span">{{ times }}s</span>
                    </div>
                    <!-- 确认按钮 -->
                    <div class="pass_btn j_c_a_i" @click="passSubmit">确认</div>
                </div>
            </div>
            <!-- 页面修改密码弹框 -->
            <transition name="fade">
                <div v-if="switchOff" class="index_intention">
                    <div class="intention_box">
                        <!-- 关闭按钮 -->
						<span class="infor_countdown">S{{timeNum}}</span>
                        <img class="in_close" @click="switchOffChange()" src="@/assets/index_close.png" alt />
						<!-- 内容 -->
						<div class="infor_success f_d_a_i">
							<img src="@/assets/icon_14.png" alt="">
							<p class="infor_p martop10">{{passTitle}}</p>
							<!-- <p class="infor_p martop10">密码设置成功</p> -->
						</div>
                    </div>
                </div>
            </transition>
		<!-- 底部导航 -->
		<Footer></Footer>
		<!-- 侧边导航 -->
		<SIdeNavigation @showLend="$refs.loanInterest.lendBox()"></SIdeNavigation>
		<!-- 出借意向单弹框 -->
		<loan-interest ref="loanInterest"></loan-interest>
	</div>
</template>
<script>
import Header from '@/components/Header.vue';
import Footer from '../../components/Footer.vue';
import SIdeNavigation from '@/components/SIdeNavigation.vue';
import { checkStr } from '@/utils/index.js';
import { userSendCode, setPassword, fileUpload, getAccountInfo, getCityList, modifyPassword } from "@/api/login/login";
import LoanInterest from '../../components/LoanInterest.vue';
import { mapState } from "vuex";
let Base64 = require('js-base64').Base64;

export default {
	name: 'information',
	data() {
		return {
			defaultImg:require('@/assets/icon_15.png'),
			showImg:require('@/assets/infor_img1.png'),
			formJar:{
				fileBase64:'',
				fileName:'',
			},// 上传的 名片数据
			mobile: '', // 手机号
			isComplete:false, // 个人信息是否完善
            isSendCode:false, // 是否已发送验证码
			userPass: {
				mobile: '', // 手机号
				password: '', // 密码
				oldPassword: '', // 旧密码
				confirPassword: '', //确认密码
				vCode: '' // 验证码
			}, // 密码设置
			body: null,
			timeNum:3, // 时间数量
			timers:null, // 计时器
			switchOff: false, // 弹框开关
			timesOff: false, // 倒计时展示
			times: 59, // 验证码倒计时
			timer: null, // 计时器
			msg: 'information',
			isUpdata: false, // 是否是编辑状态
			isShowMask:false, // 遮罩是否显示
			curInvIndex: 0, // 我的信息 密码设置/修改 tab
			error: false, // 密码错误
			authFlag:false, // 是否有权限编辑
			userMsg: {
				mobile: '', // 手机
				name: '', // 姓名
				email: '', // 邮箱
				citicsWorkId: '', // 对接人工号
				companyName: '', // 单位名称
				position: '', // 职务
				residentArea: '', // 常驻区域
				workPlace:"", // 办公地点
				opFlag: 1 , // 修改标识 1 个人信息 2 通知信息
				file:'', // 文件数据流
				modifyFlag: 0, // 0 未修改名片 需上传 原有地址
			},
			fileShow:'',
			invitationData: [
				{
					title: '我的信息'
				},
				{
					title: '设置/修改密码'
				}
			],
			props:{
                lazy: true,
                lazyLoad: this.lazyLoad
            },
            residentArea:[],
            residentAreaData:[],
            showpicker:false,
			passTitle:"密码修改成功"
		};
	},
	components: {
		Header,
		Footer,
		SIdeNavigation,
		LoanInterest
	},
	computed:{
		...mapState({
			userInfo:'userInfo',
			token:'token',
		}),
		// 是否设置过密码
		passwordFlag(){
			return  JSON.parse(this.userInfo).passwordFlag
		},
		dealData(){
			return (data) => {
				let newData = '';
				data.forEach(item=>{
					newData += ` ${item}`
				})
				return newData
			}
		}
	},
	created() {
		this.initUserMessage();
	},
	watch: {
		userInfo(){
			this.initUserMessage();
		}
	},
	methods: {
		// 初始化个人信息
		initUserMessage(){
			let info =  this.userInfo && JSON.parse(this.userInfo);
			// 是否可编辑
			this.authFlag = info.authFlag ? true : false;
			// 设置手机号 不可修改
			this.mobile = info.mobile; // 手机号
			this.userMsg.mobile = info.mobile; // 用户信息手机号
			this.userPass.mobile = info.mobile; // 用户设置/修改密码
			this.showImg = info.imgStr ? `data:image/png;base64,${info.imgStr}` : require('../../assets/icon_15.png');
			//  process.env.VUE_APP_BASE_API + 
			this.fileShow = info.imgStr ? `data:image/png;base64,${info.imgStr}` : require('../../assets/icon_15.png');
			var residentArea
			if(info.residentArea){
				residentArea = info.residentArea.split(',')
			}
			this.userMsg = {
				mobile: info.mobile || '', // 手机号
				name: info.name || '', // 姓名
				email: info.email || '', // 邮箱
				citicsWorkId:info.citicsWorkId || '', // 证件
				companyName: info.companyName || '', // 单位名称
				position: info.position || '', // 职务
				residentArea: residentArea || '', // 常驻区域
				workPlace: info.workPlace || '', // 地址
				opFlag:1,
				file: '', // 文件数据流 默认 原有地址
				modifyFlag: 0, // 0 未修改名片 需上传 原有地址
				busiCardLink:info.busiCardLink || '',
			};
			this.isCompletes();
			this.props = {
				lazy: true,
				lazyLoad: this.lazyLoad
			}
			this.residentAreaData = []
			this.getResidentAreaData(0,residentArea);
		},
		// 检测个人信息
		isCompletes(){
			this.isComplete = false;
			// 循环判断个人数据
			let arr = Object.values(this.userMsg);
			arr.forEach((item,index)=>{
				if(index != 9 && index != 10){
					if(!item){
						this.isComplete = true;
					}
				}
			});
		},
		// input改变
		inputChange(data) {
			// 区域选择
			if(data){
				this.userMsg.residentArea = data;
                this.residentArea = data;
			}
		},
		// 图片上传
		httpRequest(data) {
			this.userMsg.file = data.file;
			// 调用转方法base64
			this.getBase64(data.file)
			.then(resBase64 => {
				// this.formJar.fileBase64 = resBase64.split(',')[1];
				// this.userMsg.file = resBase64;
				this.fileShow = resBase64;
				this.showImg = resBase64;
				this.userMsg.modifyFlag = 1;
				// 设置 modifyFlag  为 1  
				// 0 未修改，此时需上送原有名片链接
				// 1 已修改，此时如果不送file，则为删除原名片，否则为更新名片
			})
			this.$message.success('文件上传成功')
		},
		// 转base64码
		getBase64(file) {
			return new Promise((resolve, reject) => {
				const reader = new FileReader();
				let fileResult = ''
				reader.readAsDataURL(file)
				// 开始转
				reader.onload = () => {
					fileResult = reader.result
				}
				// 转 失败
				reader.onerror = (error) => {
					reject(error)
				}
				// 转 结束
				reader.onloadend = () => {
					this.formJar.fileName = file.name
					resolve(fileResult)
				}
			})
		},
		// 修改用户密码
		modifyPassword(data){
			modifyPassword({
				oldPassword:Base64.encode(data.oldPassword), // 旧密码
				password:Base64.encode(data.password), // 密码 新密码
				validCode:data.vCode, // 验证码
			}).then(res=>{
				// this.$message({
				// 	message: '修改成功',
				// 	type: 'success'
				// });
				this.downTime("修改");
				this.switchOff = true;
				this.userPass = {
					mobile: this.userPass.mobile, // 手机号
					password: '', // 密码
					oldPassword: '', // 旧密码
					confirPassword: '', //确认密码
					vCode: '' // 验证码
				} // 密码设置
				this.timesOff = false;
				clearInterval(this.timer);
				this.times = 59;
				// 更新用户信息
				this.getAccountInfo(this.token);
				// 数据清除
			}).catch(err=>{
				console.log(err);
				this.$message({
					message: err.errorMsg || err.errorMessage,
					type: 'error'
				});
				if(err.errorCode == '11002'){
					// 旧密码错误
					this.$refs.oldPass.focus();
				}else if(err.errorCode == '42010'){
					// 验证码
					this.$refs.vcode.focus();
				}
			})
		},
		// 修改用户信息
		updateAccountInfo(){
			if (this.userMsg.email && !checkStr(this.userMsg.email, "email")) {
				this.$message({
					message: '邮箱格式错误',
					type: 'error'
				});
				return;
			};
			this.userMsg.residentArea = this.userMsg.residentArea.toString();
			// return;
			let data = {
				...this.userMsg,
				token: this.$store.state.token,
				modifyFlag: this.userMsg.modifyFlag, // 名片修改表示
			};
			fileUpload('/v1/account/securitiesFinance/updateAccountInfo',data).then(res=>{
				this.$message.success("修改成功");
				this.isUpdata = false;
                this.showpicker = false
				this.isCompletes();
				// 更新用户信息
				this.getAccountInfo();
			}).catch(err=>{
                this.$message({
                    message:err.errorMsg || err.errorMessage,
                    type: 'error'
                })
            })
		},
		// 获取用户信息
        getAccountInfo(token){
            getAccountInfo({token,queryType:'1'}).then(res=>{
                this.$store.dispatch('set_userInfo',JSON.stringify(res));
				this.isCompletes();
				this.residentAreaData = []
                this.getResidentAreaData(0,res.residentArea.split(","))
            });
			this.isSendCode = false;
        },
		// 弹框倒计时
		downTime(title){
			this.passTitle = `密码${title}成功`;
			this.timers = setInterval(() => {
				this.timeNum = this.timeNum - 1;
				if (this.timeNum == 0) {
					this.switchOff = false;
					clearInterval(this.timers);
					this.timeNum = 3;
				}
			}, 1000);
		},
		// 鼠标悬浮事件
		mouseSuspension(index){
			if(this.isUpdata){
				this.isShowMask = index;
			}
		},
		// 编辑
		inforUpdata() {
			// 修改模式
			this.isUpdata = true;
		},
		// 提交
		inforSubmit() {
			this.updateAccountInfo();
			return
			// 保存数据
			this.isUpdata = false;
			this.$message.success('提交成功！')
		},
		// invChange
		invChange(index) {
			this.curInvIndex = index;
		},
		// 新密码改变
		newPassChange() {
			if (this.error) {
				this.error = false;
			}
		},
		// 检测密码是否相等
		passwordIsEqual(pass1, pass2, pass3) {
			if (pass1 == pass2) {
				return true;
			} else {
				return false;
			}
		},
		// 检测 密码是否是 8 - 20 位
		passwordLength(pass1) {
			if (checkStr(pass1, "password")) {
				this.error = false;
				return true;
			} else {
				this.error = true;
				return false;
			}
		},
		// 获取用户个人账号信息
        getAccountInfo(token){
            getAccountInfo({token,queryType:'1'}).then(res=>{
                // 设置vuex
                this.$store.dispatch('set_userInfo', JSON.stringify(res));
            })
        },
		// 用户设置密码
		setPassword(passData){
			setPassword({
				password:Base64.encode(passData.password), // 密码
				validCode:passData.vCode, // 验证码
			}).then(res=>{
				// this.$message({
				// 	message: '设置成功',
				// 	type: 'success'
				// });
				this.downTime('设置');
				this.switchOff = true;
				this.userPass = {
					mobile: this.userPass.mobile, // 手机号
					password: '', // 密码
					oldPassword: '', // 旧密码
					confirPassword: '', //确认密码
					vCode: '' // 验证码
				} // 密码设置
				this.timesOff = false;
				clearInterval(this.timer);
				this.times = 59;
				// 更新用户信息
				this.getAccountInfo(this.token);
			}).catch(err=>{
				this.loading = false;
                this.$message({
                    message:err.errorMsg || err.errorMessage,
                    type: 'error'
                })
            })
		},
		// 提交按钮
		passSubmit() {
			// 设置密码
			if (JSON.parse(this.userInfo).passwordFlag == 0) {
				if (this.mobile && this.userPass.password && this.userPass.vCode && this.userPass.confirPassword) {
					if (this.passwordLength(this.userPass.password)) {
						if (this.passwordIsEqual(this.userPass.password, this.userPass.confirPassword)) {
							if(!this.isSendCode){
								this.$message({
									message:"请发送验证码",
									type: "warning",
								});
								return;
							};
							this.setPassword(this.userPass);
						} else {
							this.$message({
								message: '两次密码不同',
								type: 'error'
							});
						}
					} else {
						this.error = true;
					}
				} else {
					this.$message({
						message: '请补全信息',
						type: 'error'
					});
				}
			} else {
				// 修改密码
				if (this.userPass.mobile && this.userPass.password && this.userPass.oldPassword && this.userPass.vCode && this.userPass.confirPassword) {
					if (this.passwordLength(this.userPass.password)) {
						if (this.passwordIsEqual(this.userPass.password, this.userPass.confirPassword)) {
							if(!this.isSendCode){
								this.$message({
									message:"请发送验证码",
									type: "warning",
								});
								return;
							};
							this.modifyPassword(this.userPass);
						} else {
							this.$message({
								message: '密码不同',
								type: 'error'
							});
						}
					} else {
						this.error = true;
					}
				} else {
					this.$message({
						message: '请补全信息',
						type: 'error'
					});
				}
			}
		},
		// 打开弹框
		switchOffChange() {
			this.switchOff = !this.switchOff;
			this.changeBody(this.switchOff);
		},
		// 发送验证码
        userSendCode() {
            userSendCode({
                mobile: this.mobile,
                NECaptchaValidate: this.NECaptchaValidate,
            }).then((res) => {
                this.isSendCode = true;
                // 发送成功倒计时
                this.getSms();
            }).catch(err=>{
				this.loading = false;
                this.$message({
                    message:err.errorMsg || err.errorMessage,
                    type: 'error'
                })
            })
        },
		// 发送验证码判断
		getVerification() {
			if (!this.mobile) {
				this.$message({
					message: '请输入手机号',
					type: 'warning'
				});
			} else {
				if (!checkStr(this.mobile, 'mobile')) {
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
		// 设置页面是否滚动
		changeBody(switchOff) {
			if (!switchOff) {
				this.body.style.overflow = 'auto';
			} else {
				this.body.style.overflow = 'hidden';
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
                    type:item.type,
                    leaf: level >= 1
                }))
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
        },
        getResidentAreaData(index,data){
			if(!data){
				return;
			}
			// 999999 不需 请求 直接 赋值
			if(index == 1 && data[0] == 999999){
				this.residentAreaData.push('港澳台及海外');
				return
			}
            let params = {}
            if(index == 0){
                params.type = 1
            }
            if(index == 1){
                params.type = 2
                params.code = data[index-1]
            }
            if(index>1){
                return
            }
            
            getCityList(params).then((res) => {
                let entrys = res.entrys
                entrys && entrys.forEach(item =>{
                    if(item.code==data[index]){
                        this.residentAreaData.push(item.name)
                    }
                    
                })
                index++;
                if(index<=data.length){
                    this.getResidentAreaData(index,data)
                }
               
            }).catch(err=>{
				console.log(err);
                this.$message({
                    message:err.errorMsg || err.errorMessage,
                    type: 'error'
                })
            })
        },
        showpickerM(){
            this.showpicker = true;
            this.residentArea = []
        }
	},
	mounted() {
		let body = document.querySelector('body');
		this.body = body;
	}
};
</script>
<style lang="scss" scoped>
.invitation {
	width: 100%;
    max-width: 1440px;
    padding: 0 20px;
    box-sizing: border-box;
    min-width: 1280px;
	align-items: flex-start;
	background-color: #f8f9fc;
    justify-content: space-between;

	.invitation_left {
		width: 166px;
		height: auto;
		background: #ffffff;
		margin-right: 20px;
		display: flex;
		flex-direction: column;

		.left_item {
			width: 126px;
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

		.left_cur {
			background: rgba(197, 24, 31, 0.05);
			border-left: 4px solid #c5181f;
			color: #c5181f;
		}
	}
}

.password_content {
	width: 1054px;
	min-height: 302px;
	padding: 50px 80px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	background: #ffffff;
	margin-bottom: 50px;

	.pass_item {
		position: relative;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-top: 18px;
		& .span {
			top: 14px;
			left: 405px;
			position: absolute;
			font-size: 14px;
			color: #c5181f;
			cursor: pointer;
		}

		& span {
			width: 100px;
			font-size: 14px;
			text-align: right;
			color: #333333;
			font-weight: 600;
			margin-right: 20px;
		}

		.pass_input {
			width: 400px;
			height: 44px;
			background: #fcfbfb;
			border-radius: 5px;
			font-size: 14px;
			color: #1c1d1c;

			.home_icon {
				position: absolute;
				z-index: 9;
				width: 18px;
				height: 18px;
				margin-left: 11px;
				margin-top: 11px;
			}
		}

		.pass_prompt {
			display: flex;
			align-items: center;
			color: #c5181f;
			margin-left: 20px;

			& img {
				width: 18px;
				height: 18px;
				margin-right: 10px;
			}
		}
	}

	.pass_btn {
		width: 100px;
		height: 36px;
		font-weight: 600;
		color: #ffffff;
		background: #c5181f;
		border-radius: 5px;
		margin-top: 20px;
		margin-left: 120px;
		cursor: pointer;
	}
}

.information_box {
	width: 100%;
	height: 400px;

	& img {
		height: 400px;
		width: 100%;
        object-fit: cover;
	}
}

.infor_message {
    min-width: 1280px;
	width: 100%;
	height: 40px;
	background: rgba(197, 24, 31, 0.05);

	.infor_msg {
		width: 72.91%;
        box-sizing: border-box;
		font-size: 14px;
		color: #666666;
	}
}

.infor_title {
	max-width: 1400px;
	margin: 60px 0 40px 0;

	.infor_line {
		width: 60px;
		height: 2px;

		.line {
			display: block;
			width: 60px;
			height: 2px;
			background: linear-gradient(270deg, #c5181f 0%, rgba(197, 24, 31, 0) 100%);
		}

		.line2 {
			background: linear-gradient(55deg, #c5181f 0%, rgba(197, 24, 31, 0) 100%);
		}

		.round {
			display: block;
			width: 6px;
			height: 6px;
			background: #c5181f;
			border-radius: 50%;
		}
	}

	.infor_my {
		font-size: 36px;
		color: #1c1d1c;
		margin: 0 20px;
		font-weight: bold;
	}
}

.infor_content {
	flex: 1;
	background-color: #ffffff;
	padding: 42px 0 60px 0;
	margin-bottom: 110px;
	align-items: flex-start;

	.infor_left {
		position: relative;
		height: 100%;

		& .index_updata{
			width: 360px;
			height: 224px;
		}

		& img {
			width: 360px;
			height: 224px;
			cursor: pointer;
		}

		& p {
			font-size: 16px;
			color: #666666;
			font-weight: 600;
			margin-top: 8px;
			text-align: center;
		}

		.infor_mask{
			position: absolute;
			top: 2px;
			left: 0;
			width: 360px;
			height: 224px;
			background: rgba(0, 0, 0, 0.5);
			box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
			border-radius: 5px;
			cursor: pointer;

			& img{
				width: 30px;
				height: 30px;
			}
			& p{
				font-size: 18px;
				font-weight: 600;
				color: #FFFFFF;
				margin-top: 15px;
			}
		}
	}

	.infor_right {
		margin-left: 70px;
		align-items: flex-start;

		.infor_list {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			width: 450px;
			font-size: 14px;
			color: #1c1d1c;
			margin: 12px 0;

			.infor_h1 {
				display: block;
				text-align: right;
				width: 110px;
				margin-right: 21px;
				font-weight: 600;
			}

			.infor_input {
				height: 35px;
			}
		}
		.infor_updata_btn {
			width: 100px;
			height: 36px;
			background: #ffffff;
			border-radius: 5px;
			border: 1px solid #c5181f;
			font-size: 14px;
			color: #c5181f;
			margin-top: 15px;
			cursor: pointer;
		}
		.infor_submit_btn {
			width: 100px;
			height: 36px;
			background: #c5181f;
			border-radius: 5px;
			font-size: 14px;
			color: #ffffff;
			margin-top: 15px;
			cursor: pointer;
		}
	}
}

.intention_box {
	width: 700px;
	height: 342px;
	.infor_countdown{
		right: 65px;
		top: 33px;
		width: 30px;
		text-align: center;
		position: absolute;
		font-size: 18px;
		color: #999999;
		font-weight: 600;
	}

	.infor_success{
		width: 100%;

		& img{
			width: 128px;
			height: 128px;
			margin-top: 80px;
		}

		.infor_p{
			width: 100%;
			text-align: center;
			font-size: 24px;
			color: #333333;
			font-weight: 600;
		}
	}
}
.infor_input_p{
    width: 450px;
    height: 40px;
    line-height: 40px;
    border: 1px solid #DCDFE6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    border-radius: 4px;
    padding: 0 15px;
}
</style>
<style lang="scss">
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	opacity: 0;
}
#app {
	background-color: #f8f9fc;
}

.pass_item {
	.el-input--prefix .el-input__inner {
		padding-left: 45px;
		height: 44px;
	}

	.el-input.is-disabled .el-input__inner {
		color: #606266;
	}
}
.input_inner_cur {
	.el-input--prefix .el-input__inner {
		padding-left: 45px;
		height: 44px;
	}
}
</style>
