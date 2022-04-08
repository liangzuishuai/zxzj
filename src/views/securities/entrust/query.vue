<template>
    <div>
        <topNav
            :navList="navList"
            :current="current"
            @change="changeNav"
        ></topNav>
        <div class="bgfff pd30 mb20">
            <div class="bus_query">
                <div class="common_title j_c_a_i">
                    <span></span>
                   委托查询
                </div>
                <div class="searchForm_wt">
                    <el-form ref="form" :model="form">
                        <el-form-item label="属性" class="statusbox">
                            <el-radio-group v-model="form.attribute" @change="onSearch">
                                <!-- <el-radio :label="0">全部</el-radio> -->
                                <el-radio :label="1">个券</el-radio>
                                <el-radio :label="2">篮子</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <div class="flex">
                            <div class="left el-form--inline">
                                <el-form-item label="查询类型">
                                    <el-select
                                        v-model="form.searchType"
                                        style="width: 180px"
                                        size="small"
                                    >
                                        <el-option value="0" label="全部"></el-option>
                                        <el-option value="1" label="可撤"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="约定日期起">
                                    <el-date-picker
                                        v-model="form.TrdDate_Begin"
                                        type="date"
                                        format="yyyy-MM-dd"
                                        size="small"
                                        style="width: 180px"
                                        placeholder="选择约定日期起"
                                        :picker-options="startPickerOptions">
                                        
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="约定日期止">
                                    <el-date-picker
                                        v-model="form.TrdDate_End"
                                        type="date"
                                        format="yyyy-MM-dd"
                                        size="small"
                                        style="width: 180px"
                                        placeholder="选择约定日期止"
                                        :picker-options="endPickerOptions">
                                        
                                    </el-date-picker>
                                </el-form-item>
                            </div>
                            <el-form-item>
                                <el-button type="primary" @click="onSearch"
                                    >查询</el-button
                                >
                                <el-button @click="clearForm">重置</el-button>
                            </el-form-item>
                        </div>
                    </el-form>
                </div>
            </div>
        </div>
        <div class="bgfff">
             <div class="topButton">
                <div class="common_title j_c_a_i">
                    <span></span>
                    委托查询列表
                </div>
                <div class="handleBtnBox">
                    <el-button :disabled="multipleSelection.length==0" @click="confirmBack">撤销委托（{{multipleSelection.length}}）</el-button>
                    <el-button :loading="exportLoading" class="ml20"  @click="exportData">
                        导出数据<span v-if="multipleSelection.length > 0"
              >({{ multipleSelection.length }})</span>
                </el-button>
                </div>
            </div>
            <!-- 个券，篮子显示列表 -->
            <el-table 
                :data="tableData" 
                style="width: 100%" 
                class="pubTable" 
                @selection-change="handleSelectionChange"
                >
                <el-table-column
                    type="selection"
                    width="55"
                    fixed="left"
                    :selectable="selectableFn"
                    >
                </el-table-column>
                <el-table-column prop="TrdDate" align="center" label="交易日期" width="90" fixed="left"></el-table-column>
                <el-table-column prop="BusiCode" align="center" label="约定模式" width="90">
                    <template slot-scope="scope">  
                        {{dictionary.BusiCodeDic[scope.row.BusiCode]}}
                    </template>
                </el-table-column>
                <el-table-column prop="AppDate" align="center" label="约定日期" width="90"></el-table-column>
                <el-table-column prop="AppDateType" align="center" label="日期类型" width="120">
                    <template slot-scope="scope">  
                        {{dictionary.AppDateType[scope.row.AppDateType]}}
                    </template>
                </el-table-column>
                <el-table-column prop="StockCode" align="center" label="证券代码" width="90"></el-table-column>
                <el-table-column prop="StockName" align="center" label="证券名称" width="90"></el-table-column>
                <el-table-column prop="OrderQty" align="center" label="委托数量" width="120"></el-table-column>
                <el-table-column prop="Term" align="center" label="合约期限" width="90"></el-table-column>
                <el-table-column prop="FeeRate" align="center" label="年融券费率" width="100">
                    <template slot-scope="scope">  
                        {{formatRate(scope.row.BidFlag === '1'? scope.row.CustRate : scope.row.FeeRate)}}
                    </template>
                </el-table-column>
                <el-table-column prop="AppStatus" align="center" label="确认状态" width="100">
                    <template slot-scope="scope">  
                        {{ dictionary.ConfirmStatusDic[scope.row.ConfirmStatus] || "--",}}
                    </template>
                </el-table-column>
                <el-table-column prop="ConfirmQty" align="center" label="确认数量" width="90"></el-table-column>
                <el-table-column prop="ProcFlag" align="center" label="处理信息" width="90">
                    <template slot-scope="scope">  
                        <!-- {{dictionary.ProcFlag[scope.row.ProcFlag]}} -->
                        {{scope.row.RetMsg || '--'}}
                    </template>
                </el-table-column>
                <el-table-column prop="PreRate" align="center" label="提前归还利率（费率）" width="120">
                    <template slot="header" >
                        提前归还利率<br>（费率）
                    </template>
                    <template slot-scope="scope">  
                        {{formatRate(scope.row.PreRate)}}
                    </template>
                </el-table-column>
                <el-table-column prop="BidFlag" align="center" label="费率类型" width="90">
                    <template slot-scope="scope">  
                        {{scope.row.BidFlag === '3' ? '折扣': scope.row.BidFlag === '1' ? '竞价' : '普通'}}
                    </template>
                </el-table-column>
                <el-table-column prop="Amount" align="center" label="委托金额" width="100"></el-table-column>
                <el-table-column prop="AppFee" align="center" label="预估利息" width="90"></el-table-column>
                <el-table-column prop="PostRate" align="center" label="年违约金率" width="100">
                    <template slot-scope="scope">  
                        {{formatRate(scope.row.PostRate)}}
                    </template>
                </el-table-column>
                <el-table-column prop="Price" align="center" label="委托价格" width="90"></el-table-column>
                <el-table-column prop="AppNo" align="center" label="合约编号" width="240"></el-table-column>
                <el-table-column prop="FundAccount" align="center" label="资金账号" width="110"></el-table-column>
                <el-table-column prop="action" align="center" label="操作" fixed="right" v-if="form.attribute === 1">
                    <template slot-scope="scope">  
                        <a href="javascript:void(0)" class="colorRed" @click="showMinxi(scope.row)">明细</a>
                    </template>
                </el-table-column>
                <el-table-column prop="action" align="center" label="操作" fixed="right" width="120" v-else>
                    <template slot-scope="scope">  
                        <a href="javascript:void(0)" class="colorRed" @click="showMinxi(scope.row)">明细</a>
                        <span class="colorRed" >&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                        <a href="javascript:void(0)" class="colorRed" @click="showCompose(scope.row)">组成</a>
                    </template>
                </el-table-column>
            </el-table>
            <!-- //导出用的table -->
            <el-table 
                id="tableExport"
                :data="Exportdata" 
                style="display:none;"
                >
                <el-table-column prop="TrdDate" align="center" label="交易日期" width="90"></el-table-column>
                <el-table-column prop="BusiCode" align="center" label="约定模式" width="90">
                    <template slot-scope="scope">  
                        {{dictionary.BusiCodeDic[scope.row.BusiCode]}}
                    </template>
                </el-table-column>
                <el-table-column prop="AppDate" align="center" label="约定日期" width="90"></el-table-column>
                <el-table-column prop="AppDateType" align="center" label="日期类型" width="120">
                    <template slot-scope="scope">  
                        {{dictionary.AppDateType[scope.row.AppDateType]}}
                    </template>
                </el-table-column>
                <el-table-column prop="StockCode" align="center" label="证券代码" width="90"></el-table-column>
                <el-table-column prop="StockName" align="center" label="证券名称" width="90"></el-table-column>
                <el-table-column prop="OrderQty" align="center" label="委托数量" width="120"></el-table-column>
                <el-table-column prop="Term" align="center" label="合约期限" width="90"></el-table-column>
                <el-table-column prop="FeeRate" align="center" label="年融券费率" width="100">
                    <template slot-scope="scope">  
                        {{formatRate(scope.row.BidFlag === '1'? scope.row.CustRate : scope.row.FeeRate)}}
                    </template>
                </el-table-column>
                <el-table-column prop="AppStatus" align="center" label="确认状态" width="100">
                    <template slot-scope="scope">  
                        {{dictionary.AppStatus[scope.row.AppStatus]}}
                    </template>
                </el-table-column>
                <el-table-column prop="ConfirmQty" align="center" label="确认数量" width="90"></el-table-column>
                <el-table-column prop="ProcFlag" align="center" label="处理信息" width="90">
                    <template slot-scope="scope">  
                        <!-- {{dictionary.ProcFlag[scope.row.ProcFlag]}} -->
                        {{scope.row.RetMsg || '--'}}
                    </template>
                </el-table-column>
                <el-table-column prop="PreRate" align="center" label="提前归还利率（费率）" width="120">
                    <template slot="header" >
                        提前归还利率<br>（费率）
                    </template>
                    <template slot-scope="scope">  
                        {{formatRate(scope.row.PreRate)}}
                    </template>
                </el-table-column>
                <el-table-column prop="BidFlag" align="center" label="费率类型" width="90">
                    <template slot-scope="scope">  
                        {{scope.row.BidFlag === '3' ? '折扣': scope.row.BidFlag === '1' ? '竞价' : '普通'}}
                    </template>
                </el-table-column>
                <el-table-column prop="Amount" align="center" label="委托金额" width="100"></el-table-column>
                <el-table-column prop="AppFee" align="center" label="预估利息" width="90"></el-table-column>
                <el-table-column prop="PostRate" align="center" label="年违约金率" width="100">
                    <template slot-scope="scope">  
                        {{formatRate(scope.row.PostRate)}}
                    </template>
                </el-table-column>
                <el-table-column prop="Price" align="center" label="委托价格" width="90"></el-table-column>
                <el-table-column prop="AppNo" align="center" label="合约编号" width="240"></el-table-column>
                <el-table-column prop="FundAccount" align="center" label="资金账号" width="110"></el-table-column>
            </el-table>
            <table-pagination
                ref="tablePagination"
                :totalSize="tableDataTotal"
                @changePage="handleChangePage"
            ></table-pagination>
        </div>
        <!-- 明细 -->
        <mingxi ref="mingxiModel" :editData="editData" ></mingxi>
        <!-- 组成 -->
        <compose ref="composeModel" :composeData="composeData" ></compose>
        <!-- 提交成功倒计时 -->
        <!-- <countdownModel ref="successModel" :isFail="isFail" :text="successText"></countdownModel> -->
        <!-- 批量撤销委托结果 -->
        <zqResult title="撤销委托" :failData="failData" :successData="successData" ref="resultModel"></zqResult>
        
    </div>
