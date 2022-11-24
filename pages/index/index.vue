<template>
	<view class="home">
    <view class="home-btn" @tap="gotoDistribute" v-if="role==1 || role == 2">
      <img class="img" src="../../static/images/finger.png" alt="">
      <text class="home-btn-text">快捷指派</text>
    </view>
   <view class="home-top">
     <image class="img" :src="carouselImgsVo[0]" mode="scaleToFill"></image>
    </view>
         <view class="list-box">
           <view class="list-box-left" @click="gotoRecord">
             <img class="img" :src="imgsVo[0]" mode=""></img>
             <button class="left-btn" type="default" @click.stop="through">快捷录单</button>
           </view>
           <view class="list-box-right">
             <view class="list-box-right-item" @click="goManagement">
               <img class="img" :src="imgsVo[1]" alt="" />
             </view>
             <view class="list-box-right-item">
               <img class="img" :src="imgsVo[2]" alt="" @click="goAbnormal"/>
             </view>
           </view>
         </view>
		<view class="order-message">
			订单消息
		</view>
		<view class="order-list">
			<view class="item-box" v-for="(item,index) in orderList" :key="index">
				<OrderItem :item="item" />
			</view>
		</view>
		<NoData class="no-data" />
	</view>
</template>

<script>
	import {
		frontPageOrderMsg,
    getCarouselImgUrl
	} from '@/api/index/index.js'
	import OrderItem from './components/order-item.vue'
	import NoData from '@/components/no-data/no-data.vue'
	export default {
		components: {
			OrderItem,
			NoData,
		},
		data() {
			return {
        carouselImgsVo:['http://192.168.2.86:8072/img46.png',"http://192.168.2.86:8072/img46.png"],
        imgsVo:['http://192.168.2.86:8072/img46.png',"http://192.168.2.86:8072/img46.png","http://192.168.2.86:8072/img46.png"],
				pageNum: 1, // 
				pageSize: 10, // 
				orderList: [], // 订单数组
				orderStatus: '', // 订单状态
				search: '',
				total: 0, // 总条数,
        role:uni.getStorageSync('userInfo').role
			}
		},
		onShow() {
			this.frontPageOrderMsgFun()
      this.setCarouselImgUrl()
      console.log('info',uni.getStorageSync('userInfo').role);
		},
		methods: { 
      goManagement(){
        //跳转合伙人分级
        uni.navigateTo({
        	url: '/navPages/management'
        })
      },
      //跳转异常场景
      goAbnormal(){
        uni.navigateTo({
        	url: '/navPages/abnormal'
        })
      },
      through(){
        uni.navigateTo({
        	url: '/pages/record-management/detailsInfo?type=add'
        })
      },
			// 订单查询
			async frontPageOrderMsgFun() {
				const params = {
					search: this.search,
					pageNum: this.pageNum, // 页
					pageSize: this.pageSize, // 条数
				}
				try {
					const res = await frontPageOrderMsg(params)
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
				this.frontPageOrderMsgFun()
			},
			// 下拉刷新
			onPullDownRefresh() {
				this.initData()
				this.frontPageOrderMsgFun()
			},
			// 上拉加载
			onReachBottom() {
				++this.pageNum
				this.frontPageOrderMsgFun()
			},
			// 初始化数据
			initData() {
        this.setCarouselImgUrl()
				this.pageNum = 1 // 页
			},
      //轮播图
    async setCarouselImgUrl(){
      const res = await getCarouselImgUrl()
      this.carouselImgsVo = res.carouselImgsVo
      this.imgsVo = res.imgsVo
      },
			// 录单管理
			gotoRecord() {
				uni.navigateTo({
					url: '/pages/record-management/record-management'
				})
			},
			// 派单管理
			gotoDistribute() {
				uni.navigateTo({
					url: '/pages/dispatch-management/dispatch-management'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	page,
	.home {
		background-color: #FBFBFB;
		overflow: auto;
		padding-bottom: env(safe-area-inset-bottom);
		box-sizing: border-box;
    &-top{
      height: 150px;
      padding: 0 30rpx;
      .img{
        border-radius: 16rpx;
        width: 100%;
        height: 100%;
      }
    }

		.order-message {
			padding: 20rpx 30rpx 0;
			font-size: $uni-font-size-base;
			color: $uni-text-color;
			font-weight: bold;
		}

		.order-list {
			padding: 0 30rpx;
			padding: 0 30rpx;
			margin-top: 20rpx;
		}
	}
  .list-box{
    padding:30rpx;
    display: flex;
    height: 256rpx;
    &-left{
      flex:47%;
      position: relative;
      margin-right: 20rpx;
      .img{
        width: 100%;
        height: 100%;
        border-radius: 20rpx;
      }
      .left-btn{
        position: absolute;
        bottom: 25rpx;
        left: 25rpx;
        width: 152rpx;
        height: 60rpx;
        font-size: 13px;
        padding: 0 20rpx;
        line-height: 60rpx;
        box-shadow: 0px 3px 6px rgba(199, 89, 19, 0.1);
      }
    }
    &-right{
      flex:42%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      &-item{
        width: 100%;
        height: 47%;
        .img{
          width: 100%;
          height: 100%;
          border-radius: 20rpx;
        }
      }
    }
  }
  .home-btn{
    width: 64px;
    height: 79px;
    background-color: #fff;
    box-shadow: 0 4px 6px rgba(10, 78, 196, 0.1);
    border-radius: 8px 0 0 8px;
    position: fixed;
    left:82.55vw;
    top: 48vh;
    white-space: nowrap;
    z-index: 999;
    margin-right: -50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .img{
      padding-top: 10rpx;
      width: 44px;
      height: 44px;
    }
    &-text{
      margin-top: 6rpx;
      color: #4B4B4C;
      font-size: 12px;
    }
  }
</style>
