<template>
<div>
    <div v-for="(item,index) in ReplyHead" :key="index">
    <el-table-column v-if="item.ColumnName == 'UpdateTime' && item.ShowFlag == '1'" align="center" prop="UpdateTime" min-width="180" label="邀约时间" height>
        <template slot-scope="scope">
            <div>
                {{ $moment(scope.row.UpdateTime).format('YYYY-MM-DD HH:mm:ss') }}
            </div>
        </template>
    </el-table-column>
    <el-table-column align="center" v-if="item.ColumnName == 'StockCode' && item.ShowFlag == '1'" prop="StockCode" :label="item.FieldName" min-width="100" height="59"></el-table-column>
    <el-table-column align="center" v-if="item.ColumnName == 'StockName' && item.ShowFlag == '1'" prop="StockName" min-width="150" :label="item.FieldName" height ></el-table-column>
    <el-table-column align="center" v-if="item.ColumnName == 'Qty' && item.ShowFlag == '1'" prop="Qty" min-width="120" :label="item.FieldName" height></el-table-column>
    <el-table-column align="center" v-if="item.ColumnName == 'Term' && item.ShowFlag == '1'" prop="Term" min-width="120" :label="item.FieldName" height></el-table-column>
    <el-table-column align="center" v-if="item.ColumnName == 'BusiCode' && item.ShowFlag == '1'" prop="BusiCode" min-width="100" :label="item.FieldName" sortable height="59"></el-table-column>
    <el-table-column align="center" v-if="item.ColumnName == 'FeeRate' && item.ShowFlag == '1'" prop="FeeRate" min-width="120" :label="item.FieldName" height>
        <template slot-scope="scope">
            <div>
                {{(scope.row.FeeRate * 100).toFixed(2) }} %
            </div>
        </template>
    </el-table-column>
    <el-table-column align="center" v-if="item.ColumnName == 'ClientName' && item.ShowFlag == '1'" prop="ClientName" min-width="200" :label="item.FieldName" height></el-table-column>
    <el-table-column align="center" v-if="item.ColumnName == 'StockAccount' && item.ShowFlag == '1'" prop="StockAccount" min-width="120" :label="item.FieldName" height></el-table-column>
    <el-table-column align="center" v-if="item.ColumnName == 'Seat' && item.ShowFlag == '1'" prop="Seat" min-width="120" :label="item.FieldName" height></el-table-column>
    <el-table-column align="center" v-if="item.ColumnName == 'Status' && item.ShowFlag == '1'" prop="address7" :label="item.FieldName" height width="80">
        <template slot-scope="scope">
            <div v-if="scope.row.Status == 0">
                待处理
            </div>
            <div v-else-if="scope.row.Status == 1">
                已执行
            </div>
            <div v-else-if="scope.row.Status == 2">
                已拒绝
            </div>
            <div v-else-if="scope.row.Status == 3">
                已过期
            </div>
        </template>
    </el-table-column>
    <el-table-column align="center" v-if="index == tableData124.length" fixed="right" prop="Status" label="操作" height width="200">
        <template slot-scope="scope">
            <div class="invitation_span" v-if="scope.row.Status == 0">
                <span class="inv_span1" @click="queryService123(scope.row,1)">设为已执行</span>
                <span class="inv_span2" @click="queryService123(scope.row,2)">设为已拒绝</span>
            </div>
            <div class="invitation_span" v-if="scope.row.Status == 1">
                <span class="inv_span2"  @click="queryService123(scope.row,2)">设为已拒绝</span>
            </div>
            <div class="invitation_span" v-if="scope.row.Status == 2">
                <span class="inv_span1" @click="queryService123(scope.row,1)">设为已执行</span>
            </div>
            <div class="invitation_span" v-if="scope.row.Status == 3">
            </div>
        </template>
    </el-table-column>
</div>
</template>
<script>
export default {};
</script>
<style lang="">
</style>