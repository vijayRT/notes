<template>
	<nav class="flex justify-between px-8 py-8 lg:px-16 lg:py-8">
		<div class="text-2xl"><NuxtLink to="/">Notes</NuxtLink></div>
		<div class="flex gap-x-8">
			<button
				v-if="user"
				class="flex bg-white text-slate-900 font-bold px-4 py-2 rounded-lg"
				@click="$emit('createNoteClick')"
			>
				Create note</button
			><Login />
		</div>
	</nav>
</template>
<script setup lang="ts">
const user = useSupabaseUser();
</script>
