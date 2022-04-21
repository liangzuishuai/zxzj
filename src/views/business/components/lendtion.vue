<template>
	<div style="width:100%;position: relative;" class="j_c_a_i">
		<div class="invitation j_c_a_i">
			<div class="invitation_left">
				<div v-for="(item, index) in invitaTwodata" @click="invChange(index)" :key="index + 'a'" :class="[curinvIndex == index ? 'left_cur' : '', 'left_item']">
					{{ item.title }}
					<span v-if="item.showNum" class="left_num j_c_a_i">{{ item.showNum }}</span>
				</div>
			</div>
			<div class="invitation_right">
				<!-- tab1 -->
				<div v-if="curinvIndex == 0" class="bus_content f_d_a_i">
					<div class="bus_query">
						<div class="common_title j_c_a_i">
							<span></span>
							证券出借查询
						</div>
						<div class="bus_search">
							<span>证券代码/名称</span>
							<div class="bus_input">
								<lazy-select @change="lazyChange" ref="LazySelect" :region="curRegionCode" :width="500" placeholder="证券代码/名称/简称"></lazy-select>
							</div>
							<span class="spans_1">处理状态</span>
							<el-select style="width:200px !important;" v-model="search.Status" size="medium" placeholder="处理状态">
								<el-option v-for="item in invitaOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
							<div class="bus_btn j_c_a_i" type="primary" @click="queryService122(1)">查询</div>
							<div class="bus_btn buswhite j_c_a_i" type="primary" @click="marketClear()">重置</div>
						</div>
					</div>
					<!-- 列表 -->
					<div class="bus_table bus_table3">
						<div class="common_title j_c_a_i">
							<span></span>
							证券出借列表
							<div class="in_btnarr">
								<span class="btn" @click="batchProcess(1,true,multipleSelection)">批量处理</span>
								<span class="btn" @click="noticeChange">通知模板设置</span>
								<span class="btn" @click="exportData">导出</span>
							</div>
						</div>
						<el-table ref="eltable" :default-sort = "{prop: '', order: null }" @selection-change="handleSelectionChange" v-loading="loading" :header-row-style="headerStyle" :header-cell-style="headerStyle" :row-style="rowStyle" @sort-change="getOrder" align="center"  :data="tableData122Show" style="width: 100%;">
							<el-table-column type="selection" fixed="left" label="全选" align="center" width="60"></el-table-column>
							<el-table-column align="center" prop="UpdateTime" min-width="180" sortable="custom" label="邀约时间" height>
								<template slot-scope="scope">
									<div>
										{{ $moment(tableData122[scope.$index].UpdateTime).format('YYYY-MM-DD HH:mm:ss') }}
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center" prop="StockCode" label="证券代码" sortable="custom" width="110" height="59">
								<template slot-scope="scope">
									<div>
										{{tableData122[scope.$index].StockCode}}
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center" prop="StockName" min-width="150" sortable="custom" label="证券名称" height>
								<template slot-scope="scope">
									<div>
										{{tableData122[scope.$index].StockName}}
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center" prop="Qty" min-width="120" sortable="custom" label="数量（股）" height>
								<template slot-scope="scope">
									<div>
										{{tableData122[scope.$index].Qty}}
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center" prop="Term" min-width="120" sortable="custom" label="期限（天）" height>
									<template slot-scope="scope">
									<div>
										{{tableData122[scope.$index].Term}}
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center" prop="CbpconferId" min-width="100" sortable="custom" label="约定号" height="59">
								<template slot-scope="scope">
									<div>
										{{tableData122[scope.$index].CbpconferId}}
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center" prop="FeeRate" min-width="125" sortable="custom" label="出借费率(%)" height>
								<template slot-scope="scope">
									<div>
										{{util.Multiply(tableData122[scope.$index].FeeRate,100) || 0}}
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center" prop="ClientName" min-width="200" sortable="custom" label="账户名称" height>
								<template slot-scope="scope">
									<div>
										{{tableData122[scope.$index].ClientName}}
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center" prop="StockAccount" min-width="120" sortable="custom" label="股东账号" height>
								<template slot-scope="scope">
									<div>
										{{tableData122[scope.$index].StockAccount}}
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center" prop="Seat" min-width="120" sortable="custom" label="席位号" height>
								<template slot-scope="scope">
									<div>
										{{tableData122[scope.$index].Seat}}
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center" prop="Status" fixed="right" sortable="custom" label="处理状态" height width="110">
								<template slot-scope="scope">
									<div v-if="tableData122[scope.$index].Status == 0">
										待处理
									</div>
									<div v-else-if="tableData122[scope.$index].Status == 1">
										已执行
									</div>
									<div v-else-if="tableData122[scope.$index].Status == 2">
										已拒绝
									</div>
									<div v-else-if="tableData122[scope.$index].Status == 3">
										已过期
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center" fixed="right" prop="Status" label="操作" height width="210">
								<template slot-scope="scope">
									<div class="invitation_span" v-if="tableData122[scope.$index].Status == 0">
										<span class="inv_span1" @click="queryService123(tableData122[scope.$index],1)">执行</span>
										<span class="inv_span2" style="margin-left:10px;" @click="queryService123(tableData122[scope.$index],2)">拒绝</span>
									</div>
									<div class="invitation_span" v-if="tableData122[scope.$index].Status == 1">
										<span class="inv_span2"  @click="queryService123(tableData122[scope.$index],2)">设为已拒绝</span>
									</div>
									<div class="invitation_span" v-if="tableData122[scope.$index].Status == 2">
										<span class="inv_span1" @click="queryService123(tableData122[scope.$index],1)">设为已执行</span>
									</div>
									<div class="invitation_span" v-if="tableData122[scope.$index].Status == 3">
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
						<!-- 用来导出数据 -->
                        <table id="tableExport" style="display:none;" >
                            <thead><tr><th v-for="(item,index) in showHeadList" :key="index">{{item.FieldName}}</th></tr></thead>
                            <tbody>
                                <tr v-for="(item,index) in multipleSelection" :key="index">
                                    <td v-for="(item2,index2) in showHeadList" :key="index2">
										<template v-if="item2.ColumnName=='OrderType'">
											<span v-if="item[item2.ColumnName] == '01AS'">转融券出借非约定申报</span>
											<span v-if="item[item2.ColumnName] == '01PS'">转融券出借约定申报</span>
											<span v-if="item[item2.ColumnName] == '5122'">转融通出借同意展期</span>
											<span v-if="item[item2.ColumnName] == '5131'">转融券出借提前索还</span>
											<span v-if="item[item2.ColumnName] == '5124'">转融通同意市场化转融券出借展期</span>
										</template>
										<template v-else>
											{{item2.ColumnName=='FeeRate'?(item[item2.ColumnName]*100).toFixed(2)+'%':item[item2.ColumnName]}}
										</template>
									</td>
                                </tr>
                            </tbody>
                        </table>
					</div>
				</div>
				<!-- tab2 -->
				<div v-if="curinvIndex == 1" class="bus_content f_d_a_i">
					<!-- 融券出借同意展期 -->
					<div class="bus_query">
						<div class="common_title j_c_a_i">
							<span></span>
							出借同意展期查询
						</div>
						<div class="bus_search">
							<span>证券代码/名称</span>
							<div class="bus_input">
								<lazy-select @change="lazyChange" ref="LazySelect" :width="500" :region="curRegionCode" placeholder="证券代码/名称/简称"></lazy-select>
							</div>
							<span style="margin-left: 40px;">处理状态</span>
							<el-select v-model="search.Status" size="medium" placeholder="处理状态">
								<el-option v-for="item in invitaOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
							<div class="bus_btn j_c_a_i" type="primary" @click="queryService122(1)">查询</div>
							<div class="bus_btn buswhite j_c_a_i" type="primary" @click="marketClear()">重置</div>
						</div>
					</div>
					<!-- 列表 -->
					<div class="bus_table bus_table3">
						<div class="common_title j_c_a_i">
							<span></span>
							出借同意展期列表
							<div class="in_btnarr">
								<span class="btn" @click="batchProcess(1,true,multipleSelection)">批量处理</span>
								<span class="btn" @click="noticeChange">通知模板设置</span>
								<span class="btn" @click="exportData">导出</span>
							</div>
						</div>
						<el-table ref="eltable" :default-sort = "{prop: '', order: null }" @selection-change="handleSelectionChange" v-loading="loading" :header-row-style="headerStyle" :header-cell-style="headerStyle" :row-style="rowStyle" align="center" @sort-change="getOrder" :data="tableData122Show" style="width: 100%;">
							<el-table-column type="selection" fixed="left" label="全选" align="center" width="60"></el-table-column>
							<el-table-column align="center" prop="UpdateTime" min-width="180" sortable="custom" label="邀约时间" height>
								<template slot-scope="scope">
									<div>
										{{ $moment(tableData122[scope.$index].UpdateTime).format('YYYY-MM-DD HH:mm:ss') }}
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center" prop="CloseDate" min-width="180" sortable="custom" label="合约到期日期" height>
								<template slot-scope="scope">
									<div v-if="tableData122[scope.$index].CloseDate">
										{{tableData122[scope.$index].CloseDate}}
									</div>
									<div v-else>
										0
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center" prop="StockCode" label="证券代码" sortable="custom" width="110" height="59">
								<template slot-scope="scope">
									<div>
										{{tableData122[scope.$index].StockCode || 0}}
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center" prop="StockName" min-width="150" sortable="custom" label="证券名称" height>
								<template slot-scope="scope">
									<div>
										{{tableData122[scope.$index].StockName}}
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center" prop="Qty" min-width="145" sortable="custom" label="展期数量（股）" height>
								<template slot-scope="scope">
									<div>
										{{tableData122[scope.$index].Qty || 0}}
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center" prop="Term" min-width="145" sortable="custom" label="展期期限（天）" height>
									<template slot-scope="scope">
									<div>
										{{tableData122[scope.$index].Term || 0}}
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center" prop="FeeRate" min-width="145" sortable="custom" label="展期费率（%）" height>
								<template slot-scope="scope">
									<div>
										{{util.Multiply(tableData122[scope.$index].FeeRate,100) || 0}}
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center" prop="CsfCompactNo" min-width="160" sortable="custom" label="出借方合约编号"  height="59">
								<template slot-scope="scope">
									<div>
										{{tableData122[scope.$index].CsfCompactNo || 0}}
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center" prop="OppCsfCompactNo" min-width="160" sortable="custom" label="借入方合约编号"  height="59">
								<template slot-scope="scope">
									<div>
										{{tableData122[scope.$index].OppCsfCompactNo || 0}}
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center" prop="LeftQty" min-width="160" sortable="custom" label="原合约数量（股）"  height="59">
								<template slot-scope="scope">
									<div>
										{{tableData122[scope.$index].LeftQty || 0}}
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center" prop="OrigTerm" min-width="160" sortable="custom" label="原合约期限（天）"  height="59">
								<template slot-scope="scope">
									<div>
										{{tableData122[scope.$index].OrigTerm || 0}}
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center" prop="OrigFeeRate" min-width="190" sortable="custom" label="原合约出借费率（%）"  height="59">
								<template slot-scope="scope">
									<div>
										{{util.Multiply(tableData122[scope.$index].OrigFeeRate, 100) || 0}}
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center" prop="StockAccount" min-width="150" sortable="custom" label="出借方股东账号" height>
								<template slot-scope="scope">
									<div>
										{{tableData122[scope.$index].StockAccount || 0}}
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center" prop="Seat" min-width="130" sortable="custom" label="出借方席位号" height>
								<template slot-scope="scope">
									<div>
										{{tableData122[scope.$index].Seat || 0}}
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center" prop="ClientName" min-width="200" sortable="custom" label="出借方名称" height>
								<template slot-scope="scope">
									<div>
										{{tableData122[scope.$index].ClientName}}
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center" prop="Status" fixed="right" sortable="custom" label="处理状态" height width="110">
								<template slot-scope="scope">
									<div v-if="tableData122[scope.$index].Status == 0">
										待处理
									</div>
									<div v-else-if="tableData122[scope.$index].Status == 1">
										已执行
									</div>
									<div v-else-if="tableData122[scope.$index].Status == 2">
										已拒绝
									</div>
									<div v-else-if="tableData122[scope.$index].Status == 3">
										已过期
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center" fixed="right" prop="Status" label="操作" height width="210">
								<template slot-scope="scope">
									<div class="invitation_span" v-if="tableData122[scope.$index].Status == 0">
										<span class="inv_span1" @click="queryService123(tableData122[scope.$index],1)">执行</span>
										<span class="inv_span2" style="margin-left:10px;" @click="queryService123(tableData122[scope.$index],2)">拒绝</span>
									</div>
									<div class="invitation_span" v-if="tableData122[scope.$index].Status == 1">
										<span class="inv_span2"  @click="queryService123(tableData122[scope.$index],2)">设为已拒绝</span>
									</div>
									<div class="invitation_span" v-if="tableData122[scope.$index].Status == 2">
										<span class="inv_span1" @click="queryService123(tableData122[scope.$index],1)">设为已执行</span>
									</div>
									<div class="invitation_span" v-if="tableData122[scope.$index].Status == 3">
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
						<!-- 用来导出数据 -->
						<table id="tableExport" style="display:none;" >
                            <thead><tr><th v-for="(item,index) in showHeadList" :key="index">{{item.FieldName}}</th></tr></thead>
                            <tbody>
                                <tr v-for="(item,index) in multipleSelection" :key="index">
                                    <td v-for="(item2,index2) in showHeadList" :key="index2">
										<template v-if="item2.ColumnName=='OrderType'">
											<span v-if="item[item2.ColumnName] == '01AS'">转融券出借非约定申报</span>
											<span v-if="item[item2.ColumnName] == '01PS'">转融券出借约定申报</span>
											<span v-if="item[item2.ColumnName] == '5122'">转融通出借同意展期</span>
											<span v-if="item[item2.ColumnName] == '5131'">转融券出借提前索还</span>
											<span v-if="item[item2.ColumnName] == '5124'">转融通同意市场化转融券出借展期</span>
										</template>
										<template v-else>
                                        	{{item2.ColumnName=='FeeRate'||item2.ColumnName=='OrigFeeRate'?(item[item2.ColumnName]*100).toFixed(2)+'%':item[item2.ColumnName]}}
										</template>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
					</div>
				</div>
				<!-- tab3 -->
				<div v-if="curinvIndex == 2" class="bus_content f_d_a_i">
					<!-- 转融券出借提前了结 -->
					<div class="bus_query">
						<div class="common_title j_c_a_i">
							<span></span>
							出借提前了结查询
						</div>
						<div class="bus_search">
							<span>证券代码/名称</span>
							<div class="bus_input">
								<lazy-select @change="lazyChange" ref="LazySelect" :region="curRegionCode" :width="500" placeholder="证券代码/名称/简称"></lazy-select>
							</div>
							<span style="margin-left: 40px;">处理状态</span>
							<el-select v-model="search.Status" size="medium" placeholder="处理状态">
								<el-option v-for="item in invitaOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
							<div class="bus_btn j_c_a_i" type="primary" @click="queryService122(1)">查询</div>
							<div class="bus_btn buswhite j_c_a_i" type="primary" @click="marketClear()">重置</div>
						</div>
					</div>
					<!-- 列表 -->
					<div class="bus_table bus_table3">
						<div class="common_title j_c_a_i">
							<span></span>
							出借提前了结列表
							<div class="in_btnarr">
								<span class="btn" @click="batchProcess(1,true,multipleSelection)">批量处理</span>
								<span class="btn" @click="noticeChange">通知模板设置</span>
								<span class="btn" @click="exportData">导出</span>
							</div>
						</div>
						<el-table ref="eltable" :default-sort = "{prop: '', order: null }" @selection-change="handleSelectionChange" v-loading="loading" :header-row-style="headerStyle" :header-cell-style="headerStyle" @sort-change="getOrder" :row-style="rowStyle" align="center" :data="tableData122Show" style="width: 100%;">
							<el-table-column type="selection" fixed="left" label="全选" align="center" width="60"></el-table-column>
							<el-table-column align="center" prop="UpdateTime" min-width="180" sortable="custom" label="邀约时间" height>
								<template slot-scope="scope">
									<div>
										{{ $moment(tableData122[scope.$index].UpdateTime).format('YYYY-MM-DD HH:mm:ss') }}
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center" prop="CloseDate" min-width="180" sortable="custom" label="原到期日期" height>
								<template slot-scope="scope">
									<div v-if="tableData122[scope.$index].CloseDate">
										{{tableData122[scope.$index].CloseDate}}
									</div>
									<div v-else>
										0
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center" prop="StockCode" label="证券代码" sortable="custom" width="110" height="59">
								<template slot-scope="scope">
									<div>
										{{tableData122[scope.$index].StockCode}}
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center" prop="StockName" min-width="150" sortable="custom" label="证券名称" height>
								<template slot-scope="scope">
									<div>
										{{tableData122[scope.$index].StockName}}
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center" prop="Qty" min-width="120" sortable="custom" label="数量（股）" height>
								<template slot-scope="scope">
									<div>
										{{tableData122[scope.$index].Qty}}
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center" prop="PreEndDate" min-width="180" sortable="custom" label="提前了结日期" height>
								<template slot-scope="scope">
									<div>
										{{tableData122[scope.$index].PreEndDate || 0}}
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center" prop="FeeRate" min-width="160" sortable="custom" label="提前了结费率(%)" height>
								<template slot-scope="scope">
									<div>
										{{ util.Multiply(tableData122[scope.$index].FeeRate, 100) }}
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center" prop="CsfCompactNo" min-width="160" sortable="custom" label="出借方合约编号" height="59">
								<template slot-scope="scope">
									<div>
										{{tableData122[scope.$index].CsfCompactNo || 0}}
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center" prop="OppCsfCompactNo" min-width="155" sortable="custom" label="借入方合约编号" height="59">
								<template slot-scope="scope">
									<div>
										{{tableData122[scope.$index].OppCsfCompactNo || 0}}
									</div>
								</template>
							</el-table-column>
							<!-- 原合约出借费率（%） -->
							<el-table-column align="center" prop="OrigFeeRate" min-width="195" sortable="custom" label="原合约出借费率（%）" height="59">
								<template slot-scope="scope">
									<div>
										{{util.Multiply(tableData122[scope.$index].OrigFeeRate,100) || 0}}
									</div>
								</template>
							</el-table-column>
							<!-- 原合约期限（天）） -->
							<el-table-column align="center" prop="OrigTerm" min-width="160" sortable="custom" label="原合约期限（天）" height="59">
								<template slot-scope="scope">
									<div>
										{{tableData122[scope.$index].OrigTerm || 0}}
									</div>
								</template>
							</el-table-column>
							<!-- 出借方股东账号 -->
							<el-table-column align="center" prop="StockAccount" min-width="150" sortable="custom" label="出借方股东账号" height="59">
								<template slot-scope="scope">
									<div>
										{{tableData122[scope.$index].StockAccount || 0}}
									</div>
								</template>
							</el-table-column>
							<!-- 出借方席位号 -->
							<el-table-column align="center" prop="Seat" min-width="150" sortable="custom" label="出借方席位号" height="59">
								<template slot-scope="scope">
									<div>
										{{tableData122[scope.$index].Seat || 0}}
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center" prop="ClientName" min-width="200" sortable="custom" label="出借方名称" height>
								<template slot-scope="scope">
									<div>
										{{tableData122[scope.$index].ClientName}}
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center" prop="Status" fixed="right" sortable="custom" label="处理状态" height width="110">
								<template slot-scope="scope">
									<div v-if="tableData122[scope.$index].Status == 0">
										待处理
									</div>
									<div v-else-if="tableData122[scope.$index].Status == 1">
										已执行
									</div>
									<div v-else-if="tableData122[scope.$index].Status == 2">
										已拒绝
									</div>
									<div v-else-if="tableData122[scope.$index].Status == 3">
										已过期
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center" fixed="right" prop="Status" label="操作" height width="210">
								<template slot-scope="scope">
									<div class="invitation_span" v-if="tableData122[scope.$index].Status == 0">
										<span class="inv_span1" @click="queryService123(tableData122[scope.$index],1)">执行</span>
										<span class="inv_span2" style="margin-left:10px;" @click="queryService123(tableData122[scope.$index],2)">拒绝</span>
									</div>
									<div class="invitation_span" v-if="tableData122[scope.$index].Status == 1">
										<span class="inv_span2"  @click="queryService123(tableData122[scope.$index],2)">设为已拒绝</span>
									</div>
									<div class="invitation_span" v-if="tableData122[scope.$index].Status == 2">
										<span class="inv_span1" @click="queryService123(tableData122[scope.$index],1)">设为已执行</span>
									</div>
									<div class="invitation_span" v-if="tableData122[scope.$index].Status == 3">
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
						<!-- 用来导出数据 -->
						<table id="tableExport" style="display:none;" >
                            <thead><tr><th v-for="(item,index) in showHeadList" :key="index">{{item.FieldName}}</th></tr></thead>
                            <tbody>
                                <tr v-for="(item,index) in multipleSelection" :key="index">
                                    <td v-for="(item2,index2) in showHeadList" :key="index2">
										<template v-if="item2.ColumnName=='OrderType'">
											<span v-if="item[item2.ColumnName] == '01AS'">转融券出借非约定申报</span>
											<span v-if="item[item2.ColumnName] == '01PS'">转融券出借约定申报</span>
											<span v-if="item[item2.ColumnName] == '5122'">转融通出借同意展期</span>
											<span v-if="item[item2.ColumnName] == '5131'">转融券出借提前索还</span>
											<span v-if="item[item2.ColumnName] == '5124'">转融通同意市场化转融券出借展期</span>
										</template>
										<template v-else>
                                        	{{item2.ColumnName=='FeeRate'||item2.ColumnName=='OrigFeeRate'?(item[item2.ColumnName]*100).toFixed(2)+'%':item[item2.ColumnName]}}
										</template>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
					</div>
				</div>
				<!-- tab4 -->
				<div v-if="curinvIndex == 3" class="informway f_d_a_i">
					<!-- tab -->
					<div class="infor_nav">
						<div :class="[curinforIndex == index ? 'infor_item_cur' : '', 'infor_item']" @click="inforChange(index)" v-for="(item, index) in inforData" :key="index + 'b'">
							{{ item.title }}
						</div>
					</div>
					<!-- 通知 -->
					<div v-if="curinforIndex == 0 && isUpdata" class="notice">
						<div class="notice_item">
							<span class="span_1">通知</span>
							<el-switch v-model="smsData.radio" active-value="1" inactive-value="0" style="height:31px;" active-color="#C5181F" inactive-color="#E5E5E5" @change="changeRadio"></el-switch>
						</div>
						<div class="notice_item">
                            <template  v-if="smsData.radio!=0">
							    <span class="span_1" style="margin-top:10px;">通知方式</span>
                                <div class="notice_type">
                                    <div class="SMS">
                                        <el-checkbox style="margin-top:10px;" v-model="smsData.checked1" @change="changeCheck1">短信通知</el-checkbox>
                                        <div class="no_input">
                                            <div class="j_c_a_i" v-for="(item, index) in smsData.inputarr" :key="index + 'c'">
                                                <el-input class="input" v-model="smsData.inputarr[index]" maxlength="11" @blur="smsDataChange(item,1)" placeholder="请输入手机号"></el-input>
                                                <div v-if="smsData.inputarr.length -1 == index" class="input_add j_c_a_i" @click="addInput(1,index)"><img src="@/assets/icon_add.png" alt /></div>
                                                <div v-if="smsData.inputarr.length != 1 && index == smsData.inputarr.length - 1" class="input_add j_c_a_i" @click="reduceInput(1,index)">
                                                    <img src="@/assets/icon_reduce.png" alt />
                                                </div>
                                                <div v-if="smsData.inputarr.length != 1 && index != smsData.inputarr.length - 1" class="input_add j_c_a_i" @click="reduceInput(1,index)">
                                                    <img src="@/assets/icon_reduce.png" alt />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mail">
                                        <!-- <el-radio v-model="smsData.radio" label="2">邮件通知</el-radio> -->
                                        <el-checkbox style="margin-top:10px;" v-model="smsData.checked2" @change="changeCheck2">邮件通知</el-checkbox>
                                        <div class="no_input">
                                            <div class="j_c_a_i" v-for="(item, indexs) in smsData.mailarr" :key="indexs + 'c'">
                                                <el-input class="input" v-model="smsData.mailarr[indexs]" @change="smsDataChange(item,2)" maxlength="20"></el-input>
                                                <div v-if="smsData.mailarr.length -1 == indexs" class="input_add j_c_a_i" @click="addInput(2,indexs)"><img src="@/assets/icon_add.png" alt /></div>
                                                <div v-if="smsData.mailarr.length != 1 && indexs == smsData.mailarr.length - 1" class="input_add j_c_a_i" @click="reduceInput(2,indexs)">
                                                    <img src="@/assets/icon_reduce.png" alt />
                                                </div>
                                                <div v-if="smsData.mailarr.length != 1 && indexs != smsData.mailarr.length - 1" class="input_add j_c_a_i" @click="reduceInput(2,indexs)">
                                                    <img src="@/assets/icon_reduce.png" alt />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
						</div>
						<!-- 提交按钮 -->
						<div class="not_submit" @click="notUpdata(1)">提交</div>
					</div>
					<!-- 模板 -->
					<div v-if="curinforIndex == 0 && !isUpdata" class="template">
						<p>
							<span class="span">更新时间</span>
							2022-01-12 18:30
						</p>
						<p>
							<span class="span">通知</span>
							{{noticeFlag == '0' ? '关闭' : '开启'}}
						</p>
						<p v-if="smsData.realMobile.length > 0&&noticeFlag!=0&&noticeFlag!=2">
							<span class="span">通知方式</span>
							短信通知
						</p>
						<p v-if="smsData.realMobile.length > 0&&noticeFlag!=0&&noticeFlag!=2">
							<span class="span"></span>
							<span class="span2" v-for="(item,index) in phoneTime" :key="index">
								{{item}}
							</span>
						</p>
						<p v-if="smsData.realMail.length > 0&&noticeFlag!=0&&noticeFlag!=1">
							<span class="span"></span>
							邮件通知
						</p>
						<p v-if="smsData.realMail.length > 0&&noticeFlag!=0&&noticeFlag!=1">
							<span class="span"></span>
								<span class="span2" v-for="(item,index) in processingTime" :key="index">
								{{item}}
							</span>
						</p>
						<!-- 提交按钮 -->
						<div class="not_submit" @click="notUpdata(2)">编辑</div>
					</div>
					<div class="no_set" v-if="curinforIndex == 1">
						<div class="index_intention notice">
							<div class="export_box">
								<div class="business" style="width:100%;display:flex;align-items: center;">
									<span>选择业务类型</span>
									<el-select style="flex:1;" v-model="typeValue" @change="typeChange" size="medium" placeholder="请选择">
										<el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
									</el-select>
								</div>
								<!-- 列表 -->
								<div class="bus_table">
									<div class="common_title j_c_a_i">
										<span></span>
										列表字段设置
									</div>
									<el-table
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
													<div>{{ scope.row.FieldName }}</div>
												</template>
											</el-table-column>
											<el-table-column align="center" prop="FieldRename" label="重命名" width="220" height="59">
												<template slot-scope="scope">
													<el-input size="small" v-model="scope.row.FieldRename" :disabled="scope.row.FieldName == '序号' ? true : false" placeholder="请输入"></el-input>
												</template>
											</el-table-column>
											<el-table-column align="center" prop="ShowFlag" label="是否显示" height>
												<template slot-scope="scope">
													<el-switch  style="height:31px;" v-model="scope.row.ShowFlag" active-value="1" inactive-value="0" :disabled="scope.row.FieldName == '序号' ? true : false" active-color="#C5181F" inactive-color="#E5E5E5"></el-switch>
												</template>
											</el-table-column>
											<el-table-column align="center" prop="FieldIndex" label="排序（可上下移动）" height>
												<template>
													<img class="drop" src="../../../assets/icon_9.png" alt />
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
											<el-radio fill="#ffffff" v-model="exportRadio" label="0">Excel</el-radio>
											<el-radio v-model="exportRadio" label="1">CSV</el-radio>
										</div>
									</div>
								</div>
								<div class="in_btns j_c_a_i curpo" @click="noBatchProcess(1)">提 交</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 批量处理弹框 -->
		<transition name="fade">
			<div v-if="iSoperat" class="index_intention">
				<div :class="[radio == 1 ? 'newin_320' : 'newin_440', 'intention_box', 'newin_success']">
					<!-- 关闭按钮 -->
					<img class="in_close" @click="iSoperat = false;body.style.overflow = 'auto';textarea = '';" src="@/assets/index_close.png" alt />
					<!-- 标题 -->
					<div class="infor_title j_c_a_i">
						<div class="infor_line j_c_a_i">
							<span class="line"></span>
							<span class="round"></span>
						</div>
						<div class="infor_my">{{titleState ? '处理' : '批量处理'}}</div>
						<div class="infor_line j_c_a_i">
							<span class="round"></span>
							<span class="line line2"></span>
						</div>
					</div>
					<!-- 单选 -->
					<div class="bu_radio">
						<template>
							<el-radio fill="#ffffff"  v-model="radio" :disabled="radio == 2 && !isBatch" :label="1">执行</el-radio>
							<el-radio v-model="radio" :disabled="radio == 1 && !isBatch" :label="2">拒绝</el-radio>
						</template>
					</div>
					<!-- 分割线 -->
					<div v-if="radio == 1">
						<p class="in_line"></p>
						<div class="in_btn j_c_a_i" v-loading="loading" @click="setQueryService123([item],1)">确 认</div>
					</div>
					<div class="text_box f_d_a_i" v-else>
						<el-input
							class="textares"
							type="textarea"
							v-model="textarea"
							placeholder="请输入拒绝理由"
							maxlength="200"
							:autosize="{ minRows: 5, maxRows: 5 }"
						></el-input>
						<span class="text_number">{{ textarea.length }}/200</span>
						<div class="in_btn j_c_a_i" v-loading="loading" @click="setQueryService123([item],2)">确 认</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
