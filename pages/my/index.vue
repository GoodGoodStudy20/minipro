<template>
	<view class="content">
		<view class="header">
			<view class="avatar-box">
      <image :src="detail_User.avatarUrl" mode="" style="width: 100rpx;height: 100rpx;border-radius:50%"></image>
				<!-- <image src="../../static/images/avatar.svg" class="avatar" mode=""></image> -->
			</view>
			<view class="userInfo-box">
				<view class="name">
					{{ userInfo.userName || '好有钱' }}
				</view>
				<view class="type">
					{{occupation[userInfo.roleId]}}
				</view>
			</view>

		</view>
    <view class="order-box">
      <view class="title-box">
        <text class="title">我的订单</text>
        <view class="contentbox">
          <view class="contentbox-item item-ing" @tap="allOrder(1)">
            <image src="../../static/images/file-history-line.svg" class="item-img" mode=""></image>
            <text class="contentbox-item-text">进行中</text>
            <text class="contentbox-item-num">{{totalOrderNumber.processOrders}}单</text>
          </view>
          <!-- 已完成 -->
          <view class="contentbox-item item-out" @tap="allOrder(2)">
            <image src="../../static/images/task-line.svg" class="item-img" mode=""></image>
            <text class="contentbox-item-text">已完成</text>
            <text class="contentbox-item-num">{{totalOrderNumber.finishOrders}}单</text>
          </view>
          <!-- 异常 -->
          <view class="contentbox-item item-off" @tap="allOrder(3)">
            <image src="../../static/images/file-warning-line.svg" class="item-img" mode=""></image>
            <text class="contentbox-item-text">异常单</text>
            <text class="contentbox-item-num">{{abnormal}}单</text>
          </view>
          <!-- 全部 -->
          <view class="contentbox-item item-all" @tap="allOrder(0)">
            <image src="../../static/images/stack-line.svg" class="item-img" mode=""></image>
            <text class="contentbox-item-text">全部订单</text>
            <text class="contentbox-item-num">{{allnum}}单</text>
          </view>
        </view>
      </view>
    </view>
    <view v-if="isRold" class="log-out-box" @tap="goDriver">
    	<view class="left">
    		<image src="../../static/images/order.svg" class="log-out" mode=""></image>
    		司机管理
    	</view>
    	<image src="../../static/images/sj-right.svg" class="log-out-right" mode=""></image>
    </view>
		<view v-if="isRold" class="log-out-box" @tap="goSeats">
			<view class="left">
				<image src="../../static/images/order.svg" class="log-out" mode=""></image>
				录单管理
			</view>
			<image src="../../static/images/sj-right.svg" class="log-out-right" mode=""></image>
		</view>
    <view v-if="isRold" class="log-out-box" @tap="goEntering">
    	<view class="left">
    		<!-- <image src="../../static/images/order.svg" class="log-out" mode=""></image> -->
    		<uni-icons type="compose" size="24" class="log-out"></uni-icons>
    		合伙人管理
    	</view>
    	<image src="../../static/images/sj-right.svg" class="log-out-right" mode=""></image>
    </view>
		<view v-if="isRold" class="log-out-box" @tap="goPrevent">
			<view class="left">
				<!-- <image src="../../static/images/order.svg" class="log-out" mode=""></image> -->
				<uni-icons type="staff" size="24" class="log-out"></uni-icons>
				警保柜员管理
			</view>
			<image src="../../static/images/sj-right.svg" class="log-out-right" mode=""></image>
		</view>
		<view class="log-out-box" @tap="logOut">
			<view class="left">
				<image src="../../static/images/log-out.svg" class="log-out" mode=""></image>
				退出登录
			</view>
			<image src="../../static/images/sj-right.svg" class="log-out-right" mode=""></image>
		</view>
	</view>
