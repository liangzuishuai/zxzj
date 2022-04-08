<template>
	<!-- 侧边导航 -->
	<div class="suspension_btn">
		<div class="sus_item" @mouseenter="susMouseLeave(0)" @mouseleave="susMouseLeave(0, 1)">
			<div class="icon1 j_c_a_i" v-if="susdata[0].img"><img src="@/assets/securities/icon5.png" alt /></div>
			<div class="lend j_c_a_i" v-if="susdata[0].cur" @click="switchoffchange('wt')">
				<img src="@/assets/securities/icon5_1.png" alt />
				借入委托
			</div>
		</div>
		<div class="sus_item" @mouseenter="susMouseLeave(1)" @mouseleave="susMouseLeave(1, 1)">
			<div class="icon1 j_c_a_i" v-if="susdata[1].img"><img src="@/assets/headset_img.png" alt /></div>
			<div class="lend j_c_a_i" v-if="susdata[1].cur" @click="switchoffchange()">
				<img src="@/assets/kefu_icon.png" alt />
				联系客服
			</div>
		</div>
		<div class="sus_item">
			<div class="icon2 j_c_a_i" v-if="susdata[2].img && !susdata[2].cur" @mouseenter="susMouseLeave(2)" @mouseleave="susMouseLeave(2, 1)">
				<img src="@/assets/code_img.png" alt />
			</div>
			<div class="icon2 icon2cur j_c_a_i" v-if="susdata[2].img && susdata[2].cur" @mouseenter="susMouseLeave(2)" @mouseleave="susMouseLeave(2, 1)">
				<img src="@/assets/icon_code3.png" alt />
			</div>
			<transition name="fade">
				<div class="sus_code" v-if="susdata[2].cur">
					<img src="@/assets/icon_code.png" alt />
					<p>公众号</p>
					<div class="sus_line"></div>
					<img src="@/assets/icon_code2.png" alt />
					<p>手机交易客户端</p>
				</div>
			</transition>
		</div>
	</div>
</template>
<script>
export default {
	name: 'SIdenavigation',
	props: {
		msg: String
	},
	data() {
		return {
			susdata: [
				{
					img: true,
					cur: false
				},
				{
					img: true,
					cur: false
				},
				{
					img: true,
					cur: false
				}
			]
		};
	},
	methods: {
		// 悬浮侧边栏 移入移出
		susMouseLeave(index, type) {
			if (index == 2 && !type) {
				this.susdata[index].cur = true;
				return;
			} else if (index == 2 && type) {
				this.susdata[index].cur = false;
			} else {
				if (type) {
					this.susdata[index].img = true;
					this.susdata[index].cur = false;
				} else {
					this.susdata[index].img = false;
					this.susdata[index].cur = true;
				}
			}
		},
		// 显示弹框
		switchoffchange(e){
            if(e=='wt'){
                this.$router.push({
                    name:'entrustBorrow',
                })
            }
			
		}
	},
	mounted() {
		let body = document.querySelector('body');
		this.body = body;
	},
};
</script>
<style lang="scss">
.suspension_btn {
	top: 300px;
	position: fixed;
	right: 0;
	color: #ffffff;
	font-size: 14px;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	z-index: 9;

	.lend {
		width: 114px;
		height: 42px;
		background: #c5181f;
		border-radius: 6px 0px 0px 6px;
		margin-top: 10px;
		cursor: pointer;

		& img {
			width: 18px;
			height: 18px;
			margin-right: 10px;
		}
	}

	.icon1,
	.icon2 {
		width: 40px;
		height: 40px;
		background: #fcfbfb;
		border-radius: 6px 0px 0px 6px;
		border: 1px solid #eeeeee;
		margin-top: 10px;

		& img {
			width: 18px;
			height: 18px;
		}
	}

	.sus_item {
		position: relative;
		// margin: 5px 0;
		.sus_code {
			position: absolute;
			left: -150px;
			top: -140px;
			display: flex;
			flex-direction: column;
			align-items: center;
			// width: 140px;
			// height: 328px;
			padding: 20px 20px;
			background: #ffffff;
			box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);
			border-radius: 6px;
			margin-right: 8px;

			& .sus_line {
				width: 100px;
				border: 1px solid #eeeeee;
				margin: 20px 0 18px 0;
			}

			& p {
				font-size: 14px;
				color: #999999;
				margin-top: 9px;
			}

			& img {
				width: 102px;
				height: 102px;
			}
		}

		.icon2cur {
			background: #c5181f;
		}
	}
}
</style>
