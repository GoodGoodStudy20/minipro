<template>
	<view class="">
		<!-- 自定义时间 -->
		<view class="custom-date-pup" v-if="isCustomDate"></view>
		<view class="custom-date-box" v-if="isCustomDate">
			<view class="custom-date">
				<view class="example-body">
					<h3>请选择自定义时间</h3>
					<!-- <uni-datetime-picker v-model="datetimerange" type="datetimerange" rangeSeparator="至" /> -->
					<!-- 改动  type不需要时分 只需要年月日-->
					<uni-datetime-picker v-model="datetimerange" type="daterange" rangeSeparator="至" />
					<view class="uni-btn-v">
						<view class="recording">
							<button type="primary" form-type="reset" @tap="submitDate(0)">取消</button>
						</view>
						<view class="distribute">
							<button type="primary" form-type="submit" @tap="submitDate(1)">提交</button>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			isCustomDate: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				datetimerange: []
			}
		},
		methods: {
			submitDate(e) {
				if ((e == 1) && this.datetimerange && this.datetimerange.length === 0) {
					return uni.showToast({
						icon: 'none',
						title: '请选择自定义时间'
					})
				}else if(e == 0){
					console.log('111111111111111')
					this.datetimerange = ''
				}
				console.log('22222222222222',this.datetimerange)
				this.$emit('change', this.datetimerange)
			},
		}
	}
</script>

<style lang="scss" scoped>
	/* 自定义时间 */
	.custom-date-pup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(1, 1, 1, 0.8);
		z-index: 4;
	}

	.custom-date-box {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 5;
		padding: 0 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #000000;
		text-align: center;

		.example-body {

			background-color: #ffffff;
			border-radius: 10rpx;
			padding: 20rpx;

			h3 {
				margin: 30rpx 0 60rpx;
			}

			.uni-btn-v {
				background-color: $uni-bg-color;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 70rpx 0 30rpx;

				.recording,
				.distribute {
					width: 300rpx;
					height: 80rpx;
					display: inline-flex;
					box-sizing: border-box;

					button {
						width: 100%;
						height: 100%;
						line-height: 200%;
					}
				}

				.recording {
					/deep/ button {
						background: none;
						border: 1rpx solid #007aff;
						color: #007aff;
					}
				}

				.distribute {
					/deep/ button {
						background-color: #007aff;
					}
				}

			}
		}
	}
</style>
