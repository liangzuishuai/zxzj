<template>
    <div>
        <topNav
            :navList="navList"
            :current="current"
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
                            <el-radio-group v-model="form.attribute" @change="changeAttribute">
                                <!-- <el-radio :label="0">全部</el-radio> -->
                                <el-radio :label="1">个券</el-radio>
                                <el-radio :label="2">篮子</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <div class="flex">
                            <div class="left el-form--inline">
                                <el-form-item :label="form.attribute==1?'证券代码':'篮子代码'" v-if="form.attribute!=0" prop="StockCode">
                                   <el-input v-model="form.StockCode" autocomplete="off" size="small" :placeholder="form.attribute==1?'请输入证券代码':'请输入篮子代码'" :disabled="form.attribute==0"></el-input>
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
                                <el-form-item style="margin-right:0;">
                                    <el-button type="primary" @click="onSearch"
                                        >查询</el-button
                                    >
                                    <el-button @click="clearForm">重置</el-button>
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
                    已了结合约查询列表
                </div>
                <div class="handleBtnBox">
                    <el-button :loading="exportLoading" class="ml20"  @click="exportData">
                        导出数据<span v-if="multipleSelection.length > 0"
              >({{ multipleSelection.length }})</span>
                </el-button>
                </div>
            </div>
            <el-table 
                :data="tableData" 
                style="width: 100%" 
                class="pubTable" 
                @selection-change="handleSelectionChange" 
                @row-click="showDetail"
                >
                <el-table-column
                type="selection"
                width="55"
                fixed="left">
                </el-table-column>
                <el-table-column prop="CompactType" align="center" label="合约类型" width="90">
                    <template slot-scope="scope">  
                        {{dictionary.CompactType[scope.row.CompactType]}}
                    </template>
                </el-table-column>
                <el-table-column prop="StartDate" align="center" label="约定日期" width="90"></el-table-column>
                <el-table-column prop="EndDate" align="center" label="到期日期" width="90"></el-table-column>
                <el-table-column prop="StockCode" align="center" label="证券代码" width="90"></el-table-column>
                <el-table-column prop="StockName" align="center" label="证券名称" width="90"></el-table-column>
                <el-table-column prop="Qty" align="center" label="合约数量" width="100"></el-table-column>
                <el-table-column prop="Term" align="center" label="合约期限" width="90"></el-table-column>
                <el-table-column prop="FeeRate" align="center" label="融券费率" width="100">
                    <template slot-scope="scope">  
                        {{percent2(scope.row.FeeRate)}}
                    </template>
                </el-table-column>
                <el-table-column prop="PreRate" align="center" label="提前归还费率" width="110">
                    <template slot-scope="scope">  
                        {{percent2(scope.row.PreRate)}}
                    </template>
                </el-table-column>
                <el-table-column prop="IntFee" align="center" label="应记息费" width="100"></el-table-column>
                <el-table-column prop="ExFlag" align="center" label="展期标志" width="110">
                    <template slot-scope="scope">  
                        {{dictionary.ExFlag[scope.row.ExFlag]}}
                    </template>
                </el-table-column>
                <el-table-column prop="PostRate" align="center" label="年违约金率" width="100">
                    <template slot-scope="scope">  
                        {{percent2(scope.row.PostRate)}}
                    </template>
                </el-table-column>
                <el-table-column prop="CompactNo" align="center" label="合约编号" width="240"></el-table-column>
                <el-table-column prop="BusiCode" align="center" label="约定模式" width="90">
                    <template slot-scope="scope">  
                        {{dictionary.BusiCodeDic[scope.row.BusiCode]}}
                    </template>
                </el-table-column>
                <el-table-column prop="Price" align="center" label="约定融券价格" width="120"></el-table-column>
                <el-table-column prop="Amount" align="center" label="合约金额" width="100"></el-table-column>
                <el-table-column prop="CompactStatus" align="center" label="合约状态" width="100">
                    <template slot-scope="scope">  
                        {{dictionary.CompactStatus[scope.row.CompactStatus]}}
                    </template>
                </el-table-column>
                <el-table-column prop="ExIndex" align="center" label="展期次数" width="100"></el-table-column>
                <el-table-column prop="PostFee1" align="center" label="预计违约金" width="100"></el-table-column>
                <el-table-column prop="FundAccount" align="center" label="资金账号" width="110"></el-table-column>
                <el-table-column prop="OrigCompactNo" align="center" label="原合约编号" width="240"></el-table-column>
                <el-table-column prop="TrdDate" align="center" label="交易日期" width="90"></el-table-column>
            </el-table>
            <!-- //导出用的table -->
            <el-table 
                id="tableExport"
                :data="Exportdata" 
                style="display:none;"
                >
                <el-table-column prop="CompactType" align="center" label="合约类型" width="90">
                    <template slot-scope="scope">  
                        {{dictionary.CompactType[scope.row.CompactType]}}
                    </template>
                </el-table-column>
                <el-table-column prop="StartDate" align="center" label="约定日期" width="90"></el-table-column>
                <el-table-column prop="EndDate" align="center" label="到期日期" width="90"></el-table-column>
                <el-table-column prop="StockCode" align="center" label="证券代码" width="90"></el-table-column>
                <el-table-column prop="StockName" align="center" label="证券名称" width="90"></el-table-column>
                <el-table-column prop="Qty" align="center" label="合约数量" width="100"></el-table-column>
                <el-table-column prop="Term" align="center" label="合约期限" width="90"></el-table-column>
                <el-table-column prop="FeeRate" align="center" label="融券费率" width="100">
                    <template slot-scope="scope">  
                        {{percent2(scope.row.FeeRate)}}
                    </template>
                </el-table-column>
                <el-table-column prop="PreRate" align="center" label="提前归还费率" width="110">
                    <template slot-scope="scope">  
                        {{percent2(scope.row.PreRate)}}
                    </template>
                </el-table-column>
                <el-table-column prop="IntFee" align="center" label="应记息费" width="100"></el-table-column>
                <el-table-column prop="ExFlag" align="center" label="展期标志" width="110">
                    <template slot-scope="scope">  
                        {{dictionary.ExFlag[scope.row.ExFlag]}}
                    </template>
                </el-table-column>
                <el-table-column prop="PostRate" align="center" label="年违约金率" width="100">
                    <template slot-scope="scope">  
                        {{percent2(scope.row.PostRate)}}
                    </template>
                </el-table-column>
                <el-table-column prop="CompactNo" align="center" label="合约编号" width="240"></el-table-column>
                <el-table-column prop="BusiCode" align="center" label="约定模式" width="90">
                    <template slot-scope="scope">  
                        {{dictionary.BusiCodeDic[scope.row.BusiCode]}}
                    </template>
                </el-table-column>
                <el-table-column prop="Price" align="center" label="约定融券价格" width="120"></el-table-column>
                <el-table-column prop="Amount" align="center" label="合约金额" width="100"></el-table-column>
                <el-table-column prop="CompactStatus" align="center" label="合约状态" width="100">
                    <template slot-scope="scope">  
                        {{dictionary.CompactStatus[scope.row.CompactStatus]}}
                    </template>
                </el-table-column>
                <el-table-column prop="ExIndex" align="center" label="展期次数" width="100"></el-table-column>
                <el-table-column prop="PostFee1" align="center" label="预计违约金" width="100"></el-table-column>
                <el-table-column prop="FundAccount" align="center" label="资金账号" width="110"></el-table-column>
                <el-table-column prop="OrigCompactNo" align="center" label="原合约编号" width="110"></el-table-column>
                <el-table-column prop="TrdDate" align="center" label="交易日期" width="90"></el-table-column>
            </el-table>
            <div class="bus_page j_c_a_i pd30">
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
        <!-- 明细 -->
        <pubMingxi ref="pubMingxi" :detailData="detailData"></pubMingxi>
    </div>
