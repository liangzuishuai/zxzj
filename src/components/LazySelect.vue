<template>
    <div>
        <el-select
            :style="{ width: width + 'px' }"
            filterable
            remote
            :loading="codeLoading"
            @change="codeChange"
            :remote-method="codeRemoteMethod"
            v-model="ruleForm.region"
            :placeholder="placeholder"
			clearable
			@focus="focus"
			@blur="blur"
			@visible-change="visible"
        >
            <el-option
                v-for="(item, index) in codeData"
                :key="index + '1'"
                :label="`${item.stock_id}  ${item.stock_name}`"
                :value="item.stock_id"
            ></el-option>
        </el-select>
    </div>
</template>
<script>
import { createStock } from '@/api/index/index';
import $axios from 'axios'
export default {
    name:'lazy',
    props: {
		// 提示语
        placeholder:{
            type:String,
            default(){
				return '请选择'
			}
        },
		// 宽度
		width:{
			type:Number,
			default: 580
		},
		// 默认设置数据
		region:{
			default:''
		}
    },
    data() {
        return {
			codeLoading: false, // 证金名称搜索loading
            codeData:[], // 证券名称代码数据
            allCodeData:[], // 全部数据
            ruleForm:{
                region:'', // value值
                number: 1000, // 最大出借值
                min: 1000, // 最小出借值
                regionCode:'', // 证券名称
            },
			queryValue:'', // 实时输入的值
        }
    },
    created() {
		// 查询个人
		this.createStock();
		this.ruleForm.region = this.region;
	},
	watch:{
		region(newValue,oldValue){
			this.ruleForm.region = newValue;
		}
	},
    methods: {
		// 失去焦点
		blur(){
			if(!this.ruleForm.region){
				this.$emit('valueChange', this.queryValue);
			}
		},
		// 获取焦点
		focus(type){
			return
		},
		// 下拉框出现
		visible(type){
			if(type){
				this.createStock();
			}
		},
		// 清除 value
		clearRegion(){
			this.ruleForm.region = '';
			this.ruleForm.regionCode = '';
			this.ruleForm.number = 10000;
			this.ruleForm.min = 10000;
		},
        // 查询账号信息
		createStock() {
			let code = this.$store.state.codeData && JSON.parse(this.$store.state.codeData);
			if (code) {
				this.allCodeData = code; // 全部数据
				let newdata = code.slice(0, 20); // 部分展示数据
				this.codeData = newdata; // 展示数据赋值
			} else {
				// createStock().then(res => {
				// 	this.$store.dispatch('set_codeData', res.data);
				// 	this.allCodeData = res.data; // 全部数据
				// 	let newdata = this.allCodeData.slice(0, 20); // 部分展示数据
				// 	this.codeData = newdata; // 展示数据赋值
				// });
				$axios({
					method: 'post',
					url: `https://kong.citics.com/api/v1/Xin/createStock?time=${new Date()}`,
				}).then(res=>{
					this.$store.dispatch('set_codeData', res.data.data);
					this.allCodeData = res.data.data; // 全部数据
					let newdata = this.allCodeData.slice(0, 20); // 部分展示数据
					this.codeData = newdata; // 展示数据赋值
				}).catch(err=>{
					console.log(err)
				})
			}
		},
        // 出借弹框证券名称选择
		codeChange(item) {
			this.allCodeData.forEach(element => {
				if(element.stock_id == item){
					this.ruleForm.regionCode = element.stock_name
				};
			});
			// 68 和 30 开头的  最大出借数量是 1000  否则 默认是 10000
			if(item.endsWith('68',2) || item.endsWith('30',2)){
				this.ruleForm.number = 1000;
				this.ruleForm.min = 1000;
			}else{
				this.ruleForm.number = 10000;
				this.ruleForm.min = 10000;
			};
            // 抛出数据
            this.$emit('change', this.ruleForm);
			// 初始化数据
			this.createStock();
		},
        // 证券名称搜索
		codeRemoteMethod(query) {
			if (query !== '') {
				this.loading = true;
				// setTimeout(() => {
					this.loading = false;
					// 全部数据
					this.codeData = this.allCodeData.filter(item => {
						return item.stock_name.includes(query) || item.stock_id.includes(query) || item.spell.includes(query);
					});
				// }, 100);
			} else {
				this.options = [];
			}
			this.queryValue = query;
		},
    },
}
</script>