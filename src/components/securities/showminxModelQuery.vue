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
                    <p>交易日期<span>{{ editData.TrdDate }}</span></p>
                    <p>约定模式<span>{{ dictionary.BusiCodeDic[editData.BusiCode] }}</span></p>
                    <p>约定日期<span>{{ editData.AppDate }}</span></p>
                    <p>日期类型<span>{{dictionary.AppDateType[editData.AppDateType]}}</span></p>
                    <p>证券代码<span>{{ editData.StockCode }}</span></p>
                    <p>证券名称<span>{{ editData.StockName }}</span></p>
                    <p>委托数量<span>{{ editData.OrderQty }}</span></p>
                    <p>合约期限<span>{{ editData.Term }}</span></p>
                    <p>年融券费率<span>{{ formatRate(editData.BidFlag === '1'? editData.CustRate : editData.FeeRate)}}</span></p>
                    <p>确认状态<span>{{ dictionary.ConfirmStatusDic[editData.ConfirmStatus] }}</span></p>
                    <p>确认数量<span>{{ editData.ConfirmQty }}</span></p>
                    <!-- <p>处理信息<span>{{ dictionary.ProcFlag[editData.ProcFlag] }}</span></p> -->
                    <p>处理信息<span>{{ editData.RetMsg || '--' }}</span></p>
                    <p>提前归还利率（费率）<span>{{ formatRate(editData.PreRate)}}</span></p>
                    <p>费率类型<span >{{editData.BidFlag === '3' ? '折扣': editData.BidFlag === '1' ? '竞价' : '普通'}}</span></p>
                    <p>委托金额<span>{{ editData.Amount }}</span></p>
                    <p>预估利息<span>{{ editData.AppFee }}</span></p>
                    <p>年违约金率<span>{{ formatRate(editData.PostRate)}}</span></p>
                    <p>委托价格<span>{{ editData.Price }}</span></p>
                    <p>合约编号<span>{{ editData.AppNo }}</span></p>
                    <p>资金账号<span>{{ editData.FundAccount }}</span></p>
                </div>
            </div>
        </selfModel>
        
    </div>
</template>

<script>
import fareWay  from '@/components/securities/couponPool/fareWay.vue';
import selfModel from "@/components/selfModel/selfModel.vue";
import dictionary from "@/utils/dictionary";
import util from "@/utils/util";

export default {
    components: {
        selfModel,
        fareWay
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

