"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "login",
  setup(__props) {
    const loginByQrcode = () => {
      common_vendor.index.navigateTo({
        url: "/pages/login/loginByQrcode/loginByQrcode"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => loginByQrcode())
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/admin/Desktop/pdyz/佩大悦/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
