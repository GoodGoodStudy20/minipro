<template>
	<view class="chart-data">
    <view class="Prickers-box">
      <view class="Prickers-title">
        月份筛选
      </view>
      <view class="Prickers-item">
        <Prickers :list="months" :monthIndex="monthIndex" @change="handlingDate" />
      </view>
    </view>
		<!-- 月份筛选
		<Prickers :list="months" :monthIndex="monthIndex" @change="handlingDate" /> -->
		<view class="order-box">
			<view class="order-item">
				<view class="top">
					{{ recordOrder }}
				</view>
				<view class="bottom">
					录单合计
				</view>
			</view>
			<view class="order-item">
				<view class="top">
					{{ allOrderNum }}
				</view>
				<view class="bottom">
					总单量
				</view>
			</view>
		</view>
		<view class="">
			<view class="chart-title">
				单量构成
			</view>
			<Chart v-if="chartPieList.length != 0" class="chart" :chartPie="chartPieList" />
			<view class="" v-else>
				暂无数据
			</view>
			<view class="chart-status">
				<view class="status-box" @tap="gotoDetails(6)">
					<view class="name">
						<view class="y"></view>
						已完成（{{ sucessOrder}}%）
					</view>
					<view class="number-box">
						{{ chartPieInfo.sucessOrder }}
						<image class="sj-right" src="../../../../static/images/sj-right.svg" mode=""></image>
					</view>
				</view>
				<view class="status-box" @tap="gotoDetails(0)">
					<view class="name">
						<view class="y"></view>
						进行中（{{progressOrder}}%）
					</view>
					<view class="number-box">
						{{ chartPieInfo.progressOrder }}
						<image class="sj-right" src="../../../../static/images/sj-right.svg" mode=""></image>
					</view>
				</view>
				<view class="status-box" @tap="gotoDetails(7)">
					<view class="name">
						<view class="y"></view>
						已退回（{{rebackOrder}}%）
					</view>
					<view class="number-box">
						{{ chartPieInfo.rebackOrder }}
						<image class="sj-right" src="../../../../static/images/sj-right.svg" mode=""></image>
					</view>
				</view>
				<!-- <view class="status-box" @tap="gotoDetails(4)">
					<view class="name">
						<view class="y"></view>
						已取消（{{cancelOrder}}%）
					</view>
					<view class="number-box">
						{{ chartPieInfo.cancelOrder }}
						<image class="sj-right" src="../../../../static/images/sj-right.svg" mode=""></image>
					</view>
				</view> -->
				<view class="status-box" @tap="gotoDetails(5)">
					<view class="name">
						<view class="y"></view>
						已失败（{{failureOrder}}%）
					</view>
					<view class="number-box">
						{{ chartPieInfo.failureOrder }}
						<image class="sj-right" src="../../../../static/images/sj-right.svg" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view class="monthly-comparison">
			<view class="title-box">
				<view class="title">
					月度对比
				</view>
				<view class="">
					<DataSelect :list="allOrder" @change="orderStatusFun" />
				</view>
			</view>

			<view class="">
				<ChartZ v-if="chartZ.length != 0" :chartZ="chartZ" />
				<view class="" v-else>
					暂无数据
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import Chart from '@/components/chart.vue'
	import ChartZ from '@/components/chart-z.vue'
	import Prickers from '@/components/picker/pickers.vue'
	import DataSelect from '@/components/data-select.vue'
	import {
		seaterPie,
		seaterTreeVo,
	} from '@/api/index/index.js'
	import {
		MOTHS
	} from '@/utils/data.js'
	export default {
		components: {
			Chart,
			ChartZ,
			Prickers,
			DataSelect,
		},
		data() {
			return {
				months: MOTHS,
				allOrder: [
					// 0-派单成功，1-派单失败，2-派单中,3-未派单，4-取消订单，5-订单失败，6-完成订单，7-订单退回
					{
						value: 0,
						text: "总单量",
						val: ''
					}, {
						value: 1,
						text: "已完成",
						val: 6
					}, {
						value: 2,
						text: "进行中",
						val: 0
					}, {
						value: 3,
						text: "已退回",
						val: 7
					}, 
          {
						value: 4,
						text: "已取消",
						val: 4
					}, 
          {
						value: 5,
						text: "已失败",
						val: 5
					}
				],
				month: '2022-06', // 当前月份
				status: '', // 柱状图状态 0.未支付,1.支付中,2.已支付,3.未接单,4.已接单,5.已完成,6.办理失败,7.取消订单,8.已退款,9.办理中,10.已办理,11.已退回 100 进行中
				chartPieInfo: {}, // 饼图
				chartPieList: [], // 饼图
				chartZ: [], // 柱状图
				recordOrder: 0, // 录单总量
				allOrderNum: 0, // 总单量
				sucessOrder: 0, // 已完成
				progressOrder: 0, // 进行中
				cancelOrder: 0, // 已取消				
				rebackOrder: 0, // 已退回
				failureOrder: 0, // 已失败
				monthIndex:0, // 月份
			};
		},
		mounted() {
			this.getMounth()
		},
		methods: {
			// 获取当前年月
			getMounth() {
				let nowDate = new Date();
				this.monthIndex =  nowDate.getMonth()
				let date = {
					year: nowDate.getFullYear(),
					month: nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1) : nowDate.getMonth(),
					date: nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate.getDate(),
				}
				let mdate = date.year + '-' + date.month			
				this.month = mdate
				this.seaterPieFun()
			},
			// 按照月份筛选
			handlingDate(e) {
				this.month = e.title
				this.seaterPieFun()
			},
			// 订单状态
			orderStatusFun(e) {
				console.log(e)
				this.status = e.val
				this.seaterTreeVoFun()
			},
			// 派单详情
			gotoDetails(status) {
				let currenctIndex2 = ''
				if (status == 4) {
					currenctIndex2 = 1
				}
				let url = ''
				if (status === '录单') {
					// url = '/pages/record-management/record-management'
				} else {
					url =
						`/pages/my/seats/my-order?currenctIndex=${status}&id=0&date=2022-06&currenctIndex2=${currenctIndex2}`
				}
				uni.navigateTo({
					url
				})
			},
			// 饼图
			async seaterPieFun() {
				try {
					const params = {
						date: this.month
					}
					const res = await seaterPie(params)
					this.seaterTreeVoFun()
					this.chartPieInfo = res
					if (!res || (!res.sucessOrder && !res.progressOrder && !res.recordOrder && !res.rebackOrder && !res
							.failureOrder)) {
						this.chartPieList = []
						this.allOrderNum = 0 // 总单量
						this.sucessOrder = 0 // 已完成
						this.progressOrder = 0 // 进行中
						this.recordOrder = 0 // 已取消
						this.rebackOrder = 0 // 已退回
						this.failureOrder = 0 // 已失败
						this.chartPieInfo = {
							cancelOrder:0,
							sucessOrder: 0,
							progressOrder: 0,
							recordOrder: 0,
							rebackOrder: 0,
							failureOrder: 0,
						}
						return
					}
					console.log('12****', this.chartPieList)
					// 录单合计
					this.recordOrder = res.recordOrder
					// 订单总量  progressOrder进行中  sucessOrder成功 cancelOrder取消 rebackOrder退回 failureOrder失败
					this.allOrderNum = Number(res.sucessOrder) + Number(res.progressOrder) + Number(res.cancelOrder) + Number(res.rebackOrder) + Number(res.failureOrder)
					// this.allOrderNum = Number(res.sucessOrder) + Number(res.progressOrder) + Number(res.rebackOrder) + Number(res.failureOrder)
					// 已完成
					this.sucessOrder = (Number(res.sucessOrder) / this.allOrderNum * 100).toFixed(2)
					// 进行中
					this.progressOrder = (Number(res.progressOrder) / this.allOrderNum * 100).toFixed(2)
					// 已取消 无此字段
					// this.cancelOrder = (Number(res.cancelOrder) / this.allOrderNum * 100).toFixed(2)
					// 已退回
					this.rebackOrder = (Number(res.rebackOrder) / this.allOrderNum * 100).toFixed(2)
					// 已失败
					this.failureOrder = (Number(res.failureOrder) / this.allOrderNum * 100).toFixed(2)
					// 饼图数据
					this.chartPieList = {
						series: [{
							data: [{
								"name": "已完成",
								"value": res.sucessOrder,
								"labelText": `已完成 ${res.sucessOrder}单`
							}, {
								"name": "进行中",
								"value": res.progressOrder,
								"labelText": `进行中 ${res.progressOrder}单`
							}, 
       //        {
							// 	"name": "已取消",
							// 	"value": res.recordOrder,
							// 	"labelText": `已取消 ${res.recordOrder}人`
							// }, 
              {
								"name": "已退回",
								"value": res.rebackOrder,
								"labelText": `已退回 ${res.rebackOrder}单`
							}, {
								"name": "已失败",
								"value": res.failureOrder,
								"labelText": `已失败 ${res.failureOrder}单`
							}]
						}]
					};
				} catch (e) {
					//TODO handle the exception
					console.log(e)
				}
			},
			// 柱状图
			async seaterTreeVoFun() {
				const params = {
					month: this.month,
					status: this.status
				}
				const res = await seaterTreeVo(params)
				if (!res || res.length == 0) {
					this.chartZ = []
					return
				}
				let arr1 = []
				let arr2 = []
				res.forEach((item, index) => {
					arr1.push(item.key)
					arr2.push(item.value)
				})
				this.chartZ = {
					categories: arr1,
					series: [{
						data: arr2
					}, ]
				};
			}
		}
	};
