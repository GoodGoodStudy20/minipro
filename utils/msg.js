export let $confirm = (title, content) => {
	return new Promise((resolve, reject) => {
		uni.showModal({
			title: title || '提示',
			content: content || '您确定此操作吗？',
			cancelText: "取消", // 取消按钮的文字  
			confirmText: "确认", // 确认按钮文字 
			confirmColor: '#002FA7', //确认字体的颜色
			cancelColor: '#000', //取消字体的颜色
			success: function(res) {
				if (res.confirm) {
					console.log('用户点击确定');
					resolve(true)
				} else if (res.cancel) {
					console.log('用户点击取消');
					resolve(false)
				}
			}
		});
	})
}
// 消息框封裝
export let $msg = (title, icon = "success", duration = 1000) => {
	uni.showToast({
		title,
		icon,
		mask: true,
		duration
	})
}
