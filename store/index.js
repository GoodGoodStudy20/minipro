import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const store = new Vuex.Store({
	state: {
		userInfo: uni.getStorageSync('userInfo') || {},
		carNumber:'',
		newCarNumber:'',
    date: '',
    startTime: '',
    endTime: ''
	},
	mutations: {
		SETUSERINFO(state, userInfo) {
			state.userInfo = userInfo
		},
		setCarNumber(state, value){
			console.log('55',value);
			state.carNumber = value
			state.newCarNumber = value
		},
		setnewCarNumber(state, value){
			state.newCarNumber = value
		},
		setDate(state,val){
		  // console.log('tme',val);
      val ? val : ''
		  state.date = val
		},
		setStarTime(state,val){
      val ? val : ''
		  console.log(val);
		  state.startTime = val
		},
		setEndTime(state,val){
      val ? val : ''
		  state.endTime = val
		}
	}
})

export {
	store
}
