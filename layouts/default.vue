<script setup lang="ts">
const isCreateNoteModalOpen = useIsCreateNoteModalOpen();
const openCreateNoteModal = () => {
	isCreateNoteModalOpen.value = true;
};
</script>

<template>
	<div class="min-h-screen bg-slate-900 text-white">
		<Header @create-note-click="openCreateNoteModal" />
		<div class="flex mt-16 lg:px-16">
			<slot />
		</div>
		<CreateNoteModal />
	</div>
</template>
