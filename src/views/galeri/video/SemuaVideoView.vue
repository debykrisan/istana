<template>
	<div class="container bg-white">
		<div class="p-5 d-flex flex-column gap-4">
			<div>
				<div class="d-flex w-100 justify-content-between p-0">
					<div class="col-12 mb-3">
						<h3 class="fw-bold">Semua Video</h3>
					</div>
				</div>
				<div class="col-12 mb-3" v-if="recordsTotal > 0">
					<div class="input-group">
						<input
							class="form-control border-end-0 border rounded-pill"
							type="text"
							v-model="search"
							placeholder="Cari video"
						/>
						<div class="input-group-append">
							<span
								class="input-group-text bg-transparent border-0"
								><i class="fa fa-search"></i
							></span>
						</div>
					</div>
				</div>

				<!-- test -->
				<div v-if="recordsTotal > 0">
					<div
						class="row row-cols-1 row-cols-md-4 g-4 mb-2"
						v-if="search"
					>	
						<div
							class="col"
							v-for="item in filteredVideos"
							:key="item.i_id_media"
						>
							<div
								class="position-relative col h-100 overflow-hidden"
							>
								<router-link
									:to="{
										path: '/video/' + item.i_id_media,
									}"
								>
									<div
										class="d-flex flex-column justify-content-end align-items-start text-black"
										style="min-height: 160px; height: 100%"
									>
										<video
											:src="item.link_gambar"
											alt=""
											class="w-100 h-100 mb-2 border"
											style="
												object-fit: cover;
												border-radius: 5px;
											"
										/>
										<div style="z-index: 10">
											<h2 class="fw-normal fs-5">
												{{ item.n_judul }}
											</h2>
											<div
												class="d-flex align-items-center mb-2"
											>
												<small class="text-start"
													>{{ item.d_tanggal }}
													{{ item.d_jam }} WIB</small
												>
											</div>
										</div>
									</div>
								</router-link>
							</div>
						</div>
					</div>
				</div>
				<div v-else>
					<swiper class="mx-0 mb-2" :slidesPerView="1" :modules="modules">
						<swiper-slide>
							<div class="overflow-hidden position-relative col h-100">
								<div
									class="p-3 berita-featured position-relative d-flex flex-column justify-content-center align-items-center"
									style="min-height: 250px; height: 100%">
									<span class="fs-4">Tidak Ada Video</span>
								</div>
							</div>
						</swiper-slide>
					</swiper>
				</div>
				<!-- test -->

				<div class="row" v-if="!search" id="rowVideo">
					<div
						v-for="item in nowPlaying"
						class="col-lg-8"
					>
						<video
							class="w-100"
							:src="item.link_gambar"
							controls
						></video>
						<div
							class="mt-4 py-4 px-4"
							style="background-color: #d9d9d9"
						>
							<h2 class="mb-0">{{ item.n_judul }}</h2>
							<span class="text-muted" style="font-size: 14px;">{{ item.d_tanggal }} | {{ item.d_jam }}</span>
							<p class="ql-editor" v-html="item.e_keterangan" style="margin-left: -14px; margin-bottom: 0;"></p>
						</div>
					</div>
					<div class="col-lg-4 scrollable-row" id="scrollableDiv">
						<div
							v-for="item in recentVideos"
							:key="item.i_id_media"
							class="position-relative col overflow-auto mb-3"
						>
							<div class="position-relative col h-100">
								<router-link
									:to="{
										path: '/video/' + item.i_id_media,
									}"
									class="d-flex"
								>
									<video
										:src="item.link_gambar"
										alt=""
										class="h-auto me-2"
										style="object-fit: cover; width: 160px"
									></video>
									<div style="z-index: 10">
										<h2 class="fw-normal text-black fs-5">
											{{ item.n_judul }}
										</h2>
										<div
											class="d-flex align-items-center mb-2"
										>
											<small class="text-start"
												>{{ item.d_tanggal }}
												{{ item.d_jam }} WIB</small
											>
										</div>
									</div>
								</router-link>
							</div>
						</div>
					</div>
				</div>

				<div v-if="recordsTotal > 0">
					<div class="d-flex justify-content-between align-items-center mt-5">
						<h3 class="fw-bold d-inline-flex align-items-center justify-content-center">Lainnya</h3>
						<hr class="w-75 m-0">
					</div>
					<VideoSlider :videos="videos" />
				</div>
				<div v-else></div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import api from "@/shared/services/api";
import VideoSlider from "@/components/video/VideoSlider.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation } from "swiper";

const $route = useRoute();
const search = ref("");
const videos = ref([]);
const nowPlaying = ref({});
const recentVideos = ref([]);
const recordsTotal = ref(0);
const idMedia = ref($route.params.id);

const filteredVideos = computed(() => {
	if (!search.value) {
		return videos.value;
	} else {
		return videos.value.filter((item) => {
			return item.n_judul
				.toLowerCase()
				.includes(search.value.toLowerCase());
		});
	}
});

const fetchVideos = async () => {
	let serverParams = {
		media: "1",
	};
	api.post(
		import.meta.env.VITE_APP_RESTFUL_BASE_URL + "/galeri/list-media",
		serverParams
	)
		.then((response) => {
			let data = response.data.data;
			recordsTotal.value = response.data.recordsTotal;
			videos.value = data;
			if ($route.params.id) {
				nowPlaying.value = data.filter((item) => {
					return item.i_id_media == $route.params.id;
				});
				recentVideos.value = data.filter((item) => {
					return item.i_id_media != nowPlaying.value[0].i_id_media;
				});
				videos.value = data.filter((item) => {
					return item.i_id_media != nowPlaying.value[0].i_id_media;
				});
				recentVideos.value = recentVideos.value.slice(0, 4);
			} else {
				nowPlaying.value = data.slice(0, 1);
				recentVideos.value = data.slice(1, 5);
				videos.value = data.slice(1);
			}
		})
		.catch((error) => {
			
		});
};

watch(
	() => $route.params.id,
	async () => {
		await fetchVideos();
	}
);

onMounted(async () => {
	fetchVideos();
});
const modules = [Autoplay, Navigation];
</script>

<style>
.btn:focus,
.btn:active {
	outline: none !important;
	box-shadow: none;
}
.scrollable-row  {
  max-height: 445.5px; /* Set the maximum height */
  overflow-y: auto; /* Enable vertical scrolling when needed */
}

@media (max-width: 1400px) {
	.scrollable-row {
		max-height: 373.05px;
	}
}

@media (max-width: 1200px) {
	.scrollable-row {
		max-height: 310.5px;
	}
}

@media (max-width: 992px) {
	.scrollable-row {
		margin-top: 20px;
		max-height: 298.6px;
	}
}
</style>
