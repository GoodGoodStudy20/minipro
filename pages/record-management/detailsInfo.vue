<!-- 本示例未包含完整css，获取外链css请参考上文，在hello uni-app项目中查看  userId-->
<template>
	<view class="detailsInfo">
		<view class="form-box">
			<form :value="formData" @submit="formSubmit" @reset="formReset">
				<view class="uni-form-item" v-if="type === 'edit' && orderStatus != 6">
					<view class="required"></view>
					<view class="right">
						<view class="title essential-information">基本信息</view>
						<view class="edit" @click="[type = 'add',isPup=true]">
							修改
						</view>
					</view>
				</view>
				<view class="uni-form-item" name="name" v-if="type === 'edit'||isPup">
					<view class="required">
						<image src="../../static/images/required.svg" class="required-img" mode=""></image>
					</view>
					<view class="right">
						<view class="title">订单编号：</view>
						<input class="uni-input" v-model="formData.orderNumber" disabled placeholder="请输入姓名" />
					</view>
				</view>
				
				<view class="uni-form-item" name="name">
					<view class="required">
						<image src="../../static/images/required.svg" class="required-img" mode=""></image>
					</view>
					<view class="right">
						<view class="title">姓名：</view>
						<input class="uni-input" v-model="formData.name" placeholder="请输入姓名" />
					</view>
				</view>
				<view class="uni-form-item" name="phone">
					<view class="required">
						<image src="../../static/images/required.svg" class="required-img" mode=""></image>
					</view>
					<view class="right">
						<view class="title">联系电话：</view>
						<input class="uni-input" v-model="formData.phone" type="number" placeholder="请输入电话号码" />
					</view>
				</view>
				<view class="uni-form-item" name="handlingMethod">
					<view class="required">
						<image src="../../static/images/required.svg" class="required-img" mode=""></image>
					</view>
					<view class="right">
						<view class="title">办理方式：</view>
						<view class="rt" style="font-size: 12px;">
              <!-- 1站内 2上门 -->
							<Prickers @handlingMethod="handlingMethod" :monthIndex="formData.handlingMethod"/>
							<image src="../../static/images/sj-right.svg" class="sj-bottom" mode=""></image>
						</view>
					</view>
				</view>
				<view class="uni-form-item" name="licensePlate">
					<view class="required">
						<image src="../../static/images/required.svg" class="required-img" mode=""></image>
					</view>
					<view class="right" @click="onshow">
						<view class="title">车牌号码：</view>
						<!-- <input class="uni-input" v-model="formData.licensePlate" placeholder="例如 京A12345" /> -->
						<!-- <span>{{$store.state.carNumbe}}</span> -->
						<input disabled readonly class="uni-input" :value="carNumber" placeholder="例如 京A12345" />
						<!-- <span>{{$store.state.carNumber}}</span> -->
					</view>
				</view>
				<view class="uni-form-item uni-form-item-time" name="vehicleRegistrationDate" v-if="formData.handlingMethod ==2">
					<view class="required"></view>
					<view class="right">
						<view class="title">车辆注册日期：</view>
						<view class=""></view>
						<view class="rt">
							<uni-datetime-picker type="date" v-model="formData.vehicleRegistrationDate"
								@change="vehicleRegistrationDateFun($event)" />
							<image src="../../static/images/sj-right.svg" class="sj-bottom" mode=""></image>
						</view>
					</view>
				</view>
				<view class="uni-form-item uni-form-item-time" name="expirationTime" v-if="formData.handlingMethod ==2">
					<view class="required"></view>
					<view class="right">
						<view class="title">年检到期时间：</view>
						<view class="rt">
							<uni-datetime-picker type="date" v-model="formData.expirationTime"
								@change="expirationTimeFun($event)" />
							<image src="../../static/images/sj-right.svg" class="sj-bottom" mode=""></image>
						</view>
					</view>
				</view>
				<view class="uni-form-item" name="licensePlateAddress" v-if="formData.handlingMethod !=3">
					<view class="required alf">
						<image src="../../static/images/required.svg" class="required-img" mode=""></image>
					</view>
					<view class="right">
						<view class="title alf" v-if="formData.handlingMethod !=1">上门取车地址：</view>
						<view class="title alf" v-else>区域选择：</view>
						<view class="rt">
							<Address :checks="checks" @getAddress="getAddress" :defaultValue1="defaultValueceode" :licensePlateAddress="formData.licensePlateAddress" />
							<image src="../../static/images/sj-right.svg" class="sj-bottom" mode=""></image>
						</view>
					</view>
				</view>
				<view class="uni-form-item" name="name" v-if="formData.handlingMethod ==2">
					<view class="required">
						<image src="../../static/images/required.svg" class="required-img" mode=""></image>
					</view>
					<view class="right">
						<view class="title">详细地址：</view>
						<input class="uni-input" v-model="formData.pickUpDddress" placeholder="请输入详细地址" />
					</view>
				</view>
          <view class="monitoring-station uni-form-item" v-if="formData.handlingMethod ==1">
            <view class="title">选择检测站：</view>
          	<picker @change="bindPickerChange" :value="index" :range="monitoringStationArray"
          		:range-key="'branchName'" class="picker" v-if="monitoringStationArray.length !=0">
          		{{monitoringStation.branchName || '点击选择检测站'}}
          	</picker>
            <view class="picker" v-else>
              请进行区域选择
            </view>
          </view>
				<view class="uni-form-item uni-form-item-time" name="expirationTime" v-if="formData.handlingMethod !=3">
					<view class="required">
						<image src="../../static/images/required.svg" class="required-img" mode=""></image>
					</view>
					<view class="right">
						<view class="title" v-if="formData.handlingMethod !=1">取车时间：</view>
						<view class="title" v-else>预约到站时间：</view>
						<view class="rt">
							<uni-datetime-picker returnType="timestamp" v-model="formData.pickUpTime"
								@change="pickUpTimeFun($event)" />
							<image src="../../static/images/sj-right.svg" class="sj-bottom" mode=""></image>
						</view>
					</view>
				</view>
				<view class="uni-form-item last-child" name="remarks">
					<view class="required"></view>
					<view class="right">
						<view class="title ft">备注：</view>
						<textarea class="text-area" :class="{'tl':tl}" value="" v-model="formData.remarks"
							placeholder="请填写备注" />
					</view>
				</view>
				<!-- 上传保单 -->
				<view class="uni-form-item" name="warranty" v-if="formData.handlingMethod ==3">
					<view class="required">
						<image src="../../static/images/required.svg" class="required-img" mode=""></image>
					</view>
					<view class="right">
						<view class="title">上传保单：</view>
						<view class="rl mk-upload">
							<mk-upload @upFile="upFile" :warranty="true" :bgcolor="'#fff'" :imgList="imgList" :maxChooseCount="1" :maxCount='1' column="4" @onDelete="onDelete1"
								@onChoose="onChoose1" />
						</view>
					</view>
				</view>
				<!-- 合格年检标 -->
				<view class="uni-form-item" name="sign" v-if="formData.handlingMethod ==3">
					<view class="required">
						<image src="../../static/images/required.svg" class="required-img" mode=""></image>
					</view>
					<view class="right">
						<view class="title">合格年检标：</view>
						<view class="rl">
						<radio :checked="RadioShow" color="#0469df" @click="radioChange">有</radio>
						<radio :checked="!RadioShow" color="#0469df" @click="radioChange">无</radio>
						</view>
					</view>
				</view>
				<!-- 合格年检标文件 -->
				<view class="uni-form-item" name="signFile" v-if="formData.handlingMethod ==3 && RadioShow">
					<view class="required">
						<image src="../../static/images/required.svg" class="required-img" mode=""></image>
					</view>
					<view class="right">
						<view class="title">合格年检标文件：</view>
						<view class="rl mk-upload">
							<mk-upload :bgcolor="'#e8e8e8'" :imgList="imgList1" :maxChooseCount="1" :maxCount='1' column="4" @onDelete="onDelete"
								@onChoose="onChoose" />
						</view>
					</view>
				</view>
				<!-- ---------------------------------- -->
				
				<!-- ------------------------- -->
				<view class="uni-btn-v" v-if="type === 'add'">
					<view class="recording">
						<button type="primary" form-type="reset">取消</button>
					</view>
					<view class="distribute">
						<button type="primary" form-type="submit">提交</button>
					</view>
				</view>
				<view class="uni-btn-v" v-if="type === 'edit'">
					<view class="distribute close-btn">
						<button type="primary" @tap="back">返回</button>
						<!-- <button type="primary" @tap="back">关闭</button> -->
					</view>
				</view>
			</form>
		</view>
		<view class="pup" v-show="type !== 'add'"></view>
	</view>
