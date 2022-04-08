<template>
    <div>
        <selfModel
            :visible="visible"
            width="500"
            title="明细"
            @close="closeModel"
        >
            <div class="yuequanModel" slot="modelContent">
                <div class="list">
                    <p>申报时间<span>{{ editData.AppDate }}</span></p>
                    <p>约定模式<span>{{ dictionary.BusiCodeDic[editData.BusiCode] }}</span></p>
                    <p>证券代码<span>{{ editData.StockCode }}</span></p>
                    <p>融券期限<span>{{ editData.Term }}</span></p>
                    <p>合约编号<span>{{ editData.AppNo }}</span></p>
                    <p>约定融券费率<span>{{ formatRate(editData.FeeRate)}}</span></p>
                    <p>违约金率<span>{{ formatRate(editData.PostRate)}}</span></p>
                    <p>提前归还费率<span>{{ formatRate(editData.PreRate)}}</span></p>
                    <p>申报数量<span>{{ editData.Qty }}</span></p>
                    <p>约定日期类型<span>{{dictionary.AppDateType[editData.AppDateType]}}</span></p>
                    <!-- <p>证券名称<span>{{ editData.StockName }}</span></p> -->
                    <!-- <p  v-if="editData.ProcFlag == 'N'">确认状态<span>成功</span></p> -->
                    <!-- <p  v-if="editData.ProcFlag == 'P'">确认状态<span>已办理</span></p> -->
                </div>
            </div>
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
        editData: {
            type: Object,
            default: () => ({}),
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

