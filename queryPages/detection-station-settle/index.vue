<template>
  <view class="registerLogin">
    <view class="registerLogin-step">
      <uni-steps :options="[{title: '基础信息'}, {title: '费用信息'}, {title: '图片上传'}, {title: '等待审核'}]" :active='active'>
      </uni-steps>
    </view>
    <view v-if="active==0" class="one">
      <view class="registerLogin-title">
        <!-- <img class="img" src="../static/images/triangle.png" alt=""> -->
        <text class="text">检测站信息</text>
      </view>
      <uni-forms ref="customForm" :rules="customRules" :modelValue="customFormData">
        <view class="forms">
          <uni-forms-item name="branchName">
            <view class="forms-item">
              <view class="left">
                <img class="img" src="../../static/images/detection-station.png" alt="">
                <view class="title">
                  检测站名称
                </view>
              </view>
              <uni-easyinput class="f-input" name="branchName" v-model="customFormData.branchName" input-align="right"
                placeholder="请输入检测站全称" />
            </view>
          </uni-forms-item>
          <uni-forms-item name="adress">
            <view class="forms-item">
              <view class="left">
                <img class="img" src="../../static/images/adress.png" alt="">
                <view class="title">
                  所属地区
                </view>
              </view>
              <view class="f-r">
                <Address :checks="'请选择检测站所属省市'" @getAddress="getAddress" :defaultValue1="defaultValueceode"
                  :licensePlateAddress="customFormData.adress" />
                <image src="../../static/images/sj-right.svg" class="sj-bottom" mode=""></image>
              </view>
            </view>
          </uni-forms-item>
          <uni-forms-item name="position">
            <view class="forms-item" @click="clickMapShow">
              <view class="left">
                <img class="img" src="../../static/images/location.png" alt="">
                <view class="title">
                  定位信息
                </view>
              </view>
              <view class="f-r">
                <view v-if="!customFormData.position" class="position1">请输入定位</view>
                <view v-else>{{customFormData.position}}</view>
                <image src="../../static/images/sj-right.svg" class="sj-bottom" mode=""></image>
              </view>
            </view>
          </uni-forms-item>
          <uni-forms-item name="detailedAddress">
            <view class="forms-item">
              <view class="left">
                <img class="img" src="../../static/images/detail-adress.png" alt="">
                <view class="title">
                  详细地址
                </view>
              </view>
              <uni-easyinput class="f-input" name="detailedAddress" v-model="customFormData.detailedAddress"
                input-align="right" placeholder="请输入检测站详细地址" />
            </view>
          </uni-forms-item>
          <uni-forms-item name="startTime">
            <view class="forms-item">
              <view class="left">
                <img class="img" src="../../static/images/on-work.png" alt="">
                <view class="title">上班时间</view>
              </view>
              <view class="f-r">
                <picker mode="time" :value="customFormData.startTime" @change="bindOnTimeChange">
                  <view class="uni-input position1" v-if="!customFormData.startTime">请输入上班时间</view>
                  <view class="uni-input" v-else>{{customFormData.startTime}}</view>
                </picker>
                <image src="../../static/images/sj-right.svg" class="sj-bottom" mode=""></image>
              </view>
            </view>
          </uni-forms-item>
          <uni-forms-item name="endTime">
            <view class="forms-item">
              <view class="left">
                <img class="img" src="../../static/images/off-work.png" alt="">
                <view class="title">
                  下班时间
                </view>
              </view>
              <view class="f-r">
                <picker mode="time" :value="customFormData.endTime" @change="bindOffTimeChange">
                  <view class="uni-input position1" v-if="!customFormData.endTime">请输入下班时间</view>
                  <view class="uni-input" v-else>{{customFormData.endTime}}</view>
                </picker>
                <image src="../../static/images/sj-right.svg" class="sj-bottom" mode=""></image>
              </view>
            </view>
          </uni-forms-item>
        </view>
        <view class="text3">
          <text>联系方式</text>
        </view>
        <view class="forms2">
          <uni-forms-item name="contactPeopleName">
            <view class="forms-item">
              <view class="left">
                <img class="img" src="../../static/images/name.png" alt="">
                <view class="title">
                  联系人
                </view>
              </view>
              <uni-easyinput class="f-input" name="contactPeopleName" v-model="customFormData.contactPeopleName"
                input-align="right" placeholder="请输入联系人姓名" />
            </view>
          </uni-forms-item>
          <uni-forms-item name="contactPhone">
            <view class="forms-item">
              <view class="left">
                <img class="img" src="../../static/images/phone.png" alt="">
                <view class="title">
                  手机号
                </view>
              </view>
              <uni-easyinput class="f-input" name="contactPhone" maxlength="11" v-model="customFormData.contactPhone"
                input-align="right" placeholder="请输入联系电话" />
            </view>
          </uni-forms-item>
        </view>
      </uni-forms>
      <!-- <uni-popup ref="popup" type="dialog" style="display:none" :mask-click="false" @change="change">
        <uni-popup-dialog :duration="2000" title="地图" mode="input" :before-close="true" @close="close"
          @confirm="confirm"> -->
      <view class="map-container" style="display:none" v-if="mapShow">
        <map style="width: 100%; height: 300px;" show-location :latitude="latitude" :longitude="longitude">
        </map>
      </view>
      <!-- </uni-popup-dialog>
      </uni-popup> -->
      <view class="Pdf">
        <text>注册即表示接受</text>
        <text class="Pdf-text" @click="PdftexeClick">《隐私保护》</text>
      </view>
    </view>
    <!-- 111 -->
    <view v-if="active==1">
      <view class="registerLogin-title">
        <!-- <img class="img" src="../static/images/triangle.png" alt=""> -->
        <text class="text">费用信息</text>
      </view>
      <uni-forms ref="customForm" :modelValue="customFormData">
        <view class="forms">
          <uni-forms-item name="censorCost">
            <view class="forms-item">
              <view class="title">
                检测费
              </view>
              <uni-easyinput class="f-input" name="censorCost" v-model="customFormData.censorCost" input-align="right"
                placeholder="请输入金额" />
            </view>
          </uni-forms-item>
          <uni-forms-item name="isAgency">
            <view class="forms-item">
              <view class="title">
                是否站内代办收费
              </view>
              <view class="f-input radio-box">
                <label class="radio">
                  <radio :value="customFormData.isAgency" color="#327DFD"
                    :checked="customFormData.isAgency==1?false:true" @click="customFormData.isAgency='0'" />否
                </label>
                <label class="radio">
                  <radio :value="customFormData.isAgency" color="#327DFD" style=";margin-left:20px"
                    :checked="customFormData.isAgency==1?true:false" @click="customFormData.isAgency='1'" />是
                </label>
              </view>
            </view>
          </uni-forms-item>
          <uni-forms-item name="agencyOrderCost" v-if="customFormData.isAgency==1">
            <view class="forms-item">
              <view class="title">
                站内代办收费
              </view>
              <uni-easyinput class="f-input" name="agencyOrderCost" v-model="customFormData.agencyOrderCost"
                input-align="right" placeholder="请输入金额" />
            </view>
          </uni-forms-item>
        </view>
      </uni-forms>
    </view>
    <uni-forms ref="customForm" :modelValue="customFormData" v-if="active==2">
      <view class="registerLogin-title">
        <text class="text">门店图片</text><text class="text2">*建议横屏拍摄，至少拍摄两张*</text>
      </view>
      <view class="forms">
        <uni-forms-item name="image">
          <uni-file-picker v-model="customFormData.image" limit="9" @select="select($event)" @delete="del($event)">
            <img src="../../static/images/camera.png" alt="" class="camera">
          </uni-file-picker>
        </uni-forms-item>
      </view>
    </uni-forms>
    <uni-forms ref="customForm" :modelValue="customFormData" v-if="active==3">
      <view class="forms3">
        <img class="img" src="../../static/images/submit-success.png" alt="">
        <view class="submit-success">
          资料提交成功
        </view>
        <view class="submit-text">
          您提交的资料正在审核，请耐心等待，
          审核结果可在登录页查询结果。
        </view>
        <button class="Btn" @click="toHome">回登录页</button>
      </view>
    </uni-forms>

    <view class="Btn-box">
      <button class="Btn" v-if="active>0 && active<3" @click="active--">上一步</button>
      <button class="Btn" v-if="active<2" @click="submit('customForm','add')">下一步</button>
      <button class="Btn" v-if="active==2" @click="submit('customForm')">确认提交</button>
    </view>

  </view>
  <!-- <page-meta :page-style="'overflow:'+(show?'hidden':'visible')"></page-meta> -->
