<template>
    <div>
        <selfModel
            :visible="visible"
            width="915"
            title="提交明细"
            @close="closeModel"
        >
            <div  slot="modelContent" class="guihuanModel">
                <el-table 
                :data="editData" 
                style="width: 100%" 
                height="500"
                class="pubTable" 
                >
                
                    <el-table-column prop="CompactNo" align="center" label="合约编号"  width="240"></el-table-column>
                    <el-table-column prop="LeftQty1" align="center" label="展期数量" >
                    </el-table-column>
                    <el-table-column prop="StockCode" align="center" label="证券代码"></el-table-column>
                    <el-table-column prop="StockName" align="center" label="证券名称"></el-table-column>
                    <el-table-column prop="ZqRate" align="center" label="约定融券费率">
                        <template slot-scope="scope">  
                            {{scope.row.FeeRate+'%'}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="PreRate" align="center" label="提前归还费率">
                        <template slot-scope="scope">  
                            {{scope.row.PreRate+'%'}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="PostRate" align="center" label="违约金率">
                        <template slot-scope="scope">  
                            {{scope.row.PostRate+'%'}}
                        </template>
                    </el-table-column>
                </el-table>
                <div class="submitBox">
                    <el-button @click="closeModel">取消</el-button>
                    <el-button class="ml20 submitbtn" @click="submitMx">确认</el-button>
                </div>
            </div>
        </selfModel>
        
    </div>
</template>

<script>

import selfModel from "@/components/selfModel/selfModel.vue";
import dictionary from "@/utils/dictionary";
export default {
    components: {
        selfModel,
    },
    props: {
        loading: {},
        editData: {
            type: Array,
            default: () => ([]),
        },
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
        submitMx(){
            this.$emit("submitMx")
        }
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
</style>

