<template>
	<div class="bg-white container-md">
		<div class="p-5">
			<div class="row gy-3">
				<div class="col-12 d-flex flex-column align-items-center">
					<h1 class="text-center fs-2 fw-bold">
						Sejarah {{ istana.nama_istana }}
					</h1>
				</div>
				<div class="mb-5 col-12">
					<img class="mb-2 w-100 h-100" :src="istana.gambar" style="
								max-height: 740px;
								max-width: 100%;
								border-radius: 5px;
								object-fit: contain;
							" />
				</div>
				<!-- <div class="mb-5 col-12 lh-lg" v-html="berita.e_berita"></div> -->
				<div class="mb-5 col-12 lh-lg">
					<div class="ql-editor" v-html="istana.deskripsi_istana"></div>
				</div>
				<div class="d-flex justify-content-between align-items-center mt-5">
					<h3 class="fw-bold d-inline-flex align-items-center justify-content-center">Istana Lainnya</h3>
					<hr class="w-75 m-0">
				</div>
				<SejarahIstanaLainnya :istanaLainnya="listIstana" />
			</div>
		</div>
	</div>
</template>

<script setup>
import api from "@/shared/services/api";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useLoading } from "vue-loading-overlay";
import SejarahIstanaLainnya from "./SejarahIstanaLainnya.vue";

const $loading = useLoading();
const $router = useRouter();
const idIstana = $router.currentRoute.value.params.idIstana;
const istana = ref([]);
const listIstana = ref([]);

const getAllIstana = async () => {
	const loader = $loading.show()
	try {
		const response = await api.get(
			`${
				import.meta.env.VITE_APP_RESTFUL_BASE_URL
			}/istana/get-all-istana`
		);
		let data = response.data.data;
		listIstana.value = data.filter((item) => item.id != idIstana);
		istana.value = data.filter((item) => item.id == idIstana)[0];
		console.log(listIstana.value)
	} catch (error) {
		
	}
	finally {
		loader.hide()
	}
};

onMounted(async () => {
	getAllIstana();
});
</script>
