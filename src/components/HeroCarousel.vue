<template>
	<div class="d-flex flex-column">
		<swiper
			class="carousel mx-0"
			:autoplay="{
				delay: 5000,
			}"
			:modules="modules"
		>
			<swiper-slide v-for="item in carouselImages">
				<img
					class="w-100 d-block position-absolute h-100"
					:src="item.src"
					alt="Slide Image"
					style="filter: brightness(66%); object-fit: cover"
				/>
				<div
					class="container d-flex flex-column justify-content-center h-100"
				>
					<div class="row" style="height: 500px">
						<div
							class="col-md-7 offset-md-1 align-self-end"
							style="z-index: 1"
						>
							<div>
								<h1
									class="text-capitalize fw-bold text-primary"
								>
									{{ item.title }}
								</h1>
								<p class="fw-light text-white fs-4">
									{{ item.desc }}
								</p>
							</div>
						</div>
					</div>
				</div>
			</swiper-slide>
		</swiper>
	</div>
</template>

<script setup>
import api from "@/shared/services/api";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation } from "swiper";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useLoading } from "vue-loading-overlay";

import "swiper/css";
import "swiper/css/navigation";

const $loading = useLoading();
const $router = useRouter();
const listIstana = ref([]);
const currentIstana = ref(null);
const carouselImages = ref(null);

const props = defineProps({
	title: {
		type: String,
		required: false,
	},
	description: {
		type: String,
		required: false,
	},
	idIstana: {
		type: [String, Number],
		required: false,
	},
});

const fetchImages = (id) => {
	const loader = $loading.show();	
	try {
		getCurrentIstana();
		
		
		carouselImages.value = [];



		api.get(import.meta.env.VITE_APP_RESTFUL_BASE_URL + '/istana/get-header/' + id)
			.then((response) => {
				
				let data = response.data.data;
				let title = data.n_nama_istana;
				let header = data.c_header;

				for (let i = 0; i < header.length; i++) {
					carouselImages.value.push({
						src: header[i].gambar,
						desc: header[i].deskripsi,
						title: title
					})
				}
				
				
			})
			.catch((error) => {
				
			});
		loader.hide();
	} catch (error) {
		loader.hide();
		console.error(error);
	}
};

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

const getCurrentIstana = () => {
	if (
		!$router.currentRoute.value.params.id ||
		$router.currentRoute.value.params.id == undefined ||
		$router.currentRoute.value.params.id == null
	) {
		console.log(listIstana.value)
		currentIstana.value = listIstana.value.find((item) => item.id == 'df065cf0-622f-49f8-8d4f-b66eef2ebce5');
	} else {
		currentIstana.value = listIstana.value.find(
			(item) => item.id == $router.currentRoute.value.params.id
		);
	}
};

watch(
	() => $router.currentRoute.value.params.id,
	async (newId) => {
		await fetchImages(newId);
	}
);

onMounted(async () => {
	console.log(currentIstana.value)
	try {
		await getAllIstana();
		getCurrentIstana();
		await fetchImages(currentIstana.value.id);
	} catch (error) {
		
	}
});

const modules = [Autoplay, Navigation];
</script>
