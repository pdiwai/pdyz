<template>
	<view class="content">
		<button @click="getTest()">测试获取列表{{title}}</button>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from "vue";
	const title = ref<string>('')
	title.value='hello'
	
	const getTest=()=>{
		
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
		margin-top: 200upx;
	}
</style>