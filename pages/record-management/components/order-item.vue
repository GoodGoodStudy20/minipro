<template>
	<view class="order-item" @tap="goDetailsInfo(item)">
		<view class="license-plate-number">
			{{ item.numberPlate || '--' }}
		</view>
		<view class="key-box">
			<text class="key">姓名 </text>：
			<text>{{item.customerName || '--' }}</text>
		</view>
		<view class="key-box">
			<text class="key">联系方式 </text>：
			<text>{{item.customerPhone || '--' }}</text>
		</view>
		<view class="key-box">
			<text class="key">备注 </text>：
			<text>{{item.remark || '--' }}</text>
		</view>
		<view class="time-box">
			<view class="time-image-box">
				<image src="../../../static/images/time-image.svg" class="time-image" mode=""></image>
				<text class="time">{{item.createTime.replace('T',' ') || '--' }}</text>
			</view>

			<view class="sj-right-box">
				<image src="../../../static/images/sj-right.svg" class="sj-image" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['item'],
		data() {
			return {

			};
		},
		methods: {
			// 录单管理详情
			goDetailsInfo(item) {
				uni.navigateTo({
					url: `/pages/record-management/detailsInfo?type=edit&id=${item.id}`
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
			font-size: $uni-font-size-lg;
			font-weight: bold;
			margin-top: 20rpx;
		}

		.key-box {

			display: flex;
			align-items: center;
			margin-top: 20rpx;
			font-size: $uni-font-size-base;

			.key {
				width: 150rpx;
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
				}

				.time {
					font-size: $uni-font-size-base;
				}
			}

			.sj-right-box {
				width: 30rpx;
				height: 30rpx;

				.sj-image {
					width: 100%;
					height: 100%;
				}
			}

		}
	}
</style>
