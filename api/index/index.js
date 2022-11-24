import {
  BASE_URL
} from '../../config/config.js'

import {
  request
} from '../../utils/request.js'

// 首页
export function frontPageOrderMsg(data) {
  return request({
    url: BASE_URL + '/swagger-order/zjcCustomerInfo/frontPageOrderMsg',
    method: 'GET',
    data,
  })
}
//坐席 首页 轮播图 
export const getCarouselImgUrl = () => {
  return request({
    url: BASE_URL + '/swagger-order/zjcOrder/getCarouselImgUrl?type=1',
    method: 'GET',
  })
}
// 个人中心 全部订单
export function getAllOrderInfoList(data) {
  return request({
    url: BASE_URL + '/swagger-order/zjcCustomerInfo/getAllOrderInfoList',
    method: 'GET',
    data,
  })
}
// 合伙人中心 全部订单
export function getAllCatalogueInfoList(data) {
  return request({
    url: BASE_URL + '/swagger-order/zjcCustomerInfo/getAllCatalogueInfoList',
    method: 'GET',
    data,
  })
}

// 添加 录单
export function addCustomerInfo(data) {
  return request({
    url: BASE_URL + '/swagger-order/zjcCustomerInfo/addCustomerInfo',
    method: 'POST',
    data,
  })
}

// 录单管理
export function orderRecordPage(data) {
  return request({
    url: BASE_URL + '/swagger-order/zjcCustomerInfo/orderRecordPage',
    method: 'GET',
    data,
  })
}

// 录单列表
export function orderRecordDispatchSearchPage(data) {
  return request({
    url: BASE_URL + '/swagger-order/zjcCustomerInfo/orderRecordDispatchSearchPage',
    method: 'GET',
    data,
  })
}

// 修改客户信息
export function updateCustomerInfo(data) {
  return request({
    url: BASE_URL + '/swagger-order/zjcCustomerInfo/updateCustomerInfo',
    method: 'POST',
    data,
  })
}

// (录单管理)根据ID查询客户信息和订单号
export function getCustomerInfoById(data) {
  return request({
    url: BASE_URL + '/swagger-order/zjcCustomerInfo/getCustomerInfoById',
    method: 'GET',
    data,
  })
}

// 查询地区匹配的司机
export function areaMatch(data) {
  return request({
    url: BASE_URL + '/swagger-order/zjcCustomerInfo/areaMatch',
    method: 'POST',
    data,
  })
}
// 派单
export function dispatchOnlineOrder(data) {
  return request({
    url: BASE_URL + '/swagger-order/zjcCustomerInfo/dispatchOnlineOrder',
    method: 'POST',
    data,
  })
}

// 派单详情
export function getOrderMsgInfoById(data) {
  return request({
    url: BASE_URL + '/swagger-order/zjcOrderProcessLog/getOrderMsgInfoById',
    method: 'GET',
    data,
  })
}

// 订单详情
export function frontPageOrderDetails(data) {
  return request({
    url: BASE_URL + '/swagger-order/zjcCustomerInfo/frontPageOrderDetails',
    method: 'GET',
    data,
  })
}

// (个人中心)统计数量
export function totalNumberForSeater(data) {
  return request({
    url: BASE_URL + '/swagger-order/zjcCustomerInfo/totalNumberForSeater',
    method: 'GET',
    data,
  })
}


// 管理员坐席列表
export function seaterList(data) {
  return request({
    url: BASE_URL + '/swagger-order/zjcCustomerInfo/seaterList',
    method: 'GET',
    data,
  })
}
// 管理员录单列表
export function catalogueList(data) {
  return request({
    url: BASE_URL + '/swagger-order/zjcCustomerInfo/catalogueList',
    method: 'GET',
    data,
  })
}
// 管理员坐席订单内容列表
export function seaterOrderList(data) {
  return request({
    url: BASE_URL + '/swagger-order/zjcCustomerInfo/seaterOrderList',
    method: 'GET',
    data,
  })
}

// 管理员坐席饼图
export function seaterPie(data) {
  return request({
    url: BASE_URL + '/swagger-order/zjcCustomerInfo/seaterPie',
    method: 'GET',
    data,
  })
}

// 管理员坐席柱状图
export function seaterTreeVo(data) {
  return request({
    url: BASE_URL + '/swagger-order/zjcCustomerInfo/seaterTreeVo',
    method: 'GET',
    data,
  })
}
// 城市合伙人坐席饼图
export function seaterCataloguePie(data) {
  return request({
    url: BASE_URL + '/swagger-order/zjcCustomerInfo/seaterCataloguePie',
    method: 'GET',
    data,
  })
}

// 城市合伙人坐席柱状图   
export function seaterCatalogueTreeVo(data) {
  return request({
    url: BASE_URL + '/swagger-order/zjcCustomerInfo/seaterCatalogueTreeVo',
    method: 'GET',
    data,
  })
}
//司机列表
export function driverManageList(data) {
  return request({
    url: BASE_URL + '/swagger-order/zjcCustomerInfo/driverManageList',
    method: 'GET',
    data,
  })
}
//司机饼图 
export function driverPie(data) {
  return request({
    url: BASE_URL + '/swagger-order/zjcCustomerInfo/driverPie',
    method: 'GET',
    data,
  })
}
//司机柱状图 
export function driverTreeVo(data) {
  return request({
    url: BASE_URL + '/swagger-order/zjcCustomerInfo/driverTreeVo',
    method: 'GET',
    data,
  })
}
//司机总单查询
export function getAllCatalogueInfoManageList(data) {
  return request({
    url: BASE_URL + '/swagger-order/zjcCustomerInfo/getAllCatalogueInfoManageList',
    method: 'GET',
    data,
  })
}
// 管理员取消订单
export function cancelOrder(data) {
  return request({
    url: BASE_URL + '/swagger-order/zjcOrder/cancelOrder',
    method: 'POST',
    data,
  })
}
// 图片size返回
export function uploadFileTest(data) {
  return request({
    url: BASE_URL + '/swagger-order/zjcOrder/uploadFileTest',
    method: 'GET',
    data,
  })
}
//获取城区参数
export function selectAreaCount(data) {
  return request({
    url: BASE_URL + '/swagger-order/zjcCustomerInfo/selectAreaCount',
    method: 'GET',
    data,
  })
}
// 获取检测站列表 
export function getListForDriver(data) {
  return request({
    url: BASE_URL + '/swagger-system/zjcServiceBranch/selectServiceBranchLikeArea',
    method: 'GET',
    data,
  })
}
//获取有数据市级
export function selectCity(data) {
  return request({
    url: BASE_URL + '/swagger-order/zjcCustomerInfo/selectCity',
    method: 'GET',
    data,
  })
}
//测试接口 获取定位数组
export function getOrderTrajectory(data) {
  return request({
    url: BASE_URL + '/swagger-order/zjcOrder/getOrderTrajectory',
    method: 'GET',
    data,
  })
}
//添加检测站入驻
export function addNetworkStores(data) {
  return request({
    url: BASE_URL + '/swagger-system/zjcServiceBranch/addNetworkStores',
    method: 'POST',
    data
  })
}
