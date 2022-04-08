<template>
    <div>
        <transition name="fade">
			<div v-if="visible" class="index_intention">
				<div class="intention_box newin_success">
					<span class="infor_countdown">S{{timeNum}}</span>
					<!-- 关闭按钮 -->
					<img class="in_close" @click="closeModel()" src="~@/assets/index_close.png" alt />
					<img class="in_success" src="~@/assets/securities/fail.png" v-if="isFail"/>
                    <img class="in_success" src="~@/assets/success.png" v-else/>
                    
					<p class="in_text">{{text}}</p>
				</div>
			</div>
		</transition>
    </div>
</template>
<script>
export default {
    props:['text','isFail'],
    data(){
        return {
            visible:false,
            timeNum:3, // 时间数量
			timers:null, // 计时器
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
            clearInterval(this.timers);
            this.timeNum = 3;
        },
        showModel(){
            this.visible = true;
            this.timers = setInterval(() => {
				this.timeNum = this.timeNum - 1;
				if (this.timeNum == 0) {
					this.visible = false
					clearInterval(this.timers);
					this.timeNum = 3;
				}
			}, 1000);
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
    }

    .in_text {
        font-size: 24px;
        font-weight: 500;
        color: #333333;
        text-align: center;
    }
</style>

