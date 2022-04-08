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
                   查询
                </div>
                <div class="searchForm_wt">
                    <el-form ref="form" :model="form">
                        <el-form-item label="属性" class="statusbox" prop="attribute">
                            <el-radio-group v-model="form.attribute" @change="changeAttribute" >
                                <el-radio :label="1">个券</el-radio>
                                <el-radio :label="2">篮子</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <div class="flex">
                            <div class="left el-form--inline">
                                <el-form-item :label="form.attribute==1?'证券代码':'篮子代码'" prop="StockCode">
                                   <el-input style="width: 180px; margin-bottom: 20px" v-model="form.StockCode" autocomplete="off" size="small" :placeholder="form.attribute==1?'请输入证券代码':'请输入篮子代码'" :disabled="form.attribute==0"></el-input>
                                </el-form-item>
                                <el-form-item label="业务类型" prop="AppType">
                                    <el-select
                                        v-model="form.AppType"
                                        style="width: 180px;"
                                    >
                                        <el-option
                                            label="约定融券展期"
                                            value="3"
                                        ></el-option>
                                        <el-option
                                            label="约定融券了结"
                                            value="4"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                                
                                <el-form-item label="状态" prop="AppStatus">
                                     <el-select
                                        v-model="form.AppStatus"
                                        style="width: 180px"
                                    >
                                        <el-option
                                            label="全部"
                                            value="A"
                                        ></el-option>
                                        <el-option
                                            label="可撤"
                                            value="C"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="onSearch"
                                        >查询</el-button
                                    >
                                    <el-button @click="clearForm">重置</el-button>
                                </el-form-item>
                                
                                <el-form-item label="合约到期日起" prop="TrdDate_Begin">
                                    <el-date-picker
                                        v-model="form.TrdDate_Begin"
                                        type="date"
                                        format="yyyy-MM-dd"
                                        size="small"
                                        style="width: 180px"
                                        placeholder="选择合约到期日起"
                                        :picker-options="startPickerOptions">
                                        
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="合约到期日止" prop="TrdDate_End">
                                    <el-date-picker
                                        v-model="form.TrdDate_End"
                                        type="date"
                                        format="yyyy-MM-dd"
                                        size="small"
                                        style="width: 180px"
                                        placeholder="选择合约到期日止"
                                        :picker-options="endPickerOptions">
                                        
                                    </el-date-picker>
                                </el-form-item>
                            </div>
                        </div>
                    </el-form>
                </div>
            </div>
        </div>
        <div class="bgfff">
             <div class="topButton">
                <div class="common_title j_c_a_i">
                    <span></span>
                  展期/提前了结查询列表
                </div>
                <div class="handleBtnBox">
                    <el-button :disabled="multipleSelection.length==0" @click="confirmBack">撤单（{{multipleSelection.length}}）</el-button>
                    <el-button :loading="exportLoading" class="ml20"  @click="exportData">
                        导出数据<span v-if="multipleSelection.length > 0">({{ multipleSelection.length }})</span>
                    </el-button>
                </div>
            </div>
            <el-table 
                :data="tableData" 
                style="width: 100%" 
                class="pubTable" 
                 @row-click="showDetail"
                @selection-change="handleSelectionChange"
                
                >
                <el-table-column
                type="selection"
                width="55"
                :selectable='checkboxInit'
                fixed="left">
                </el-table-column>
                <el-table-column prop="TrdDate" align="center" label="交易日期" width="90"></el-table-column>
                <el-table-column prop="BusiCode" align="center" label="约定模式" width="90">
                    <template slot-scope="scope">  
                        {{dictionary.BusiCodeDic[scope.row.BusiCode]}}
                    </template>
                </el-table-column>
                <el-table-column prop="originEndDate" align="center" label="原到期日期" width="120">
                    <template slot-scope="scope">  
                        {{scope.row.CompactEndDate}}
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="AppDateType" align="center" label="日期类型" width="140">
                    <template slot-scope="scope">  
                        {{dictionary.AppDateType[scope.row.AppDateType]}}
                    </template>
                </el-table-column> -->
                <el-table-column prop="StockCode" align="center" label="证券代码" width="90"></el-table-column>
                <el-table-column prop="StockName" align="center" label="证券名称" width="90"></el-table-column>
                <el-table-column prop="OrderQty" align="center" label="委托数量" width="140"></el-table-column>
                <el-table-column prop="Term" align="center" label="期限" width="90"></el-table-column>
                <el-table-column prop="EndDate" align="center" label="展期到期日期" width="120">
                     <template slot-scope="scope">  
                        {{scope.row.AppType === '3' ? scope.row.EndDate : '--'}}
                    </template>
                </el-table-column>
                <el-table-column prop="FeeRate" align="center" label="年融券费率" width="100">
                    <template slot-scope="scope">  
                        {{percent2(scope.row.BidFlag === '1'? scope.row.CustRate : scope.row.FeeRate)}}
                    </template>
                </el-table-column>
                <el-table-column prop="ConfirmStatus" align="center" label="确认状态">
                    <template slot-scope="scope">  
                        {{dictionary.ConfirmStatusDic[scope.row.ConfirmStatus]}}
                    </template>
                </el-table-column>
                <el-table-column prop="ConfirmQty" align="center" label="确认数量" width="90"></el-table-column>
                <el-table-column prop="ProcFlag" align="center" label="处理信息" width="90">
                    <template slot-scope="scope">  
                        {{scope.row.RetMsg || '--'}}
                    </template>
                </el-table-column>
                <el-table-column prop="PreRate" align="center" label="提前归还费率" width="120">
                    <!-- <template slot="header" >
                        提前归还利率<br>（费率）
                    </template> -->
                    <template slot-scope="scope">  
                        {{percent2(scope.row.PreRate)}}
                    </template>
                </el-table-column>
                <el-table-column prop="PostRate" align="center" label="年违约金率" width="100">
                    <template slot-scope="scope">  
                        {{percent2(scope.row.PostRate)}}
                    </template>
                </el-table-column>
                <el-table-column prop="CompactNo" align="center" label="合约编号" width="240"></el-table-column>
                <el-table-column prop="Amount" align="center" label="委托金额" width="100"></el-table-column>
                <el-table-column prop="AppFee" align="center" label="预估利息" width="90"></el-table-column>
                <el-table-column prop="Price" align="center" label="委托价格" width="90"></el-table-column>
                <!-- <el-table-column prop="CustRate" align="center" label="竞价年融券费率" width="140">
                    <template slot-scope="scope">  
                        {{percent2(scope.row.CustRate)}}
                    </template>
                </el-table-column> -->
                <el-table-column prop="FundAccount" align="center" label="资金账号" width="110"></el-table-column>
                <el-table-column prop="StockAccount" align="center" label="股东代码" width="110"></el-table-column>
                <el-table-column prop="AppType" align="center" label="业务名称" width="90">
                    <template slot-scope="scope">  
                        {{dictionary.AppType[scope.row.AppType]}}
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
                <el-table-column prop="originEndDate" align="center" label="原到期日期" width="120">
                    <template slot-scope="scope">  
                        {{scope.row.CompactEndDate}}
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="AppDateType" align="center" label="日期类型" width="140">
                    <template slot-scope="scope">  
                        {{dictionary.AppDateType[scope.row.AppDateType]}}
                    </template>
                </el-table-column> -->
                <el-table-column prop="StockCode" align="center" label="证券代码" width="90"></el-table-column>
                <el-table-column prop="StockName" align="center" label="证券名称" width="90"></el-table-column>
                <el-table-column prop="OrderQty" align="center" label="委托数量" width="140"></el-table-column>
                <el-table-column prop="Term" align="center" label="期限" width="90"></el-table-column>
                <el-table-column prop="EndDate" align="center" label="展期到期日期" width="120">
                     <template slot-scope="scope">  
                        {{scope.row.AppType === '3' ? scope.row.EndDate : '--'}}
                    </template>
                </el-table-column>
                <el-table-column prop="FeeRate" align="center" label="年融券费率" width="100">
                    <template slot-scope="scope">  
                        {{percent2(scope.row.BidFlag === '1'? scope.row.CustRate : scope.row.FeeRate)}}
                    </template>
                </el-table-column>
                <el-table-column prop="ConfirmStatus" align="center" label="确认状态">
                    <template slot-scope="scope">  
                        {{dictionary.ConfirmStatusDic[scope.row.ConfirmStatus]}}
                    </template>
                </el-table-column>
                <el-table-column prop="ConfirmQty" align="center" label="确认数量" width="90"></el-table-column>
                <el-table-column prop="ProcFlag" align="center" label="处理信息" width="90">
                    <template slot-scope="scope">  
                        {{scope.row.RetMsg || '--'}}
                    </template>
                </el-table-column>
                <el-table-column prop="PreRate" align="center" label="提前归还费率" width="120">
                    <!-- <template slot="header" >
                        提前归还利率<br>（费率）
                    </template> -->
                    <template slot-scope="scope">  
                        {{percent2(scope.row.PreRate)}}
                    </template>
                </el-table-column>
                <el-table-column prop="PostRate" align="center" label="年违约金率" width="100">
                    <template slot-scope="scope">  
                        {{percent2(scope.row.PostRate)}}
                    </template>
                </el-table-column>
                <el-table-column prop="CompactNo" align="center" label="合约编号" width="240"></el-table-column>
                <el-table-column prop="Amount" align="center" label="委托金额" width="100"></el-table-column>
                <el-table-column prop="AppFee" align="center" label="预估利息" width="90"></el-table-column>
                <el-table-column prop="Price" align="center" label="委托价格" width="90"></el-table-column>
                <!-- <el-table-column prop="CustRate" align="center" label="竞价年融券费率" width="140">
                    <template slot-scope="scope">  
                        {{percent2(scope.row.CustRate)}}
                    </template>
                </el-table-column> -->
                <el-table-column prop="FundAccount" align="center" label="资金账号" width="110"></el-table-column>
                <el-table-column prop="StockAccount" align="center" label="股东代码" width="110"></el-table-column>
                <el-table-column prop="AppType" align="center" label="业务名称" width="90">
                    <template slot-scope="scope">  
                        {{dictionary.AppType[scope.row.AppType]}}
                    </template>
                </el-table-column>
            </el-table>
            <div class="bus_page j_c_a_i  pd30">
                <el-pagination
                    :background="true"
                    :current-page="pagination.current"
                    :page-sizes="[10, 20, 30, 40, 50]"
                    :page-size="pagination.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pagination.total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                ></el-pagination>
            </div>
        </div>
        <!-- 提交成功倒计时 -->
        <!-- <countdownModel ref="successModel" :isFail="isFail" :text="successText"></countdownModel> -->
        <!-- 明细 -->
        <pubMingxi ref="pubMingxi" :detailData="detailData"></pubMingxi>
        <!-- 撤单结果 -->
        <chedanResult :failData="failData" :successData="successData"  ref="resultModel" title="撤单" tableTitle="撤单结果"></chedanResult>
    </div>
