<template>
  <view class="abnormal-box">
    <view class="abnormal-box-item">
        <img class="imageone image" src="./image/abnormal 1.png" alt="">
        <img class="imagethree image" src="./image/abnormal3.png" alt="">
        <img class="imagetwo image" src="./image/abnormal2.png" alt="">
      </view>
    </view>
  </view>
</template>

<script>
</script>

<style lang="scss" scoped>
  .abnormal-box{
    padding-top: 20rpx;
    background-color: #fff;
   &-item{
     text-align: center;
     width: 100%;
     .image{
       width: 690rpx;
     }
     .imageone{
       height: 741px;
     }
     .imagethree{
       height: 731px;
     }
     .imagetwo{
       height: 632px;
     }
   } 
  }
</style>