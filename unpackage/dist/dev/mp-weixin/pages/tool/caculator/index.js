"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const arrForCalculator = common_vendor.reactive(["%", "CE", "C", "删除", "1/x", "x方", "根号x", "/", 7, 8, 9, "*", 4, 5, 6, "-", 1, 2, 3, "+", "+/-", 0, ".", "="]);
    const tempArrayView = common_vendor.ref([]);
    const clickBtn = (value) => {
      const tempLength = common_vendor.ref(0);
      if (value === "删除") {
        tempArrayView.value = tempArrayView.value.slice(0, -1);
      } else if (value === "CE" || value === "C") {
        tempArrayView.value = [];
      } else if (value === "1/x") {
        tempArrayView.value = [1 / parseFloat(tempArrayView.value.toString().replace(/,/g, ""))];
      } else if (value === "x方") {
        tempArrayView.value = [Math.pow(parseFloat(tempArrayView.value.toString().replace(/,/g, "")), 2)];
      } else if (value === "根号x") {
        tempArrayView.value = [Math.sqrt(parseFloat(tempArrayView.value.toString().replace(/,/g, "")))];
      } else if (value === "+/-") {
        if (tempArrayView.value[0] === "-") {
          tempArrayView.value = tempArrayView.value.slice(1, tempArrayView.value.length);
        } else {
          tempArrayView.value.unshift("-");
        }
      } else {
        const tempResult = common_vendor.ref(0);
        const tempSignal = common_vendor.ref("");
        const isContinuousSignal = common_vendor.ref(false);
        const continuousStart = common_vendor.ref(0);
        tempArrayView.value.push(value);
        for (var i = 0; i <= tempArrayView.value.length; i++) {
          if (typeof tempArrayView.value[i] === "string" && tempArrayView.value[i] !== ".") {
            tempLength.value += 1;
          }
        }
        if (tempLength.value > 1) {
          if (typeof tempArrayView.value[0] === "string") {
            tempArrayView.value.unshift(0);
          }
          for (var i = 0; i <= tempArrayView.value.length; i++) {
            if (typeof tempArrayView.value[i] === "string" && tempArrayView.value[i] !== ".") {
              if (typeof tempArrayView.value[i + 1] === "string") {
                isContinuousSignal.value = true;
                if (typeof tempArrayView.value[i - 1] === "number") {
                  continuousStart.value = i;
                }
              } else {
                const numberOne = tempArrayView.value.slice(0, i).toString().replace(/,/g, "");
                const numberTwo = tempArrayView.value.slice(i + 1, tempArrayView.value.length - 1).toString().replace(/,/g, "");
                tempSignal.value = tempArrayView.value[i];
                switch (tempSignal.value) {
                  case "+":
                    tempResult.value = parseFloat(numberOne) + parseFloat(numberTwo);
                    break;
                  case "-":
                    tempResult.value = parseFloat(numberOne) - parseFloat(numberTwo);
                    break;
                  case "*":
                    tempResult.value = parseFloat(numberOne) * parseFloat(numberTwo);
                    break;
                  case "/":
                    tempResult.value = parseFloat(numberOne) / parseFloat(numberTwo);
                    break;
                  case "%":
                    tempResult.value = parseFloat(numberOne) % parseFloat(numberTwo);
                    break;
                  case ".":
                    tempResult.value = tempArrayView.value.slice(0, tempArrayView.value.length - 1).toString().replace(/,/g, "");
                    break;
                }
                tempArrayView.value = [tempResult.value];
              }
              if (value !== "=") {
                if (isContinuousSignal.value) {
                  tempArrayView.value[continuousStart.value] = tempArrayView.value[tempArrayView.value.length - 1];
                  tempArrayView.value = tempArrayView.value.slice(0, continuousStart.value + 1);
                } else {
                  tempArrayView.value.push(value);
                }
              } else {
                if (isContinuousSignal.value) {
                  tempArrayView.value[continuousStart.value] = tempArrayView.value[tempArrayView.value.length - 1];
                  tempArrayView.value = tempArrayView.value.slice(0, continuousStart.value + 1);
                }
              }
              return;
            }
            if (tempArrayView.value[i] === ".") {
              continue;
            }
          }
        }
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(tempArrayView.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index
          };
        }),
        b: common_vendor.f(arrForCalculator, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index,
            c: common_vendor.o(($event) => clickBtn(item), index)
          };
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/admin/Desktop/佩大悦/pages/tool/caculator/index.vue"]]);
wx.createPage(MiniProgramPage);
