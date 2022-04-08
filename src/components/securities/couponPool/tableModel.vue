<template>
    <div class="couponTable" :key="keyStr">
        <div class="leftTable">
            <el-table 
            :data="tableData" 
            style="width: 100%" 
            class="pubTable" 
            height="640"
            :row-class-name="tableRowClassName"
            @row-click="rowClick"
            ref="personCoupons"
            >
                <slot name="leftTable">
                    <el-table-column prop="StockCode" align="center" label="证券代码"></el-table-column>
                    <el-table-column prop="StockName" align="center" label="证券名称"></el-table-column>
                    <el-table-column prop="BusiCode" align="center" label="约定模式">
                        <template slot-scope="scope">  
                            {{dictionary.BusiCodeDic[scope.row.BusiCode]}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="Qty" align="center" label="总量" width="120"></el-table-column>
                    <el-table-column prop="ExchangeType" align="center" label="交易市场">
                        <template slot-scope="scope">  
                            {{dictionary.ExchangeType[scope.row.ExchangeType]}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="FareWay" align="center" label="是否折扣" :fixed="fareWayFixed">
                        <template slot-scope="scope">  
                            <fareWay :FareWay="scope.row.FareWay" /> 
                        </template>
                    </el-table-column>
                    <el-table-column prop="Remark" align="center" label="备注" width="120" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <remark :Remark="scope.row.Remark" /> 
                        </template> 
                    </el-table-column>
                </slot>
                
            </el-table>
        </div>
        <div class="rightTable">
            <el-table 
            :data="tableDetailData" 
            style="width: 100%" 
            class="pubTable" 
            height="640"
            >
                <slot name="rightTable">
                    <el-table-column prop="StockCode" align="center" label="证券代码"></el-table-column>
                    <el-table-column prop="StockName" align="center" label="证券名称"></el-table-column>
                    <el-table-column  align="center" label="约定模式">
                        <template slot-scope="scope">  
                            {{dictionary.BusiCodeDic[scope.row.BusiCode]}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="Qty" align="center" label="总量" width="120"></el-table-column>
                    <el-table-column prop="ExchangeType" align="center" label="交易市场">
                        <template slot-scope="scope">  
                            {{dictionary.ExchangeType[scope.row.ExchangeType]}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="Term" align="center" label="合约期限"></el-table-column>
                    <el-table-column prop="Remark" align="center" label="备注" width="120" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <remark :Remark="scope.row.Remark" /> 
                        </template> 
                    </el-table-column>
                    <el-table-column prop="FareWay" align="center" label="是否折扣">
                        <template slot-scope="scope">  
                            <fareWay :FareWay="scope.row.FareWay" /> 
                        </template>
                    </el-table-column>
                </slot>

                
                <el-table-column  align="center" label="操作" width="60" fixed="right">
                    <template slot-scope="scope">  
                        <a href="javascript:void(0)" class="colorRed" @click="showModel(scope.row)">约券</a>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import dictionary from "@/utils/dictionary";
import fareWay from './fareWay.vue';
import remark from './remark.vue';
export default {
    props: ['tableData','tableDetailData', 'fareWayFixed', 'keyStr'],
    components: {
        fareWay,
        remark
    },
    data(){
        return {
            tableRowIndex: undefined,
            tableDataLoadEnd: false,
            dictionary
        }
    },
    mounted(){
        this.personCouponsScroll();
    },
    methods: {
        tableRowClassName({ row, rowIndex }) {
            // 把每一行的索引放进row
            row.index = rowIndex
            if (rowIndex === this.tableRowIndex) {
                return 'current-row'
            }
            return 
        },
        rowClick(row){
            this.tableRowIndex = row.index;
            this.$emit('rowClick', row);
            // this.tableDetailData = [row];
        },
        // 个券table滚动触底事件
        personCouponsScroll(){
            this.$refs.personCoupons.bodyWrapper.addEventListener('scroll', (res) => {
                let height = res.target;
                let clientHeight = height.clientHeight;
                let scrollTop = height.scrollTop;
                let scrollHeight = height.scrollHeight;
            
                if(clientHeight + scrollTop + 300 > scrollHeight){
                    if(this.tableDataLoadEnd) return;
                    this.$emit('scrollBottom');
                    this.tableDataLoadEnd = true;
                }
            },true);
        },
        scrollStatusInit(){
            this.tableDataLoadEnd = false;
        },
        showModel(row){
            this.$emit('showModel', row)
        },
        clearTableDetailData(){
            this.tableDetailData = []
        },
        tableRowIndexInit(){
            this.tableRowIndex = undefined;
        }
    }
}
</script>

<style scoped>
.couponTable{
    display: flex;
    justify-content: space-between;
}
.couponTable>div{
    width: 49.5%;
}
/deep/ .couponTable .leftTable tbody tr{
    cursor: pointer;
    position: relative;
}
.couponTable .leftTable{
    position: relative;
}
/deep/ .couponTable .leftTable i.code{
    content: '';
    position: absolute;
    right:-10px;
    width: 0;
    height: 0;
    top: 0;
    border-top: 8px solid transparent;
    border-left: 10px solid #C5181F;
    border-bottom: 8px solid transparent;
    transform: translateY(-50%);
}
/deep/ .couponTable .leftTable tbody tr:hover td,/deep/ .couponTable .leftTable tbody tr.current-row td{
    background-color: rgba(197, 24, 31, 0.05);
    color: #C5181F ;
}
/deep/ .rightTable tbody td{
    background-color: rgba(197, 24, 31, 0.05);
}
/deep/ .couponTable  tbody tr:last-child{border-bottom: 0 !important;}
 /deep/ .pubTable thead tr{
    background-color: #C5181F !important;
 }
</style>
