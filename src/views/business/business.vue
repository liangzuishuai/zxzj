<template>
	<div class="business_box f_d_a_i">
		<Header :curIndex="1" />
		<!-- tab 切换 -->
		<div class="bus_header f_d_a_i">
			<img class="bus_bjimg" src="../../assets/bj_img4.png" alt />
			<div class="bus_card j_c_a_i">
				<div @click="navChange(index)" v-for="(item, index) in titleData" :key="index + 'a'" :class="['card_item', tabCurindex == index ? 'curred' : '', 'j_c_a_i']">
					<img v-if="index == tabCurindex" :src="item.imgcur" alt />
					<img v-else :src="item.img" alt />
					<div class="card_right">
						<p class="p1">{{ item.title }}</p>
						<p class="p2">{{ item.text }}</p>
					</div>
				</div>
			</div>
		</div>
		<!-- tab标题 -->
		<div class="infor_title j_c_a_i">
			<div class="infor_line j_c_a_i">
				<span class="line"></span>
				<span class="round"></span>
			</div>
			<div v-if="tabCurindex == 0" class="infor_my">我的出借意向</div>
			<div v-if="tabCurindex == 1" class="infor_my">{{curtitle}}</div>
			<div v-if="tabCurindex == 2" class="infor_my">市场行情</div>
			<div class="infor_line j_c_a_i">
				<span class="round"></span>
				<span class="line line2"></span>
			</div>
		</div>
		<!-- 我的出借意向 -->
		<!-- <transition name="fade"> -->
		<div v-if="tabCurindex == 0" class="bus_content f_d_a_i">
			<div class="bus_query">
				<div class="common_title j_c_a_i">
					<span></span>
					出借意向查询
				</div>
				<div class="bus_search">
					<span>证券代码/名称</span>
					<div class="bus_input"><lazy-select @change="lazyChange" ref="LazySelect" :width="450" placeholder="证券代码/名称/简称"></lazy-select></div>
					<span class="spans_1">提交时间</span>
					<div class="bus_input bus_time j_c_a_i">
						<el-date-picker style="width: 240px;" @change="pickerChange(search.StartTime,0)" v-model="search.StartTime" type="datetime" placeholder="选择开始时间"></el-date-picker>
						<div class="cross j_c_a_i">-</div>
						<el-date-picker style="width: 240px;" @change="pickerChange(search.EndTime,1)" v-model="search.EndTime" type="datetime" placeholder="选择结束时间"></el-date-picker>
					</div>
					<div class="bus_btn j_c_a_i" type="primary" @click="queryService120(1)">查询</div>
					<div class="bus_btn buswhite j_c_a_i" type="primary" @click="marketClear(120)">重置</div>
				</div>
			</div>

			<!-- 列表 -->
			<div class="bus_table">
				<div class="common_title j_c_a_i">
					<span></span>
					出借意向记录列表
					<p><span class="mingive" @click="$refs.loanInterest.lendBox()">我要出借</span></p>
				</div>
				<el-table
					ref="eltable"
					:default-sort = "{prop: '', order: null }"
					:header-row-style="headerStyle"
					:header-cell-style="headerStyle"
					:row-style="rowStyle"
					align="center"
					v-loading="loading"
					:data="tableData120"
					@sort-change="getOrder"
					style="width: 100%;margin-top:20px;"
				>
					<el-table-column align="center" prop="ProcTime" label="提交时间" sortable="custom" width="185" height="59">
						<template slot-scope="scope">
							<div style="margin-left:15px">
								{{ $moment(scope.row.ProcTime).format('YYYY-MM-DD HH:mm:ss') }}
							</div>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="StockCode" label="证券代码" sortable="custom" width="110" height="59"></el-table-column>
					<el-table-column align="center" prop="StockName" label="证券名称" sortable="custom" width height="59"></el-table-column>
					<el-table-column align="center" prop="Qty" label="最大出借数量（股）" sortable="custom" width="175" height></el-table-column>
					<el-table-column align="center" prop="Term" label="出借期限（天）" width="145" sortable="custom" height>
						<template slot-scope="scope">
							<div>
								{{ scope.row.Term ? scope.row.Term : 0 }}
							</div>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="FeeRate" label="出借利率（%）" width="145" sortable="custom" height>
						<template slot-scope="scope">
							<div v-if="!scope.row.FeeRate">
								0
							</div>
							<div v-if="scope.row.FeeRate">
								{{ setarr(scope.$index) }}
							</div>
							<div v-else>
								{{ scope.row.FeeRate }}
							</div>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="Status" label="处理状态" sortable="custom" height>
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
					<el-table-column align="center" prop="Remark" label="处理备注" sortable="custom" height>
						<template slot-scope="scope">
							<div>
								{{ scope.row.Remark ? scope.row.Remark : '无' }}
							</div>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="UpdateTime" width="185" sortable="custom" label="处理时间" height>
						<template slot-scope="scope">
							<div style="margin-right:15px">
								{{ $moment(scope.row.UpdateTime).format('YYYY-MM-DD HH:mm:ss') }}
							</div>
						</template>
					</el-table-column>
				</el-table>
				<div class="bus_page j_c_a_i">
					<el-pagination
						:background="true"
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page="PageNum"
						:page-sizes="[10, 20, 30, 40, 50]"
						:page-size="PageSize"
						layout="total, sizes, prev, pager, next, jumper"
						:total="recordNum"
					></el-pagination>
				</div>
			</div>
		</div>
		<!-- </transition> -->
		<!-- 出借邀约 -->
		<!-- <transition name="fade"> -->
		<LendTion v-if="tabCurindex == 1" ref="lention" @openNotice="openNotice" @changeTitle="changeTitle"></LendTion>
		<!-- </transition> -->
		<!-- 出借市场行情 -->
		<!-- <transition name="fade"> -->
		<div v-if="tabCurindex == 2" class="bus_content f_d_a_i">
			<div class="bus_query">
				<div class="common_title j_c_a_i">
					<span></span>
					市场行情查询
				</div>
				<div class="bus_search">
					<span>证券代码/名称</span>
					<div class="bus_input">
                        <lazy-select ref="LazySelect" @change="lazyChange" :width="500" placeholder="证券代码/名称/简称"></lazy-select>
                    </div>
					<div class="bus_btn j_c_a_i" type="primary" @click="queryService128(1)">查询</div>
					<div class="bus_btn buswhite j_c_a_i" type="primary" @click="marketClear(128)">重置</div>
				</div>
			</div>
			<!-- 列表 -->
			<div class="bus_table bus_table3">
				<el-table
					ref="eltable"
					:default-sort = "{prop: '', order: null }"
					:header-row-style="headerStyle"
					:header-cell-style="headerStyle"
					:row-style="rowStyle"
					align="center"
					v-loading="loading"
					:data="tableData128"
					@sort-change="getOrder"
					style="width: 100%;"
				>
					<el-table-column align="center" prop="StockCode" sortable="custom" label="证券代码" width="110" height></el-table-column>
					<el-table-column align="center" prop="StockName" sortable="custom" label="证券名称" width height="59"></el-table-column>
					<el-table-column align="center" prop="LatestPrice" sortable="custom" label="现价（元）" width="120" height="59"></el-table-column>
					<el-table-column align="center" prop="PriceUpAndDown" sortable="custom" label="涨跌幅（%）" height>
						<template slot-scope="scope">
							<div v-if="scope.row.PriceUpAndDown * 1 == 0" style="color:#000000;">{{ scope.row.PriceUpAndDown }}%</div>
							<div v-else-if="scope.row.PriceUpAndDown * 1 > 0" style="color:#D6010F;">{{ scope.row.PriceUpAndDown }}%</div>
							<div v-else style="color:#35A45E;">{{ scope.row.PriceUpAndDown }}%</div>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="Scale" sortable="custom" label="需求数量（股）" height></el-table-column>
					<el-table-column align="center" prop="DemandScale" sortable="custom" label="需求市值（万元）" height>
						<template slot-scope="scope">
							<div>{{ (scope.row.DemandScale / 10000) }}</div>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="TermLimit" width="180" sortable="custom" label="需求期限（天）" height>
						<template slot-scope="scope">
							<div>{{ scope.row.TermLimit }}</div>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="FeeRate" sortable="custom" label="期望费率（%）" height>
						<template slot-scope="scope">
							<div>{{ util.Multiply(scope.row.FeeRate, 100) }}</div>
						</template>
                    </el-table-column>
				</el-table>
				<div class="bus_page j_c_a_i">
					<el-pagination
						:background="true"
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:page-sizes="[10, 20, 30, 40, 50]"
						:current-page="PageNum"
						:page-size="PageSize"
						layout="total, sizes, prev, pager, next, jumper"
						:total="recordNum"
					></el-pagination>
				</div>
			</div>
		</div>
		<!-- </transition> -->
		<!-- 通知模板设置 -->
		<transition name="fade">
			<div v-show="notice" class="index_intention newnnotice notice">
				<div class="intention_box">
					<!-- 关闭按钮 -->
					<img class="in_close" @click="noticeChange()" src="../../assets/index_close.png" alt />
					<!-- 标题 -->
					<div class="infor_title j_c_a_i">
						<div class="infor_line j_c_a_i">
							<span class="line"></span>
							<span class="round"></span>
						</div>
						<div class="infor_my">通知模板设置</div>
						<div class="infor_line j_c_a_i">
							<span class="round"></span>
							<span class="line line2"></span>
						</div>
					</div>
					<div class="export_box">
						<!-- 列表 -->
						<div class="bus_table">
							<div class="common_title j_c_a_i">
								<span></span>
								<!-- 出借意向记录列表 -->
								{{templateTitle}}
							</div>
							<el-table
								ref="eltable"
								:default-sort = "{prop: '', order: null }"
								:header-row-style="headerStyle"
								:header-cell-style="headerStyle"
								:row-style="rowStyle"
								align="center"
								:data="tableData124"
								v-loading="loading"
								row-key="FieldIndex"
								style="width: 100%;margin-top:20px;"
							>
								<el-table-column align="center" prop="date" label="字段名称" width height="59">
									<template slot-scope="scope">
										<div class="set_box">
											<span>{{ scope.row.FieldName }}</span>
										</div>
									</template>
								</el-table-column>
								<el-table-column align="center" prop="FieldRename" label="重命名" width="220" height="59">
									<template slot-scope="scope">
										<el-input size="small" v-model="scope.row.FieldRename" :disabled="scope.row.FieldName == '序号' ? true : false" placeholder="请输入"></el-input>
									</template>
								</el-table-column>
								<el-table-column align="center" prop="ShowFlag" label="是否显示" height>
									<template slot-scope="scope">
										<el-switch v-if="scope.row.FieldName == '序号'" style="height:31px;" value="0" active-value="1" :disabled="true" inactive-value="0" active-color="#C5181F" inactive-color="#E5E5E5"></el-switch>
										<el-switch v-else-if="scope.row.FieldName == '邀约时间'" style="height:31px;"  value="0" active-value="1" :disabled="true" inactive-value="0" active-color="#C5181F" inactive-color="#E5E5E5"></el-switch>
										<el-switch v-else-if="scope.row.FieldName == '状态'" style="height:31px;"  value="0" active-value="1" :disabled="true" inactive-value="0" active-color="#C5181F" inactive-color="#E5E5E5"></el-switch>
										<el-switch v-else style="height:31px;" v-model="scope.row.ShowFlag" active-value="1" :disabled="false" inactive-value="0" active-color="#C5181F" inactive-color="#E5E5E5"></el-switch>
									</template>
								</el-table-column>
								<el-table-column align="center" prop="FieldIndex" label="排序（可上下移动）" height>
									<template>
										<img class="drop" src="../../assets/icon_9.png" alt />
									</template>
								</el-table-column>
							</el-table>
						</div>
						<!-- 导出设置 -->
						<div class="export">
							<div class="common_title j_c_a_i">
								<span></span>
								导出文件设置
							</div>
							<!-- 单选 -->
							<div class="bu_radio">
								<div class="export_text">导出文件格式</div>
								<div>
									<el-radio fill="#ffffff" v-model="FileFormat" label="0">Excel</el-radio>
									<el-radio v-model="FileFormat" label="1">CSV</el-radio>
								</div>
							</div>
							<div class="in_btns j_c_a_i" @click="noticeChange(1)">提 交</div>
							<p style="height:1px"></p>
						</div>
					</div>
				</div>
			</div>
		</transition>
		<Footer msg="Welcome to Your Vue.js App" />
		<!-- 侧边导航 -->
		<SIdeNavigation @showLend="$refs.loanInterest.lendBox()"></SIdeNavigation>
		<!-- 出借意向单弹框 -->
		<loan-interest ref="loanInterest"></loan-interest>
	</div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Sortable from 'sortablejs';
