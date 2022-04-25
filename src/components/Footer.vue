<template>
    <div class="footer">
        <div class="box">中国中信集团有限公司版权所有 Copyright © CITIC Holdings All rights reserved 京ICP证030779-2号-3</div>
        <div>
            <p class="footer_version">
                本网站支持IPv6
                <span class=“version_num>v1.0.002</span>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'footer_comp',
    props: {
        msg: String
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.footer {
    width: 100%;
    background: #222222;
    .box {
        width: 100%;
        text-align: center;
        height: 60px;
        background: #222222;
        font-size: 14px;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 400;
        color: #BBBBBB;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .footer_version{
        max-width: 1400px;
        text-align: center;
        margin: 0 auto;
        position: relative;
        color: #BBBBBB;
        height: 40px;

        span{
            position: absolute;
            right: 10%;
            top: 0;
        }
    }
}
</style>