</template>
<script>
	import {
		totalNumberForSeater
	} from '@/api/index/index.js'
	export default {
		components: {

		},
		data() {
			return {
				userInfo: this.$store.state.userInfo,
        detail_User:{},
				totalOrderNumber: {},
        occupation:['','管理员','城市合伙人','业务员','坐席人员']
			}
		},
		computed: {
			isRold() {
				// if (this.$store.state.userInfo && this.$store.state.userInfo.roleId == 1) 
				if (this.$store.state.userInfo && (this.$store.state.userInfo.roleId == 1||this.$store.state.userInfo.roleId == 2)) 
        {
					return true
				} else {
					return false
				}
			},
      //异常数量
      abnormal() {
        return this.totalOrderNumber.failureOrders + this.totalOrderNumber.rebackOrders
      },
      //全部
      allnum() {
        return this.totalOrderNumber.failureOrders + this.totalOrderNumber.rebackOrders + this.totalOrderNumber.finishOrders + this.totalOrderNumber.processOrders
      }
		},
		onShow() {
      this.detail_User = uni.getStorageSync('detail_User').userInfo
      console.log(uni.getStorageSync('detail_User').userInfo.avatarUrl);
			this.totalNumberForSeaterFun()
		},
		methods: {
      // 司机管理
      goDriver() {
      	uni.navigateTo({
      		url: '/subPages/entering/index?index=0'
      	})
      },
			// 
			async totalNumberForSeaterFun() {
				const res = await totalNumberForSeater()
				this.totalOrderNumber = res
				let clear = setTimeout(function() {
					clearTimeout(clear)
					uni.stopPullDownRefresh();
				}, 1000);
			},
			// 下拉刷新
			onPullDownRefresh() {
				this.totalNumberForSeaterFun()
				console.log('下拉刷新')

			},
			// 上拉加载
			onReachBottom() {
				console.log('上拉加载')

			},
			// 全部订单
			allOrder(index) {
				uni.navigateTo({
					url: `/pages/my/my-order?currenctIndex=${index}`
				})
			},
			// 坐席管理
			goSeats() {
				uni.navigateTo({
					url: '/pages/my/seats/index'
				})
			},
			//警保柜员管理
			goPrevent() {
				uni.navigateTo({
					url: '/subPages/prevent/index'
				})
			},
      //城市合伙人管理
      goEntering() {
        uni.navigateTo({
        	url: '/subPages/entering/index?index=1'
        })
      },
			// 退出登录
			async logOut() {
				const res = await uni.$confirm('提示', '您确定退出登录吗？')
				if (res) {
					uni.clearStorage()
					uni.clearStorageSync()
					uni.reLaunch({
						url: '../login/index'
					})
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
page,
  .content {
    background-color: $uni-bg-color-grey;
    padding-bottom: env(safe-area-inset-bottom);
    box-sizing: border-box;

    .header {
      padding: 40rpx 30rpx;
      display: flex;
      align-items: center;
      background-color: $uni-bg-color;

      .avatar-box {
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
        // overflow: hidden;
        margin-right: 30rpx;
        // background-color: $uni-text-color-grey;

        .avatar {
          width: 100%;
          height: 100%;
        }
      }

      .userInfo-box {
        .name {
          font-size: $uni-font-size-lg;
          font-weight: bold;
        }

        .type {
          font-size: $uni-font-size-sm12;
          margin-top: 6rpx;
            }
      }

    }

    .log-out-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 40rpx 30rpx;
      margin-top: 20rpx;
      background-color: $uni-bg-color;

      .left {
        display: flex;
        align-items: center;
        font-size: $uni-font-size-sm;
        font-weight: bold;

        .log-out {
          display: block;
          margin-right: 20rpx;
          width: 30rpx;
          height: 30rpx;
        }
      }

      .log-out-right {
        width: 20rpx;
        height: 20rpx;
      }
    }
  }

  .userInfo-right {
    margin-left: 20px;
  }

  .item-img {
    width: 65rpx;
    height: 65rpx;
  }

  .order-box {
    padding: 20rpx 30rpx 0;
    margin-top: 20rpx;
    background-color: $uni-bg-color;

    .title-box {
      .title {
        font-size: 16px;
        font-weight: 700;
        padding-left: 30rpx;
      }

      .contentbox {
        display: flex;
        padding: 32rpx 0;

        .item-off {
          position: relative;

          &::before {
            position: absolute;
            margin-top: 25px;
            margin-left: 91px;
            height: calc(100% - 45px);
            width: 1px;
            background: #ccc;
            content: '';
          }
        }

        &-item {
          flex: 25%;
          display: flex;
          flex-direction: column;
          align-items: center;
          
          &-text {
            margin: 15rpx 0;
          }

          &-num {
            color: #999;
            font-size: 12px;
          }
        }
      }
    }
  }
  .item-all{
    margin-left: 35rpx;
  }
</style>
