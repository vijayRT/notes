<template>
	<Teleport to="body">
		<div
			v-if="isCreateNoteModalOpen"
			class="fixed min-h-screen w-screen z-10 bg-gray-900/90 text-white flex justify-center items-center"
		>
			<div
				class="flex flex-col items-start lg:px-16 lg:py-8 bg-white text-slate-900 gap-y-12"
			>
				<div class="flex justify-between items-center w-full">
					<div class="flex text-2xl font-bold">Create a note</div>
					<button class="flex" @click.prevent="closeCreateNoteModal">
						Close
					</button>
				</div>
				<input
					class="block w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
					v-model="noteName"
				/>
				<button
					@click.prevent="create"
					class="bg-slate-900 text-white rounded-lg py-2 px-6"
				>
					Create
				</button>
			</div>
		</div>
	</Teleport>
</template>

<script setup lang="ts">
import { Database } from "~~/types/database.types";
import slugify from "slugify";
const isCreateNoteModalOpen = useIsCreateNoteModalOpen();

const closeCreateNoteModal = () => {
	isCreateNoteModalOpen.value = false;
};

const noteName = ref("");

const user = useSupabaseUser();
const client = useSupabaseClient<Database>();
const create = async () => {
	if (!noteName.value) {
		alert("Enter a note name");
		return;
	}
	if (!user) {
		alert("Unauthorized");
		return;
	}
	const { data: response, error } = await client
		.from("posts")
		.insert({
			title: noteName.value,
			slug: slugify(noteName.value, { lower: true }),
		})
		.select()
		.single();
	if (error) {
		console.log(error.message);
		alert("Could not create note!");
		return;
	}
	closeCreateNoteModal();
	await navigateTo(`/posts/${response.slug}/edit`, { replace: true });
};
</script>

<style lang="scss" scoped></style>
