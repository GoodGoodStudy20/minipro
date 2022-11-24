<template>
	<view class="order-item">
		<view class="top">
			<view class="left">
				<view class="avatar-box">
					<image class="avatar" src="@/static/images/avatar.svg" mode=""></image>
				</view>
				<view class="name">
					{{ item.seater }}
				</view>
				<view class="ranking" v-show="index<=4">
					NO.{{index + 1}}
				</view>
			</view>
			<view class="right">
				<text>{{ item.sucessOrder }}</text>单
			</view>
		</view>
		<view class="bottom">
			<view class="left">
				<view class="item" @tap="gotoDetails('录单')">
					<view class="number">
						{{ item.recordOrder }}
					</view>
					<view class="text">
						总单
					</view>
				</view>
				<view class="item" @tap="gotoDetails(0)">
					<view class="number">
						{{ item.progressOrder }}
					</view>
					<view class="text">
						进行中
					</view>
				</view>
				<view class="item" @tap="gotoDetails(7)">
					<view class="number">
						{{ item.rebackOrder }}
					</view>
					<view class="text">
						退回
					</view>
				</view>
				<view class="item" @tap="gotoDetails(5)">
					<view class="number">
						{{ item.failureOrder }}
					</view>
					<view class="text">
						失败
					</view>
				</view>
			</view>
			<view class="right" @tap="gotoDetails(6)">成功</view>
		</view>
	</view>
</template>

<script>
  import { mapState } from 'vuex'
	export default {
		props: {
			item: {
				type: Object,
				default: () => {},
				required: true,
			},
			index: {
				type: Number,
				default: 0,
				required: true,
			}
		},
		data() {
			return {
      switchover:uni.getStorageSync('switchover')||''
			}
		},
    
    computed: {
    	...mapState(['date','startTime','endTime']),
    },
		methods: {
			// 派单详情
			gotoDetails(status) {
				let url = ''
				if (status === '录单') {
					url = `/pages/record-management/record-management?type=2&seaterId=${this.item.seaterId}&time=${this.date}&startTime=${this.startTime}&endTime=${this.$store.state.endTime}&switchover=${this.switchover}`//ype 1 管理员? switchover 0司机 1合伙人
				} else {
        // console.log('1ss',this.date);
        // console.log('2ss',this.startTime);
        // console.log('3ss',this.endTime);
        // return
					url = `/subPages/entering/my-order?currenctIndex=${status}&id=${this.item.seaterId}&time=${this.date}&startTime=${this.startTime}&endTime=${this.$store.state.endTime}&switchover=${this.switchover}`
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
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		width: 100%;
		background-color: #FBFDFF;
		border-radius: 10rpx;
		overflow: hidden;
		margin: 40rpx 0;
		border: 1rpx solid rgb(229, 232, 235);
		padding: 20rpx;
		box-sizing: border-box;

		.top {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-weight: bold;
			padding: 20rpx 0;
			border-bottom: 1rpx solid #cccccc;

			.left {
				display: flex;
				align-items: center;

				.avatar-box {
					width: 50rpx;
					height: 50rpx;
					border-radius: 50%;
					overflow: hidden;
					margin-right: 30rpx;

					.avatar {
						width: 100%;
						height: 100%;
					}
				}

				.name {
					margin-right: 30rpx;

				}

				.ranking {
					color: orange;
					font-size: 40rpx;
				}
			}

			.right {
				color: blue;

				text {
					font-size: 40rpx;
				}
			}
		}

		.bottom {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 20rpx 0 0;

			.left {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 70%;

				.item {
					text-align: center;

					.number {
						margin-bottom: 20rpx;
					}
				}
			}

			.right {
				padding: 4rpx 16rpx;
				border: 1rpx solid blue;
				border-radius: 25rpx;
				color: blue;
			}
		}
	}
</style>
