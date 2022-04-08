<template>
    <div class="bgfff" :style="padding">
        <div class="common_title j_c_a_i">
            <span></span>
            投资者请注意
        </div>
        <ul class="attentionList">
            <li><span>1</span><p>因融券交易受诸多风险控制措施及参教指标限制，约定融券请入的证券可能无法全部卖出，请投资者关注信用账户的各项参教指标，避免约定融券借入证券后无法卖出情况。</p></li>
            <li><span>2</span><p>该界面显示的约定融券费率适用于拥有约定融券资格的客户进行约定融券借入时的费率。</p></li>
            <li><span>3</span><p>约定融券借入申请一经下单，未经本公司同意，不得撤销。</p></li>
            <li><span>4</span><p>系统所展示的券单是历史确定性相对较高的券，最终是否能成功借到，以成交分配后所形成的约定合约为准。</p></li>
            <li><span>5</span><p>竞价约定融券费率是投资者在我公司报价基础上自愿提高的费率报价，若约定融券借入竞价成功，则以该竞价价费率为准，且提前归还费率与竞价约定融券费率一致。</p></li>
            <li><span>6</span><p>日期类型为【该日（含）前有效】的约定融券委托（竞价约券委托除外），有效期内将每日按照系统定价更新约券费率。</p></li>
            <li><span>7</span><p>投资者发起的约定融券借入申请，各证券下的期限、数量、费率等要素可能会被展示给其他投资者。</p></li>
        </ul>
    </div>
</template>
<script>
export default {
    props: {
        padding: {
            type: String,
            default: 'padding: 0 30px 0 30px'
        }
    }
}
</script>

<style scoped>
.attentionList{
    margin-top: 30px;
}
.attentionList li{
    display: flex;
    color: #666666;
    line-height: 30px;
    margin-bottom: 10px;
}
.attentionList li span{
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    color: #fff;
    font-size: 16px;
    border-radius: 50%;
    margin-right: 10px;
    background: #C5181F;
    margin-top: 5px;
    flex-shrink: 0;
}
</style>