import Sortable from 'sortablejs'; // 拖拽
import { queryService121, queryService122, queryService126, queryService123, queryService124, queryService125 } from '@/api/index/index';
import { fileUpload, getAccountInfo } from "@/api/login/login";
import LazySelect from '@/components/LazySelect.vue';
import XLSX from 'xlsx'; // 生成导出表格
import FileSaver from 'file-saver'; // 下载
import CsvExportor from "csv-exportor"; //csv 导出
import { checkStr } from '@/utils/index.js';
import util from "@/utils/util";

export default {
	name: 'lendtion',
	data() {
		return {
            util: util,
			PageNum: 1, // 第一页
			PageSize: 10, // 十条
			recordNum: 10, // 总条数
			curinvIndex: 0, // 出借邀约 二级导航（4）
			loading:false,
			typeValue: 0, // 模板类型
			iSoperat:false, // 批量操作弹框
			curRegionCode:"",
			textarea:"",
			search: {
				StockCode: '', // 搜索代码
				Status: '' // 状态
			},
			invitaTwodata: [
				{
					title: '证券出借',
					showNum: 0
				},
				{
					title: '出借同意展期',
					showNum: 0
				},
				{
					title: '出借提前了结',
					showNum: 0
				},
				{
					showNum: 0,
					title: '出借邀约通知设置'
				}
			], // 出借邀约二级标题数据
			invitaOptions: [
				{
					value: 0,
					label: '待处理'
				},
				{
					value: 1,
					label: '已执行'
				},
				{
					value: 2,
					label: '已拒绝'
				},
				{
					value: 3,
					label: '已过期'
				}
			], // 状态查询
			typeOptions: [
				{
					value: 0,
					label: '证券出借'
				},
				{
					value: 1,
					label: '出借同意展期'
				},
				{
					value: 2,
					label: '出借提前了结'
				}
			],  // 模板类型
			tableData122: [], // 出借邀约
			curinforIndex: 0, // 三级导航
			isUpdata: false, // 编辑状态
			exportRadio: '0', // 文件导出格式
			inforData: [{ title: '通知方式设置' }, { title: '通知模板设置' }],
            noticeFlag:0,
			smsData: {
				radio: '1', // 通知开关
				checked1: true, // 默认
				checked2: false, // 默认
				inputarr: [''], // 手机号通知
				mailarr: [''],  // 邮箱通知
				mailarr: [''],  // 邮箱通知
                realMobile:[], //真实上传用的
                realMail:[],//真实上传用的
			}, // input 数据
			headerStyle: {
				height: '59px',
				background: '#C5181F',
				color: '#ffffff'
			},
			rowStyle: {
				height: '57px'
			},
			tableData124: [], // 用来展示的数据
			tableData122Show:[], // 选择的数据
			radio: 1, // 弹框单选
			multipleSelection:[], // 表格选择的数据
			item:'',
			ReplyHead:[], // 头部数据
			tableData122All:[], // 全部数据
			isBatch:false, // 是否是批量处理
			exportHeader:[],//用于csv 导出
            setHeaderJson:{
                '0':{
                    'OrderType':'业务类型',
                    'StockCode':'证券代码',
                    'StockName':'证券名称',
                    'Qty':'数量（股）',
                    'Term':'期限（天）',
                    'CbpconferId':'约定号',
                    'FeeRate':'出借费率(%)',
                    'StockAccount':'出借方股东账号',
                    'Seat':'出借方席位号',
                    'ReqSource':'需求来源',
                    'ClientName':'出借方名称',
                },
                '1':{
                    'OrderType':'业务类型',
                    'CloseDate':'合约到期日期',
                    'StockCode':'证券代码',
                    'StockName':'证券名称',
                    'Qty':'展期数量（股）',
                    'Term':'展期期限（天）',
                    'FeeRate':'展期费率(%)',
                    'CsfCompactNo':'出借方合约编号',
                    'ReqSource':'需求来源',
                    'OppCsfCompactNo':'借入方合约编号',
                    'LeftQty':'原合约数量（股）',
                    'OrigTerm':'原合约期限（天）',
                    'OrigFeeRate':'原合约出借费率（%）',
                    'StockAccount':'出借方股东账号',
                    'Seat':'出借方席位号',
                    'ClientName':'出借方名称',
                },
                '2':{
                    'OrderType':'业务类型',
                    'CloseDate':'原到期日期',
                    'StockCode':'证券代码',
                    'StockName':'证券名称',
                    'Qty':'数量（股）',
                    'PreEndDate':'提前了结日期',
                    'FeeRate':'提前了结费率(%)',
                    'CsfCompactNo':'出借方合约编号',
                    'ReqSource':'需求来源',
                    'OppCsfCompactNo':'借入方合约编号',
                    'OrigFeeRate':'原合约出借费率（%）',
                    'OrigTerm':'原合约期限（天）',
                    'StockAccount':'出借方股东账号',
                    'Seat':'出借方席位号',
                    'ClientName':'出借方名称',
                }
            },
            showHeadList:[],
			titleState:false, // 处理类型
			sorting:"", // 排序字段
		};
	},
	created() {
		this.queryService121(0);
		this.queryService121(1);
		this.queryService121(2);
		this.queryService122All();
		this.queryService122(1);
	},
	components: {
		LazySelect
	},
	computed: {
		// 计算 邮箱通知
		processingTime() {
			// `this` 指向 vm 实例
			return this.smsData.mailarr;
		},
		// 计算 手机通知
		phoneTime(){
			// `this` 指向 vm 实例
			return this.smsData.inputarr;
		}
	},
	methods: {
		// 排序
		getOrder(column){
			if(column.order == 'descending'){
				this.sorting = `${column.prop} desc`;
			}else if(column.order == null){
				this.sorting = '';
			}else{
				this.sorting = `${column.prop}`;
			}
			this.queryService122();
		},
		// 设置通知方式校验
		smsDataChange(item,type){
			if(type == 1){
				// 短信手机

			}else{
				// 邮箱通知
			}
		},
		// 数据导出
		exportDataMethod() {
            var xlsxParam = {
                raw: true,
            };
            let et = XLSX.utils.table_to_book(
                document.querySelector("#tableExport"),
                xlsxParam
            );

            let etout = XLSX.write(et, {
                bookType: "xlsx",
                bookSST: true,
                type: "array",
            });
            let title = this.invitaTwodata[this.curinvIndex].title+'列表.xlsx'
            try {
                FileSaver.saveAs(
                new Blob([etout], {
                    type: "application/octet-stream",
                }),
                title
                );
				this.$message({
					type: 'success',
					message: '导出成功'
				})
            } catch (e) {
                console.log(e, etout);
            }
            return etout;
        },
		//设置导出header
        exportHeaderSet(){
            let HeadList = [...this.ReplyHead]
            // let setHeaderJson = this.setHeaderJson[this.curinvIndex];
            let showHeadList = HeadList.filter(item =>{
				return item.ShowFlag==1&&item.ColumnName!='UpdateTime'&&item.ColumnName!='Status'&&item.ColumnName!='SerialNo'
			})
            // showHeadList.forEach(item =>{ //接口返回和文档要求不一致
            //     for( var key in setHeaderJson ){
            //         if(item.ColumnName==key){
            //             item.FieldName = setHeaderJson[key]
            //         }
            //     }
            // })
            this.showHeadList = showHeadList
            let exportHeaderArr = []
            showHeadList.forEach(items =>{
                exportHeaderArr.push(items.FieldName)
            })
            this.exportHeader = exportHeaderArr
        },
        //导出csv
        exportDataCsv(){
            let header = this.exportHeader
            let showHeadList = this.showHeadList
            let data = [...this.multipleSelection]
            let listData = []
            data.forEach(item =>{
                let dataItem = []
                showHeadList.forEach(items =>{
					if(item[items.ColumnName] == '01PS'){
						item[items.ColumnName] = '转融券出借约定申报'
					}else if(item[items.ColumnName] == '01AS'){
						item[items.ColumnName] = '转融券出借非约定申报'
					}else if(item[items.ColumnName] == '5122'){
						item[items.ColumnName] = '转融通出借同意展期'
					}else if(item[items.ColumnName] == '5131'){
						item[items.ColumnName] = '转融券出借提前索还'
					}else if(item[items.ColumnName] == '5124'){
						item[items.ColumnName] = '转融通同意市场化转融券出借展期'
					};
                    if(item[items.ColumnName]!=undefined){
                        dataItem.push(item[items.ColumnName])
                    }
                })
                listData.push(dataItem)
            });
            let title = this.invitaTwodata[this.curinvIndex].title+'列表.csv'
            CsvExportor.downloadCsv(listData, { header }, title);
        },
		// 获取全部数据
		queryService122All(){
			queryService122({
				// BusiCode: this.curinforIndex,
				BusiCode: this.curinvIndex
			}).then(res => {
				const { ItemList, ReplyHead } = res.data;
				this.ReplyHead = ReplyHead.HeadList;
				let newData = [];
				ItemList.forEach((item1,index1) => {
					item1.ColumnList.forEach((item2,index2) => {
						if(newData[index1]){
							
							newData[index1][item1.ColumnList[index2].ColumnName] = item1.ColumnList[index2].ColumnValue;
						}else{
							newData[index1] = {};
							newData[index1][item1.ColumnList[index2].ColumnName] = item1.ColumnList[index2].ColumnValue;
						}
					});
				});
				this.tableData122All = newData;
			}).catch(err=>{})
		},
		// 设置选择的数据
		handleSelectionChange(val) {
        	this.multipleSelection = val;
      	},
		// 数据导出
        exportData(){
			 if(this.showHeadList.length==0){
                this.$message({
					type: 'error',
					message: '请先设置通知模板'
				})
                return
            }
			if(this.tableData122All.length == 0 ){
				this.$message({
					type: 'error',
					message: '暂无可导出数据'
				})
				return;
			};
			let data = this.multipleSelection;

			// 获取选择的数据
			if(data.length == 0 && this.tableData122All.length > 0){

				this.$confirm('是否确认导出全部数据?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					// 设置全部数据
					this.multipleSelection = this.tableData122All;
					if(this.exportRadio==1){
						//导出csv 格式
						this.exportDataCsv()
						return
					}

					this.$nextTick(() => {
						this.exportDataMethod();
					});
				}).catch(() => {})
			}else{
				this.$confirm('是否确认导出选中的数据?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if(this.exportRadio==1){
                        //导出csv 格式
                        this.exportDataCsv()
                        return
                    }
					this.$nextTick(() => {
						this.exportDataMethod();
					});
				}).catch(() => {})
			}
		},
		// 通知批量处理
		noBatchProcess(index){
			if (index) {
				this.tableData124.forEach((item,index) => {
					item.FieldIndex = index+1;
				});
				this.queryService125();
			} else {
				this.switcht = !this.switcht;
				this.changeBody(this.switcht);
			}
		},
		// 通知模板类型变化
		typeChange(){
			this.queryService124();
		},
		// 设置通知模板
		queryService125(index){
			queryService125({
				PBAccount: this.$store.state.token,
				json_List: JSON.stringify(this.tableData124),
				FileFormat:this.exportRadio,
				BusiCode : this.typeValue,
			}).then(res=>{
				this.$message.success("设置成功");
				this.changeBody(false);
			}).catch(err=>{
				this.loading = false;
                this.$message({
                    message:err.errorMsg || err.errorMessage,
                    type: 'error'
                })
            })
		},
		// 操作批量处理
		batchProcess(index,batch,item) {
			// batch 是否是批量处理
			this.item = item;
			// 单项处理
			if (index == 1 && !batch) {
				this.radio = index;
				// console.log("单项执行");
				this.titleState = true;
				this.iSoperat = !this.iSoperat;
				this.changeBody(this.iSoperat);
			} else if(index == 2 && !batch){ // 批量处理
				this.titleState = true;
				// console.log("拒绝");
				this.radio = index;
				// 已拒绝
				// console.log("单项拒绝");
				this.iSoperat = !this.iSoperat;
				this.changeBody(this.iSoperat);
			}else if(index == 4 && !batch){
				// 批量 拒绝
				// console.log("拒绝确认");
				this.setQueryService123([item],2);
				this.iSoperat = !this.iSoperat;
				this.changeBody(this.iSoperat);
			}else if(index && batch){
				this.titleState = false;
				// console.log("批量处理");
				if(this.multipleSelection.length == 0){
					this.$message({
						message: '请选择数据',
						type: 'error'
					});
					return;
				}
				this.iSoperat = !this.iSoperat;
				this.changeBody(this.iSoperat);
				this.isBatch = true;
			}
		},
		// 出借邀约状态设置 请求
		setQueryService123(item,Status){
			if(Status == 2 && !this.textarea){
				this.$message({
					message: '请输入拒绝理由',
					type: 'error'
				});
				return;
			};
			let List = [];
			if(this.isBatch){
				this.multipleSelection.forEach(ele => {
					List.push(
						{"SerialNo": ele.SerialNo, "Status": Status, "Remark": this.textarea},
					)
				});
			}else{
				item.forEach(ele => {
					List.push(
						{"SerialNo": ele.SerialNo, "Status": Status, "Remark": this.textarea},
					)
				});
			};
			// 数据处理为List
			queryService123({
				// Status, // 状态 1 已执行  2 已拒绝
				BusiCode:this.curinvIndex,
				json_List:JSON.stringify(List),
			}).then(res=>{
				this.$message({
					type: 'success',
					message: '操作成功'
				});
				this.iSoperat = !this.iSoperat;
				this.changeBody(this.iSoperat);
				this.queryService122(1);
				this.textarea = '';
				this.isBatch = false;
				// 更新未读数量
				this.queryService121(0);
				this.queryService121(1);
				this.queryService121(2);
			}).catch(error=>{
				this.iSoperat = !this.iSoperat;
				this.changeBody(this.iSoperat);
				this.textarea = '';
					this.$message({
					type: 'error',
					message: '操作失败'
				});
				this.isBatch = false;
			})
		},
		// 出借邀约状态设置
		queryService123(item,Status){
			let msg = Status == 1 ? '已执行' : '已拒绝';
			// 执行
			if(Status == 1){
				this.batchProcess(1,false,item);
				// this.$confirm(`设置此条数据为${msg}, 是否继续?`, '提示', {
				// 	confirmButtonText: '确定',
				// 	cancelButtonText: '取消',
				// 	type: 'warning'
				// }).then(() => {
				// 	this.setQueryService123(item,Status);
				// }).catch(() => {});
			}else{ // 拒绝
				// 打开审批弹框
				this.batchProcess(2,false,item);
			}
		},
		// 通知方式设置获取查询
		queryService126() {
            this.isUpdata = false
			let userInfo =  this.$store.state.userInfo && JSON.parse(this.$store.state.userInfo);
            this.noticeFlag = userInfo.noticeFlag == null ? 1 : userInfo.noticeFlag //0 通知未开启  1只开启短信  2只开启邮箱 3 两种都开启动
			// 获取个人信息设置通知
			// 获取个人信息设置通知
			this.smsData.radio = userInfo.noticeFlag != 0 ? '1' : '0';
            if(userInfo.noticeFlag==1){
                this.smsData.checked1 = true;
            }
            if(userInfo.noticeFlag==2){
                this.smsData.checked2 = true;
            }
            if(userInfo.noticeFlag==3){
                this.smsData.checked1 = true;
                this.smsData.checked2 = true;
            }
			queryService126({
				PBAccount: this.$store.state.token
			}).then(res => {
				console.log(res);
				// 设置通知方式展示
				if(res.data && res.data[0].noticeEmail){ // 邮箱
					this.smsData.mailarr = res.data[0].noticeEmail.split(',');
					this.smsData.realMail = res.data[0].noticeEmail.split(',');
				}else{
					// 默认设置用户通知方式为手机号
					this.smsData.mailarr = [''];
					this.smsData.realMail = []
				};
				// 设置通知方式展示
				if(res.data && res.data[0].noticeMobile){ // 手机号
					this.smsData.inputarr = res.data[0].noticeMobile.split(',');
					this.smsData.realMobile = res.data[0].noticeMobile.split(',');
				}else{
					// 默认设置用户通知方式为手机号
					this.smsData.inputarr = [userInfo.mobile];
                	this.smsData.realMobile = [userInfo.mobile];
				};
			});
		},
		// 通知方式设置
		updateAccountInfo() {
			this.smsData.realMail = this.smsData.mailarr;
			this.smsData.realMobile = this.smsData.inputarr;
			// 手机号 邮箱 校验
			let isPhone = true;
			let isEmail = true;
			let noticeEmail = '';
			let noticeMobile = '';
            let isPhoneFlag = true,isEmailFlag=true;
			if(this.smsData.checked2){
				this.smsData.realMail.forEach(item=>{
					if(!checkStr(item, "email")){
						isEmail = false;
					}
				});
                // this.smsData.realMail = this.smsData.mailarr.filter(item =>{
                //     return item!=''
                // })
                isEmailFlag = this.smsData.mailarr.some(item =>{ //至少填写一个邮箱号码
                    return item!=''
                })
			};
			if(this.smsData.checked1){
				this.smsData.realMobile.forEach(item=>{
					if(!checkStr(item, "mobile")){
						isPhone = false;
					}
				});
                // this.smsData.realMobile = this.smsData.inputarr.filter(item =>{
                //     return item!=''
                // })
                isPhoneFlag = this.smsData.inputarr.some(item =>{ //至少填写一个手机号
                    return item!=''
                })
			}
            if(!isPhoneFlag){
                this.$message({
					message: '请至少填写一个手机号码',
					type: 'error'
				});
				return
            }
            if(!isEmailFlag){
                this.$message({
					message: '请至少填写一个邮箱号码',
					type: 'error'
				});
				return
            }
			if((!isPhone&&this.smsData.checked1)||(!isEmail && this.smsData.checked2)){
				this.$message({
					message: '请输入正确的格式',
					type: 'error'
				});
				return
			};
            noticeEmail = this.smsData.realMail.toString()
            noticeMobile = this.smsData.realMobile.toString()

            if(this.smsData.radio==0){
               this.noticeFlag = 0
            }else{
                if(this.smsData.checked1&&this.smsData.checked2){
                    this.noticeFlag = 3
                }else if(this.smsData.checked1){
                    this.noticeFlag = 1
                }else if(this.smsData.checked2){
                    this.noticeFlag = 2
                }
            }
            
			fileUpload('/v1/account/securitiesFinance/updateAccountInfo',{
				PBAccount: this.$store.state.token,
				noticeFlag: this.noticeFlag, // 通知开关
				noticeEmail, // 通知邮箱
				noticeMobile, // 通知手机号
				opFlag:2, // 通知修改
				token: this.$store.state.token,
			}).then(res=>{
				this.$message.success("修改成功");
				this.isUpdata = false;
				// 更新用户信息
				this.getAccountInfo();
			}).catch(err=>{
                this.$message({
                    message:err.errorMsg || err.errorMessage,
                    type: 'error'
                })
            })
		},
		// 获取用户信息
        getAccountInfo(token){
            getAccountInfo({token,queryType:'1'}).then(res=>{
                this.$store.dispatch('set_userInfo',JSON.stringify(res));
            })
        },
		// 查询待处理数据
		queryService121(index) {
			queryService121({
				BusiCode: index
			}).then(res => {
				const { recordNum } = res;
				if (index == 0) {
					this.invitaTwodata[0].showNum = recordNum;
				} else if (index == 1) {
					this.invitaTwodata[1].showNum = recordNum;
				} else if (index == 2) {
					this.invitaTwodata[2].showNum = recordNum;
				}
			});
		},
        //切换是否通知
        changeRadio(e){
            this.smsData.radio = e
            if(e==1){
                this.smsData.checked1 = true
                this.smsData.checked2 = true
            }
        },
        changeCheck1(e){
            this.smsData.checked1 = e
            if(!this.smsData.checked1&&!this.smsData.checked2){
                this.smsData.radio = 0
            }
        },
        changeCheck2(e){
            this.smsData.checked2 = e
            if(!this.smsData.checked1&&!this.smsData.checked2){
                this.smsData.radio = 0
            }
        },
		// invChange
		invChange(index) {
			// console.log(index);
			this.multipleSelection = [];
			this.curinvIndex = index;
			this.$refs.eltable && this.$refs.eltable.clearSort();
			this.sorting = '';
			this.search.Status = '';
			this.search.StockCode = '';
			this.$refs.LazySelect && this.$refs.LazySelect.clearRegion();
			this.$emit('changeTitle',this.invitaTwodata[index]);
			if (index == 3) {
				this.queryService126();
				this.curinforIndex = 0;
			};
			if(index<3){
				this.queryService122(1);
                this.queryService122All()
			}
		},
		// 出借邀约组件选择数据
		lazyChange(data) {
			this.search.StockCode = data.region;
		},
		changeBody(switchoff) {
			if (!switchoff) {
				this.body.style.overflow = 'auto';
			} else {
				this.body.style.overflow = 'hidden';
			}
		},
		// 出借市场重置
		marketClear() {
			this.search = {
				StockCode: '', // 搜索代码
				Status: '' // 状态
			},
            this.$refs.LazySelect.clearRegion();
            this.queryService122(1);
		},
		// 通知模板change
		noticeChange() {
			this.$emit('openNotice',this.curinvIndex,this.invitaTwodata[this.curinvIndex]);
		},
		// 出借行情列表
		queryService122(page) {
			// this.tableData122 = [];
			this.loading = true;
			let PageNum = page ? page : this.PageNum;
			let data = {
				PageSize: this.PageSize,
				PageNum,
				BusiCode: this.curinvIndex
			};
			// 是否有搜索
			if (this.search.StockCode) {
				data.StockCode = this.search.StockCode;
			};
			// 状态搜索
			if(this.search.Status || this.search.Status === 0){
				data.Status = this.search.Status;
			};
			// data.Status = '';
			// 是否有排序
			if(this.sorting){
				data.OrderStr = this.sorting// 排序字段
			}else{
				data.OrderStr = ''; // 排序字段
			}
			queryService122({
				...data
			}).then(res => {
				this.loading = false;
				const { ItemList, ReplyHead } = res.data;
				this.ReplyHead = ReplyHead.HeadList;
				let newData = [];
				let newDataShow = [];
				ItemList.forEach((item1,index1) => {
					item1.ColumnList.forEach((item2,index2) => {
						if(newData[index1]){
							if(ReplyHead.HeadList[index2].ShowFlag == '1' || ReplyHead.HeadList[index2].ColumnName == 'SerialNo'){
								newDataShow[index1][item1.ColumnList[index2].ColumnName] = item1.ColumnList[index2].ColumnValue;
							};
							// newData[index1]['ShowFlag'] = ReplyHead.HeadList[index2].ShowFlag; // 设置是否显示
							newData[index1][item1.ColumnList[index2].ColumnName] = item1.ColumnList[index2].ColumnValue;
						}else{
							newData[index1] = {};
							newDataShow[index1] = {};
							if(ReplyHead.HeadList[index2].ShowFlag == '1' || ReplyHead.HeadList[index2].ColumnName == 'SerialNo'){
								newDataShow[index1][item1.ColumnList[index2].ColumnName] = item1.ColumnList[index2].ColumnValue;
							};
							newData[index1][item1.ColumnList[index2].ColumnName] = item1.ColumnList[index2].ColumnValue;
							// newData[index1]['ShowFlag'] = ReplyHead.HeadList[index2].ShowFlag; // 设置是否显示
						}
					});
				});
				this.tableData122 = newData;
				this.tableData122Show = newDataShow;
				this.recordNum = res.recordNum; // 总条数
				this.exportRadio = ReplyHead.FileFormat
                this.exportHeaderSet()
			}).catch(err=>{
				this.loading = false;
                this.$message({
                    message:err.errorMsg || err.errorMessage,
                    type: 'error'
                })
            })
		},
		// 条数变化
		handleSizeChange(val) {
			this.PageNum = 1; // 页数变1
			this.PageSize = val; 
			this.queryService122();

		},
		// 页数变化
		handleCurrentChange(val) {
			this.PageNum = val;
			this.queryService122();
		},
		// 获取通知模板列表
		queryService124(){
			this.loading = true;
			queryService124({
				PBAccount: this.$store.state.token,
				BusiCode: this.typeValue,
			}).then(res=>{
				this.loading = false;
				this.tableData124 = res.data[0].List;
				// 设置默认展示文件类型
				this.exportRadio = res.data[0].FileFormat;
				// 拖拽初始化
				this.$nextTick(() => {
					this.rowDrop2();
					this.columnDrop2();
				});
			}).catch(err=>{
				this.loading = false;
                this.$message({
                    message:err.errorMsg || err.errorMessage,
                    type: 'error'
                })
            })
		},
		// inforChange
		inforChange(index) {
			console.log(index);
			this.curinforIndex = index;
			if (index == 1) {
				this.queryService124();
			}else if(index == 0){
				this.queryService126();
			}
		},
		// 添加input
		addInput(type) {
			if (type == 1) {
				this.smsData.inputarr.push('');
			} else {
				this.smsData.mailarr.push('');
			}
		},
		// 删除input
		reduceInput(type,index) {
			if (type == 1) {
				if (this.smsData.inputarr.length < 2) {
					return;
				};
				this.smsData.inputarr.splice(index,1);
				this.smsData.realMobile.splice(index,1);
				
			} else {
				if (this.smsData.mailarr.length < 2) {
					return;
				};
				this.smsData.mailarr.splice(index,1);
				this.smsData.realMail.splice(index,1);
			}
		},
		notUpdata(type) {
			if (type == 1) {
				// console.log("通知方式设置");
				this.updateAccountInfo();
			} else {
				this.isUpdata = !this.isUpdata;
			}
		},
		// 拖拽
		rowDrop2() {
			const tbody = document.querySelector('.bus_table .el-table__body-wrapper tbody');
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
		// 拖拽
		columnDrop2() {
			const wrapperTr = document.querySelector('.bus_table .el-table__header-wrapper tr');
			if (!wrapperTr) {
				return;
			}
			this.sortable = Sortable.create(wrapperTr, {
				animation: 180,
				delay: 0,
				onEnd: evt => {
					const oldItem = this.dropCol[evt.oldIndex];
					this.dropCol.splice(evt.oldIndex, 1);
					this.dropCol.splice(evt.newIndex, 0, oldItem);
				}
			});
		}
	},
	mounted() {
		let body = document.querySelector('body');
		this.body = body;
	}
};
</script>
<style lang="scss">
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
			width: 1920px;
			height: 400px;
		}

		.bus_card {
			position: absolute;
			bottom: 0;
			width: 1400px;
			height: 130px;
			justify-content: center;

			.card_item {
				cursor: pointer;
				padding: 0 50px;
				width: 352px;
				height: 130px;
				justify-content: flex-start;
				box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
				background-position: center;
				background-repeat: no-repeat;
				border-radius: 10px;
				margin: 0 12px;
				background-image: url('../../../assets/bj_img2.png');

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
				background-image: url('../../../assets/bj_img1.png');
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
	width: 1400px;
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
.invitation {
	max-width: 1440px;
	width: 100%;
    min-width: 1280px;
    padding: 0 20px;
    box-sizing: border-box;
    justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 50px;

	.invitation_left {
		width: 166px;
		height: 200px;
		background: #ffffff;
		margin-right: 20px;
		display: flex;
		flex-direction: column;

		.left_item {
			position: relative;
			width: 130px;
			padding: 0 18px;
			height: 50px;
			font-size: 14px;
			color: #666666;
			border-left: 4px solid #ffffff;
			font-weight: 600;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			cursor: pointer;
			white-space:nowrap;
			overflow:hidden;
			text-overflow:ellipsis;

			.left_num {
				position: absolute;
				top: 2px;
				right: 4px;
				width: 18px;
				height: 18px;
				background: #c5181f;
				border-radius: 50%;
				color: #ffffff;
				font-size: 12px;
			}
		}

		.left_cur {
			background: rgba(197, 24, 31, 0.05);
			border-left: 4px solid #c5181f;
			color: #c5181f;
			width: 126px;

			.left_num{
				right: 0px;
			}
		}
	}

	.invitation_right {
		flex: 1;
        overflow: hidden;
		// background: #ffffff;
		.bus_content {
			width: 100%;
            box-sizing: border-box;
		}
		.bus_query {
			width: 100%;
            height: 136px;
            box-sizing: border-box;
		}

		.bus_table {
			width: 100%;
            box-sizing: border-box;
		}
		.bus_table3 {
			.common_title {
				width: 100%;
                box-sizing: border-box;
			}
			.common_title {
				margin: 30px 0 20px 0;

				& .in_btnarr {
					display: flex;
					justify-content: flex-start;
					right: 0;
					top: 0;
					position: absolute;
					font-size: 14px;
					color: #333333;
					font-weight: 400;
					& span {
						padding: 0 18px;
						height: 32px;
						background: #ffffff;
						border-radius: 4px;
						border: 1px solid #c5181f;
						margin-right: 20px;
						display: flex;
						justify-content: center;
						align-items: center;
						color: #c5181f;
						cursor: pointer;
					}
				}
			}
		}

		.informway {
			width: 100%;
			// height: 426px;
			background: #ffffff;

			.infor_nav {
				width: 100%;
				display: flex;
				justify-content: flex-start;
				background: #f8f9fc;

				.infor_item {
					width: 170px;
					height: 60px;
					background: #eeeff4;
					border-top: 4px solid #eeeff4;
					font-size: 16px;
					color: #333333;
					display: flex;
					justify-content: center;
					align-items: center;
					font-weight: 600;
					cursor: pointer;
				}
				.infor_item_cur {
					background: #ffffff;
					border-top: 4px solid #c5181f;
					color: #c5181f;
				}
			}

			.notice {
				width: 100%;
				height: auto;
				background: #ffffff;
				padding: 50px;
                box-sizing: border-box;
				.notice_item {
					margin-top: 26px;
					display: flex;
					justify-content: flex-start;

					.notice_type {
						display: flex;
						flex-direction: column;

						.SMS {
							display: flex;
							justify-content: flex-start;
							align-items: flex-start;

							& >>> span {
								font-weight: 600;
							}

							.no_input {
								& > div {
									margin-bottom: 18px;
								}

								.input {
									margin-left: 10px;
								}

								.input_add {
									cursor: pointer;
									width: 45px;
									height: 34px;
									background: #ffffff;
									border-radius: 4px;
									margin-left: 10px;
									border: 1px solid #e8e8e8;

									& img {
										width: 14px;
										height: 14px;
									}
								}
							}
						}
						.mail {
							display: flex;
							justify-content: flex-start;
							margin-top: 30px;
							.no_input {
								& > div {
									margin-bottom: 18px;
								}

								.input {
									margin-left: 10px;
								}

								.input_add {
									cursor: pointer;
									width: 45px;
									height: 34px;
									background: #ffffff;
									border-radius: 4px;
									margin-left: 10px;
									border: 1px solid #e8e8e8;

									& img {
										width: 14px;
										height: 14px;
									}
								}
							}
						}
					}
					.span_1 {
						margin-right: 15px;
						font-size: 14px;
						color: #333333;
						font-weight: 600;
					}
				}

				.not_submit {
					width: 100px;
					height: 36px;
					background: #c5181f;
					border-radius: 5px;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 14px;
					color: #ffffff;
					font-weight: 600;
					margin-left: 62px;
                    cursor: pointer;
				}
			}
			.template {
				width: 100%;
				height: 326px;
				background: #ffffff;
				padding: 50px;
                box-sizing: border-box;

				& p {
					margin: 15px 0;
					font-size: 14px;
					color: #333333;
					font-weight: 600;
					display: flex;
					justify-content: flex-start;
					& .span {
						width: 60px;
						justify-content: flex-end;
						display: flex;
						margin-right: 15px;
					}

					& .span2 {
						margin-right: 50px;
					}
				}
				.not_submit {
					width: 100px;
					height: 36px;
					background: #ffffff;
					border-radius: 5px;
					border: 1px solid #c5181f;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 14px;
					color: #c5181f;
					font-weight: 600;
					margin-top: 15px;
				}
			}

			.no_set {
				width: 100%;

				.index_intention {
					position: relative;

					.export_box {
						height: auto;
						overflow: hidden;
						align-items: flex-start;

						.business {
							margin: 30px 0;
							font-size: 14px;
							color: #333333;
							font-weight: 600;

							& span {
								margin-right: 15px;
							}
						}
					}
				}

				.in_btns {
					margin: 0;
				}

				.common_title {
					width: 100%;
					padding: 30px 0 12px 0;
				}
			}
		}
		.invitation_span {
			width: 100%;
			display: flex;
			// justify-content: space-between;
			justify-content: center;
			align-items: center;

			.inv_span1 {
				padding: 3px 1px;
				color: #c5181f;
				font-size: 14px;
				cursor: pointer;
			}

			.inv_span2 {
				padding: 3px 1px;
				color: #3a64b1;
				cursor: pointer;
				// margin-left: 6px;
			}
		}
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
	width: 1400px;
	.bus_query {
		height: 76px;
		background: #ffffff;
		width: 1340px;
		padding: 30px;

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
				margin-left: 14px;
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
					line-height: normal;
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
		width: 1400px;
		background: #ffffff;
		margin-top: 20px;
		padding: 30px 0;
		// padding: 0 30px;

		.common_title {
			width: 1340px;
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
	top: 0;

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
			height: 660px;
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
			margin-bottom: 50px;
		}
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
<style scoped>
    @media screen and(max-width:1400px){
         /deep/ .notice .el-select{
            width: 800px !important;
        } 
    }
    
</style>