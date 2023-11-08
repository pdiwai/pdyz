<template>
	<view style="height: 100vh; width: 100vw; position: absolute">
		<view class="tabsStyle">
			<block v-for="(item, index) in tabs" :key="index">
				<view class="tabStyle" @tap="changeCurrentTab(item.index)" data-index="{{index}}"
					data-current="{{index}}">
					<p>{{ item.label }}</p>
				</view>
			</block>
		</view>
		<view class="tabWrap">
			<swiper current="{{currentTab}}" duration="300" @change="swiperTab" class="widthHight">
				<block v-for="(item, index) in cityList" :key="index">
					<swiper-item>
						<scroll-view class="widthHight" scroll-y="true">
							<div class="icon iconBig">
								<i :class="'qi-' + item.weatherInfo?.nowIcon"></i>
							</div>
							<div class="label">
								<p style="font-size: 5.5rem; float: left">
									{{item.weatherInfo?.nowTemp }}
								</p>
								<p>°C</p>
							</div>
							<div style="margin: -35px 0px 0px 205px">
								————————
								<p style="margin: 0px 0px 0px 20px">
									{{ item.weatherInfo?.nowWindScale }}级 体感:{{ item.weatherInfo?.nowFeelsLike}}°C
								</p>
							</div>
							<scroll-view style="
                  height: 75px;
                  width: 350px;
                  margin: 25px 0px 0px 20px;
                  box-shadow: inset 0px 0px 1px rgb(88, 88, 88);
                " scroll-y="true">
								<div v-for="(itemForHour, index) in item.weatherInfo?.hourInfo" :key="index">
									<i :class="'qi-' + itemForHour?.icon" class="icon iconSmall"
										style="background-color: #394046; color: white"></i>
									<p style="margin: 0px 0px 20px 0px">
										{{ itemForHour?.fxTime }} {{ itemForHour?.temp }}°C
									</p>
								</div>
							</scroll-view>

							<div style="margin: 25px 0px 0px 20px; font-size: 18px">
								<div v-for="(itemForDay, index) in item.weatherInfo?.dayInfo" :key="index">
									<i :class="'qi-' + itemForDay?.iconDay" class="icon iconSmall"></i>
									<p>{{ itemForDay?.fxDate }}</p>
									<p style="margin: 0px 0px 20px 0px">
										{{ itemForDay?.tempMin }}/{{ itemForDay?.tempMax }}°C
										{{ itemForDay?.windDirDay }}{{ itemForDay?.windScaleDay }}级
										{{ itemForDay?.textDay }}
									</p>
								</div>
							</div>
							<div class="divBorder" v-if="dayWeather.length > 1"></div>
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
		DailyType,
		DayWeatherVo,
		HourlyType,
		HourlyWeatherVo,
		CityObjType,
		RealLocationInfo,
		CityVo,
	} from "./type";
	import { onLoad } from "@dcloudio/uni-app";

	export default {
		setup() {
			onLoad((value) => {
				uni.showLoading()
				// 向提前用户发起授权请求,如果需要授权会自动弹出弹窗
				// 弹窗及授权内容不用自己写
				uni.authorize({
					scope: 'scope.userFuzzyLocation',
					complete() {
						// 请求模糊地址经纬度
						uni.getFuzzyLocation(({
							type: 'wgs84',
							complete: function (res : any) {
								uni.hideLoading()
								// 成功后调用逆地理api解析出实际位置
								uni.request({
									url: `https://api.map.baidu.com/reverse_geocoding/v3`,
									data: {
										ak: 'F0As4YtFqDGWhV4OxyejeKKCKRI8yA2u',
										output: 'json',
										coordtype: 'wgs84ll',
										location: `${res.latitude},${res.longitude}`
									},
									success(res : any) {
										const tempValue = res.data.result as unknown as RealLocationInfo
										localAdmName.value = tempValue.addressComponent.city;
										localLocationName.value = tempValue.addressComponent.district;
										// 调用和风天气的城市搜索api找出，本地区级的id
										uni.request({
											url:
												"https://geoapi.qweather.com/v2/city/lookup?location=" +
												localLocationName + "&adm=" + localAdmName +
												"&key=d4e3a54a435b49b684e4c84aecc63f9c",
											success(res) {
												const tempValue = res.data as unknown as CityVo;
												if (tempValue.location) {
													localLocationId.value = tempValue.location[0].id
												}
											},
										});
									},
								});
							}
						}));
					}
				})
				cityList.value = [];
				cityList.value.push({
					id: "101190201",
					name: "无锡",
					weatherInfo: {
						nowFeelsLike: '',
						nowIcon: '',
						nowWindScale: '',
						nowTemp: '',
						dayInfo: [],
						hourInfo: []
					}
				});
				if (value.queryValue) {
					cityList.value.push(JSON.parse(value.queryValue));
				}

				cityList.value.forEach((item) => {
					if (item.id !== "101190201") {
						const tempValue = {
							label: item.name,
							index: item.id,
							weatherInfo: {
								nowFeelsLike: '',
								nowIcon: '',
								nowWindScale: '',
								nowTemp: '',
								dayInfo: [],
								hourInfo: []
							}
						};
						// 把添加的城市插入到【添加城市】前一个
						tabs.splice(tabs.length - 1, 0, tempValue);
					}
				});

				cityList.value.forEach((item) => {
					getNowWeather(item.id);
					getDayWeather(item.id);
					getHourWeather(item.id);
				})

			});
			const cityName = ref<string>("无锡");
			const cityList = ref<Array<CityObjType>>([]);
			const tabs = [
				{ label: "无锡", index: "101190201" },
				{ label: "添加城市", index: "1" },
			];
			const currentTab = ref<string>("");
			const weather = ref<NowType>();
			const dayWeather = ref<Array<DailyType>>([]);
			const hourWeather = ref<Array<HourlyType>>([]);
			// 本地城市名称
			const localAdmName = ref<string>('');
			// 本地区名称
			const localLocationName = ref<string>('');
			// 本地区编号
			const localLocationId = ref<string>('');
			const getNowWeather = (location : string) => {
				uni.request({
					url: `https://devapi.qweather.com/v7/weather/now?location=${location}&key=d4e3a54a435b49b684e4c84aecc63f9c`,
					success(res) {
						const tempValue = res.data as unknown as NowWeatherVo;
						weather.value = tempValue.now;
						cityList.value.forEach((item) => {
							if (item.id === location) {
								item.weatherInfo.nowFeelsLike = tempValue.now.feelsLike;
								item.weatherInfo.nowIcon = tempValue.now.icon;
								item.weatherInfo.nowWindScale = tempValue.now.windScale;
								item.weatherInfo.nowTemp = tempValue.now.temp;
							}
						})
					},
				});
			};
			const getDayWeather = (location : string) => {
				uni.request({
					url: `https://devapi.qweather.com/v7/weather/7d?location=${location}&key=d4e3a54a435b49b684e4c84aecc63f9c`,
					success(res) {
						const tempValue = res.data as unknown as DayWeatherVo;
						dayWeather.value = tempValue.daily;
						cityList.value.forEach((item) => {
							if (item.id === location) {
								item.weatherInfo.dayInfo = tempValue.daily
							}
						})
					},
				});
			};

			const getHourWeather = (location : string) => {
				uni.request({
					url: `https://devapi.qweather.com/v7/weather/24h?location=${location}&key=d4e3a54a435b49b684e4c84aecc63f9c`,
					success(res) {
						const tempValue = res.data as unknown as HourlyWeatherVo;
						for (let i = 0; i <= tempValue.hourly.length; i++) {
							if (tempValue.hourly[i]?.fxTime) {
								tempValue.hourly[i].fxTime = tempValue.hourly[i].fxTime.slice(
									11,
									16
								);
							}
						}
						hourWeather.value = tempValue.hourly;
						cityList.value.forEach((item) => {
							if (item.id === location) {
								item.weatherInfo.hourInfo = tempValue.hourly
							}
						})
					},
				});
			};
			const init = () => {
				cityList.value.forEach((item) => {
					getNowWeather(item.id);
					getDayWeather(item.id);
					getHourWeather(item.id);
				})
			};
			init();

			const changeCurrentTab = (itemValue : string) => {
				currentTab.value = itemValue;
			};
			const swiperTab = () => { };
			const addCity = () => {
				uni.navigateTo({
					url: "/pages/tool/weather/chooseCity",
				});
			};

			return {
				weather,
				cityName,
				getNowWeather,
				init,
				getDayWeather,
				dayWeather,
				tabs,
				currentTab,
				changeCurrentTab,
				swiperTab,
				addCity,
				getHourWeather,
				hourWeather,
				cityList,
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