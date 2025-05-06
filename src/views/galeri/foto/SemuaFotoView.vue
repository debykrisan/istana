<template>
	<div class="container bg-white">
		<div class="p-5 d-flex flex-column gap-4">
			<div>
				<div class="d-flex w-100 justify-content-between p-0">
					<div class="col-12 mb-3">
						<h3 class="fw-bold">Semua Foto</h3>
					</div>
				</div>
				<div class="row mb-3" v-if="galeri.length > 0">
					<div class="col-md-12">
						<div class="d-flex justify-content-between align-items-center"> 
							<div class="input-group" style="max-width: 600px;">
								<input class="form-control flex-grow-1 border-end-0 border rounded-pill" type="text" v-model="search" placeholder="Cari foto"/>
								<span class="input-group-text bg-transparent border-0"><i class="fa fa-search"></i></span>

							</div>
							<div class="d-flex align-items-center"> 
								<div>
									<h5 style="font-size: 15px; margin-right: 10px; margin-bottom: 0;">Tampilkan</h5>
								</div>
								<div class="input-group-append px-2">
									<select class="form-select form-control rounded-pill" v-model="perPage">
										<option value="4" selected class="select-option">4</option>
										<option value="8" class="select-option">8</option>
										<option value="16" class="select-option">16</option>
										<option value="32" class="select-option">32</option>
									</select>
								</div>
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
									<span class="fs-4">Tidak Ada Foto</span>
								</div>
							</div>
						</swiper-slide>
					</swiper>
				</div>


				<div class="p-3 p-md-5" v-if="isLoading">
					<div class="loader-container">
						<div class="loader"></div>
					</div>
				</div>
				<div class="row row-cols-1 row-cols-md-4 g-4 mb-2" v-else>
					<div
						class="col"
						v-for="item in paginatedGaleri"
						:key="item.i_id_media"
					>
						<div
							class="position-relative col h-100 overflow-hidden"
						>
							<router-link
								:to="{
									path: '/foto/' + item.i_id_media,
								}"
							>
								<div
									class="berita-featured position-relative d-flex flex-column justify-content-end align-items-start p-3 text-white"
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

				<!-- Pagination -->
				<nav v-if="totalPages > 1">
					<ul class="pagination justify-content-center">
						<li
							class="page-item"
							:class="{ disabled: currentPage === 1 }"
						>
							<a
								class="page-link"
								href="#"
								aria-label="Previous"
								@click="prevPage"
							>
								<span aria-hidden="true">&laquo;</span>
							</a>
						</li>
						<li
							class="page-item"
							v-for="page in totalPages"
							:key="page"
							:class="{ active: currentPage === page }"
						>
							<a
								class="page-link"
								href="#"
								@click="changePage(page)"
								>{{ page }}</a
							>
						</li>
						<li
							class="page-item"
							:class="{ disabled: currentPage === totalPages }"
						>
							<a
								class="page-link"
								href="#"
								aria-label="Next"
								@click="nextPage"
							>
								<span aria-hidden="true">&raquo;</span>
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	</div>
</template>

<script setup>
import { Autoplay, Navigation } from "swiper";
import { ref, onMounted, computed, watch } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import api from "@/shared/services/api";

import "swiper/css";
import "swiper/css/navigation";

const modules = [Autoplay, Navigation];
const search = ref("");
const galeri = ref([]);
const perPage = ref(4);
const currentPage = ref(1);
const pageSize = ref(4);

const isLoading = ref(false);

const filteredGaleri = computed(() => {
	if (!search.value) {
		return galeri.value;
	} else {
		return galeri.value.filter((item) => {
			return item.n_judul
				.toLowerCase()
				.includes(search.value.toLowerCase());
		});
	}
});

const paginatedGaleri = computed(() => {
	const startIndex = (currentPage.value - 1) * pageSize.value;
	const endIndex = startIndex + pageSize.value;
	return filteredGaleri.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => {
	return Math.ceil(filteredGaleri.value.length / pageSize.value);
});

const updateGaleriPerPage = () => {
	currentPage.value = 1;
	pageSize.value = perPage.value;
};

watch(perPage, updateGaleriPerPage);

const getSemuaFoto = async () => {
	isLoading.value = true;
	let serverParam = {
		media: "0",
	};
	api.post(
		import.meta.env.VITE_APP_RESTFUL_BASE_URL + "/galeri/list-media",
		serverParam
	)
		.then((response) => {
			let data = response.data.data;
			galeri.value = data;
			updateGaleriPerPage();
			isLoading.value = false;
		})
		.catch((error) => {});
};

const changePage = (page) => {
	currentPage.value = page;
};

const prevPage = () => {
	if (currentPage.value > 1) {
		currentPage.value--;
	}
};

const nextPage = () => {
	if (currentPage.value < totalPages.value) {
		currentPage.value++;
	}
};

onMounted(async () => {
	await getSemuaFoto();
});
</script>

<style>
.btn:focus,
.btn:active {
	outline: none !important;
	box-shadow: none;
}

.pagination {
	margin-top: 20px;
}

.pagination .page-item > a.page-link {
	color: #c8b44b; /* Change the color of page links */
}

.pagination .page-item.active > a.page-link,
.pagination .page-item > a.page-link:hover,
.pagination .page-item > a.page-link:focus {
	background-color: #c8b44b; /* Change the background color of active and hovered/focused page links */
	border-color: #c8b44b; /* Change the border color of active and hovered/focused page links */
	color: #fff; /* Change the text color of active and hovered/focused page links */
}

.pagination .page-item.disabled > a.page-link,
.pagination .page-item.disabled > a.page-link:hover,
.pagination .page-item.disabled > a.page-link:focus {
	color: #999; /* Change the color of disabled page links */
	background-color: transparent; /* Change the background color of disabled page links */
	border-color: #999; /* Change the border color of disabled page links */
}

.pagination .page-item:first-child > a.page-link,
.pagination .page-item:last-child > a.page-link {
	border-radius: 0; /* Remove border-radius for the first and last page links */
}

.pagination .page-item > a.page-link:hover,
.pagination .page-item > a.page-link:focus,
.pagination .page-item.active > a.page-link {
	outline: none; /* Remove the outline on hover/focus/active page links */
}

select:focus > option:checked { 
    background: #c8b44b !important;
}

select.form-select.form-control.rounded-pill:hover > option:checked {
    background-color: var(--bs-primary) !important;
    color: white !important; /* Change text color on hover */
}

.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px; 
}

.loader {
	border: 4px solid rgba(255, 255, 255, 0.3);
	border-radius: 50%;
	border-top: 4px solid var(--bs-primary);
	width: 50px;
	height: 50px;
	animation: spin 1s linear infinite;
}

@keyframes spin {
	0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
}

</style>
