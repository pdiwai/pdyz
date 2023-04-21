"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "loginByPhone",
  setup(__props) {
    const arrForCalculator = common_vendor.reactive(["%", "CE", "C", "删除", "1/x", "x方", "根号x", "/", 7, 8, 9, "*", 4, 5, 6, "-", 1, 2, 3, "+", "+/-", 0, ".", "="]);
    const tempArrayView = common_vendor.ref([]);
    const tempSignal = common_vendor.ref("");
    const clickBtn = (value) => {
      if (value === "删除") {
        tempArrayView.value = tempArrayView.value.slice(0, -1);
        return;
      } else if (value === "=") {
        for (var i = 0; i < tempArrayView.value.length; i++) {
        }
        tempArrayView.value = ["v我50查看答案"];
      } else {
        tempArrayView.value.push(String(value));
        if (typeof value === "string") {
          tempSignal.value = value;
        }
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(tempArrayView.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item),
            b: item
          };
        }),
        b: common_vendor.f(arrForCalculator, (item, k0, i0) => {
          return {
            a: common_vendor.t(item),
            b: item,
            c: common_vendor.o(($event) => clickBtn(item), item)
          };
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/admin/Desktop/佩大悦/pages/login/loginByPhone/loginByPhone.vue"]]);
wx.createPage(MiniProgramPage);