</template>

<script>
import topNav from "@/components/securities/topNav.vue";
import dictionary from "@/utils/dictionary";
import pubMingxi from "@/components/securities/pubMingxi.vue"; //明细  需要传键值对
import chedanResult from "./gh_components/zqResult.vue"; //撤单结果
// import countdownModel from "@/components/securities/countdownModel.vue";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import util from "@/utils/util";
import { mapState } from 'vuex'
import { securitiesRequest } from '@/api/securities/securities';

const defaultForm = {
    attribute:1,
    StockCode:'',
    AppType:'3',
    AppStatus:'A'
}
export default {
    components: {
        topNav,
        pubMingxi,
        chedanResult,
        // countdownModel
    },
    data() {
        const that = this;
        return {
            // isFail: false,
            dictionary,
            navList: ["未了结合约查询", "展期/提前了结查询"],
            navUrl:['contract','finishedQuery'],
            current: 1,
            form:{
                attribute:1,
                StockCode:'',
                AppType:'3',
                AppStatus:'A',
                TrdDate_Begin: '',
                TrdDate_End: ''
            },
            multipleSelection:[],
            tableData:[
            ],
            editData:{},
            exportLoading:false,
            Exportdata:[],
            totalData:[
            ],
            pagination:{
                pageSize: 10,
                current: 1,
                total: 1,
            },
            detailData:{},
            successText:'',
            failData:[],
            successData:[],
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
    computed:{
        ...mapState(['fundAccount']),
    },
    created() {
        this.getCoupons();
        this.getCouponsAll();
    },
    methods: {
        getDaysDate: util.getDaysDate,
        percent2: util.percent2,
        changeAttribute(){
            this.getCoupons();
            this.getCouponsAll();
        },
        //获取数据
        getCoupons(){
            const { attribute, StockCode, AppType, AppStatus, TrdDate_Begin, TrdDate_End } = this.form;
            const {pagination,fundAccount} = this
            let code = '108'
            let params = {
                RouteID: "W",
                OperatorID: fundAccount,
                FundAccount: fundAccount, 
                CompactStatus: "1",
                // BasketProp:'1', //篮子属性 0-个券 1-篮子 2-篮子成份股
                QueryMode: "A", //默认: A：全部（未送参数时按A处理） 1: 按证券代码查询 3:按篮子查询
                //StockCode:'',//QueryMode为1时必送 QueryMode为3时，送篮子代码
                // AppType:AppType,
                Page: pagination.current,
                PageSize: pagination.pageSize,
                TrdDate_Begin: util.momentDateParam(TrdDate_Begin),
                TrdDate_End: util.momentDateParam(TrdDate_End)
            }
            if(AppType !== '' && AppType !== null){
                params.AppType = AppType
            }
            if(AppStatus=='A'){
                params.AppStatus = AppStatus
            }else{params.ProcFlag = "N";}
            
            if(attribute==1){//按照证券查询
                params.BasketProp = 0
                if(StockCode!=''){
                    params.StockCode = StockCode;
                    params.QueryMode = 1; 
                }else{
                    params.QueryMode = 'A'; 
                }
                
            }else if(attribute==2){
                params.BasketProp = 1
                if(StockCode!=''){
                    params.StockCode = StockCode;
                    params.QueryMode = 3; //按照篮子查询
                }else{
                    params.QueryMode = 'A'; 
                }
                code = '109'
            }
            securitiesRequest(params, code).then((res) => {
                if(res.errorCode==0){
                    this.tableData = res.data
                    this.pagination.total = res.recordNum
                }
                
            })
        },
        //获取数据
        getCouponsAll(){
            const { attribute, StockCode, AppType, AppStatus, TrdDate_Begin, TrdDate_End } = this.form;
            const {fundAccount} = this
            let code = '108'
            let params = {
                RouteID: "W",
                OperatorID: fundAccount,
                FundAccount: fundAccount, 
                CompactStatus: "1",
                // BasketProp:'1', //篮子属性 0-个券 1-篮子 2-篮子成份股
                QueryMode: "A", //默认: A：全部（未送参数时按A处理） 1: 按证券代码查询 3:按篮子查询
                //StockCode:'',//QueryMode为1时必送 QueryMode为3时，送篮子代码
                AppType:AppType,
                TrdDate_Begin: util.momentDateParam(TrdDate_Begin),
                TrdDate_End: util.momentDateParam(TrdDate_End)
            }
            if(AppStatus=='A'){
                params.AppStatus = AppStatus
            }else{params.ProcFlag = "N";}
            
            if(attribute==1){//按照证券查询
                params.BasketProp = 0
                if(StockCode!=''){
                    params.StockCode = StockCode;
                    params.QueryMode = 1; 
                }else{
                    params.QueryMode = 'A'; 
                }
                
            }else if(attribute==2){
                params.BasketProp = 1
                if(StockCode!=''){
                    params.StockCode = StockCode;
                    params.QueryMode = 3; //按照篮子查询
                }else{
                    params.QueryMode = 'A'; 
                }
                code = '109'
            }
            securitiesRequest(params, code).then((res) => {
                if(res.errorCode==0){
                    this.totalData = res.data
                    this.pagination.total = res.recordNum
                }
                
            })
        },
        //查看详情
        showDetail(record){
            this.detailData = {
                交易日期: record.TrdDate || "--",
                约定模式: dictionary.BusiCodeDic[record.BusiCode] || "--",
                原到期日期: record.CompactEndDate,
                // 约定日期: record.AppDate || "--",
                // 日期类型: dictionary.AppDateType[record.AppDateType] || "--",
                证券代码: record.StockCode || "--",
                证券名称: record.StockName || "--",
                委托数量: record.OrderQty || "--",
                期限: record.Term,
                展期到期日期: record.AppType === '3' ? record.EndDate : '--',
                年融券费率: util.percent2(record.BidFlag === '1'? record.CustRate : record.FeeRate),
                确认状态: dictionary.ConfirmStatusDic[record.ConfirmStatus] || "--",
                确认数量: record.ConfirmQty,
                处理信息: record.RetMsg || "--",
                // 处理信息: dictionary.ProcFlag[record.ProcFlag] || "--",
                提前归还费率: util.percent2(record.PreRate),
                年违约金率: util.percent2(record.PostRate),
                合约编号: record.CompactNo || "--",
                委托金额: record.Amount || "--",
                预估利息: record.AppFee || "--",
                委托价格: record.Price || "--",
                // 竞价年融券费率: util.percent2(record.CustRate),
                资金帐号: record.FundAccount || "--",
                股东代码: record.StockAccount || "--",
                业务名称: dictionary.AppType[record.AppType],
                
                // 归还冻结数量: record.FrzQty || "--",
                // 交易所名称: dictionary.ExchangeType[record.ExchangeType] || "--",    
                // 原合约编号: record.OrigCompactNo || "--",
            };
            this.$refs.pubMingxi.showModel()
        },
        //不能选中
        checkboxInit(row){
            return row.ProcFlag === "N"
        },
        changeNav(index) {
            this.$router.push({name:this.navUrl[index]})
        },
        onSearch() {
            this.pagination.current = 1
            this.getCoupons();
            this.getCouponsAll();
        },
        clearForm() {
            // this.form = defaultForm
            this.$refs.form.resetFields()
            this.pagination.current = 1
            this.getCoupons();
            this.getCouponsAll();
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
           
        },
        //撤销委托
        confirmBack(){
            this.successData = []
            this.failData = []
            const resultP = []
            const {fundAccount} = this
            this.multipleSelection.forEach(item => {
                var params = {
                    RouteID: "W",
                    OpStation: "127.0.0.1",
                    OperatorID: fundAccount,
                    AppNo: item.AppNo,
                    BasketProp: item.BasketProp,
                    FundAccount: fundAccount,
                };

                const p = securitiesRequest(params, 107).then((res) => {
                    if (res.errorCode == "0") {
                        item.resultMsg = '撤销成功'
                        this.successData.push(item)
                    }
                }).catch((err) => {
                    item.resultMsg = err.errorMessage
                    this.failData.push(item)
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
            if (this.multipleSelection.length > 0) {
                this.Exportdata = this.multipleSelection;
            } else {
                this.Exportdata = this.totalData;
            }
            if (this.Exportdata.length == 0) {
                this.$message({
                    message: '暂无可导出数据！',
                    type: 'warning'
                });
                this.exportLoading = false;
                return;
           }
            let this_ = this
            this.$nextTick(() => {
                this_.exportDataMethod();
            });
            this.exportLoading = false;
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
        handleSizeChange(val) {
            this.pagination.pageSize = val
            this.getCoupons()
        },
        handleCurrentChange(val) {
            this.pagination.current = val
            this.getCoupons()
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
