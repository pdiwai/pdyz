<template>
	<view style="
		height: 100vh;width: 100vw;position: absolute;">
		<!-- <div>
			<input type="text" p class="searchInput">
		</div> -->
		<div style="text-align: center;margin-top:20px;margin-bottom: ;: 20px;color: #30363b;">
			{{location[0]?.name}}
		</div>
		<div class=" icon iconBig">
			<i :class="'qi-'+weather?.icon"></i>
		</div>
		<div class="label">
			<p style="font-size: 5.5rem;float: left;">{{weather?.temp}}</p>
			<p>°C</p>
		</div>
		<div style="margin-left: 205px; margin-top: -35px;color: #30363b">————————
			<p style="margin-left: 20px;">{{weather?.windScale}}级 体感:{{weather?.feelsLike}}°C</p>
		</div>
		<div style="color: #30363b;margin-left: 20px;font-size: 18px;margin-top: 25px;">
			<div v-for="(item,index) in dayWeather" :key="index">
				<i :class="'qi-'+item?.iconDay" class="icon iconSmall"></i>
				<p>{{item?.fxDate}}</p>
				<p style="margin-bottom: 20px;">{{item.tempMin}}/{{item.tempMax}}°C
					{{item?.windDirDay}}{{item?.windScaleDay}}级 {{item?.textDay}}
				</p>
			</div>
		</div>
	</view>

	<image style="" class="backgroundDiv"
		src='https://img.freepik.com/free-photo/concrete-room-corner-shadow-sunlight-wallpaper-concept_53876-31794.jpg?w=826&t=st=1683600911~exp=1683601511~hmac=0c0bee669698c01fcaa61bc81c4f95110f6a3f0d3053ad633e119eb0ebfef739'>
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

	.backgroundDiv {
		height: 100vh;
		width: 100vw;
	}


	.searchInput {
		border-radius: 20px;
		margin: 10px;
		background-color: transparent;
		height: 30px;
		border: 1px solid #30363b;
	}


	.icon {
		margin-left: 20px;
		background-color: transparent;
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
		box-shadow: 0px 0px 7px #30363b;
		border: 5px solid #30363b;
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
		// font-family: qweather-icons;
		font-size: 20px;
		text-overflow: ellipsis;
		white-space: nowrap;
		height: 100px;
		color: #30363b;
		margin-left: 220px;
		margin-bottom: 50px;
	}
</style>