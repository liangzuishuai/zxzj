<template>
    <div>
        <topNav title="归还"></topNav>
        <div class="topButton" style="margin-top:20px;">
            <div class="handleBtnBox">
                <el-button :disabled="canSubmitData.length==0" @click="LeftQty1Seve">自动填充归还数量（{{canSubmitData.length}}）</el-button>
                <el-upload
                    ref="upload"
                    class="uploadbtn ml20"
                    :on-change="importExcel"
                    :auto-upload="false"
                    :show-file-list="false"
                    action=""
                    >
                    <el-button>导入文件</el-button>
                </el-upload>
                <a v-if="tableData.length === 0" href="https://statics.citics.com/xinweb/%E5%BD%92%E8%BF%98%E6%B8%85%E5%8D%95%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx">
                    <el-button class="ml20">
                        导出文件/模板
                    </el-button>
                </a>
                <el-button  class="ml20" v-else @click="exportData" :loading="exportLoading"> 导出文件/模板 </el-button>
            </div>
        </div>
        <div  class="bgfff" style="padding-bottom:30px;">
            <el-table 
                :data="tableData" 
                style="width: 100%" 
                class="pubTable" 
                @selection-change="handleSelectionChange"
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
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                type="selection"
                width="55" fixed="left">
                </el-table-column>
                <el-table-column prop="LeftQty1" align="center" label="归还数量" width="140">
                    <template slot-scope="scope">  
                       <EditableCell
                        :text="scope.row.LeftQty1 + ''"
                        :record="scope.row"
                        dataName="guihuan"
                        @change="onCellChange(scope.row, 'LeftQty1', $event)"
                        :noEdit="noEdit(scope.row.status)"
                    />
                    </template>
                    
                </el-table-column>
                <el-table-column prop="LeftQty2" align="center" label="未还数量">
                    <template slot-scope="scope">  
                        {{scope.row.LeftQty2 || '--'}}
                    </template>
                </el-table-column>
                <el-table-column prop="PreRate" align="center" label="提前归还费率" width="90">
                    <template slot-scope="scope">  
                        {{decidEmpty(scope.row.PreRate)}}
                    </template>
                </el-table-column>
                <el-table-column prop="PostRate" align="center" label="违约金率">
                    <template slot-scope="scope">  
                        {{decidEmpty(scope.row.PostRate)}}
                    </template>
                </el-table-column>
                <el-table-column prop="EndDate" align="center" label="到期日期"   width="90">
                    <template slot-scope="scope">  
                        {{scope.row.EndDate || '--'}}
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="AppDateType" align="center" label="日期类型" width="90">
                    <template slot-scope="scope">  
                        {{dictionary.AppDateType[scope.row.AppDateType]|| "--"}}
                    </template>
                </el-table-column> -->
                 <el-table-column prop="CompactNo" align="center" label="合约编号"   width="240">
                    <template slot-scope="scope">  
                        {{scope.row.CompactNo || '--'}}
                    </template>
                 </el-table-column>
                <el-table-column prop="StockCode" align="center" label="证券代码">
                    <template slot-scope="scope">  
                        {{scope.row.StockCode || '--'}}
                    </template>
                </el-table-column>
                <el-table-column prop="StockName" align="center" label="证券名称">
                    <template slot-scope="scope">  
                        {{scope.row.StockName || '--'}}
                    </template>
                </el-table-column>
                <el-table-column prop="AppType" align="center" label="约定类型">
                    <template slot-scope="scope">  
                        {{dictionary.AppType[scope.row.AppType] || '--'}}
                    </template>
                </el-table-column>
                <el-table-column prop="BusiCode" align="center" label="约定模式">
                    <template slot-scope="scope">  
                        {{dictionary.BusiCodeDic[scope.row.BusiCode] || '--'}}
                    </template>
                </el-table-column>
                <el-table-column prop="action" align="center" label="操作" width="120" fixed="right">
                    <template slot-scope="scope">
                        <div class="tableHandle">
                            <a href="javascript:void(0)" class="colorBlue" @click="deleteSingle(scope.row)">删除</a>
                            <a href="javascript:void(0)" class="colorRed" @click="showMingxi(scope.row)">明细</a>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 导出用的table -->
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
                <el-table-column prop="LeftQty1" align="center" label="归还数量" width="140">
                    <template slot-scope="scope">  
                        {{scope.row.LeftQty1 || '--'}}
                    </template>
                </el-table-column>
                <el-table-column prop="LeftQty2" align="center" label="未还数量">
                    <template slot-scope="scope">  
                        {{scope.row.LeftQty2 || '--'}}
                    </template>
                </el-table-column>
                <el-table-column prop="PreRate" align="center" label="提前归还费率" width="90">
                    <template slot-scope="scope">  
                        {{decidEmpty(scope.row.PreRate)}}
                    </template>
                </el-table-column>
                <el-table-column prop="PostRate" align="center" label="违约金率">
                    <template slot-scope="scope">  
                        {{decidEmpty(scope.row.PostRate)}}
                    </template>
                </el-table-column>
                <el-table-column prop="EndDate" align="center" label="到期日期"   width="90">
                    <template slot-scope="scope">  
                        {{scope.row.EndDate || '--'}}
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="AppDateType" align="center" label="日期类型" width="90">
                    <template slot-scope="scope">  
                        {{dictionary.AppDateType[scope.row.AppDateType]|| "--"}}
                    </template>
                </el-table-column> -->
                 <el-table-column prop="CompactNo" align="center" label="合约编号"   width="240">
                    <template slot-scope="scope">  
                        {{scope.row.CompactNo || '--'}}
                    </template>
                 </el-table-column>
                <el-table-column prop="StockCode" align="center" label="证券代码">
                    <template slot-scope="scope">  
                        {{scope.row.StockCode || '--'}}
                    </template>
                </el-table-column>
                <el-table-column prop="StockName" align="center" label="证券名称">
                    <template slot-scope="scope">  
                        {{scope.row.StockName || '--'}}
                    </template>
                </el-table-column>
                <el-table-column prop="AppType" align="center" label="约定类型">
                    <template slot-scope="scope">  
                        {{dictionary.AppType[scope.row.AppType] || '--'}}
                    </template>
                </el-table-column>
                <el-table-column prop="BusiCode" align="center" label="约定模式">
                    <template slot-scope="scope">  
                        {{dictionary.BusiCodeDic[scope.row.BusiCode] || '--'}}
                    </template>
                </el-table-column>
            </el-table>
            <div class="submitBox">
                <el-button :disabled="multipleSelection.length==0"  @click="deleteData">删除（{{multipleSelection.length}}）</el-button>
                <el-button class="ml20 submitbtn" :disabled="canSubmitData.length==0" @click="submitZq">提交（{{canSubmitData.length}}）</el-button>
            </div>
        </div>
        <!-- 明细 -->
        <pubMingxi ref="pubMingxi" :detailData="detailData"></pubMingxi>
        <!-- 归还结果 -->
        <zqResult title="归还" :failData="failData" :successData="successData" ref="resultModel"></zqResult>
        <!-- loading -->
        <uploadLoad  ref="uploadLoad"></uploadLoad>
        <!--  导入提示 -->
        <exportConfirm ref="exportConfirm" @confirm="exportConfirm"></exportConfirm>
        <!-- 成功失败提示 -->
        <!-- <countdownModel ref="countdownModel" :isFail="isFail" :text="resultTip"></countdownModel> -->
        <!-- 批量导入结果 -->
        <!-- <zqResult title="导入结果" tableTitle="导入结果" :failData="importFailData" :successData="importSuccessData" ref="importResultModel" >
            <template slot="fail">
                <el-table-column prop="CompactNo" align="center" label="合同编号" width="240"></el-table-column>
                <el-table-column prop="errorMessage" align="center" label="导入结果" width="450"></el-table-column>
            </template>
        </zqResult> -->
    </div>
