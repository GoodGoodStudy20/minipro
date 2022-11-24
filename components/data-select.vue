<template>
	<view>
		<section class="select-box">
			<uni-data-select :clear="false" v-model="value" :localdata="list" @change="selectFun">
			</uni-data-select>
		</section>
	</view>
</template>

<script>
	export default {
		props:{
			list:{
				type:Array,
				require:true,
				default:() => []
			}
		},
		data() {
			return {
				value: 0,
			}
		},
		methods: {
			selectFun(e) {
				this.value = this.list[e]
				this.$emit('change', this.value)
				if (this.value.text === '自定义') {
					// this.isCustomDate = true
					return
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.select-box {
		position: relative;
		z-index: 13;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 16rpx 0 26rpx;
		// background-color: rgb(48, 51, 57);
		border: 1rpx solid #cccccc;
		border-radius: 20rpx;

		/deep/ .uni-stat__select {
			padding: 0;

			.uni-stat__actived {
				outline: none;
			}

			.uni-select {
				border: none;

				.uni-select__input-box {
					// min-height: 62rpx;

					.uni-select__input-text {
						width: 140rpx;
						// color: #ffffff;
					}

					// .uni-select__input-placeholder {
					// 	color: #ffffff;
					// }
				}

				.uni-select__selector {
					color: #000000;
					font-size: 12px;

					.uni-select__selector-item {
						padding: 0 2rpx;
					}
				}
			}
		}
	}
</style>
