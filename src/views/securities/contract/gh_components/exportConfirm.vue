<template>
    <div>
        <transition name="fade">
			<div v-if="visible" class="index_intention">
				<div class="intention_box newin_success">
					<!-- 关闭按钮 -->
					<img class="in_close" @click="closeModel()" src="~@/assets/index_close.png" alt />
                    <img class="in_success" src="~@/assets/securities/down.png"/>
					<p class="in_text">导入时会清空现有数据，确认继续？</p>
                    <div class="submitBox">
                        <el-button @click="closeModel">取消</el-button>
                        <el-button class="ml20 submitbtn" @click="exportConfirm">确认</el-button>
                    </div>
				</div>
			</div>
		</transition>
    </div>
</template>
<script>
export default {
    data(){
        return {
            visible:false,
            body:{}
        }
    },
    watch: {
        visible (val) {
            if(val){
               this.body.style.overflow = 'hidden';
            }else{
                this.body.style.overflow = 'auto'; 
            }
        }
    },
    mounted() {
		let body = document.querySelector('body');
		this.body = body;
	},
    methods:{
        closeModel(){
            this.visible = false
        },
        showModel(){
            this.visible = true;
        },
        exportConfirm(){
            this.$emit("confirm")
        }
    },
    
}
</script>

<style scoped>
    .index_intention{top: 0;left: 0;}
    .infor_countdown{
        right: 65px;
        top: 33px;
        width: 30px;
        text-align: center;
        position: absolute;
        font-size: 18px;
        color: #999999;
        font-weight: 500;
    }
    .index_intention .intention_box{
        width: 700px;
        height: 406px;
    }
    .infor_title {
        width: 100%;
        margin-top: 60px;
        margin-bottom: 30px;
    }
    .in_success {
        width: 128px;
        height: 128px;
        margin: 80px auto 30px;
    }

    .in_text {
        font-size: 24px;
        font-weight: 500;
        color: #333333;
        text-align: center;
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

