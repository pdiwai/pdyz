<template>
	<view style="
		height: 100vh;width: 100vw;position: absolute;
		z-index: 2;">
		<div style="text-align: center;margin:20px 0px 0px 0px;">
			{{location[0]?.name}}
		</div>
		<div class=" icon iconBig">
			<i :class="'qi-'+weather?.icon"></i>
		</div>
		<div class="label">
			<p style="font-size: 5.5rem;float: left;">{{weather?.temp}}</p>
			<p>°C</p>
		</div>
		<div style="margin: -35px 0px 0px 205px;">————————
			<p style="margin:0px 0px 0px 20px;">{{weather?.windScale}}级 体感:{{weather?.feelsLike}}°C</p>
		</div>
		<div style="margin:25px 0px 0px 20px;font-size: 18px;">
			<div v-for="(item,index) in dayWeather" :key="index">
				<i :class="'qi-'+item?.iconDay" class="icon iconSmall"></i>
				<p>{{item?.fxDate}}</p>
				<p style="margin:0px 0px 20px 0px;">{{item.tempMin}}/{{item.tempMax}}°C
					{{item?.windDirDay}}{{item?.windScaleDay}}级 {{item?.textDay}}
				</p>
			</div>
		</div>
	</view>
	<div class="divBorder"></div>
	<image class="backgroundDiv"
		src='https://img.freepik.com/premium-photo/white-cumulus-clouds-against-blue-sky-beautiful-large-thunderclouds-sky_423170-3211.jpg?w=360'>
	</image>
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

	p {
		color: #30363b;
	}

	.backgroundDiv {
		height: 100vh;
		width: 100vw;
		z-index: 0;
	}

	.icon {
		margin-left: 20px;
		background-color: #ebe7ff;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #30363b;
		border-radius: 50%;
	}

	.iconBig {
		font-size: 3.4rem;
		width: 68px;
		height: 68px;
		box-shadow: 0px 0px 7px white;
		border: 5px solid white;
		float: left;
		margin-top: 20px;

	}

	.iconSmall {
		font-size: 1.3rem;
		border: 2px solid Gainsboro;
		width: 28px;
		height: 28px;
		float: left;
	}

	.label {
		font-size: 20px;
		text-overflow: ellipsis;
		white-space: nowrap;
		height: 100px;
		color: #394046;
		margin: 0px 0px 50px 220px;
	}

	.divBorder {
		border-right: 2px solid #394046;
		height: 610px;
		margin: 140px 55px;
		position: absolute;
		z-index: 1;
	}
</style>