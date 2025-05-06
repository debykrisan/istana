<template>
	<div class="bg-white container-md">
		<div class="p-5">
			<div class="row gy-3">
				<div class="col-12 d-flex flex-column align-items-center">
					<h1 class="text-center fs-2 fw-bold">
						{{ berita.n_judul }}
					</h1>
					<hr style="width: 50%; height: 2px; margin-top: 10px; margin-bottom: 10px;">
					<div class="gap-2 d-flex align-items-center">
						<span>Admin</span>
						<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16"
							class="bi bi-circle-fill" style="font-size: 4px">
							<circle cx="8" cy="8" r="8"></circle>
						</svg>
						<span>
							{{ currentIstana }}
						</span>
					</div>
					{{ formatDate(berita.d_publish_date) }}
				</div>
				

				<div class="col-12">
					<div class="mx-5">
						<img 
							class="mb-2 w-100" 
							:src="berita.c_id_gambar" 
							style="
								border-radius: 5px;
								object-fit: contain;
							" 
					 	/>	
					</div>
					<span class="text-muted mx-5" style="display: block; text-align: justify;">
						{{ berita.n_keterangan_foto }}. Fotografer: {{ berita.n_fotografer }}
					</span>
				</div>
				<div class="col-12">
					<div class="ql-editor fs-6 px-5 mb-4" v-html="berita.e_berita" ></div>
				</div>
			</div>
			<div class="d-flex justify-content-between align-items-center mt-5" v-if="!isEmpty">
				<h3 class="fw-bold d-inline-flex align-items-center justify-content-center">Artikel Terkait</h3>
				<hr class="w-75 m-0">
			</div>
			<BeritaSlider :beritaTerkait="beritaTerkait" :namaIstana="currentIstana" />
		</div>
	</div>
</template>

<script setup>
import api from "@/shared/services/api";
import BeritaSlider from "./BeritaSlider.vue";
import { onMounted, watch, ref } from "vue";
import { useRouter } from "vue-router";
import { useLoading } from "vue-loading-overlay";

const $loading = useLoading();
const $router = useRouter();
const idIstana = $router.currentRoute.value.params.idIstana;
const berita = ref({});
const beritaTerkait = ref([]);
const currentIstana = ref("");
const listIstana = ref([]);
const isEmpty = ref(false);

const fetchBerita = async (id) => {
	const loader = $loading.show();
	try {
		const response = await api.get(
			`${import.meta.env.VITE_APP_RESTFUL_BASE_URL}/berita/getbyid/${id}`
		);
		berita.value = response.data.data;
		loader.hide();
	} catch (error) {
		loader.hide();
		console.error(error);
	}
};

const fetchBeritaTerkait = async (idIstana) => {
	const loader = $loading.show();
	try {
		const response = await api.post(
			`${import.meta.env.VITE_APP_RESTFUL_BASE_URL}/berita/getbyistana`,
			{
				idIstana: idIstana,
			}
		);
		let data = response.data.data;
		beritaTerkait.value = data.filter((item) => item.id != berita.value.id);
		if (beritaTerkait.value.length == 0) {
			isEmpty.value = true;
		}
		beritaTerkait.value = beritaTerkait.value.slice(0, 10);
	} catch (error) {
		
	}
	finally {
		loader.hide();
	}
}

const getAllIstana = async () => {
	try {
		const response = await api.get(
			`${
				import.meta.env.VITE_APP_RESTFUL_BASE_URL
			}/istana/get-all-istana`
		);
		listIstana.value = response.data.data;
	} catch (error) {
		
	}
};

const formatDate = (date) => {
	const d = new Date(date);
	const timeZone =
		$router.currentRoute.value.params.idIstana == "4"
		? "Asia/Makassar"
		: "Asia/Jakarta";

	const formattedDateTime = d.toLocaleString("id-ID", {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric",
		hour: "numeric",
		minute: "numeric",
		timeZone: timeZone,
		timeZoneName: "short",
	});

	return `${formattedDateTime}`;
};

watch(
	() => $router.currentRoute.value.params.id,
	async (newId) => {
		await fetchBerita(newId);
		await fetchBeritaTerkait(idIstana);
	}
);

onMounted(async () => {
	await getAllIstana();
	currentIstana.value = listIstana.value.find(
		(istana) => istana.id == idIstana
	).nama_istana;
	await fetchBerita($router.currentRoute.value.params.id);
	await fetchBeritaTerkait(idIstana);
});
</script>
