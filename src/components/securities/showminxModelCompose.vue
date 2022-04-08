<template>
    <div>
        <selfModel
            :visible="visible"
            title="篮子组成"
            @close="closeModel"
        >
            <template slot="modelContent">
                <el-table 
                    :data="composeData" 
                    class="pubTable" 
                    height="380px"
                    >
                    <el-table-column prop="TrdDate" align="center" label="交易日期" width="90"></el-table-column>
                    <el-table-column prop="BusiCode" align="center" label="约定模式" width="90">
                        <template slot-scope="scope">  
                            {{dictionary.BusiCodeDic[scope.row.BusiCode]}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="AppDate" align="center" label="约定日期" width="90"></el-table-column>
                    <el-table-column prop="AppDateType" align="center" label="日期类型" width="90">
                        <template slot-scope="scope">  
                            {{dictionary.AppDateType[scope.row.AppDateType]}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="StockCode" align="center" label="证券代码" width="90"></el-table-column>
                    <el-table-column prop="StockName" align="center" label="证券名称" width="90"></el-table-column>
                    <el-table-column prop="Price" align="center" label="委托价格" width="90"></el-table-column>
                    <el-table-column prop="OrderQty" align="center" label="委托数量" width="90"></el-table-column>
                    <el-table-column prop="Amount" align="center" label="委托金额" width="90"></el-table-column>
                    <el-table-column prop="Term" align="center" label="合约期限" width="90"></el-table-column>
                    <el-table-column prop="ConfirmQty" align="center" label="确认数量" width="90"></el-table-column>
                </el-table>
            </template>
        </selfModel>
    </div>
</template>

<script>

import selfModel from "@/components/selfModel/selfModel.vue";
import dictionary from "@/utils/dictionary";
import util from "@/utils/util";

export default {
    components: {
        selfModel,
    },
    props: {
        loading: {},
        composeData: {
            type: Array,
            default: () => ([]),
        },
        successText:''
    },
    data() {
        return {
            visible: false,
            dictionary
        };
    },
    methods: {
        showModel() {
            this.visible = true;
        },
        closeModel() {
            this.visible = false;
        },
        formatRate: util.formatRate
    },
};
</script>
<style scoped>
.pd30 {
    padding: 30px;
}
.submitBox {
    padding: 30px 0 0;
    border-top: 1px solid #eee;
}
.submit_btn {
    display: block;
    margin: 0 auto;
    width: 150px;
    height: 54px;
    background: #c5181f;
    border-radius: 5px;
    font-size: 18px;
    color: #ffffff;
}
.list{
    padding-bottom: 5px;
}
.list p{
    display: flex;
    justify-content: space-between;
    line-height: 2em;
    margin-bottom: 8px;
    color: #666;
}
.list p span{color: #333;}
</style>

