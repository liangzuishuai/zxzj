<template>
    <div>
        <transition name="fade">
			<div v-if="visible" class="index_intention">
				<div class="intention_box newin_success">
					<div class="loading"></div>
					<p class="in_text">数据正在上传中…</p>
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
        height: 342px;
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
        animation:loading 3s infinite ease;
    }

    .in_text {
        font-size: 24px;
        font-weight: 500;
        color: #333333;
        text-align: center;
    }
    .loading {
        margin: 80px auto 30px;
        border: 10px solid #f3f3f3;
        border-radius: 50%;
        border-top: 10px solid #C5181F;
        width: 128px;
        height: 128px;
        -webkit-animation: spin 2s linear infinite;
        animation: spin 2s linear infinite;
   }   
   @-webkit-keyframes spin {
    0% {
     -webkit-transform: rotate(0deg);
    }
    100% {
     -webkit-transform: rotate(360deg);
    }
   }   
   @keyframes spin {
    0% {
     transform: rotate(0deg);
    }
    100% {
     transform: rotate(360deg);
    }
   }
</style>

