let appVersion = '1.0.0'
let BASE_URL = ''

if (process.env.NODE_ENV === 'development') {
  // 开发环境
  // BASE_URL = 'http://192.168.2.86:8010' //🤖新添本地服务器🐕‍🦺
  // BASE_URL = 'http://192.168.2.78:8009'
  // BASE_URL = 'http://192.168.2.113:8001'
  // BASE_URL = 'https://zjctestapp.gongxingtech.com'
  BASE_URL = 'https://zjcapp.gongxingtech.com' //正式
} else {
  // 生产环境
  BASE_URL = 'https://zjcapp.gongxingtech.com'
}

export {
  BASE_URL,
}
