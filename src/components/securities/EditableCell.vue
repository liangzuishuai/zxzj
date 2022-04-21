<template>
  <div class="editable-cell" @click.stop="">
    <div v-if="editable" class="editable-cell-input-wrapper">
      <el-input
        v-model="value"
        @change="handleChange"
        size="small"
        style="width:100px"
        @pressEnter="check"
         onkeyup="this.value=this.value.replace(/\D|^0/g,'')" onafterpaste="this.value=this.value.replace(/\D|^0/g,'')" 
      />
      <i class="el-icon-check"  @click.stop="check"></i>
    </div>
    <div v-else class="editable-cell-text-wrapper">
      <span :style="{display:'inline-block', width: noEdit ? '100%' : '100px'}">{{ value || "--" }}</span>
      <i class="el-icon-edit-outline"  @click.stop="edit" v-if="!noEdit"></i>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        text: String,
        dataName:{},
        record:{},
        noEdit: false
    },
    data() {
        return {
            value: this.text,
            editable: false,
        };
    },
    created(){
        this.$watch('text',() =>{
            this.value = this.text
        })
    },
    methods: {
        handleChange(val) {
            if(this.dataName=='Term'){
                var originTermInDays = parseInt(this.record.Term); //融券期限
                if(val<2){
                    this.$message("展期天数需大于1天");
                    val = originTermInDays;
                }else if(val>182){
                    val = originTermInDays;
                    this.$message("展期天数需小于183天");
                }
            }
            if(this.dataName=='zhanqi'){
                
                if(val<=0){
                    this.$message("展期数量需大于0")
                    val = ''
                }else if(val>this.record.LeftQty){
                    val = this.record.LeftQty
                    this.$message("展期数量不能超过未还数量")
                }
            }
            if(this.dataName=='guihuan'){
                
                if(val<=0){
                    this.$message("归还数量需大于0")
                    val = ''
                }else if(val>this.record.LeftQty2){
                    val = this.record.LeftQty
                    this.$message("归还数量不能超过未还数量")
                }
            }
            this.value = val;
        },
        check() {
            this.editable = false;
            this.$emit('change', this.value);
        },
        edit() {
            this.editable = true;
        },
    },
};
</script>

<style scoped >
.editable-cell {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}


.editable-cell:hover .el-icon-checkn {
  display: inline-block;
}

.el-icon-checkn:hover,
.el-icon-edit-outline:hover {
  color: #108ee9;
}
.el-icon-edit-outline {
  margin-top: 2px;
}

.editable-add-btn {
  margin-bottom: 8px;
}
</style>
