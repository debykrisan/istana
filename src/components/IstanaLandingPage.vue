<template>
	<HeroCarousel />
	<div class="container-lg" style="background: white">
		<div class="p-5">
			<div class="row">
				<div class="col-12 order-2">
					<router-link
						:to="{
							name: 'berita',
							params: {
								idIstana: item.i_id_istana,
								id: item.id,
							},
						}"
						v-for="item in beritaHeadline"
						:key="item.id"
					>
						<div
							class="berita-featured position-relative d-flex flex-column justify-content-end align-items-start p-3 text-white"
							style="min-height: 550px; height: 100%"
						>
							<div
								:src="item.c_id_gambar"
								alt=""
								class="position-absolute d-block top-0 start-0 w-100 h-100"
								style="
									background: rgb(0, 0, 0);
									background: linear-gradient(
										0deg,
										rgba(0, 0, 0, 1) 0%,
										rgba(255, 255, 255, 0) 50%
									);
									border-radius: 5px;
									z-index: 2;
								"
							></div>
							<img
								:src="item.c_id_gambar"
								alt=""
								class="position-absolute d-block top-0 start-0 w-100 h-100"
								style="
									object-fit: cover;
									border-radius: 5px;
									z-index: 1;
								"
							/>
							<div style="z-index: 10">
								<h2 class="fw-normal">
									{{ item.n_judul }}
								</h2>
								<div class="d-flex align-items-center mb-2">
									<small
										class="px-2 py-1 border border-opacity-10 rounded-2 me-3"
										>{{
											getIstanaName(item.i_id_istana)
										}}</small
									>
									<small>{{ item.tanggal }}</small>
								</div>
							</div>
						</div>
					</router-link>
				</div>
			</div>
		</div>
		<div class="p-5">
			<div class="row">
				<div class="col-lg-6 mb-md-5 mb-lg-0">
					<img
						class="position-relative w-100 h-100"
						:src="imgIstana"
						style="border-radius: 5px; object-fit: cover"
					/>
				</div>
				<div
					class="col-lg-6 text-md-center text-lg-start d-flex flex-column justify-content-between"
				>
					<div>
						<h5 class="fw-normal" style="font-size: 24px">
							Tentang
						</h5>
						<h4 class="fw-bold" style="font-size: 32px">
							{{ descIstana.nama_istana }}
						</h4>
						<div
							class="mb-2"
							style="border-bottom: 1px solid #d9d9d9"
						></div>
						<p class="text-truncate-2 fs-5" v-html="descIstana.deskripsi">
						</p>
					</div>
					<div
						class="d-flex align-items-center justify-content-md-center justify-content-lg-start"
					>
						<router-link
							:to="'/istana/sejarah/' + idIstana" 
							style="color: var(--bs-body-color); font-size: 20px"
							><span style="text-decoration: underline"
								>Selengkapnya</span
							></router-link
						><img src="@/assets/img/svg/arrow_right.svg" />
					</div>
				</div>
			</div>
		</div>
		<div class="p-3 p-md-5">
			<div
				v-if="beritaFeatured.length > 0 || beritaCol1.length > 0 || beritaCol2.length > 0 || beritaCol3.length > 0" 
				class="row gy-3 gx-xl-5"
			>
				<div
					class="col-12 d-flex justify-content-between align-items-baseline"
				>
					<h2 class="fw-bold">Artikel</h2>
					<router-link 
						:to="{
							name: 'semuaBeritaIstana',
							params: {
								idIstana: $router.currentRoute.value.params.id,
							},
						}" 
						style="color: #af9b43"
					>
						Lihat semua
					</router-link>
				</div>
				<div class="col-12 order-2">
					<router-link
						:to="{
							name: 'berita',
							params: {
								idIstana: item.i_id_istana,
								id: item.id,
							},
						}"
						v-for="item in beritaFeatured"
						:key="item.id"
					>
						<div
							class="berita-featured position-relative d-flex flex-column justify-content-end align-items-start p-3 text-white"
							style="min-height: 550px; height: 100%"
						>
							<div
								alt=""
								class="position-absolute d-block top-0 start-0 w-100 h-100"
								style="
									background: rgb(0, 0, 0);
									background: linear-gradient(
										0deg,
										rgba(0, 0, 0, 1) 0%,
										rgba(255, 255, 255, 0) 50%
									);
									border-radius: 5px;
									z-index: 2;
								"
							></div>
							<img
								:src="item.c_id_gambar"
								alt=""
								class="position-absolute d-block top-0 start-0 w-100 h-100"
								style="
									object-fit: cover;
									border-radius: 5px;
									z-index: 1;
								"
							/>
							<div style="z-index: 10">
								<h2 class="fw-normal">
									{{ item.n_judul }}
								</h2>
								<div class="d-flex align-items-center mb-2">
									<small
										class="px-2 py-1 border border-opacity-10 rounded-2 me-3"
										>{{
											getIstanaName(item.i_id_istana)
										}}</small
									>
									<small>{{ item.tanggal }}</small>
								</div>
							</div>
						</div>
					</router-link>
				</div>
				<div
					class="berita-col col-12 col-md-6 col-lg-4 order-4 order-lg-2 separator-end"
					:class="{
						'separator-end': !col2IsEmpty,
						'col-lg-12': col2IsEmpty,
						'col-lg-6': col3IsEmpty,
						'col-lg-4': !col3IsEmpty,
					}"
				>
					<router-link
						:to="{
							name: 'berita',
							params: {
								idIstana: item.i_id_istana,
								id: item.id,
							},
						}"
						v-for="item in beritaCol1"
						:key="item.id"
					>
						<div
							class="berita position-relative d-flex flex-column justify-content-end align-items-start p-3 text-white h-100"
						>
							<div
								alt=""
								class="position-absolute d-block top-0 start-0 w-100 h-100"
								style="
									background: rgb(0, 0, 0);
									background: linear-gradient(
										0deg,
										rgba(0, 0, 0, 1) 0%,
										rgba(255, 255, 255, 0) 50%
									);
									border-radius: 5px;
									z-index: 2;
								"
							></div>
							<img
								:src="item.c_id_gambar"
								alt=""
								class="position-absolute d-block top-0 start-0 w-100 h-100"
								style="object-fit: cover; border-radius: 5px"
							/>
							<div style="z-index: 10">
								<h4 style="margin-bottom: 10px">
									{{ item.n_judul }}
								</h4>
								<div class="d-flex align-items-center pb-3">
									<small
										class="px-2 py-1 border border-opacity-10 rounded-2 me-3"
										>{{
											getIstanaName(item.i_id_istana)
										}}</small
									>
									<small>{{ item.tanggal }}</small>
								</div>
							</div>
						</div>
					</router-link>
				</div>
				<div
					class="berita-col position-relative col-12 col-md-6 order-4 order-lg-2"
					:class="{
						'separator-end': !col3IsEmpty,
						'col-lg-6': col3IsEmpty,
						'col-lg-4': !col3IsEmpty,
					}"
				>
					<div class="d-flex flex-column w-100 h-100">
						<router-link
							:to="{
								name: 'berita',
								params: {
									idIstana: item.i_id_istana,
									id: item.id,
								},
							}"
							class="berita d-flex align-items-start justify-content-center w-100 h-20 mb-3 pb-3"
							v-for="item in beritaCol2"
							:key="item.id"
						>
							<div class="w-75 h-100 me-3">
								<img
									class="w-100 h-100"
									:src="item.c_id_gambar"
									style="
										filter: brightness(75%);
										object-fit: cover;
										border-radius: 3px;
									"
								/>
							</div>
							<div
								class="d-flex flex-column w-100 h-100 justify-content-between text-body"
							>
								<h6 class="mb-3">
									{{ item.n_judul }}
								</h6>
								<div
									class="w-100 d-flex align-items-center justify-content-between"
								>
									<small
										class="px-2 py-1 border border-opacity-10 rounded-2 me-2"
									>
										{{ getIstanaName(item.i_id_istana) }}
									</small>
									<small>{{ item.tanggal }}</small>
								</div>
							</div>
						</router-link>
					</div>
				</div>
				<div
					v-if="!col3IsEmpty"
					class="berita-col position-relative col-12 col-md-6 col-lg-4 order-4 order-lg-2"
				>
					<div class="d-flex flex-column w-100 h-100">
						<router-link
							:to="{
								name: 'berita',
								params: {
									idIstana: item.i_id_istana,
									id: item.id,
								},
							}"
							class="berita d-flex align-items-start justify-content-center w-100 h-20 mb-3 pb-3"
							v-for="item in beritaCol3"
							:key="item.id"
						>
							<div class="w-75 h-100 me-3">
								<img
									class="w-100 h-100"
									:src="item.c_id_gambar"
									style="
										filter: brightness(75%);
										object-fit: cover;
										border-radius: 3px;
									"
								/>
							</div>
							<div
								class="d-flex flex-column w-100 h-100 justify-content-between text-body"
							>
								<h6 class="mb-3">
									{{ item.n_judul }}
								</h6>
								<div
									class="w-100 d-flex align-items-center justify-content-between"
								>
									<small
										class="px-2 py-1 border border-opacity-10 rounded-2 me-2"
									>
										{{ getIstanaName(item.i_id_istana) }}
									</small>
									<small>{{ item.tanggal }}</small>
								</div>
							</div>
						</router-link>
					</div>
				</div>
			</div>
			<div v-else>
				<div
					class="col-12 d-flex justify-content-between align-items-baseline"
				>
					<h2 class="fw-bold">Artikel</h2>
				</div>
				<swiper class="mx-0 mb-2" :slidesPerView="1" :modules="modules">
					<swiper-slide>
						<div class="overflow-hidden position-relative col h-100">
							<div
								class="p-3 berita-featured position-relative d-flex flex-column justify-content-center align-items-center"
								style="min-height: 250px; height: 100%">
								<span class="fs-4">Tidak Ada Artikel</span>
							</div>
						</div>
					</swiper-slide>
				</swiper>
			</div>
		</div>
		<div class="p-5">
			<div class="col-12 d-flex justify-content-between">
				<h2 class="text-center fw-bold mb-4">Serba-Serbi {{ descIstana.nama_istana }}</h2>

				<router-link 
					:to="{
						path:
							'/istana/' +
							idIstana +
							'/bangunan'
					}"
					style="color: #af9b43"
					class=""
					v-if="listBangunan.length > 0"
				>
					Lihat semua
				</router-link>
			</div>
			<div
				class="row gy-5 justify-content-center"
			>
			<swiper
				class="mx-0 mb-2" 
				:loop="true" 
				:loopFillGroupWithBlank="true" 
				:spaceBetween="20" 
				:navigation="{
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				}" 
				:autoplay="{
					delay: 3000,
					disableOnInteraction: false,
				}" 
				:modules="modules" 
				:slidesPerView="4" 
				:pagination="{
					clickable: true,
					el: '.swiper-pagination',
				}"
				v-if="listBangunan.length > 0"
			>
				<swiper-slide v-for="(item,index) in listBangunan" :key="index">
					<router-link
						:to="{
							path:
								'/istana/' +
								idIstana +
								'/bangunan/' +
								item.i_id,
						}"
					>
						<div class="position-relative col h-100 overflow-hidden">
							<div
								class="position-relative d-flex flex-column justify-content-end align-items-start p-3 text-white"
								style="min-height: 300px; height: 100%"
							>
								<div
									alt=""
									class="position-absolute d-block top-0 start-0 w-100 h-100"
									style="
										background: rgb(0, 0, 0);
										background: linear-gradient(
											0deg,
											rgba(0, 0, 0, 1) 0%,
											rgba(255, 255, 255, 0) 60%
										);
										border-radius: 5px;
										z-index: 2;
									"
								></div>
								<img
									:src="item.link_gambar"
									alt=""
									class="position-absolute d-block top-0 start-0 w-100 h-100"
									style="
										object-fit: cover;
										border-radius: 5px;
										z-index: 1;
									"
								/>
								<div style="z-index: 10">
									<h2 class="fw-normal fs-5">
										{{ item.n_nama_bangunan }}
									</h2>
									<div class="d-flex align-items-center mb-2">
										<small
											class="px-2 py-1 border border-opacity-10 rounded-2 me-2"
											>{{
												getIstanaName(item.i_id_istana)
											}}</small
										>
									</div>
								</div>
							</div>
						</div>
					</router-link>
				</swiper-slide>
			</swiper>
			<swiper class="mx-0 mb-2" :slidesPerView="1" :modules="modules" v-else>
				<swiper-slide>
					<div class="overflow-hidden position-relative col h-100">
						<div
							class="p-3 berita-featured position-relative d-flex flex-column justify-content-center align-items-center"
							style="min-height: 250px; height: 100%">
							<span class="fs-4">Tidak Ada Serba Serbi</span>
						</div>
					</div>
				</swiper-slide>
			</swiper>
			</div>
		</div>
		<div class="p-5">
			<div class="row gx-5 gy-5 mb-3">
				<div class="col-lg-6">
					<div
						class="d-flex justify-content-between align-items-center"
						style="margin-bottom: 16px"
					>
						<h4 class="fw-bold" style="margin: 0">Foto</h4>
						<router-link to="/foto/semua">
							<a style="color: #af9b43">Lihat Semua</a>
						</router-link>
					</div>
					<div class="row">
						<div class="col">
							<router-link
								v-for="item in foto"
								:to="{
									path: '/foto/' + item.i_id_media,
								}"
							>
								<div
									class="berita-featured position-relative d-flex flex-column justify-content-end align-items-start p-3 text-white"
									style="min-height: 300px; height: 100%"
								>
									<div
										:src="item.link_gambar"
										alt=""
										class="position-absolute d-block top-0 start-0 w-100 h-100"
										style="
											background: rgb(0, 0, 0);
											background: linear-gradient(
												0deg,
												rgba(0, 0, 0, 1) 0%,
												rgba(255, 255, 255, 0) 60%
											);
											border-radius: 5px;
											z-index: 2;
										"
									></div>
									<img
										:src="item.link_gambar"
										alt=""
										class="position-absolute d-block top-0 start-0 w-100 h-100"
										style="
											object-fit: cover;
											border-radius: 5px;
											z-index: 1;
										"
									/>
									<div style="z-index: 10">
										<h2 class="fw-normal fs-5">
											{{ item.n_judul }}
										</h2>
									</div>
								</div>
							</router-link>
						</div>
					</div>
				</div>
				<div class="col-lg-6">
					<div
						class="d-flex justify-content-between align-items-center"
						style="margin-bottom: 16px"
					>
						<h4 class="fw-bold" style="margin: 0">Video</h4>
						<router-link to="/video" style="color: #af9b43">
							Lihat Semua
						</router-link>					
					</div>
					<div class="row">
						<div class="col">
							<video
								v-for="video in video"
								:src="video.link_gambar"
								class="mb-2 max-w-100 w-100 h-100"
								style="
									max-height: 300px;
									border-radius: 5px;
									object-fit: cover;
								"
								controls
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>


	<div 
	v-if="linkGambar.length > 0"
	class="floating-button"
	data-bs-toggle="modal"
	data-bs-target="#modalpengumuman"
	>
		<span class="icon">
			<i class="fa-sharp fa-solid fa-bullhorn"></i>
		</span>
	</div>

	<!-- MODAL PENGUMUMAN-->
	<div class="modal fade" role="dialog" tabindex="-2" id="modalpengumuman">
		<div
			class="modal-dialog modal-xl modal-dialog-centered"
			role="document">
			<div class="modal-content">
				<div class="modal-body">
					<div class="col-12">
						<swiper class="mx-0 mb-2" :loop="true" :loopFillGroupWithBlank="true" :spaceBetween="20" :navigation="{
							nextEl: '.swiper-button-next',
							prevEl: '.swiper-button-prev',
							}" :autoplay="{
								delay: 5000,
								disableOnInteraction: false,
							}" :modules="modules" :pagination="{
								clickable: true,
								el: '.swiper-pagination',
							}" :thumbs="{
								swiper: thumbsSwiper,
							}">
							<div class="swiper-button-prev" style="color: #c8b44b;"></div>
							<div class="swiper-button-next" style="color: #c8b44b;"></div>
							<swiper-slide v-for="(item, index) in linkGambar" :key="index">
								<a :href="item.n_link" target="_blank">
									<img :src="item.c_gambar" alt="" class="w-100 h-100" style="
												max-height: 500px;
												border-radius: 50px;
												object-fit: contain;
											" />
								</a>
								<div class="d-flex justify-content-between align-items-center">
									<hr class="m-0 w-50" />
									<span class="d-inline-flex align-items-center justify-content-center"
										style="height: 50px; width: 150px">{{ index + 1 }} dari
										{{ linkGambar.length }}</span>
									<hr class="m-0 w-50" />
								</div>
							</swiper-slide>
						</swiper>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import api from "@/shared/services/api";
