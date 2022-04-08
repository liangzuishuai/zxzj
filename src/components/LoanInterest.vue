<template>
<div class="loanint">
    <!-- 出借意向单弹框 -->
	<transition name="fade">
        <div v-if="switchLend" class="index_intention">
            <div class="intention_box">
                <!-- 关闭按钮 -->
                <img class="in_close" @click="lendBox()" src="@/assets/index_close.png" alt />
                <!-- 标题 -->
                <div class="infor_title j_c_a_i">
                    <div class="infor_line j_c_a_i">
                        <span class="line"></span>
                        <span class="round"></span>
                    </div>
                    <div class="infor_my">出借意向单</div>
                    <div class="infor_line j_c_a_i">
                        <span class="round"></span>
                        <span class="line line2"></span>
                    </div>
                </div>
                <div class="index_center">
                    <el-form size="medium" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm f_d_a_i">
                        <!-- 证券信息 -->
                        <div class="securities_mess">
                            <div class="common_title j_c_a_i">
                                <span></span>
                                证券信息
                            </div>
                            <div class="bus_search">
                                <el-form-item class="name1" label="证券代码/名称" prop="region">
                                    <lazy-select @change="lazyChange" ref="LazySelect" @valueChange="valueChange" :region="curRegionCode" placeholder="证券代码/名称/简称"></lazy-select>
                                </el-form-item>
                                <el-form-item class="name1" label="最大出借数量 ( 股 )" prop="number">
                                    <div class="input2 j_c_a_i">
                                        <el-input-number :min="ruleForm.min" v-model="ruleForm.number" :step="100" step-strictly></el-input-number>
                                        <span>注：支持手动输入，只可输入100的整数倍</span>
                                    </div>
                                </el-form-item>
                                <!-- 出借期限及费率 1 主板-->
                                <el-form-item class="name1" v-if="ruleForm.min == 10000" label="出借期限及费率" prop="type">
                                    <div class="checked_box">
                                        <div @click.prevent="checkedChange(0)" class="checked j_c_a_i">
                                            <el-checkbox label="" @click.stop="checkedChange(0)" v-model="checkedList[0].type" name="type"></el-checkbox>
                                            <div :class="[checkedList[0].type ? 'currchecked' : '', 'checkeditem', 'f_d_a_i']">
                                                <span class="p1">1.5%</span>
                                                <span class="p2">3天</span>
                                            </div>
                                        </div>
                                        <div @click.prevent="checkedChange(1)" class="checked j_c_a_i">
                                            <el-checkbox label="" @click.stop="checkedChange(1)" v-model="checkedList[1].type" name="type"></el-checkbox>
                                            <div :class="[checkedList[1].type ? 'currchecked' : '', 'checkeditem', 'f_d_a_i']">
                                                <span class="p1">1.6%</span>
                                                <span class="p2">7天</span>
                                            </div>
                                        </div>
                                        <div @click.prevent="checkedChange(2)" class="checked j_c_a_i">
                                            <el-checkbox label="" @click.stop="checkedChange(2)" v-model="checkedList[2].type" name="type"></el-checkbox>
                                            <div :class="[checkedList[2].type ? 'currchecked' : '', 'checkeditem', 'f_d_a_i']">
                                                <span class="p1">1.7%</span>
                                                <span class="p2">14天</span>
                                            </div>
                                        </div>
                                        <div @click.prevent="checkedChange(3)" class="checked j_c_a_i">
                                            <el-checkbox label="" @click.stop="checkedChange(3)" v-model="checkedList[3].type" name="type"></el-checkbox>
                                            <div :class="[checkedList[3].type ? 'currchecked' : '', 'checkeditem', 'f_d_a_i']">
                                                <span class="p1">1.8%</span>
                                                <span class="p2">28天</span>
                                            </div>
                                        </div>
                                        <div @click.prevent="checkedChange(4)" class="checked j_c_a_i">
                                            <el-checkbox label="" @click.stop="checkedChange(4)" v-model="checkedList[4].type" name="type"></el-checkbox>
                                            <div :class="[checkedList[4].type ? 'currchecked' : '', 'checkeditem', 'f_d_a_i']">
                                                <span class="p1">2.0%</span>
                                                <span class="p2">182天</span>
                                            </div>
                                        </div>
                                    </div>
                                </el-form-item>
                                <!-- 出借期限及费率 2 双创板-->
                                <el-form-item v-else class="name1 twocolor" label="出借期限及费率" prop="types">
                                    <div class="two f_d_a_i">
                                        <div class="j_c_a_i">
                                            <div class="j_c_a_i">
                                                <span class="two_p1">期限</span>
                                                <el-form-item class="twocolor" label="" prop="value1">
                                                    <el-input
                                                        style="width: 80px"
                                                        type="string"
                                                        @blur="inputBlur(1, ruleForm.value1)"
                                                        :min="2"
                                                        :max="182"
                                                        :maxlength="3"
                                                        v-model.number="ruleForm.value1"
                                                        placeholder
                                                    ></el-input>
                                                </el-form-item>
                                                <span class="two_p2">天</span>
                                            </div>
                                            <div class="j_c_a_i">
                                                <span class="two_p1">—</span>
                                                <el-form-item class="twocolor" label="" prop="value2">
                                                    <el-input
                                                        style="width: 80px"
                                                        type="string"
                                                        @blur="inputBlur(2, ruleForm.value2)"
                                                        :min="2"
                                                        :max="182"
                                                        :maxlength="3"
                                                        v-model.number="ruleForm.value2"
                                                        placeholder
                                                    ></el-input>
                                                </el-form-item>
                                                <span class="two_p2">天</span>
                                            </div>
                                        </div>
                                        <div class="j_c_a_i" style="margin-top: 18px">
                                            <span class="two_p1">费率</span>
                                            <el-form-item class="twocolor" label="" prop="value3">
                                                <el-input
                                                    style="width: 80px"
                                                    :min="2"
                                                    :max="182"
                                                    @blur="inputBlur(3, ruleForm.value3)"
                                                    :maxlength="4"
                                                    v-model="ruleForm.value3"
                                                    placeholder
                                                ></el-input>
                                            </el-form-item>
                                            <span class="two_p2">%</span>
                                        </div>
                                    </div>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="securities_mess" style="margin-top: 20px">
                            <div class="common_title j_c_a_i">
                                <span></span>
                                机构法人信息
                            </div>
                            <div class="bus_search">
                                <el-form-item class="name1" label="转融通出借权限" prop="permissions">
                                    <div class="j_c_a_i se_switch">
                                        <el-switch v-model="ruleForm.permissions" active-color="#C5181F" inactive-color="#E5E5E5"></el-switch>
                                        <span v-if="ruleForm.permissions">已开通</span>
                                        <span v-else>已关闭</span>
                                    </div>
                                </el-form-item>
                                <el-form-item class="name1" label="机构名称" prop="name">
                                    <el-input v-if="shareData.length == 0" style="width: 932px" v-model="ruleForm.name" placeholder></el-input>
									<InstSelect v-else :DataList="shareData" @change="lazyChange2" ref="LazySelect" @valueChange="valueChange2" :region="curRegionCode2" placeholder="证券代码/名称/简称"></InstSelect>
                                </el-form-item>
                                <el-form-item class="name1" label="账号信息" prop="account">
                                    <div class="j_c_a_i se_switch"><el-switch v-model="ruleForm.account" active-color="#C5181F" inactive-color="#E5E5E5"></el-switch></div>
                                </el-form-item>
                                <el-form-item v-if="ruleForm.account" label="证券账号" prop="accountmsg">
                                    <el-input style="width: 932px" v-model="ruleForm.accountmsg" placeholder></el-input>
                                </el-form-item>
                                <el-form-item v-if="ruleForm.account" label="席位号" prop="xwNumber">
                                    <el-input style="width: 932px" v-model="ruleForm.xwNumber" placeholder></el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </el-form>
                    <div class="liability">
                        <div class="common_title j_c_a_i">
                            <span></span>
                            免责提示
                        </div>
                        <p class="liab_text">
                            为保证服务质量、控制投资风险，投资者参与上述业务应首先联系客户经理，完成投资者适当性匹配，并充分了解业务的性质、特点、使用的注意事项以及不当使用可能会带来的风险或损失。投资者自愿参与上述业务，须在参与前详细阅读交易相关的各项材料，包括但不限于协议、风险揭示书以及其他必要的业务资料，充分了解并知悉交易的各项风险，包括但不限于交易风险、结算风险、法律风险、合规风险以及不可抗力等其他风险，并在必要时就上述风险寻求专业咨询。
                            网页资讯内容仅提供给投资者作参考之用，不构成对投资者的任何投资建议，投资者不应当以该资讯取代其独立判断或仅依据该资讯做出投资决策。股市有风险，投资需谨慎。
                            出借借入行情内容，基于我公司客户情况汇总，将随市场情况变化，仅供参考，不构成我公司对客户任何报价或成交义务。
                        </p>
                    </div>
                    <div @click="indexSubmit('ruleForm')" class="lia_submit_btn j_c_a_i">提交</div>
                    <p class="lia_submit_btn_line"></p>
                </div>
            </div>
        </div>
    </transition>
    <!-- 出借确认弹框 -->
    <transition name="fade">
        <div v-if="switchConfirm" class="index_intention">
            <div class="intention_box newin_box">
                <!-- 关闭按钮 -->
                <img class="in_close" @click="confirmBox()" src="@/assets/index_close.png" alt />
                <!-- 标题 -->
                <div class="infor_title j_c_a_i">
                    <div class="infor_line j_c_a_i">
                        <span class="line"></span>
                        <span class="round"></span>
                    </div>
                    <div class="infor_my">出借意向确认</div>
                    <div class="infor_line j_c_a_i">
                        <span class="round"></span>
                        <span class="line line2"></span>
                    </div>
                </div>
                <div class="in_prompt j_c_a_i">提示： 提交后出借意向单后， 平台会根据您的意向发送出借邀请，请您关注接收到的出借邀请</div>
                <div class="in_name">
                    <div class="in_item j_c_a_i">
                        <span class="span_1">证券名称</span>
                        <span class="span_2">{{ ruleForm.regionCode }}</span>
                    </div>
                    <div class="in_item j_c_a_i">
                        <span class="span_1">证券代码</span>
                        <span class="span_2">{{ ruleForm.region }}</span>
                    </div>
                    <div class="in_item j_c_a_i">
                        <span class="span_1">最大出借数量 ( 股 )</span>
                        <span class="span_2">{{ ruleForm.number }}</span>
                    </div>
                    <div class="in_item j_c_a_i">
                        <span class="span_1">出借期限及费率</span>
                        <span v-if="ruleForm.min == 10000" class="span_2 j_c_a_i">
                            <div v-for="(item, index) in checkedList" :key="index + 'a'">
                                <template v-if="item.type && item.value == 1.5">
                                    <span>3天</span>
                                    <span class="span_3">1.5%</span>
                                </template>
                                <template v-else-if="item.type && item.value == 1.6">
                                    <span style="margin-left: 18px">7天</span>
                                    <span class="span_3">1.6%</span>
                                </template>
                                <template v-else-if="item.type && item.value == 1.7">
                                    <span style="margin-left: 18px">14天</span>
                                    <span class="span_3">1.7%</span>
                                </template>
                                <template v-else-if="item.type && item.value == 1.8">
                                    <span style="margin-left: 18px">28天</span>
                                    <span class="span_3">1.8%</span>
                                </template>
                                <template v-else-if="item.type && item.value == 2.0">
                                    <span style="margin-left: 18px">182天</span>
                                    <span class="span_3">2.0%</span>
                                </template>
                            </div>
                        </span>
                        <span v-else class="span_2 j_c_a_i">
                           <span style="margin-right:10px;">{{ruleForm.value1}}-{{ruleForm.value2}}天</span><span style="color: #c5181f;">{{ruleForm.value3}}%</span>
                        </span>
                    </div>
                </div>
                <!-- 分割线 -->
                <p class="in_line"></p>
                <div class="in_btn j_c_a_i" @click="confirmBox(lendData)">确 认</div>
            </div>
        </div>
    </transition>
    <!-- 出借提示成功弹框 -->
    <transition name="fade">
        <div v-if="switchSuccess" class="index_intention">
            <div class="intention_box newin_success">
                <span class="infor_countdown">S{{ timeNum }}</span>
                <!-- 关闭按钮 -->
                <img class="in_close" @click="switchtChange()" src="@/assets/index_close.png" alt />
                <img class="in_success" src="@/assets/success.png" alt />
                <p class="in_text">您的出借意向单提交成功啦！</p>
                <div class="in_prompt j_c_a_i">提示： 提交后出借意向单后， 平台会根据您的意向发送出借邀请，请您关注接收到的出借邀请</div>
            </div>
        </div>
    </transition>
