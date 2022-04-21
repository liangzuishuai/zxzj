<template>
    <div>
        <topNav
            :navList="navList"
            :current="current"
            @change="changeNav"
        ></topNav>
        <div class="bgfff pd30" style="padding-top: 20px">
            <div class="topButton">
                <div class="common_title j_c_a_i">
                    <span></span>
                    委托导入列表
                </div>
                <div class="handleBtnBox">
                    <el-upload
                        ref="upload"
                        class="uploadbtn mr20"
                        :on-change="importExcel"
                        :auto-upload="false"
                        :show-file-list="false"
                        action=""
                    >
                        <el-button>导入文件</el-button>
                    </el-upload>
                    <a v-if="tableData.length === 0" href="http://statics.citicsinfo.com/xinweb/%E4%BF%A1%E7%94%A8%E5%88%B8%E5%8D%95%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx">
                        <el-button> 导出文件/模板 </el-button>
                    </a>
                    <a v-else href="javascript:void(0);">
                        <el-button @click="exportData" :loading="exportLoading"> 导出文件/模板 </el-button>
                    </a>
                </div>
            </div>
            <el-table
                :data="tableData"
                style="width: 100%"
                class="pubTable"
                :row-class-name="rowClassName"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" fixed="left"></el-table-column>
                <el-table-column
                    type="index"
                    prop="number"
                    align="center"
                    label="序号"
                    width="80"
                    :index="1"
                ></el-table-column>
                <el-table-column
                    prop="status"
                    align="center"
                    label="状态"
                    width="120"
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                    prop="StockCode"
                    align="center"
                    label="股票代码"
                    width="120"
                >
                    <template slot-scope="scope">  
                        {{scope.row.StockCode || '--'}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="BusiCode"
                    align="center"
                    label="约定模式"
                    width="120"
                >
                    <template slot-scope="scope">
                        <el-select
                            v-model="scope.row.BusiCode"
                            style="width: 100px"
                            size="small"
                            @change="getRate(scope.row, scope.$index)"
                            :disabled="noEdit(scope.row.status)"
                        >
                            <el-option value="110B" label="T+0"></el-option>
                            <el-option value="111B" label="T+1"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="TermInDays"
                    align="center"
                    label="融券期限"
                    width="100"
                >
                    <template slot-scope="scope">
                        <el-input
                            v-model="scope.row.TermInDays"
                            style="width: 60px"
                            size="small"
                            :min="2"
                            :max="182"
                            onkeyup="this.value=this.value.replace(/\D|^0/g,'')"
                            onafterpaste="this.value=this.value.replace(/\D|^0/g,'')"
                            @blur="termLimt(scope.$index, scope.row)"
                            @change="getRate(scope.row, scope.$index)"
                            :disabled="noEdit(scope.row.status)"
                        />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="Count"
                    align="center"
                    label="申报数量"
                    width="100"
                >
                    <template slot-scope="scope">
                        <el-input
                            v-model="scope.row.Count"
                            style="width: 60px"
                            size="small"
                            onkeyup="this.value=this.value.replace(/\D|^0/g,'')"
                            onafterpaste="this.value=this.value.replace(/\D|^0/g,'')"
                            :disabled="noEdit(scope.row.status)"
                        />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="AppDateType"
                    align="center"
                    label="约定日期类型"
                    width="160px"
                >
                    <template slot-scope="scope">
                        <el-select
                            v-model="scope.row.AppDateType"
                            style="width: 160px"
                            size="small"
                            @change="getRate(scope.row, scope.$index)"
                            :disabled="noEdit(scope.row.status)"
                        >
                            <el-option :value="1" label="该日（含）前有效"></el-option>
                            <el-option :value="0" label="仅当日有效"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="AppDate"
                    align="center"
                    label="约定日期"
                    width="140"
                >
                    <template slot-scope="scope">
                        <el-date-picker
                            v-model="scope.row.AppDate"
                            type="date"
                            format="yyyyMMdd"
                            value-format="yyyyMMdd"
                            size="small"
                            style="width: 120px"
                            placeholder="选择日期"
                            :disabled="noEdit(scope.row.status)"
                        >
                        </el-date-picker>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="BidFlag"
                    align="center"
                    label="是否竞价"
                    width="80"
                >
                    <template slot-scope="scope">
                        <el-select
                            v-model="scope.row.BidFlag"
                            style="width: 60px"
                            size="small"
                            @change="custrateChange(scope.row, scope.$index)"
                            :disabled="noEdit(scope.row.status)"
                        >
                            <el-option :value="1" label="是"></el-option>
                            <el-option :value="0" label="否"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="CustRate"
                    align="center"
                    label="竞价费率"
                    width="110"
                >
                    <template slot-scope="scope">
                        <el-input
                            v-if="scope.row.BidFlag == 1"
                            v-model="scope.row.CustRate"
                            style="width: 60px"
                            size="small"
                            @blur="Cruesd(scope.row)"
                            onkeyup="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')"
                            :disabled="noEdit(scope.row.status)"
                        />
                        <el-input
                            v-if="scope.row.BidFlag == 0"
                            size="small"
                            disabled
                            style="width: 60px"
                        />
                        %
                    </template>
                </el-table-column>
                <el-table-column
                    prop="FeeRate"
                    align="center"
                    label="融券费率"
                    width="90"
                >
                    <template slot-scope="scope">
                        {{ decidEmpty(scope.row.FeeRate)}}
                    </template>
                </el-table-column>
                <el-table-column prop="PreRate" align="center" width="90">
                    <template slot="header">
                        提前<br />了结费率
                    </template>
                    <template slot-scope="scope">
                        {{ decidEmpty(scope.row.PreRate)}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="PostRate"
                    align="center"
                    label="罚息费率"
                    width="90"
                >
                    <template slot-scope="scope">
                        {{ decidEmpty(scope.row.PostRate)}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="BasketNo"
                    align="center"
                    label="篮子编号"
                    width="120"
                >
                     <template slot-scope="scope">  
                        {{scope.row.BasketNo || '--'}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="action"
                    align="center"
                    label="操作"
                    width="120"
                    fixed="right"
                >
                    <template slot-scope="scope">
                        <div class="tableHandle">
                            <a
                                href="javascript:void(0)"
                                class="colorBlue"
                                @click="Delete(scope.$index, scope.row)"
                                >删除</a
                            >
                            <a
                                href="javascript:void(0)"
                                :class="scope.row.status === '未提交' ? 'colorRed' : 'colorGrey'"
                                @click="singleSubmit(scope.row, true)"
                                >提交</a
                            >
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 导出的table -->
            <el-table
                :data="tableData"
                style="width: 100%; display:none;"
                class="pubTable"
                id="tableExport"
            >
                <el-table-column
                    type="index"
                    prop="number"
                    align="center"
                    label="序号"
                    width="80"
                    :index="1"
                ></el-table-column>
                <el-table-column
                    prop="status"
                    align="center"
                    label="状态"
                    width="120"
                ></el-table-column>
                <el-table-column
                    prop="StockCode"
                    align="center"
                    label="股票代码"
                    width="120"
                >
                    <template slot-scope="scope">  
                        {{scope.row.StockCode || '--'}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="BusiCode"
                    align="center"
                    label="约定模式"
                    width="120"
                >
                    <template slot-scope="scope">  
                        {{dictionary.BusiCodeDic[scope.row.BusiCode] || '--'}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="TermInDays"
                    align="center"
                    label="融券期限"
                    width="100"
                >
                    <template slot-scope="scope">  
                        {{scope.row.TermInDays || '--'}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="Count"
                    align="center"
                    label="申报数量"
                    width="100"
                >
                    <template slot-scope="scope">  
                        {{scope.row.Count || '--'}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="AppDateType"
                    align="center"
                    label="约定日期类型"
                    width="160px"
                >
                    <template slot-scope="scope">  
                        {{dictionary.AppDateType[scope.row.AppDateType] || '--'}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="AppDate"
                    align="center"
                    label="约定日期"
                    width="140"
                >
                    <template slot-scope="scope">  
                        {{scope.row.AppDate || '--'}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="BidFlag"
                    align="center"
                    label="是否竞价"
                    width="80"
                >
                    <template slot-scope="scope">  
                        {{dictionary.BidFlag[scope.row.BidFlag] || '--'}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="CustRate"
                    align="center"
                    label="竞价费率"
                    width="110"
                >
                    <template slot-scope="scope">
                        {{ decidEmpty(scope.row.FeeRate)}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="FeeRate"
                    align="center"
                    label="融券费率"
                    width="90"
                >
                    <template slot-scope="scope">
                        {{ decidEmpty(scope.row.FeeRate)}}
                    </template>
                </el-table-column>
                <el-table-column prop="PreRate" align="center" width="90">
                    <template slot="header" slot-scope="scope">
                        提前<br />了结费率
                    </template>
                    <template slot-scope="scope">
                        {{ decidEmpty(scope.row.PreRate)}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="PostRate"
                    align="center"
                    label="罚息费率"
                    width="90"
                >
                    <template slot-scope="scope">
                        {{ decidEmpty(scope.row.PostRate)}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="BasketNo"
                    align="center"
                    label="篮子编号"
                    width="120"
                >
                    <template slot-scope="scope">  
                        {{scope.row.BasketNo || '--'}}
                    </template>
                </el-table-column>
            </el-table>
            
            <!-- <table-pagination
                ref="tablePagination"
                :totalSize="tableDataTotal"
                layoutP="total, prev, pager, next, jumper"
                @changePage="handleChangePage"
            ></table-pagination> -->
            <div class="submitBox">
                <el-button :disabled="multipleSelection.length == 0" @click="deleteSelection"
                    >删除（{{ multipleSelection.length }}）</el-button
                >
                <el-button
                    class="ml20 submitbtn"
                    @click="submitAll"
                    :disabled="canSubmitData.length == 0"
                    >提交（{{ canSubmitData.length }}）</el-button
                >
            </div>
            <pubNote padding="padding: 30px 0 30px;" />
            
        </div>

        <!-- 提交成功/失败倒计时 -->
        <countdownModel
            ref="successModel"
            :text="successText"
            :isFail="isFail"
        ></countdownModel>

        <!-- 批量导入结果 -->
        <!-- <zqResult title="导入结果" tableTitle="导入结果" :failData="failData" :successData="successData" ref="importResultModel" >
            <template slot="fail">
                <el-table-column prop="StockCode" align="center" label="证券代码"></el-table-column>
                <el-table-column prop="errorMessage" align="center" label="导入结果" width="450" show-overflow-tooltip></el-table-column>
            </template>
        </zqResult> -->
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
import util from "@/utils/util";
import importUtil from "@/utils/importUtil";
import xlsx from "xlsx";
import countdownModel from "@/components/securities/countdownModel.vue";
// import tablePagination  from '@/components/securities/tablePagination.vue';
import pubNote from "@/components/securities/pubNote.vue";
import { securitiesRequest } from '@/api/securities/securities';
import { mapState } from 'vuex'
import zqResult from "./gh_components/zqResult.vue"; //导入委托上传结果
// let datas = [];
import moment from "moment";
export default {
    components: {
        topNav,
        countdownModel,
        // tablePagination,
        zqResult,
        pubNote
    },
    data() {
        return {
            dictionary,
            navList: ["借入委托", "委托查询", "委托导入", "委托定制"],
            navUrl:['entrustBorrow', 'entrustQuery','entrustImport','entrustCustom'],
            current: 2,
            multipleSelection: [], //选中的数组
            tableData: [
            ],
            // datas: [],
            // tableDataTotal: 0,
            decidEmpty: util.decidEmpty,
            successText: "",
            isFail: false,
            tableEnd: false,
            successData: [],
            failData: [],
            exportLoading: false
        };
    },
    created() {},
    mounted() {},
    computed: {
        ...mapState(['fundAccount']),
        canSubmitData(){
            return this.multipleSelection.filter(item=>item.status === '未提交')
        }
    },
    methods: {
        noEdit: importUtil.noEdit,
        rowClassName({row, rowIndex}){
        },
        changeNav(index) {
            this.$router.push({ name: this.navUrl[index] });
        },
        onSearch() {},
        clearForm() {},
        // 批量删除
        deleteSelection(){
            this.multipleSelection.forEach((item) => {
                const tableIndex = this.tableData.indexOf(item)
                this.tableData.splice(tableIndex, 1)
                // this.datas.splice(tableIndex, 1)
            })
            // this.tableDataTotal = datas.length
            // this.handleChangePage()
        },
        //单个删除
        Delete(index, row) {
            this.tableData.splice(index, 1)
            // this.datas.splice(index, 1)
            // this.handleChangePage()
        },

        //获取股票融券费率等
        // getBusiCode(index, row) {
        //     console.log(row);
        // },
        //是否竞价切换
        custrateChange(row, index) {
            if (row.BidFlag == 1) {
                if (row.CustRate < row.FeeRate) {
                    row.CustRate = row.FeeRate;
                }
            }
            if (row.BidFlag == 0) {
                //不竞价 需要重新获取融券费率等
                //调用接口
                this.getRate(row, index)
            }
        },
        // 竞价光标事件
        Cruesd(record) {
            if (record.CustRate < record.FeeRate) {
                this.$message({
                    message: `竞价费率不得小于${record.FeeRate}`,
                    type: "warning",
                });
                record.CustRate = record.FeeRate;
                return;
            }
            if (record.CustRate >= 100) {
                this.$message({
                    message: `"竞价费率最大为100%"`,
                    type: "warning",
                });
                record.CustRate = 100;
                return;
            }
            if (record.CustRate.length <= 4) {
                record.PreRate = record.CustRate;
            } else {
                let Arrter =
                    record.CustRate.toString().match(/^\d+(?:\.\d{0,2})?/);
                this.$nextTick(() => {
                    record.CustRate = Arrter[0];
                    // record.PreRate = record.CustRate
                });
            }
        },
        //上传选择文件
        async importExcel(ev) {
            let file = ev.raw;
            let reader = await util.uploadXlsx(file);
            const worker = xlsx.read(reader, { type: "binary" });
            reader = xlsx.utils.sheet_to_json(
                worker.Sheets[worker.SheetNames[0]]
            );
            const initData = await this.initData(reader)

            // // 校验数据
            if(initData.length==0){
                this.$message("请至少填写一条数据")
                return;
            }
            const data = await this.checkImportData(initData)
            // if(data.length>0){
            this.tableData = this.initTablelData(data)
                // this.tableDataTotal = data.length
                // this.setTabelData(0, this.$refs.tablePagination.pagination.pageSize);
            // }
            // this.$refs.importResultModel.showModel()
        },
        initData(data) {
            const datas = []
            for (var i in data) {
                datas[i] = {};
                for (var ci in data[i]) {
                    if (ci.indexOf("股票代码") != -1) {
                        datas[i].StockCode = data[i][ci];
                    }
                    if (ci.indexOf("约定模式") != -1) {
                        datas[i].BusiCode = data[i][ci];
                    }
                    if (ci.indexOf("融券期限") != -1) {
                        datas[i].TermInDays = data[i][ci];
                    }
                    if (ci.indexOf("申报数量") != -1) {
                        datas[i].Count = data[i][ci];
                    }
                    if (ci.indexOf("约定日期类型") != -1) {
                        datas[i].AppDateType = data[i][ci];
                    }
                    if (ci.indexOf("约定日期") != -1) {
                        datas[i].AppDate = data[i][ci] + ''
                    }
                    if (ci.indexOf("是否竞价") != -1) {
                        datas[i].BidFlag = data[i][ci];
                    }
                    if (ci.indexOf("竞价费率") != -1) {
                        datas[i].CustRate = util.Multiply(data[i][ci], 100);
                    }
                    if (ci.indexOf("篮子编号") != -1) {
                        datas[i].BasketNo = data[i][ci];
                    }
                }
                datas[i].status = '未提交'
            }
            // this.datas = datas
            return datas;
        },
        //校验导入数据的正确性
        checkImportData(data){
            // let that = this;
            // let successData = [];
            // let failData = [];
            const avalidDic = {
                StockCode: '股票代码不能为空',
                BusiCode: '约定不能为空',
                TermInDays: '融券期限不能为空',
                Count: '申报不能为空',
                AppDateType: '约定日期类型不能为空',
                AppDate: '约定日期不能为空',
                BidFlag: '是否竞价不能为空',
                CustRate: '竞价费率不能为空'
            }

            data.forEach((item,index) => {
                for(let k in avalidDic){
                    const value = item[k]
                    if( importUtil.checkNull(value) || 
                        (k === 'StockCode' && importUtil.checkErrStockCode(value)) ||
                        (k === 'AppDate' && importUtil.checkErrDate(value)) ||
                        (k === 'CustRate' && importUtil.checkErrFate(value))
                    ) {
                        item.status = '导入失败（数据不符合规范）'
                    }
                }

                // if(that.checkNull(item.StockCode)){
                //     if(typeof item.StockCode == 'number'){
                //         if(that.checkNull(item.BusiCode)){
                //             if(that.checkNull(item.TermInDays)){
                //                 if(that.checkNull(item.Count)){
                //                     if(that.checkNull(item.AppDateType)){
                //                         if(that.checkNull(item.AppDate)){
                //                             if(moment(item.AppDate +'').format("YYYY-MM-DD")=='Invalid date'){
                //                                 item.errorMessage = '约定日期不规范'
                //                                 failData.push(item)
                //                             }else{
                //                                 if(that.checkNull(item.BidFlag)){
                //                                     if(that.checkNull(item.CustRate)){
                //                                         if(item.CustRate>100){
                //                                             item.errorMessage = '竞价费率不能超过100'
                //                                             failData.push(item)
                //                                         }else{
                //                                             item.errorMessage = '导入成功'
                //                                             successData.push(item)
                //                                         }
                                                        
                //                                     }else{  
                //                                         item.errorMessage = '竞价费率不能为空'
                //                                         failData.push(item)
                //                                     }
                                                    
                //                                 }else{  
                //                                     item.errorMessage = '是否竞价不能为空'
                //                                     failData.push(item)
                //                                 }
                //                             }
                                            
                //                         }else{
                //                             item.errorMessage = '约定日期不能为空'
                //                             failData.push(item)
                //                         }
                //                     }else{
                //                         item.errorMessage = '约定日期类型不能为空'
                //                         failData.push(item)
                //                     }
                //                 }else{
                //                     item.errorMessage = '申报不能为空'
                //                     failData.push(item)
                //                 }
                //             }else{
                //                 item.errorMessage = '融券期限不能为空'
                //                 failData.push(item)
                //             }
                //         }else{
                //             item.errorMessage = '约定不能为空'
                //             failData.push(item)
                //         }
                //     }else{
                //         item.StockCode = item.StockCode +''
                //         let strArr = item.StockCode.split(".");
                //         if(strArr.length>1){
                //             if(strArr[1].toLowerCase() != "sz"&&strArr[1].toLowerCase() != "sh"){
                //                 item.errorMessage = '股票代码格式不规范'
                //                 failData.push(item)
                //             }else{
                //                 if(that.checkNull(item.BusiCode)){
                //                     if(that.checkNull(item.TermInDays)){
                //                         if(that.checkNull(item.Count)){
                //                             if(that.checkNull(item.AppDateType)){
                //                                 if(that.checkNull(item.AppDate)){
                //                                     if(moment(item.AppDate +'').format("YYYY-MM-DD")=='Invalid date'){
                //                                         item.errorMessage = '约定日期不规范'
                //                                         failData.push(item)
                //                                     }else{
                //                                         if(that.checkNull(item.BidFlag)){
                //                                             if(that.checkNull(item.CustRate)){
                //                                                 if(item.CustRate>100){
                //                                                     item.errorMessage = '竞价费率不能超过100'
                //                                                     failData.push(item)
                //                                                 }else{
                //                                                     item.errorMessage = '导入成功'
                //                                                     successData.push(item)
                //                                                 }
                                                                
                //                                             }else{  
                //                                                 item.errorMessage = '竞价费率不能为空'
                //                                                 failData.push(item)
                //                                             }
                                                            
                //                                         }else{  
                //                                             item.errorMessage = '是否竞价不能为空'
                //                                             failData.push(item)
                //                                         }
                //                                     }
                                                    
                //                                 }else{
                //                                     item.errorMessage = '约定日期不能为空'
                //                                     failData.push(item)
                //                                 }
                //                             }else{
                //                                 item.errorMessage = '约定日期类型不能为空'
                //                                 failData.push(item)
                //                             }
                //                         }else{
                //                             item.errorMessage = '申报不能为空'
                //                             failData.push(item)
                //                         }
                //                     }else{
                //                         item.errorMessage = '融券期限不能为空'
                //                         failData.push(item)
                //                     }
                //                 }else{
                //                     item.errorMessage = '约定不能为空'
                //                     failData.push(item)
                //                 }
                //             }
                //         }else{
                //             item.errorMessage = '股票代码格式不规范'
                //             failData.push(item)
                            
                //         }
                //     }

                // }else{
                //     item.errorMessage = '股票代码不能为空'
                //     failData.push(item)
                // }
            })
            // this.successData = successData
            // this.failData = failData
            // this.datas = successData
            // datas = data
            return data
        },
//         checkNull(data){
//             if(data==0){
//                 return true
//             }else{
//                 return data!=''&&data!=null&&data!=undefined
//             }
//         },
        // handleChangePage(){
        //     const { page, pageSize } = this.$refs.tablePagination.pagination
        //     const startIndex = ( page - 1) * pageSize
        //     this.setTabelData(startIndex, startIndex + pageSize)
        //     if(page != 1 && this.tableData.length === 0){
        //         this.$refs.tablePagination.minPage()
        //         this.setTabelData(startIndex - pageSize, startIndex)
        //     }
        // },
        // setTabelData(startIndex, endIndex){
        //     this.tableData = []
        //     if(endIndex > datas.length){
        //         endIndex = datas.length
        //     }
        //     for(let i = startIndex; i < endIndex; i++){
        //         datas[i].AppDate = moment(datas[i].AppDate +'').format("YYYY-MM-DD")
        //         this.tableData.push(datas[i])
        //     }
        // },
        initTablelData(data){
            data.forEach((item, index) => {
                if(item.status === '未提交'){
                    item.StockCode = item.StockCode + "";
                    this.getRate(item, index);
                }
            })
            return data
        },
        handleSelectionChange(val, index) {
            this.multipleSelection = val;
        },
        //限制输入融券期限2~182天
        termLimt(index, row) {
            if (row.TermInDays > 182) {
                row.TermInDays = 182;
            }
            if (row.TermInDays < 2) {
                row.TermInDays = 2;
            }
        },
        getRate(data, index) {
            // 融券期限 2-182
            // 申报数量	100的整数倍
            // 证券代码 有.stock 无.篮子
            // this.total = data.length;
            // return
            var params = {
                BusiCode: data.BusiCode, //业务类型
                TermInDays: data.TermInDays, //融券期限
                // ExchangeType:this.getEXCHID(data.StockCode), //市场代码
                ExchangeType: "B3",
                StockCode: "", //证券代码
                FundAccount: this.fundAccount, //资金帐号
            };
            if (!params.ExchangeType) {
                delete params.ExchangeType;
            }
            const StockCode = data.StockCode || '';
            let strArr = StockCode.split(".");
            if (strArr.length<2) {
                // params.ExchangeType = "B";
                params.StockCode = StockCode;
                params.PricingType = 'Basket'
            } else {
                if (strArr[1] && strArr[1].toLowerCase() === "sz") {
                    params.ExchangeType = 2;
                    params.PricingType = 'Stock'
                    params.StockCode = strArr[0];
                }
                if (strArr[1] && strArr[1].toLowerCase() === "sh") {
                    params.ExchangeType = 1;
                    params.StockCode = strArr[0];
                    params.PricingType = 'Stock'
                }
            }
            securitiesRequest(params, 115).then((res) => {
                const d = res.data[0];
                for (var k in d ){
                    this.$set(this.tableData[index], k, d[k])
                }
            }).catch(err => {
                const errorMessage = err.errorMessage || err.message
                if(errorMessage.indexOf('timeout') !=-1 ){
                    this.$set(this.tableData[index], 'status', '导入失败（接口调用超时)')
                }else {
                    this.$set(this.tableData[index], 'status', '导入失败（' + errorMessage + ')')
                }
            })
        },
        // 批量提交
        submitAll(){
            this.successData = []
            this.failData = []
            const resultP = []
            this.canSubmitData.forEach(( item ) => {
                resultP.push(this.singleSubmit(item))
            });

            Promise.all(resultP).finally(() => {
                this.$refs.resultModel.showModel()
            })
        },
        // 单个提交
        singleSubmit(item, isSingle){
            if(item.status !== '未提交'){
                return
            }
            const params = {
                RouteID: "W",
                OpStation: "127.0.0.1",
                OperatorID: this.fundAccount,
                CurrDate: util.getNowFormatDate(),
                FundAccount: this.fundAccount,
                BasketType: 3,
                BasketNo:item.BasketNo,
                BasketProp: (item.StockCode + "" ).indexOf(".") == -1 ? 1 : 0, //0-非篮子 1-篮子
                StockCode:item.StockCode,
                Term: item.TermInDays,
                AppDateType:item.AppDateType,
                // StartDate: moment(item.AppDate).format("YYYYMMDD"),
                AppDate: moment(item.AppDate).format("YYYYMMDD"),
                BidFlag:item.BidFlag,
                Qty: item.Count,
                CustRate:item.CustRate,
                AppRate: item.FeeRate,
                PreRate:item.PreRate,
                PostRate:item.PostRate,
            };
            if (item.BusiCode == "110B") {
                params.TradeType = 0;
            } else if (item.BusiCode == "111B") {
                params.TradeType = 1;
            }
            if (typeof item.StockCode == "number" ) {
                params.ExchangeType = "";
                params.StockCode = item.StockCode;
            } else {
                let strArr = item.StockCode.split(".");
                if (strArr[1] && strArr[1].toLowerCase() === "sz") {
                    params.ExchangeType = 2;
                    params.StockCode = strArr[0];
                }
                if (strArr[1] && strArr[1].toLowerCase() === "sh") {
                    params.ExchangeType = 1;
                    params.StockCode = strArr[0];
                }
            }

            return securitiesRequest(params, 104).then((res) => {
                if (res.errorCode == "0") {
                    //提交成功后提示
                    item.status = '提交成功'
                    if(isSingle){
                        this.isFail = false
                        this.successText = '您的委托单已提交成功啦！'
                        this.$refs.successModel.showModel()
                    }else {
                        item.resultMsg = '提交成功'
                        this.successData.push(item)
                    }
                   
                }
            }).catch((err) => {
                //提交失败后提示
                const errorMessage = err.errorMessage || err.message
                if(errorMessage.indexOf('timeout') !=-1 ){
                    item.status = '提交失败（接口调用超时)'
                }else {
                    item.status = '提交失败（' + errorMessage + ')'
                }
            
                if(isSingle){
                    this.isFail = true
                    this.successText = '您的委托单提交失败啦！'
                    this.$refs.successModel.showModel()
                }else {
                    item.resultMsg = errorMessage
                    this.failData.push(item)
                }
                
            })
        },
        //导出文件/模板
        exportData(){
            this.exportLoading = true;
            if (this.tableData.length == 0) {
                this.$message({
                    message: '暂无可导出数据！',
                    type: 'warning'
                });
                this.exportLoading = false;
                return;
            }
            this.$nextTick(() => {
                importUtil.exportDataMethod('#tableExport', '委托导入');
                this.exportLoading = false;
            });
        },
    },
};
</script>

<style scoped>
.submitBox {
    padding-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.colorGrey {
    color: #eee;
    cursor: default;
}
/deep/ .submitBox .el-button {
    width: 150px;
    height: 54px;
    border-radius: 5px;
    color: #c5181f;
    border: 1px solid #c5181f;
    font-size: 18px;
}
/deep/ .submitBox .el-button.submitbtn {
    background-color: #c5181f;
    color: #fff;
}
</style>
