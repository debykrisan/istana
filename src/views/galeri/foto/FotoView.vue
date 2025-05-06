<template>
	<div class="bg-white container-md">
		<div class="p-5">
			<div class="row gy-3">
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
						<swiper-slide v-for="(item, index) in images" :key="index">
							<img :src="item.src" alt="" class="w-100 h-100" style="
										max-height: 500px;
										border-radius: 5px;
										object-fit: contain;
									" />
							<div class="d-flex justify-content-between align-items-center">
								<hr class="m-0 w-50" />
								<span class="d-inline-flex align-items-center justify-content-center"
									style="height: 50px; width: 150px">{{ index + 1 }} dari
									{{ images.length }}</span>
								<hr class="m-0 w-50" />
							</div>
						</swiper-slide>
					</swiper>
					<swiper id="thumbs" class="mx-0 mb-4" :loop="true" :loopFillGroupWithBlank="true" :spaceBetween="20"
						:slidesPerView="5" :modules="[Thumbs]" @swiper="setThumbSwiper">
						<swiper-slide v-for="(item, index) in images" :key="index" :data-bs-target="`#${item.id}`"
							data-bs-toggle="modal">
							<img :src="item.src" class="border w-100" alt="" style="
										height: 128px;
										border-radius: 5px;
										object-fit: contain;
									" />
						</swiper-slide>
					</swiper>

					<div v-for="item in images" class="modal fade" role="dialog" tabindex="-1" :id="item.id">
						<div class="modal-dialog modal-xl modal-dialog-centered" role="document">
							<div class="modal-content">
								<div class="modal-body">
									<img alt="" :src="item.src" class="w-100 h-100" />
								</div>
							</div>
						</div>
					</div>

					<div class="py-2 px-3 mb-2 d-flex justify-content-between align-items-start" style="background-color: #d9d9d9">
						<div class="col-4 mt-2">
							<h4>{{ dataFoto.n_judul }}</h4>
							<span class="text-muted">Foto |
								{{ dataFoto.d_tanggal }}
								{{ dataFoto.d_jam == '00:00' ? "" : dataFoto.d_jam + ' ' + 'WIB'}} <br>{{ dataFoto.n_fotografer }}</span>
						</div>
						<div class="col-7">
							<div class="ql-editor" v-html="dataFoto.e_keterangan"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="gap-4 p-5 d-flex flex-column">
			<div class="d-flex justify-content-between align-items-center">
				<h3 class="fw-bold d-inline-flex align-items-center justify-content-center">
					Foto Lainnya
				</h3>
				<hr class="m-0 w-75" />
			</div>
			<div>
				<div class="d-flex flex-column">
					<swiper 
						class="mx-0 mb-2" 
						:loopFillGroupWithBlank="true" 
						:spaceBetween="20" 
						:navigation="{
							nextEl: '.swiper-button-next',
							prevEl: '.swiper-button-prev',
						}" 
						:modules="modules" 
						:slidesPerView="4" 
						:pagination="{
							clickable: true,
							el: '.swiper-pagination',
						}"
					>
						<div class="swiper-button-prev" style="color: #c8b44b;"></div>
						<div class="swiper-button-next" style="color: #c8b44b;"></div>
						<swiper-slide v-for="item in galeri" :key="item.i_id_media">
							<div class="overflow-hidden position-relative col h-100">
								<a :href="
									$router.resolve({
										name: 'foto',
										params: { id: item.i_id_media },
									}).href
								">
									<div
										class="p-3 text-white berita-featured position-relative d-flex flex-column justify-content-end align-items-start"
										style="min-height: 300px; height: 100%">
										<div :src="item.link_gambar" alt="" class="top-0 position-absolute d-block start-0 w-100 h-100" style="
													background: rgb(0, 0, 0);
													background: linear-gradient(
														0deg,
														rgba(0, 0, 0, 1) 0%,
														rgba(255, 255, 255, 0) 60%
													);
													border-radius: 5px;
													z-index: 2;
												"></div>
										<img :src="item.link_gambar" alt="" class="top-0 position-absolute d-block start-0 w-100 h-100" style="
													object-fit: cover;
													border-radius: 5px;
													z-index: 1;
												" />
										<div style="z-index: 10">
											<h2 class="fw-normal fs-5">
												{{ item.n_judul }}
											</h2>
											<div class="mb-2 d-flex align-items-center">
												<small class="text-start">{{ item.jumlah }} Foto |
													{{ item.d_tanggal }}
													{{ item.d_jam }} WIB</small>
											</div>
										</div>
									</div>
								</a>
							</div>
						</swiper-slide>
					</swiper>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation, Thumbs } from "swiper";
import { computed, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "@/shared/services/api";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const modules = [Autoplay, Navigation, Thumbs];

const dataFoto = ref("");
const $route = useRoute();
const $router = useRouter();
const galeri = ref([]);

let thumbsSwiper = null;

const setThumbSwiper = (swiper) => {
	thumbsSwiper = swiper;
};

const images = computed(() => {
	if (dataFoto.value.link_gambar == null) {
		return [];
	} else {
		return dataFoto.value.link_gambar.map((item) => {
			return {
				src: item,
				id: Math.random()
					.toString(36)
					.substring(2, 7)
					.replace(/[0-9]/g, ""),
			};
		});
	}
});

const getSemuaFoto = async () => {
	let serverParam = {
		media: "0",
	};
	api.post(
		import.meta.env.VITE_APP_RESTFUL_BASE_URL + "/galeri/list-media",
		serverParam
	)
		.then((response) => {
			let data = response.data.data;
			galeri.value = data.filter(
				(item) => item.i_id_media != $route.params.id
			);
		})
		.catch((error) => {
			
		});
};

const getImage = async (id) => {
	let media = 0;
	api.get(
		import.meta.env.VITE_APP_RESTFUL_BASE_URL +
		"/galeri/list-media-by-id/" +
		media +
		"/" +
		id
	)
		.then((response) => {
			dataFoto.value = response.data.data;
		})
		.catch((error) => {
			
		});
};

onMounted(() => {
	getImage($route.params.id);
	getSemuaFoto();
	
});
</script>

<style>
.btn:focus,
.btn:active {
	outline: none !important;
	box-shadow: none;
}

#thumbs>.swiper-wrapper {
	justify-content: center;
}
</style>