</template>
<script>
  import {
  	BASE_URL
  } from '@/config/config.js'
  import mapApi from '../../components/mapApi/index.js'
	import { mapState,mapMutations } from 'vuex'
	import plateNumber from '../../components/plate-number/plateNumber.vue';
	// import mkUpload from "../../components/mk-upload/mk-upload.vue"
	// import cphnum from "../../components/trailerKeyboard/trailerKeyboard.vue"
	import Address from '../../components/address/address.vue'
	import Prickers from '../../components/picker/picker.vue'
	import {
		PhoneVerify,
		NameVerify,
		LicensePlateVerify,
	} from '@/utils/utils.js'
	import {
		addCustomerInfo,
		updateCustomerInfo,
		getCustomerInfoById,
    getListForDriver
	} from '@/api/index/index.js'
	export default {
		components: {
			Address,
			Prickers,
			plateNumber
		},
		data() {
			return {
        monitoringStationArray: [], // 检测站
        index: 0, // 检测站
        monitoringStation: {}, // 检测站
        imgBase64:'',
        annualInspectionImage:[],
        insurancePhoto:[],
        defaultValueceode:'',
        mapDatas:{},
				//城市合伙人id'
        responsibleId:'',
				// plateNum:uni.getStorageSync('CarNumber')||'',
				//保单
				imgList:[],
				imgList1:[],
        imgListServer:[],
				//
				orderStatus:'', // 订单状态
				isPup: false,
				type: 'add',
				formData: {
					orderNumber: '', // 订单编号
					name: '', // 姓名
					phone: '', // 电话
					licensePlate: this.carNumber||'', // 车牌号码
					vehicleRegistrationDate: '', // 车辆注册日期
					expirationTime: '', // 年检到期时间
					licensePlateAddress: '', // 上门取车地址
					licensePlateAddressCode: '',
					pickUpDddress: '', // 详细地址
					pickUpTime: '', // 取车时间
					handlingMethod: 0, // 办理方式
					remarks: '', // 备注
					id: '', // 订单id
				},
				RadioShow:false
			}
		},
		computed: {
      checks(){
        if(this.formData.handlingMethod !=1){
          return '上门取车地址'
        }else{
          return '检测站推荐'
        }
      },
      action() {
      	return BASE_URL + '/swagger-system/uploadFile/batchUploadFile'
      },
			tl() {
				return this.formData.remarks.length > 20 ? true : false
			},
			...mapState(['carNumber','newCarNumber',])
		},
		onLoad(options) {
      // this.defaultValueceode = '440305'
			this.plateNum=uni.getStorageSync('carNum')
			this.type = options.type
			this.id = options.id
			console.log(this.type)
			// this.$store.commit('setCarNumber','')
      console.log(111,this.userInfo);
			uni.setNavigationBarTitle({
				title: this.type === 'edit' ? '编辑客户信息' : '新增客户信息'
			})
			if (this.type === 'edit') {
				this.getCustomerInfoByIdFun(this.id)
			}
      uni.getLocation({
        type:'wgs84',
        success:res=>{
          console.log(res);
          let mapData = {
            latitude:res.latitude,
            longitude:res.longitude
          }
          console.log(mapData);
        mapApi.reverseGeocoder({
          location:mapData,
          success:res=>{
            console.log('sss',res);
            let code = res.result.ad_info.adcode
            this.defaultValueceode = res.result.ad_info.adcode
            console.log('ceopd',this.defaultValueceode);
            uni.setStorageSync('codecity',this.defaultValueceode)
            uni.showLoading({
              title:"正在获取定位"
            })
            if(this.defaultValueceode){
              setTimeout(()=>{
               uni.hideLoading() 
              },1000)
            }else{
              setTimeout(()=>{
               uni.hideLoading() 
              },2000)
            }
            // let province = res.result.address_component.province
            // let city = res.result.address_component.city
            // let district = res.result.address_component.district
          }
        })
        }
      })
		},
    onShow() {
     
    },
		methods: {
      // 检测站列表
      async getListForDriverFun(e) {
      	const res = await getListForDriver({areaName:e})
      	this.monitoringStationArray = res
      	if (this.monitoringStationArray.length == 0) return
      	this.monitoringStation = this.monitoringStationArray[0]
      },
      // 检测站
      bindPickerChange: function(e) {
      	this.index = e.detail.value
      	this.monitoringStation = this.monitoringStationArray[this.index]
      },
      upFile(e){
          this.imgBase64 = JSON.parse(e).data
      },
			...mapMutations(['setCarNumber']),
			onshow(){
				uni.navigateTo({
					url:"/pages/serachCar/serachCar"
				})
			},
			//更改合格年检标
			radioChange(){
				this.RadioShow = !this.RadioShow
				console.log(this.RadioShow)
			},
			onDelete(index) {
				console.log(index)
				//删除成功回调后执行 只做演示
				uni.showLoading({
					title: '删除中'
				});
				this.imgList1.splice(index, 1);
				wx.showToast({
					title: '删除成功',
					icon: 'success',
					duration: 1000
				});
				this.setCarNumber(this.newCarNumber)
			},
			onDelete1(index) {
				console.log(index)
				//删除成功回调后执行 只做演示
				uni.showLoading({
					title: '删除中'
				});
				this.imgList.splice(index, 1);
				wx.showToast({
					title: '删除成功',
					icon: 'success',
					duration: 1000
				});
				this.setCarNumber(this.newCarNumber)
			},
			onChoose(e) {
				//上传成功后回调执行push  只做演示
				// console.log('111',e);
				uni.showLoading({
					title: '上传中'
				});
				setTimeout(() => {
					const tempFilePaths = e.tempFilePaths;
					this.imgList1.push(tempFilePaths[0]);
          // this.upLoad(1)
					uni.hideLoading();
				}, 1000);
				this.setCarNumber(this.newCarNumber)
				// console.log('w',this.imgList);
				// console.log('s',this.imgList1);
			},
			onChoose1(e) {
				//上传成功后回调执行push  只做演示
				// console.log('222',e);
				uni.showLoading({
					title: '上传中'
				});
				setTimeout(() => {
					const tempFilePaths = e.tempFilePaths;
					this.imgList.push(tempFilePaths[0]);
         this.upLoad(0)
					uni.hideLoading();
				}, 1000);
				this.setCarNumber(this.newCarNumber)
				// console.log('w',this.imgList);
				// console.log('s',this.imgList1);
			},
      upLoad(e) {
      	// if (!this.checkMoney) {
      	// 	this.isTap = false
      	// 	return wx.showToast({
      	// 		title: '请填写检测费用',
      	// 		icon: 'none',
      	// 		duration: 2000
      	// 	});
      	// }
      	// if (this.imgList.length !== 1) {
      	// 	this.isTap = false
      	// 	return wx.showToast({
      	// 		title: '请上传合格年检标',
      	// 		icon: 'none',
      	// 		duration: 2000
      	// 	});
      	// }
        let img
        if(e){
          img = this.imgList1[0]
        }else{
          img = this.imgList[0]
        }
        console.log('img',img);
      	uni.showLoading({
      		title: '上传中'
      	});
      	uni.uploadFile({
      		url: this.action,
      		filePath: img,
      		name: 'mfile',
      		success: res => {
            console.log('updata',res);
      			let imgUrl = JSON.parse(res.data).data[0]
            if(e){
              this.annualInspectionImage.push(imgUrl)
            }else{
              this.insurancePhoto.push(imgUrl)
            }
      			// this.imgListServer.push(imgUrl)
      			// this.successfulHandleOrderFun()
      		},
      		fail: e => {
      			uni.showToast({
      				title: '上传失败',
      				icon: 'none'
      			})
      		},
      		complete: err => {
      			console.log(err)
      		}
      	})
      },
			// 根据id查询
			async getCustomerInfoByIdFun(id) {
				const params = {
					id
				}
				const res = await getCustomerInfoById(params)
				console.log('res',res);
        this.responsibleId = res.responsibleId
        console.log('id',this.responsibleId);
				this.orderStatus = res.orderStatus
				const {
					orderNumber,
					customerName,
					customerPhone,
					numberPlate,
					vehicleRegistrationDate,
					vehicleExpiryDate,
					pickupArea,
					pickupAddress,
					pickupTime,
					handleWay,
					remark,
					createrId,
					insurancePhoto,
					annualInspectionImage,
				} = res
				this.formData = {
					createrId: createrId, // 创建人 id
					orderNumber: orderNumber, // 订单编号
					name: customerName, // 姓名
					phone: customerPhone, // 电话
					licensePlate: numberPlate, // 车牌号码
					vehicleRegistrationDate: vehicleRegistrationDate, // 车辆注册日期
					expirationTime: vehicleExpiryDate, // 年检到期时间
					licensePlateAddress: pickupArea, // 上门取车地址
					licensePlateAddressCode: '',
					pickUpDddress: pickupAddress, // 详细地址
					pickUpTime: pickupTime, // 取车时间
					handlingMethod: handleWay, // 办理方式
					remarks: remark // 备注
				}
        // 获取获取
				this.imgList[0] = insurancePhoto,//保单
				annualInspectionImage ? this.imgList1[0]=annualInspectionImage:this.imgList1 = []//合格年检
				this.setCarNumber(numberPlate)
			},
			// 表单参数校验
			checkout() {
				// 姓名
				const regName = /^[\u4e00-\u9fa5]{2,6}$/;
				if (!NameVerify(this.formData.name)) {
					uni.showToast({
						title: '请输入正确姓名',
						icon: 'none'
					});
					return false
				}

				// 电话号
				if (!PhoneVerify(this.formData.phone)) {
					uni.showToast({
						title: '请输入正确电话号码',
						icon: 'none'
					});
					return false
				}
				// 车牌号码
				// if (!LicensePlateVerify(this.formData.licensePlate)) {
				// 	uni.showToast({
				// 		title: '请输入正确车牌号码',
				// 		icon: 'none'
				// 	});
				// 	return false
				// }
				if(!this.carNumber){
					uni.showToast({
							title: '请输入正确车牌号码',
							icon: 'none'
						});
						return false
				}
				// 保单
				if(this.formData.handlingMethod==3){
					if (!this.imgList.length) {
						uni.showToast({
							title: '请上传保单图',
							icon: 'none'
						});
						return false
					}
					//合格年检标文件
					if (this.RadioShow && !this.imgList1.length) {
						uni.showToast({
							title: '请上传年检文件',
							icon: 'none'
						});
						return false
					}
					
				}
				//办理方式
				if (!this.formData.handlingMethod) {
						uni.showToast({
							title: '请选择办理方式',
							icon: 'none'
						});
						return false
					}
					
				
				return true
			},
			// 车辆注册日期
			vehicleRegistrationDateFun(e) {
				this.formData.vehicleRegistrationDate = e
			},
			// 年检到期时间
			expirationTimeFun(e) {
				this.formData.expirationTime = e
			},
			// 取车时间
			pickUpTimeFun(e) {
				if(this.formData.handlingMethod==3)return
				this.formData.pickUpTime = e
			},
			// 上门取车地址
			getAddress(e) {
        
				if(this.formData.handlingMethod==3)return
				console.log('****', e)
				this.formData.licensePlateAddressCode = e.code
				this.formData.licensePlateAddress = e.name
        this.getListForDriverFun(e.name)
			},
			// 办理方式
			handlingMethod(e) {
				//e 获取一个对象 index 和 title
				this.formData.handlingMethod = e.index
				console.log('-----', e)
        // handleWay
			},
			// 提交客户信息
			async formSubmit(e) {
				if (!this.checkout()) return

				const res = await uni.$confirm('提示', '您确定添加此订单吗？')
				if (res) {
					// console.log('params',this.carNumber);
					const params = {
						customerName: this.formData.name,
						customerPhone: this.formData.phone,
						numberPlate: this.carNumber,
						vehicleRegistrationDate: this.formData.vehicleRegistrationDate,
						vehicleExpiryDate: this.formData.expirationTime,
						pickupArea: this.formData.licensePlateAddress,
						pickupAddress: this.formData.pickUpDddress ||this.monitoringStation.branchName,
						pickupTime: this.formData.pickUpTime,
						handleWay: this.formData.handlingMethod,
						remark: this.formData.remarks,
						branchName: this.monitoringStation.branchName, // 名字
						// ApiModelProperty:this.formData.handlingMethod,
						insurancePhoto:this.insurancePhoto[0],
						annualInspectionImage:this.annualInspectionImage[0]
					}

					try {

						if (this.type === 'edit' || this.isPup) {
							params['id'] = this.id
							params['orderNumber'] = this.formData.orderNumber
							params['createrId'] = this.formData.createrId
							const res = await updateCustomerInfo(params)
							if (res) {
								uni.showToast({
									icon: 'none',
									title: '更新成功'
								})
							}

						} else {
              params.imgBase64 = this.imgBase64
              params.toggle = 1
							const res = await addCustomerInfo(params)
							if (res) {
								uni.showToast({
									icon: 'none',
									title: res.msg
								})
							}
						}
						// uni.showLoading()
						let timer = setTimeout(() => {
							clearTimeout(timer);
							uni.$emit("handle", true); //值传递
							// uni.hideLoading()
							this.back()
						}, 1500);

					} catch (err) {
						console.log('添加失败', err)
					}

				}
			},
			// 取消新增
			formReset(e) {
				console.log('清空数据')

				this.back()
			},
			// 返回上一页
			back() {
				uni.navigateBack({
					delta: 1,
				})
			},
			onUnload(){
				console.log('onunload');
				this.setCarNumber('')
			},
			onHide(){
				console.log('onHide');
				// this.setCarNumber('')
			}

		}
	}
</script>

<style lang="scss" scoped>
	@import './detailsInfo.scss';
	.mk-upload{
		// border: 2px solid #ccc;
		// padding-left: 5px;
	}
  .monitoring-station{
    display: flex;
    justify-content: space-between;
    .title{
      margin-left: 40rpx;
      font-weight: 700;
    }
    .picker{
      opacity: 0.7;
    }
  }
</style>
