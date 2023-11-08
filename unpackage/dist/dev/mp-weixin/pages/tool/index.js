"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const caculatorPage = () => {
      common_vendor.index.navigateTo({
        url: "/pages/tool/caculator/index"
      });
    };
    const weatherPage = () => {
      common_vendor.index.navigateTo({
        url: "/pages/tool/weather/index"
      });
    };
    const loginForTourist = () => {
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => caculatorPage()),
        b: common_vendor.o(($event) => weatherPage()),
        c: common_vendor.o(($event) => loginForTourist())
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/admin/Desktop/胖大月子小程序/pages/tool/index.vue"]]);
wx.createPage(MiniProgramPage);
