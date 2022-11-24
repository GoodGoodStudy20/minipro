<!-- 蓝色简洁登录页面 -->
<template>
  <view class="t-login">
    <!-- 页面装饰图片 -->
    <image class="img-a" src="@/static/images/login/2.png"></image>
    <image class="img-b" src="@/static/images/login/3.png"></image>
    <!-- 标题 -->
    <view class="t-b">{{ title }}</view>
    <form class="cl">
      <view class="t-a">
        <image src="@/static/images/login/sj.png"></image>
        <input type="number" name="phone" placeholder="请输入手机号" maxlength="11" v-model="phoneNumber" />
      </view>
      <view class="t-a">
        <image src="@/static/images/login/yz.png"></image>
        <input type="number" class="input2" name="code" maxlength="6" placeholder="请输入验证码" v-model="verificationCode" />
        <view v-if="showText" class="t-c" @tap="getCode(60000)">获取验证码</view>
        <view v-else class="t-c active-c">重新发送({{ second }})</view>
      </view>
      <view class="to-join" @click="go">检测站入驻</view>
      <!-- <button :disabled="isLoading" :loading="isLoading" @tap="login">登 录</button> -->
      <button open-type="getUserInfo" @getuserinfo="getUserInfo" @tap="login">登 录</button>
    </form>
  </view>
</template>
<script>
  import mapApi from '@/components/mapApi/index.js'
  import {
    PhoneVerify
  } from '@/utils/utils.js'
  import {
    getSMSCode,
    seaterSideLogin,
    getCode
  } from '@/api/login/index.js'
  export default {

    data() {

      return {
        title: '欢迎来到共幸好员工~',
        second: 60, // 默认60秒
        showText: true, // 判断短信是否发送
        phoneNumber: '', // 手机号码
        verificationCode: '', // 验证码
        isCode: false, // 是否点击获取验证码
        isLoading: false, // 判断是否点击登录
        interval: null,
      };
    },
    onLoad() {
      // this.isLogin()
    },
    methods: {
      go() {
        uni.navigateTo({
          url: '/queryPages/detection-station-settle/index'
        })
      },
      getUserInfo(e) {
        if (e.detail.errMsg !== "getUserInfo:ok") return uni.$showMsg('信息获取失败')
        console.log('userInfo', e.detail)
        uni.setStorageSync('detail_User', e.detail)
        this.SetCode(e.detail)
      },
      async SetCode(info) {
        const [err, res] = await uni.login()
        if (res.errMsg === 'login:ok') {
          await getCode({
            wxCode: res.code
          })
        }
      },
      // 登录参数校验
      checkout() {
        if (!PhoneVerify(this.phoneNumber)) {
          uni.showToast({
            title: '请输入正确手机号',
            icon: 'none'
          });
          return false;
        }

        if (this.verificationCode.length !== 6) {
          uni.showToast({
            title: '请输入验证码',
            icon: 'none'
          });
          return false;
        }
        return true
      },
      // 获取短信验证码
      getCode(secondNumber) {
        if (!PhoneVerify(this.phoneNumber)) {
          return uni.showToast({
            title: '请输入正确手机号',
            icon: 'none'
          });
        }
        if (this.phoneNumber == 15171265466) return
        if (this.isCode) return
        const _this = this;
        _this.isCode = true
        _this.showText = false;
        this.interval = setInterval(() => {
          _this.second = _this.second - 1;
          uni.setStorageSync('second', _this.second)
        }, 1000);
        this.timer = setTimeout(() => {
          clearInterval(_this.interval);
          clearTimeout(_this.timer)
          _this.timer = null;
          _this.interval = null;
          _this.second = 60;
          _this.showText = true;
          _this.isCode = false
          uni.removeStorageSync('second');
        }, secondNumber);
        //这里请求后台获取短信验证码
        this.getSMSCodeFun()
      },
      // 获取短信验证码
      async getSMSCodeFun() {
        const params = {
          phone: this.phoneNumber,
        }
        const res = await getSMSCode(params)
        if (!res) return
        // this.verificationCode = res
      },
      // 登录按钮
      async login() {
        if (!this.checkout()) return
        if (this.isLoading) return
        uni.showLoading({
          title: '登录中...'
        });
        this.isLoading = true
        // 登录 api
        const params = {
          phone: this.phoneNumber,
          code: this.verificationCode
        }
        try {
          const _this = this
          const res = await seaterSideLogin(params)
          if (!res) {
            this.isLoading = false
            return
          }
          uni.setStorageSync('userInfo', res)
          uni.setStorageSync('x-token-z', res.accessToken)
          this.$store.commit('SETUSERINFO', res)
          let timer = setTimeout(() => {
            clearTimeout(timer);
            uni.removeStorageSync('second');
            uni.hideLoading()
            _this.isLoading = false
            this.phoneNumber = ''
            this.verificationCode = ''
            uni.getLocation({
              type: 'wgs84',
              success: res => {
                console.log(res);
                let mapData = {
                  latitude: res.latitude,
                  longitude: res.longitude
                }
                console.log(mapData);
                mapApi.reverseGeocoder({
                  location: mapData,
                  success: res => {
                    console.log('sss', res);
                    let code = res.result.ad_info.adcode
                    this.defaultValueceode = res.result.ad_info.adcode
                    console.log('ceopd', this.defaultValueceode);
                    uni.setStorageSync('codecity', this.defaultValueceode)
                    // uni.showLoading({
                    //   title:"正在获取定位"
                    // })
                    //  if(this.defaultValueceode){
                    //    setTimeout(()=>{
                    //     uni.hideLoading() 
                    //    },1000)
                    //  }else{
                    //    setTimeout(()=>{
                    //     uni.hideLoading() 
                    //    },2000)
                    //  }

                  }
                })
              }
            })
            uni.switchTab({
              url: '/pages/index/index'
            })
          }, 1000);
        } catch (e) {
          this.isLoading = false
        }
      },
      // 是否登录
      isLogin() {
        const token = uni.getStorageSync('x-token-z')
        if (token) {
          uni.switchTab({
            url: '/pages/index/index'
          })
        }
      }
    },
    onUnload: function() {
      // 清楚验证码倒计时残留数据
      if (this.timer || this.interval) {
        clearTimeout(this.timer)
        clearInterval(this.interval);
        this.timer = null;
        this.interval = null;
        uni.removeStorageSync('second');
      }
    },
  };
</script>
<style scoped>
  @import url("./index.css");
</style>
