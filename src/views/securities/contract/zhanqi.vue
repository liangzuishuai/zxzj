<template>
    <div>
        <topNav title="展期"></topNav>
        <div class="bgfff pd30 mb20">
            <div class="bus_query">
                <div class="common_title j_c_a_i">
                    <span></span>
                   设置
                </div>
                <div class="searchForm_zq">
                    <el-radio-group v-model="datetype">
                        <el-radio :label="1">
                            <span class="name">展期至</span>
                            <el-date-picker
                                v-model="zhandate"
                                type="date"
                                format="yyyy-MM-dd"
                                value-format="yyyyMMdd"
                                size="small"
                                style="width: 180px"
                                @change="datePiker"
                                placeholder="选择日期" :disabled="datetype != 1 ? true : false">
                            </el-date-picker>
                        </el-radio>
                        <el-radio :label="2">
                            <span class="name">展期天数</span>
                            <el-input v-model="NewDatd" autocomplete="off" size="small" placeholder="请输入展期天数" style="width: 180px" 
                            :disabled="datetype != 2 ? true : false"
                            onkeyup="this.value=this.value.replace(/\D|^0/g,'')"
                            onafterpaste="this.value=this.value.replace(/\D|^0/g,'')"
                            @blur="newData"></el-input>
                        </el-radio>
                    </el-radio-group>
                    <span class="tip">不选择展期结束日期或展期天数表示按约定合约期限申请展期</span>
                </div>
            </div>
        </div>
        <div class="topButton">
            <div class="handleBtnBox">
                <el-button :disabled="multipleSelection.length==0" @click="LeftQty1Seve">自动填充展期数量（{{multipleSelection.length}}）</el-button>
                <el-upload
                    ref="upload"
                    class="uploadbtn ml20"
                    :on-change="importExcel"
                    :auto-upload="false"
                    :show-file-list="false"
                    action=""
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    >
                    <el-button>导入文件</el-button>
                </el-upload>
                <a href="https://statics.citics.com/xinweb/%E5%B1%95%E6%9C%9F%E6%B8%85%E5%8D%95%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx">
                    <el-button class="ml20">
                        导出文件/模版
                    </el-button>
                </a>
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
                type="selection"
                width="55" fixed="left">
                </el-table-column>
                <el-table-column prop="zhandate" align="center" label="展期至" width="150px">
                    <template slot-scope="scope">  
                        <el-date-picker
                        v-model="scope.row.zhandate"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyyMMdd"
                        size="small"
                        style="width: 130px"
                        @change="onCellChange(scope.row, 'zhandate', $event)"
                        placeholder="选择日期">
                        </el-date-picker>
                    </template>
                </el-table-column>
                <el-table-column prop="LeftQty1" align="center" label="展期数量" width="140">
                    <template slot-scope="scope">  
                       <EditableCell
                        :text="scope.row.LeftQty1 + ''"
                        :record="scope.row"
                        dataName="zhanqi"
                        @change="onCellChange2(scope.row, 'LeftQty1', $event)"
                    />
                    </template>
                    
                </el-table-column>
                <el-table-column prop="Term" align="center" label="展期天数" width="140">
                     <template slot-scope="scope">  
                       <EditableCell
                        :text="scope.row.Term + ''"
                        :record="scope.row"
                        dataName="Term"
                        @change="onCellChange3(scope.row, 'Term', $event)"
                    />
                    </template>
                </el-table-column>
                <el-table-column prop="LeftQty" align="center" label="未还数量" width="90"></el-table-column>
                <el-table-column prop="ZqRate" align="center" label="约定融券费率" width="90">
                    <template slot-scope="scope">  
                        {{scope.row.FeeRate+'%'}}
                    </template>
                </el-table-column>
                <el-table-column prop="PreRate" align="center" label="提前归还费率" width="90">
                    <template slot-scope="scope">  
                        {{scope.row.PreRate+'%'}}
                    </template>
                </el-table-column>
                <el-table-column prop="PostRate" align="center" label="违约金率" width="90">
                    <template slot-scope="scope">  
                        {{scope.row.PostRate+'%'}}
                    </template>
                </el-table-column>
                <el-table-column prop="CompactNo" align="center" label="合约编号"   width="240"></el-table-column>
                <el-table-column prop="EndDate" align="center" label="到期日期" width="90"></el-table-column>
                <el-table-column prop="AppDateType" align="center" label="日期类型" width="90">
                    <template slot-scope="scope">  
                        {{scope.row.AppDateType?dictionary.AppDateType[scope.row.AppDateType]:'--'}}
                    </template>
                </el-table-column>
                <el-table-column prop="StockCode" align="center" label="证券代码" width="100"></el-table-column>
                <el-table-column prop="StockName" align="center" label="证券名称" width="100"></el-table-column>
                <el-table-column prop="action" align="center" label="操作" width="120" fixed="right">
                    <template slot-scope="scope">
                        <div class="tableHandle">
                            <a href="javascript:void(0)" class="colorBlue" @click="deleteSingle(scope.row)">删除</a>
                            <a href="javascript:void(0)" class="colorRed" @click="showMingxi(scope.row)">明细</a>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="submitBox">
                <el-button :disabled="multipleSelection.length==0" @click="deleteData">删除（{{multipleSelection.length}}）</el-button>
                <el-button class="ml20 submitbtn" :disabled="multipleSelection.length==0" @click="submitZq">提交（{{multipleSelection.length}}）</el-button>
            </div>
        </div>
        <!-- 明细 -->
        <pubMingxi ref="pubMingxi" :detailData="detailData"></pubMingxi>
        <!-- 展期提交明细 -->
        <zqMingxi :editData="editData" @submitMx="submiZqMx" ref="zqMingxi"></zqMingxi>
        <!-- 展期结果 -->
        <zqResult title="展期" :failData="failData" :successData="successData" ref="resultModel"></zqResult>
        <!-- loading -->
        <uploadLoad  ref="uploadLoad"></uploadLoad>
        <!--  导入提示 -->
        <exportConfirm ref="exportConfirm" @confirm="exportConfirm"></exportConfirm>
        <!-- 成功失败提示 -->
        <countdownModel ref="countdownModel" :text="resultTip"></countdownModel>

        <!-- 批量导入结果 -->
        <zqResult title="导入结果" tableTitle="导入结果" :failData="importFailData" :successData="importSuccessData" ref="importResultModel" >
            <template slot="fail">
                <el-table-column prop="CompactNo" align="center" label="合同编号" width="240"></el-table-column>
                <el-table-column prop="errorMessage" align="center" label="导入结果" width="450"></el-table-column>
            </template>
        </zqResult>
    </div>
