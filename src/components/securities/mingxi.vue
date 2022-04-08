<template>
    <div>
        <selfModel
            :visible="visible"
            width="500"
            title="委托明细"
            @close="closeModel"
        >
            <div class="yuequanModel" slot="modelContent">
                <!-- editData.current 0:个劵  1：推荐劵  2：篮子 -->
                <div class="list">
                    <p v-if="editData.isBasket">
                        篮子代码<span>{{ editData.BasketNo }}</span>
                    </p>
                    <p>
                        证券代码：<span>{{ editData.StockName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ editData.StockCode }}</span>
                    </p>
                    <template v-if="!editData.isBasket">
                        <p v-if="mingxiSource === 'list'">
                            股东账号：<span>{{ editData.stockAccount }}</span>
                        </p>
                        <p>
                            交易市场：<span>{{
                                shichangc[editData.ExchangeType]
                            }}</span>
                        </p>
                    </template>
                    
                    <p>
                        约定日期：<span>{{ editData.dateString }}</span>
                    </p>
                    <p>
                        日期类型：<span>{{ riqi[editData.AppDateType] }}</span>
                    </p>
                    <p>
                        约定模式：<span>{{ yueding[editData.BusiCode] }}</span>
                    </p>
                    <p>
                        借入天数：<span>{{
                            editData.Term || editData.MaxTerm
                        }}</span>
                    </p>
                    <p>
                        约定数量：<span>{{ editData.Qty }}</span>
                    </p>
                    <p>
                        约定融券费率报价：<span>{{ editData.FeeRate }}/年</span>
                    </p>
                    <p>
                        参与竞价：<span>{{editData.checked?'是':'否'}}</span>
                    </p>
                    <p v-if="editData.checked">
                        约定融券竞价费率：<span>{{ editData.CustRate + "%" }}/年</span>
                    </p>
                    <p>
                        违约金率：<span>{{ editData.PostRate }}</span>
                        <!-- 违约金率：<span>{{ editData.PostRate }}</span> -->
                    </p>
                    <p>
                        提前归还费率：<span>{{editData.checked?editData.CustRate + "%": editData.PreRate }}/年</span>
                    </p>
                </div>
                <div class="submitBox">
                    <el-button
                        class="submit_btn"
                        :loading="loading"
                        @click="submit()"
                        >提交</el-button
                    >
                </div>
            </div>
        </selfModel>
    </div>
</template>

<script>
const shichangc = {
    1: "上海",
    2: "深圳",
};
const riqi = {
    0: "仅当日有效",
    1: "该日（含）前有效",
};
const yueding = {
    "110B": "T+0",
    "111B": "T+1",
};
import selfModel from "@/components/selfModel/selfModel.vue";
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
        mingxiSource: {  // list: 券池列表选择 custom: 用户自己输入
            type: String,
            default: 'list'
        }
    },
    data() {
        return {
            visible: false,
            shichangc,
            riqi,
            yueding,
        };
    },
    mounted(){
    },
    methods: {
        showModel() {
            this.visible = true;
        },
        closeModel() {
            this.visible = false;
        },
        submit() {
            this.$emit("submit", this.editData);
        },
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

