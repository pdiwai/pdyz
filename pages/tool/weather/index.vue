<template>
	<view>
		<div>
			<input type="text" placeholder="请输入城市名称" class="searchInput">
		</div>
		<div>
			当前城市：{{location[0]?.name}}
		</div>
		<div class="icon">
			<i :class="'qi-'+weather?.icon"></i>
			<div class="label">{{weather?.temp}}°C {{weather?.text}} {{weather?.windDir}}</div>
		</div>
		多天预报
		<div v-for="(item,index) in dayWeather" :key="index">
			<i :class="'qi-'+item?.iconDay"></i><i :class="'qi-'+item?.iconNight"></i>{{item?.fxDate}} {{item?.textDay}}
			{{item.tempMin}}°C-{{item.tempMax}}°C
		</div>
	</view>
</template>
<script lang="ts">
	import { ref } from 'vue'
	import { NowWeatherVo, NowType, LocationType, CityVo, DailyType, DayWeatherVo } from './type'
	export default {
		setup() {
			const weather = ref<NowType>()
			const location = ref<Array<LocationType>>([])
			const dayWeather = ref<Array<DailyType>>([])
			const cityName = ref<string>('无锡')
			const getCity = () => {
				uni.request({
					url: 'https://geoapi.qweather.com/v2/city/lookup?location=' + cityName.value + '&key=d4e3a54a435b49b684e4c84aecc63f9c',
					success(res) {
						const tempValue = res.data as unknown as CityVo;
						location.value = tempValue.location
					}
				});
			}
			const getNowWeather = () => {
				uni.request({
					url: 'https://devapi.qweather.com/v7/weather/now?location=101190201&key=d4e3a54a435b49b684e4c84aecc63f9c',
					success(res) {
						const tempValue = res.data as unknown as NowWeatherVo;
						weather.value = tempValue.now
					}
				});
			}
			const getDayWeather = () => {
				uni.request({
					url: 'https://devapi.qweather.com/v7/weather/7d?location=101190201&key=d4e3a54a435b49b684e4c84aecc63f9c',
					success(res) {
						const tempValue = res.data as unknown as DayWeatherVo;
						dayWeather.value = tempValue.daily
					}
				});
			}
			const init = () => {
				getCity();
				getNowWeather();
				getDayWeather()
			}
			init()

			return {
				weather, location, cityName, getCity, getNowWeather, init, getDayWeather, dayWeather
			}
		},

		onPullDownRefresh() {
			this.init()
			uni.stopPullDownRefresh()
		}
	}
</script>

<style lang="less">
	@import url("../../../static/qweather-icons/font/qweather-icons.css");

	.searchInput {
		border-radius: 20px;
		margin: 10px;
		background-color: darkgray;
		height: 30px;
	}


	.icon {
		background-color: transparent;
		border-radius: 20px;
		font-size: 9rem;
		text-align: center;
		color: palevioletred;
	}

	.label {
		font-family: qweather-icons;
	}

	.label {
		width: 100%;
		overflow: hidden;
		font-size: 2rem;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>