import HeroCarousel from "./HeroCarousel.vue";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useLoading } from "vue-loading-overlay";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import { useToast } from "vue-toast-notification";

const modules = [Autoplay, Navigation];

const idIstana = ref(null);
const descIstana = ref("");
const imgIstana = ref("");
const listIstana = ref([]);
const listBangunan = ref([]);
const currentIstana = ref([]);
const beritaHeadline = ref([]);
const beritaFeatured = ref([]);
const beritaCol1 = ref([]);
const beritaCol2 = ref([]);
const beritaCol3 = ref([]);
const col1IsEmpty = ref(null);
const col2IsEmpty = ref(null);
const col3IsEmpty = ref(null);
const beritaIsEmpty = ref(null);
const loading = ref(false);
const $router = useRouter();
const $loading = useLoading();
const namaIstana = ref("");
const foto = ref(null);
const video = ref(null);

const props = defineProps({
	title: {
		type: String,
		required: false,
	},
	idIstana: {
		type: [String, Number],
		required: true,
	},
	navigation: {
		type: Boolean,
		required: false,
		default: true,
	},
});

const getBeritaByIdIstana = async (idIstana) => {
	let paramForm = {
		idIstana: idIstana,
	};

	const response = await api.post(
		`${import.meta.env.VITE_APP_RESTFUL_BASE_URL}/berita/getbyistana`, paramForm
	);
	const data = response.data.data;
	const headline = response.data.headline;
	
	beritaHeadline.value = headline.slice(0, 1);
	beritaFeatured.value = data.slice(0, 1);
	beritaCol1.value = data.slice(1, 2);
	beritaCol2.value = data.slice(2, 5);
	beritaCol3.value = data.slice(5, 8);
	if (beritaCol2.value.length <= 5 && beritaCol3.value.length <= 0) {
		col3IsEmpty.value = true;
	}
	if (beritaCol2.value.length <= 0) {
		col2IsEmpty.value = true;
		col3IsEmpty.value = true;
	} else {
		col2IsEmpty.value = false;
		col3IsEmpty.value = false;
	}
};