</template>

<script>
  import {
    BASE_URL
  } from '@/config/config.js'
  import Address from '../../components/address/address.vue'
  import {
    addNetworkStores
  } from '@/api/index/index.js'
  export default {
    components: {
      Address
    },
    data() {
      return {
        action: BASE_URL + '/swagger-system/uploadFile/baiduUploadFile',
        checks: '请选择检测站所属省市',
        defaultValueceode: '', //现居地址
        active: 0,
        mapShow: false,
        customFormData: {
          isAgency: '0',
          branchName: '', //检测站名称
          adress: '',
          belongInstitutions: '', //门店所属省份
          branchArea: '', //门店所属区域
          contactPeopleName: '', //联系人姓名
          contactPhone: '', //联系人电话
          location: '', //经纬度
          position: '', //定位名称
          detailedAddress: '', //详细地址
          startTime: '', //上班时间
          endTime: '', //下班时间
          censorCost: '', //检测费
          agencyOrderCost: '', //站内代办费用
          image: [], //门店照片
          storeImage: [],
        },
        latitude: '',
        longitude: '',
        show: false,
        customRules: {
          branchName: {
            rules: [{
              required: true,
              errorMessage: '请输入检测站全称',
              // 可以单个或者同时写两个触发验证方式 
            }]
          },
          adress: {
            rules: [{
              required: true,
              errorMessage: '请选择检测站所属省市',
              // 可以单个或者同时写两个触发验证方式 
            }]
          },
          position: {
            rules: [{
              required: true,
              errorMessage: '请输入定位'
            }]
          },
          detailedAddress: {
            rules: [{
              required: true,
              errorMessage: '请输入详细地址',
              // len: 18,
              // 可以单个或者同时写两个触发验证方式 
            }]
          },
          startTime: {
            rules: [{
              required: true,
              errorMessage: '请选择上班时间',
              // 可以单个或者同时写两个触发验证方式 
            }]
          },
          endTime: {
            rules: [{
              required: true,
              errorMessage: '请选择下班时间',
              // 可以单个或者同时写两个触发验证方式 
            }]
          },
          contactPeopleName: {
            rules: [{
              required: true,
              errorMessage: '请选择联系人姓名',
              // 可以单个或者同时写两个触发验证方式 
            }]
          },
          contactPhone: {
            rules: [{
              required: true,
              errorMessage: '请选择联系电话',
              // 可以单个或者同时写两个触发验证方式 
            }]
          },
          censorCost: {
            rules: [{
              required: true,
              errorMessage: '请输入金额',
              // 可以单个或者同时写两个触发验证方式 
            }]
          },
          agencyOrderCost: {
            rules: [{
              required: true,
              errorMessage: '请输入金额',
              // 可以单个或者同时写两个触发验证方式 
            }]
          },
          image: {
            rules: [{
              required: true,
              errorMessage: '请上传门店图片',
              // 可以单个或者同时写两个触发验证方式 
            }]
          },
        },
      }
    },
    onReady() {
      console.log('rules');
      this.$refs.customForm.setRules(this.customRules);
    },
    methods: {
      getArea(str) {
        let area = {}
        let index11 = 0
        let index1 = str.indexOf("省")
        if (index1 == -1) {
          index11 = str.indexOf("自治区")
          if (index11 != -1) {
            area.Province = str.substring(0, index11 + 3)
          } else {
            area.Province = str.substring(0, 0)
          }
        } else {
          area.Province = str.substring(0, index1 + 1)
        }

        let index2 = str.indexOf("市")
        if (index11 == -1) {
          area.City = str.substring(index11 + 1, index2 + 1)
        } else {
          if (index11 == 0) {
            area.City = str.substring(index1 + 1, index2 + 1)
          } else {
            area.City = str.substring(index11 + 3, index2 + 1)
          }
        }

        let index3 = str.lastIndexOf("区")
        if (index3 == -1) {
          index3 = str.indexOf("县")
          area.Country = str.substring(index2 + 1, index3 + 1)
        } else {
          area.Country = str.substring(index2 + 1, index3 + 1)
        }
        return area;
      },
      // 获取上传状态
      select(e) {
        console.log('选择文件：', e)
        uni.uploadFile({
          url: this.action,
          filePath: e.tempFilePaths[0],
          name: 'mfile',
          success: res => {
            console.log(e)
            // let imgUrl = JSON.parse(res.data).data[0]
            let imgUrl = JSON.parse(res.data).data
            // this.image.imgUrl = imgUrl
            console.log(imgUrl)
            this.customFormData.image.push({
              url: imgUrl,
              name: e.tempFiles[0].name
            })
            console.log(this.customFormData.image)
            // this.successfulHandleOrderFun()
          },
          fail: e => {
            uni.showToast({
              title: '上传失败',
              icon: 'none'
            })
          },
          complete: err => {
            // console.log(err)
          }
        })
      },
      del(e, i) {
        console.log('del', e)
        // this.image.imgUrl = null
        if (this.customFormData.image && this.customFormData.image.length > 0) {
          this.customFormData.image = this.customFormData.image.filter(item => {
            return e.tempFile.name != item.name
          })
        }
      },
      PdftexeClick() {
        uni.navigateTo({
          url: '/queryPages/detection-station-settle/PdfText'
        })
      },
      toHome() {
        console.log('222')
        uni.navigateTo({
          url: '/pages/login/index'
        })
      },
      chooseLocation(e) { //打开地图选择位置
        uni.chooseLocation({
          success: res => {
            // this.$refs.popup.close()
            this.mapShow = false
            console.log('纬度：' + res.latitude);
            console.log('经度：' + res.longitude);
            console.log(res)
            if (res.address) {
              let a = [res.longitude, res.latitude]
              this.customFormData.position = res.name
              this.customFormData.location = String(a)
            }
            console.log(this.customFormData)
          },
          fail: err => {
            console.log(err)
          }
        });
      },
      clickMapShow() {
        console.log('2313')
        let that = this
        // this.$refs.popup.open('center')
        this.mapShow = true
        that.chooseLocation()
      },
      bindOnTimeChange(e) {
        this.customFormData.startTime = e.detail.value
      },
      bindOffTimeChange(e) {
        this.customFormData.endTime = e.detail.value
      },
      // 现居地址
      getAddress(e) {
        console.log('****', e)
        this.customFormData.adress = e.name
        let area = this.getArea(this.customFormData.adress)
        console.log(area)
        this.customFormData.belongInstitutions = area.Province
        this.customFormData.branchArea = area.City
      },
      submit(r, type) {
        console.log(this.active)
        this.$refs[r].validate(['id'], async (err, formData) => {
          if (!err) {
            console.log('success', formData)
            if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.customFormData.contactPhone)) {
              uni.showToast({
                icon: 'none',
                title: '请输入正确的手机号'
              })
              return
            }
            if (this.active == 2 && this.customFormData.image && this.customFormData.image.length == 1) {
              uni.showToast({
                icon: 'none',
                title: '请选择至少2张门店图片'
              })
              return
            }
            if (this.active == 2) {
              let storeImage = []
              this.customFormData.image.forEach(item => {
                storeImage.push(item.url)
              })
              this.customFormData.storeImage = JSON.stringify(storeImage)
              addNetworkStores(this.customFormData).then(res => {
                console.log('444------', res);
                if (res && res.code) {
                  console.log('333------', res);
                  if (res.code != 200) {
                    uni.showToast({
                      icon: 'none',
                      title: res.msg || '提交失败'
                    })
                    return
                  } else {
                    this.active++
                  }
                } else {
                  uni.showToast({
                    icon: 'none',
                    title: res && res.msg || '提交失败'
                  })
                  return
                }
              })
            } else {
              this.active++
              this.$nextTick(() => {
                this.$refs.customForm.setRules(this.customRules);
              })
            }
          }
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  .registerLogin {
    display: flex;
    flex-direction: column;

    .one {
      flex: 1;
      overflow: auto;
      margin-bottom: 80px
    }

    &-title {
      margin: 40rpx 0 28rpx 30rpx;

      .img {
        width: 14px;
        height: 14px;
      }

      .text {
        margin-left: 16rpx;
        font-weight: 400;
        font-size: 18px;
        color: #000000;
        opacity: 0.9;
      }

      .text2 {
        margin-left: 16rpx;
        font-style: normal;
        font-weight: 400;
        font-size: 24rpx;
        color: #F14F44;
      }
    }

    .text3 {
      margin-top: 20px;
      margin-left: 46rpx;
      font-weight: 400;
      font-size: 18px;
      color: #000000;
      opacity: 0.9;
    }

    .forms {
      background-color: #fff;
      margin: 0 15px;
      border-radius: 8px;
      padding: 12px 12px 0.5px 12px;

      &-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 32rpx;
        border-bottom: 1px solid #eee;

        .left {
          display: flex;
          align-items: center;

          img {
            width: 36rpx;
            height: 36rpx;
            margin-right: 12rpx
          }
        }

        .title {
          font-size: 32rpx;
        }

        .f-input {
          text-align: right;
        }

        .radio-box {
          height: 70rpx;
        }
      }
    }

    .forms2 {
      background-color: #fff;
      margin: 20px 15px;
      border-radius: 8px;
      padding: 12px 12px 0.5px 12px;

      &-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 32rpx;
        border-bottom: 1px solid #eee;

        .left {
          display: flex;
          align-items: center;

          img {
            width: 36rpx;
            height: 36rpx;
            margin-right: 12rpx
          }
        }

        .title {
          font-size: 32rpx;
        }

        .f-input {
          text-align: right;
        }

        .radio-box {
          height: 70rpx;
        }
      }
    }

    .forms3 {
      text-align: center;
      margin: 200rpx auto 0;
      width: 440rpx;

      .img {
        width: 200rpx;
        height: 200rpx;
      }

      .submit-success {
        font-style: normal;
        font-weight: 400;
        font-size: 32rpx;
        font-feature-settings: 'tnum'on, 'lnum'on;
        color: #000000;
        opacity: 0.9;
        margin-top: 40rpx;
      }

      .submit-text {
        font-style: normal;
        font-weight: 400;
        font-size: 26rpx;
        text-align: center;
        font-feature-settings: 'tnum'on, 'lnum'on;
        color: #000000;
        opacity: 0.6;
        margin-bottom: 32rpx;
        margin-top: 20rpx;
      }

      .Btn {
        color: #fff;
        background: #327DFD;
      }
    }

    .Pdf {
      margin-top: 20rpx;
      text-align: right;
      font-size: 16px;

      text:nth-last-child(2) {
        opacity: 0.6;
      }

      &-text {
        color: #327DFD;
      }
    }

    .Btn-box {
      position: fixed;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: space-between;
      width: 100%;

      uni-button:after {
        border: none !important;
      }

      uni-button {
        border-radius: 8px !important;
      }

      .Btn {
        color: #327DFD;
        width: 144px;
        height: 46px;
      }

      .Btn:nth-last-child(1) {
        color: #fff;
        background: #327DFD;
      }
    }

    .f-r {
      display: flex;
      align-items: center;

      .position1 {
        font-size: 14px;
        color: #999
      }

      .sj-bottom {
        display: block;
        margin-left: 10rpx;
        width: 30rpx;
        height: 32rpx;
        opacity: .8;
      }
    }
  }

  .map-container {
    width: 100%;
    height: 350px;
    background: #fff;
    display: flex;
    flex-direction: column;

    .top-search {
      margin-bottom: 20rpx
    }
  }

  .camera {
    width: 86px;
    height: 86px;
  }

  ::v-deep .uni-easyinput__content-input {
    text-align: right;
    padding-left: 0;
  }

  ::v-deep .uni-easyinput__content {
    border: none !important;
    background-color: #fff !important;
  }

  ::v-deep .uni-icons {
    font-size: 22px !important;
    color: #327DFD;
  }

  ::v-deep uni-steps__row-title {
    color: #327DFD;
  }

  ::v-deep .uni-easyinput__placeholder-class {
    font-size: 14px;
  }

  ::v-deep .uni-radio-input {
    width: 18px;
    height: 18px;
    margin-right: 4rpx;
  }

  ::v-deep .uni-label-pointer {
    margin-left: 40rpx;
    line-height: 70rpx;
  }

  ::v-deep .licensePlateAddress.active {
    font-size: 14px;
    color: #999
  }

  // ::v-deep .uni-steps__row-circle {
  //   width: 16px;
  //   height: 16px;
  // }
</style>
