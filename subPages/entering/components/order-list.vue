<template>
	<view class="list">
		<view class="order-list">
			<view class="item-box" v-for="(item,index) in list" :key="index">
				<OrderItem :item="item" :index="index" />
			</view>
		</view>
		<NoData class="no-data" />
	</view>
</template>

<script>
	import OrderItem from './order-item.vue'
	import NoData from '@/components/no-data/no-data.vue'
	export default {
		props: {
			list: {
				type: Array,
				require:true,
				default: () => [],
			}
		},
		components: {
			OrderItem,
			NoData,
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.list{
		padding: 0 30rpx;
	}
</style>