import SIdeNavigation from '@/components/SIdeNavigation.vue';
import img from '@/assets/icon_1s.png';
import imgcur from '@/assets/icon_1.png';
import img2 from '@/assets/icon_img3.png';
import imgcur2 from '@/assets/icon_3s.png';
import img3 from '@/assets/icon_4.png';
import imgcur3 from '@/assets/icon_4s.png';
import LazySelect from '@/components/LazySelect.vue';
import { queryService128, queryService120, queryService124, queryService125 } from '@/api/index/index';
import LendTion from './components/lendtion.vue';
import LoanInterest from '../../components/LoanInterest.vue';
import util from "@/utils/util";

export default {
	name: 'business',
	props: {
		msg: String
	},
	data() {
		return {
            util: util,
			PageNum: 1, // 第一页
			PageSize: 10, // 十条
			recordNum: 10, // 总条数
			search: {
				StockCode: '', // 搜索代码
				StartTime: '', // 开始时间
				EndTime: '', // 结束时间
				Status: '' // 状态
			},
			loading: false,
			curtitle:'证券出借',
			body: null, // body元素
			radio: 1, // 弹框单选
			FileFormat: 1, // 文件导出格式
			textarea: '', // 内容
			rowStyle: {
				height: '57px'
			},
			headerStyle: {
				height: '59px',
				background: '#C5181F',
				color: '#ffffff'
			},
			notice: false, // 通知模板
			tabCurindex: 0, // 三大tab 切换index
			templateTitle:'出借意向记录列表', // 模板标题
			titleData: [
				{
					img: img,
					imgcur: imgcur,
					title: '我的出借意向',
					text: 'LENDING PLAN'
				},
				{
					img: img2,
					imgcur: imgcur2,
					title: '出借邀约',
					text: 'LENDING INVITATION'
				},
				{
					img: img3,
					imgcur: imgcur3,
					title: '出借市场行情',
					text: 'LENDING MARKET DATA'
				}
			], // 标题tab数据
			rules: {
				name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }, { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }],
				region: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
				date1: [{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }],
				date2: [{ type: 'date', required: true, message: '请选择时间', trigger: 'change' }],
				type: [{ type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }],
				resource: [{ required: true, message: '请选择活动资源', trigger: 'change' }],
				desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }]
			},
			tableData124: [], // 通知模板设置列表
			tableData128: [], // 出借市场行情
			tableData120: [], // 出借意向
			BusiCodeindex:0, // lendtion的BusiCode
			sorting:"", // 排序字段
			curTime:null, // 当前时间
		};
	},
	components: {
		Footer,
		Header,
		SIdeNavigation,
		LazySelect,
		LendTion,
		LoanInterest
	},
	computed:{
		// 处理费率
		setarr(){
			return (index) => {
				let newFee = '';
				this.tableData120[index].FeeRate.split('/').forEach((item,index) => {
					if(index == 0){
						newFee+=`${this.util.Multiply(item,100)}`;
					}else{
						newFee+=`/${this.util.Multiply(item,100)}`;
					}
				});
				return newFee
			}
		}
	},
	created() {
		// 获取当前时间用于时间选择
		this.curTime = new Date();
		// 设置 tabCurindex
		if (this.$route.query.index == 2) {
			this.tabCurindex = this.$route.query.index;
        	this.queryService128();
		}else{
        	this.queryService120();
		}

		// 出借市场行情列表
		// this.queryService128();
        // 出借意向列表
        // this.queryService120();
	},
	methods: {
		// 时间选择
		pickerChange(data,type){
			if(this.search.EndTime && this.search.StartTime){
				let message;
				if(type == 0){
					if(this.search.EndTime < this.search.StartTime){
						message = '开始时间不能大于结束时间';
						this.search.StartTime = '';
					}
				}else{
					if(this.search.EndTime < this.search.StartTime){
						message = '结束时间不能小于开始时间';
						this.search.EndTime = '';
					}
				};
				if(message){
					this.$message({
						message,
						type: 'error'
					});
				}
			}
		},
		// 排序
		getOrder(column){
			if(column.order == 'descending'){
				this.sorting = `${column.prop} desc`;
			}else if(column.order == null){
				this.sorting = '';
			}else{
				this.sorting = `${column.prop}`;
			}
			if(this.tabCurindex == 0){
				this.queryService120();
			}else{
				this.queryService128();
			}
		},
		// 修改标题
		changeTitle(e){
			this.curtitle = e.title;
		},
		// 打开通知模板设置
		openNotice(index,title){
			this.BusiCodeindex = index;
			this.notice = !this.notice;
			this.changeBody(this.notice);
			this.queryService124(index);
			this.templateTitle = title.title;
		},
		// 获取通知模板列表
		queryService124(index){
			this.loading = true;
			queryService124({
				PBAccount: this.$store.state.token,
				BusiCode: index,
			}).then(res=>{
				this.loading = false;
				this.tableData124 = res.data[0].List;
				// 设置默认展示文件类型
				this.FileFormat = res.data[0].FileFormat;
				// 拖拽初始化
				this.rowDrop();
				this.columnDrop();
			}).catch(err=>{
				this.loading = false;
                this.$message({
                    message:err.errorMsg || err.errorMessage,
                    type: 'error'
                })
            })
		},
		// 设置通知模板
		queryService125(index){
			queryService125({
				PBAccount: this.$store.state.token,
				json_List: JSON.stringify(this.tableData124),
				FileFormat:this.FileFormat,
				BusiCode : index,
			}).then(res=>{
				this.$message.success("设置成功");
				this.notice = !this.notice;
				this.changeBody(this.notice);
				this.$refs.lention.queryService122(1);
				// 更新数据列表
			}).catch(err=>{
				this.loading = false;
                this.$message({
                    message:err.errorMsg || err.errorMessage,
                    type: 'error'
                })
            })
		},
		// 出借邀约组件选择数据
		lazyChange(data) {
			this.search.StockCode = data.region;
		},
		// tab change
		navChange(index) {
			this.sorting = ''; // 清理
			this.$refs.eltable && this.$refs.eltable.clearSort();
			this.marketClear();
			this.tabCurindex = index;
			this.PageNum = 1;
			this.PageSize = 10;
			if (this.tabCurindex == 2) {
				// 出借市场行情列表
				this.queryService128();
			} else if (this.tabCurindex == 0) {
				// 我的出借意向
                this.queryService120();
			} else if (this.tabCurindex == 1) {
				// 出借邀约
				this.curtitle = '证券出借';
			}
		},
		handleSizeChange(val) {
			this.PageNum = 1; // 页数变1
			this.PageSize = val; 
			if(this.tabCurindex == 0){
				this.queryService120();
			}else if(this.tabCurindex == 2){
				this.queryService128();
			}
		},
		handleCurrentChange(val) {
			this.PageNum = val;
			if(this.tabCurindex == 0){
				this.queryService120();
			}else if(this.tabCurindex == 2){
				this.queryService128();
			}
		},
		// 出借意向列表
		queryService120(page){
			this.tableData120 = [];
            this.loading = true;
			let PageNum = page ? page : this.PageNum;
			let data = {
				PageSize: this.PageSize,
				PageNum,
			};
			// 是否有搜索
			if(this.search.StockCode){
				data.StockCode = this.search.StockCode;
			};
			let EndTime;
			let StartTime;
			if(this.search.EndTime && this.search.StartTime){
				EndTime = this.$moment(this.search.EndTime).format('YYYY-MM-DD HH:mm:ss');
				StartTime = this.$moment(this.search.StartTime).format('YYYY-MM-DD HH:mm:ss');
				data.StartTime = StartTime;
				data.EndTime = EndTime;
			};			
			// 是否有排序
			if(this.sorting){
				data.OrderStr = this.sorting// 排序字段
			}else{
				data.OrderStr = ''; // 排序字段
			}
			queryService120({
				...data,
			}).then(res => {
                this.loading = false;
				const { data, recordNum } = res;
				this.tableData120 = data;
				this.recordNum = recordNum; // 总条数
			}).catch(err=>{
				console.log(err);
				this.loading = false;
                this.$message({
                    message:err.errorMsg || err.errorMessage,
                    type: 'error'
                })
            })
        },
		// 出借行情列表
		queryService128(page) {
			this.tableData128 = [];
            this.loading = true;
			let PageNum = page ? page : this.PageNum;
			let data = {
				PageSize: this.PageSize,
				PageNum,
			};
			// 是否有搜索
			if(this.search.StockCode){
				data.StockCode = this.search.StockCode;
			};
			// 是否有排序
			if(this.sorting){
				data.OrderStr = this.sorting// 排序字段
			}else{
				data.OrderStr = ''; // 排序字段
			}
			queryService128({
				...data
			}).then(res => {
                this.loading = false;
				const { data, recordNum } = res;
				this.tableData128 = data;
				this.recordNum = recordNum; // 总条数
			}).catch(err=>{
				this.loading = false;
                this.$message({
                    message:err.errorMsg || err.errorMessage,
                    type: 'error'
                })
            })
		},
		// 通知模板change
		noticeChange(index) {
			if (index) {
				this.tableData124.forEach((item,index) => {
					item.FieldIndex = index+1;
				});
				this.queryService125(this.BusiCodeindex);
			} else {
				this.notice = !this.notice;
				this.changeBody(this.notice);
			}
		},
		// 出借市场重置
		marketClear(index) {
            this.search = {
                StockCode: '', // 搜索代码
				StartTime: '', // 开始时间
				EndTime: '', // 结束时间
				Status: '' // 状态
            };
            this.$refs.LazySelect && this.$refs.LazySelect.clearRegion();
			if(index == 128){
            	this.queryService128(1);
			}else if(index == 120){
            	this.queryService120(1);
			}
		},
		// 设置页面是否滚动
		changeBody(switchoff) {
			if (!switchoff) {
				this.body.style.overflow = 'auto';
			} else {
				this.body.style.overflow = 'hidden';
			}
		},
		//行拖拽
		rowDrop() {
			const tbody = document.querySelector('.newnnotice .el-table__body-wrapper tbody');
			if (!tbody) {
				return;
			}
			const _this = this;
			Sortable.create(tbody, {
				onEnd({ newIndex, oldIndex }) {
					const currRow = _this.tableData124.splice(oldIndex, 1)[0];
					_this.tableData124.splice(newIndex, 0, currRow);
				}
			});
		},
		//列拖拽
		columnDrop() {
			const wrapperTr = document.querySelector('.newnnotice .el-table__header-wrapper tr');
			if (!wrapperTr) {
				return;
			}
			this.sortable = Sortable.create(wrapperTr, {
				animation: 180,
				delay: 0,
				onEnd: evt => {
					const oldItem = this.tableData124[evt.oldIndex];
					this.tableData124.splice(evt.oldIndex, 1);
					this.tableData124.splice(evt.newIndex, 0, oldItem);
				}
			});
		},
	},
	mounted() {
		let body = document.querySelector('body');
		this.body = body;
		this.$nextTick(() => {
			this.rowDrop();
			this.columnDrop();
		});
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.set_box{
	width: 100%;
	& span{
		display: block;
		text-align: left;
		margin: 0 auto;
		width: 100px;
	}
}
.mingive{
	position: absolute;
	display: flex;
	align-items: center;
    color: #c5181f;
    font-size: 14px;
    font-weight: 600;
	justify-content: center;
    cursor: pointer;
	right: 30px;
	top: -18px;
	width: 94px;
    height: 32px;
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid #c5181f;
}
.mandatory_img {
	width: 10px;
	height: 10px;
	margin-right: 5px;
	margin-top: -2px;
}
.business_box {
	width: 100%;
	background: #f8f9fc;

	.bus_header {
		position: relative;
		width: 100%;
		overflow: hidden;
		padding: 0 0 65px 0;

		.bus_bjimg {
			width: 100%;
			height: 400px;
            object-fit: cover;
		}

		.bus_card {
			position: relative;
			bottom: 65px;
			// position: absolute;
			// bottom: 0;
			max-width: 1440px;
            padding: 0 20px;
            box-sizing: border-box;
            width: inherit;
			height: 130px;
			justify-content: space-between;

			.card_item {
				cursor: pointer;
				padding: 0 50px;
                margin: 0;
				width: 32.28%;
                box-sizing: border-box;
				height: 130px;
				justify-content: flex-start;
				box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
				background-position: center;
				// background-size: 107%;
				background-repeat: no-repeat;
				border-radius: 10px;
				background-image: url('../../assets/bj_img2.png');

				& img {
					width: 70px;
					height: 70px;
					margin-right: 20px;
				}

				.card_right {
					color: #1c1d1c;

					& .p1 {
						font-weight: 600;
						color: #1c1d1c;
						font-size: 20px;
					}

					& .p2 {
						font-weight: 600;
						font-size: 20px;
						color: rgba(204, 204, 204, 0.5);
					}
				}
			}

			.curred {
				background-image: url('../../assets/bj_img1.png');
				& .p1 {
					color: #ffffff !important;
				}

				& .p2 {
					color: rgba(255, 255, 255, 0.5) !important;
				}
			}
		}
	}
}

.infor_title {
	max-width: 1400px;
	margin: -50px 0 20px 0;

	.infor_line {
		width: 60px;
		height: 2px;

		.line {
			display: block;
			width: 60px;
			height: 2px;
			background: linear-gradient(270deg, #c5181f 0%, rgba(197, 24, 31, 0) 100%);
		}

		.line2 {
			background: linear-gradient(55deg, #c5181f 0%, rgba(197, 24, 31, 0) 100%);
		}

		.round {
			display: block;
			width: 6px;
			height: 6px;
			background: #c5181f;
			border-radius: 50%;
		}
	}

	.infor_my {
		font-size: 36px;
		color: #1c1d1c;
		margin: 0 20px;
		font-weight: bold;
	}
}

.bu_radio {
	width: 100%;
	display: flex;
	justify-content: center;
	margin-top: 8px;
	margin-bottom: 30px;
}

.text_box {
	position: relative;

	.text_number {
		position: absolute;
		top: 108px;
		right: 70px;
		font-size: 14px;
		color: #cccccc;
	}
}

.textares {
	width: 600px;
	height: 120px;
	background: #ffffff;
	border-radius: 4px;
}

.in_line {
	width: 660px;
	border-top: 2px solid #e8e8e8;
	margin: 0 auto;
}
.in_btn {
	font-size: 18px;
	color: #ffffff;
	font-weight: 600;
	width: 150px;
	height: 54px;
	background: #c5181f;
	border-radius: 5px;
	margin: 0 auto;
	cursor: pointer;
	margin-top: 28px;
}

.bus_content {
	max-width: 1440px;
    padding: 0 20px;
    width: inherit;
    box-sizing: border-box;
	.bus_query {
		height: 136px;
		background: #ffffff;
		padding: 30px;
        width: 100%;
        min-width: 1240px;
        box-sizing: border-box;

		.bus_search {
			margin-top: 20px;
			display: flex;
			justify-content: flex-start;
			align-items: center;

			& .spans_1 {
				font-weight: 600;
				font-size: 14px;
				color: #333333;
				margin-right: 15px;
				margin-left: 40px;
				display: flex;
				white-space: nowrap;
				// overflow: hidden;
				text-overflow: ellipsis;
			}

			.bus_input {
				width: 516px;
				height: 36px;
				background: #ffffff;
				border-radius: 4px;
				justify-content: flex-start;
				// border: 1px solid #e8e8e8;

				& input {
					height: 36px;
				}

				.el-select {
					height: 36px;
				}

				.cross {
					width: 13px;
					height: 14px;
					font-size: 14px;
					font-family: SourceHanSansCN-Medium, SourceHanSansCN;
					font-weight: 600;
					color: #999999;
					margin: 0 5px;
				}
			}

			.bus_time {
				width: auto;
			}

			.bus_btn {
				width: 80px;
				height: 36px;
				background: #c5181f;
				font-size: 14px;
				color: #ffffff;
				border-radius: 6px;
				margin-left: 30px;
				cursor: pointer;
			}

			.buswhite {
				background: #ffffff;
				border: 1px solid #cb3238;
				color: #c5181f;
				margin-left: 10px;
			}
		}
	}

	.bus_table {
		max-width: 1440px;
        min-width: 1280px;
        width: inherit;
        box-sizing: border-box;
		background: #ffffff;
		margin-top: 20px;
		padding: 30px 0;
		// padding: 0 30px;

		.common_title {
			width: 100%;
            box-sizing: border-box;
			padding: 0 30px;
		}

		.bus_page {
			width: 100%;
			padding: 40px 0;
		}
	}

	.bus_table3 {
		padding: 0 0 30px 0;
	}
}

.common_title {
	position: relative;
	width: 100%;
	justify-content: flex-start;
	color: #333333;
	font-size: 20px;
	font-weight: 600;

	& > span {
		width: 5px;
		height: 20px;
		background: #c5181f;
		border-radius: 3px;
		margin-right: 15px;
	}

	& p {
		position: relative;
		right: 0;
		position: absolute;
		font-size: 14px;
		color: #333333;
		font-weight: 400;
		& .span_1 {
			font-weight: 600;
		}

		& .span_2 {
			font-size: 14px;
			color: #666666;
		}

		& > img {
			width: 16px;
			height: 16px;
		}
	}
}

.index_intention {
	position: fixed;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.6);
	z-index: 9;

	.intention_box {
		position: absolute;
		width: 700px;
		height: 320px;
		background: #ffffff;
		top: -200px;
		right: 0;
		left: 0;
		bottom: 0;
		margin: auto;
		padding-top: 0.1px;
		display: flex;
		flex-direction: column;

		.in_close {
			cursor: pointer;
			position: absolute;
			top: 0;
			right: 0;
			width: 30px;
			height: 30px;
			margin: 30px;
		}

		.infor_title {
			width: 100%;
			margin-top: 60px;
			margin-bottom: 30px;
		}
	}

	.newin_320 {
		height: 320px;
	}
	.newin_440 {
		height: 440px;
	}
}

// 通知模板设置
.notice {
	.intention_box {
		max-width: 960px;
		max-height: 900px;
		width: 80%;
		height: 80%;
		top: 0;
		background: #f8f9fc;
		display: flex;
		flex-direction: column;
		align-items: center;

		.bus_table {
			width: 900px;
			height: auto;
			background: #ffffff;

			.common_title {
				padding: 0 2.5%;
				width: 95%;
				padding-top: 30px;
			}
		}
	}
	.drop {
		width: 26px;
		height: 26px;
	}

	.export {
		width: 900px;
		height: 120px;
		background: #ffffff;
		margin-top: 20px;
		padding: 1px 0;

		.common_title {
			width: 95%;
			padding: 30px 2.5% 12px 2.5%;
		}
	}

	.export_box {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 750px;
		overflow: auto;

		.bu_radio {
			width: 95%;
			padding: 0 2.5%;
			justify-content: flex-start;
		}

		.export_text {
			margin-right: 36px;
		}

		.in_btns {
			width: 150px;
			height: 54px;
			background: #c5181f;
			border-radius: 5px;
			font-size: 18px;
			color: #ffffff;
			margin: 0 auto;
			margin-top: 45px;
			margin-bottom: 40px;
			cursor: pointer;
		}
	}
}

</style>
<style scoped >
    @media screen and (max-width:1400px) {
        .bus_content .bus_query .bus_search .bus_input{
            width: 400px !important;
        }
        /deep/ .bus_content .bus_query .bus_search .el-select{
            width: 400px !important;
        }
    }
    @media screen and (max-width:1300px) {
        .bus_content .bus_query .bus_search .bus_input{
            width: 380px !important;
        }
        /deep/ .bus_content .bus_query .bus_search .el-select{
            width: 380px !important;
        }
    }
</style>
<style lang="scss">
.bus_input {
	width: 536px;

	& input {
		height: 34px;
	}

	.el-select {
		width: 536px;
		height: 34px;
	}
}

.textares {
	& .el-textarea__inner {
		outline-style: none;
		padding-bottom: 20px;
	}
}

.invitation_right {
	.bus_input {
		.el-select {
			width: 510px;
		}
	}
}

.SMS {
	.el-radio__input {
		width: 25px;
		height: 25px;
	}

	.el-radio__inner {
		width: 25px;
		height: 25px;
	}
}

.no_input {
	input {
		width: 300px;
	}
}

.bus_time {
	.el-input__icon {
		line-height: 35px;
	}
}
</style>