</template>
<script>
import topNav from "@/components/securities/topNav.vue";
import pubMingxi from "@/components/securities/pubMingxi.vue"; //明细  需要传键值对
import dictionary from "@/utils/dictionary";
import util from "@/utils/util";
import xlsx from "xlsx"; //导入用
import EditableCell from "@/components/securities/EditableCell.vue"; //编辑
import zqMingxi from "./gh_components/zqMingxi.vue"; //展期明细弹出
import zqResult from "./gh_components/zqResult.vue"; //展期结果
import uploadLoad from "./gh_components/uploadLoad.vue"; //loading
import exportConfirm from "./gh_components/exportConfirm.vue"; //导入提示
import countdownModel from "@/components/securities/countdownModel.vue"; //成功失败提示
import { securitiesRequest } from '@/api/securities/securities';
import { mapState } from 'vuex'
import moment from "moment";

var datas = []
export default {
    components: {
        topNav,
        EditableCell,
        zqMingxi,
        zqResult,
        uploadLoad,
        exportConfirm,
        pubMingxi,
        countdownModel
    },
    data() {
        return {
            dictionary,
            datetype:'',
            multipleSelection:[],
            zhandate:'',//总展期日期
            NewDatd:'', //总展期天数
            tableData:[
            ],
            editData:[],
            failNum:0,
            successNum:0,
            detailData:{},
            successData: [],
            failData: [],
            importData: [],
            resultTip:'',
            isImport:false,
            importSuccessData: [],
            importFailData: [],
        };
    },
    created() {
        var data = JSON.parse(localStorage.getItem("selectData"));
        if (!data || data.length === 0) { return } 
        data.forEach((item) => {
            item.LeftQty1 = ""
            item.zhandate = ""
        });
        this.tableData = data.filter((item) => item.ExQty == 0 && item.LeftQty > 0)
    },
    mounted(){
        
    },
    computed: {
        ...mapState(['fundAccount'])
    },
    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 修改展期天数 - 批量
        newData() {
            this.zhandate = undefined
            var data = this.tableData
            this.index = 0
            var TermInDays = this.NewDatd
            if(TermInDays){
                if(TermInDays<2){
                    this.$message.info("展期天数需大于1天");
                }else if(TermInDays>182){
                    this.$message.info("展期天数需小于183天");
                }else{
                    var currentDate = util.getNowFormatDate();
                    
                    data.forEach(item =>{
                        var originReturnDate = item.EndDate; //原到期日期
                        if (originReturnDate < currentDate) { //逾期
                            item.zhandate = util.getDaysDate(currentDate,TermInDays)
                        } else {
                            item.zhandate = util.getDaysDate(originReturnDate,TermInDays)
                        }
                        item.Term = TermInDays
                    })
                    this.tableData = data
                    this.getDingjiadata(data,this.index,data.length)
                }
            }
            
        },
        // 修改展期日期 - 批量
        datePiker(dateString) {
            this.NewDatd = ''
            if (dateString) {
                this.index = 0;
                var datas = this.tableData;
                var zhandate = this.zhandate;
                datas.forEach((item) => {
                    if (item["ExQty"] > 0) {
                        item["zhandate"] = null;
                    } else {
                        item["zhandate"] = zhandate;
                    }
                });
                this.tableData = datas;
                this.getDingjia();
            }
        },
        //明细展示
        showMingxi(record){
            console.log(record)
            this.detailData = {
              交易日期: record.TrdDate,
              约定类型: dictionary.AppType[record.AppType] || "--", //0:约定申请 2:撤单申请 3:展期申请 4:归还申请
              约定模式: dictionary.BusiCodeDic[record.BusiCode] || "--",
              约定日期: record.AppDate || "--",
              日期类型: dictionary.AppDateType[record.AppDateType] || "--",
              证券代码: record.StockCode || "--",
              证券名称: record.StockName || "--",
              约定融券价格: record.Price || "--",
              合约数量: record.Qty || "--",
              合约金额: record.Amount || "--",
              合约期限: record.Term || "--",
              合约状态: dictionary.CompactStatus[record.CompactStatus] || "--", //0:正常 1:已超期 3:已了结 4:已提交归还申请
              展期次数: record.ExIndex || "--",
              到期日期: record.EndDate || "--",
              终止日期: record.TrdDate || "--",
              应记息费: record.IntFee || "--",
              预计违约金: record.PostFee1 || "--",
              已还息费: record.ReturnFee || "--",
              "年融资利率(融券费率)": util.percent2(record.FeeRate),
              "提前归还利率(费率)": util.percent2(record.PreRate),
              年违约金率: util.percent2(record.PostRate),
              资金帐号: record.FundAccount || "--",
              交易所名称: dictionary.ExchangeType[record.ExchangeType] || "--",
              合约编号: record.CompactNo || "--",
              原合约编号: record.AppNo || "--",
            };
            this.$refs.pubMingxi.showModel()
        },
        //修改展期日期
        onCellChange(key, dataIndex, value){
            this.index = 0
            if (value) {
                const dataSource = this.tableData
                let {target, index } = this.getTargetIndex(dataSource, key);

                if (target) {
                    target[dataIndex] = value;
                    var TermInDays = this.getTermInDays(target);
                    if(TermInDays<2||TermInDays>182){
                        this.$message.info('展期选择需大于到期日期2天并且小于到期日183天')
                        target[dataIndex] = '';
                        this.tableData = dataSource;
                        return
                    }
                    target.Term = TermInDays+''
                    this.tableData = dataSource;
                    this.getDingjiadata(dataSource, index, 1);
                }
            }
        },
        //修改展期数量
        onCellChange2(key, dataIndex, value) {
            const dataSource = this.tableData;
            const target = dataSource.find((item) => item === key);
            if (target) {
                // if(value<=0){
                //     this.$message("展期数量需大于0")
                //     value = ''
                // }else if(value>key.LeftQty){
                //     this.$message("展期数量不能超过未还数量")
                //     value = key.LeftQty
                // }
                target[dataIndex] = value;
                this.tableData = dataSource;
            }
        },
        //修改展期天数
        onCellChange3(key, dataIndex, value) {
            this.index = 0
            if (value) {
                const dataSource = this.tableData
                let {target, index } = this.getTargetIndex(dataSource, key);

                if (target) {
                    var item = target
                    target[dataIndex] = value;
                    var currentDate = util.getNowFormatDate();
                    var originReturnDate = item.EndDate; //原到期日期
                    if (originReturnDate < currentDate) { //逾期
                        target.zhandate = util.getDaysDate(currentDate,value)
                    } else {
                        target.zhandate = util.getDaysDate(originReturnDate,value)
                    }
                    this.tableData = dataSource;
                    this.getDingjiadata(dataSource, index, 1);
                   
                }
            }
        },
        //展期提交
        submitZq(){
            var selectData = this.multipleSelection
            var flag = selectData.every( ( item ) => { 
                var TermInDays = this.getTermInDays(item)
                return TermInDays > 1&&TermInDays<=182; 
            })
            if(flag){
                var flag2 = selectData.every( ( item ) => { 
                    return item.LeftQty1&&item.LeftQty1>0
                })
                if(flag2){
                    this.editData = selectData
                    this.$refs.zqMingxi.showModel()
                }else{
                    this.$message.info('请填写要提交数据的展期数量')
                }
                
            }else{
                this.$message.info('展期选择需大于到期日期2天并且小于到期日183天')
            }
        },
        //确认明细
        submiZqMx(){
            var multipleSelection = this.multipleSelection
            this.successData = []
            this.failData = []
            this.$refs.uploadLoad.showModel()
            this.submitFun(multipleSelection,0,multipleSelection.length)
        },
        //提交请求
        submitFun(data, index, length) {
            if (index > length - 1) {
                return;
            }
            var item = data[index];
            var currentDate = util.getNowFormatDate();
            var originReturnDate = item.EndDate; //原到期日期
            var originTermInDays = parseInt(item.Term); //融券期限
            var zhandate = item.zhandate; //展期至
            var TermInDays;
            var ReturnDate;
            if (originReturnDate < currentDate) {
                //逾期
                if (zhandate) {
                    //选择日期了
                    ReturnDate = item.zhandate;
                    TermInDays = util.getDateDiffDays(zhandate, currentDate);
                } else {
                    //没有选择日期
                    ReturnDate = parseInt(util.getDaysDate(currentDate, parseInt(originTermInDays)));
                    TermInDays = parseInt(originTermInDays);
                }
            } else {
                if (zhandate) {
                    TermInDays = util.getDateDiffDays(zhandate, originReturnDate);
                    ReturnDate = item.zhandate;
                } else {
                    TermInDays = parseInt(originTermInDays);
                    ReturnDate = parseInt(util.getDaysDate(originReturnDate, parseInt(originTermInDays)));
                }
            }
            var params = {
                RouteID: "W",
                OpStation: "127.0.0.1",
                OperatorID: this.fundAccount,
                AppNo: item.AppNo,
                BasketProp: item.BasketProp,
                FundAccount: this.fundAccount,
                Qty: item.LeftQty1,
                Term: TermInDays,
                AppRate: item.FeeRate,
                PreRate: item.PreRate,
                PostRate: item.PostRate,
                EndDate: ReturnDate,
            };
            securitiesRequest(params, 105).then((res) => { //请求成功
                item.resultMsg = '展期成功'
                this.successData.push(item)
            }).catch(err => { //请求失败
                item.resultMsg = err.errorMessage
                this.failData.push(item)
            }).finally(() => { // 成功、失败都执行
                index = index + 1;
                if (index < length) {
                    this.submitFun(data, index, length)
                }else{
                    this.$refs.zqMingxi.closeModel()
                    this.$refs.resultModel.showModel()
                    this.$refs.uploadLoad.closeModel()
                }
            })
        },
        //确认导入
        async exportConfirm(){
            this.multipleSelection = [];
            this.datetype = null;
            this.NewDatd = "";
            this.zhandate = "";
            this.tableData = []
            this.importFailData = []
            this.importSuccessData = []
            const data = await this.checkImportData(this.importData)
            this.importData = data
            if(data.length>0){
                this.importSuccessData = []
                const resultP = []
                this.importData.forEach(item =>{
                    resultP.push(this.getContractData(item))
                })
                Promise.all(resultP).finally(() => {
                    this.tableData = this.importSuccessData
                    localStorage.setItem("selectData", JSON.stringify(this.tableData));
                    this.$refs.exportConfirm.closeModel()
                    this.$refs.importResultModel.showModel()
                })
            }else{
                this.$refs.exportConfirm.closeModel()
                this.$refs.importResultModel.showModel()
                this.tableData = []
                localStorage.setItem("selectData", JSON.stringify(this.tableData));
            }
        },
        //校验导入数据的正确性
        checkImportData(data){
            let that = this;
            let successData = [];
            let failData = [];
            data.forEach(item => {
                if(that.checkNull(item.CompactNo)){
                    if(that.checkNull(item.StockCode)){
                        if(that.checkNull(item.LeftQty1)){
                            if(!that.checkNull(item.zhandate)&&!that.checkNull(item.Term)){
                                item.errorMessage = '展期至和展期天数数据不能同时为空'
                                failData.push(item)
                            }else if(that.checkNull(item.zhandate)&&that.checkNull(item.Term)){
                                item.errorMessage = '展期至和展期天数数据只能填写一个'
                                failData.push(item)
                            }else if(that.checkNull(item.zhandate)&&moment(item.zhandate +'').format("YYYY-MM-DD")=='Invalid date'){
                                item.errorMessage = '展期至日期格式不正确'
                                failData.push(item)
                            }else if(item.Term>182||item.Term<2){
                                item.errorMessage = '展期天数不符合2~182天内'
                                failData.push(item)
                            }else{
                                successData.push(item)
                            }
                        }else{
                            item.errorMessage = '展期数量不能为空'
                            failData.push(item)
                        }
                    }else{
                        item.errorMessage = '证券号码不能为空'
                        failData.push(item)
                    }
                }else{
                    item.errorMessage = '合约编号不能为空'
                    failData.push(item)
                }
            })
            this.importFailData = failData
            return successData
        },
        checkNull(data){
            if(data==0){
                return true
            }else{
                return data!=''&&data!=null&&data!=undefined
            }
        },
        //导入文件
        async importExcel(ev) {
            datas = []
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
        //查询合约详情
        getContractData(item){
            var params = {
                RouteID: "W", //委托渠道
                OperatorID: this.fundAccount, //操作员ID
                FundAccount: this.fundAccount, //资产账号
                CompactStatus: "0", //未了结合约
                QueryMode: "A", //默认: A：全部（未送参数时按A处理） 1: 按证券代码查询 3:按篮子查询
                CompactNo:item.CompactNo
            };
            securitiesRequest(params, 110).then((res) => { //请求成功
                var data_ = res.data;
                if(data_.length>0){
                    if(item.Term){
                        data_[0].Term = item.Term
                    }else{
                        data_[0].Term = ''
                    }
                    if(item.zhandate){
                        data_[0].zhandate = item.zhandate
                    }else{
                        data_[0].zhandate = ''
                    }
                    data_[0].StockCode = item.StockCode
                    data_[0].LeftQty1 = item.LeftQty1
                    this.getSingleRate(data_[0])
                    // this.importSuccessData.push(data_[0])
                }else{
                    item.errorMessage = '未查到该合同'
                    this.importFailData.push(item)
                }
                
            })
        },
        getSingleRate(item){
            var TermInDays = this.getTermInDays(item);
            if(TermInDays<=0){
                item.errorMessage = '展期日期需大于该合同到期日期'+item.EndDate
                this.importFailData.push(item)
                return
            }else if (TermInDays > 182){
                item.errorMessage = '展期不能超过到期日期'+item.EndDate+' 182天'
                this.importFailData.push(item)
                return
            }
            var params = {
                BusiCode: "111B",
                PricingType: item.BasketProp == 1 ? "Basket" : "Stock",
                TermInDays: TermInDays,
                ExchangeType: item.ExchangeType,
                StockCode: item.StockCode,
                FundAccount: this.fundAccount,
            };

            securitiesRequest(params, 115).then((res) => {
                if (res.errorCode == 0) {
                    item.FeeRate = res.data[0].FeeRate;
                    item.PostRate = res.data[0].PostRate;
                    item.PreRate = res.data[0].PreRate;
                    this.importSuccessData.push(item)
                }
            }).catch(err => {
                this.$message.info(err.errorMessage);
            })
        },
        initData(data) {
            for (var i in data) {
                datas[i] = {};
                for (var ci in data[i]) {
                    if (ci.indexOf("合约编号") != -1) {
                        datas[i].CompactNo = data[i][ci];
                    }
                    if (ci.indexOf("证券代码") != -1) {
                        datas[i].StockCode = data[i][ci];
                    }
                    if (ci.indexOf("展期数量") != -1) {
                        datas[i].LeftQty1 = data[i][ci] + "";
                    }
                    if (
                        ci.indexOf(
                            "展期至（可为空或者8位日期数值，为空表示按原期限展期）"
                        ) != -1
                    ) {
                        datas[i].zhandate = data[i][ci];
                    }
                    if (
                        ci.indexOf(
                            "展期天数（可为空或2-182的数值，DE列不可同时送值）"
                        ) != -1
                    ) {
                        datas[i].Term = data[i][ci] + "";
                    }
                }
            }
            return datas;
        },
        getDingjiadata(data, index, length) { 
            if (this.index > length - 1) {
                //全部日期定价时
                return;
            }

            var item = data[index];
            var canZhan = item.ExQty == 0 ? true : false;
            if (!canZhan) {
                //展期途中
                index = index + 1;
                this.index = index;
                if (this.index < length) {
                    this.getDingjiadata(data, index, length);
                }
                return;
            }

            var TermInDays = this.getTermInDays(item);

            if (TermInDays <= 0) {
                this.$message.info("展期选择需大于到期日期");
                data[index].zhandate = "";
                this.tableData = data;
                return;
            } else if (TermInDays > 182) {
                this.zhandate = "";
                this.$message.info("展期不能超过到期日期182天");
                data[index].zhandate = "";
                this.tableData = data;
            }
            var params = {
                BusiCode: "111B",
                PricingType: item.BasketProp == 1 ? "Basket" : "Stock",
                TermInDays: TermInDays,
                ExchangeType: item.ExchangeType,
                StockCode: item.StockCode,
                FundAccount: this.fundAccount,
            };

            securitiesRequest(params, 115).then((res) => {
                if (res.errorCode == 0) {
                    data[index].FeeRate = res.data[0].FeeRate;
                    data[index].PostRate = res.data[0].PostRate;
                    data[index].PreRate = res.data[0].PreRate;
                    this.tableData = data;
                    index = index + 1;
                    this.index = index;
                    if (this.index < length) {
                        this.getDingjiadata(data, index, length);
                    }else{
                        if(this.isImport){
                            this.resultTip = '导入成功！'
                            this.$refs.countdownModel.showModel()
                            this.$refs.exportConfirm.closeModel()
                            this.isImport = false
                            localStorage.setItem("selectData", JSON.stringify(this.tableData));
                        }
                    }
                }
            }).catch(err => {
                this.$message.info(err.errorMessage);
            })
        },
        getTermInDays(item){
            var currentDate = util.getNowFormatDate();
            var originReturnDate = item.EndDate; //原到期日期
            var originTermInDays = parseInt(item.Term); //融券期限
            var zhandate = item.zhandate; //展期至
            var TermInDays;

            if (zhandate) { //选择日期了
                const isOverdue = originReturnDate < currentDate // 是否逾期
                TermInDays = util.getDateDiffDays(zhandate, isOverdue ? currentDate : originReturnDate)
            } else {
                //没有选择日期
                TermInDays = originTermInDays;
            }
            return TermInDays
        },
        getTargetIndex(dataSource, key){
            let target, index;
            dataSource.forEach((item, indexs) => {
                if (item === key) {
                    index = indexs
                    target = item
                }
            });

            return { target, index }
        },
        getDingjia() {
            var data = this.tableData
            this.index = 0
            var canZhandata = data.filter((item, index, arr) => {
                return item.ExQty == 0;
            });

            var flag = canZhandata.every((item, index, array) => {
                var TermInDays = this.getTermInDays(item);
                return TermInDays > 0 && TermInDays <= 182;
            });
                
            if (flag) {
                canZhandata.forEach(item =>{
                    var TermInDays = this.getTermInDays(item);
                    item.Term = TermInDays+''
                })
                this.tableData = data;
                if (this.index < data.length) {
                    this.getDingjiadata(data, this.index, data.length);
                }
            } else {
                this.$message.info("展期选择需大于到期日期并且小于到期日182天");
                data.forEach((item) => {
                    item.zhandate = null;
                });
                this.zhandate = null;
                this.data = data;
            }
        },
        //自动填充归还数量
        LeftQty1Seve() {
            this.multipleSelection.forEach((item, index) => {
                item.LeftQty1 = item.LeftQty + "";
            });
        },
        //删除勾选项
        deleteData() {
            var data = this.tableData;
            this.multipleSelection.forEach((itemIn) => {
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
        //查询时间和定价
        getDingjiaTerm(index,data,length,data_){
            if (index > length - 1) {
                this.getDingjia()
                return;
            }
            var item = data_[0] //查询出的数据
            var item_ = data[index] //导入的数据
            var currentDate = util.getNowFormatDate();
            var originReturnDate = item.EndDate; //原到期日期
            if(data_.length>0){
                if(item_.Term){
                    // data_[0].Term = item.Term
                    //计算展期至
                    if(parseInt(item_.Term)<2||parseInt(item_.Term)>182){ 
                        item.zhandate = null
                    }else{
                        if (originReturnDate < currentDate) { //逾期
                            item.zhandate = util.getDaysDate(currentDate,parseInt(item_.Term))
                        } else {
                            item.zhandate = util.getDaysDate(originReturnDate,parseInt(item_.Term))
                        }
                        data_[0].Term = item_.Term
                    }

                }else{
                    if(item_.zhandate){
                        var dateNum = item_.zhandate+''
                        item_.zhandate = dateNum
                        var TermInDays;
                        if (originReturnDate < currentDate) {
                        //逾期
                            TermInDays = util.getDateDiffDays(item_.zhandate, currentDate);
                        } else {
                            TermInDays = util.getDateDiffDays(item_.zhandate, originReturnDate);
                        }
                        if(TermInDays<2||TermInDays>182){
                            item.zhandate = null
                        }else{
                            item.Term = TermInDays+''
                            item.zhandate = item_.zhandate
                        }
                    }
                }
                if(item_.LeftQty1){
                    data_[0].LeftQty1 = item_.LeftQty1
                }
            }
            
            this.tableData = this.tableData.concat(data_)
            index = index+1
            this.getData(index,data,length)
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