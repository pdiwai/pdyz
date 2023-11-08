<template>
	<view style="height: 100vh; width: 100vw; position: absolute">
		<div>
			<input type="text" class="searchInput" placeholder="  请输入城市" placeholder-style="color:#30363b"
				@input="inputChangeCiity">

			<div class="cityOption" v-for="(item, index) in cityList" :key="index">
				<a @click='chooseCity(item.id,item.name)' style="color:#2e445e">
					<p v-if="item.adm2===item.name">{{item.country}}-{{item.adm1}}-{{item.adm2}}</p>
					<p v-else>{{item.country}}-{{item.adm1}}-{{item.adm2}}-{{item.name}}</p>
				</a>
			</div>
		</div>
	</view>
	<image class="backgroundDiv"
		src="https://img.freepik.com/premium-photo/white-cumulus-clouds-against-blue-sky-beautiful-large-thunderclouds-sky_423170-3211.jpg?w=360">
	</image>
</template>
<script lang="ts">
	import { ref } from "vue"
	import {
		CityVo, LocationType
	} from "./type";

	export default {
		setup() {

			const cityObj = ref<{ id : string; name : string }>({
				id: '',
				name: '',
			})
			const cityList = ref<Array<LocationType>>()
			const inputChangeCiity = (value : any) => {
				uni.request({
					url:
						"https://geoapi.qweather.com/v2/city/lookup?location=" +
						value.detail.value +
						"&key=d4e3a54a435b49b684e4c84aecc63f9c",
					success(res) {
						const tempValue = res.data as unknown as CityVo;
						cityList.value = tempValue.location
					},
				});
			}

			const chooseCity = (valueID : string, valueCity : string) => {
				cityObj.value.id = valueID;
				cityObj.value.name = valueCity;
				const queryValue = JSON.stringify(cityObj.value)
				wx.navigateTo({
					url: `/pages/tool/weather/index?queryValue=${queryValue}`
				})
			}
			return {
				inputChangeCiity, cityList, chooseCity
			};
		},

	};
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

	.searchInput {
		border-radius: 20px;
		margin: 10px;
		background-color: transparent;
		height: 30px;
		border: 1px solid #30363b;
	}

	.cityOption {
		text-align: center;
		padding: 10px;
		box-shadow: 1px 0px 1px 0px #45648c;
	}
</style>