<template>
	<view style="
		height: 100vh;width: 100vw;position: absolute;">
		<div class="formDiv">
			<div class="imageDiv">
				<image class="imageStyle" src="../../static/img/flower.png"></image>
			</div>
			<button @click="loginByPhone()">PY帮你算</button>
			<button>二维码登录</button>
			<p class="pStyle" @click='loginForTourist()'>游客试用</p>

		</div>
	</view>
	<image class="backgroundDiv" src="../../static/img/background.jpg"></image>
</template>

<script lang="ts" setup>
	const loginByPhone = () => {
		uni.navigateTo({
			url: '/pages/login/loginByPhone/loginByPhone'
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