const getAllIstana = async () => {
	let loader = $loading.show({
		canCancel: false,
	});
	try {
		const response = await api.get(
			`${
				import.meta.env.VITE_APP_RESTFUL_BASE_URL
			}/istana/get-all-istana`
		);
		listIstana.value = response.data.data;
		loader.hide();
	} catch (error) {
		loader.hide();
		useToast().error("Terjadi Kesalahan");
	}
};

const getIstanaName = (idIstana) => {
	return listIstana.value.find((item) => item.id === idIstana).nama_istana;
};

const getCurrentIstana = () => {
	currentIstana.value = listIstana.value.find(
		(item) => item.id == $router.currentRoute.value.params.id
	);
};

const fetchBangunan = async (id) => {
	let paramForm = {
		idIstana: id,
	}
	try {
		api.post(
			import.meta.env.VITE_APP_RESTFUL_BASE_URL + "/bangunan/list-bangunan",
			paramForm, {
				withCredentials: true
			}
		)
			.then((response) => {
				listBangunan.value = response.data.data;
			})
			.catch(function (error) {

			})
	} catch (error) {

	}
};

const getDescIstana = async (id) => {
	try {
		const response = await api.get(
			`${import.meta.env.VITE_APP_RESTFUL_BASE_URL}/istana/getbyid/${id}`, {
				headers: {
					'Content-Type': 'application/json'
				},
				withCredentials: true
			}
		);
		descIstana.value = response.data.data;
		console.log("test", response.data.data);
		await presigned(response.data.data.c_gambar);
	} catch (error) {
		
	}
}

