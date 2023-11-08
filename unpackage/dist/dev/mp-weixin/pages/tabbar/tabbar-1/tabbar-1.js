"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tabbar-1",
  setup(__props) {
    const title = common_vendor.ref("");
    title.value = "hello";
    const getTest = () => {
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(title.value),
        b: common_vendor.o(($event) => getTest())
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/admin/Desktop/胖大月子小程序/pages/tabbar/tabbar-1/tabbar-1.vue"]]);
wx.createPage(MiniProgramPage);
