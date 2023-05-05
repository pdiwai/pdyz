<template>
	<view style="
		height: 100vh;width: 100vw;position: absolute;">
		<div>
			<input type="text" p class="searchInput">
		</div>
		<div style="text-align: center;margin-bottom: 20px;color: white;">
			{{location[0]?.name}}
		</div>
		<div class="icon">
			<i :class="'qi-'+weather?.icon"></i>
		</div>
		<div class="label">°C
			<p style="font-size: 6rem;float: left;">{{weather?.temp}}</p>
		</div>
		<div style="color: white;margin-left: 20px;font-size: 18px;">
			<div v-for="(item,index) in dayWeather" :key="index">
				<i :class="'qi-'+item?.iconDay"></i><i :class="'qi-'+item?.iconNight"></i>{{item?.fxDate}}
				{{item?.textDay}}
				{{item.tempMin}}°C-{{item.tempMax}}°C
			</div>
		</div>
	</view>
	<image class="backgroundDiv" src="https://img95.699pic.com/photo/40136/5123.gif_wh860.gif"></image>
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

	.backgroundDiv {
		height: 110vh;
		width: 200vw;
		// background-color: LightSlateGray;
	}


	.searchInput {
		border-radius: 20px;
		margin: 10px;
		background-color: transparent;
		height: 30px;
		border: 1px solid white;
	}


	.icon {
		margin-left: 20px;
		background-color: transparent;
		font-size: 3.3rem;
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
		border-radius: 50%;
		border: 5px solid Gainsboro;
		box-shadow: 0px 0px 7px Gainsboro;
		width: 66px;
		height: 66px;
		float: left;
	}

	.label {
		// font-family: qweather-icons;
		font-size: 20px;
		text-overflow: ellipsis;
		white-space: nowrap;
		height: 100px;
		color: white;
		margin-left: 220px;
		margin-bottom: 50px;
	}
</style>