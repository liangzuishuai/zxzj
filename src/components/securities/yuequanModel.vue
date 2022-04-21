<template>
    <div>
        <selfModel :visible="visible" width="1200" :title="editData.isBasket ? '篮子' : '个券'" background="#F8F9FC" @close="closeModel">
            <div class="yuequanModel" slot="modelContent">
                <el-form ref="form" size="small"  :model="form" :rules="rules"  label-width="150px" >
                    <el-row class="bgfff pd30" >
                        <el-col :span="12">
                            <!-- 表单 -->
                            <div style="padding-bottom:1px">
                                <el-form-item  label="证券代码">
                                    <div class="zqBox">
                                        <el-input v-model="editData.StockCode" autocomplete="off" disabled></el-input>
                                        <span class="zqmc">{{editData.StockName}}</span>
                                    </div>
                                </el-form-item>
                                <el-form-item  label="篮子编号" v-if="editData.isBasket">
                                    <el-input v-model="editData.BasketNo" autocomplete="off" disabled></el-input>
                                </el-form-item>
                                <el-form-item  label="股东账号" v-else>
                                    <el-input v-model="editData.stockAccount" autocomplete="off" disabled></el-input>
                                </el-form-item>
                                <el-form-item  label="约定日期"  prop="dateString">
                                    <el-date-picker
                                        v-model="form.dateString"
                                        type="date"
                                        placeholder="选择约定日期"
                                        format="yyyy-MM-dd"
                                        :picker-options="pickerOptions"
                                        style="width:100%">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item  label="日期类型" prop="AppDateType">
                                    <el-select v-model="form.AppDateType" placeholder="请选择日期类型" style="width:100%">
                                        <el-option
                                        v-for="(item, index) in riqileixing"
                                        :key="index"
                                        :label="item.text"
                                        :value="item.type">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item  label="约定模式">
                                    <el-select v-model="editData.BusiCode" placeholder="请选择约定模式" style="width:100%" disabled>
                                        <el-option
                                        v-for="(item, index) in yuedingCode"
                                        :key="index"
                                        :label="item.text"
                                        :value="item.type">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item  label="借入天数" help="计息基数为起始日收盘价，合约起始日不允许归还">
                                    <el-input v-if="editData.MaxTerm == null" v-model="editData.Term" autocomplete="off" disabled placeholder="请输入借入天数（天）"></el-input>
                                    <el-input v-else v-model="editData.MaxTerm" autocomplete="off" disabled placeholder="请输入借入天数（天）"></el-input>
                                </el-form-item>
                                <el-form-item label="约定数量" class="flex_item" v-if="editData.isBasket">
                                    <el-input v-model="editData.Qty" disabled />
                                    <p style="color: rgba(0, 0, 0, 0.45)">可约定数量：{{ editData.Qty }}</p>
                                </el-form-item>
                                <el-form-item label="约定数量" prop="Qty" class="flex_item" v-else>
                                    <el-input placeholder="请输入约定数量（股）" @blur="getQty" v-model="form.Qty" onkeyup="this.value=this.value.replace(/\D|^0/g,'')" onafterpaste="this.value=this.value.replace(/\D|^0/g,'')" />
                                    <p style="color: rgba(0, 0, 0, 0.45)">可约定数量：{{ editData.Qty }}</p>
                                </el-form-item>
                                <el-form-item  label="约定融券费率报价">
                                    <el-input v-model="editData.FeeRate" autocomplete="off" disabled></el-input>
                                </el-form-item>
                                <el-form-item  label="参与竞价">
                                    <el-switch v-model="checked" @change="changechecked"></el-switch>
                                </el-form-item>
                                <el-form-item  label="约定融券费率竞价" v-if="checked">
                                    <div class="rqfl">
                                        <div class="rateBox">
                                            <div class="min" @click="min">
                                                <i class="el-icon-minus"></i>
                                                <span>0.5</span>
                                            </div>
                                            <div class="center">
                                                <el-input @blur="getjingjia"  v-model="editData.CustRate"  @input="(value) => {editData.CustRate = formatDecimal(value)}"  style="width:80px;"/> 
                                                <span class="rate">%</span>
                                            </div>
                                            <div class="max" @click="add">
                                                <i class="el-icon-plus"></i>
                                                <span>0.5</span>
                                            </div>
                                        </div>
                                        <span>竞价费率最小为{{ editData.FeeRate }}</span>
                                    </div>
                                </el-form-item>
                                <el-form-item  label="可用保证金">
                                    <el-input v-model="balanceAndQuota.enableBailBalance" autocomplete="off" disabled></el-input>
                                </el-form-item>
                                <el-form-item  label="可用融券额度">
                                    <el-input v-model="balanceAndQuota.sloEnableQuota" autocomplete="off" disabled></el-input>
                                </el-form-item>
                            </div>
                            <div v-if="checked"  class="message mb20" >提示： 违约金率{{ editData.PostRate }} 提前归还费率：{{ editData.CustRate + "%" }}/年</div>
                            <div v-else  class="message mb20" >提示：违约金率{{ editData.PostRate }} 提前归还费率：{{ editData.PreRate }}/年</div>
                        </el-col>
                        <el-col :span="12">
                            <pubNote />
                        </el-col>
                    </el-row>
                  
                    <div class="submitBox">
                        <el-button class="submit_btn" :loading="loading" @click="submitForm()">提交</el-button>
                    </div>
                </el-form>
            </div>
        </selfModel>
    </div>
