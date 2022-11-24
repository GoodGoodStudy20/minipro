<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.isLogin()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			isLogin() {
				const token = uni.getStorageSync('x-token-z')
				const userInfo = uni.getStorageSync('userInfo')
				if (!token || !userInfo) {
					uni.clearStorage()
					uni.clearStorageSync()
					uni.reLaunch({
						url: '/pages/login/index'
					})
				} else {
					uni.switchTab({
						url: '/pages/index/index'
					})
				}

			}
		}
	}
</script>

<style>
	/*每个页面公共css */
	page {
		background-color: #f8f8f8;
	}
</style>
