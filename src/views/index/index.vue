<template>
	<div class="index f_d_a_i">
		<Header msg="Welcome to Your Vue.js App" />
		<!-- 头部 -->
		<div class="index_header_box" @mouseenter="mouseSuspension(true)" @mouseleave="mouseSuspension(false)">
			<div v-if="swiperIndex == 0" class="index_header f_d_a_i">
				<div class="index_banner"><img src="@/assets/index_img1.png" alt /></div>
				<div class="index_content f_d_a_i">
					<p class="title_1">证券出借业务</p>
					<p class="title_2">让闲置证券像闲置资金一样，通过证券出借生息，</p>
					<p class="title_2">实现存量股票资产的盘活与低风险增值。</p>
					<p class="title_3">为什么选择中信证券</p>
					<div class="index_list">
						<div class="j_c_a_i">
							<span class="index_round"></span>
							券商行业龙头地位
						</div>
						<div class="j_c_a_i">
							<span class="index_round"></span>
							券源丰富且优质
						</div>
						<div class="j_c_a_i">
							<span class="index_round"></span>
							系统强大
						</div>
					</div>
					<div class="index_list">
						<div class="j_c_a_i">
							<span class="index_round"></span>
							提供全方位优质服务
						</div>
						<div class="j_c_a_i">
							<span class="index_round"></span>
							风险管理能力强
						</div>
						<div class="j_c_a_i">
							<span class="index_round"></span>
							业务经验成熟
						</div>
					</div>
					<div class="index_btn">
						<div class="index_lend j_c_a_i" @click="$refs.loanInterest.lendBox()">我要出借</div>
						<div class="index_service j_c_a_i" @click="openServer">联系客服</div>
					</div>
				</div>
				<div @click="swiperIndexChange(0)" :class="[swiperIndex == 0 ? 'index_curr' : '','index_right','f_d_a_i','index_white']">
					<p>证券出借业务</p>
					<p>Securities Lending</p>
				</div>
                <!-- v-if="token && fundAccount ? showcoupon == 1 ? true : false : false" -->
				<div @click="swiperIndexChange(1)"  :class="[swiperIndex == 1 ? 'index_curr' : '','index_right','f_d_a_i','index_red']">
					<p>约定融券服务</p>
					<p>Securities Borrowing</p>
				</div>
			</div>
			<!-- 融券 -->
            <!-- v-else-if="swiperIndex == 1 && token && fundAccount ? showcoupon == 1 ? true : false : false" -->
			<div v-else-if="swiperIndex == 1" class="index_header f_d_a_i">
				<div class="index_banner"><img src="@/assets/index_img11.png" alt /></div>
				<div class="index_content f_d_a_i" style="top:200px">
					<p class="title_1">约定融券服务</p>
					<p class="title_2">中信证券根据与投资者约定的证券、数量、期限、费</p>
					<p class="title_2">率等交易要素，专门为投资者保留相应的证券供投资</p>
					<p class="title_2">者借入使用，并向投资者收取一定费用。</p>
					<p class="title_3">为什么选择中信证券</p>
					<div class="index_list">
						<div class="j_c_a_i">
							<span class="index_round"></span>
							券商行业龙头地位
						</div>
						<div class="j_c_a_i">
							<span class="index_round"></span>
							券源丰富且优质
						</div>
						<div class="j_c_a_i">
							<span class="index_round"></span>
							系统强大
						</div>
					</div>
					<div class="index_list">
						<div class="j_c_a_i">
							<span class="index_round"></span>
							提供全方位优质服务
						</div>
						<div class="j_c_a_i">
							<span class="index_round"></span>
							风险管理能力强
						</div>
						<div class="j_c_a_i">
							<span class="index_round"></span>
							业务经验成熟
						</div>
					</div>
				</div>
				<div @click="swiperIndexChange(0)" :class="[swiperIndex == 0 ? 'index_curr' : '','index_right','f_d_a_i','index_white']">
					<p>证券出借业务</p>
					<p>Securities Lending</p>
				</div>
				<div @click="swiperIndexChange(1)" :class="[swiperIndex == 1 ? 'index_curr' : '','index_right','f_d_a_i','index_red']">
					<p>约定融券服务</p>
					<p>Securities Borrowing</p>
				</div>
			</div>
		</div>
		<!-- 内容 -->
		<div class="infor_title j_c_a_i">
			<div class="infor_line j_c_a_i">
				<span class="line"></span>
				<span class="round"></span>
			</div>
			<div class="infor_my">证券出借业务</div>
			<div class="infor_line j_c_a_i">
				<span class="round"></span>
				<span class="line line2"></span>
			</div>
		</div>
		<p class="index_text">机构客户将证券以一定的费率向借入人（中国证券金融股份有限公司）出借，借入人按期归还所借证券、支付借券费用及相应权益补偿的业务。</p>
		<div class="index_table j_c_a_i">
			<div class="table_left">
				<div class="common_title j_c_a_i">
					<span></span>
					标的证券
				</div>
				<div class="table_p1 j_c_a_i">中国证券金融股份有限公司公布的转融通标的证券信息</div>
				<div class="common_title j_c_a_i">
					<span></span>
					交易要素
					<p>
						<span class="span_1">出借交易时间：</span>
						<span>沪市：9 : 30 - 11 : 30；11 : 30 - 15 : 00</span> <span style="margin-left:30px">深市：9 : 15 - 11 : 30；11 : 30 - 15 : 00</span>
					</p>
				</div>
				<div class="table_box j_c_a_i">
					<div class="box_left">
						<div class="box_title j_c_a_i">主板</div>
						<div class="box_text">
							<p class="box_p1">约定申报</p>
							<p class="box_p2">出借期限及费率（年化）：</p>
							<div class="box_list j_c_a_i">
								<div class="box_red j_c_a_i">固定 期限</div>
								<div class="box_pink j_c_a_i">
									<div class="box_item f_d_a_i">
										<span class="span1">1.5%</span>
										<span class="span2">3天</span>
									</div>
									<div class="box_item f_d_a_i">
										<span class="span1">1.6%</span>
										<span class="span2">7天</span>
									</div>
									<div class="box_item f_d_a_i">
										<span class="span1">1.7%</span>
										<span class="span2">14天</span>
									</div>
									<div class="box_item f_d_a_i">
										<span class="span1">1.8%</span>
										<span class="span2">28天</span>
									</div>
									<div class="box_item f_d_a_i">
										<span class="span1">2.0%</span>
										<span class="span2">182天</span>
									</div>
								</div>
							</div>
							<p class="box_p2">
								单笔最小申报数量：
								<span>10000股</span>
							</p>
							<p class="box_p2">
								展期与提前了结：
								<span>可展期（同原期限），不可提前了结</span>
							</p>
						</div>
						<div class="index_line1"></div>
						<div class="box_text">
							<p class="box_p1">非约定申报</p>
							<p class="box_p2">出借期限及费率（年化）：</p>
							<div class="box_list j_c_a_i">
								<div class="box_red j_c_a_i">固定 期限</div>
								<div class="box_pink j_c_a_i">
									<div class="box_item f_d_a_i">
										<span class="span1">1.5%</span>
										<span class="span2">3天</span>
									</div>
									<div class="box_item f_d_a_i">
										<span class="span1">1.6%</span>
										<span class="span2">7天</span>
									</div>
									<div class="box_item f_d_a_i">
										<span class="span1">1.7%</span>
										<span class="span2">14天</span>
									</div>
									<div class="box_item f_d_a_i">
										<span class="span1">1.8%</span>
										<span class="span2">28天</span>
									</div>
									<div class="box_item f_d_a_i">
										<span class="span1">2.0%</span>
										<span class="span2">182天</span>
									</div>
								</div>
							</div>
							<p class="box_p2">
								单笔最小申报数量：
								<span>10000股</span>
							</p>
							<p class="box_p2">
								展期与提前了结：
								<span>可展期（同原期限），不可提前了结</span>
							</p>
						</div>
					</div>
					<div class="box_left boxleft">
						<div class="box_title j_c_a_i">科创板、创业版</div>
						<div class="box_text">
							<p class="box_p1">约定申报</p>
							<p class="box_p2">出借期限及费率（年化）：</p>
							<div class="box_list j_c_a_i">
								<div class="box_red j_c_a_i">灵活 定价</div>
								<div class="box_pink j_c_a_i">
									<p class="last_index">1-182天灵活期限，协商灵活定价</p>
								</div>
							</div>
							<p class="box_p2">
								单笔最小申报数量：
								<span>1000股</span>
							</p>
							<p class="box_p2">
								展期与提前了结：
								<span>可展期（同原期限），可提前了结</span>
							</p>
						</div>
						<div class="index_line1"></div>
						<div class="box_text">
							<p class="box_p1">非约定申报</p>
							<p class="box_p2">出借期限及费率（年化）：</p>
							<div class="box_list j_c_a_i">
								<div class="box_red j_c_a_i">固定 期限</div>
								<div class="box_pink j_c_a_i">
									<div class="box_item f_d_a_i">
										<span class="span1">1.5%</span>
										<span class="span2">3天</span>
									</div>
									<div class="box_item f_d_a_i">
										<span class="span1">1.6%</span>
										<span class="span2">7天</span>
									</div>
									<div class="box_item f_d_a_i">
										<span class="span1">1.7%</span>
										<span class="span2">14天</span>
									</div>
									<div class="box_item f_d_a_i">
										<span class="span1">1.8%</span>
										<span class="span2">28天</span>
									</div>
									<div class="box_item f_d_a_i">
										<span class="span1">2.0%</span>
										<span class="span2">182天</span>
									</div>
								</div>
							</div>
							<p class="box_p2">
								单笔最小申报数量：
								<span>1000股</span>
							</p>
							<p class="box_p2">
								展期与提前了结：
								<span>可展期（同原期限），可提前了结</span>
							</p>
						</div>
					</div>
				</div>
			</div>
			<div class="table_right">
				<div class="common_title j_c_a_i">
					<span></span>
					市场行情
					<p class="j_c_a_i curpo" @click="gotoBusiness(2)">
						<span class="span_2">查看更多</span>
						<img src="@/assets/index_more.png" alt />
					</p>
				</div>
				<el-table
					:header-row-style="headerStyle"
					:header-cell-style="headerStyle"
					:row-style="rowStyle"
					align="center"
					height="647"
					:data="tableData128"
					style="width: 100%; margin-top: 20px"
					class="curpo"
					v-loading="loading"
					@row-click="rowClick"
				>
					<el-table-column align="center" prop="StockCode" label="证券代码" width="100" height="59"></el-table-column>
					<el-table-column align="center" prop="StockName" label="证券名称" width height="59"></el-table-column>
					<el-table-column align="center" prop="DemandScale" label="需求规模（万元）" width="85" height="59">
						<template slot-scope="scope">
							<div>{{ (scope.row.DemandScale / 10000).toFixed(2) }}</div>
						</template>
					</el-table-column>
					<!-- <el-table-column align="center" prop="address2" label="涨跌幅" style="color:red;" height :cell-style="cellStyle">
						<template slot-scope="scope">
							<div v-if="scope.row.address2 * 1 > 0" style="color:#D6010F;">{{ scope.row.address2 }}%</div>
							<div v-else style="color:#35A45E;">{{ scope.row.address2 }}%</div>
						</template>
					</el-table-column> -->
					<el-table-column align="center" prop="TermLimit" label="需求期限（天）" width="85" height></el-table-column>
					<el-table-column align="center" prop="FeeRate" label="出借费率" height>
						<template slot-scope="scope">
							<div>{{ util.Multiply(scope.row.FeeRate,100) }}%</div>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<!-- 流程 -->
		<div class="index_process">
			<div class="common_title j_c_a_i">
				<span></span>
				参与流程
			</div>
			<div class="index_process_content index_p_c_b j_c_a_i">
				<div class="process_img f_d_a_i">
					<img src="@/assets/process_1.png" alt />
					<p>投资者教育、风险揭示与评估</p>
				</div>
				<img class="arrow" src="@/assets/arrow_img1.png" alt />
				<div class="process_img f_d_a_i">
					<img src="@/assets/data_img1.png" alt />
					<p>提交申请材料</p>
				</div>
				<img class="arrow" src="@/assets/arrow_img1.png" alt />
				<div class="process_img f_d_a_i">
					<img src="@/assets/agreement_img1.png" alt />
					<p>签署协议出借权限开通</p>
				</div>
				<img class="arrow" src="@/assets/arrow_img1.png" alt />
				<div class="process_img f_d_a_i">
					<img src="@/assets/moneny_img1.png" alt />
					<p>出借交易</p>
				</div>
			</div>
		</div>
		<!-- 内容2 -->
		<div class="index_table2 f_d_a_i">
			<div class="infor_title j_c_a_i">
				<div class="infor_line j_c_a_i">
					<span class="line"></span>
					<span class="round"></span>
				</div>
				<div class="infor_my">约定融券服务</div>
				<div class="infor_line j_c_a_i">
					<span class="round"></span>
					<span class="line line2"></span>
				</div>
			</div>
			<p class="index_text">中信证券根据与投资者约定的证券、数量、期限、费率等交易要素，专门为投资者保留相应的证券供投资者借入使用，并向投资者收取一定费用。</p>
			<div class="index_table j_c_a_i">
				<div class="table_left">
					<div class="common_title j_c_a_i">
						<span></span>
						为什么选择中信证券
					</div>
					<!-- <div class="table_p1 j_c_a_i">中国证券金融股份有限公司公布的转融通标的证券信息</div> -->
					<!-- <div class="common_title j_c_a_i">
                        <span></span>
                        交易要素
                        <p>
                            <span class="span_1">出借交易时间：</span>沪市：9 : 30 - 11 : 30；9 : 30 - 11 : 30；深市：9 : 15 - 11 : 30；9 : 15 - 11 : 30；
                        </p>
                    </div>-->
					<div class="table_box j_c_a_i table_box2">
						<div class="securities f_d_a_i">
							<img src="@/assets/se_img1.png" alt class="se_img" />
							<p class="se_p1">业务规模大</p>
							<p class="se_p2">业务经验丰富、模式成熟</p>
						</div>
						<div class="securities f_d_a_i othercolor">
							<img src="@/assets/resources_img.png" alt class="se_img" />
							<p class="se_p1">券源丰富</p>
							<p class="se_p2">券源丰富，能满足多策略需求</p>
						</div>
						<div class="securities f_d_a_i othercolor">
							<img src="@/assets/function_img1.png" alt class="se_img" />
							<p class="se_p1">功能强大</p>
							<p class="se_p2">交易系统功能强大，界面友好</p>
						</div>
						<div class="securities f_d_a_i">
							<img src="@/assets/support_img.png" alt class="se_img" />
							<p class="se_p1">全面支持</p>
							<p class="se_p2">专业的支持团队</p>
						</div>
					</div>
					<div class="index_process">
						<div class="common_title j_c_a_i">
							<span></span>
							参与流程
						</div>
						<div class="index_process_content j_c_a_i">
							<div class="process_img f_d_a_i">
								<img src="@/assets/account_img.png" alt />
								<p>开立融资融券账户</p>
							</div>
							<img class="arrow" src="@/assets/arrow_img1.png" alt />
							<div class="process_img f_d_a_i">
								<img src="@/assets/updata_img.png" alt />
								<p>约定融券尽调及材料签署</p>
							</div>
							<img class="arrow" src="@/assets/arrow_img1.png" alt />
							<div class="process_img f_d_a_i">
								<img src="@/assets/trading_img.png" alt />
								<p>开展约定融券交易</p>
							</div>
						</div>
					</div>
				</div>
				<div class="table_right">
					<div class="common_title j_c_a_i">
						<span></span>
						市场行情
					</div>
					<el-table
						:header-row-style="headerStyle"
						:header-cell-style="headerStyle"
						:row-style="rowStyle"
						align="center"
						height="647"
						:data="tableData129"
						v-loading="loading"
						style="width: 100%; margin-top: 20px"
						class="curpo"
					>
						<el-table-column align="center" prop="StockCode" label="证券代码" width="92" height="59"></el-table-column>
						<el-table-column align="center" prop="StockName" label="证券名称" width height="59"></el-table-column>
						<el-table-column align="center" prop="SourceScale" label="券源规模（万元）" width="85" height="59">
							<template slot-scope="scope">
								<div>{{ (scope.row.SourceScale / 10000).toFixed(2) }}</div>
							</template>
						</el-table-column>
						<!-- <el-table-column align="center" prop="address2" label="涨跌幅" style="color:red;" height :cell-style="cellStyle">
							<template slot-scope="scope">
								<div v-if="scope.row.address2 * 1 > 0" style="color:#D6010F;">{{ scope.row.address2 }}%</div>
								<div v-else style="color:#35A45E;">{{ scope.row.address2 }}%</div>
							</template>
						</el-table-column> -->
						<el-table-column align="center" prop="Term" label="期限（天）" width="90" height></el-table-column>
						<el-table-column align="center" prop="FeeRate" label="费率" width="65" height>
							<template slot-scope="scope">
								<div>{{ (scope.row.FeeRate * 100).toFixed(0) }}%</div>
							</template>
						</el-table-column>
						<el-table-column show-overflow-tooltip align="center" prop="Remark" label="备注" min-width="50" height></el-table-column>
					</el-table>
				</div>
			</div>
		</div>
		<!-- 内容 -->
		<div class="infor_title j_c_a_i">
			<div class="infor_line j_c_a_i">
				<span class="line"></span>
				<span class="round"></span>
			</div>
			<div class="infor_my">风险揭示</div>
			<div class="infor_line j_c_a_i">
				<span class="round"></span>
				<span class="line line2"></span>
			</div>
		</div>
		<div class="index_prompt">
			<div style="margin-top:0;">
				<span>1</span>
				<p>
					为保证服务质量、控制投资风险，投资者参与上述业务应首先联系客户经理，完成投资者适当性匹配，并充分了解业务的性质、特点、使用的注意事项以及不当使用可能会带来的风险或损失。
				</p>
			</div>
			<div>
				<span>2</span>
				<p>
					投资者自愿参与上述业务，须在参与前详细阅读交易相关的各项材料，包括但不限于协议、风险揭示书以及其他必要的业务资料，充分了解并知悉交易的各项风险，包括但不限于交易风险、结算风险、法律风险、合规风险以及不可抗力等其他风险，并在必要时就上述风险寻求专业咨询。
				</p>
			</div>
			<div>
				<span>3</span>
				<p>网页资讯内容仅提供给投资者作参考之用，不构成对投资者的任何投资建议，投资者不应当以该资讯取代其独立判断或仅依据该资讯做出投资决策。股市有风险，投资需谨慎。</p>
			</div>
			<div>
				<span>4</span>
				<p>出借借入行情内容，基于我公司客户情况汇总，将随市场情况变化，仅供参考，不构成我公司对客户任何报价或成交义务。</p>
			</div>
		</div>
		<Footer msg="Welcome to Your Vue.js App" />
		<!-- 侧边导航 -->
		<SIdeNavigation @showLend="$refs.loanInterest.lendBox()" :isIndex="false"></SIdeNavigation>
		<!-- 出借意向单弹框 -->
		<loan-interest ref="loanInterest"></loan-interest>
	</div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import SIdeNavigation from '@/components/SIdeNavigation.vue';