</template>

<script>
import selfModel from "@/components/selfModel/selfModel.vue";
import pubNote from "@/components/securities/pubNote.vue";
import util from "@/utils/util";
import moment from "moment";
import { securitiesRequest } from '@/api/securities/securities';
import { mapState } from 'vuex'
export default {
    components:{
        selfModel,
        pubNote
    },
    props:{
        'loading':{},
        'editData':{
            type: Object,
            default: () => ({
                StockCode:'',
                stockAccount:'',
                dateString:'',
                PostRate:0,
                FeeRate:0,
                PreRate:0,
                Qty:0
            })
        }

    },
    data(){
        return {
            balanceAndQuota: {},
            visible:false,
            checked:false,
            form:{
                dateString: util.getNowFormatDate(),
                AppDateType: "0",
                Qty:''
            },
            yuedingCode: [
                { type: "110B", text: "T+0" },
                { type: "111B", text: "T+1" },
            ],
            riqileixing: [
                { type: "0", text: "仅当日有效" },
                { type: "1", text: "该日（含）前有效" },
            ],
            rules: {
                dateString: [
                { required: true, message: "请选择约定日期", trigger: "change" },
                ],
                AppDateType: [
                { required: true, message: "请选择日期类型", trigger: "change" },
                ],
                Qty: [{ required: true, message: "请输入约定数量", trigger: "change" }],
            },
            pickerOptions:{
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                },
            },
        }
    },
    computed: {
        ...mapState(['fundAccount'])
    },
    created(){
        this.getBalanceAndQuota()
    },
    methods: {
        formatDecimal(value){
            return util.formatDecimal(value, 2)
        },
        changechecked(e){
            this.checked = e
        },
        showModel(){
            this.visible = true
        },
        closeModel(){
            this.visible = false
        },
        submitForm(){
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.form.dateString = moment(this.form.dateString).format('YYYY-MM-DD')
                    this.form.checked = this.checked
                    this.$emit("submitForm",this.form)
                } else {
                    return false;
                }
            });
        },
        resetForm() {
            this.$nextTick(()=>{
                this.form = {
                    dateString: moment(new Date()).format('YYYY-MM-DD'),
                    AppDateType: "0",
                    Qty:''
                }
                this.$refs.form.resetFields()
            })
        },
        getQty(){
            if (this.form.Qty % 100 === 0) {
                // console.log(this.form.Qty % 100 === 0);
            } else {
                this.$message("约定数量必须是100的倍数");
                this.form.Qty = "";
            }
        },
        getjingjia(){
            if (this.editData.CustRate < parseFloat(this.editData.FeeRate)) {
                this.$message.info('竞价费率不得小于'+ (this.editData.FeeRate))
                this.editData.CustRate = parseFloat(this.editData.FeeRate);
            }else if(this.editData.CustRate >= 100){
                this.$message.info('竞价费率不得大于100%！')
                this.editData.CustRate = 100
            }
        },
        
        add: function () {
            if (this.editData.CustRate >= 100) {
                this.$message(
                "融券费率" +
                    this.editData.FeeRate +
                    "竞价费率" +
                    this.editData.FeeRate +
                    "不得超出" +
                    "100.00%"
                );
                return;
            }
            this.editData.CustRate = util.Add(parseFloat(this.editData.CustRate), 0.50);
        },
        // min: function () {
        //     if (this.editData.CustRate <= parseFloat(this.editData.FeeRate)) {
        //         this.$message(
        //         "融券费率" +
        //             this.editData.FeeRate +
        //             "竞价费率" +
        //             this.editData.FeeRate +
        //             "不得低于" +
        //             this.editData.FeeRate
        //         );
        //         return;
        //     }
        //     console.log(util.Minus(this.editData.CustRate, 0.50))
        //     this.editData.CustRate  = util.Minus(this.editData.CustRate, 0.50);
        //     if (this.editData.CustRate <= this.editData.FeeRate) {
        //         this.editData.CustRate = parseFloat(this.editData.FeeRate);
        //     }
        // },
        min: function () {
            let { CustRate, FeeRate } = this.editData
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
            this.editData.CustRate = CustRate;
        },
        // 获取可用保证金和可用融券额度
        getBalanceAndQuota(){
            securitiesRequest({
                FundAccount: this.fundAccount
            }, 130).then((res) => {
                this.balanceAndQuota = res.data
            })
        },
    }   
}
</script>
<style scoped>
    .pd30{padding: 30px;}
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
        margin: 0 auto;
        width: 150px;
        height: 54px;
        background: #C5181F;
        border-radius: 5px;
        font-size: 18px;
        color: #FFFFFF;
    }
    .rqfl{
        /* display: flex;
        align-items: center; */
    }
    .rqfl>span{
        color: #999999;
        /* margin-left: 15px; */
    }
    .zqBox{
        position: relative;
    }
    .zqmc{
        position: absolute;
        left: 80px;
        top: 50%;
        transform: translateY(-50%);
        color: #C0C4CC;
    }
</style>