</div>
</template>
<script>
import { queryService118no, queryService119 } from '@/api/index/index';
import LazySelect from '@/components/LazySelect.vue';
import InstSelect from '@/components/InstSelect.vue';
export default {
    name:'loaninterest',
    data() {
        return {
            body:null,
            curRegionCode:"", // 设置代码默认选择数据
            curRegionCode2:"", // 设置机构默认选择数据
            ruleForm: {
				region: '', // 证券代码
				regionCode: '', // 证券名称
				number: 10000, // 最大出借数量 ( 股 )
				permissions: true, // 出借权限
				name: '', // 机构名称
				account: false, // 账号信息
				accountmsg: '', // 证券账号
				xwNumber: '', // 席位号
				value1: '',
				value2: '',
				value3: '',
				min: 10000, // 默认最大出借数
				types: false, // value 1 2 3 如果有一个为空 此为false
				SourceType:'',
				CompanyId:"", // 选择机构id
			},
			checkedList: [
                { type:false,value:1.5,time:3},
                { type:false,value:1.6,time:7},
                { type:false,value:1.7,time:14},
                { type:false,value:1.8,time:28},
                { type:false,value:2.0,time:182}
            ],
			switchConfirm: false, // 出借确认弹框
			switchSuccess: false, // 成功弹框提示
			switchLend: false, // 出借弹框
            timeNum: 3, // 时间数量
			timers: null, // 计时器
            rules: {
				region: [
					{
						required: true,
						message: '请输入证券代码/名称',
						trigger: 'change'
					}
				],
				number: [
					{
						required: true,
						message: '请输入数量',
						trigger: 'change'
					}
					// { min: 2, max: 10, message: '不得小于100',trigger:'change' }
				],
				types: [
					{
						required: true
					}
				],
				name: [
					{
						required: true,
						message: '请输入名称',
						trigger: 'change'
					}
				],
				value1: [
					{
						required: true,
						message: '请输入天数',
						trigger: 'change'
					}
				],
				value2: [
					{
						required: true,
						message: '请输入天数',
						trigger: 'change'
					}
				],
				value3: [
					{
						required: true,
						message: '请输入费率',
						trigger: 'change'
					}
				]
			},
			shareData:[], // 股东数据
        }
    },
    created() {
        if(this.$store.state.token){
			// this.queryService118no(); // 查询股东账号信息
		};
    },
    components:{
        LazySelect,
		InstSelect
    },
    methods: {
		// 实时接收的值
		valueChange(region){
			// console.log(region);
			// this.curRegionCode = region;
			// console.log(this.curRegionCode);
			// this.ruleForm.regionCode = region; // 名称
		},
		// 实时接收的值
		valueChange2(region){
			this.curRegionCode2 = region; // 设置回显
			this.ruleForm.name = region; // 名称
			this.ruleForm.SourceType = ''; // 类型
		},
        // 提交btn
		indexSubmit(formName) {
            let newType = '';
            this.checkedList.forEach((item,index) => {
                if(item.type && index!=0 ){
                    newType+=`;${item.time}`;
                };
                if(item.type && index == 0){
                    newType+=`${item.time}`;
                }
            });
            
			if(!this.ruleForm.region){
                this.$message({
					message: '请先选择证券代码哦',
                    type: 'error'
                })
                return
            };
			if(!newType && this.ruleForm.min == 10000){
                this.$message({
					message: '出借期限及费率您还未选择哦',
                    type: 'error'
                })
                return
            };
			if(!this.ruleForm.name){
                this.$message({
					message: '请填写机构名称哦',
                    type: 'error'
                })
                return
            };
			this.$refs[formName].validate(valid => {
				if (valid) {
					if(!this.$store.state.token){
						this.$message({
							message: '请先登录',
							// showClose: true,
							type: 'error'
					});
					this.ruleForm.checkedList = this.checkedList;
					// 存入缓存 跳转登录
					this.$store.dispatch("notLoggeData", JSON.stringify(this.ruleForm)) // 设置未录数据
						this.$router.push({
							path: '/',
						});
						return
					}
					// 打开出借确认弹框
					this.lendBox(this.ruleForm);
					// 关闭出借意向弹框
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
        // 出借确认弹框
		lendBox(data,type) {
			if (data&&!type) {
				// 市场行情点击
				this.switchLend = !this.switchLend;
				this.changeBody(this.switchLend);
				this.lendData = data;
				this.confirmBox();
			} else {
				this.switchLend = !this.switchLend;
				this.changeBody(this.switchLend);
                // 清理数据
				this.ruleForm = {
					region: '', // 证券代码/名称
					regionCode: '', // 证券名称
					number: 10000, // 最大出借数量 ( 股 )
					type: [], // 出借期限及费率
					permissions: true, // 出借权限
					name: '', // 机构名称
					account: false, // 账号信息
					accountmsg: '', // 证券账号
					xwNumber: '', // 席位号
					value1: null,
					value2: null,
					value3: null,
					min: 10000, // 默认最大出借数
					types: false, // value 1 2 3 如果有一个为空 此为false
					SourceType:'',
					CompanyId:"", // 选择机构id
				};
                this.checkedList.forEach(item=>{
                    item.type = false;
                })
				this.curRegionCode2 = '';
                this.curRegionCode = '';
                // 68 30 最小值为 1000  否则为 10000
                if(data){
                    this.curRegionCode = `${data.StockCode}  ${data.StockName}`;
                    this.ruleForm.region = data.StockCode;
                    this.ruleForm.regionCode = data.StockName;
                    if(data.StockCode.endsWith('68',2) || data.StockCode.endsWith('30',2)){
                        this.ruleForm.number = 1000;
                        this.ruleForm.min = 1000;
                    }else{
                        this.ruleForm.number = 10000;
                        this.ruleForm.min = 10000;
                    };
                }
			}
		},
        // 设置页面是否滚动
		changeBody(switchLend) {
			if (!switchLend) {
				this.body.style.overflow = 'auto';
			} else {
				this.body.style.overflow = 'hidden';
			}
		},
        // 开关改变
		switchtChange() {
			this.switchSuccess = !this.switchSuccess;
			this.changeBody(this.switchSuccess);
			if (this.switchSuccess) {
				this.downTime();
			}
		},
        // 弹框倒计时
		downTime() {
			this.timers = setInterval(() => {
				this.timeNum = this.timeNum - 1;
				if (this.timeNum == 0) {
					this.switchSuccess = false;
					this.changeBody(false);
					clearInterval(this.timers);
					this.timeNum = 3;
				}
			}, 1000);
		},
        // 确认弹框
		confirmBox(data) {
			if (data) {
				// 关闭出借弹框
				this.switchConfirm = !this.switchConfirm;
				this.changeBody(this.switchConfirm);
				// 打开确认页面
				this.queryService119(data);
			}else{
				this.switchConfirm = !this.switchConfirm;
				this.changeBody(this.switchConfirm);
			}
		},
        // checked
		checkedChange(index) {
			this.checkedList[index].type = !this.checkedList[index].type;
			// return
		},
        // 出借意向组件选择数据
		lazyChange(data) {
			const { min, number, region, regionCode } = data;
			this.ruleForm.min = min;
			this.ruleForm.number = number;
			this.ruleForm.region = region;
			this.ruleForm.regionCode = regionCode;
			this.rules.region[0].required = true;
		},
		// 出借意向组件选择数据s
		lazyChange2(data) {
			const { SourceType, regionName, regionValue } = data;
			this.ruleForm.name = regionName; // 设置名称
			this.ruleForm.CompanyId = regionValue; // 设置id
			this.curRegionCode2 = regionName; // 可设置 可不设 回显
			this.ruleForm.SourceType = SourceType; // 类型
		},
        // 主创版 input 失去焦点
		inputBlur(index, value) {
			if (index == 1 || index == 2) {
				if (!(1 <= value * 1 && value * 1 <= 182)) {
					if (index == 1) {
						this.ruleForm.value1 = '';
					} else {
						this.ruleForm.value2 = '';
					}
					this.$message({
						message: '期限需要在1-182天之间',
						type: 'error'
					});
					return
				}
				if(index == 1 && this.ruleForm.value2){
					if(this.ruleForm.value1*1 > this.ruleForm.value2*1){
						this.$message({
							message: `必须小于${this.ruleForm.value2}天`,
							type: 'error'
						});
						this.ruleForm.value1 = '';
					}
				}else if(index == 2  && this.ruleForm.value1){
					if(this.ruleForm.value1*1 > this.ruleForm.value2*1){
						this.$message({
							message: `必须大于${this.ruleForm.value1}天`,
							type: 'error'
						});
						this.ruleForm.value2 = '';
					}
				}
			} else {
				if (!(value * 1 > 0)) {
					this.$message({
						message: '费率应是正数',
						type: 'error'
					});
					this.ruleForm.value3 = '';
				}else if(!(value * 1 > 0 && value * 1 < 100)){
					this.$message({
						message: '费率应在0-100之间',
						type: 'error'
					});
					this.ruleForm.value3 = '';
				}
			}
		},
        // 提交出借申请
		queryService119(data) {
			let newType = '';
			let newRfsFlag = this.ruleForm.permissions ? 1 : 0;
			// 双创版
			if (data.region.endsWith('68', 2) || data.region.endsWith('30', 2)) {
				if(this.ruleForm.value1 == this.ruleForm.value2){
					newType = this.ruleForm.value1;
				}else{
					newType = `${this.ruleForm.value1}-${this.ruleForm.value2}`;
				}
			} else {
				// 主版
                this.checkedList.forEach((item,index) => {
                    if(item.type && newType){
                        newType+=`/${item.time}`;
                    };
                    if(item.type && !newType){
                        newType+=`${item.time}`;
                    }
                });
			};
			// return
			let newData = {
				PbAccount: this.$store.state.token,
				StockCode: this.ruleForm.region, // 证券代码
				Qty: this.ruleForm.number, // 出借最大数量
				FeeRate: this.ruleForm.value3 * 1  / 100, // 费率 主板无需  双创版需要
				RfsFlag: newRfsFlag, // 是否开通出借权限
				OpStation: '', // 操作地址
				CompanyName: this.ruleForm.name, // 机构地址
				StockAccount: this.ruleForm.accountmsg, // 证券账户
				Seat: this.ruleForm.xwNumber, // 席位号
				CompanyId: this.ruleForm.CompanyId, // 机构ID
				SourceType: this.ruleForm.SourceType,
				TermRange: newType // 出借期限及费率
			};
			queryService119({ ...newData }).then(res => {
				this.switchtChange();
			}).catch(err=>{
                this.$message({
                    message:err.errorMsg || err.errorMessage,
                    type: 'error'
                })
            })
		},
        // 查询股东信息
		queryService118no() {
			queryService118no({
				PbAccount: this.$store.state.token
			}).then(res => {
				this.ruleForm.SourceType = res.data[0].SourceType;
				// 设置股东数据
				this.shareData = res.data;
			}).catch(err=>{
				console.log(err);
                this.$message({
                    message:err.errorMsg || err.errorMessage,
                    type: 'error'
                })
            })
		},
    },
    mounted() {
		let body = document.querySelector('body');
		this.body = body;
		if(this.$store.state.token){
			// 如果已登录 获取数据 如果有数据  打开页面设置数据
			let loginData = this.$store.state.notLoggeData && JSON.parse(this.$store.state.notLoggeData);
			if(loginData){
				this.lendBox();
				this.ruleForm = loginData;
                this.curRegionCode = `${loginData.region}  ${loginData.region}`;
				this.checkedList = loginData.checkedList;
				this.lendBox(this.ruleForm);
                this.$store.dispatch("notLoggeData", ''); // 清理数据
			}
		};
	}
}
</script>

<style lang="scss" scoped>
.loanint{
    position: fixed;
    top: 0;
    width: 100%;
	z-index: 99;
}
.index_header_box {
	width: 100%;
	background: #ffffff;
}
.index {
	width: 100%;
	background-color: #f8f9fc;

	.index_header {
		position: relative;
		max-width: 1920px;
		margin: 0 auto;
		width: 100%;
		overflow: hidden;

		.index_banner {
			width: 1920px;
			height: 800px;

			& img {
				width: 1920px;
				height: 800px;
			}
		}
	}

	.index_right {
		position: absolute;
		width: 220px;
		padding: 20px;
		height: 40px;
		background: rgba(198, 23, 30, 0.9);
		opacity: 0.9;
		justify-content: center;
		align-items: flex-start;
		cursor: pointer;
	}

	.index_white {
		font-size: 14px;
		color: #ffffff;
		font-weight: 400;
		right: 0;
		top: 310px;
	}
	.index_red {
		background-color: rgba(255, 255, 255, 0.9);
		font-size: 14px;
		color: #111111;
		font-weight: 400;
		right: 0;
		top: 410px;
	}

	.index_content {
		top: 120px;
		position: absolute;
		width: 1400px;

		& p {
			width: 100%;
		}

		.title_1 {
			font-size: 50px;
			font-weight: bold;
			color: #1c1d1c;
			margin-bottom: 30px;
		}

		.title_2 {
			font-weight: 600;
			font-size: 24px;
			margin: 10px 0;
			color: #1c1d1c;
		}

		.title_3 {
			font-weight: bold;
			font-size: 24px;
			color: #1c1d1c;
			margin-top: 40px;
		}

		.index_list {
			width: 100%;
			display: flex;
			justify-content: flex-start;
			margin-top: 30px;
			font-size: 18px;
			color: #666666;

			& div {
				margin-right: 68px;
				width: 180px;
				justify-content: flex-start;
			}

			.index_round {
				display: block;
				width: 6px;
				height: 6px;
				background: #c5181f;
				border-radius: 50%;
				margin-right: 10px;
			}
		}

		.index_btn {
			width: 100%;
			display: flex;
			justify-content: flex-start;
			margin-top: 60px;

			.index_lend {
				width: 150px;
				height: 54px;
				background: #c5181f;
				border-radius: 5px;
				color: #ffffff;
				font-size: 18px;
				font-weight: 600;
				cursor: pointer;
			}

			.index_service {
				width: 150px;
				height: 54px;
				background: #ffffff;
				border-radius: 5px;
				color: #c5181f;
				font-size: 18px;
				font-weight: 600;
				margin-left: 20px;
				cursor: pointer;
			}
		}
	}

	.index_text {
		text-align: center;
		color: #666666;
		font-size: 14px;
		font-weight: 400;
	}

	.index_table {
		width: 1400px;
		align-items: flex-start;
		margin-top: 80px;

		.table_left {
			width: 860px;

			.table_p1 {
				width: 845px;
				height: 50px;
				background: #ffffff;
				justify-content: flex-start;
				padding-left: 15px;
				font-size: 14px;
				color: #333333;
				margin: 20px 0 50px 0;
			}

			.table_box {
				width: 100%;
				margin-top: 15px;

				.box_left {
					padding: 0 0 45px 0;
					background-color: #ffffff;
					.box_title {
						font-size: 18px;
						font-weight: 600;
						width: 420px;
						height: 53px;
						background: #c5181f;
						color: #ffffff;
						margin-bottom: 16px;
					}

					.box_text {
						width: 100%;
						font-weight: 600;
						font-size: 16px;
						padding: 0 20px;

						.box_p1 {
							color: #c5181f;
						}

						.box_p2 {
							font-size: 14px;
							color: #333333;
							padding-top: 11px;
							font-weight: 600;

							& > span {
								font-size: 12px;
								color: #333333;
								font-weight: 400;
							}
						}

						.box_list {
							width: 100%;
							justify-content: flex-start;
							margin-top: 13px;

							.box_red {
								width: 28px;
								height: 40px;
								background: #c5181f;
								border-radius: 1px;
								text-align: center;
								color: #ffffff;
								font-size: 14px;
								padding: 5px 9px;
							}

							.box_pink {
								justify-content: space-around;
								width: 334px;
								height: 50px;
								background: rgba(197, 24, 31, 0.05);
								border-radius: 1px;

								.box_item {
									justify-content: center;
									height: 100%;
									.span1 {
										font-size: 16px;
										color: #c5181f;
									}
									.span2 {
										color: #666666;
										font-size: 14px;
										// margin-top: 3px;
									}
								}
							}
						}
					}

					.index_line1 {
						width: 380px;
						border-top: 2px solid #e8e8e8;
						margin: 15px auto;
					}
				}

				.boxleft {
					margin-left: 20px;
				}

				.securities {
					width: 420px;
					height: 195px;
					background: rgba(197, 24, 31, 0.05);
					justify-content: center;
					margin-bottom: 15px;

					& .se_img {
						width: 70px;
						height: 70px;
					}

					& .se_p1 {
						color: #333333;
						font-weight: 600;
						font-size: 16px;
						margin-top: 18px;
					}

					& .se_p2 {
						color: #666666;
						font-weight: 400;
						font-size: 14px;
						margin-top: 12px;
					}
				}

				.othercolor {
					background-color: #f8f9fc;
				}
			}

			.table_box2 {
				flex-wrap: wrap;
				justify-content: space-between;
			}
		}

		.table_right {
			width: 500px;
			margin-left: 40px;
		}
	}

	.index_process {
		max-width: 1400px;
		width: 100%;
		margin-top: 45px;

		.index_process_content {
			background: #ffffff;
			height: 140px;
			width: 100%;
			margin-top: 15px;
			margin-bottom: 100px;
			justify-content: space-around;

			.process_img {
				& > img {
					width: 48px;
					height: 48px;
					margin-bottom: 16px;
				}

				& > p {
					font-size: 14px;
					color: #666666;
					font-weight: 600;
				}
			}

			.arrow {
				width: 65px;
				height: 28px;
			}
		}
	}

	.index_table2 {
		background: #ffffff;
		width: 100%;
	}
}

.infor_title {
	width: 1400px;
	margin: 100px 0 20px 0;

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

.index_prompt {
	padding: 40px;
	width: 1320px;
	height: 188px;
	background: #ffffff;
	box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.09);
	margin-bottom: 80px;

	& > div {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin-top: 26px;
		& span {
			width: 19px;
			height: 19px;
			display: inline-flex;
			justify-content: center;
			align-items: center;
			color: #ffffff;
			background: #c5181f;
			border-radius: 50%;
			font-size: 12px;
			margin-right: 8px;
		}
		& p {
			font-size: 14px;
			font-weight: 400;
			color: #666666;
			width: 95%;
		}
	}
}

.common_title {
	position: relative;
	width: 100%;
	justify-content: flex-start;
	color: #333333;
	font-size: 20px;
	font-weight: 600;

	& > span {
		width: 5px;
		height: 20px;
		background: #c5181f;
		border-radius: 3px;
		margin-right: 15px;
	}

	& p {
		right: 0;
		position: absolute;
		font-size: 14px;
		color: #333333;
		font-weight: 400;
		& .span_1 {
			font-weight: 600;
		}

		& .span_2 {
			font-size: 14px;
			color: #666666;
		}

		& > img {
			width: 16px;
			height: 16px;
		}
	}
}

// 出借意向
.index_intention {
	.intention_box {
		position: relative;
		width: 88%;
		height: 88%;
		max-width: 1200px;
		background: #f8f9fc;
		top: 40px;
		margin: auto;
		padding-top: 0.1px;
		display: flex;
		flex-direction: column;
		// overflow: auto;

		.in_close {
			cursor: pointer;
			position: absolute;
			top: 0;
			right: 0;
			width: 30px;
			height: 30px;
			margin: 30px;
		}

		.infor_title {
			width: 100%;
			margin-top: 60px;
			margin-bottom: 30px;
		}

		.infor_countdown {
			right: 65px;
			top: 33px;
			width: 30px;
			text-align: center;
			position: absolute;
			font-size: 18px;
			color: #999999;
			font-weight: 600;
		}
	}

	.newin_box {
		width: 700px;
		height: 550px;
		background: #ffffff;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		margin: auto;
		display: flex;
		flex-direction: column;
		align-items: center;

		.in_name {
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 14px;
			color: #666666;
			font-weight: 600;
			padding: 10px 0;

			.in_item {
				margin: 20px 0;
				.span_1 {
					width: 145px;
				}
				.span_2 {
					width: 450px;
					color: #333333;
					justify-content: flex-end;
					text-align: right;
				}
				.span_3 {
					color: #c5181f;
					margin-left: 5px;
				}
			}
		}

		.in_line {
			width: 660px;
			border-top: 2px solid #e8e8e8;
		}

		.in_btn {
			color: 18px;
			color: #ffffff;
			font-weight: 600;
			width: 150px;
			height: 54px;
			background: #c5181f;
			border-radius: 5px;
			margin-top: 18px;
			cursor: pointer;
		}
	}

	.in_prompt {
		width: 660px;
		height: 40px;
		background: rgba(197, 24, 31, 0.05);
		font-size: 14px;
		color: #666666;
	}
	.newin_success {
		width: 700px;
		height: 432px;
		background: #ffffff;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		margin: auto;
		display: flex;
		flex-direction: column;
		align-items: center;

		.in_success {
			width: 128px;
			height: 128px;
			margin: 80px 0 30px 0;
		}

		.in_text {
			font-size: 24px;
			font-weight: 600;
			color: #333333;
			margin-bottom: 46px;
		}
	}

	.securities_mess {
		margin: 0 auto;
		width: 1080px;
		padding: 30px 30px 10px 30px;
		background: #ffffff;
	}

	.liability {
		width: 1080px;
		height: 180px;
		padding: 30px;
		background: #ffffff;
		margin: 0 auto;
		margin-top: 20px;
		margin-bottom: 30px;

		.liab_text {
			font-size: 14px;
			color: #666666;
			line-height: 30px;
			margin-top: 20px;
			// text-align: justify;
		}
	}

	.lia_submit_btn {
		width: 150px;
		height: 54px;
		background: #c5181f;
		border-radius: 5px;
		margin: 0 auto;
		color: #ffffff;
		font-weight: 600;
		font-size: 18px;
		cursor: pointer;
	}

	.lia_submit_btn_line{
		margin-top: 50px;
		height: 1px;
		width: 100%;
	}
}

.bus_search {
	margin-top: 20px;
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	flex-direction: column;

	& span {
		font-weight: 600;
		font-size: 14px;
		color: #333333;
		margin-right:8px;
		display: flex;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.se_switch {
		justify-content: flex-start;
		height: 32px;
		align-items: center;

		& span {
			margin-left: 10px;
			color: #999999;
			font-size: 14px;
		}
	}

	.bus_input {
		width: 536px;
		height: 36px;
		background: #ffffff;
		border-radius: 4px;
		justify-content: flex-start;
		// border: 1px solid #e8e8e8;
	}
	.checked_box {
		display: flex;
		.checked {
			margin-right: 50px;
			cursor: pointer;
			align-items: flex-start;
			.checkeditem {
				width: 60px;
				height: 60px;
				background: #fff9f9;
				border-radius: 1px;
				border: 1px solid #e8e8e8;
				margin-left: 10px;
				justify-content: center;

				& .p1 {
					width: 100%;
					text-align: center;
					margin: 0;
					display: block;
					color: #c5181f;
					font-size: 16px;
					line-height: normal;
				}

				& .p2 {
					display: block;
					text-align: center;
					width: 100%;
					margin: 0;
					color: #666666;
					font-size: 14px;
					line-height: normal;
				}
			}

			.currchecked {
				border: 1px solid #c5181f;
			}
		}
	}
}

.input2 {
	justify-content: flex-start;

	& span {
		color: #999999;
		font-size: 14px;
		margin-left: 20px;
	}
}

.index_center {
	flex: 1;
	overflow: auto;
}

.two {
	align-items: flex-start;
}

.twocolor span {
	color: #666666;
	font-size: 14px;
	font-weight: 600;
}
.two_p2 {
	margin-left: 10px;
	color: #333333 !important;
}
</style>