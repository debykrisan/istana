<script setup>
import AppLayoutDefault from "./themes/AuthLayout.vue";
import { markRaw, ref, watch } from "vue";
import { useRoute } from "vue-router";

const layout = ref();
const route = useRoute();

watch(
	() => route.meta.layout,
	async (metaLayout) => {
		try {
			const component =
				metaLayout &&
				(await import(/* @vite-ignore */ `./themes/${metaLayout}.vue`));
			layout.value = markRaw(component?.default || AppLayoutDefault);
			console.log(metaLayout, "layout");
		} catch (e) {
			layout.value = markRaw(AppLayoutDefault);
			console.log(layout.value, "layout error");
		}
	},
	{ immediate: true }
);
</script>

<template>
	<component :is="layout"> <router-view /> </component>
</template>
