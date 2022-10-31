<script setup lang="ts">
import type { Database } from "~/types/database.types";
import Showdown from "showdown";
const client = useSupabaseClient<Database>();
const route = useRoute();
const showdownConverter = new Showdown.Converter();
showdownConverter.setFlavor("github");
const { data: post } = await useAsyncData(
	`post-${route.params.slug}`,
	async () => {
		const { data, error } = await client
			.from("posts")
			.select("id, title, content")
			.filter("slug", "eq", route.params.slug)
			.single();
		if (error) {
			console.log(error);
			return;
		}
		return data;
	}
);
const parsedMarkdown = computed(() =>
	showdownConverter.makeHtml(post.value.content)
);
</script>
<template>
	<section>
		<article class="prose prose-invert" v-html="parsedMarkdown" />
	</section>
</template>
