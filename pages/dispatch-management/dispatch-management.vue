<template>
	<view class="record-management">
		<view class="search-p">
			<search1 class="search" @change="searchFun" />
		</view>

		<view class="order-list">
			<view class="item-box" v-for="item in orderList" :key="item.id">
				<OrderItem :item="item" />
			</view>

		</view>
		<NoData class="no-data" />
	</view>
</template>

<script>
	import {
		orderRecordDispatchSearchPage
	} from '@/api/index/index.js'
	import NoData from '../../components/no-data/no-data.vue'
	import search1 from '../../components/search/search1.vue'
	import OrderItem from './components/order-item.vue'
	export default {
		components: {
			search1,
			OrderItem,
			NoData,
		},
		data() {
			return {
				pageNum: 1, // 
				pageSize: 10, // 
				orderList: [], // 订单数组
				orderStatus: '', // 订单状态
				search: '',
				total: 0, // 总条数
			};
		},

		onLoad() {
			this.orderRecordDispatchSearchPageFun()
		},
		onUnload(){uni.$off('handle');},
		onShow() {
			// 监听是否修改了数据
			uni.$on("handle", res => {
				uni.$off('handle');
				this.initData()
				this.orderRecordDispatchSearchPageFun()
			})

		},
		methods: {
			// 订单查询
			async orderRecordDispatchSearchPageFun() {
				const params = {
					search: this.search,
					pageNum: this.pageNum, // 页
					pageSize: this.pageSize, // 条数
				}
				try {

					const res = await orderRecordDispatchSearchPage(params)
					// console.log('派单',res);
					this.total = res.total
					if (this.pageNum != 1 && (this.orderList.length >= this.total)) {
						return
					}
					this.timer = setTimeout(() => {
						uni.stopPullDownRefresh();
						clearTimeout(this.timer);
					}, 1000);

					if (this.pageNum == 1) {
						this.orderList = []
					}
					if (!res.records || res.records.length < 1) return
					this.orderList = [...this.orderList, ...res.records]
				} catch (error) {
					console.log('订单查询 error', error)
				}

			},
			// 搜索
			searchFun(e) {
				this.search = e
				this.initData()
				this.orderRecordDispatchSearchPageFun()
				console.log(e, 11)
			},
			// 下拉刷新
			onPullDownRefresh() {
				this.initData()
				this.orderRecordDispatchSearchPageFun()
			},
			// 上拉加载
			onReachBottom() {
				++this.pageNum
				this.orderRecordDispatchSearchPageFun()

			},
			// 初始化数据
			initData() {
				this.pageNum = 1 // 页
			},
		},
	}
</script>

<style lang="scss" scoped>
	.record-management {
		background-color: $uni-bg-color-grey;
		padding-bottom: 50rpx;

		.search-p {
			position: fixed;
			width: 100%;
			box-sizing: border-box;
			background-color: #ffffff;
			z-index: 2;
			// top: 86rpx;
			padding: 10rpx 0;

			.search {
				width: 670rpx;
				margin: 0 auto;
			}
		}

		.order-list {
			padding: 80rpx 30rpx 30rpx;

			.item {
				display: flex;
				flex-direction: column;
				flex-wrap: wrap;
			}
		}
	}
</style>