</template>

<script>
import topNav from "@/components/securities/topNav.vue";
import dictionary from "@/utils/dictionary";
import util from "@/utils/util.js";
import mingxi from "@/components/securities/showminxModelQuery.vue";
import compose from "@/components/securities/showminxModelCompose.vue";
import countdownModel from "@/components/securities/countdownModel.vue";
import tablePagination  from '@/components/securities/tablePagination.vue';
import fareWay  from '@/components/securities/couponPool/fareWay.vue';
import FileSaver from "file-saver";
import XLSX from "xlsx";
import { securitiesRequest } from '@/api/securities/securities';
import zqResult from "./gh_components/zqResult.vue"; //撤销委托结果
import { mapState } from 'vuex'

function getQueryInit(){
    return {
        attribute:1,
        searchType:"0",
        TrdDate_Begin: '', 
        TrdDate_End: ''
    }
}
export default {
    components: {
        topNav,
        mingxi,
        countdownModel,
        tablePagination,
        fareWay,
        compose,
        zqResult
    },
    data() {
        const that = this
        return {
            // isFail: false,
            dictionary,
            navList: ["借入委托", "委托查询", "委托导入", "委托定制"],
            navUrl:['entrustBorrow', 'entrustQuery','entrustImport','entrustCustom'],
            current: 1,
            form: getQueryInit(),
            multipleSelection:[],
            tableData:[],
            tableDataTotal: 0,
            editData:{},
            successText:'',
            exportLoading:false,
            Exportdata:[],

            // 个券全部数据
            couponTotalData:[
            ],
            // 篮子全部数据
            basketTotalData:[],
            page: 1,
            pageSize: 10,
            composeData: [],
            successData: [],
            failData: [],
            endPickerOptions: {
                disabledDate(time) {
                    const TrdDate_Begin = that.form.TrdDate_Begin
                    if(TrdDate_Begin){
                        return time.getTime() < new Date(TrdDate_Begin).getTime();
                    }
                },
            },
            startPickerOptions: {
                disabledDate(time) {
                    const TrdDate_End = that.form.TrdDate_End
                    if(TrdDate_End){
                        return time.getTime() > new Date(TrdDate_End).getTime();
                    }
                },
            }
        };
    },
    created() {
    },
    mounted(){
        this.getCouponList(true) // 获取劵池全部数据，导出数据用
        this.getCouponList()
        // this.getBasketList(true) // 获取篮子全部数据，导出数据用
        // this.getBasketList()
    },
    computed: {
        ...mapState(['fundAccount']),
    },
    methods: {
        formatRate: util.formatRate,
        // 获取个券委托列表参数
        getListParams(all){
            const { page, pageSize } = this.$refs.tablePagination.pagination;
            const { fundAccount, form: { TrdDate_Begin, TrdDate_End, searchType } } = this;
            var params = {
                RouteID: "W",
                OperatorID: fundAccount,
                AppType: 0,
                TrdDate_Begin: util.momentDateParam(TrdDate_Begin),
                TrdDate_End: util.momentDateParam(TrdDate_End),
                FundAccount: fundAccount,
            };
            if(!all){
                params.Page = page
                params.PageSize = pageSize
            }

            if (all || searchType == 0) {
                params.AppStatus = "A";
            } else if (searchType == 1) {
                params.ProcFlag = "N";
            }
            return params;
        },
        // 获取个券委托查询列表  all 获取全部数据
        getCouponList(all){
            const params = this.getListParams(all);
            params.BasketProp = 0;
            securitiesRequest(params, 108).then((res) => {
                if(all){
                    this.couponTotalData = res.data;
                }else {
                    this.tableDataTotal = res.recordNum;
                    this.tableData = res.data;
                    console.log('this.tableData', res.data)
                }
            })
        },
        // 获取篮子委托查询列表  all 获取全部数据
        getBasketList(all){
            const params = this.getListParams(all);
            params.ACTION_IN = 0;
            params.OP_SITE = "127.0.0.1";
            params.QueryMode = "A";
            securitiesRequest(params, 109).then((res) => {
                 if(all){
                    this.basketTotalData = res.data;
                }else {
                    this.tableDataTotal = res.recordNum;
                    this.tableData = res.data;
                }
            })
        },
        // 获取委托查询列表
        getList(){
            if(this.form.attribute === 1){
                this.getCouponList()
            }else {
                this.getBasketList()
            }
        },
        // 委托查询，切换分页
        handleChangePage(){
            this.getList()
        },
        // 点击查询按钮
        onSearch() {
            this.$refs.tablePagination.initPaganition()
            this.getList();
        },
        // 清空查询表单
        clearForm() {
            this.form = getQueryInit();
            this.getList();
        },
        // 预处理:P 已办理:D 失败:F 挂起：H 未处理：N 成功：S 办理中：W  部分确认：T 部成部拒
        // 状态为未处理，可选择
        selectableFn(row){
            return row.ProcFlag === "N"
        },
        // 显示明细
        showMinxi(row){
            this.editData = row
            this.$refs.mingxiModel.showModel()
        },
        // 显示篮子组成
        showCompose(row){
            this.$refs.composeModel.showModel()
            var params = {
                RouteID: "W",
                OperatorID: this.fundAccount,
                BasketProp: 1,
                QueryMode: 3,
                AppType: 0,
                OP_SITE: "127.0.0.1",
                AppStatus: "A",
                BasketNo: row.BasketNo,
                StockCode: row.StockCode,
                BasketAppNo: row.AppNo,
                ACTION_IN: 0, //操作类型  0查总量;1查明细;2按条件查总量
                FundAccount: this.fundAccount,
            };
            securitiesRequest(params, 108).then((res) => {
                this.composeData = res.data
            })
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        //撤销委托
        confirmBack(){
            this.successData = []
            this.failData = []
            const resultP = []
            this.multipleSelection.forEach(item => {
                var params = {
                    RouteID: "W",
                    AppNo: item.AppNo,
                    OpStation: "127.0.0.1",
                    FundAccount: this.fundAccount,
                    OperatorID: this.fundAccount,
                    BasketProp: item.BasketProp,
                };

                const p = securitiesRequest(params, 107).then((res) => {
                    if (res.errorCode == "0") {
                        item.resultMsg = '撤销委托成功'
                        this.successData.push(item)
                        // //提交成功后提示
                        // this.isFail = false
                        // this.successText = '您的委托撤销成功啦！'
                        // this.$refs.successModel.showModel()
                    }
                }).catch((err) => {
                    item.resultMsg = err.errorMessage
                    this.failData.push(item)
                    // //提交失败后提示
                    // this.isFail = true
                    // this.successText = '您的委托撤销失败啦！'
                    // this.$refs.successModel.showModel()
                })
                resultP.push(p)
            })

            Promise.all(resultP).finally(() => {
                this.$refs.resultModel.showModel()
                this.form.attribute = 1;
                this.getCouponList(true) // 获取劵池全部数据，导出数据用
                this.getCouponList()
            })
            
        },
        //导出数据
        exportData(){
            this.exportLoading = true;
            const { multipleSelection, basketTotalData, couponTotalData, form: { attribute }} = this

            if (multipleSelection.length > 0) { // 选中数据
                this.Exportdata = multipleSelection;
            } else { // 个券或篮子全部数据
                this.Exportdata = attribute == 2 ? basketTotalData : couponTotalData; 
            }

            if (this.Exportdata.length == 0) {
                this.$message({
                    message: '暂无可导出数据！',
                    type: 'warning'
                });
                this.exportLoading = false;
                return;
            }
            this.$nextTick(() => {
                this.exportDataMethod();
                this.exportLoading = false;
            });
        },
        exportDataMethod() {
            var xlsxParam = {
                raw: true,
            };
            let et = XLSX.utils.table_to_book(
                document.querySelector("#tableExport"),
                xlsxParam
            );
            let etout = XLSX.write(et, {
                bookType: "xlsx",
                bookSST: true,
                type: "array",
            });
            try {
                FileSaver.saveAs(
                new Blob([etout], {
                    type: "application/octet-stream",
                }),
                "委托查询.xlsx"
                );
            } catch (e) {
                console.log(e, etout);
            }
            return etout;
        },
        changeNav(index) {
            this.$router.push({name:this.navUrl[index]})
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
.searchForm_wt{
    padding-top: 20px;
    padding-bottom: 30px;
}
.searchForm_wt .el-radio{
    margin-right: 50px;
}
/deep/  .searchForm_wt .statusbox .el-form-item__label{
    padding-right: 30px;
}
.flex{
    display: flex;
    justify-content: space-between;
}
.searchForm_wt .flex .el-form-item{
    margin-right: 50px;
    margin-bottom: 0;
}
.topButton{
    padding: 20px 30px 30px;
}
</style>
