<template>
	<div class="admin-news">
		<News />
	</div>
</template>

<script setup lang="ts">
import News from '~/md/news.md';
</script>

<style>
.admin-news {
	padding: 1rem;
}

.admin-news h1 {
	font-size: 22px;
}

.admin-news h2 {
	font-size: 18px;
}

.admin-news h2 + p {
	font-weight: 600;
	font-size: 16px;
}
</style>
