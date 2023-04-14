"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/login/index.js";
  "./pages/tabbar/tabbar-1/tabbar-1.js";
  "./pages/tabbar/tabbar-3/tabbar-3.js";
  "./pages/tabbar/tabbar-5/tabbar-5.js";
  "./pages/tabbar-3-detial/tabbar-3-release/tabbar-3-release.js";
  "./pages/tabbar-3-detial/tabbar-3-video/tabbar-3-video.js";
  "./pages/tabbar-3-detial/tabbar-3-qa/tabbar-3-qa.js";
  "./pages/login/loginByPhone/loginByPhone.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/admin/Desktop/pdyz/佩大悦/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
