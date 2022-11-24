<template>
	<view class="search-wapper">
		<view class="search-box">
			<section class="select-box">
				<uni-data-select :clear="false" v-model="value" :localdata="range" @change="selectFun">
				</uni-data-select>
        <view v-show="customShow" class="custom-date-box">{{customDate}}</view>
			</section>
			<view class="search">
				<image src="@/static/images/search.svg" class="search-img" mode=""></image>
				<input class="uni-input" v-model="searchKey" @input="searchKeyFun" placeholder="输入姓名" />
			</view>

		</view>
		<CustomDate :isCustomDate="isCustomDate" @change="customDateFun" />
	</view>
</template>

<script>
	import CustomDate from '@/components/custom-date.vue'
	export default {

		components: {
			CustomDate,
		},
		data() {
			return {
				isCustomDate: false,
				value: 0,
				range: [{
					value: 0,
					text: "全部时间",
					val: '',
				}, {
					value: 1,
					text: "本日",
					val: 1,
				}, {
					value: 2,
					text: "近7天",
					val: 7,
				}, {
					value: 3,
					text: "近30天",
					val: 30,
				}, {
					value: 4,
					text: "自定义时间"
				}, ],
				searchKey: '', // 搜索内容
        customDate:'',
        customShow:false
			}
		},
		methods: {
			selectFun(e) {
        this.customShow = false
				this.value = this.range[e]
				if (this.value.text === '自定义时间') {
					this.isCustomDate = true
					return
				} else {
					this.$emit('change2', this.value.val)
				}
			},
			searchKeyFun() {
				clearTimeout(this.timer); //清除延迟执行
				this.timer = setTimeout(() => { //设置延迟执行
					this.$emit('change', this.searchKey)
					this.top()
				}, 500);
			},
			// 自定义时间回调
			customDateFun(e) {
        if(e.length){
        let startTime = e[0].substring(0 ,10)
        let endTime = e[1].substring(0 ,10)
        this.customDate = `${startTime} 至 ${endTime}`
        this.customShow = true
        }
				this.$emit('change2', e)
				this.isCustomDate = false
			},
			top() { //回到顶部
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.search-wapper {
		padding: 0 30rpx;
		box-sizing: border-box;

		.search-box {
			display: flex;
			align-items: center;
			flex-wrap: wrap;

			.select-box {
				position: relative;
				z-index: 3;
				// display: flex;
				// align-items: center;
				// justify-content: space-between;
				// margin: 16rpx 0 26rpx;
				// // background-color: rgb(48, 51, 57);
				// border: 1rpx solid #cccccc;
				border-radius: 20rpx;
        
				/deep/ .uni-stat__select {
					padding: 0;
          
					.uni-stat__actived {
						outline: none;
					}
					.uni-select {
						border: none;

						.uni-select__input-box {
							// min-height: 62rpx;

							.uni-select__input-text {
								width: 140rpx;
								// color: #ffffff;
							}

							// .uni-select__input-placeholder {
							// 	color: #ffffff;
							// }
						}

						.uni-select__selector {
							color: #000000;
							font-size: 12px;

							.uni-select__selector-item {
								padding: 0 2rpx;
							}
						}
					}
				}
			}

			.search {
				width: 690rpx;
				display: flex;
				align-items: center;
				height: 60rpx;
				// background: #f6f6f6;
				border: 1rpx solid #E6E6E6;
				border-radius: 30rpx;
				font-size: 32rpx;
				font-weight: 500;
				color: #000000;
				line-height: 60rpx;
				padding-left: 20rpx;
				// margin-left: 30rpx;

				.search-img {
					width: 30rpx;
					height: 30rpx;
					margin-right: 10rpx;
				}

				.uni-input {
					width: 500rpx;
				}
			}
		}
	}
  .custom-date-box{
    color: #666;
    padding: 0 30rpx;
    margin: -10rpx 0 10rpx ;
  }
  ::v-deep .uni-stat__actived{
    border: none;
    outline: none;
  }
</style>
