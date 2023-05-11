<template>
  <view style="height: 100vh; width: 100vw; position: absolute">
    <view class="tabs_v">
      <block v-for="(item, index) in tabs" :key="index">
        <view
          class="tab_v {{index<1?'tab_nature':'tab_course'}}"
          @tap="changeCurrentTab(item.index)"
          data-index="{{index}}"
          data-current="{{index}}"
        >
          <text class="tab_txt {{currentTab==index? 'tab_v_active' : ''}}">{{
            item.label
          }}</text>
        </view>
      </block>
    </view>
    <view class="tabWrap">
      <swiper
        current="{{currentTab}}"
        duration="300"
        @change="swiperTab"
        style="width: 100%; height: 100%"
      >
        <block>
          <swiper-item>
            <scroll-view
              style="width: 100%; height: 100%; z-index: 2"
              scroll-y="true"
              bindscrolltolower="scrollToLower"
              bindscrolltoupper="scrollToUpper"
              lower-threshold="30"
              upper-threshold="30"
            >
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
              <div style="margin: 25px 0px 0px 20px; font-size: 18px">
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
          <swiper-item style="width: 100%; height: 100%">
            <view class="" style="width: 100%; height: 100%">
              <scroll-view
                style="width: 100%; height: 100%"
                scroll-y="true"
                bindscrolltolower="scrollToLower"
                bindscrolltoupper="scrollToUpper"
                lower-threshold="30"
                upper-threshold="30"
              >
                <view style="width: 100%; height: auto"> 页面2 </view>
              </scroll-view>
            </view>
          </swiper-item>
        </block>
      </swiper>
    </view>
  </view>
  <image
    class="backgroundDiv"
    src="https://img.freepik.com/premium-photo/white-cumulus-clouds-against-blue-sky-beautiful-large-thunderclouds-sky_423170-3211.jpg?w=360"
  >
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
  DayWeatherVo,
} from "./type";
export default {
  setup() {
    const cityName = ref<string>("无锡");
    const tabs = [
      { label: cityName.value, index: 0 },
      { label: "其他", index: 1 },
    ];
    const currentTab = ref<number>(0);
    const weather = ref<NowType>();
    const location = ref<Array<LocationType>>([]);
    const dayWeather = ref<Array<DailyType>>([]);
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
    const init = () => {
      getCity();
      getNowWeather();
      getDayWeather();
    };
    init();

    const changeCurrentTab = (itemValue: number) => {
      currentTab.value = itemValue;
    };
    const swiperTab = () => {};

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
      swiperTab,
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

.tabs_v {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.tab_v {
  width: 50%;
  text-align: center;
}

.tab_txt {
  border-bottom: 2px solid transparent;
  padding-bottom: 14px;
  color: #000000;
}

.tab_v_active {
  border-bottom: 2px solid #00c6ac;
  color: #00c6ac;
  font-weight: bold;
}

.tabWrap {
  width: 100%;
  height: calc(100% - 67px);
  position: relative;
  border-bottom: 1px solid #e6e6e6;
}

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
  height: 580px;
  margin: -550px 55px;
  position: absolute;
  z-index: -1;
}
</style>
