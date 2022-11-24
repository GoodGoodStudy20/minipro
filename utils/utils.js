// 是否是手机号
export function PhoneVerify(str) {
	const reg = str && str.charAt(0) == 1 && str.length ==11;
	if (reg) {
		return true;
	} else {
		return false;
	}
}

// 名字
export function NameVerify(str) {

	const reg = /^[\u4e00-\u9fa5]{2,6}$/;

	if (reg.test(str)) {
		return true;
	} else {
		return false;
	}
}


// 车牌号码
export function LicensePlateVerify(str) {

	const reg = /(^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$)/;

	if (reg.test(str)) {
		return true;
	} else {
		return false;
	}
}


// 日期
// export function VehicleRegistrationDateVerify(str) {

// 	const reg = /d{4}-/d{2}-/d{2}

// 	if (reg.test(str)) {
// 		return true;
// 	} else {
// 		return false;
// 	}
// }

// 防止处理多次点击
export function noMultipleClicks(methods, info) {
	// methods是需要点击后需要执行的函数， info是点击需要传的参数
	let that = this;
	if (that.noClick) {
		// 第一次点击
		that.noClick = false;
		if (info && info !== '') {
			// info是执行函数需要传的参数
			methods(info);
		} else {
			methods();
		}
		setTimeout(() => {
			that.noClick = true;
		}, 2000)
	} else {
		// 这里是重复点击的判断
	}
}
