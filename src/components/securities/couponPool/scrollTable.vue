<template>
    <el-table 
        :data="tableData" 
        style="width: 100%" 
        class="pubTable" 
        height="500"
        ref="personCoupons"
        @selection-change="handleSelectionChange"
    >
        <slot></slot>
    </el-table>
</template>

<script>
export default {
    props: ['tableData'],
    components: {
    },
    data(){
        return {
            tableDataLoadEnd: false,
        }
    },
    mounted(){
        this.personCouponsScroll();
    },
    methods: {
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
        handleSelectionChange(val){
            this.$emit('selectChange', val)
        }
    }
}
</script>
