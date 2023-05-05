"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  setup() {
    const weather = common_vendor.ref();
    const location = common_vendor.ref([]);
    const dayWeather = common_vendor.ref([]);
    const cityName = common_vendor.ref("无锡");
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
    const init = () => {
      getCity();
      getNowWeather();
      getDayWeather();
    };
    init();
    return {
      weather,
      location,
      cityName,
      getCity,
      getNowWeather,
      init,
      getDayWeather,
      dayWeather
    };
  },
  onPullDownRefresh() {
    this.init();
    common_vendor.index.stopPullDownRefresh();
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b, _c;
  return {
    a: common_vendor.t((_a = $setup.location[0]) == null ? void 0 : _a.name),
    b: common_vendor.n("qi-" + ((_b = $setup.weather) == null ? void 0 : _b.icon)),
    c: common_vendor.t((_c = $setup.weather) == null ? void 0 : _c.temp),
    d: common_vendor.f($setup.dayWeather, (item, index, i0) => {
      return {
        a: common_vendor.n("qi-" + (item == null ? void 0 : item.iconDay)),
        b: common_vendor.n("qi-" + (item == null ? void 0 : item.iconNight)),
        c: common_vendor.t(item == null ? void 0 : item.fxDate),
        d: common_vendor.t(item == null ? void 0 : item.textDay),
        e: common_vendor.t(item.tempMin),
        f: common_vendor.t(item.tempMax),
        g: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/admin/Desktop/佩大悦/pages/tool/weather/index.vue"]]);
wx.createPage(MiniProgramPage);
