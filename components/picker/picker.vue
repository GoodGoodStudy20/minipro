<template>
	<view class="picker-box">
		<picker @change="bindPickerChange" :value="index" :range="array" :range-key="'title'">
			<view class="uni-input">{{array[index].title}}</view>
		</picker>
	</view>
</template>

<script>
	export default {
    props: {
    	monthIndex: {
    		type: Number,
    		require: true,
    		default: 0
    	}
    },
    watch:{
    	monthIndex:{
    		handler(newVal,val){
    			this.index = newVal
    		},
    		immediate: true,
    	}
    },
		data() {
			return {
				// array: [{index:0,title:'年审代办'}, {index:1,title:'检测站内代排队'}, {index:2,title:'专人上门代办'},{index:3,title:'免上线年检'}],请选择办理方式
				array: [{index:0,title:'请选择办理方式'}, {index:1,title:'检测站内代排队'}, {index:2,title:'专人上门代办'},{index:3,title:'免上线年检'}],
				index: 0,
			}
		},
		methods: {
			bindPickerChange: function(e) {
				
				this.index = e.detail.value
				this.$emit('handlingMethod',this.array[this.index])
			},
		}
	}
</script>

<style lang="scss" scoped>
	.picker-box {
		width: 230rpx;
		text-align: right;

		.uni-input {
			font-size: $uni-font-size-sm;
		}
	}
</style>
