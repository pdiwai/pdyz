<template>
	<view style="
		height: 100vh;width: 100vw;position: absolute;">
		<div class="formDiv">
			<div class="imageDiv">
				<image class="imageStyle" src="../../static/img/flower.png"></image>
			</div>
			<button @click="caculatorPage()">PY帮你算</button>
			<button @click="weatherPage()">PY天气</button>
			<p class="pStyle" @click='loginForTourist()'>游客试用</p>

		</div>
	</view>
	<image class="backgroundDiv" src="https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2149008800.jpg?w=740&t=st=1683599867~exp=1683600467~hmac=c2bd24e788b8e05f2eb33d6ddc4aa400ded4b55f720380b97067923bbb11f6dd"></image>
</template>

<script lang="ts" setup>
	const caculatorPage = () => {
		uni.navigateTo({
			url: '/pages/tool/caculator/index'
		})
	}
	const weatherPage = () => {
		uni.navigateTo({
			url: '/pages/tool/weather/index'
		})
	}

	const loginForTourist = () => {

	}
</script>
<style lang="less">
	.backgroundDiv {
		height: 100vh;
		width: 100vw;
	}

	.formDiv {
		height: 400px;
		margin-left: 20px;
		margin-right: 20px;
		background-color: rgba(259, 259, 259, 0.55);
		border-radius: 20px;
		box-shadow: 1px 2px 3px #9C3019;
	}

	.imageDiv {
		padding-top: 50px;
		margin-top: 160px;
		text-align: center;
	}

	.imageStyle {
		width: 100px;
		height: 100px;
	}

	button {
		width: 300px;
		border: 1px solid brown;
		background-color: transparent;
		color: brown;
		border-radius: 20px;
		margin-top: 20px;
	}

	.pStyle {
		margin-left: 42%;
		margin-top: 20px;
		color: darkgray;
		text-decoration: underline
	}
</style>