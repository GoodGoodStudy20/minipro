<template>
	<view class="seats">
		<view class="">
			<Header @change="headerChange" />
		</view>
		<view class="" v-show="headerStatus === 0">
			<Search @change="searchOrder" @change2="searchOrder2" />
			<OrderList :list="orderList" />
		</view>
		<view class="chart-box" v-if="headerStatus === 1">
			<ChartData />
		</view>
	</view>
</template>

<script>
  import{mapMutations} from 'vuex'
	import Header from './components/header.vue'
	import ChartData from './components/chart-data.vue'
	import Search from './components/search.vue'
	import OrderList from './components/order-list.vue'
	import {
		seaterList,
	} from '@/api/index/index.js'

	export default {
		components: {
			Header,
			ChartData,
			Search,
			OrderList,
		},
		data() {
			return {
				headerStatus: 0,
				pageNum: 1, // 
				pageSize: 10, // 
				orderList: [], // 订单数组
				search: '',
				total: 0, // 总条数
				date: '',
				startTime: '',
				endTime: '',
			}
		},
    onLoad(){
      this.$store.commit('setDate','')
    },
		onShow() {
			this.seaterListFun()
		},
		methods: {
      ...mapMutations(['setDate','setStarTime','setEndTime']),
			// 切换头部状态
			headerChange(e) {
				console.log(e)
				this.headerStatus = e
			},
			// 时间搜索
			searchOrder2(e) {
				this.date = ''
				this.startTime = ''
				this.endTime = ''
				console.log('时间', e)
				if (Array.isArray(e)) {
					// 自定义时间
					this.startTime = e[0].substring(0 ,10)
					this.endTime = e[1].substring(0 ,10)
          this.setStarTime(this.startTime)
          this.setEndTime(this.endTime)
          this.setDate('')
				} else {
					// 单个时间
					this.date = e
          this.setDate(this.date)
          this.setStarTime('')
          this.setEndTime('')
				}
				this.initData()
				this.seaterListFun()
			},
			// 名字搜索
			searchOrder(e) {
				console.log('名字', e)
				this.search = e
				this.initData()
				this.seaterListFun()
			},
			// 订单查询
			async seaterListFun() {
				const params = {
					date: this.date || '',
					startTime: this.startTime || '',
					endTime: this.endTime || '',
					search: this.search || '',
					pageNum: this.pageNum, // 页
					pageSize: this.pageSize, // 条数
				}
				try {

					const res = await seaterList(params)
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
					// console.log(this.orderList)
				} catch (error) {
					console.log('订单查询 error', error)
				}

			},
			// 搜索
			searchFun(e) {
				this.search = e
				this.initData()
				this.seaterListFun()
			},
			// 下拉刷新
			onPullDownRefresh() {
				if(this.headerStatus == 1) return
				this.initData()
				this.seaterListFun()
			},
			// 上拉加载
			onReachBottom() {
				if(this.headerStatus == 1) return
				++this.pageNum
				this.seaterListFun()
			},
			// 初始化数据
			initData() {
				this.pageNum = 1 // 页
			},
		}
	}
</script>

<style lang="scss" scoped>
	page,
	.seats {
		min-height: 100vh;
		background-color: $uni-bg-color-grey;
		overflow: auto;
		padding-bottom: env(safe-area-inset-bottom);
		box-sizing: border-box;

		.header {
			position: fixed;
			top: 0;
			left: 0;
			background-color: #ffffff;
			z-index: 3;
		}

		.content {
			margin-top: 200rpx;
			padding-bottom: 150rpx;
		}

		.chart-box {

			box-sizing: border-box;
			padding: 0 30rpx;
		}
	}
</style>
