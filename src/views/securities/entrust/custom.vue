<template>
    <div>
        <topNav
            :navList="navList"
            :current="current"
            @change="changeNav"
        ></topNav>
        <div class="bgfff pd30" style="padding-top:20px;">
            <div class="topButton">
                <div class="common_title j_c_a_i">
                    <span></span>
                    委托定制列表
                </div>
                <div class="handleBtnBox">
                    <el-button :disabled="multipleSelection.length==0" @click="confirm(1)">同意（{{multipleSelection.length}}）</el-button>
                    <el-button class="ml20" :disabled="multipleSelection.length==0" @click="confirm(2)">拒绝（{{multipleSelection.length}}）</el-button>
                </div>
            </div>
            <el-table 
                :data="tableData" 
                style="width: 100%" 
                class="pubTable" 
                @selection-change="handleSelectionChange"
                >
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column prop="AppDate" align="center" label="申报时间"></el-table-column>
                <el-table-column prop="BusiCode" align="center" label="约定模式">
                    <template slot-scope="scope">  
                        {{dictionary.BusiCodeDic[scope.row.BusiCode]}}
                    </template>
                </el-table-column>
                <el-table-column prop="StockCode" align="center" label="证券代码"></el-table-column>
                <el-table-column prop="Term" align="center" label="融券期限"></el-table-column>
                <el-table-column prop="AppNo" align="center" label="合约编号" width="240"></el-table-column>
                <el-table-column prop="FeeRate" align="center" label="约定融券费率">
                    <template slot-scope="scope">  
                        {{scope.row.FeeRate+'%'}}
                    </template>
                </el-table-column>
                <el-table-column prop="PostRate" align="center" label="违约金率">
                    <template slot-scope="scope">  
                        {{scope.row.PostRate+'%'}}
                    </template>
                </el-table-column>
                <el-table-column prop="PreRate" align="center" label="提前归还费率">
                    <template slot-scope="scope">  
                        {{scope.row.PreRate+'%'}}
                    </template>
                </el-table-column>
                <el-table-column prop="Qty" align="center" label="申报数量"></el-table-column>
                <el-table-column prop="AppDateType" align="center" label="约定日期类型">
                    <template slot-scope="scope">  
                        {{dictionary.AppDateType[scope.row.AppDateType]}}
                    </template>
                </el-table-column>
                <el-table-column prop="action" align="center" label="操作">
                    <template slot-scope="scope">  
                        <a href="javascript:void(0)" class="colorRed" @click="showMinxi(scope.row)">明细</a>
                    </template>
                </el-table-column>
            </el-table>
            <table-pagination
                ref="tablePagination"
                :totalSize="tableDataTotal"
                @changePage="handleChangePage"
            ></table-pagination>
            <pubNote padding="padding: 30px 0 30px;" />
            <!-- <div class="bus_page j_c_a_i pt30">
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
            </div> -->
        </div>
        <!-- 明细 -->
        <mingxi ref="mingxiModel" :editData="editData" ></mingxi>
        <!-- 提交成功倒计时 -->
        <!-- <countdownModel ref="successModel" :isFail="isFail" :text="successText"></countdownModel> -->

        <!-- 批量提交导入委托结果 -->
        <zqResult title="上传结果" tableTitle="上传结果" :failData="failData" :successData="successData" ref="resultModel" >
            <template slot="success">
                <el-table-column prop="StockCode" align="center" label="证券代码"></el-table-column>
                <el-table-column prop="StockName" align="center" label="证券名称"></el-table-column>
                <el-table-column prop="resultMsg" align="center" label="委托提交结果" width="450" show-overflow-tooltip></el-table-column>
            </template>
            <template slot="fail">
                <el-table-column prop="StockCode" align="center" label="证券代码"></el-table-column>
                <el-table-column prop="StockName" align="center" label="证券名称"></el-table-column>
                <el-table-column prop="resultMsg" align="center" label="失败原因" width="450" show-overflow-tooltip></el-table-column>
            </template>
        </zqResult>
    </div>
</template>

<script>
import topNav from "@/components/securities/topNav.vue";
import dictionary from "@/utils/dictionary";
import mingxi from "@/components/securities/showminxModel.vue";
import tablePagination  from '@/components/securities/tablePagination.vue';
import countdownModel from "@/components/securities/countdownModel.vue";
import pubNote from "@/components/securities/pubNote.vue";
import { securitiesRequest } from '@/api/securities/securities';
import zqResult from "./gh_components/zqResult.vue";
import { mapState } from 'vuex'

export default {
    components: {
        topNav,
        mingxi,
        countdownModel,
        tablePagination,
        zqResult,
        pubNote
    },
    data() {
        return {
            dictionary,
            navList: ["借入委托", "委托查询", "委托导入", "委托定制"],
            navUrl:['entrustBorrow', 'entrustQuery','entrustImport','entrustCustom'],
            current: 3,
            multipleSelection:[], //选中的数组
            tableDataAll:[
            ],
            tableData: [],
            editData:{},
            // isFail: false,
            successText:'',
            tableDataTotal: 0,
            successData: [],
            failData: [],
            
            // pagination:{
            //     pageSize: 10,
            //     current: 1,
            //     total: 5,
            // }
        };
    },
    computed: {
        ...mapState(['fundAccount'])
    },
    created() {
        this.getLists()
    },
    methods: {
        getLists() {
            var params = {
                FundAccount: this.fundAccount,
                OrderStatus:0,
            };
            securitiesRequest(params, 111).then((res) => {
                this.tableDataAll = res.data.filter((item) => item.OrderStatus == 0)
                this.setTableData()
                this.tableDataTotal = this.tableDataAll.length
            })
        },
        showMinxi(row){
            this.editData = row
            this.$refs.mingxiModel.showModel()
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        setTableData(){
            const { page, pageSize } = this.$refs.tablePagination.pagination
            const initDataIndex = (page-1)*pageSize
            this.tableData = this.tableDataAll.slice( initDataIndex ,initDataIndex + pageSize)
        },
        //同意或拒绝
        confirm(QueryMode){
            this.successData = []
            this.failData = []
            let addStatusFn = []
            this.multipleSelection.forEach(item =>{
                addStatusFn.push(this.addStatus(QueryMode, item))
            })
            Promise.all(addStatusFn).finally(() => {
                this.$refs.resultModel.showModel()
                this.getLists()
            })
            // Promise.all(addStatusFn).then(results => {
            //     const res = results[0]
            //     this.isFail = false
            //     this.successText = '已提交成功啦！'
            //     this.$refs.successModel.showModel()
            //     this.getLists();
            // }).catch(() => {
            //     this.isFail = true
            //     this.successText = '提交失败啦！'
            //     this.$refs.successModel.showModel()
            // })
            
        },
        // 同意或拒绝接口请求
        addStatus(QueryMode,item){
            var params = {
                AppNo: item.AppNo,
                OpStation: "127.0.0.1",
                FundAccount: this.fundAccount,
                QueryMode, //1：确认，2拒绝
            };

            return securitiesRequest(params, 112).then((res) => {
                this.tableDataAll = res.data.filter((item) => item.OrderStatus == 0)
                this.setTableData()
                item.resultMsg = '提交成功'
                this.successData.push(item)
            }).catch((err) => {
                item.resultMsg = err.errorMessage
                this.failData.push(item)
            })
        },
        handleChangePage(val) {
            this.getLists()
        },
        changeNav(index) {
            this.$router.push({name:this.navUrl[index]})
        },
    },
};
</script>


