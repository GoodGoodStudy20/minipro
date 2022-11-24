<template>
	<view class="order-item-details-box">
		<!-- 订单进度 -->
		<view class="progress-box">
			<view class="top">
				<text class="left">订单进度</text>
				<text class="right error"
					v-if="orderDeatilsInfo.orderType ==18">办理失败——{{orderType}}</text>
				<text class="right" v-else>{{orderType}}</text>
			</view>
			<view class="bottom">
				<view class="progress">
					<progress :percent="speedOfProgress" :activeColor="activeColor" active stroke-width="6" />
				</view>
				<text class="speed-of-progress">{{speedOfProgress}}%</text>
			</view>
		</view>
		<view class="order-item-details">
			<view class="license-plate-number">
				订单信息
			</view>
			<view class="key-box">
				<text class="key">订单编号:</text>
				<text class="value">{{ orderDeatilsInfo.orderNumber || '--' }}</text>
			</view>
			<view class="key-box">
				<text class="key">创建时间:</text>
				<text class="value">{{orderDeatilsInfo.createTime || '--' }}</text>
			</view>
			<!-- 3.未接单,4.已接单11.联系客户中,12.转单求助,13.退回订单,14.已联系客户,15.已取车,16.到达检测站,17.检测成功,18.检测失败,19.还车中,20.已还车21.等待接单 -->
			<view class="key-box">
				<text class="key">订单状态:</text>
				<text class="value">{{ orderType }}</text>
			</view>
			<view class="key-box"
				v-if="orderDeatilsInfo.orderType ==6 || orderDeatilsInfo.orderType==13 || orderDeatilsInfo.orderType==18">
				<text class="key">失败原因:</text>
				<text class="value error">{{orderDeatilsInfo.rebackReason || orderDeatilsInfo.failureReason || '-'}}</text>
			</view>
			<view class="key-box">
				<text class="key">车牌号码:</text>
				<text
					class="value">{{ orderDeatilsInfo.licensePlateArea  || '-' }}{{ orderDeatilsInfo.licenseNumber  || '-' }}</text>
			</view>
			<view class="key-box">
				<text class="key">客户姓名:</text>
				<text class="value">{{ orderDeatilsInfo.orderContact  || '--' }}</text>
			</view>
			<view class="key-box">
				<text class="key">联系方式:</text>
				<text class="value">{{ orderDeatilsInfo.contactPhone  || '--' }}</text>
			</view>
			<view class="key-box">
				<text class="key">办理方式:</text>
				<text
					class="value">{{ orderDeatilsInfo.manageWay ==0?'年审代办': orderDeatilsInfo.manageWay ==1?'检测站内代排队': orderDeatilsInfo.manageWay ==2?'专人上门代办':'--'}}</text>
			</view>
			<view class="key-box">
				<text class="key">车辆注册日期:</text>
				<text class="value">{{ orderDeatilsInfo.vehicleRegisterDate  || '--' }}</text>
			</view>
			<view class="key-box">
				<text class="key">年检到期时间:</text>
				<text class="value">{{ orderDeatilsInfo.reviewedExpireDate  || '--' }}</text>
			</view>
			<view class="key-box">
				<text class="key">预约取车时间:</text>
				<text class="value">{{ orderDeatilsInfo.subscribeGetTime  || '--' }}</text>
			</view>
			<view class="key-box">
				<text class="key">取车地区:</text>
				<text class="value">{{ orderDeatilsInfo.pickupArea  || '--' }}</text>
			</view>
			<view class="key-box">
				<text class="key">详细地址:</text>
				<text class="value">{{ orderDeatilsInfo.pickupAddress  || '--' }}</text>
			</view>
			<view class="key-box">
				<text class="key">备注:</text>
				<text class="value">{{ orderDeatilsInfo.remark  || '--' }}</text>
			</view>
			<view class="key-box">
				<text class="key">师傅留言:</text>
				<text class="value">{{ orderDeatilsInfo.driverComment  || '--' }}</text>
			</view>
			<view class="key-box">
				<text class="key">检测站:</text>
				<text class="value">{{orderDeatilsInfo.branchName || '--'}}</text>
			</view>
			<view class="key-box">
				<text class="key">检测费用（元）:</text>
				<text class="value">{{orderDeatilsInfo.checkMoney || '--'}}</text>
			</view>
			<view class="key-box">
				<text class="key slt">上传年检标:</text>
				<view class="yearly-inspection">
					<!-- 上传年检车标 -->
					<text style="width: 100%;text-align: right;color: #999999;"
						v-if="!orderDeatilsInfo.annualInspectionImage">--</text>
					<image @click="preivewImg(orderDeatilsInfo.annualInspectionImage)" :src="orderDeatilsInfo.annualInspectionImage" class="yearly-inspection-image"
						mode="aspectFit">
					</image>
				</view>
			</view>

		</view>
		<view class="">
			<view class="driver-information">
				司机信息
			</view>
			<view class="order-item">
				<view class="license-plate-number">
					<view class="left">
						<image src="../../../static/images/avatar.svg" class="avatar" mode=""></image>
						{{ orderDeatilsInfo.driverName || '--' }}
					</view>
				</view>
				<view class="key-box">
					<view class="handling-method">
						代驾司机
					</view>

				</view>
				<!-- <view class="key-box">
					<text class="key">服务区域 </text>：
					<text class="t">{{orderDeatilsInfo.pickupArea || '--'}}</text>
				</view> -->
			</view>
		</view>
		<view class="">
			<view class="vehicle-collection">
				<view class="top">
					取车资料<text class="tooltip">（车头照2张，接车单1张，接车里程表1张，行驶证1张）</text>
				</view>
				<view class="bottom-img">
					<view class="img-box">
						<image @click="preivewImg(orderDeatilsInfo.pickupOrderPhoto)" :src="orderDeatilsInfo.pickupOrderPhoto" class="img" mode="aspectFill"></image>
					</view>
					<view class="img-box">
						<image @click="preivewImg(orderDeatilsInfo.pickupFrontPhotoTwo)" :src="orderDeatilsInfo.pickupFrontPhotoTwo" class="img" mode="aspectFill"></image>
					</view>
					<view class="img-box">
						<image @click="preivewImg(orderDeatilsInfo.pickupDrivingLicensePhoto)" :src="orderDeatilsInfo.pickupDrivingLicensePhoto" class="img" mode="aspectFill"></image>
					</view>
					<view class="img-box">
						<image @click="preivewImg(orderDeatilsInfo.pickupOdometerPhoto)" :src="orderDeatilsInfo.pickupOdometerPhoto" class="img" mode="aspectFill"></image>
					</view>
					<view class="img-box">
						<image @click="preivewImg(orderDeatilsInfo.pickupFrontPhoto)" :src="orderDeatilsInfo.pickupFrontPhoto" class="img" mode="aspectFill"></image>
					</view>
				</view>
			</view>
			<view class="vehicle-collection">
				<view class="top">
					还车资料<text class="tooltip">（车头照2张，接车单1张，接车里程表1张，行驶证1张）</text>
				</view>
				<view class="bottom-img">
					<view class="img-box">
						<image @click="preivewImg(orderDeatilsInfo.returnOrderPhoto)" :src="orderDeatilsInfo.returnOrderPhoto" class="img" mode="aspectFill"></image>
					</view>
					<view class="img-box">
						<image @click="preivewImg(orderDeatilsInfo.returnFrontPhotoTwo)" :src="orderDeatilsInfo.returnFrontPhotoTwo" class="img" mode="aspectFill"></image>
					</view>
					<view class="img-box">
						<image @click="preivewImg(orderDeatilsInfo.returnDrivingLicensePhoto)" :src="orderDeatilsInfo.returnDrivingLicensePhoto" class="img" mode="aspectFill">
						</image>
					</view>
					<view class="img-box">
						<image @click="preivewImg(orderDeatilsInfo.returnOdometerPhoto)" :src="orderDeatilsInfo.returnOdometerPhoto" class="img" mode="aspectFill"></image>
					</view>
					<view class="img-box">
						<image @click="preivewImg(orderDeatilsInfo.returnFrontPhoto)" :src="orderDeatilsInfo.returnFrontPhoto" class="img" mode="aspectFill"></image>
					</view>
				</view>
			</view>
		</view>
		<PreviewImage ref="showRef" :urlList="''" />
		<view class="uni-btn-v"
			v-if="orderDeatilsInfo.orderStatus != 4 && (orderDeatilsInfo.orderType == 12 || orderDeatilsInfo.orderType == 13)">
			<view class="distribute close-btn">
				<button type="primary" @tap="orderItemDetailsInfo(orderDeatilsInfo)">重新派单</button>
			</view>
		</view>
		<view class="uni-btn-v" v-else>
	<!-- 		<view class="recording" v-if="orderDeatilsInfo.orderType == 3 || orderDeatilsInfo.orderType == 4 || orderDeatilsInfo.orderType == 11 || orderDeatilsInfo.orderType == 22 || orderDeatilsInfo.orderType == 23 || orderDeatilsInfo.orderType == 24"> -->
			<view class="recording" v-if="orderDeatilsInfo.orderType == 3 || orderDeatilsInfo.orderType == 4 || orderDeatilsInfo.orderType == 11 ||orderDeatilsInfo.orderType == 14 || orderDeatilsInfo.orderType == 21 || orderDeatilsInfo.orderType == 22 || orderDeatilsInfo.orderType == 23 || orderDeatilsInfo.orderType == 24">
				<button type="primary" @tap="orderItemDetailsInfo(orderDeatilsInfo)">转派订单</button>
			</view>
			<view class="distribute"
				:class="{'close-btn':orderDeatilsInfo.orderType != 3 && orderDeatilsInfo.orderType != 11 && orderDeatilsInfo.orderType != 21}">
				<button type="primary" form-type="submit" @tap="close">关闭</button>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		frontPageOrderDetails
	} from '@/api/index/index.js'
	import PreviewImage from '@/components/previewImage.vue'
	export default {
		components: {
			PreviewImage,
		},
		data() {
			return {
				orderDeatilsInfo: {}, // 订单详情
				speedOfProgress: 0, // 订单进度
				activeColor: '#007aff', // 进度条颜色
				orderType: '',
				id: '',
			};
		},
		onLoad(options) {
			this.numberPlate = options.numberPlate
			this.frontPageOrderDetailsFun()
		},
		methods: {
      preivewImg(index) {
        console.log(index);
        let indexA = []
        indexA.push(index)
          // 得到图片的数组
          // const imgUrls = this.goodsDetail.pics.map(item => {
          //   return item.pics_big
          // })
          // 进入大图的预览模式
          uni.previewImage({
            current: 0, // 默认显示图片的索引
            urls: indexA
          })
        },
			// 重新派单
			orderItemDetailsInfo(item) {
				if (item.orderType == 12 || item.orderType == 13) {
					uni.navigateTo({
						url: `/pages/dispatch-management/send-orders-detailsInfo?type=2&id=${item.customerId}&createrId=${item.createrId}`
					})
				} else {
					uni.navigateTo({
						url: `/pages/dispatch-management/send-orders-detailsInfo?type=3&id=${item.customerId}&createrId=${item.createrId}`
					})
				}
			},
			// 下拉刷新
			onPullDownRefresh() {
				this.frontPageOrderDetailsFun()
			},
			// 查询订单详情
			async frontPageOrderDetailsFun() {
				const params = {
					numberPlate: this.numberPlate
				}
				const res = await frontPageOrderDetails(params)
				this.orderDeatilsInfo = res
        console.log('user',this.$store.state.userInfo);
        // console.log('55555');
        // console.log('1',this.$store.state.userInfo);
        console.log('res1',res);
				this.speedOfProgressFun()
				let clear = setTimeout(function() {
					clearTimeout(clear)
					uni.stopPullDownRefresh();
				}, 1000);
			},
			speedOfProgressFun() {
				let speedOfProgress = 0 // 进度
				let str = '' // 状态
				// 3.未接单,4.已接单11.联系客户中,12.转单求助,13.退回订单,14.已联系客户,15.已取车,16.到达检测站,17.检测成功,18.检测失败,19.还车中,20.已还车21.等待接单 22 取车中
				if (this.orderDeatilsInfo.orderType == 3) {
					str = '未接单'
					speedOfProgress = 0
				} else if (this.orderDeatilsInfo.orderType == 4) {
					str = '已接单'
					speedOfProgress = 30
				} else if (this.orderDeatilsInfo.orderType == 11) {
					str = '联系客户中'
					speedOfProgress = 40
				} else if (this.orderDeatilsInfo.orderType == 12) {
					str = '转单求助'
					speedOfProgress = 0
				} else if (this.orderDeatilsInfo.orderType == 13) {
					str = '取车失败'
					speedOfProgress = 20
				} else if (this.orderDeatilsInfo.orderType == 14) {
					str = '已联系客户'
					speedOfProgress = 60
				} else if (this.orderDeatilsInfo.orderType == 15) {
					str = '已取车'
					speedOfProgress = 70
				} else if (this.orderDeatilsInfo.orderType == 16) {
					str = '到达检测站'
					speedOfProgress = 80
				} else if (this.orderDeatilsInfo.orderType == 17) {
					str = '检测成功'
					speedOfProgress = 87
				} else if (this.orderDeatilsInfo.orderType == 18) {
					str = '检测失败'
					speedOfProgress = 83
					this.activeColor = 'red'
				} else if (this.orderDeatilsInfo.orderType == 19) {
					str = '还车中'
					speedOfProgress = 90
				} else if (this.orderDeatilsInfo.orderType == 20) {
					str = '已还车'
					speedOfProgress = 100
				} else if (this.orderDeatilsInfo.orderType == 21) {
					str = '等待接单'
					speedOfProgress = 0
				} else if (this.orderDeatilsInfo.orderType == 22) {
					str = '取车中'
					speedOfProgress = 65
				} else if (this.orderDeatilsInfo.orderType == 23) {
					str = '重新派单'
					speedOfProgress = 0
				} else if (this.orderDeatilsInfo.orderType == 24) {
					str = '转派订单'
					speedOfProgress = 0
				}
				this.speedOfProgress = speedOfProgress
				this.orderType = str
			},
			// // 预览图片
			previewImageFuns() {
				this.$nextTick(function() {
					this.$refs.showRef.previewImageFun()
				})
			},
			// 关闭
			close() {
				this.back()
			},
			// 返回上一页
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import './order-item-detailsInfo.scss'
</style>