import { queryService128no, queryService129no } from '@/api/index/index';
import LoanInterest from '../../components/LoanInterest.vue';
import { mapState } from "vuex"
import util from "@/utils/util";

export default {
	name: 'index',
	data() {
		return {
			util:util, // 处理费率
			target_id: '',
			loading:false,
			target_options: [],
			swiperIndex: 0,
			ruleForm: {
				region: '', // 证券代码
				regionCode: '', // 证券名称
				number: 10000, // 最大出借数量 ( 股 )
				type: [''], // 出借期限及费率
				permissions: true, // 出借权限
				name: '', // 机构名称
				account: false, // 账号信息
				accountmsg: '', // 证券账号
				xwNumber: '', // 席位号
				value1: '',
				value2: '',
				value3: '',
				min: 10000, // 默认最大出借数
				types: false // value 1 2 3 如果有一个为空 此为false
			},
			lendData:'', // 确认数据
			body: null,
			rules: {
				region: [
					{
						required: true,
						message: '请输入证券代码/名称',
						trigger: 'change'
					}
				],
				number: [
					{
						required: true,
						message: '请输入数量',
						trigger: 'change'
					}
					// { min: 2, max: 10, message: '不得小于100',trigger:'change' }
				],
				type: [
					{
						type: 'array',
						required: true,
						message: '请至少选择一个活动性质',
						trigger: 'change'
					}
				],
				types: [
					{
						required: true
					}
				],
				name: [
					{
						required: true,
						message: '请输入名称',
						trigger: 'change'
					}
				],
				value1: [
					{
						required: true,
						message: '请输入天数',
						trigger: 'change'
					}
				],
				value2: [
					{
						required: true,
						message: '请输入天数',
						trigger: 'change'
					}
				],
				value3: [
					{
						required: true,
						message: '请输入费率',
						trigger: 'change'
					}
				]
			},
			rowStyle: {
				height: '56.5px'
			},
			headerStyle: {
				height: '59px',
				background: '#C5181F',
				color: '#ffffff'
			},
			cellStyle: {
				color: 'red'
			},
			tableData128: [], // 128 数据
			tableData129: [], // 129 数据
			codeData: [], // 证金名称部分数据
			allCodeData: [], // 全部证金名称数据
			timer:null,
		};
	},
	computed: {
        ...mapState({
            token: "token",
            fundAccount:'fundAccount',
            showcoupon:"showcoupon"
        })
    },
	components: {
		Header,
		Footer,
		SIdeNavigation,
		LoanInterest
	},
	created() {
		this.queryService128no();
		this.queryService129no();
		this.swiperIndexshow();
	},
	methods: {
		// 打开客服
		openServer(){
			window.open('https://citicskefu.citics.com/commonpc?entry_type=zjwt&ans_channel=rzrq&entranceId=rzrq&useSDKBottom=0');
		},
		// 轮播开关
		mouseSuspension(type){
			if(type){
				// 移入
				clearInterval(this.timer);
			}else{
				// 移出
				this.swiperIndexshow();
			}
		},
		// 轮流展示banner
		swiperIndexshow(){
			// if(!(this.token && this.fundAccount ? this.showcoupon == 1 ? true : false : false)){
			// 	return;
			// };
			this.timer = setInterval(() => {
				if(this.swiperIndex == 0){
					this.swiperIndex = 1;
				}else{
					this.swiperIndex = 0;
				}
			}, 5000);
		},
		// banner改变
		swiperIndexChange(index){
			this.swiperIndex = index;
		},
		// 市场行情 出借 跳转更多
		gotoBusiness(index) {
			this.$router.push({
				path: '/business',
				query: {
					index,
				}
			});
		},
		// 主创版 input 失去焦点
		inputBlur(index, value) {
			if (index == 1 || index == 2) {
				if (!(1 < value * 1 && value * 1 < 183)) {
					if (index == 1) {
						this.ruleForm.value1 = '';
					} else {
						this.ruleForm.value2 = '';
					}
					this.$message({
						message: '期限需要在2-182天之间',
						type: 'error'
					});
				}
			} else {
				if (!(value * 1 > 0)) {
					this.$message({
						message: '费率应是正数',
						type: 'error'
					});
				}
			}
		},
		// 出借意向组件选择数据
		lazyChange(data) {
			const { min, number, region, regionCode } = data;
			this.ruleForm.min = min;
			this.ruleForm.number = number;
			this.ruleForm.region = region;
			this.ruleForm.regionCode = regionCode;
		},
		// 市场行情 行点击
		rowClick(row, event, column) {
			// 打开出借意向单
			this.$refs.loanInterest.lendBox(row,1);
		},
		// 出借行情查询
		queryService128no() {
			this.loading = true;
			queryService128no({
				PageSize: 10,
				PageNum: 1
			}).then(res => {
				const { data } = res;
				this.tableData128 = data;
				this.loading = false;
			}).catch(err=>{
				this.loading = false;
                // this.$message({
                //     message:err.errorMsg || err.errorMessage,
                //     type: 'error'
                // })
            })
		},
		// 借入行情查询
		queryService129no() {
			this.loading = true;
			queryService129no({
				Limit: 10
			}).then(res => {
				const { data } = res;
				this.tableData129 = data;
				this.loading = false;
			}).catch(err=>{
				this.loading = false;
                // this.$message({
                //     message:err.errorMsg || err.errorMessage,
                //     type: 'error'
                // })
            })
		},
		// 设置页面是否滚动
		changeBody(switchLend) {
			if (!switchLend) {
				this.body.style.overflow = 'auto';
			} else {
				this.body.style.overflow = 'hidden';
			}
		}
	},
	mounted() {
		let body = document.querySelector('body');
		this.body = body;
	}
};
</script>
<style lang="scss" scoped>
.last_index{
	font-size: 14px;
	color: #C5181F;
}
.index_header_box {
	width: 100%;
	background: #ffffff;
}
.index {
	width: 100%;
    min-width: 1280px;
	background-color: #f8f9fc;

	.index_header {
		position: relative;
		max-width: 1920px;
        min-width: 1280px;
		margin: 0 auto;
		width: 100%;
		overflow: hidden;

		.index_banner {
			width: 100%;
			height: 800px;

			& img {
				width: 1920px;
				height: 800px;
			}
		}
	}

	.index_right {
		position: absolute;
		width: 220px;
		padding: 20px;
		height: 40px;
		opacity: 0.9;
		justify-content: center;
		align-items: flex-start;
		cursor: pointer;
		background: rgba(255, 255, 255, 0.9);
	}

	.index_white {
		font-size: 14px;
		font-weight: 400;
		right: 0;
		color: #111111;
		top: 310px;
	}
	.index_red {
		background: rgba(255, 255, 255, 0.9);
		font-size: 14px;
		color: #111111;
		font-weight: 400;
		right: 0;
		top: 410px;
	}

	.index_curr{
		background: rgba(198, 23, 30, 0.9);
		color: #ffffff;
	}

	.index_content {
		top: 120px;
		position: absolute;
		width: 73%;
        left: 13.5%;

		& p {
			width: 100%;
		}

		.title_1 {
			font-size: 50px;
			font-weight: bold;
			color: #1c1d1c;
			margin-bottom: 30px;
		}

		.title_2 {
			font-weight: 500;
			font-size: 24px;
			margin: 10px 0;
			color: #1c1d1c;
		}

		.title_3 {
			font-weight: bold;
			font-size: 24px;
			color: #1c1d1c;
			margin-top: 40px;
		}

		.index_list {
			width: 100%;
			display: flex;
			justify-content: flex-start;
			margin-top: 30px;
			font-size: 18px;
			color: #666666;

			& div {
				margin-right: 68px;
				width: 180px;
				justify-content: flex-start;
			}

			.index_round {
				display: block;
				width: 6px;
				height: 6px;
				background: #c5181f;
				border-radius: 50%;
				font-weight: 600;
				margin-right: 10px;
			}
		}

		.index_btn {
			width: 100%;
			display: flex;
			justify-content: flex-start;
			margin-top: 60px;

			.index_lend {
				width: 150px;
				height: 54px;
				background: #c5181f;
				border-radius: 5px;
				color: #ffffff;
				font-size: 18px;
				font-weight: 600;
				cursor: pointer;
			}

			.index_service {
				width: 150px;
				height: 54px;
				background: #ffffff;
				border-radius: 5px;
				color: #c5181f;
				font-size: 18px;
				font-weight: 600;
				margin-left: 20px;
				cursor: pointer;
			}
		}
	}

	.index_text {
		text-align: center;
		color: #666666;
		font-size: 14px;
		font-weight: 400;
	}
	.index_table {
		width: 1400px;
		align-items: flex-start;
        justify-content: space-between;
		margin-top: 80px;
        padding: 0 20px;
		height: 680px;
		overflow: hidden;

		.table_left {
			width: 61.42%;
			height: 686px;

			.table_p1 {
				width: 100%;
				height: 50px;
				background: #ffffff;
				justify-content: flex-start;
				padding-left: 15px;
                box-sizing: border-box;
				font-size: 14px;
				color: #333333;
				margin: 20px 0 50px 0;
			}

			.table_box {
				width: 100%;
				margin-top: 15px;
                display: flex;
                justify-content: space-between;
				.box_left {
					padding: 0 0 45px 0;
                    width: 48.83%;
					background-color: #ffffff;
					.box_title {
						font-size: 18px;
						font-weight: 600;
						// width: 420px;
						height: 53px;
						background: #c5181f;
						color: #ffffff;
						margin-bottom: 16px;
					}

					.box_text {
						width: 100%;
						font-weight: 600;
						font-size: 16px;
						padding: 0 20px;
                        box-sizing: border-box;

						.box_p1 {
							color: #c5181f;
							font-weight: 600;
						}

						.box_p2 {
							font-size: 14px;
							color: #333333;
							padding-top: 11px;
							font-weight: 600;

							& > span {
								font-size: 12px;
								color: #333333;
								font-weight: 400;
							}
						}

						.box_list {
							width: 100%;
							justify-content: flex-start;
							margin-top: 13px;

							.box_red {
								width: 30px;
								height: 40px;
								background: #c5181f;
								border-radius: 1px;
								text-align: center;
								color: #ffffff;
								font-size: 14px;
								padding: 5px 9px;
							}

							.box_pink {
								justify-content: space-around;
                                flex: 1;
								height: 50px;
								background: rgba(197, 24, 31, 0.05);
								border-radius: 1px;

								.box_item {
									justify-content: center;
									height: 100%;
									.span1 {
										font-size: 16px;
										color: #c5181f;
									}
									.span2 {
										color: #666666;
										font-size: 14px;
										// margin-top: 3px;
									}
								}
							}
						}
					}

					.index_line1 {
						width: 100%;
						border-top: 2px solid #e8e8e8;
						margin: 15px auto;
					}
				}

				.boxleft {
					// margin-left: 20px;
				}

				.securities {
					width: 48.83%;
					height: 195px;
					background: rgba(197, 24, 31, 0.05);
					justify-content: center;
					margin-bottom: 15px;

					& .se_img {
						width: 70px;
						height: 70px;
					}

					& .se_p1 {
						color: #333333;
						font-weight: 600;
						font-size: 16px;
						margin-top: 18px;
					}

					& .se_p2 {
						color: #666666;
						font-weight: 400;
						font-size: 14px;
						margin-top: 12px;
					}
				}

				.othercolor {
					background-color: #f8f9fc;
				}
			}

			.table_box2 {
				flex-wrap: wrap;
				justify-content: space-between;
			}
		}

		.table_right {
			width: 35.71%;
			height: 686x;
			overflow: hidden;
			// margin-left: 40px;
		}
	}

	.index_process {
		max-width: 1400px;
		width: 100%;
		margin-top: 45px;
		
		.index_process_content {
			background: #F8F9FC;
			height: 140px;
			width: 100%;
			margin-top: 15px;
			margin-bottom: 100px;
			justify-content: space-around;

			.process_img {
				& > img {
					width: 48px;
					height: 48px;
					margin-bottom: 16px;
				}

				& > p {
					font-size: 14px;
					color: #666666;
					font-weight: 600;
				}
			}

			.arrow {
				width: 65px;
				height: 28px;
			}
		}

		.index_p_c_b{
			background-color: #ffffff;
		}
	}

	.index_table2 {
		background: #ffffff;
		width: 100%;
		padding-bottom: 100px;
	}
}

