"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  setup() {
    common_vendor.onLoad(async (value) => {
      await common_vendor.index.showLoading();
      cityList.value = [];
      cityList.value.push({
        id: "101190201",
        name: "无锡",
        weatherInfo: {
          nowFeelsLike: "",
          nowIcon: "",
          nowWindScale: "",
          nowTemp: "",
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
              nowFeelsLike: "",
              nowIcon: "",
              nowWindScale: "",
              nowTemp: "",
              dayInfo: [],
              hourInfo: []
            }
          };
          tabs.splice(tabs.length - 1, 0, tempValue);
        }
      });
      cityList.value.forEach((item) => {
        getNowWeather(item.id);
        getDayWeather(item.id);
        getHourWeather(item.id);
      });
      common_vendor.index.authorize({
        scope: "scope.userFuzzyLocation",
        complete() {
          common_vendor.index.getFuzzyLocation({
            type: "wgs84",
            complete: function(res) {
              common_vendor.index.hideLoading();
              common_vendor.index.request({
                url: `https://api.map.baidu.com/reverse_geocoding/v3`,
                data: {
                  ak: "F0As4YtFqDGWhV4OxyejeKKCKRI8yA2u",
                  output: "json",
                  coordtype: "wgs84ll",
                  location: `${res.latitude},${res.longitude}`
                },
                success(res2) {
                  const tempValue = res2.data.result;
                  localAdmName.value = tempValue.addressComponent.city;
                  localLocationName.value = tempValue.addressComponent.district;
                  cityList.value[0].name = tempValue.addressComponent.district;
                  common_vendor.index.request({
                    url: "https://geoapi.qweather.com/v2/city/lookup?location=" + localLocationName.value + "&adm=" + localAdmName.value + "&key=d4e3a54a435b49b684e4c84aecc63f9c",
                    success(res3) {
                      const tempValue2 = res3.data;
                      if (tempValue2.location) {
                        localLocationId.value = tempValue2.location[0].id;
                        cityList.value[0].id = tempValue2.location[0].id;
                      }
                    }
                  });
                }
              });
            }
          });
        }
      });
    });
    const cityName = common_vendor.ref("无锡");
    const cityList = common_vendor.ref([]);
    const tabs = [
      { label: "无锡", index: "101190201" },
      { label: "添加城市", index: "1" }
    ];
    const currentTab = common_vendor.ref("");
    const weather = common_vendor.ref();
    const dayWeather = common_vendor.ref([]);
    const hourWeather = common_vendor.ref([]);
    const localAdmName = common_vendor.ref("");
    const localLocationName = common_vendor.ref("");
    const localLocationId = common_vendor.ref("");
    const getNowWeather = (location) => {
      common_vendor.index.request({
        url: `https://devapi.qweather.com/v7/weather/now?location=${location}&key=d4e3a54a435b49b684e4c84aecc63f9c`,
        success(res) {
          const tempValue = res.data;
          weather.value = tempValue.now;
          cityList.value.forEach((item) => {
            if (item.id === location) {
              item.weatherInfo.nowFeelsLike = tempValue.now.feelsLike;
              item.weatherInfo.nowIcon = tempValue.now.icon;
              item.weatherInfo.nowWindScale = tempValue.now.windScale;
              item.weatherInfo.nowTemp = tempValue.now.temp;
            }
          });
        }
      });
    };
    const getDayWeather = (location) => {
      common_vendor.index.request({
        url: `https://devapi.qweather.com/v7/weather/7d?location=${location}&key=d4e3a54a435b49b684e4c84aecc63f9c`,
        success(res) {
          const tempValue = res.data;
          dayWeather.value = tempValue.daily;
          cityList.value.forEach((item) => {
            if (item.id === location) {
              item.weatherInfo.dayInfo = tempValue.daily;
            }
          });
        }
      });
    };
    const getHourWeather = (location) => {
      common_vendor.index.request({
        url: `https://devapi.qweather.com/v7/weather/24h?location=${location}&key=d4e3a54a435b49b684e4c84aecc63f9c`,
        success(res) {
          var _a;
          const tempValue = res.data;
          for (let i = 0; i <= tempValue.hourly.length; i++) {
            if ((_a = tempValue.hourly[i]) == null ? void 0 : _a.fxTime) {
              tempValue.hourly[i].fxTime = tempValue.hourly[i].fxTime.slice(
                11,
                16
              );
            }
          }
          hourWeather.value = tempValue.hourly;
          cityList.value.forEach((item) => {
            if (item.id === location) {
              item.weatherInfo.hourInfo = tempValue.hourly;
            }
          });
        }
      });
    };
    const init = () => {
      cityList.value.forEach((item) => {
        getNowWeather(item.id);
        getDayWeather(item.id);
        getHourWeather(item.id);
      });
    };
    init();
    const changeCurrentTab = (itemValue) => {
      currentTab.value = itemValue;
    };
    const swiperTab = () => {
    };
    const addCity = () => {
      common_vendor.index.navigateTo({
        url: "/pages/tool/weather/chooseCity"
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
      cityList
    };
  },
  onPullDownRefresh() {
    this.init();
    common_vendor.index.stopPullDownRefresh();
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($setup.tabs, (item, index, i0) => {
      return {
        a: common_vendor.t(item.label),
        b: common_vendor.o(($event) => $setup.changeCurrentTab(item.index), index),
        c: index
      };
    }),
    b: common_vendor.f($setup.cityList, (item, index, i0) => {
      var _a, _b, _c, _d, _e, _f;
      return common_vendor.e({
        a: common_vendor.n("qi-" + ((_a = item.weatherInfo) == null ? void 0 : _a.nowIcon)),
        b: common_vendor.t((_b = item.weatherInfo) == null ? void 0 : _b.nowTemp),
        c: common_vendor.t((_c = item.weatherInfo) == null ? void 0 : _c.nowWindScale),
        d: common_vendor.t((_d = item.weatherInfo) == null ? void 0 : _d.nowFeelsLike),
        e: common_vendor.f((_e = item.weatherInfo) == null ? void 0 : _e.hourInfo, (itemForHour, index2, i1) => {
          return {
            a: common_vendor.n("qi-" + (itemForHour == null ? void 0 : itemForHour.icon)),
            b: common_vendor.t(itemForHour == null ? void 0 : itemForHour.fxTime),
            c: common_vendor.t(itemForHour == null ? void 0 : itemForHour.temp),
            d: index2
          };
        }),
        f: common_vendor.f((_f = item.weatherInfo) == null ? void 0 : _f.dayInfo, (itemForDay, index2, i1) => {
          return {
            a: common_vendor.n("qi-" + (itemForDay == null ? void 0 : itemForDay.iconDay)),
            b: common_vendor.t(itemForDay == null ? void 0 : itemForDay.fxDate),
            c: common_vendor.t(itemForDay == null ? void 0 : itemForDay.tempMin),
            d: common_vendor.t(itemForDay == null ? void 0 : itemForDay.tempMax),
            e: common_vendor.t(itemForDay == null ? void 0 : itemForDay.windDirDay),
            f: common_vendor.t(itemForDay == null ? void 0 : itemForDay.windScaleDay),
            g: common_vendor.t(itemForDay == null ? void 0 : itemForDay.textDay),
            h: index2
          };
        })
      }, $setup.dayWeather.length > 1 ? {} : {}, {
        g: index
      });
    }),
    c: $setup.dayWeather.length > 1,
    d: common_vendor.o((...args) => $setup.addCity && $setup.addCity(...args)),
    e: common_vendor.o((...args) => $setup.swiperTab && $setup.swiperTab(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/admin/Desktop/胖大月子小程序/pages/tool/weather/index.vue"]]);
wx.createPage(MiniProgramPage);
