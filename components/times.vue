<template>
	<view>
		<view class="time">
			{{liveCountdown}}
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			endTime: {
				type: String,
				default: ''
			},
		},
		data() {
			return {
				liveCountdown: '',
				liveCountTimes: null,
			};
		},

		mounted() {
			if (this.liveCountTimes) {
				clearInterval(this.liveCountTimes)
			}
			this.getLiveTimeCount(this.endTime)
		},
		methods: {
			getLiveTimeCount(startTime) {
				if (startTime) { //如果设置了开始时间
					this.liveCountTimes = setInterval(() => {
						//注：不论安卓还是ios，请将时间如 2020-02-02 20:20:20 转化为 2020/02/02 20:20:20 这种形式后再使用，否则无法转换，如下转换即可↓
						let transedPreTime = startTime.replace('T', ' ').replace(/-/g,
							'/') //这里转化时间格式为以/分隔形式
						// console.log(transedPreTime)
						let nowTime = new Date().getTime();
						let preTime = new Date(transedPreTime).getTime()
						let obj = null;
						if (preTime - nowTime > 0) {
							let time = (preTime - nowTime) / 1000;
							let day = parseInt(time / (60 * 60 * 24));
							let hou = parseInt(time % (60 * 60 * 24) / 3600);
							let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
							let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
							obj = {
								day: day < 10 ? '0' + day : day,
								hou: hou < 10 ? '0' + hou : hou,
								min: min < 10 ? '0' + min : min,
								sec: sec < 10 ? '0' + sec : sec
							};
							this.liveCountdown = obj.day + '天' + obj.hou + '时' + obj.min + '分' + obj.sec +
								'秒'
						} else {
							// obj = {day:'00',hou:'00',min:'00',sec:'00'};
							// this.liveCountdown=obj.day + '天' + obj.hou + '时' + obj.min + '分' + obj.sec + '秒'
							this.liveCountdown = '已结束'
							clearInterval(this.liveCountTimes)
						}
					}, 1000)


				} else {
					this.liveCountdown = ""
				}
			},
		}
	}
</script>

<style>

</style>
