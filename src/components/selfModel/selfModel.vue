<template>
    <transition name="fade">
        <div v-if="visible" class="index_intention">
            <div class="selfModel" :style="{'background':background?background:'#fff','width':width+'px'}">
                <!-- 关闭按钮 -->
				<img class="closeModel" src="~@/assets/index_close.png" alt @click="closeModel()" />
                 <!-- 标题 -->
                <div class="modelTitle"><i class="line_l"></i><span>{{title}}</span><i class="line_r"></i></div>
                <div class="modelContent">
                    <slot name="modelContent"></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props:["width","visible","title","background"],
    data () {
        return {
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
    methods: {
        closeModel(){
            this.$emit("close")
        }
        
    },
    
}
</script>

<style scoped>
    .index_intention{
        top: 0;
        left: 0;
    }
    .selfModel{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 8;
        padding: 136px 20px 30px 30px;
        box-sizing: border-box;
    }
    .modelContent{
        max-height: 600px;
        min-height: 400px;
        overflow-y: auto;
        padding-right: 10px;
    }
    .modelTitle{
        position: absolute;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 60px;
        font-size: 36px;
        color: #1c1d1c;
        font-weight: bold;
        box-sizing: border-box;
    }
    .modelTitle span{
        margin: 0 20px;
    }
    .modelTitle i{
        width: 60px;
        height: 2px;
        position: relative;
    }
    .line_l{background: linear-gradient(270deg, #c5181f 0%, rgba(197, 24, 31, 0) 100%);}
    .line_r{background: linear-gradient(55deg, #c5181f 0%, rgba(197, 24, 31, 0) 100%);}
    .modelTitle i::after {
        content: '';
        display: block;
        width: 6px;
        height: 6px;
        background: #c5181f;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        margin-top: -3px;
    }
    .modelTitle i.line_l::after{
        right: -3px;
    }
    .modelTitle i.line_r::after{
        left: -3px;
    }
    .closeModel{
        cursor: pointer;
        position: absolute;
        top: 0;
        right: 0;
        width: 30px;
        height: 30px;
        margin: 30px;
    }
</style>
