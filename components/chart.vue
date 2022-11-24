<template>
	<view class="charts-box">
		<qiun-data-charts type="pie" :opts="opts" :chartData="chartData" />
	</view>
</template>

<script>
	export default {
		props: {
			chartPie: {
				type: Object,
				require: true,
				default: () => {}
			}
		},
		data() {
			return {
				chartData: {},
				//您可以通过修改 config-ucharts.js 文件中下标为 ['pie'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
				opts: {
					color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
						"#ea7ccc"
					],
					padding: [5, 5, 5, 5],
					legend: {
						show: false,
						position: "right",
						lineHeight: 25
					},
					extra: {
						pie: {
              customRadius:85, //自定义半径
							activeOpacity: 0.5,//启用Tooltip点击时，突出部分的透明度
							activeRadius: 5,//启用Tooltip点击时，突出部分的宽度（不超过labelWidth）
							offsetAngle: 50,//起始角度偏移度数，顺时针方向，起点为3点钟位置为0都
							labelWidth: 5,//数据标签到饼图外圆连线的长度
							// border: true,//是否绘制各类别中间的分割线
							border: false,
							borderWidth: 0.5,//分割线的宽度
							borderColor: "#FFFFFF" //分割线的颜色
						}
					}
				}
			};
		},
		mounted() {
			this.getServerData();
		},
		watch: {
			chartPie(newVal) {
				this.chartData = JSON.parse(JSON.stringify(newVal));
			}
		},
		methods: {
			getServerData() {
				setTimeout(() => {
					this.chartData = JSON.parse(JSON.stringify(this.chartPie));
				}, 500);
			},
		}
	};
</script>

<style scoped>
	/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
	.charts-box {
		width: 100%;
		height: 100%;
	}
</style>
