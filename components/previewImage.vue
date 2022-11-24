<template>
	<view></view>
</template>
<script>
	export default {
		props: ['urlList'],
		name: "previewImage",
		data() {
			return {
				urls: []
			};
		},
		watch: {
			urlList: {
				handler(newVal) {
					if (!newVal) return
					let isArray = Object.prototype.toString.call(newVal) === '[object Array]'
					if (isArray) {
						this.urls = newVal
					} else {
						this.urls.push(newVal)
					}
				},
				immediate: true
			}
		},
		methods: {
			// 预览图片
			previewImageFun() {
				console.log(3)
				uni.previewImage({
					urls: this.urls,
					current: 0,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {},
						fail: function(err) {
							uni.showToast({
								icon: 'none',
								title: "操作失败",
							})
						}
					}
				});
			},
		}
	}
</script>
