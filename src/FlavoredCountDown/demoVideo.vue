<template>
	<video controls>
		<source :src="demoUrl" type="video/mp4" />
	</video>
</template>

<script setup lang="ts">
	import demoUrl from './demo.mp4?url'
</script>

<style scoped>
	video {
		max-width: 100%;
		height: auto;
	}
</style>
