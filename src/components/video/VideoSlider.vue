<template>
	<div>
		<div class="d-flex flex-column mt-2">
			<swiper 
                class="mx-0 mb-2" 
                :loopFillGroupWithBlank="true" 
                :slidesPerView="slidesPerView"
                parallax="true"
				:spaceBetween="20" 
                :navigation="{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }" 
                :autoplay="{
					delay: 3000,
					disableOnInteraction: false,
				}" 
                :modules="modules" v-if="!isEmpty">
                <div class="swiper-button-prev" style="color: #c8b44b;"></div>
                <div class="swiper-button-next" style="color: #c8b44b;"></div>
				<swiper-slide v-for="item in videos" :key="item.i_id_media">
					<div class="overflow-hidden position-relative col h-100">
						<router-link :to="{
							name: 'video',
							params: {
								id: item.i_id_media
							},
						}">
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
								<video :src="item.link_gambar" alt="" class="top-0 position-absolute d-block start-0 w-100 h-100" style="
                                    object-fit: cover;
                                    border-radius: 5px;
                                    z-index: 1;
                                "></video>
								<div style="z-index: 10">
									<h2 class="fw-normal fs-5">
										{{ item.n_judul }}
									</h2>
								</div>
							</div>
						</router-link>
					</div>
				</swiper-slide>
			</swiper>
			<swiper class="mx-0 mb-2" :slidesPerView="1" :modules="modules" v-else>
				<swiper-slide>
					<div class="overflow-hidden position-relative col h-100">
						<div
							class="p-3 berita-featured position-relative d-flex flex-column justify-content-center align-items-center"
							style="min-height: 300px; height: 100%">
							<span class="fs-4">Tidak Ada Video</span>
						</div>
					</div>
				</swiper-slide>
			</swiper>
		</div>
	</div>
</template>

<script setup>
import api from "@/shared/services/api";
import { onMounted, ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

const props = defineProps({
    videos: {
        type: Array,
        required: true,
    },
	navigation: {
		type: Boolean,
		required: false,
		default: true,
	},
});

const isEmpty = ref(false);
const slidesPerView = ref(4);

const modules = [Autoplay, Navigation];

onMounted(async () => {
	
});
</script>

<style>
.btn:focus,
.btn:active {
	outline: none !important;
	box-shadow: none;
}
</style>
