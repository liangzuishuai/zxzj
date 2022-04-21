<template>
    <div>
        <topNav
            :navList="navList"
            :current="current"
            @change="changeNav"
        ></topNav>
        <div class="bgfff pd30 mb20">
            <div class="tabBtnNav">
                <span v-for="(item,index) in checkedList" :class="{current: index==checkType}" @click="changeCheck(index)" :key="index">{{item}}</span>
            </div>
            <el-row>
                <el-col :span="12">
                    <el-form size="small" :model="form" :rules="rules" ref="form" label-width="150px">
                            <!-- 表单 -->
                        <div class="bgfff pd30" style="padding-bottom:1px">
                            <el-form-item  label="证券代码" prop="StockCode" v-if="!isBasket" key="StockCode1">
                                <div class="zqBox">
                                    <el-input v-model="form.StockCode" autocomplete="off" placeholder="请输入证券代码" @change="getName" onkeyup="value=value.replace(/[^\w\.\/]/ig,'')">
                                        <template slot="suffix">{{form.StockName}}</template>
                                    </el-input>
                                </div>
                                
                            </el-form-item>
                            <el-form-item  label="篮子编号" prop="BasketNo" v-if="isBasket" key="BasketNo">
                                <el-input v-model="form.BasketNo" autocomplete="off" placeholder="请输入篮子编号" @change="getBokName" onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"></el-input>
                            </el-form-item>
                            <el-form-item  label="证券代码" prop="StockCode" v-if="isBasket" key="StockCode2">
                                <el-input v-model="form.StockCode" autocomplete="off" placeholder="请输入证券代码" :disabled="isdisable" onkeyup="value=value.replace(/[^\w\.\/]/ig,'')">
                                    <template slot="suffix">{{form.StockName}}</template>
                                </el-input>
                            </el-form-item>
                            <el-form-item  label="交易市场" prop="ExchangeType" v-if="!isBasket" key="ExchangeType">
                                <el-select v-model="form.ExchangeType" placeholder="请选择交易市场" style="width:100%" @blur="getRate" size="small">
                                    <el-option
                                    v-for="(item, index) in shichang"
                                    :key="index"
                                    :label="item.text"
                                    :value="item.type">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item  label="约定日期"  prop="dateString" key="dateString">
                                <el-date-picker
                                    v-model="form.dateString"
                                    value-format="yyyyMMdd"
                                    type="date"
                                    placeholder="选择约定日期"
                                    format="yyyy-MM-dd"
                                    :picker-options="pickerOptions"
                                    style="width:100%">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item  label="日期类型" prop="AppDateType" key="AppDateType">
                                <el-select v-model="form.AppDateType" placeholder="请选择日期类型" style="width:100%" size="small">
                                    <el-option
                                    v-for="(item, index) in riqileixing"
                                    :key="index"
                                    :label="item.text"
                                    :value="item.type">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item  label="约定模式" prop="BusiCode" key="BusiCode">
                                <el-select v-model="form.BusiCode" placeholder="请选择约定模式" style="width:100%" @change="getRate" size="small">
                                    <el-option
                                    v-for="(item, index) in yuedingCode"
                                    :key="index"
                                    :label="item.text"
                                    :value="item.type">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item  label="借入天数" prop="Term" key="Term">
                                <el-input v-model="form.Term" autocomplete="off" placeholder="请输入借入天数（天）" @blur="getRate"></el-input>
                                <p style="color: rgba(0, 0, 0, 0.45)">计息基数为起始日收盘价，合约起始日不允许归还 </p>
                            </el-form-item>
                            <el-form-item label="约定数量" prop="Qty"  v-if="!isBasket" key="Qty1">
                                <el-input placeholder="请输入约定数量（股）" @blur="getQty" v-model="form.Qty" onkeyup="this.value=this.value.replace(/\D|^0/g,'')" onafterpaste="this.value=this.value.replace(/\D|^0/g,'')" />
                            </el-form-item>
                            <el-form-item label="约定数量" prop="QTY"  v-if="isBasket" key="Qty2">
                                <el-input placeholder="请输入约定数量（份）"  v-model="QTY" disabled />
                            </el-form-item>
                            <el-form-item  label="约定融券费率报价">
                                <el-input v-model="form.FeeRate" disabled autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item  label="参与竞价">
                                <el-switch v-model="checked"></el-switch>
                            </el-form-item>
                            <el-form-item  label="约定融券费率竞价" v-if="checked">
                                <div class="rqfl">
                                    <div class="rateBox">
                                        <div class="min" @click="min">
                                            <i class="el-icon-minus"></i>
                                            <span>0.5</span>
                                        </div>
                                        <div class="center">
                                            <el-input @blur="getjingjia"  v-model="form.CustRate"  @input="(value) => {form.CustRate = formatDecimal(value)}" style="width:80px;"/> 
                                            <span class="rate">%</span>
                                        </div>
                                        <div class="max" @click="add">
                                            <i class="el-icon-plus"></i>
                                            <span>0.5</span>
                                        </div>
                                    </div>
                                    <span>竞价费率最小为{{ form.FeeRate }}</span>
                                </div>
                            </el-form-item>
                            <el-form-item  label="可用保证金">
                                <el-input v-model="balanceAndQuota.enableBailBalance" autocomplete="off" disabled></el-input>
                            </el-form-item>
                            <el-form-item  label="可用融券额度">
                                <el-input v-model="balanceAndQuota.sloEnableQuota" autocomplete="off" disabled></el-input>
                            </el-form-item>
                        </div>
                        <div v-if="checked"  class="message mb20" >提示： 违约金率{{ form.PostRate }} 提前归还费率：{{ form.CustRate + "%" }}/年</div>
                        <div v-else  class="message mb20" >违约金率{{ form.PostRate }} 提前归还费率：{{ form.PreRate }}/年</div>
                    </el-form>
                </el-col>
                <el-col :span="12">
                    <pubNote />
                </el-col>
            </el-row>
        </div>
        
        <div class="submitBox">
            <el-button class="submit_btn" @click="submitForm()">提交</el-button>
        </div>

        <!-- 委托明细确认 -->
        <mingxi ref="confirmModel" :editData="form" :loading="loading" @submit="confirmYq" mingxiSource="custom"></mingxi>
        <!-- 提交成功倒计时 -->
        <countdownModel ref="successModel" :isFail="isFail" :text="successText"></countdownModel>
    </div>
