import {
	BASE_URL
} from '../../config/config.js'

import {
	request
} from '../../utils/request.js'

// 坐席人员登录接口

// 手机号登录 
export function seaterSideLogin(data) {
	return request({
		url: BASE_URL + '/swagger-system/sysMain/seaterSideLogin',
		method: 'POST',
		data
	})
}

// 获取验证码 
export function getSMSCode(data) {
	return request({
		url: BASE_URL + '/swagger-system/sysMain/getSMSCode',
		method: 'GET',
		data
	})
}
//code传递 
export function getCode(data) {
	return request({
		url: BASE_URL + '/swagger-system/wxUser/getCode',
		method: 'GET',
		data
	})
}

