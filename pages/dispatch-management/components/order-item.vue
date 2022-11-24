<template>
	<view class="order-item">
		<view class="license-plate-number">
			{{ item.numberPlate || '--' }}
		<!-- 	<Times  v-if="item.orderStatus ==0 || item.orderStatus ==2" :endTime="item.endTime" class="times"></Times> -->
		</view>
		<view class="key-box">
			<text class="key">姓名 </text>：
			<text class="value">{{ item.customerName || '--' }}</text>
		</view>
		<view class="key-box">
			<text class="key">取车时间 </text>：
			<text class="value">{{ item.pickupTime || '--' }}</text>
		</view>
		<view class="key-box">
			<text class="key">取车地址 </text>：
			<text class="value">{{ item.pickupArea || '--' }}</text>
		</view>
		<view class="key-box">
			<text class="key">联系方式 </text>：
			<text class="value">{{ item.customerPhone || '--' }}</text>
		</view>
		<view class="key-box">
			<text class="key">备注 </text>：
			<text class="value">{{ item.remark || '--' }}</text>
		</view>
		<view class="time-box">
			<view class="time-image-box">
			</view>
			<!-- // 0-派单成功，1-派单失败，2-派单中,3-未派单，4-取消订单，5-订单失败，6-完成订单，7-订单退回,8转单求助-->
			<view class="">
				<button v-if="item.orderStatus ==0 || item.orderStatus ==2" type="default" size="mini" @tap="goDetailsInfo(1,item)">已派单</button>
				<button v-if="item.orderStatus ==6" type="default" size="mini">派单完成</button>
				<button v-if="item.orderStatus ==3" type="default" size="mini" class="send-orders"
					@tap="goDetailsInfo(3,item)">去派单</button>
				<button v-if="item.orderStatus ==7 || item.orderStatus ==8" type="warn"
					size="mini" @tap="goDetailsInfo(2,item)">重新派单</button>
			</view>

		</view>
	</view>
</template>

<script>
	// import Times from "@/components/times.vue";
	export default {
		components: {
			// Times,
		},
		props: {
			item: {
				type: Object,
				default () {
					return {

					}
				}
			},
		},
		data() {
			return {
				
			};
		},
		methods: {
			// 派单详情
			goDetailsInfo(type,item) {
				// type 1 已派单  2 重新派单  3 去派单
				let url = ''
				if (type == 1) {
					url = `/pages/dispatch-management/send-orders-detailsInfo2?type=1&numberPlate=${item.numberPlate}`
				} else {

					url = `/pages/dispatch-management/send-orders-detailsInfo?type=${type}&id=${item.id}&createrId=${item.createrId}`
				}
				uni.navigateTo({
					url
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.order-item {
		flex: 1;
		padding: 0 30rpx;
		border: 1px solid rgb(229, 232, 235);
		background-color: rgb(255, 255, 255);
		border-radius: 10rpx;
		margin-top: 20rpx;
		background-color: $uni-bg-color;

		.license-plate-number {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: $uni-font-size-lg;
			font-weight: bold;
			margin-top: 20rpx;

			.times {
				color: $uni-color-warning;
				font-size: $uni-font-size-sm;
			}
		}

		.key-box {

			display: flex;
			align-items: center;
			margin-top: 20rpx;
			font-size: $uni-font-size-base;

			.key {
				min-width: 150rpx;
				text-align-last: justify;
				text-align: justify;
				text-justify: distribute-all-lines;
			}

			.value {
				// color: $uni-text-color-grey;
				margin-left: 10rpx;
			}
		}

		.time-box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 20rpx 0 30rpx;

			.time-image-box {
				width: 1rpx;
				height: 1rpx;
			}

			.send-orders {
				background-color: $uni-color-primary;
				color: #ffffff;
			}

		}
	}
</style>
