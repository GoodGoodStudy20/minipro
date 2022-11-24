<template>
	<view class="my-order">
		<view class="nav-box">
			<view class="nav" v-for="(item, index) in navList" :key="index" :class="{active:currenctIndex ===index}"
				@tap="currentIndexFun(item,index)">
				{{item.label}}
			</view>
		</view>

		<view class="search-box">
			<Search1 @change="searchFun" />
		</view>
		<view class="sub_title" v-if="orderStatus == 7 || orderStatus == 4 ">
			<view class="sub_nav" v-for="(item, index) in navList2" :key="index"
				:class="{active:currenctIndex2 ===index}" @tap="currentIndexFun2(item,index)">
				{{item.label}}
			</view>
		</view>
		<view class="order-list">
			<view class="item-box" v-for="item in orderList" :key="item.id">
				<Order2 :item="item" @change="cancelFun" />
			</view>

		</view>
		<NoData class="no-data" />
	</view>
</template>

<script>
	import NoData from '@/components/no-data/no-data.vue'
	import Search1 from '@/components/search/search1.vue'
	import {
		getAllCatalogueInfoList,
    getAllCatalogueInfoManageList
	} from '@/api/index/index.js'
	import Order2 from './components/order-item2.vue'
	export default {
		components: {
			Order2,
			Search1,
			NoData,
		},
		data() {
			return {
        switchover:uni.getStorageSync('switchover')||'',
				currenctIndex: 0,
				currenctIndex2: 0,
				navList: [
					// 0 派单成功 1 派单失败  2 派单中 3 未派单 4 取消订单 5 订单失败 6 订单完成 7 订单退回
					// {
					// 	value: 0,
					// 	label: '全部',
					// 	val:''
					// },
					{
						value: 1,
						label: '进行中',
						val: 0
					},
					{
						value: 2,
						label: '已完成',
						val: 6
					},
					{
						value: 3,
						label: '已退回',
						val: 7
					}, {
						value: 4,
						label: '已失败',
						val: 5
					},
				],
				navList2: [
					// 0 派单成功 1 派单失败  2 派单中 3 未派单 4 取消订单 5 订单失败 6 订单完成 7 订单退回
					{
						value: 0,
						label: '重新派单',
						val: 7
					},
					{
						value: 1,
						label: '取消订单',
						val: 4
					},
				],
				pageNum: 1, // 
				pageSize: 10, // 
				orderList: [], // 订单数组
				orderStatus: '', // 订单状态
				search: '',
				total: 0, // 总条数
				id: '', // 坐席 id 
				date: '', // 月份筛选
        time : '',
        startTime : '',
        endTime : ''
			};
		},
		onLoad(options) {
			const {
				currenctIndex,
				id,
				date, // 月份筛选
				currenctIndex2,
        time,
        startTime,
        endTime
			} = options
			this.currenctIndex = Number(currenctIndex)
      this.time = time || ''
      this.startTime = startTime || ''
      this.endTime = endTime || ''
			this.id = id
			this.date = date || ''
			this.orderStatus = this.currenctIndex
			if (currenctIndex2) {
				// 饼图进来控制 二级菜单样式
				this.currenctIndex2 = Number(currenctIndex2)
			}
			this.orderStatusFun(this.currenctIndex)
			// 订单查询
			this.getAllOrderInfoListFun()
		},
		onUnload() {
			uni.$off('handle');
		},
		onShow() {
			// 监听是否修改了数据
			uni.$on("handle", res => {
				uni.$off('handle');
				this.initData()
				this.getAllOrderInfoListFun()
			})

		},
		methods: {
			// 取消订单回调
			cancelFun() {
				// 订单查询
				this.getAllOrderInfoListFun()
			},
			top() { //回到顶部
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			},
			// tab
			currentIndexFun(item, index) {

				this.currenctIndex = index
				// 0 派单成功 1 派单失败  2 派单中 3 未派单 4 取消订单 5 订单失败 6 订单完成 7 订单退回
				// 处理订单状态
				this.orderStatus = item.val
				if (this.orderStatus == 7) {
					this.currenctIndex2 = 0
				}
				this.initData()
				this.getAllOrderInfoListFun()
				this.top()
			},
			currentIndexFun2(item, index) {
				this.currenctIndex2 = index
				// 0 派单成功 1 派单失败  2 派单中 3 未派单 4 取消订单 5 订单失败 6 订单完成 7 订单退回
				// 处理订单状态
				this.orderStatus = item.val
				this.initData()
				this.getAllOrderInfoListFun()
				this.top()
			},
			// 处理订单状态
			orderStatusFun(index) {
				if (index == 0) {
					this.currenctIndex = 0
				} else if (index == 6) {
					this.currenctIndex = 1
				} else if (index == 4 || index == 7) {
					this.currenctIndex = 2
				} else if (index == 5) {
					this.currenctIndex = 3
				}
			},
			// 订单查询
			async getAllOrderInfoListFun() {
				const params = {
					date: this.date, // 月份筛选
					seaterId: this.id,
					search: this.search,
					orderStatus: this.orderStatus, // 订单状态
					pageNum: this.pageNum, // 页
					pageSize: this.pageSize, // 条数
          startTime:this.startTime,
          endTime:this.endTime
				}
				try {
          let res
          if(this.switchover === '0'){
            params.date = this.time?this.time:this.date
            // console.log(params);
           res = await getAllCatalogueInfoManageList(params)
          }else{
           params.date = this.time?this.time:this.date
					 res = await getAllCatalogueInfoList(params)
          }
          // if(res.code != 200) return  uni.showToast({
          //    title: res.msg,
          //    icon: 'error',
          //    duration: 2000
          //  })
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
				this.getAllOrderInfoListFun()
			},
			// 下拉刷新
			onPullDownRefresh() {
				this.initData()
				this.getAllOrderInfoListFun()
			},
			// 上拉加载
			onReachBottom() {
				++this.pageNum
				this.getAllOrderInfoListFun()
			},
			// 初始化数据
			initData() {
				this.pageNum = 1 // 页
			},
		}
	}
</script>

<style lang="scss" scoped>
	.my-order {
		padding-bottom: env(safe-area-inset-bottom);
		box-sizing: border-box;

		.nav-box {
			position: fixed;
			width: 100%;
			box-sizing: border-box;
			z-index: 3;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 20rpx 30rpx 10rpx;
			background-color: $uni-bg-color;

			.nav {
				font-size: $uni-font-size-base;
				padding-bottom: 16rpx;
				border-bottom: 4rpx solid $uni-bg-color;

				&.active {
					border-bottom: 4rpx solid $uni-color-primary;
					transition: all .3s ease;
				}
			}
		}

		.sub_title {
			display: flex;
			align-items: center;
			padding: 20rpx 30rpx 10rpx;
			background-color: $uni-bg-color;

			.sub_nav {
				font-size: $uni-font-size-base;
				padding-bottom: 16rpx;
				border-bottom: 4rpx solid $uni-bg-color;
				margin-right: 30rpx;

				&.active {
					border-bottom: 4rpx solid $uni-color-primary;
					transition: all .3s ease;
				}
			}
		}

		.search-box {
			padding: 110rpx 30rpx 0;
		}

		.order-list {
			padding: 0 30rpx;
		}

		.no-data {
			display: block;
			margin: 30rpx 0;
			padding-bottom: 30rpx;
		}
	}
</style>
