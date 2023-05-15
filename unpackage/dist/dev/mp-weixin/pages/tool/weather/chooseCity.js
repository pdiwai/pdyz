"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  setup() {
    const cityID = common_vendor.ref("");
    const cityList = common_vendor.ref();
    const inputChangeCiity = (value) => {
      common_vendor.index.request({
        url: "https://geoapi.qweather.com/v2/city/lookup?location=" + value.detail.value + "&key=d4e3a54a435b49b684e4c84aecc63f9c",
        success(res) {
          const tempValue = res.data;
          cityList.value = tempValue.location;
        }
      });
    };
    const chooseCity = (value) => {
      cityID.value = value;
      common_vendor.wx$1.navigateTo({
        url: `/pages/tool/weather/index?city=${cityID.value}`
      });
    };
    return {
      inputChangeCiity,
      cityList,
      chooseCity
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $setup.inputChangeCiity && $setup.inputChangeCiity(...args)),
    b: common_vendor.f($setup.cityList, (item, index, i0) => {
      return common_vendor.e({
        a: item.adm2 === item.name
      }, item.adm2 === item.name ? {
        b: common_vendor.t(item.country),
        c: common_vendor.t(item.adm1),
        d: common_vendor.t(item.adm2)
      } : {
        e: common_vendor.t(item.country),
        f: common_vendor.t(item.adm1),
        g: common_vendor.t(item.adm2),
        h: common_vendor.t(item.name)
      }, {
        i: common_vendor.o(($event) => $setup.chooseCity(item.id), index),
        j: index
      });
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/admin/Desktop/佩大悦/pages/tool/weather/chooseCity.vue"]]);
wx.createPage(MiniProgramPage);
