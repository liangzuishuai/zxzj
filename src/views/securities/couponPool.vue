<template>
    <div>
        <topNav
            :navList="navList"
            :current="current"
            @change="changeNav"
        ></topNav>
        <div class="bgfff p30 mb20" v-if="current !=2">
            <div class="bus_query">
                <div class="common_title j_c_a_i">
                    <span></span>
                    {{ navList[current] }}查询
                </div>
                <div class="searchForm">
                    <el-form ref="form" :model="form" :inline="true">
                        <el-form-item label="交易市场">
                            <el-select
                                v-model="form.ExchangeType"
                                style="width: 140px"
                            >
                                <el-option
                                    v-for="item in shichangCode"
                                    :label="item.text"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="股票代码">
                            <el-input
                                v-model="form.StockCode"
                                style="width: 110px"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="约定模式">
                            <el-select
                                v-model="form.BusiCode"
                                style="width: 140px"
                            >
                                <el-option
                                    v-for="item in yuedingCode"
                                    :label="item.text"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="最小期限">
                            <el-input-number
                                v-model="form.MinTerm"
                                style="width: 110px"
                                :min="2"
                                :max="182"
                                :controls="false"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item label="最大期限">
                            <el-input-number
                                v-model="form.Term"
                                style="width: 110px"
                                :min="2"
                                :max="182"
                                :controls="false"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSearch" 
                                >查询</el-button
                            >
                            <el-button @click="clearForm" >重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
        <div class="bgfff">
            <div class="common_title j_c_a_i pd30">
                <span></span>
                {{ navList[current] }}列表
            </div>
            <!-- 个券 -->
            <tableModel 
                v-if="current==0" 
                ref="personalCoupons" 
                keyStr="personalCoupons"
                :tableData="personCouponsData" 
                :tableDetailData="couponsDetailData"
                @scrollBottom="getCoupons"
                @showModel="showModel"
                @rowClick="clickCouponsRow"
            ></tableModel>
            <!-- 推荐券 -->
            <tableModel 
                v-if="current==1" 
                ref="recommendCoupons" 
                keyStr="recommendCoupons" 
                :tableData="recommendCouponsData" 
                :tableDetailData="couponsDetailData"
                @scrollBottom="getCoupons"
                @showModel="showModel"
                @rowClick="clickCouponsRow"
            ></tableModel>
            <!-- 篮子 -->
            <tableModel 
                v-if="current==2" 
                ref="basket" 
                keyStr="basket" 
                :tableData="basketData" 
                :tableDetailData="couponsDetailData"
                @scrollBottom="getCoupons"
                @showModel="showModel2"
                @rowClick="clickBasketRow"
                :fareWayFixed="true"
            >
                <template slot="leftTable">
                    <el-table-column prop="BasketNo" align="center" label="篮子代码"  fixed></el-table-column>
                    <el-table-column prop="StockName" align="center" label="篮子名称"></el-table-column>
                    <el-table-column prop="BasketExid" align="center" label="跟踪指数交易市场">
                        <template slot-scope="scope">
                            {{shichang[scope.row.BasketExid] }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="BasketRelveCode" align="center" label="跟踪指数证券代码">
                        <template slot-scope="scope">
                            {{ scope.row.BasketRelveCode  ? scope.row.BasketRelveCode.substring(0, 9) : "--" }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="BasketRelveName" align="center" label="跟踪指数证券名称">
                        <template slot-scope="scope">
                            {{ scope.row.BasketRelveName  ? scope.row.BasketRelveName.substring(0, 9) : "--" }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="MarketValue" align="center" label="篮子市值"></el-table-column>
                    <el-table-column prop="Term" align="center" label="期限"></el-table-column>
                </template>

                <template slot="rightTable">
                    <el-table-column prop="BasketNo" align="center" label="篮子代码"></el-table-column>
                    <el-table-column prop="BasketExid" align="center" label="市场代码"></el-table-column>
                    <el-table-column prop="StockCode" align="center" label="证券代码"></el-table-column>
                    <el-table-column prop="StockName" align="center" label="证券名称"></el-table-column>
                    <el-table-column prop="Qty" align="center" label="权重数量"></el-table-column>
                </template>
            </tableModel>
        </div>
        <!-- ---------------------约券----------------------- -->
        <!-- 个券弹窗 -->
        <yuequanModel ref="yuequanModel" :editData="editData" :loading="loading" @submitForm="submitYq"></yuequanModel>
        <!-- 委托明细确认 -->
        <mingxi ref="confirmModel" :editData="editData"  :loading="loading" @submit="confirmYq"></mingxi>
        <!-- 提交成功倒计时 -->
        <countdownModel ref="successModel" :isFail="isFail" :text="successText"></countdownModel>

        
    </div>
</template>

<script>
import topNav from "@/components/securities/topNav.vue";
import dictionary from "@/utils/dictionary";
import util from "@/utils/util.js";
import yuequanModel from "@/components/securities/yuequanModel.vue";
import tableModel from "@/components/securities/couponPool/tableModel.vue";
import mingxi from "@/components/securities/mingxi.vue";
import countdownModel from "@/components/securities/countdownModel.vue";
import { securitiesRequest } from '@/api/securities/securities';
import { mapState } from 'vuex'

function getDefaultForm(){
    return {
        ExchangeType: "",
        StockCode: "",
        BusiCode: "",
        MinTerm: "2",
        Term: "182",
    }
}
export default {
    components: {
        topNav,
        yuequanModel,
        mingxi,
        countdownModel,
        tableModel
    },
    data() {
        return {
            isFail: false,
            dictionary,
            navList: ["个券", "推荐券", "篮子"],
            current: 0, 
            shichang: {
                B1: "上海",
                B2: "深圳",
                B3: "跨市场",
            },
            shichangCode: [
                { value: "", text: "全部" },
                { value: "1", text: "上海" },
                { value: "2", text: "深圳" },
            ],
            yuedingCode: [
                { value: "", text: "全部" },
                { value: "110B", text: "T+0" },
                { value: "111B", text: "T+1" },
            ],
            form: {
                ExchangeType: "",
                StockCode: "",
                BusiCode: "",
                MinTerm: "2",
                Term: "182",
            },
            defailtForm: {
                ExchangeType: "",
                StockCode: "",
                BusiCode: "",
                MinTerm: "2",
                Term: "182",
            },
            // 劵池、详情、约券
            pageSize: 50,
            page: 1,
            couponsDictorye: [
                [101, 'personCouponsData', 'personalCoupons'], // 个券
                [103, 'recommendCouponsData', 'recommendCoupons'], // 推荐劵
                [113, 'basketData', 'basket'] // 篮子
            ],
            personCouponsData:[
            ],
            couponsDetailData: [],
            recommendCouponsData:[],
            basketData:[],
            hoverData:[
            ],
            showDetail:false,
            tableRowIndex:'',
            editData:{},//约券传入的值
            loading:false, //表单提交加载
            confirmData:{
            },
            successText:''
        };
    },
    created() {
        this.getCoupons();
    },
    computed: {
        ...mapState(['fundAccount']),
        tableRef(){
            return this.couponsDictorye[this.current][2]
        },
        isBasket(){
            return this.current === 2;
        }
    },
    mounted(){
        // this.personCouponsScroll();
    },
    methods: {
        // 获取劵池数据 101 个券、 103推荐劵、 113篮子
        getCoupons(){
            const [ code, couponDataName, tableRefName ] = this.couponsDictorye[this.current];
            const { page, pageSize} = this;
            const { BusiCode, ExchangeType, MinTerm, StockCode, Term } = this.form;
            this.page = page + 1;
            let data;

            if(this.isBasket){
                data = {
                    FundAccount: this.fundAccount,
                    QueryMode: 0,
                    ACTION_IN: 0,
                    RouteID: 'W',
                    OperatorID: this.fundAccount,
                    ACTION_IN: 0
                }
            }else {
                data = {
                    FundAccount: this.fundAccount,
                    page: page,
                    pageSize: pageSize,
                    QueryMode: 0,
                    ExchangeType,
                    BusiCode,
                    MinTerm,
                    // Term,
                    MaxTerm: Term,
                    StockCode
                }
            }
            securitiesRequest(data, code).then((res) => {
                if(page === 1){
                    this[couponDataName] = res.data
                    this.couponsDetailData = []
                }else {
                    this[couponDataName].splice(this[couponDataName].length-1, 0, ...res.data);
                }
                this.$refs[tableRefName].scrollStatusInit();
            })
        },
        // 点击个券，推荐劵，获取详情
        clickCouponsRow(row) {
            const { StockCode, ExchangeType,BusiCode } = row;
            const { MinTerm, Term } = this.form;
            var params = {
                StockCode: StockCode, //证券代码
                ExchangeType: ExchangeType,
                // ExchangeType:'',  //市场代码
                FundAccount: this.fundAccount, //资金帐号
                BusiCode: BusiCode, //业务类型
                MinTerm: MinTerm, //最小期限
                MaxTerm: Term, //最大期限
                QueryMode: 1, //操作类型  0查总量;1查明细;2按条件查总量
            };
            securitiesRequest(params, 101).then((res) => {
                res.data.forEach((item) => {
                    item.dsipey = 1;
                });
                this.couponsDetailData = res.data;
            });
        },
        // 点击篮子，获取详情
        clickBasketRow(row) {
            const { StockCode, BasketNo, Version } = row;
            var params = {
                StockCode, //证券代码
                RouteID: 'W',
                FundAccount: this.fundAccount,
                OperatorID: this.fundAccount,
                QueryMode: 1,
                BasketNo,
                Version
            };
            securitiesRequest(params, 113).then((res) => {
                res.data.forEach((item) => {
                    item.dsipey = 1;
                });
                this.couponsDetailData = res.data;
            });
        },
        // 个券，推荐劵，约券
        showModel(data){
            this.loading = true;
            data.isBasket = this.isBasket;
            this.editData = {...data};
            Promise.all([this.getRate(), this.getFundAccount()]).then(() => {
                this.$refs.yuequanModel.showModel();
                this.$refs.yuequanModel.resetForm()
                this.loading = false;
            })
        },
        // 篮子约券
        showModel2(data){
            this.loading = true;
            data.isBasket = this.isBasket;
            this.editData = {...data};
            this.getRate().then(() => {
                this.$refs.yuequanModel.showModel();
                this.$refs.yuequanModel.resetForm()
                this.loading = false;
            })
        },
        // 获取约定融券费率
        getRate(){
            this.$set(this.editData,"PostRate","0.00%");
            const { BusiCode, MaxTerm, Term, ExchangeType, StockCode, BasketExid  } = this.editData;
            return securitiesRequest({
                BusiCode: BusiCode, //业务类型
                PricingType: this.isBasket ? 'Basket' : 'stock',
                TermInDays: Term || MaxTerm,
                ExchangeType: BasketExid || ExchangeType,
                StockCode: StockCode,
                FundAccount: this.fundAccount,
            }, 115).then((res) => {
                const { FeeRate, PostRate, PreRate} = res.data[0];
                this.$set(this.editData,"FeeRate",FeeRate.toFixed(2) + "%");
                this.$set(this.editData,"PostRate",PostRate.toFixed(2) + "%");
                this.$set(this.editData,"PreRate",PreRate.toFixed(2) + "%");
                this.$set(this.editData,"CustRate",FeeRate);
            })
        },
        // 获取股东账号
        getFundAccount(){
            const ExchangeType = this.editData.ExchangeType;
            return securitiesRequest({
                FundAccount: this.fundAccount
            }, 117).then((res) => {
                this.nodeList = res.data;
                res.data.forEach((item) => {
                    if(item.exchangeType == ExchangeType){
                        this.editData.stockAccount = item.stockAccount;
                        return;
                    }
                });
            })
        },
        // 提交约券表单
        submitYq(formData){
            this.$set(this.editData,"dateString",formData.dateString);
            this.$set(this.editData,"AppDateType",formData.AppDateType);
            if(!this.isBasket){
                this.$set(this.editData,"Qty",formData.Qty);
            }
            this.$set(this.editData,"checked",formData.checked);
            this.$refs.yuequanModel.closeModel();
            // 确认委托
            this.$refs.confirmModel.showModel();
        },
        //确认委托
        confirmYq(){
            const params = this.isBasket ? this.getBasketYqParams() : this.getCouponsYqParams();
            this.submitYqQquest(params)
        },
        getCouponsYqParams(){
            const editData = this.editData;
            this.loading = true;
            var params = {
                RouteID: "W",
                OpStation: "127.0.0.1",
                OperatorID: this.fundAccount,
                FundAccount: this.fundAccount,
                ExchangeType: editData.ExchangeType,
                StockCode: editData.StockCode,
                stockAccount: editData.stockAccount,
                CurrDate: util.getNowFormatDate(),
                AppDateType: parseFloat(editData.AppDateType),
                StartDate: util.momentDateParam(editData.dateString),
                Term: editData.Term || editData.MaxTerm,
                Qty: editData.Qty,
                AppRate: parseFloat(editData.FeeRate),
                BidFlag: Number(editData.checked),
                PostRate: parseFloat(editData.PostRate),
                BasketProp: 0,
            };
            if (editData.BusiCode == "110B") {
                params.TradeType = 0;
            } else if (editData.BusiCode == "111B") {
                params.TradeType = 1;
            }
            if(editData.checked){
                params.CustRate = editData.CustRate
                params.PreRate = editData.CustRate
            }else {
                params.PreRate = parseFloat(editData.PreRate)
            }

            return params;
        },
        getBasketYqParams(){
            const editData = this.editData;
            this.loading = true;
            var params = {
                RouteID: "W",
                OpStation: "127.0.0.1",
                OperatorID: this.fundAccount,
                FundAccount: this.fundAccount,
                StockCode: editData.StockCode,
                CurrDate: util.getNowFormatDate(),
                StartDate: util.momentDateParam(editData.dateString),
                BasketType: editData.BasketType,
                Term: editData.Term || editData.MaxTerm,
                Qty: editData.Qty,
                AppRate: parseFloat(editData.FeeRate),
                BidFlag: Number(editData.checked),
                BasketNo: editData.BasketNo,
                PostRate: parseFloat(editData.PostRate),
                BasketProp: 1,
            };

            if (editData.BusiCode == "110B") {
                params.TradeType = 0;
            } else if (editData.BusiCode == "111B") {
                params.TradeType = 1;
            }

            if(editData.checked){
                params.CustRate = editData.CustRate
                params.PreRate = editData.CustRate
            }else{
                params.PreRate = parseFloat(editData.PreRate)
            }

            return params;
        },
        submitYqQquest(params){
            securitiesRequest(params, 104).then((res) => {
                this.$refs.confirmModel.closeModel();
                //提交成功后提示
                this.isFail = false
                this.successText = '您的委托单已提交成功啦！'
                this.$refs.successModel.showModel()
            }).catch(err => {
                this.loading = false;
                this.isFail = false
                this.successText = '您的委托单提交失败啦！'
                this.$refs.successModel.showModel()
            })
        },
        // 导航切换
        changeNav(index) {
            this.current = index;
            this.couponsDetailData = [];
            this.page = 1;
            this.form = getDefaultForm();
            this.getCoupons();
        },
        // 查询
        onSearch() {
            // const tableRef = this.couponsDictorye[this.current][2]
            this.$refs[this.tableRef].tableRowIndexInit();
            this.page = 1;
            this.getCoupons();
        },
        // 重置
        clearForm() {
            this.$refs[this.tableRef].tableRowIndexInit();
            this.page = 1;
            this.form = getDefaultForm();
            this.getCoupons();
        },
        tableRowClassName({ row, rowIndex }) {
            // 把每一行的索引放进row
            row.index = rowIndex
            if (rowIndex === this.tableRowIndex) {
                return 'current-row'
            }
            return 
        },
    },
};
</script>

<style scoped>

/deep/ .searchForm .el-form {
    display: flex;
    justify-content: space-between;
}
/deep/ .searchForm .el-form .el-form-item {
    margin-bottom: 0;
}
/deep/ .rightTable .el-table__fixed-right-patch{
    width: 0 !important;
}
/deep/ .rightTable .el-table__fixed-right{
    /* right: 8px !important; */
}
</style>
