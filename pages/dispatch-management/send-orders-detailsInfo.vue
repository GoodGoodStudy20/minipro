<template>
	<view class="send-orders-detailsInfo">
		<view class="order-item">
			<view class="license-plate-number">
				车牌号码 {{ userInfo.numberPlate || '--' }}
			</view>
			<view class="key-box">
				<text class="key">姓名 </text>：
				<text class="t">{{ userInfo.customerName || '--' }}</text>
			</view>
			<view class="key-box">
				<text class="key">取车时间 </text>：
				<text class="t">{{ userInfo.pickupTime || '--' }}</text>
			</view>
			<view class="key-box">
				<text class="key">取车地区 </text>：
				<text class="t">{{ userInfo.pickupArea || '--' }}</text>
			</view>
			<view class="key-box">
				<text class="key">详细地址 </text>：
				<text class="t">{{ userInfo.pickupAddress || '--' }}</text>
			</view>
			<view class="key-box">
				<text class="key">联系方式 </text>：
				<text class="t">{{ userInfo.customerPhone || '--' }}</text>
			</view>
			<view class="key-box">
				<text class="key">办理方式 </text>：
				<text
					class="t">{{ userInfo.handleWay ==0?'年审代办': userInfo.handleWay ==1?'检测站内代排队': userInfo.handleWay ==2?'专人上门代办':'--'}}</text>
			</view>
			<view class="key-box">
				<text class="key">备注 </text>：
				<text class="t">{{ userInfo.remark || '--' }}</text>
			</view>

		</view>
		<view class="driver-information">
			司机信息
		</view>
		<view class="screen-box">
			<view class="select-box">
				<view class="top" @tap="isSelect = !isSelect">
					<view class="select">
						{{selectValue}}
					</view>
					<image src="../../static/images/sj-bottom.svg" class="sj-bottom" mode=""></image>
				</view>

				<view class="options-list" v-show="isSelect">
					<text class="options" v-for="(item,index) in optionList" :key="index"
						@tap="changeSelect(item)">{{item.label}}</text>
				</view>
			</view>
			<!-- <image src="../../static/images/search.svg" class="search" mode=""></image> -->
		</view>
		<!-- 接单师傅 -->
		<view>
			<view class="order-item" v-for="(item,index) in driverList" :key="index"
				:class="{'checked-item':currenctIndex ===index}" @tap="currenctIndexFun(index)">
				<view class="license-plate-number">
					<view class="left">
						<view class="check" :class="{checked:currenctIndex ===index}">

						</view>
						<image src="../../static/images/avatar.svg" class="avatar" mode=""></image>
						{{item.name || '--'}}
						<view class="be-busy">
							<!-- {{item.status || '--'}} -->
							在线
						</view>
					</view>
					<view class="right overall">
            <text class="just">{{item.totalOrder ==0 ? '未接单':'进行中'+item.totalOrder}} </text>
            <text> {{'总单量'+item.successOrder}}</text>
						<!-- {{item.totalOrder ==0 ? '未接单':'进行中'+item.totalOrder}}&nbsp; &nbsp;{{'总单量'+item.successOrder}} -->
					</view>
				</view>
				<view class="key-box lr">
					<view class="handling-method">
						{{ item.type ==0 ?'代驾司机':item.type ==1 ?'站内代办人员':'' }}
					</view>
				</view>
				<view class="key-box lr">
					<text class="key fw">服务区域 ：</text>
					<text v-if="item.serviceArea">
						<text class="t" v-for="(area,index) in item.serviceArea.split(',')"
							:key="index">{{area}}<br></text>
					</text>
					<text v-else>{{item.nowArea}}</text>
				</view>
				<view class="key-box lr">
					<text class="key">联系方式 </text>：
					<text class="t">{{item.phone || '--'}}</text>
				</view>
			</view>
			<no-data class="no-data" />
		</view>
		<view class="distribute">
			<button type="primary" @tap="ImmediateDispatch"> {{ type ==2 ? '重新派单':type == 3?'立即派单':'' }}</button>
		</view>
	</view>
</template>

<script>
	import {
		getCustomerInfoById,
		areaMatch,
		dispatchOnlineOrder,
	} from '@/api/index/index.js'
	import NoData from '@/components/no-data/no-data.vue'
	export default {
		components: {
			NoData,
		},
		data() {
			return {
				isSelect: false,
				selectValue: '接单状态',
				optionList: [{
					value: '',
					label: '接单状态'
				}, {
					value: '1',
					label: '进行中'
				}, {
					value: '0',
					label: '未接单'
				}],
				currenctIndex: '',
				type: '', // 1 已派单  2 重新派单  3 去派单
				createrId: '',
				userInfo: {}, // 客户详情
				driverList: [], // 司机列表
				driverDetails: {}, // 当前司机
			};
		},
		onLoad(option) {
			// type 1 已派单  2 重新派单  3 去派单
			const {
				type,
				id,
				createrId
			} = option
			this.type = type
			this.createrId = createrId
			this.getCustomerInfoByIdFun(id)
			// console.log(1111111);
		},
		methods: {
			// 查询订单详情
			// 根据id查询
			async getCustomerInfoByIdFun(id) {
				const params = {
					id
				}
				const res = await getCustomerInfoById(params)
				this.userInfo = res
				// console.log('订单',res);
				this.areaMatch()
			},
			async areaMatch(status = '') {
				const res = await areaMatch({
					status,
					pickupArea: this.userInfo.pickupArea
				})
				this.driverList = []
				// console.log('司机',res);
				this.driverList = res
			},
			// 司机状态
			changeSelect(item) {
				this.selectValue = item.label
				this.isSelect = false
				this.areaMatch(item.value)
			},
			// 选择的司机
			currenctIndexFun(index) {
				if (this.currenctIndex === index) {
					this.currenctIndex = ''
				} else {
					this.currenctIndex = index
					this.driverDetails = this.driverList[index]
				}

			},
			// 立即派单
			async ImmediateDispatch() {
				if (!this.currenctIndex && this.currenctIndex !== 0) {
					return uni.showToast({
						icon: 'none',
						title: "请选择派单司机"
					})
				}
				console.log('立即派单')
				const params = {
					id: this.userInfo.id,
					orderNumber: this.userInfo.orderNumber,
					createrId: this.createrId,
					numberPlate: this.userInfo.numberPlate,
					// orderProcessType: this.type == 2 ? 23 : 24, // 重新派单 type 23
					zjcServiceStaffVO: {
						id: this.driverDetails.id,
						name: this.driverDetails.name,
						phone: this.driverDetails.phone,
					}
				}

				const res2 = await uni.$confirm('提示',
					`司机：${this.driverDetails.name} ——> ${this.userInfo.customerName}`)
				if (res2) {
					try {
						const res = await dispatchOnlineOrder(params)
						uni.navigateTo({
							url: `/pages/dispatch-management/send-orders-detailsInfo2?type=2&numberPlate=${this.userInfo.numberPlate}`
						})
					} catch (e) {
						//TODO handle the exception
					}

				}
			},
		},
		// onUnload(){
		// 	uni.navigateBack({
		// 		delta:1
		// 	})
		// },
	}
</script>

<style lang="scss" scoped>
	@import './send-orders-detailsInfo.scss'
</style>
