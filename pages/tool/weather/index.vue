<template>
	<view style="height: 100vh; width: 100vw; position: absolute">
		<view class="tabsStyle">
			<block v-for="(item, index) in tabs" :key="index">
				<view class="tabStyle" @tap="changeCurrentTab(item.index)" data-index="{{index}}"
					data-current="{{index}}">
					<p>{{item.label}}</p>
				</view>
			</block>
		</view>
		<view class="tabWrap">
			<swiper current="{{currentTab}}" duration="300" @change="swiperTab" class="widthHight">
				<block>
					<swiper-item>
						<scroll-view class="widthHight" scroll-y="true">
							<!-- 	<div style="text-align: center;margin:20px 0px 0px 0px;">
										{{location[0]?.name}}
									</div> -->
							<div class="icon iconBig">
								<i :class="'qi-' + weather?.icon"></i>
							</div>
							<div class="label">
								<p style="font-size: 5.5rem; float: left">
									{{ weather?.temp }}
								</p>
								<p>°C</p>
							</div>
							<div style="margin: -35px 0px 0px 205px">
								————————
								<p style="margin: 0px 0px 0px 20px">
									{{ weather?.windScale }}级 体感:{{ weather?.feelsLike }}°C
								</p>
							</div>
							<scroll-view style="height: 75px;margin: 25px 0px 0px 20px; " scroll-y="true">
								<div v-for="(item, index) in hourWeather" :key="index">
									<i :class="'qi-' + item?.icon" class="icon iconSmall" style="background-color: #394046;color: white;"></i>
									<p style="margin: 0px 0px 20px 0px">{{ item?.fxTime }} {{ item.temp }}°C </p>
								</div>
							</scroll-view>

							<div style="margin: 25px 0px 0px 20px; font-size: 18px;">
								<div v-for="(item, index) in dayWeather" :key="index">
									<i :class="'qi-' + item?.iconDay" class="icon iconSmall"></i>
									<p>{{ item?.fxDate }}</p>
									<p style="margin: 0px 0px 20px 0px">
										{{ item.tempMin }}/{{ item.tempMax }}°C {{ item?.windDirDay
                    }}{{ item?.windScaleDay }}级 {{ item?.textDay }}
									</p>
								</div>
							</div>
							<div class="divBorder"></div>
						</scroll-view>
					</swiper-item>
				</block>
				<block>
					<swiper-item class="widthHight">
						<scroll-view class="widthHight" scroll-y="true" bindscrolltolower="scrollToLower"
							bindscrolltoupper="scrollToUpper" lower-threshold="30" upper-threshold="30">
							<view style="width: 100%; height: auto">
								<div @click="addCity" class="divAdd">+</div>
							</view>
						</scroll-view>
					</swiper-item>
				</block>
			</swiper>
		</view>
	</view>
	<image class="backgroundDiv"
		src="https://img.freepik.com/premium-photo/white-cumulus-clouds-against-blue-sky-beautiful-large-thunderclouds-sky_423170-3211.jpg?w=360">
	</image>

</template>
<script lang="ts">
	import { ref } from "vue";
	import {
		NowWeatherVo,
		NowType,
		LocationType,
		CityVo,
		DailyType,
		DayWeatherVo, HourlyType, HourlyWeatherVo
	} from "./type";
	export default {
		setup() {

			const cityName = ref<string>("无锡");
			const tabs = [
				{ label: cityName.value, index: 0 },
				{ label: "添加城市", index: 1 },
			];
			const currentTab = ref<number>(0);
			const weather = ref<NowType>();
			const location = ref<Array<LocationType>>([]);
			const dayWeather = ref<Array<DailyType>>([]);
			const hourWeather = ref<Array<HourlyType>>([]);
			const getCity = () => {
				uni.request({
					url:
						"https://geoapi.qweather.com/v2/city/lookup?location=" +
						cityName.value +
						"&key=d4e3a54a435b49b684e4c84aecc63f9c",
					success(res) {
						const tempValue = res.data as unknown as CityVo;
						location.value = tempValue.location;
					},
				});
			};
			const getNowWeather = () => {
				uni.request({
					url: "https://devapi.qweather.com/v7/weather/now?location=101190201&key=d4e3a54a435b49b684e4c84aecc63f9c",
					success(res) {
						const tempValue = res.data as unknown as NowWeatherVo;
						weather.value = tempValue.now;
					},
				});
			};
			const getDayWeather = () => {
				uni.request({
					url: "https://devapi.qweather.com/v7/weather/7d?location=101190201&key=d4e3a54a435b49b684e4c84aecc63f9c",
					success(res) {
						const tempValue = res.data as unknown as DayWeatherVo;
						dayWeather.value = tempValue.daily;
					},
				});
			};

			const getHourWeather = () => {
				uni.request({
					url: "https://devapi.qweather.com/v7/weather/24h?location=101190201&key=d4e3a54a435b49b684e4c84aecc63f9c",
					success(res) {
						const tempValue = res.data as unknown as HourlyWeatherVo;
						hourWeather.value = tempValue.hourly
						for (let i = 0; i <= hourWeather.value.length; i++) {
							hourWeather.value[i].fxTime = hourWeather.value[i].fxTime.slice(11, 16)
						}
					},
				});
			};
			const init = () => {
				getCity();
				getNowWeather();
				getDayWeather();
				getHourWeather()
			};
			init();

			const changeCurrentTab = (itemValue : number) => {
				currentTab.value = itemValue;
			};
			const swiperTab = () => { };
			const addCity = () => {
				uni.navigateTo({
					url: '/pages/tool/weather/chooseCity'
				})
			}

			return {
				weather,
				location,
				cityName,
				getCity,
				getNowWeather,
				init,
				getDayWeather,
				dayWeather,
				tabs,
				currentTab,
				changeCurrentTab,
				swiperTab, addCity, getHourWeather, hourWeather
			};
		},

		onPullDownRefresh() {
			this.init();
			uni.stopPullDownRefresh();
		},
	};
</script>

<style lang="less">
	@import url("../../../static/qweather-icons/font/qweather-icons.css");


	.widthHight {
		height: 100%;
		width: 100%;
	}

	p {
		color: #30363b;
	}

	.tabsStyle {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.tabStyle {
		width: 50%;
		text-align: center;
		margin-top: 15px;
	}

	.tabWrap {
		width: 100%;
		height: calc(100% - 67px);
		position: relative;
	}

	.backgroundDiv {
		height: 100vh;
		width: 100vw;
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
		margin-top: 40px;
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
		height: 635px;
		margin: -650px 55px;
		position: absolute;
		z-index: -1;

	}

	.divAdd {
		border: 3px solid #515c64;
		height: 500px;
		width: 300px;
		position: absolute;
		margin: 60px 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 90px;
		color: #57626b;
	}
</style>