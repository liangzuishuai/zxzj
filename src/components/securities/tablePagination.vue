<template>
    <div class="bus_page j_c_a_i  pd30">
        <el-pagination
            :background="true"
            :current-page="pagination.page"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="pagination.pageSize"
            :layout="layoutP" 
            :total="totalSize"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        ></el-pagination>
    </div>
</template>
<script>
export default {
    props: {
        totalSize: {},
        layoutP: {
            default: 'total, sizes, prev, pager, next, jumper'
        }
    },
    data(){
        return {
            pagination:{
                pageSize: 10,
                page: 1,
            }
        }
    },
    methods:  {
        handleSizeChange(val) {
            this.pagination.pageSize = val
            this.$emit('changePage')
        },
        handleCurrentChange(val) {
            this.pagination.page = val
            this.$emit('changePage')
        },
        initPaganition(){
            this.pagination.page = 1
        },
        minPage(){
            this.pagination.page--
        }
    }
}
</script>
<style scoped>

</style>