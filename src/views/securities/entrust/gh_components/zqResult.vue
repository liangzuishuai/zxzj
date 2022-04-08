<template>
    <div>
        <selfModel
            :visible="visible"
            width="915"
            :title="tableTitle || '撤销委托结果'"
            background="#F8F9FC"
            @close="closeModel"
        >
            <div  slot="modelContent" class="guihuanModel">
                <div class="number"><p>{{title}}成功：<span class="colorRed">{{successData.length}}</span>条</p><p>{{title}}失败：<span class="colorBlue">{{failData.length}}</span>条</p></div>
                <!-- <template v-if="successData.length>0">
                <div class="common_title j_c_a_i bgfff" style="padding-top:20px;padding-bottom:20px;padding-left:30px;box-sizing:border-box;">
                    <span></span>
                    成功结果
                </div>
               
                <el-table 
                :data="successData" 
                style="width: 100%" 
                class="pubTable" 
                >
                   <slot name="success">
                        <el-table-column prop="AppNo" align="center" label="合约编号"  width="160" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="StockCode" align="center" label="证券代码"></el-table-column>
                        <el-table-column prop="StockName" align="center" label="证券名称"></el-table-column>
                        <el-table-column prop="resultMsg" align="center" label="撤销委托结果" width="150" show-overflow-tooltip></el-table-column>
                   </slot>
                </el-table>
                </template> -->
                <template v-if="failData.length>0">
                    <div class="common_title j_c_a_i bgfff" style="padding-top:20px;padding-bottom:20px;padding-left:30px;box-sizing:border-box;">
                        <span></span>
                        失败结果
                    </div>
                    <el-table 
                    :data="failData" 
                    style="width: 100%" 
                    class="pubTable" 
                    >
                        <slot name="fail"> 
                            <el-table-column prop="AppNo" align="center" label="合约编号"  width="240" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="StockCode" align="center" label="证券代码"></el-table-column>
                            <el-table-column prop="StockName" align="center" label="证券名称"></el-table-column>
                            <el-table-column prop="resultMsg" align="center" label="失败原因" width="420" show-overflow-tooltip></el-table-column>
                        </slot>
                    
                    </el-table>
                </template>
                <slot name="button"></slot>
            </div>
        </selfModel>
        
    </div>
</template>

<script>

import selfModel from "@/components/selfModel/selfModel.vue";
import dictionary from "@/utils/dictionary";
export default {
    components: {
        selfModel
    },
    props: {
        loading: {},
        failData: {
            type: Array,
            default: () => ([]),
        },
        successData: {
            type: Array,
            default: () => ([]),
        },
        title:{
            type: String,
            default: () => (''),
        },
        tableTitle:{
            type: String,
            default: () => (''),
        }
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
        
    },
};
</script>
<style scoped>
.pd30 {
    padding: 30px;
}
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
.number{
    display: flex;
}
.number p{margin-right: 20px;margin-bottom: 20px;}
</style>