</template>
<script>
import topNav from "@/components/securities/topNav.vue";
import pubMingxi from "@/components/securities/pubMingxi.vue"; //明细  需要传键值对
import dictionary from "@/utils/dictionary";
import util from "@/utils/util";
import importUtil from "@/utils/importUtil";
import xlsx from "xlsx"; //导入用
import EditableCell from "@/components/securities/EditableCell.vue"; //编辑
import zqResult from "./gh_components/zqResult.vue"; //归还结果
import uploadLoad from "./gh_components/uploadLoad.vue"; //loading
import exportConfirm from "./gh_components/exportConfirm.vue"; //导入提示
// import countdownModel from "@/components/securities/countdownModel.vue"; //成功失败提示
import { securitiesRequest } from '@/api/securities/securities'; 
import { mapState } from 'vuex'
// var datas = []
export default {
    components: {
        pubMingxi,
        topNav,
        EditableCell,
        zqResult,
        uploadLoad,
        exportConfirm,
        // countdownModel
    },
    data() {
        return {
            // isFail: false,
            dictionary,
            datetype:'',
            multipleSelection:[],
            zhandate:'',//总展期日期
            NewDatd:'', //总展期天数
            tableData:[
            ],
            editData:[],
            failData:[],
            successData:[],
            detailData:{},
            importData:[],
            newImportData:[],
            resultTip:'',
            importSuccessData: [],
            importFailData: [],
            decidEmpty: util.decidEmpty,
            exportLoading: false
        };
    },
    computed: {
        ...mapState(['fundAccount']),
        canSubmitData(){
            return this.multipleSelection.filter(item=>item.status === '未提交')
        }
    },
    created() {
        var data = JSON.parse(localStorage.getItem("selectData"));
        if (!data || data.length === 0) { return } 
        data.forEach((item) => {
            item.LeftQty1 = "";
            item.LeftQty2 = item.LeftQty - item.ExQty;
            item.status = '未提交'
        });
        this.tableData = data.filter((item) => item.ExQty < item.LeftQty);
    },
    mounted(){
        
    },
    methods: {
        noEdit: importUtil.noEdit,
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        //明细展示
        showMingxi(record){
            this.detailData = {
                归还数量: record.LeftQty1 || "--",
                未还数量: record.LeftQty2,
                提前归还费率: util.percent2(record.PreRate),
                违约金率: util.percent2(record.PostRate),
                到期日期: record.EndDate || "--",
                合约编号: record.CompactNo || "--",
                证券代码: record.StockCode || "--",
                证券名称: record.StockName || "--",
                约定类型: dictionary.AppType[record.AppType],
                约定模式: dictionary.BusiCodeDic[record.BusiCode],
            }
            // this.detailData = {
            //   交易日期: record.TrdDate,
            //   约定类型: dictionary.AppType[record.AppType] || "--", //0:约定申请 2:撤单申请 3:展期申请 4:归还申请
            //   约定模式: dictionary.BusiCodeDic[record.BusiCode] || "--",
            //   约定日期: record.AppDate || "--",
            //   日期类型: dictionary.AppDateType[record.AppDateType] || "--",
            //   证券代码: record.StockCode || "--",
            //   证券名称: record.StockName || "--",
            //   约定融券价格: record.Price || "--",
            //   合约数量: record.Qty || "--",
            //   合约金额: record.Amount || "--",
            //   合约期限: record.Term || "--",
            //   合约状态: dictionary.CompactStatus[record.CompactStatus] || "--", //0:正常 1:已超期 3:已了结 4:已提交归还申请
            //   展期次数: record.ExIndex || "--",
            //   到期日期: record.EndDate || "--",
            //   终止日期: record.TrdDate || "--",
            //   应记息费: record.IntFee || "--",
            //   预计违约金: record.PostFee1 || "--",
            //   已还息费: record.ReturnFee || "--",
            //   "年融资利率(融券费率)": util.percent2(record.FeeRate),
            //   "提前归还利率(费率)": util.percent2(record.PreRate),
            //   年违约金率: util.percent2(record.PostRate),
            //   资金帐号: record.FundAccount || "--",
            //   交易所名称: dictionary.ExchangeType[record.ExchangeType] || "--",
            //   合约编号: record.CompactNo || "--",
            //   原合约编号: record.OrigCompactNo || "--",
            // };
            this.$refs.pubMingxi.showModel()
        },
        //展期归还
        submitZq(){
            this.successData = [];
            this.failData = [];
            this.isCansub = true   
            var selectData = this.canSubmitData
            var flag = selectData.every(function (item, index, array) {
                return item.LeftQty1 && item.LeftQty1 > 0;
            });
            if (flag) {
                this.$refs.uploadLoad.showModel()
                this.submitFun(selectData, 0, selectData.length);
            } else {
                this.$message("请填写要提交数据的归还数量");
            }
        },
        //提交请求
        submitFun(data, index, length) {
            if (index > length - 1) {
                return;
            }
            var item = data[index];
            var params = {
                RouteID: "W",
                OpStation: "127.0.0.1",
                OperatorID: this.fundAccount,
                AppNo: item.CompactNo,
                BasketProp: item.BasketProp,
                FundAccount: this.fundAccount,
                Qty: item.LeftQty1,
            };
            securitiesRequest(params, 106).then((res) => { //请求成功
                item.resultMsg = '归还成功'
                item.status = '提交成功'
                this.successData.push(item)
            }).catch(err => { //请求失败
                const errorMessage = err.errorMessage || err.message
                if(errorMessage.indexOf('timeout') !=-1 ){
                    item.status = '提交失败（接口调用超时)'
                }else {
                    item.status = '提交失败（' + errorMessage + ')'
                }
                item.resultMsg = errorMessage
                // item.status = '提交失败（' + errorMessage + '）'
                this.failData.push(item)
            }).finally(() => { // 成功、失败都执行
                index = index + 1;
                if (index < length) {
                    this.submitFun(data, index, length)
                }else{
                    this.$refs.uploadLoad.closeModel()
                    this.$refs.resultModel.showModel()
                    // this.deleteSuccData()
                }
            })
        },
        //自动填充归还数量
        LeftQty1Seve() {
            this.multipleSelection.forEach((item, index) => {
                // item.LeftQty1 = item.LeftQty + "";
                if(item.status === '未提交'){
                    item.LeftQty1 = item.LeftQty2 + "";
                }
            });
        },
        setNewData(data, index, LeftQty1) {
            var item = data[index];
            var dataSource = [...this.data];
            dataSource.forEach((itemIn, index) => {
                if (item.AppNo == itemIn.AppNo) {
                    item.LeftQty1 == "--";
                    item.LeftQty = item.LeftQty - LeftQty1;
                }
            });
            this.tableData = dataSource;
            localStorage.setItem("selectData", JSON.stringify(dataSource));
        },
        //单个修改展期数量
        onCellChange(key, dataIndex, value) {
            const dataSource = [...this.tableData];
            const target = dataSource.find((item) => item === key);
            if (target) {
                target[dataIndex] = value;
                this.tableData = dataSource;
                // this.justValue(target,value)
            }
        },
        justValue(target, value) {
            const dataSource = [...this.tableData];
            var LeftQty = target.LeftQty;
            var ExQty = target.ExQty;
            var canQty = LeftQty - ExQty;
            if (value > canQty) {
                this.$message.info("可归还数量为" + canQty);
                dataSource.forEach((item, indexs) => {
                    if (item === target) {
                        item.LeftQty1 = canQty;
                    }
                });
                this.tableData = dataSource;
            }
        },
        //删除勾选项
        deleteData() {
            var data = this.tableData;
            this.multipleSelection.forEach((itemIn) => {
                console.log(itemIn)
                data.forEach((item, index) => {
                    if (item == itemIn) {
                        data.splice(index--, 1);
                    }
                });
            });
            localStorage.setItem("selectData", JSON.stringify(data));
        },
        //单个删除
        deleteSingle(record) {
            var data = this.tableData;
            data.forEach((item, index) => {
                if (item == record) {
                    data.splice(index--, 1);
                }
            });
            localStorage.setItem("selectData", JSON.stringify(data));
        },
        //确认导入
        async exportConfirm(){
            this.multipleSelection = [];
            // this.tableData = []
            // this.importFailData = []
            // this.importSuccessData = []
            this.tableData = await this.checkImportData(this.importData)
            // this.tableData = data
            if(this.tableData.length>0){
                // this.importSuccessData = []
                const resultP = []
                this.tableData.forEach((item, index) =>{
                    resultP.push(this.getContractData(item, index))
                })
                Promise.all(resultP).finally(() => {
                    // this.tableData = this.importSuccessData
                    localStorage.setItem("selectData", JSON.stringify(this.tableData));
                    this.$refs.exportConfirm.closeModel()
                    // this.$refs.importResultModel.showModel()
                })
            }else{
                this.$refs.exportConfirm.closeModel()
                // this.$refs.importResultModel.showModel()
                // this.importSuccessData = []
                // this.tableData = []
                localStorage.setItem("selectData", JSON.stringify(this.tableData));
            }
            //
            // this.getData(0,this.importData, this.importData.length);
        },
        //校验导入数据的正确性
        checkImportData(){
            const data = this.importData
            const avalidDic = {
                CompactNo: '合约编号不能为空',
                StockCode: '证券号码不能为空',
                LeftQty1: '归还数量不能为空'
            }
            data.forEach(item => {
                for(let k in avalidDic){
                    const value = item[k]
                    if( importUtil.checkNull(value)) {
                        item.status = '导入失败（数据不符合规范）'
                    }
                }
            })
            return data
            // let that = this;
            // let successData = [];
            // let failData = [];
            // data.forEach(item => {
            //     if(that.checkNull(item.CompactNo)){
            //         if(that.checkNull(item.StockCode)){
            //             if(that.checkNull(item.LeftQty1)){
            //                 successData.push(item)
            //             }else{
            //                 item.errorMessage = '归还数量不能为空'
            //                 failData.push(item)
            //             }
            //         }else{
            //             item.errorMessage = '证券号码不能为空'
            //             failData.push(item)
            //         }
            //     }else{
            //         item.errorMessage = '合约编号不能为空'
            //         failData.push(item)
            //     }
            // })
            // this.importFailData = failData
            // return successData
        },
        checkNull(data){
            if(data==0){
                return true
            }else{
                return data!=''&&data!=null&&data!=undefined
            }
        },
        //导入
        async importExcel(ev) {
            // const datas = []
            // this.importData = [];
            // this.newImportData = []
            const file = ev.raw
            if (!file || ev.status == "uploading") return;
            let reader = await util.uploadXlsx(file);
            const worker = xlsx.read(reader, { type: "binary" });
            reader = xlsx.utils.sheet_to_json(worker.Sheets[worker.SheetNames[0]]);
            var data = await this.initData(reader);
            if(data.length === 0){
                this.$message({
                    message: '导入数据为空，请检查文件',
                    type: "warning",
                });
                return
            }
            this.importData = data
            this.$refs.exportConfirm.showModel()
        },
        initData(data) {
            console.log(data)
            const datas = []
            for (var i in data) {
                datas[i] = {};
                for (var ci in data[i]) {
                if (ci.indexOf("合约编号") != -1) {
                    datas[i].CompactNo = data[i][ci];
                }
                if (ci.indexOf("证券代码") != -1) {
                    datas[i].StockCode = data[i][ci];
                }
                if (ci.indexOf("归还数量") != -1) {
                    datas[i].LeftQty1 = data[i][ci];
                }
                }
                datas[i].status = '未提交'
            }
            return datas;
        },
        //查询合约详情
        getContractData(item, index){
            if(item.status !== '未提交'){
                return
            }
            var params = {
                RouteID: "W", //委托渠道
                OperatorID: this.fundAccount, //操作员ID
                FundAccount: this.fundAccount, //资产账号
                CompactStatus: "0", //未了结合约
                QueryMode: "A", //默认: A：全部（未送参数时按A处理） 1: 按证券代码查询 3:按篮子查询
                CompactNo: item.CompactNo,
            };
            securitiesRequest(params, 110).then((res) => { //请求成功
                var data_ = res.data;
                if(data_.length>0){
                    data_[0].StockCode = item.StockCode
                    data_[0].LeftQty1 = item.LeftQty1
                    data_[0].LeftQty2 = data_[0].LeftQty - data_[0].ExQty
                    data_[0].status = '未提交'
                    this.tableData[index] = data_[0]
                    this.$set(this.tableData, index, data_[0])
                    // console.log('data_[0]', data_[0])
                    // this.importSuccessData.push( data_[0])
                }else{
                    // item.errorMessage = '未查到该合同'
                    item.status = '导入失败（未查到该合同）'
                    this.$set(this.tableData, index, item)
                    // this.importFailData.push(item)
                }
                
            }).catch(err => {
                const errorMessage = err.errorMessage || err.message
                if(errorMessage.indexOf('timeout') !=-1 ){
                    item.status = '导入失败（接口调用超时)'
                }else {
                    item.status = '导入失败（' + errorMessage + ')'
                }
                this.importFailData.push(item)
                
            })
        },
        // 删除提交成功的数据
        deleteSuccData() {
            var data = this.tableData;
            this.successData.forEach((itemIn) => {
                data.forEach((item, index) => {
                    if (item == itemIn) {
                        data.splice(index--, 1);
                    }
                });
            });
            localStorage.setItem("selectData", JSON.stringify(data));
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
                importUtil.exportDataMethod('#tableExport', '归还');
                this.exportLoading = false;
            });
        },
    },
};
</script>
<style scoped>
    .submitBox{
        padding-top: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    /deep/ .submitBox .el-button{
        width: 150px;
        height: 54px;
        border-radius: 5px;
        color: #C5181F;
        border: 1px solid #C5181F;
        font-size: 18px;
    }
     /deep/ .submitBox .el-button.submitbtn{
         background-color: #C5181F;
         color: #fff;
     }
    .searchForm_zq{
        padding-top: 20px;
    }
    .searchForm_zq .name{
        padding-right: 15px;
    }
    .tip{
        color: #999;
        padding-left: 20px;
    }
</style>