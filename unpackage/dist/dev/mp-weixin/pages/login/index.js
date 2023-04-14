"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const loginByPhone = () => {
      common_vendor.index.navigateTo({
        url: "/pages/login/loginByPhone/loginByPhone"
      });
    };
    const loginForTourist = () => {
      common_vendor.index.request({
        url: "/register/anonimous"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => loginByPhone()),
        b: common_vendor.o(($event) => loginForTourist())
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/admin/Desktop/pdyz/佩大悦/pages/login/index.vue"]]);
wx.createPage(MiniProgramPage);
