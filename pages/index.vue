<script setup lang="ts">
import type { Database } from "~/types/database.types";

const client = useSupabaseClient<Database>();
const { data: posts } = await useAsyncData("posts", async () => {
	const { data, error } = await client
		.from("posts")
		.select("*")
		.order("created_at");
	if (error) {
		console.log(error);
		return [];
	}
	return data;
});
</script>
<template>
	<section>
		<ul class="list-disc list-inside mt-8 gap-y-4">
			<li class="text-xl my-4" v-for="post in posts">
				<NuxtLink :to="`posts/${post.slug}`">
					<span class="decoration-solid">{{ post.title }}</span>
				</NuxtLink>
			</li>
		</ul>
	</section>
</template>
