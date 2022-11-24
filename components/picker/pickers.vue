<template>
	<view class="picker-box">
		<picker @change="bindPickerChange" :value="index" :range="list" :range-key="'title'">
			<view class="uni-input">{{list[index].title}}</view>
		</picker>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				require: true,
				default: () => ([])
			},
			monthIndex: {
				type: Number,
				require: true,
				default: 0
			}
		},
    options: { styleIsolation: 'shared' },
		data() {
			return {
				index: 0,
			}
		},
		watch:{
			monthIndex:{
				handler(newVal,val){
        console.log('index',this.monthIndex)
					this.index = val
          console.log('index',this.index);
				},
				immediate: true,
				deep: true
			}
		},
		methods: {
			bindPickerChange: function(e) {
				this.index = e.detail.value
				this.$emit('change', this.list[this.index])
			},
		}
	}
</script>

<style lang="scss" scoped>
	.picker-box {
		width: 200rpx;
		text-align: right;

		.uni-input {
			font-size: $uni-font-size-sm;
		}
	}
</style>
