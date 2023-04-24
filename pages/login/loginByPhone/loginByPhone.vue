<template>
	<view>
		<div class="result">
			<div style="float: left;" v-for="(item,index) in tempArrayView" :key="index">{{item}}</div>
		</div>
		<div></div>
		<div class="divForBackground">
			<div class="divForBtn" v-for="(item,index) in arrForCalculator" :key="index" @click='clickBtn(item)'>
				{{item}}
			</div>
		</div>
	</view>
</template>

<script lang="ts" setup>
	import { reactive, ref } from "vue";

	const arrForCalculator = reactive<Array<string | number>>(['%', 'CE', 'C', '删除', '1/x', 'x方', '根号x', '/', 7, 8, 9, '*', 4, 5, 6, '-', 1, 2, 3, '+', '+/-', 0, '.', '='])
	const tempArrayView = ref<Array<String>>([])
	const clickBtn = (value : string | number) => {
		const tempLength = ref<number>(0)
		if (value === '删除') {
			tempArrayView.value = tempArrayView.value.slice(0, -1)
		} else if (value === 'CE' || value === 'C') {
			tempArrayView.value = []
		} else if (value === '1/x') {
			tempArrayView.value = [1 / parseFloat(((tempArrayView.value).toString()).replace(/,/g, '')) as any]
		} else if (value === 'x方') {
			tempArrayView.value = [Math.pow(parseFloat(((tempArrayView.value).toString()).replace(/,/g, '')), 2) as any]
		} else if (value === '根号x') {
			tempArrayView.value = [Math.sqrt(parseFloat(((tempArrayView.value).toString()).replace(/,/g, ''))) as any]
		} else if (value === '+/-') {
				console.log(tempArrayView.value)
			if (tempArrayView.value[0] === '-') {
				tempArrayView.value = [tempArrayView.value.slice(0, 1) as any]
			} else {
				tempArrayView.value = [tempArrayView.value.unshift('-') as any]
			}
		} else {
			const tempResult = ref<number>(0)
			const tempSignal = ref<string>('')
			// 如果不是删除，就把按的值push到需要显示的数组里
			tempArrayView.value.push(value as any)
			// 把输入内容里的计算符号都拎出来
			for (var i = 0; i <= tempArrayView.value.length; i++) {
				if (typeof (tempArrayView.value[i]) === 'string') {
					tempLength.value += 1
				}
			}
			// 如果输入的符号数量大于1，就把前面输入的内容自动计算
			if (tempLength.value > 1) {
				// 如果第一个输入的就是符号，就在符号前加个0
				if (typeof (tempArrayView.value[0]) === 'string') {
					tempArrayView.value.unshift(0 as any)
				}
				for (var i = 0; i <= tempArrayView.value.length; i++) {
					// 遍历数组，把第一个符号当做计算符号，并根据符号进行表达式计算
					if (typeof (tempArrayView.value[i]) === 'string') {
						const numberOne = ((tempArrayView.value.slice(0, i)).toString()).replace(/,/g, '')
						const numberTwo = ((tempArrayView.value.slice(i + 1, tempArrayView.value.length - 1)).toString()).replace(/,/g, '')
						tempSignal.value = tempArrayView.value[i] as string
						switch (tempSignal.value) {
							case '+':
								tempResult.value = parseFloat(numberOne) + parseFloat(numberTwo)
								break;
							case '-':
								tempResult.value = parseFloat(numberOne) - parseFloat(numberTwo)
								break;
							case '*':
								tempResult.value = parseFloat(numberOne) * parseFloat(numberTwo)
								break;
							case '/':
								tempResult.value = parseFloat(numberOne) / parseFloat(numberTwo)
								break;
							case '%':
								tempResult.value = parseFloat(numberOne) % parseFloat(numberTwo)
								break;
							case '.':
								tempResult.value = ((tempArrayView.value.slice(0, tempArrayView.value.length - 1)).toString()).replace(/,/g, '') as any
								break;
							default:
								break;
						}
						tempArrayView.value = [tempResult.value as any]
						if (value !== '=') {
							tempArrayView.value.push(value as any)
						}
						return;
					}
				}
			}
		}


		// tempArrayView.value = eval(((tempArrayView.value).toString()).replace(/,/g, ''))
		// tempArrayView.value = ['v我50查看答案']
	}
</script>

<style lang="less">
	.result {
		height: 200px;
		width: 100vw;
		background-color: gainsboro;
		text-align: end;
		font-size: 33px;
		font-weight: 800;
		float: left;
	}

	.divForBackground {
		background-color: gainsboro;
		width: 100vw;
	}

	.divForBtn {
		width: 85px;
		height: 85px;
		display: flex;
		justify-content: center;
		align-items: center;
		float: left;
		margin-left: 8px;
		border-radius: 5px;
		background-color: transparent;
	}
</style>