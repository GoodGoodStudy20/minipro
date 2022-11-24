<template>
	<view>
		<header class="header">
			<view class="nav" v-for="(item, index) in navList" :key="index"
				:class="{navActive:currentNavListIndex===index}" @tap="changeNav(index)">
				{{item}}
			</view>
		</header>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentNavListIndex: 0,
				navList: ['录单管理', '订单分析'],
			}
		},
		methods: {
			// 切换头部
			changeNav(index) {
				this.currentNavListIndex = index
				this.$emit('change',index)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		display: flex;
		align-items: center;
		padding: 20rpx 30rpx;
		box-sizing: border-box;

		.nav {
			padding: 20rpx 0;
			margin-right: 40rpx;
			border-bottom: 2rpx solid transparent;

			&.navActive {
				border-bottom: 2rpx solid #007aff;
			}
		}
	}
</style>