</template>

<script>
import topNav from "@/components/securities/topNav.vue";
import pubMingxi from "@/components/securities/pubMingxi.vue"; //明细  需要传键值对
import dictionary from "@/utils/dictionary";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import { securitiesRequest } from '@/api/securities/securities';
import util from "@/utils/util";
import { mapState } from 'vuex'
import moment from "moment";
const defaultForm = {
    attribute:1,
    StockCode:'',
    TrdDate_Begin:'',
    TrdDate_End:''
}
export default {
    components: {
        topNav,
        pubMingxi
    },
    data() {
        const that = this
        return {
            dictionary,
            navList: ["已了结合约查询"],
            current: 0,
            form:{
                attribute:1,
                StockCode:'',
                TrdDate_Begin:'',
                TrdDate_End:'',
            },
            multipleSelection:[],
            tableData:[],
            successText:'',
            exportLoading:false,
            Exportdata:[],
            totalData:[],
            pagination:{
                pageSize: 10,
                current: 1,
                total: 1,
            },
            detailData:{},
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
        percent2: util.percent2,
        changeAttribute(){
            this.getCoupons();
            this.getCouponsAll();
        },
        //获取数据
        getCoupons(){
            const { attribute, StockCode, TrdDate_Begin, TrdDate_End } = this.form;
            const {pagination,fundAccount} = this
            let params = {
                RouteID: "W",
                OperatorID: fundAccount,
                FundAccount: fundAccount, 
                CompactStatus: "1",
                // BasketProp:'1', //篮子属性 0-个券 1-篮子 2-篮子成份股
                EndDate_Begin: TrdDate_Begin?moment(TrdDate_Begin).format('YYYYMMDD'):'', //到期日期开始
                EndDate_End: TrdDate_End?moment(TrdDate_End).format('YYYYMMDD'):'', //到期日期结束
                QueryMode: "A", //默认: A：全部（未送参数时按A处理） 1: 按证券代码查询 3:按篮子查询
                //StockCode:'',//QueryMode为1时必送 QueryMode为3时，送篮子代码
                Page: pagination.current,
                PageSize: pagination.pageSize,
            }
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
            }
            securitiesRequest(params, '110').then((res) => {
                if(res.errorCode==0){
                    console.log(res.data)
                    this.tableData = res.data
                    this.pagination.total = res.recordNum
                }
                
            })
        },
        //获取全部数据用于导出全部
        getCouponsAll(){
            const { attribute, StockCode, TrdDate_Begin, TrdDate_End } = this.form;
            const {fundAccount} = this
            let params = {
                RouteID: "W",
                OperatorID: fundAccount,
                FundAccount: fundAccount, 
                CompactStatus: "1",
                EndDate_Begin: TrdDate_Begin, //到期日期开始
                EndDate_End: TrdDate_End, //到期日期结束
                QueryMode: "A", //默认: A：全部（未送参数时按A处理） 1: 按证券代码查询 3:按篮子查询
            }
            if(attribute==1){//按照证券查询
                params.BasketProp = 0
                if(StockCode!=''){
                    params.StockCode = StockCode;
                    params.QueryMode = 1; 
                }else{
                    params.QueryMode = 'A'; 
                }
                
            }else if(attribute==2){
                params.BasketProp = 2
                if(StockCode!=''){
                    params.StockCode = StockCode;
                    params.QueryMode = 3; //按照篮子查询
                }else{
                    params.QueryMode = 'A'; 
                }
            }
            securitiesRequest(params, '110').then((res) => {
                if(res.errorCode==0){
                    this.totalData = res.data
                }
                
            })
        },
        //查看详情
        showDetail(record){
            console.log(record)
            this.detailData = {
                合约类型: dictionary.CompactType[record.CompactType],
                交易日期: record.TrdDate,
                约定日期: record.StartDate || "--",
                到期日期: record.EndDate || "--",
                证券代码: record.StockCode || "--",
                证券名称: record.StockName || "--",
                合约数量: record.Qty || "--",
                合约期限: record.Term,
                融券费率: util.percent2(record.FeeRate),
                提前归还费率: util.percent2(record.PreRate),
                应记息费: record.IntFee || "--",
                展期标志: dictionary.ExFlag[record.ExFlag] || '--',
                年违约金率: util.percent2(record.PostRate),
                合约编号: record.CompactNo || "--",
                约定模式: dictionary.BusiCodeDic[record.BusiCode] || "--",
                约定融券价格: record.Price || "--",
                合约金额: record.Amount || "--",
                合约状态: dictionary.CompactStatus[record.CompactStatus] || "--", //0:正常 1:已超期 3:已了结 4:已提交归还申请
                展期次数: record.ExIndex,
                预计违约金: record.PostFee1,
                资金帐号: record.FundAccount || "--",
                原合约编号: record.OrigCompactNo || "--",

                // 约定类型: dictionary.AppType[record.AppType] || "--", //0:约定申请 2:撤单申请 3:展期申请 4:归还申请
                // 日期类型: dictionary.AppDateType[record.AppDateType] || "--",
                // 
                // 终止日期: record.TrdDate || "--",
                // 已还息费: record.ReturnFee || "--",
                // "年融资利率(融券费率)": util.percent2(record.FeeRate),
                // 交易所名称: dictionary.ExchangeType[record.ExchangeType] || "--",
                // 
            };
            this.$refs.pubMingxi.showModel()
        },
        onSearch() {
            this.pagination.current = 1
            this.getCoupons()
        },
        clearForm() {
            // this.form = defaultForm
            this.$refs.form.resetFields()
            this.pagination.current = 1
            this.getCoupons()
        },
        handleSelectionChange(val) {
             console.log(val)
            this.multipleSelection = val;
           
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
                "已了结合约查询.xlsx"
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
