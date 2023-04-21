<template>
	<view>
		<div class="result">
			<div style="float: left;" v-for="(item,) in tempArrayView" :key="item">{{item}}</div>
		</div>
		<div></div>
		<div class="divForBackground">
			<div class="divForBtn" v-for="(item,) in arrForCalculator" :key="item" @click='clickBtn(item)'>
				{{item}}
			</div>
		</div>
	</view>
</template>

<script lang="ts" setup>
	import { reactive, ref } from "vue";

	const arrForCalculator = reactive<Array<string | number>>(['%', 'CE', 'C', '删除', '1/x', 'x方', '根号x', '/', 7, 8, 9, '*', 4, 5, 6, '-', 1, 2, 3, '+', '+/-', 0, '.', '='])
	const tempArrayView = ref<Array<String>>([])
	const tempSignal=ref<string>('')
	const clickBtn = (value : string | number) => {
		if (value === '删除') {
			tempArrayView.value = tempArrayView.value.slice(0, -1)
			return;
		} else if (value === '=') {
			// tempArrayView.value = eval(((tempArrayView.value).toString()).replace(/,/g, ''))
			for (var i = 0; i < tempArrayView.value.length; i++) {
			}
			tempArrayView.value=['v我50查看答案']
		}
		else {
			tempArrayView.value.push(String(value))
			if (typeof (value) === 'string') {
				tempSignal.value=value
			}
		}
	}
</script>

<style lang="less">
	.result {
		height: 200px;
		width: 100vw;
		background-color: gainsboro;
		text-align: end;
		font-size: 50px;
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