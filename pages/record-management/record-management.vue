<template>
	<view class="record-management">
		<search class="search" @change="searchFun" />
		<view class="order-list">
			<view class="item-box" v-for="(item,index) in orderList" :key="index">
				<OrderItem :item="item" />
			</view>
		</view>
		<NoData class="no-data" />
	</view>
</template>

<script>
	import NoData from '../../components/no-data/no-data.vue'
	import search from '../../components/search/search.vue'
	import OrderItem from './components/order-item.vue'
	import {
		orderRecordPage,
		getAllOrderInfoList,
    getAllCatalogueInfoList,
    getAllCatalogueInfoManageList
	} from '@/api/index/index.js'
	export default {
		components: {
			search,
			OrderItem,
			NoData,
		},
		data() {
			return {
        switchover:'',
				pageNum: 1, // 
				pageSize: 10, // 
				orderList: [], // 订单数组
				orderStatus: '', // 订单状态
				search: '',
				total: 0, // 总条数
				type:0,
				seaterId:'',
        time:'',
        startTime:'',
        endTime:'',
        handleWay:''
			};
		},
		onLoad(options) {
			const { type,seaterId, time,startTime,endTime,handleWay,switchover } = options
      this.switchover = switchover ||''
      this.time = time || ''
      this.startTime = startTime|| ''
      this.endTime = endTime|| ''
      // this.handleWay = handleWay || 1
      this.handleWay = handleWay || ''
      console.log('h',this.handleWay);
			this.type = type // 1 管理员
			this.seaterId = seaterId // 1 管理员		
			this.orderRecordPageFun()
		},
		onUnload() {
			uni.$off('handle');
		},
		onShow() {
			// 监听是否修改了数据
			uni.$on("handle", res => {
				uni.$off('handle');
				this.initData()
				this.orderRecordPageFun()
				// 清除监听				
			})
		},
		methods: {
			// 订单查询
			async orderRecordPageFun() {
				const params = {
					seaterId:this.seaterId || '', // 录单id
					search: this.search,
					pageNum: this.pageNum, // 页
					pageSize: this.pageSize, // 条数
          time:this.time,//单选日期
          startTime:this.startTime,
          endTime:this.endTime,
          handleWay:this.handleWay//警保
				}
				try {
					let res = null
          if(this.switchover==='0'){
            res = await getAllCatalogueInfoManageList(params)
          }else{
					if(this.type == 1){
						res = await getAllOrderInfoList(params)
					}else if(this.type == 2){
            res = await getAllCatalogueInfoList(params).catch(err=>err)
          }else{
            console.log('u',params);
						 res = await orderRecordPage(params)
					}
          }
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
				this.orderRecordPageFun()
			},
			// 下拉刷新
			onPullDownRefresh() {
				this.initData()
				this.orderRecordPageFun()
			},
			// 上拉加载
			onReachBottom() {
				++this.pageNum
				this.orderRecordPageFun()

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
		overflow: auto;

		.search {
			position: fixed;
			width: 100%;
			box-sizing: border-box;
			background-color: #ffffff;
			z-index: 2;
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