</script>

<style scoped lang="scss">
	.chart-data {
		padding-bottom: 100rpx;

		.chart-title {
			font-weight: bold;
			font-size: 34rpx;
		}

		.chart {
			width: 100%;
			height: 290rpx;
			margin-top: 30rpx;
		}

		.chart-status {
			.status-box {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 20rpx 0;

				.name {
					display: flex;
					align-items: center;

					.y {
						width: 30rpx;
						height: 30rpx;
						border-radius: 50%;
						background-color: blue;
						margin-right: 20rpx;
					}
				}

				.number-box {
					display: flex;
					align-items: center;

					.sj-right {
						width: 30rpx;
						height: 30rpx;
						margin-left: 20rpx;
					}
				}
			}
		}

		.order-box {
			display: flex;
			align-items: center;
			margin: 50rpx 0;

			.order-item {
				text-align: center;
				line-height: 50rpx;
				margin-right: 30rpx;
			}
		}

		.monthly-comparison {
			margin-top: 30rpx;

			.title-box {
				display: flex;
				flex-wrap: wrap;
				// align-items: center;
				// justify-content: space-between;

				.title {
					font-weight: bold;
					font-size: 34rpx;
				}
			}
		}
	}
  .Prickers-box{
    display: flex;
    .Prickers-item{
      padding-top: 4rpx;
      margin-left: -50rpx;
    }
  }
</style>