const getFoto = async () => {
	let serverParam = {
		media: "0",
	};
	api.post(
		import.meta.env.VITE_APP_RESTFUL_BASE_URL + "/galeri/list-media",
		serverParam
	)
		.then((response) => {
			let data = response.data.data;
			foto.value = data.slice(0, 1);
		})
		.catch((error) => {
			
		});
};

const getVideo = async () => {
	let loader = $loading.show({
		canCancel: false,
	});
	let serverParams = {
		media: "1",
	};
	api.post(
		import.meta.env.VITE_APP_RESTFUL_BASE_URL + "/galeri/list-media",
		serverParams
	)
		.then((response) => {
			let data = response.data.data;
			video.value = data.slice(0, 1);
			loader.hide();
		})
		.catch((error) => {
			loader.hide();
		});
};

const presigned = async (key) => {
	const response = await api.post(
		`${import.meta.env.VITE_APP_RESTFUL_BASE_URL}/istura/presignedurl`,
		{
			key_gambar: key,
		}
	);
	imgIstana.value = response.data.imgProxyUrl;
}

watch(
	() => $router.currentRoute.value.params.id,
	async (newId) => {
		getCurrentIstana();
		await getBeritaByIdIstana(newId);
		await fetchBangunan(newId);
		await getDescIstana(newId);
		await fetchPopUp(newId);
		idIstana.value = newId;
	}
);

