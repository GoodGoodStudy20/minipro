<template>
	<view class="order-item" @tap="gotoDetails(item)">
		<view class="top">
			<view class="driver-box">
				<view class="name-box">
					<text class="name">{{ item.numberPlate || '--' }}</text>
          <text class="name orderonging" :class="{'lose':orderIng==='已失败','succeed':orderIng==='已完成','return':orderIng==='已退回','onging':orderIng==='进行中'}">{{orderIng}}</text>
				</view>
			</view>
		</view>
		<view class="bottom">
      <view class="">
			<text
				class="key">客户姓名
			</text>
      <text
      	class="handling-method value">:&nbsp;&nbsp;&nbsp;{{item.customerName || '--'}}
      </text>
      </view>
			<!-- <text class="status" v-if="item.orderProcessType ==3">未接单</text> -->
			<text class="status" v-if="item.orderProcessType ==3">未派单</text>
			<text class="status" v-if="item.orderProcessType ==4">已接单</text>
			<text class="status" v-if="item.orderProcessType ==7">取消订单</text>
			<text class="status" v-if="item.orderProcessType ==11">联系客户中</text>
			<text class="status" v-if="item.orderProcessType ==12">转单求助</text>
			<text class="status" v-if="item.orderProcessType ==13">取车失败</text>
			<text class="status" v-if="item.orderProcessType ==14">已联系客户</text>
			<text class="status" v-if="item.orderProcessType ==15">已取车</text>
			<text class="status" v-if="item.orderProcessType ==16">到达检测站</text>
			<text class="status" v-if="item.orderProcessType ==17">检测成功</text>
			<text class="status" v-if="item.orderProcessType ==18">检测失败</text>
			<text class="status" v-if="item.orderProcessType ==19">还车中</text>
			<text class="status" v-if="item.orderProcessType ==20">已还车</text>
			<text class="status" v-if="item.orderProcessType ==21">等待接单</text>
			<text class="status" v-if="item.orderProcessType ==22">取车中</text>
			<text class="status" v-if="item.orderProcessType ==23">重新派单</text>
			<text class="status" v-if="item.orderProcessType ==24">转派订单</text>
		</view>
		<view class="customerName">
      <text class="key">办理方式</text>
			<text class="way value">
			:&nbsp;&nbsp;&nbsp;{{ item.handleWay ==0?'年审代办': item.handleWay ==1?'检测站内代排队': item.handleWay ==2?'专人上门代办':item.handleWay ==3?'免上线年检':'--'}}
			</text>
		</view>
      <view class="DfailureReason" v-if="item.orderProcessType ==7||item.orderProcessType==13">
        <text class="key">异常原因:</text>
        <text class="way value DfailureReason-text">{{item.failureReason?item.failureReason:item.rebackReason?item.rebackReason:''}}</text>
      </view>
    <view class="driverName">
      <text class="key">接单司机</text>
      <text
      	class="value">:&nbsp;&nbsp;&nbsp;{{ item.driverName || '--' }}
      </text>
    </view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: () => {
					return {}
				},
				required: true,
			}
		},
    computed:{
      orderIng(){
        const over = [13,18]
        if(over.includes(this.item.orderProcessType)){
          return '已失败'
        }else if(this.item.orderProcessType==20){
          return '已完成'
        }else if(this.item.orderProcessType==7){
          return '已退回'
        }else{
          return '进行中'
        }
      }
    },
		data() {
			return {
     
			}
		},
		methods: {
			// 派单详情
			gotoDetails(item) {
				uni.navigateTo({
					url: `/pages/record-management/components/order-item-detailsInfo?numberPlate=${item.numberPlate}`,
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.order-item {
    padding: 28rpx;
		display: flex;
		flex-wrap: wrap;
		background-color: #FBFDFF;
		border-radius: 10rpx;
		overflow: hidden;
		margin: 40rpx 0;
    border: 1px solid #EEEEEE;
		.top {
			width: 100%;
			background-color: #FBFDFF;
			padding-bottom: 20rpx;
			color: #000;
      font-size: 15px;
      border-bottom: 0.5px solid #EEEEEE;
			.driver-box {
				display: flex;
				align-items: center;
				.name-box {
					display: flex;
          justify-content: space-between;
					align-items: center;
					width: 100%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					font-size: $uni-font-size-lg;
					.name {
						display: flex;
						align-items: center;
					}
          .orderonging{
           font-size: 12px; 
           padding: 4rpx 11rpx;
           border-radius: 6rpx;
           &.succeed{
            background-color: rgba(18, 221, 39, 0.1);
            color: #29C210;
           }
           &.lose{
            background-color: rgba(241, 79, 68, 0.1);
            color: #FA493D;
           }
           &.return{
            background-color: rgba(255, 131, 13, 0.1);
            color: #FF830D;
           }
           &.onging{
            background-color: rgba(50, 125, 253, 0.1);
            color: #327DFD;
           }
          }
					.point-right {
						display: block;
						margin: 0 10rpx;
						width: 80rpx;
						height: 40rpx;
					}
				}

			}
		}
		.bottom {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
      padding-top: 20rpx;
			.handling-method,
			.status {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.status {
				text-align: right;
        font-size: 14px;
				color: #FF830D;
			}
		}
		.customerName {
			width: 100%;
			padding: 16rpx 0rpx ;
			font-size: $uni-font-size-base;
		}
	}
  .driverName{
    width: 100%;
    padding: 0 0rpx 0rpx;
    font-size: $uni-font-size-base;
  }
  .key{
    font-size: 13px;
    color: #6d7479;
  }
  .value{
    color: #000;
    font-size: 13px;
  }
  .DfailureReason{
    display: flex;
    .key{
      white-space:nowrap;
    }
      &-text{
        color: red;
        margin-left: 14rpx;
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
      }
  }
</style>
