<template>
	<div class="container-md bg-white">
		<div class="p-5">
			<div class="row gy-3">
				<div class="col-12">
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
                    :pagination="{
                        clickable: true,
                        el: '.swiper-pagination',
                    }"
                    >
                        <div class="swiper-button-prev" style="color: #c8b44b;"></div>
                        <div class="swiper-button-next" style="color: #c8b44b;"></div>
                        <swiper-slide v-for="(data, index) in image" :key="index">
                            <img
                            :src="data"
                            alt=""
                            class="w-100 h-100"
                            style="
                                max-height: 500px;
                                border-radius: 5px;
                                object-fit: contain;
                            "
                            />
                            <div class="d-flex justify-content-between align-items-center">
                                <hr class="w-50 m-0">
                                <span class="d-inline-flex align-items-center justify-content-center" style="height: 50px; width: 150px;">{{ index + 1 }} dari {{ image.length }}</span>
                                <hr class="w-50 m-0">
                            </div>
                        </swiper-slide>
                    </swiper>


                    <div class="d-flex justify-content-between align-items-start px-3 py-2 mb-2" style="background-color: #d9d9d9">
                        <div class="col-4 mt-2">
                            <h4>{{ listBangunanById.n_nama_bangunan }}</h4>
                        </div>
                        <div class="col-7">
                            <div class="lh-lg text-start">
                                <div class="ql-editor" v-html="listBangunanById.e_deskripsi_bangunan"></div>
                            </div>
                        </div>
                    </div>
				</div>
			</div>
		</div>
        <div class="p-5 d-flex flex-column gap-4" v-if="listBangunanLainnya.length > 0">
            <div class="d-flex justify-content-between align-items-center">
                <h3 class="fw-bold d-inline-flex align-items-center justify-content-center">Lainnya</h3>
                <hr class="w-75 m-0">
            </div>
            <div>
                <div class="d-flex flex-column">
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
                    >
                        <swiper-slide v-for="(item, index) in listBangunanLainnya" :key="index">
                            <a
                                :href="
                                $router.resolve({
                                    name: 'bangunan',
                                    params: { 
                                        idIstana: item.i_id_istana, 
                                        id: item.i_id 
                                    },
                                }).href
                                "
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
                            </a>
                        </swiper-slide>
                    </swiper>
                </div>
            </div>
        </div>

	</div>


</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation } from "swiper";
import {ref, onMounted, watch} from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import api from "@/shared/services/api";

import "swiper/css";
import "swiper/css/navigation";

const modules = [Autoplay, Navigation];
const idIstana = ref(null);
const image = ref([])
const listIstana = ref([]);
const listBangunan = ref([]);
const listBangunanLainnya = ref([]);
const listBangunanById = ref([]);
const currentIstana = ref([]);
const loading = ref(false);
const $router = useRouter();
const $route = useRoute();

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
		const response = await api.post(
			`${import.meta.env.VITE_APP_RESTFUL_BASE_URL}/bangunan/list-bangunan/`, 
            paramForm,
            {
                withCredentials: true,
            }
		);
        let data = response.data.data;

        listBangunan.value = data;
        listBangunanLainnya.value = data.filter((item) => {
            return item.i_id != $router.currentRoute.value.params.id;
        });

	} catch (error) {
		
	}
};

const fetchBangunanById = async (id) => {
	try {
		const response = await api.get(
			`${import.meta.env.VITE_APP_RESTFUL_BASE_URL}/bangunan/list-bangunan-by-id/${id}`
		);
		listBangunanById.value = response.data.data;
        image.value = response.data.data.link_gambar
        
	} catch (error) {
		
	}
};

watch(
	() => $router.currentRoute.value.params.id,
	async (newId) => {
		getCurrentIstana();
		await fetchBangunan(newId);
	}
);

onMounted(async () => {
	try {
		await getAllIstana();
		await fetchBangunan($router.currentRoute.value.params.idIstana);
		getCurrentIstana();
	} catch (error) {
		
	}
	idIstana.value = $router.currentRoute.value.params.idIstana;
    await fetchBangunanById($route.params.id);
	
	console.log(listBangunan.value)
});

</script>

<style>
.btn:focus,
.btn:active {
	outline: none !important;
	box-shadow: none;
}

</style>
