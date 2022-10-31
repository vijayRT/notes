<script setup lang="ts">
import GithubIcon from "~/assets/images/github-icon.svg";

const user = useSupabaseUser();
const client = useSupabaseClient();
const router = useRouter();
const login = async (provider: "github") => {
	const { error } = await client.auth.signInWithOAuth({ provider });
	if (error) {
		console.log(error.message);
		return alert("Something went wrong !");
	}
	router.push("/");
};

const logout = () => {
	client.auth.signOut();
};
</script>
<template>
	<button v-if="user" @click.prevent="logout">Logout</button>
	<button v-else class="flex" @click="login('github')">Login</button>
</template>
