<template>
	<view class="pup" @touchmove.stop.prevent="moveHandle">
		<view class="content">
			<view class="t-title">
				检测费用（元）
			</view>
			<input v-model="checkMoney" class="t-input" type="number">
			<view class="text">
				上传合格年间标
			</view>
			<view class="">
				<mk-upload :imgList="imgList" :maxChooseCount="1" :maxCount='1' column="4" @onDelete="onDelete"
					@onChoose="onChoose" />
			</view>
			<view class="btn-box">
				<view class="no" @tap="changePup('no')">
					取消
				</view>
				<view class="yes" @tap="changePup('yes')">
					确定
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		BASE_URL
	} from '@/config/config.js'
	import {
		successfulHandleOrder
	} from '@/api/index/index.js'
	export default {
		props: ['orderDetails'],
		name: "protocol-pop-up",
		data() {
			return {
				noClick: true,
				imgList: [],
				imgListServer: [],
				checkMoney: '',
				isTap: false,
			};
		},
		computed: {
			action() {
				return BASE_URL + '/swagger-system/uploadFile/batchUploadFile'
			}
		},
		methods: {
			async successfulHandleOrderFun() {
				const params = {
					annualInspectionImage: this.imgListServer[0], // 车标
					checkMoney: this.checkMoney,
					id: this.orderDetails.id,
					// numberPlate: this.orderDetails.numberPlate,
				}
				await successfulHandleOrder(params)
				uni.hideLoading();
				this.$emit('change', 'yes')
			},
			onDelete(index) {
				console.log(index)
				//删除成功回调后执行 只做演示
				uni.showLoading({
					title: '删除中'
				});
				this.imgList.splice(index, 1);
				wx.showToast({
					title: '删除成功',
					icon: 'success',
					duration: 1000
				});
			},
			upLoad() {
				if (!this.checkMoney) {
					this.isTap = false
					return wx.showToast({
						title: '请填写检测费用',
						icon: 'none',
						duration: 2000
					});
				}
				if (this.imgList.length !== 1) {
					this.isTap = false
					return wx.showToast({
						title: '请上传合格年检标',
						icon: 'none',
						duration: 2000
					});
				}
				uni.showLoading({
					title: '上传中'
				});
				uni.uploadFile({
					url: this.action,
					filePath: this.imgList[0],
					name: 'mfile',
					success: res => {
						let imgUrl = JSON.parse(res.data).data[0]
						this.imgListServer.push(imgUrl)
						this.successfulHandleOrderFun()
					},
					fail: e => {
						uni.showToast({
							title: '上传失败',
							icon: 'none'
						})
					},
					complete: err => {
						console.log(err)
					}
				})
			},
			onChoose(e) {
				//上传成功后回调执行push  只做演示
				uni.showLoading({
					title: '上传中'
				});
				setTimeout(() => {
					const tempFilePaths = e.tempFilePaths;
					this.imgList.push(tempFilePaths[0]);
					uni.hideLoading();
				}, 1000);
			},

			onPreviewTake(index) {
				wx.showActionSheet({
					itemList: ['预览图片', '删除图片'],
					success(res) {
						console.log(res.tapIndex)
					},
					fail(res) {
						console.log(res.errMsg)
					}
				})
			},
			changePup(e) {
				if (this.isTap) return
				if (e === 'yes') {
					this.isTap = true
					this.upLoad()
				} else {
					this.$emit('change', e)
				}

			},
			moveHandle() {},
		}
	}
</script>

<style lang="less" scoped>
	.pup {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: #333333;
		z-index: 999;
		display: flex;
		align-items: center;
		justify-content: center;

		.content {
			width: 670rpx;
			max-height: 1120px;
			background-color: #FFFFFF;
			border-radius: 60rpx;
			padding: 28rpx 46rpx 44rpx;
			margin: 0 40rpx;

			.t-title {
				margin: 30rpx 0;
			}

			.tooltip {
				color: #999999;
				font-size: 24rpx;
			}

			.t-input {
				border: 1rpx solid #c8c7cc;
				margin: 30rpx 0;
				padding: 20rpx 30rpx;
			}

			.annual-inspection-standard {
				.text {
					font-weight: bold;
					margin: 30rpx 0;
				}

				.annual {
					width: 200rpx;
					height: 200rpx;
					border: 1rpx solid #c8c7cc;
					margin-bottom: 30rpx;
				}
			}

			.btn-box {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 40rpx;

				.no,
				.yes {
					width: 280rpx;
					height: 84rpx;
					text-align: center;
					line-height: 84rpx;
					color: #FFFFFF;
					font-size: 32rpx;
					border-radius: 72rpx;
				}

				.no {
					background-color: #C4C4C4;
				}

				.yes {
					background-color: #42A4ED;
				}
			}
		}
	}
</style>
