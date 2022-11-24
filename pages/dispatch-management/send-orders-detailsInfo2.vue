<template>
	<view class="send-orders-detailsInfo pb">
		<view class="order-item">
			<view class="license-plate-number">
				车牌号码 {{ zjcCustomerInfo.numberPlate || '--' }}
			</view>
			<view class="key-box">
				<text class="key">姓名 </text>：
				<text class="t">{{ zjcCustomerInfo.customerName || '--' }}</text>
			</view>
			<view class="key-box">
				<text class="key">取车时间 </text>：
				<text class="t">{{ zjcCustomerInfo.pickupTime || '--' }}</text>
			</view>
			<view class="key-box">
				<text class="key">取车地区 </text>：
				<text class="t">{{ zjcCustomerInfo.pickupArea || '--' }}</text>
			</view>
			<view class="key-box">
				<text class="key">详细地址 </text>：
				<text class="t">{{ zjcCustomerInfo.pickupAddress || '--' }}</text>
			</view>
			<view class="key-box">
				<text class="key">联系方式 </text>：
				<text class="t">{{ zjcCustomerInfo.customerPhone || '--' }}</text>
			</view>
			<view class="key-box">
				<text class="key">办理方式 </text>：
				<text
					class="t">{{ zjcCustomerInfo.handleWay ==0?'年审代办': zjcCustomerInfo.handleWay ==1?'检测站内代排队': zjcCustomerInfo.handleWay ==2?'专人上门代办':'--'}}</text>
			</view>
			<view class="key-box">
				<text class="key">备注 </text>：
				<text class="t">{{ zjcCustomerInfo.remark || '--' }}</text>
			</view>

		</view>

		<!-- 接单师傅 -->
		<view>
			<view class="order-item">
				<view class="license-plate-number">
					<view class="left">
						<image src="../../static/images/avatar.svg" class="avatar" mode=""></image>
						{{zjcServiceStaffVO.name || '--'}}
						<view class="be-busy">
							在线
						</view>
					</view>

					<view class="right">
						{{orderProcessType}}
					</view>
				</view>
				<view class="key-box">
					<view class="handling-method">
						代驾司机
					</view>

				</view>
				<!-- <view class="key-box">
					<text class="key">服务区域 </text>：
					<text class="t">{{zjcServiceStaffVO.nowCity || '-'}}{{zjcServiceStaffVO.nowArea||'-'}}</text>
				</view> -->
			</view>
		</view>
		<view class="distribute">
			<button type="primary" @tap="close">关闭</button>
		</view>
	</view>
</template>

<script>
	import {
		getOrderMsgInfoById
	} from '@/api/index/index.js'
	export default {

		data() {
			return {
				type: 1, // type 1 首页进入 2 派单进入
				numberPlate: '', // 司机id
				detailsInfo: {}, // 派单详情
				zjcCustomerInfo: {}, // 客户信息详情
				zjcServiceStaffVO: {}, // 司机信息详情
			};
		},
		computed: {
			orderProcessType() {
				let str = '--'
				// 3.未接单,4.已接单11.联系客户中,12.转单求助,13.退回订单,14.已联系客户,15.已取车,16.到达检测站,17.检测成功,18.检测失败,19.还车中,20.已还车21.等待接单
				if (this.detailsInfo.orderProcessType == 3) {
					str = '未接单'
				} else if (this.detailsInfo.orderProcessType == 4) {
					str = '已接单'
				} else if (this.detailsInfo.orderProcessType == 11) {
					str = '联系客户中'
				} else if (this.detailsInfo.orderProcessType == 12) {
					str = '转单求助'
				} else if (this.detailsInfo.orderProcessType == 13) {
					str = '取车失败'
				} else if (this.detailsInfo.orderProcessType == 14) {
					str = '已联系客户'
				} else if (this.detailsInfo.orderProcessType == 15) {
					str = '到达检测站'
				} else if (this.detailsInfo.orderProcessType == 16) {
					str = '到达检测站'
				} else if (this.detailsInfo.orderProcessType == 17) {
					str = '检测成功'
				} else if (this.detailsInfo.orderProcessType == 18) {
					str = '检测失败'
				} else if (this.detailsInfo.orderProcessType == 19) {
					str = '还车中'
				} else if (this.detailsInfo.orderProcessType == 20) {
					str = '已还车'
				} else if (this.detailsInfo.orderProcessType == 21) {
					str = '等待接单'
				}
				return str
			},
		},
		onLoad(options) {
			this.type = options.type
			this.numberPlate = options.numberPlate
			this.getOrderMsgInfoByIdFun(this.numberPlate)
		},
		methods: {
			// 下拉刷新
			onPullDownRefresh() {
				this.getOrderMsgInfoByIdFun(this.numberPlate)
			},
			async getOrderMsgInfoByIdFun(numberPlate) {
				const res = await getOrderMsgInfoById({
					numberPlate
				})
				this.detailsInfo = res
				this.zjcCustomerInfo = res.zjcCustomerInfo
				this.zjcServiceStaffVO = res.zjcServiceStaffVO
				console.log(this.detailsInfo, this.zjcCustomerInfo, this.zjcServiceStaffVO)
				this.timer = setTimeout(() => {
					uni.stopPullDownRefresh();
					clearTimeout(this.timer);
				}, 1000);
			},
			// 立即派单
			close() {
				this.back()
			},
			// 返回上一页
			back() {
				let number = 1
				if (this.type == 1) {
					number = 1
				} else if (this.type == 2) {
					uni.$emit("handle", true);
					number = 2
				}
				uni.navigateBack({
					delta: number,
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import './send-orders-detailsInfo.scss'
</style>
