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
                            <el-radio-group v-model="form.attribute" @change="changeAttribute">
                                <el-radio :label="0">全部</el-radio>
                                <el-radio :label="1">个券</el-radio>
                                <el-radio :label="2">篮子</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <div class="flex">
                            <div class="left el-form--inline">
                                <el-form-item  prop="StockCode" :label="attributeName[form.attribute]" v-if="form.attribute !== 0">
                                    <el-input v-model="form.StockCode" autocomplete="off" size="small" :placeholder="form.attribute==1?'请输入证券代码':'请输入篮子代码'"></el-input>
                                </el-form-item>
                                <el-form-item label="合约到期日起" prop="EndDate_Begin">
                                    <el-date-picker
                                        v-model="form.EndDate_Begin"
                                        type="date"
                                        format="yyyy-MM-dd"
                                        style="width: 180px"
                                        placeholder="选择合约到期日起"
                                        :picker-options="startPickerOptions">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="合约到期日至" prop="EndDate_End">
                                    <el-date-picker
                                        v-model="form.EndDate_End"
                                        type="date"
                                        format="yyyy-MM-dd"
                                        style="width: 180px"
                                        placeholder="选择合约到期日至"
                                        :picker-options="endPickerOptions">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="onSearch"
                                        >查询</el-button
                                    >
                                    <el-button @click="clearForm" size="small">重置</el-button>
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
                   未了结合约查询列表
                </div>
                <div class="handleBtnBox">
                    <el-button  @click="goDetail(1)">展期（{{extensionLength}}）</el-button>
                    <el-button  @click="goDetail">归还（{{returnLength}}）</el-button>
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
                fixed="left">
                </el-table-column>
                <el-table-column prop="CompactType" align="center" label="合约类型" width="90">
                    <template slot-scope="scope">  
                        {{dictionary.CompactType[scope.row.CompactType]}}
                    </template>
                </el-table-column>
                <el-table-column prop="StartDate" align="center" label="开始日期" width="90"></el-table-column>
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
                <el-table-column prop="CompactNo" align="center" label="合约编号"  width="240"></el-table-column>
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
                <el-table-column prop="StartDate" align="center" label="开始日期" width="90"></el-table-column>
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
                <el-table-column prop="CompactNo" align="center" label="合约编号"  width="240"></el-table-column>
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
                <el-table-column prop="OrigCompactNo" align="center" label="原合约编号"  width="240"></el-table-column>
                <el-table-column prop="TrdDate" align="center" label="交易日期" width="90"></el-table-column>
            </el-table>
            <table-pagination
                ref="tablePagination"
                :totalSize="tableDataTotal"
                @changePage="handleChangePage"
            ></table-pagination>
        </div>
        <!-- 提交成功倒计时 -->
        <!-- <countdownModel ref="successModel" :isFail="isFail" :text="successText"></countdownModel> -->
        <!-- 明细 -->
        <pubMingxi ref="pubMingxi" :detailData="detailData"></pubMingxi>
    </div>
</template>