.infor_title {
	max-width: 1400px;
	margin: 100px 0 20px 0;

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

.index_prompt {
	padding: 40px;
    box-sizing: border-box;
	min-width: 1280px;
	max-width: 1400px;
	width: 100%;
	background: #ffffff;
	box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.09);
	margin-bottom: 80px;

	& > div {
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		margin-top: 26px;
		& span {
			width: 19px;
			height: 19px;
			display: inline-flex;
			justify-content: center;
			align-items: center;
			color: #ffffff;
			background: #c5181f;
			border-radius: 50%;
			font-size: 12px;
			margin-right: 8px;
		}
		& p {
			font-size: 14px;
			font-weight: 400;
			color: #666666;
			width: 95%;
		}
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
		top: 6px;
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

// 出借意向
.index_intention {
	.intention_box {
		position: relative;
		width: 1200px;
		height: 88%;
		background: #f8f9fc;
		top: 40px;
		margin: auto;
		padding-top: 0.1px;
		display: flex;
		flex-direction: column;
		// overflow: auto;

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

		.infor_countdown {
			right: 65px;
			top: 33px;
			width: 30px;
			text-align: center;
			position: absolute;
			font-size: 18px;
			color: #999999;
			font-weight: 600;
		}
	}

	.newin_box {
		width: 700px;
		height: 550px;
		background: #ffffff;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		margin: auto;
		display: flex;
		flex-direction: column;
		align-items: center;

		.in_name {
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 14px;
			color: #666666;
			font-weight: 600;
			padding: 10px 0;

			.in_item {
				margin: 20px 0;
				.span_1 {
					width: 145px;
				}
				.span_2 {
					width: 450px;
					color: #333333;
					justify-content: flex-end;
					text-align: right;
				}
				.span_3 {
					color: #c5181f;
				}
			}
		}

		.in_line {
			width: 660px;
			border-top: 2px solid #e8e8e8;
		}

		.in_btn {
			color: 18px;
			color: #ffffff;
			font-weight: 600;
			width: 150px;
			height: 54px;
			background: #c5181f;
			border-radius: 5px;
			margin-top: 18px;
			cursor: pointer;
		}
	}

	.in_prompt {
		width: 660px;
		height: 40px;
		background: rgba(197, 24, 31, 0.05);
		font-size: 14px;
		color: #666666;
	}
	.newin_success {
		width: 700px;
		height: 432px;
		background: #ffffff;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		margin: auto;
		display: flex;
		flex-direction: column;
		align-items: center;

		.in_success {
			width: 128px;
			height: 128px;
			margin: 80px 0 30px 0;
		}

		.in_text {
			font-size: 24px;
			font-weight: 600;
			color: #333333;
			margin-bottom: 46px;
		}
	}

	.securities_mess {
		margin: 0 auto;
		width: 1080px;
		padding: 30px 30px 10px 30px;
		background: #ffffff;
	}

	.liability {
		width: 1080px;
		height: 180px;
		padding: 30px;
		background: #ffffff;
		margin: 0 auto;
		margin-top: 20px;
		margin-bottom: 30px;

		.liab_text {
			font-size: 14px;
			color: #666666;
			line-height: 30px;
			margin-top: 20px;
			// text-align: justify;
		}
	}

	.lia_submit_btn {
		width: 150px;
		height: 54px;
		background: #c5181f;
		border-radius: 5px;
		margin: 0 auto;
		color: #ffffff;
		font-weight: 600;
		font-size: 18px;
		cursor: pointer;
	}

	.lia_submit_btn_line{
		margin-top: 50px;
		height: 1px;
		width: 100%;
	}
}

.bus_search {
	margin-top: 20px;
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	flex-direction: column;

	& span {
		font-weight: 600;
		font-size: 14px;
		color: #333333;
		margin-right: 8px;
		display: flex;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.se_switch {
		justify-content: flex-start;
		height: 32px;
		align-items: center;

		& span {
			margin-left: 10px;
			color: #999999;
			font-size: 14px;
		}
	}

	.bus_input {
		width: 536px;
		height: 36px;
		background: #ffffff;
		border-radius: 4px;
		justify-content: flex-start;
		// border: 1px solid #e8e8e8;
	}
	.checked_box {
		display: flex;
		.checked {
			cursor: pointer;
			align-items: flex-start;
			.checkeditem {
				width: 60px;
				height: 60px;
				background: #fff9f9;
				border-radius: 1px;
				border: 1px solid #e8e8e8;
				margin-left: 10px;
				margin-right: 50px;
				justify-content: center;

				& .p1 {
					width: 100%;
					text-align: center;
					margin: 0;
					display: block;
					color: #c5181f;
					font-size: 16px;
					line-height: normal;
				}

				& .p2 {
					display: block;
					text-align: center;
					width: 100%;
					margin: 0;
					color: #666666;
					font-size: 14px;
					line-height: normal;
				}
			}

			.currchecked {
				border: 1px solid #c5181f;
			}
		}
	}
}

.input2 {
	justify-content: flex-start;

	& span {
		color: #999999;
		font-size: 14px;
		margin-left: 20px;
	}
}

.index_center {
	flex: 1;
	overflow: auto;
}

.two {
	align-items: flex-start;
}

.twocolor span {
	color: #666666;
	font-size: 14px;
	font-weight: 600;
}
.two_p2 {
	margin-left: 10px;
	color: #333333 !important;
}
</style>
<style lang="scss">
.bus_input {
	& input {
		height: 34px;
	}

	.el-select {
		height: 34px;
	}
}
.name1 {
	.el-form-item__label {
		color: #333333;
		font-weight: 600;
	}
}

@media screen and (max-width:1440px) {
    .index {
        .index_table{
            width: 100% !important;
            box-sizing: border-box;
        }
        
    }
}
</style>
