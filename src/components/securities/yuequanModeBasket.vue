<template>
    <!-- 未使用 -->
    <div>
        <selfModel :visible="visible" width="1200" title="篮子" background="#F8F9FC" @close="closeModel">
            <div class="yuequanModel" slot="modelContent">
                <el-form size="small" :model="form" :rules="rules" ref="form" label-width="150px">
                    <!-- 表单 -->
                    <div class="bgfff pd30" style="padding-bottom:1px">
                        <el-form-item  label="证券代码">
                            <el-input v-model="editData.StockCode" autocomplete="off" disabled></el-input>
                        </el-form-item>
                        <el-form-item  label="篮子编号">
                            <el-input v-model="editData.BasketNo" autocomplete="off" disabled></el-input>
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
                            <el-select v-model="form.BusiCode" placeholder="请选择约定模式" style="width:100%" disabled>
                                <el-option
                                v-for="(item, index) in yuedingCode"
                                :key="index"
                                :label="item.text"
                                :value="item.type">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item  label="借入天数" help="计息基数为起始日收盘价，合约起始日不允许归还">
                            <el-input v-if="form.MaxTerm == null" v-model="form.Term" autocomplete="off" disabled placeholder="请输入借入天数（天）"></el-input>
                            <el-input v-else v-model="form.MaxTerm" autocomplete="off" disabled placeholder="请输入借入天数（天）"></el-input>
                        </el-form-item>
                        <el-form-item label="约定数量" prop="Qty" class="flex_item">
                            <el-input placeholder="请输入约定数量（股）" @blur="getQty" v-model="form.Qty" onkeyup="this.value=this.value.replace(/\D|^0/g,'')" onafterpaste="this.value=this.value.replace(/\D|^0/g,'')" />
                            <p style="color: rgba(0, 0, 0, 0.45)">可约定数量：{{ editData.Qty }}</p>
                        </el-form-item>
                        <el-form-item  label="约定融券费率报价">
                            <el-input v-model="editData.FeeRate" autocomplete="off" disabled></el-input>
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
                                        <el-input @blur="getjingjia"  v-model="form.CustRate"  onkeyup="this.value=this.value.replace(/\D|^0/g,'')"
                                        onafterpaste="this.value=this.value.replace(/\D|^0/g,'')" style="width:80px;"/> 
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
                    </div>
                    <div v-if="checked"  class="message mb20" >提示： 违约金率{{ editData.PostRate }} 提前归还费率：{{ form.CustRate + "%" }}/年</div>
                    <div v-else  class="message mb20" >违约金率{{ editData.PostRate }} 提前归还费率：{{ editData.PreRate }}/年</div>
                    <div class="bgfff pd30">
                        <div class="common_title j_c_a_i">
                            <span></span>
                            投资者请注意
                        </div>
                        <ul class="attentionList">
                            <li><span>1</span><p>因融券交易受诸多风险控制措施及参教指标限制，约定融券请入的证券可能无法全部卖出，请投资者关注信用账户的各项参教指标，避免约定融券借入证券后无法卖出情况。</p></li>
                            <li><span>2</span><p>该界面显示的约定融券费率适用于拥有约定融券资格的客户进行约定融券借入时的费率。</p></li>
                            <li><span>3</span><p>约定融券借入申请一经下单，未经本公司同意，不得撤销。</p></li>
                            <li><span>4</span><p>系统所展示的券单是历史确定性相对较高的券，最终是否能成功借到，以成交分配后所形成的约定合约为准。</p></li>
                            <li><span>5</span><p>竞价约定融券费率是投资者在我公司报价基础上自愿提高的费率报价，若约定融券借入竞价成功，则以该竞价价费率为准，且提前归还费率与竞价约定融券费率一致。</p></li>
                            <li><span>6</span><p>日期类型为【该日（含）前有效】的约定融券委托（竞价约券委托除外），有效期内将每日按照系统定价更新约券费率。</p></li>
                        </ul>
                    </div>
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
import moment from "moment";
export default {
    components:{
        selfModel
    },
    props:{
        'loading':{},
        'editData':{
            type: Object,
            default: () => ({
                StockCode:'',
                BasketNo:'',
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
            visible:false,
            checked:true,
            form:{
                CustRate:0,
            },
            yuedingCode: [
                { type: "110B", text: "库存T+0" },
                { type: "111B", text: "预约T+1" },
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
    methods: {
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
                    this.$emit("submitForm",this.form)
                } else {
                    return false;
                }
            });
        },
        resetForm() {
            this.$refs.form.resetFields();
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
            if (this.form.CustRate < this.editData.FeeRate) {
                this.$message.info('竞价费率不得小于'+ (this.editData.FeeRate) +'%')
                this.form.CustRate = this.editData.FeeRate
            }else if(this.form.CustRate >= 100){
                this.$message.info('竞价费率不得大于100%！')
                this.form.CustRate = 100
            }
        },
        
        add: function () {
            if (this.form.CustRate >= "100") {
                this.$message(
                "融券费率" +
                    this.FeeRate +
                    "竞价费率" +
                    this.FeeRate +
                    "不得超出" +
                    "100.00%"
                );
                return;
            }
            this.form.CustRate = this.form.CustRate + 0.50;
        },
        min: function () {
            if (this.form.CustRate <= this.editData.FeeRate) {
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
            this.form.CustRate  = this.form.CustRate - 0.50;
            if (this.form.CustRate <= this.editData.FeeRate) {
                this.form.CustRate = this.editData.FeeRate;
            }
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
    .attentionList{
        margin-top: 30px;
    }
    .attentionList li{
        display: flex;
        color: #666666;
        line-height: 30px;
        margin-bottom: 10px;
    }
    .attentionList li span{
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #fff;
        font-size: 16px;
        border-radius: 50%;
        margin-right: 10px;
        background: #C5181F;
        margin-top: 5px;
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
        display: flex;
        align-items: center;
    }
    .rqfl>span{
        color: #999999;
        margin-left: 15px;
    }
</style>