<script>
import topNav from "@/components/securities/topNav.vue";
import pubMingxi from "@/components/securities/pubMingxi.vue"; //明细
import dictionary from "@/utils/dictionary";
import util from "@/utils/util";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import countdownModel from "@/components/securities/countdownModel.vue";
import tablePagination  from '@/components/securities/tablePagination.vue';
import { securitiesRequest } from '@/api/securities/securities';
import { mapState } from 'vuex'
import moment from "moment";
export default {
    components: {
        topNav,
        countdownModel,
        tablePagination,
        pubMingxi
    },
    data() {
        const that = this
        return {
            // isFail: false,
            attributeName: {
                1: '证券代码',
                2: '篮子代码'
            },
            dictionary,
            navList: ["未了结合约查询", "展期/提前了结查询"],
            navUrl:['contract','finishedQuery'],
            current: 0,
            form:{
                attribute:0,
                searchType:"0",
                StockCode: '',
                EndDate_Begin: '',
                EndDate_End: ''
            },
            multipleSelection:[],
            tableData:[
                
            ],
            tableDataTotal: 0,
            successText:'',
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
            endPickerOptions: {
                disabledDate(time) {
                    const EndDate_Begin = that.form.EndDate_Begin
                    if(EndDate_Begin){
                        return time.getTime() < new Date(EndDate_Begin).getTime();
                    }
                }
            },
            startPickerOptions: {
                disabledDate(time) {
                    const EndDate_End = that.form.EndDate_End
                    if(EndDate_End){
                        return time.getTime() > new Date(EndDate_End).getTime();
                    }
                }
            }
        }
    },
    created() {
        
    },
    mounted(){
        this.getLists(true)  // 获取全部数据，导出数据用
        this.getLists() // 获取分页数据，table渲染用
    },
    computed: {
        ...mapState(['fundAccount']),
        extensionLength(){
            return this.multipleSelection.filter((item) => item.ExQty == 0 && item.LeftQty > 0).length
        },
        returnLength(){
            return this.multipleSelection.filter((item) => {return item.ExQty < item.LeftQty}).length
        }
    },
    methods: {
        percent2: util.percent2,
        changeNav(index) {
            this.$router.push({name:this.navUrl[index]})
        },
        changeAttribute(){
            this.getLists(true)
            this.getLists()
        },
        onSearch() {
            this.getLists(true)
            this.getLists()
        },
        clearForm() {
            this.$nextTick(()=> {
                this.$refs.form.resetFields()
                this.getLists(true)
                this.getLists()
            })
        },
        handleSelectionChange(val) {
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
                "未了结合约.xlsx"
                );
            } catch (e) {
                console.log(e, etout);
            }
            return etout;
        },
        handleChangePage() {
            this.getLists()
        },
        getLists(all) {
            const { fundAccount, form: { attribute, EndDate_Begin, EndDate_End, StockCode } } = this
            var params = {
                RouteID: "W", //委托渠道
                OperatorID: fundAccount, //操作员ID
                FundAccount: fundAccount, //资产账号
                CompactStatus: "0", //未了结合约
                EndDate_Begin: EndDate_Begin?moment(EndDate_Begin).format('YYYYMMDD'):'', //到期日期开始
                EndDate_End: EndDate_End?moment(EndDate_End).format('YYYYMMDD'):'', //到期日期结束
                QueryMode: "A", //默认: A：全部（未送参数时按A处理） 1: 按证券代码查询 3:按篮子查询
            };
            if(!all){
                const { page, pageSize } = this.$refs.tablePagination.pagination;
                params.Page = page
                params.PageSize = pageSize
            }

            if (attribute == 1) {
                //选中了个券
                params.BasketProp = 0
                if(StockCode){
                    params.StockCode = StockCode;
                    params.QueryMode = 1; //按照证券查询
                }
                console.log(params.BasketProp)
            } else if (attribute == 2)  {
                params.BasketProp = 1
                if(StockCode){
                    params.StockCode = StockCode;
                    params.QueryMode = 3; //按照篮子查询
                }
            }
            
            securitiesRequest(params, 110).then((res) => {
                if(all){
                    this.totalData = res.data;
                }else {
                    this.tableDataTotal = res.recordNum;
                    this.tableData = res.data;
                }
            })
        },
        goDetail(type){
            this.$router.beforeEach((to, from, next) => {
                //通过该方式可以保存 VueRouter 的数据不被刷新
                localStorage.setItem("selectData", JSON.stringify(this.multipleSelection));
                next();
            });
            if (type == 1) {
                //展期
                this.$router.push({
                name: "extension",
                });
            } else {
                //归还
                this.$router.push({
                name: "return",
                });
            }
        },
        //查看详情
        showDetail(record){
            this.detailData = {
                合约类型: dictionary.CompactType[record.CompactType],
                开始日期: record.StartDate || "--",
                到期日期: record.EndDate || "--",
                证券代码: record.StockCode || "--",
                证券名称: record.StockName || "--",
                合约数量: record.Qty || "--",
                合约期限: record.Term || "--",
                融券费率: util.percent2(record.FeeRate),
                提前归还费率: util.percent2(record.PreRate),
                应记息费: record.IntFee || "--",
                展期标志: dictionary.ExFlag[record.ExFlag],
                年违约金率: util.percent2(record.PostRate), 
                合约编号: record.CompactNo || "--",
                约定模式: dictionary.BusiCodeDic[record.BusiCode] || "--",
                约定融券价格: record.Price || "--",
                合约金额: record.Amount || "--",
                合约状态: dictionary.CompactStatus[record.CompactStatus] || "--", //0:正常 1:已超期 3:已了结 4:已提交归还申请
                展期次数: record.ExIndex || "--",
                预计违约金: util.percent2(record.PostFee1),
                资金帐号: record.FundAccount || "--",
                原合约编号: record.OrigCompactNo || "--",
                交易日期: record.TrdDate,

                // 约定类型: dictionary.CompactType[record.CompactType] || "--", //0:约定申请 2:撤单申请 3:展期申请 4:归还申请
                // 日期类型: dictionary.AppDateType[record.AppDateType] || "--",
                // 终止日期: record.TrdDate || "--",
                // 已还息费: record.ReturnFee || "--",
                // 交易所名称: dictionary.ExchangeType[record.ExchangeType] || "--",
            };
            this.$refs.pubMingxi.showModel()
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