</template>

<script>
import topNav from "@/components/securities/topNav.vue";
import dictionary from "@/utils/dictionary";
import util from "@/utils/util.js";
import mingxi from "@/components/securities/mingxi.vue";
import countdownModel from "@/components/securities/countdownModel.vue";
import pubNote from "@/components/securities/pubNote.vue";
import { securitiesRequest } from '@/api/securities/securities';
import { mapState } from 'vuex'

export default {
    components: {
        topNav,
        mingxi,
        countdownModel,
        pubNote
    },
    data() {
        return {
            balanceAndQuota: {},
            isFail: false,
            dictionary,
            navList: ["借入委托", "委托查询", "委托导入", "委托定制"],
            navUrl:['entrustBorrow', 'entrustQuery','entrustImport','entrustCustom'],
            current: 0,
            checkedList:['个券','篮子'],
            checkType:0,
            yuedingCode: [
                { type: "110B", text: "T+0" },
                { type: "111B", text: "T+1" },
            ],
            riqileixing: [
                { type: "0", text: "仅当日有效" },
                { type: "1", text: "该日（含）前有效" },
            ],
            shichang: [
                { type: "1", text: "上海" },
                { type: "2", text: "深圳" },
            ],
            checked:false,
            form:{
                dateString: util.getNowFormatDate(),
                AppDateType: "0",
                ExchangeType: "",
                StockCode: "",
                BusiCode: "110B",
                Term: "",
                Qty: "",
                BasketNo: "",
                FeeRate: "",
                PostRate: "",
                PreRate: "",
                CustRate: 0,
                isBasket: false
            },
            QTY: "1",//篮子约定数量
            rules: {
                dateString: [
                { required: true, message: "请选择约定日期", trigger: "change" },
                ],
                AppDateType: [
                { required: true, message: "请选择日期类型", trigger: "change" },
                ],
                ExchangeType: [
                { required: true, message: "请选择交易市场", trigger: "change" },
                ],
                StockCode: [
                { required: true, message: "请输入证券代码", trigger: "change" },
                ],
                BusiCode: [
                { required: true, message: "请选择约定模式", trigger: "change" },
                ],
                Term: [
                {
                    required: true,
                    message: "请输入借入天数（天）",
                    trigger: "change",
                },
                ],
                Qty: [
                {
                    required: true,
                    message: "请输入约定数量（股）",
                    trigger: "change",
                },
                ],
                BasketNo: [
                { required: true, message: "请输入篮子编号", trigger: "change" },
                ],
                
            },
            //日期禁止选择今天之前的
            pickerOptions:{
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                },
            },
            loading:false, //提交按钮防重loading
            isdisable: false,
            successText:'',
        };
    },
    created() {
        this.getBalanceAndQuota()
    },
    mounted(){
        
    },
    computed: {
        ...mapState(['fundAccount']),
        isBasket(){// tab选择篮子
            return this.checkType === 1
        }
    },
    methods: {
        formatDecimal(value){
            return util.formatDecimal(value, 2)
        },
        submitForm(){
            this.form.isBasket = this.isBasket
            if(this.checkType==1){
                this.form.Qty = this.QTY
            }
            this.form.checked = this.checked
            this.$refs.form.validate((valid) => {
                if (valid) {
                    if(!this.form.FeeRate){
                        this.$message.info('请先查询费率！')
                        return
                    }
                    this.$refs.confirmModel.showModel();
                } else {
                    return false;
                }
            });
        },
        //确认委托
        confirmYq(e){
            this.loading = true
            const { isBasket, form: { 
                ExchangeType, 
                BusiCode, 
                StockCode,
                AppDateType,
                dateString,
                Term,
                Qty,
                FeeRate,
                PreRate,
                PostRate,
                CustRate,
                BasketNo
            } } = this
            const params = {
                RouteID: "W",
                OpStation: "127.0.0.1",
                OperatorID: this.fundAccount,
                FundAccount: this.fundAccount,
                StockCode: StockCode,
                CurrDate: util.getNowFormatDate(),
                AppDateType: AppDateType,
                // StartDate: dateString,
                AppDate: dateString,
                Term,
                Qty,
                AppRate: parseFloat(FeeRate),
                PreRate: parseFloat(PreRate),
                PostRate: parseFloat(PostRate),
            }

            if(isBasket){
                params.BasketProp = 1
                params.BasketType = 0
                params.BasketNo = BasketNo
            }else {
                params.BasketProp = 0
                params.ExchangeType = ExchangeType
                params.BusiCode = BusiCode
            }

            if (this.checked == true) {
                params.BidFlag = 1;
                params.CustRate = CustRate;
                params.PreRate = CustRate;
            } else if (this.checked == false) {
                params.BidFlag = 0;
                params.PreRate = parseFloat(PreRate);
            }

             if (this.form.BusiCode == "110B") {
                params.TradeType = 0;
            } else if (this.form.BusiCode == "111B") {
                params.TradeType = 1;
            }

            securitiesRequest(params, 104).then((res) => {
                this.loading = false;
                this.resetForm()
                this.$refs.confirmModel.closeModel()
                //提交成功后提示
                this.isFail = false
                this.successText = '您的委托单已提交成功啦！'
                this.$refs.successModel.showModel()
                this.form.stockName = ''
            }).catch(err => {
                this.loading = false
                this.isFail = true
                this.$refs.confirmModel.closeModel()
                this.successText = '您的委托单提交失败啦！'
                this.form.stockName = ''
                this.$refs.successModel.showModel()
            })
        },
        changeNav(index) {
            this.$router.push({name:this.navUrl[index]})
        },
        changeCheck(index){
            this.checkType = index
            this.$nextTick(() => {
                this.resetForm()
            })
        },
        getQty(){
            if (this.form.Qty % 100 === 0) {
                console.log(this.form.Qty % 100 === 0);
            } else {
                this.$message("约定数量必须是100的倍数");
                this.form.Qty = "";
            }
        },
        getjingjia(){
            if (this.form.CustRate < parseFloat(this.form.FeeRate)) {
                this.$message.info('竞价费率不得小于'+ (this.form.FeeRate))
                this.form.CustRate = parseFloat(this.form.FeeRate);
            }else if(this.form.CustRate >= 100){
                this.$message.info('竞价费率不得大于100%！')
                this.form.CustRate = 100
            }
        },
        add: function () {
            let { CustRate, FeeRate } = this.form
            FeeRate = FeeRate || 0
            CustRate = CustRate || 0
            if (CustRate >= 100) {
                this.$message.info(
                "融券费率" +
                    FeeRate +
                    "竞价费率" +
                    FeeRate +
                    "不得超出" +
                    "100.00%"
                );
                return;
            }
            this.form.CustRate = util.Add(parseFloat(CustRate), 0.5);
        },
        min: function () {
            let { CustRate, FeeRate } = this.form
            FeeRate = FeeRate || '0'
            
            if (parseFloat(CustRate) <= parseFloat(FeeRate)) {
                this.$message.info(
                "融券费率" +
                    FeeRate +
                    "竞价费率" +
                    CustRate +
                    "%不得低于" +
                    FeeRate
                );
                return;
            }
            CustRate = util.Minus(parseFloat(CustRate), 0.5);
            if (parseFloat(CustRate) <= parseFloat(FeeRate)) {
                CustRate = parseFloat(FeeRate);
            }
            this.form.CustRate = CustRate;
        },
        // 查询约定融券费率报价
        getRate() {
            const { form, isBasket} = this
            const { Term, BusiCode, ExchangeType, StockCode } = form

            if(!Term || !BusiCode || (!ExchangeType && !isBasket) || !StockCode){ return false }
            if (this.form.Term < 2) {
                this.$message.info("借入天数不能小于2天");
                this.form.Term = 2;
                
            } else if (this.form.Term > 182) {
                this.$message.info("借入天数不能大于182天");
                this.form.Term = 182;
            } 
            var params = {
                BusiCode: BusiCode, //业务类型
                TermInDays: this.form.Term,
                StockCode: StockCode,
                FundAccount: this.fundAccount,
            }

            if(this.isBasket){ // 篮子参数
                params.PricingType = 'Basket'
                params.ExchangeType = 'B3'
            } else { // 个券参数
                params.PricingType = 'stock'
                params.ExchangeType = ExchangeType
            }

            securitiesRequest(params, 115).then((res) => {
                const data = res.data[0];
                this.form.FeeRate = data.FeeRate.toFixed(2) + "%";
                this.form.PostRate = data.PostRate.toFixed(2) + "%";
                this.form.PreRate = data.PreRate.toFixed(2) + "%";
                this.form.CustRate = data.FeeRate;
            }).catch(() => {
                this.form.FeeRate = '';
                this.form.PostRate = '';
                this.form.PreRate = '';
                this.form.CustRate = '';
            })
        },
        // 查询证券名称 - 个券
        getName() {
            this.form.StockName = ''
            const StockCode = this.form.StockCode
            if (!StockCode){ return }
            const params = {
                FundAccount: this.fundAccount,
                QueryMode: 0,
                StockCode: StockCode
            };
            this.getNameRequest(params, 101).then((res) => {
                this.form.StockCode = params.StockCode
                 if( res.recordNum > 0){
                     const data = res.data[0]
                    this.form.StockName = data.StockName;
                    this.form.ExchangeType = data.ExchangeType;
                    this.isdisable = true
                }else {
                    this.isdisable = false
                    this.$message("未查询到该个券信息")
                    this.form.StockCode = ''
                }
            }) 
        },
        // 查询证券名称 - 篮子
        getBokName() {
            const BasketNo = this.form.BasketNo
            if (!BasketNo) {
                this.isdisable = false
                this.form.StockCode = ''
                return
            }
            var params = {
                RouteID: "W",
                FundAccount: this.fundAccount, //资金帐号
                OperatorID: this.fundAccount,
                QueryMode: 1,
                ACTION_IN: 0,
                BasketNo: BasketNo,
            };
            this.getNameRequest(params, 113).then((res) => {
                this.form.BasketNo = params.BasketNo
                if( res.recordNum > 0){
                    const data = res.data[0]
                    this.form.StockName = data.StockName;
                    this.form.StockCode = data.StockCode;
                    this.isdisable = true
                }else {
                    this.form.StockName = ''
                    this.form.BasketNo = ''
                    this.$message("未查询到该篮子信息")
                    this.isdisable = false
                }
            }) 
        },
        // 查询证券名称 - 接口
        getNameRequest(params, code) {
            return securitiesRequest(params, code).then((res) => {
                this.resetForm()
                if (res.recordNum > 0) {
                    const data = res.data[0]
                    this.form.stockName = data.StockName
                    this.form.StockCode = data.StockCode
                }
                this.checked = false
                return res
            })
        },
        // 重置表单
        resetForm(){
            this.$refs.form.resetFields();
            // this.form = {
            //     dateString: util.getNowFormatDate(),
            //     AppDateType: "0",
            //     ExchangeType: "",
            //     StockCode: "",
            //     BusiCode: "110B",
            //     Term: "",
            //     Qty: "",
            //     BasketNo: "",
            //     FeeRate: "",
            //     PostRate: "",
            //     PreRate: "",
            //     CustRate: 0,
            //     isBasket: false
            // }
            this.checked = false
        },
        // 获取可用保证金和可用融券额度
        getBalanceAndQuota(){
            securitiesRequest({
                FundAccount: this.fundAccount
            }, 130).then((res) => {
                this.balanceAndQuota = res.data
            })
        },

    },
};
</script>

