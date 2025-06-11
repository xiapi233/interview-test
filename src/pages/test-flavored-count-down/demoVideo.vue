<template>
	<video controls controlsList="nodownload " disablepictureinpicture>
		<source :src="demoUrl" type="video/mp4" />
	</video>
</template>

<script setup lang="ts">
	import demoUrl from './demo.mp4?url'
</script>

<style scoped>
	video {
		max-width: 300px;
		height: auto;
	}
</style>
