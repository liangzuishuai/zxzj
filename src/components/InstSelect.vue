<template>
    <div>
        <el-select
            :style="{ width: width + 'px' }"
            filterable
            remote
            @change="codeChange"
            :remote-method="codeRemoteMethod"
            v-model="ruleForm.regionValue"
            :placeholder="placeholder"
			clearable
			@focus="focus"
			@blur="blur"
			@visible-change="visible"
        >
            <el-option
                v-for="(item, index) in codeData"
                :key="index + '1'"
                :label="`${item.CompanyName}`"
                :value="item.CompanyId"
            ></el-option>
        </el-select>
    </div>
</template>
<script>
export default {
    name:'inst',
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
		},
        // 数据
        DataList:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data() {
        return {
            codeData:[], // 证券名称代码数据
            allCodeData:[], // 全部数据
            ruleForm:{
                regionValue:'', // value值
                regionName:'', // 证券名称
				SourceType:"", // 出借类型
            },
			queryValue:'', // 实时输入的值
        }
    },
    created() {
		// 查询个人
		this.createStock();
		this.ruleForm.regionValue = this.region;
	},
	watch:{
		region(newValue,oldValue){
			this.ruleForm.regionValue = newValue;
		}
	},
    methods: {
		// 失去焦点
		blur(){
			if(this.codeData.length == 0){
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
			this.ruleForm.regionValue = '';
			this.ruleForm.regionName = '';
		},
        // 查询账号信息
		createStock() {
            this.codeData = this.DataList; // 获取传入的值
            this.allCodeData = this.DataList; // 全部数据
		},
        // 出借弹框证券名称选择
		codeChange(item) {
			this.allCodeData.forEach(element => {
				if(element.CompanyId == item){
					this.ruleForm.regionName = element.CompanyName; // 名称
					this.ruleForm.SourceType = element.SourceType; // 出借类型
				};
			});
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
						return item.CompanyName.includes(query);
					});
				// }, 100);
			} else {
				this.codeData = this.allCodeData;
			}
			this.queryValue = query;
		},
    },
}
</script>