<style scoped>

.tabBtnNav{
    display: flex;
    align-items: center;
    padding: 15px 0 30px;
}
.tabBtnNav span{
    cursor: pointer;
    width: 100px;
    height: 40px;
    line-height: 40px;
    background: #FFFFFF;
    border-radius: 25px;
    border: 1px solid #E8E8E8;
    margin-right: 10px;
    font-size: 16px;
    text-align: center;
}
.tabBtnNav span.current{
    background: rgba(197, 24, 31, 0.05);
    color: #C5181F;
}
 /deep/ .el-form-item__label{color: #333;}
    /deep/ .flex_item .el-form-item__content{
        display: flex;
    }
    .flex_item .el-form-item__content .el-input{
        flex: 1;
        margin-right: 15px;
    }
    .rateBox{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 260px;
        height: 36px;
        background: #FFFFFF;
        border-radius: 4px;
        border: 1px solid #E8E8E8;
    }
    .rateBox .min,.rateBox .max{
        display: flex;
        width: 73px;
        align-items: center;
        height: 34px;
        text-align: center;
        color: #C5181F;
        justify-content: center;
        position: relative;
        cursor: pointer;
    }
    .rateBox .min span,.rateBox .max span{
        margin: 0 5px;
    }
    .rateBox .min::before,.rateBox .max::before{
        content: '';
        position: absolute;
        width: 1px;
        height: 16px;
        background: #E8E8E8;
        top: calc(50% - 8px);
    }
    .rateBox .min::before{right: 0;}
    .rateBox .max::before{left: 0;}
    /deep/ .rateBox .el-input__inner{
        border: 0;
    }
    .rate{
        width: 40px;
        text-align: center;
    }
    .message{
        width: 100%;
        height: 40px;
        font-size: 14px;
        font-weight: 400;
        color: #666666;
        line-height: 40px;
        padding: 0 30px;
        box-sizing: border-box;
        background: rgba(197, 24, 31, 0.05);
    }
   
    .submitBox{
        padding: 30px 0;
    }
    .submit_btn{
        display: block;
        width: 150px;
        height: 54px;
        background: #C5181F;
        border-radius: 5px;
        font-size: 18px;
        color: #FFFFFF;
        margin: 0 auto;
    }
    .rqfl{
        display: flex;
        align-items: center;
    }
    .rqfl>span{
        color: #999999;
        margin-left: 15px;
    }
    /deep/.el-input__suffix{
        right: 15px;
    }
</style>
