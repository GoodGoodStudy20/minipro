<template>
	<view class="search-box">
		<view class="wrapper">
			<view class="search">
				<image src="../../static/images/search.svg" class="search-img" mode=""></image>
				<input class="uni-input" v-model="searchKey" @input="searchKeyFun" placeholder="搜索条件，车主，司机姓名，车牌号，电话号码" />
			</view>
			<navigator url="/pages/record-management/detailsInfo?type=add" hover-class="none">
				<view class="add-user-box">
					<image src="../../static/images/add_user.svg" class="add-user" mode=""></image>
				</view>
			</navigator>
		</view>

	</view>
</template>

<script>
	export default {

		data() {
			return {
				searchKey: '', // 搜索内容
				timer: null,
			};
		},
		methods: {
			searchKeyFun() {
				clearTimeout(this.timer); //清除延迟执行
				this.timer = setTimeout(() => { //设置延迟执行
					this.$emit('change', this.searchKey)
					this.top()
				}, 500);

			},
			top() { //回到顶部
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			},

		}
	}
</script>

<style lang="scss" scoped>
	.search-box {
		padding: 10rpx 30rpx;

		.wrapper {
			display: flex;
			align-items: center;
			justify-content: space-between;


			.search {
				display: flex;
				align-items: center;
				width: 580rpx;
				height: 60rpx;
				// background: #f6f6f6;
				border: 1rpx solid #E6E6E6;
				border-radius: 30rpx;
				font-size: 32rpx;
				font-weight: 500;
				color: #000000;
				line-height: 60rpx;
				padding-left: 20rpx;

				.search-img {
					width: 30rpx;
					height: 30rpx;
					margin-right: 10rpx;
				}

				.uni-input {
					width: 500rpx;
				}
			}

		}

		.add-user-box {
			width: 50rpx;
			height: 50rpx;

			.add-user {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
