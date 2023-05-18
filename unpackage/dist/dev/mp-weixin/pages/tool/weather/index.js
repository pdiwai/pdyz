"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  setup() {
    common_vendor.onLoad((value) => {
      cityList.value = [];
      cityList.value.push({
        id: "101190201",
        name: "无锡"
      });
      if (value.queryValue) {
        cityList.value.push(JSON.parse(value.queryValue));
      }
      cityList.value.forEach((item) => {
        if (item.id !== "101190201") {
          const tempValue = {
            label: item.name,
            index: item.id
          };
          tabs.splice(tabs.length - 1, 0, tempValue);
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
    const location = common_vendor.ref([]);
    const dayWeather = common_vendor.ref([]);
    const hourWeather = common_vendor.ref([]);
    const getCity = () => {
      common_vendor.index.request({
        url: "https://geoapi.qweather.com/v2/city/lookup?location=" + cityName.value + "&key=d4e3a54a435b49b684e4c84aecc63f9c",
        success(res) {
          const tempValue = res.data;
          location.value = tempValue.location;
        }
      });
    };
    const getNowWeather = () => {
      common_vendor.index.request({
        url: "https://devapi.qweather.com/v7/weather/now?location=101190201&key=d4e3a54a435b49b684e4c84aecc63f9c",
        success(res) {
          const tempValue = res.data;
          weather.value = tempValue.now;
        }
      });
    };
    const getDayWeather = () => {
      common_vendor.index.request({
        url: "https://devapi.qweather.com/v7/weather/7d?location=101190201&key=d4e3a54a435b49b684e4c84aecc63f9c",
        success(res) {
          const tempValue = res.data;
          dayWeather.value = tempValue.daily;
        }
      });
    };
    const getHourWeather = () => {
      common_vendor.index.request({
        url: "https://devapi.qweather.com/v7/weather/24h?location=101190201&key=d4e3a54a435b49b684e4c84aecc63f9c",
        success(res) {
          var _a;
          const tempValue = res.data;
          hourWeather.value = tempValue.hourly;
          for (let i = 0; i <= hourWeather.value.length; i++) {
            if ((_a = hourWeather.value[i]) == null ? void 0 : _a.fxTime) {
              hourWeather.value[i].fxTime = hourWeather.value[i].fxTime.slice(
                11,
                16
              );
            }
          }
        }
      });
    };
    const init = () => {
      getCity();
      getNowWeather();
      getDayWeather();
      getHourWeather();
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
  var _a, _b, _c, _d;
  return {
    a: common_vendor.f($setup.tabs, (item, index, i0) => {
      return {
        a: common_vendor.t(item.label),
        b: common_vendor.o(($event) => $setup.changeCurrentTab(item.index), index),
        c: index
      };
    }),
    b: common_vendor.f($setup.cityList, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.f($setup.hourWeather, (item2, index2, i1) => {
          return {
            a: common_vendor.n("qi-" + (item2 == null ? void 0 : item2.icon)),
            b: common_vendor.t(item2 == null ? void 0 : item2.fxTime),
            c: common_vendor.t(item2 == null ? void 0 : item2.temp),
            d: index2
          };
        }),
        b: common_vendor.f($setup.dayWeather, (item2, index2, i1) => {
          return {
            a: common_vendor.n("qi-" + (item2 == null ? void 0 : item2.iconDay)),
            b: common_vendor.t(item2 == null ? void 0 : item2.fxDate),
            c: common_vendor.t(item2 == null ? void 0 : item2.tempMin),
            d: common_vendor.t(item2 == null ? void 0 : item2.tempMax),
            e: common_vendor.t(item2 == null ? void 0 : item2.windDirDay),
            f: common_vendor.t(item2 == null ? void 0 : item2.windScaleDay),
            g: common_vendor.t(item2 == null ? void 0 : item2.textDay),
            h: index2
          };
        })
      }, $setup.dayWeather.length > 1 ? {} : {}, {
        c: index
      });
    }),
    c: common_vendor.n("qi-" + ((_a = $setup.weather) == null ? void 0 : _a.icon)),
    d: common_vendor.t((_b = $setup.weather) == null ? void 0 : _b.temp),
    e: common_vendor.t((_c = $setup.weather) == null ? void 0 : _c.windScale),
    f: common_vendor.t((_d = $setup.weather) == null ? void 0 : _d.feelsLike),
    g: $setup.dayWeather.length > 1,
    h: common_vendor.o((...args) => $setup.addCity && $setup.addCity(...args)),
    i: common_vendor.o((...args) => $setup.swiperTab && $setup.swiperTab(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/admin/Desktop/佩大悦/pages/tool/weather/index.vue"]]);
wx.createPage(MiniProgramPage);
