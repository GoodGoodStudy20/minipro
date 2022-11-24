import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import {
	store
} from './store/index.js'

import {
	$msg,
	$confirm,
} from './utils/msg.js'
uni.$msg = $msg
uni.$confirm = $confirm

// 配置公共方法
import {
	noMultipleClicks
} from './utils/utils.js'
Vue.prototype.$noMultipleClicks = noMultipleClicks;

Vue.prototype.$store = store


Vue.config.productionTip = false


App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		store,
		app
	}
}
// #endif
