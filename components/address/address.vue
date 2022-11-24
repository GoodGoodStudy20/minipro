<template>
  <view>
    <view class="licensePlateAddress"
      :class="{active:(checks==='上门取车地址' ||checks==='检测站推荐' ||checks==='请选择检测站所属省市') && !licensePlateAddress}"
      @click="open">
      {{licensePlateAddress || checks}}
    </view>
    <cityPicker :defaultValue="defaultValue" :mask-close-able="maskCloseAble" @confirm="confirm" @cancel="cancel"
      :visible="visible" />
  </view>
</template>

<script>
  import cityPicker from '../../components/piaoyi-cityPicker/pioayi-cityPicker.vue'

  export default {
    props: ['licensePlateAddress', 'defaultValue1', 'checks'],
    components: {
      cityPicker
    },
    data() {

      return {
        visible: false,
        maskCloseAble: true,
        str: {
          name: this.checks
        },
        defaultValue: '',
      }
    },

    methods: {
      open() {
        this.visible = true
      },
      confirm(val) {
        console.log(val)
        this.str = val
        this.visible = false
        this.$emit('getAddress', val)
      },
      cancel() {
        this.visible = false
      },
    }
  }
</script>


<style lang="scss" scoped>
  .licensePlateAddress {
    font-size: $uni-font-size-sm;

    // color: $uni-text-color-placeholder;
    &.active {
      color: $uni-text-color-placeholder;
    }
  }
</style>