const linkGambar = ref('')

const fetchPopUp = async (id) => {
	const paramServe = {
		idIstana: id,
	};

	api.post(`${import.meta.env.VITE_APP_RESTFUL_BASE_URL}/popup`, paramServe)
		.then((response) => {
			linkGambar.value = response.data.data;
			console.log(linkGambar.value);
		})
		.catch((error) => {
			console.error(error);
		});
};


onMounted(async () => {
	try {
		await getAllIstana();
		await fetchBangunan($router.currentRoute.value.params.id);
		await getBeritaByIdIstana($router.currentRoute.value.params.id);
		await getDescIstana($router.currentRoute.value.params.id);
		await fetchPopUp($router.currentRoute.value.params.id);
		getCurrentIstana();
		await getFoto();
		await getVideo();
	} catch (error) {
		
	}
	idIstana.value = $router.currentRoute.value.params.id;
	namaIstana.value = descIstana.value.n_nama_istana;
});

</script>

<style>
.text-truncate-2 {
	-webkit-line-clamp: 9;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
	text-align: justify;
}
.berita {
	border-bottom: 1px solid var(--bs-gray-300);
}

.berita:last-of-type {
	border: none;
	padding-bottom: 0 !important;
	margin-bottom: 0 !important;
}

.floating-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--bs-primary);
  color: #ffffff;
  cursor: pointer;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
  transition: transform 0.3s;
}

.floating-button:hover {
  transform: scale(1.1);
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.905);
  font-style: normal;
  font-family: "Manrope", sans-serif;
}
</style>
