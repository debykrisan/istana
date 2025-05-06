<template>
	<div class="card-body">
		<div class="row">
			<div class="col-md-12">
				<ul v-for="item in daftarUser" :key="item.id">
					<li>{{ item.name }} - {{ item.email }}</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script setup>
import { ref, onMounted, onBeforeMount } from "vue";
import api from "@/shared/services/api";

const daftarUser = ref([]);
const fetchUser = () => {
	api.get(import.meta.env.VITE_APP_RESTFUL_BASE_URL + "/home/index")
		.then((response) => {
			daftarUser.value = response.data;
			
		})
		.catch(function (error) {
			
		});
};

onBeforeMount(() => {});
onMounted(async () => {
	fetchUser();
});
</script>
