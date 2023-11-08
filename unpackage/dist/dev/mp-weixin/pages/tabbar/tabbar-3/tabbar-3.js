"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      active: false
    };
  },
  onLoad() {
  },
  onShow() {
    this.active = true;
  },
  onHide() {
    this.active = false;
  },
  methods: {
    goToPage(url) {
      if (!url)
        return;
      common_vendor.index.navigateTo({
        url
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.active ? 1 : "",
    b: common_vendor.o(($event) => $options.goToPage("/pages/tabbar-3-detial/tabbar-3-release/tabbar-3-release")),
    c: common_vendor.o(($event) => $options.goToPage("/pages/tabbar-3-detial/tabbar-3-video/tabbar-3-video")),
    d: common_vendor.o(($event) => $options.goToPage("/pages/tabbar-3-detial/tabbar-3-qa/tabbar-3-qa")),
    e: $data.active ? 1 : ""
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-afdd7fb7"], ["__file", "C:/Users/admin/Desktop/胖大月子小程序/pages/tabbar/tabbar-3/tabbar-3.vue"]]);
wx.createPage(MiniProgramPage);
