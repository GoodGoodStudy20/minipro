<template>
	<view class="order-item"  @tap="orderItemDetailsInfo(item)">
		<view class="top" :class="[
			item.orderStatus == 0 || item.orderStatus == 6 ? 'green': '', item.orderStatus == 1 || item.orderStatus == 4 || item.orderStatus == 5 || item.orderStatus == 7 ? 'yellow': '',
			item.orderStatus == 2? 'primary': '', item.orderStatus == 3 ? 'blue': '',
			]">
			<view class="driver-box">
				<view class="driver">
					司机
				</view>
				<view class="name-box">
					<text class="name">{{ item.driverName || '--' }}</text>
					<image src="../../../static/images/point_right.svg" class="point-right" mode=""></image>
					<text class="name">{{ item.licenseNumber || '--' }}</text>
				</view>
			</view>
			<text class="label" v-if="item.orderType ==3">未派单</text>
			<text class="label" v-if="item.orderType ==4">已接单</text>
			<text class="label" v-if="item.orderType ==7">取消订单</text>
			<text class="label" v-if="item.orderType ==11">联系客户中</text>
			<text class="label" v-if="item.orderType ==12">转单求助</text>
			<text class="label" v-if="item.orderType ==13">取车失败</text>
			<text class="label" v-if="item.orderType ==14">已联系客户</text>
			<text class="label" v-if="item.orderType ==15">已取车</text>
			<text class="label" v-if="item.orderType ==16">到达检测站</text>
			<text class="label" v-if="item.orderType ==17">检测成功</text>
			<text class="label" v-if="item.orderType ==18">检测失败</text>
			<text class="label" v-if="item.orderType ==19">还车中</text>
			<text class="label" v-if="item.orderType ==20">已还车</text>
			<text class="label" v-if="item.orderType ==21">等待接单</text>
			<text class="label" v-if="item.orderType ==22">取车中</text>
			<text class="label" v-if="item.orderType ==23">重新派单</text>
			<text class="label" v-if="item.orderType ==24">转派订单</text>
			<!-- // 0 派单成功 1 派单失败  2 派单中 3 未派单 4 取消订单 5 订单失败 6 订单完成 7 订单退回-->
			<!-- <view class="label" v-show="item.orderStatus ==0">
				派单成功
			</view>
			<view class="label" v-show="item.orderStatus ==1">
				派单失败
			</view>
			<view class="label" v-show="item.orderStatus ==2">
				派单中
			</view>
			<view class="label" v-show="item.orderStatus ==3">
				未派单
			</view>
			<view class="label" v-show="item.orderStatus ==4">
				取消订单
			</view>
			<view class="label" v-show="item.orderStatus ==5">
				订单失败
			</view>
			<view class="label" v-show="item.orderStatus ==6">
				订单完成
			</view>
			<view class="label" v-show="item.orderStatus ==7">
				订单退回
			</view>
			<view class="label" v-show="item.orderStatus ==8">
				取车失败
			</view> -->
		</view>

		<view class="key-box mt">
			<text class="key">客户姓名 </text>：
			<text>{{ item.customerName || '--' }}</text>
		</view>
		<view class="key-box">
			<text class="key">预约时间 </text>：
			<text>{{ item.pickupTime || '--' }}</text>
		</view>
		<view class="key-box">
			<text class="key">办理方式 </text>：
			<text>{{ item.manageWay ==0?'年审代办': item.manageWay ==1?'检测站内代排队': item.manageWay ==2?'专人上门代办':'--'}}</text>
		</view>
		<view class="time-box">
			<view class="time-image-box">
				<image src="../../../static/images/avatar.svg" class="time-image" mode=""></image>
				<text class="time">创建人</text>
				<text class="time sm">{{item.createrName || '--'}}</text>
			</view>

			<view class="sj-right-box" v-if="item.orderStatus == 7">
				<button size="mini" type="default" @tap.stop="orderItemDetailsInfo(item)">重新派单</button>
				<button size="mini" type="default" @tap.stop="cancelOrderFun(item)">取消订单</button>
			</view>
			<view class="sj-right-box" v-if="item.orderStatus == 4">
				<button size="mini" type="default" @tap.stop="orderItemDetailsInfo(item)">查看详情</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		cancelOrder
	} from '@/api/index/index.js'
	export default {
		props: {
			item: {
				type: Object,
				default () {
					return {}
				}
			},
		},
		data() {
			return {

			};
		},
		computed:{
			pTime(){
				console.log('ccc',this.item.pickupTime) 
			},
		},
		methods: {
			orderItemDetailsInfo(item) {
				uni.navigateTo({
					url: `/pages/my/seats/order-item-detailsInfo?numberPlate=${item.numberPlate}&id=${item.id}&createrId=${item.createrId}`,
				})
			},
			// 取消订单
			async cancelOrderFun(item) {
				try {
					const res = await uni.$confirm('提示', '您确定取消订单吗？')
					if (res) {
						const params = {
							id: item.orderId,
							offOrderReason: 16,
							cancelDescription: '管理员取消'
						}
						await cancelOrder(params)
						this.$emit('change')
					}
				} catch (e) {
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.order-item {
		position: relative;
		flex: 1;
		padding: 0 30rpx;
		border: 1rpx solid rgb(229, 232, 235);
		border-radius: 10rpx;
		margin-top: 40rpx;
		background-color: $uni-bg-color;
		overflow: hidden;

		.top {
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			background-color: $uni-color-primary;
			padding: 20rpx;
			color: $uni-text-color2;
			box-sizing: border-box;

			.label {
				font-size: $uni-font-size-sm12;
			}

			.driver-box {
				display: flex;
				align-items: center;

				.driver {
					padding: 2rpx 12rpx;
					background-color: #fb6f18;
					margin-right: 20rpx;
					border-radius: 8rpx;
					font-size: $uni-font-size-sm;
				}

				.name-box {
					display: flex;
					align-items: center;
					width: 400rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					// font-size: $uni-font-size-lg;

					.name {
						display: flex;
						align-items: center;
					}

					.point-right {
						display: block;
						margin: 0 10rpx;
						width: 80rpx;
						height: 40rpx;
					}
				}

			}

			&.blue {
				background-color: $uni-bg-color-theme;
			}

			&.green {
				background-color: $uni-color-success;
			}

			&.yellow {
				background-color: $uni-color-warning;
			}

			&.primary {
				background-color: $uni-color-primary;
			}

		}

		.key-box {
			display: flex;
			align-items: center;
			margin-top: 30rpx;
			font-size: $uni-font-size-base;

			&.mt {
				margin-top: 120rpx;
			}

			.key {
				min-width: 150rpx;
				text-align-last: justify;
				text-align: justify;
				text-justify: distribute-all-lines;
			}
		}

		.time-box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 20rpx 0 30rpx;

			.time-image-box {
				display: flex;
				align-items: center;

				.time-image {
					width: 40rpx;
					height: 40rpx;
					margin-right: 12rpx;
					// background-color: #808080;
					border-radius: 50%;
				}

				.time {
					font-size: $uni-font-size-sm;
					display: block;
					margin-right: 10rpx;

					&.sm {
						font-size: $uni-font-size-sm12;
					}
				}
			}

			.sj-right-box {
				display: flex;
				align-items: center;
			}

		}
	}
</style>
