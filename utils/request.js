import qs from 'qs'

import {
	store
} from '../store/index.js'

function request(obj) {

	return new Promise((resolve, reject) => {
		// 监听有没有网络
		uni.getNetworkType({
			success(res) {
				if (res.networkType == 'none') {
					uni.showToast({
						icon: 'none',
						title: '网路不佳'
					})
          return reject('网路不佳')
				} else {
					reqHttps()
				}
			}
		})

		// 切换网路监听
		uni.onNetworkStatusChange(function(res) {
      console.log(res);
			if (res.networkType === 'none') {
				uni.showToast({
					icon: 'none',
					title: '网路不佳'
				})
			} else {
				// reqHttps()
        uni.showToast({
        	icon: 'none',
        	title: `网络切换`
        })
			}
		});

		function reqHttps() {
      console.log(555555555);
			const method = obj.method || "GET";
			const url = obj.url || "";
			const data = obj.data || {};
			const header = obj.header || {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'x-token': uni.getStorageSync('x-token-z')
			};
			const success = obj.success; // 成功回调函数
			const fail = obj.fail; //表示失败后，要执行的回调函数
			uni.request({
				url: url,
				data: data || {},
				method: method,
				header: header,
				// dataType: 'json',
				success: ((res) => {
					if (res.data.code !== 200) {
						uni.hideLoading()
						if (res.data.error_code == 401) {
							uni.clearStorage()
							uni.clearStorageSync()
							uni.showToast({
								icon: 'none',
								title: res.data.error_msg || "请重新登录"
							})
							let timer = setTimeout(() => {
								clearTimeout(timer)
								timer = null
								uni.reLaunch({
									url: '/pages/login/index'
								})
							}, 1500)
							return
						}
						resolve(res.data.data)
						return uni.showToast({
							icon: 'none',
							title: res.data.msg || "服务器错误"
						})
					}
					resolve(res.data.data)
				}),
				fail: ((err) => {
					uni.showToast({
						icon: 'none',
						title: err.data.error_msg || "接口请求失败"
					})
					return reject(err)
				})
			})
		}

	})
}


export {
	request
}
