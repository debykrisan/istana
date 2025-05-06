<template>
	<div class="container-lg" style="background: white">
		<div>
			<div class="p-5">
				<div class="col-12 d-flex justify-content-between">
					<h2 class="text-center fw-bold mb-4" v-if="idIstana === 1">
						Serba-Serbi {{ getIstanaName(1) }}
					</h2>
					<h2 class="text-center fw-bold mb-4" v-if="idIstana === 2">
						Serba-Serbi {{ getIstanaName(2) }}
					</h2>
					<h2 class="text-center fw-bold mb-4" v-if="idIstana === 3">
						Serba-Serbi {{ getIstanaName(3) }}
					</h2>
					<h2 class="text-center fw-bold mb-4" v-if="idIstana === 4">
						Serba-Serbi {{ getIstanaName(4) }}
					</h2>
					<h2 class="text-center fw-bold mb-4" v-if="idIstana === 5">
						Serba-Serbi {{ getIstanaName(5) }}
					</h2>
				</div>
				<div class="col-12 mb-3">
					<div class="input-group">
						<input
							class="form-control border-end-0 border rounded-pill"
							type="text"
							v-model="search"
							placeholder="Cari serba-serbi"
						/>
						<div class="input-group-append">
							<span
								class="input-group-text bg-transparent border-0 pt-1 mt-2"
								><i class="fa fa-search"></i
							></span>
						</div>
						<div class="input-group-append my-auto">
							<select
								class="form-select-sm rounded-pill"
								v-model="perPage"
							>
								<option :value="4" selected>4</option>
								<option :value="8">8</option>
								<option :value="16">16</option>
								<option :value="32">32</option>
							</select>
						</div>
					</div>
				</div>

				<div class="row row-cols-1 row-cols-md-4 g-4 mb-2">
					<div
						class="col"
						v-for="item in paginatedBangunan"
						:key="item.i_id_istana"
					>
						<div
							class="position-relative col h-100 overflow-hidden"
						>
							<router-link
								:to="`/istana/${idIstana}/bangunan/${item.i_id}`"
							>
								<div
									class="position-relative col h-100 overflow-hidden"
								>
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
											<div
												class="d-flex align-items-center mb-2"
											>
												<small
													class="px-2 py-1 border border-opacity-10 rounded-2 me-2"
													>{{
														getIstanaName(
															item.i_id_istana
														)
													}}</small
												>
											</div>
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
import { ref, computed, watch, onMounted } from "vue";
import api from "@/shared/services/api";
import { useRouter } from "vue-router";
import { useLoading } from "vue-loading-overlay";

const idIstana = ref(null);
const listIstana = ref([]);
const listBangunan = ref([]);
const currentIstana = ref([]);
const search = ref("");
const $router = useRouter();
const $loading = useLoading();

const Bangunan = ref([]);
const perPage = ref(4);
const currentPage = ref(1);
const pageSize = ref(4);

const filteredBangunan = computed(() => {
	if (!search.value) {
		return Bangunan.value;
	} else {
		return Bangunan.value.filter((item) => {
			return item.n_judul
				.toLowerCase()
				.includes(search.value.toLowerCase());
		});
	}
});

const paginatedBangunan = computed(() => {
	const startIndex = (currentPage.value - 1) * pageSize.value;
	const endIndex = startIndex + pageSize.value;
	return filteredBangunan.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => {
	return Math.ceil(filteredBangunan.value.length / pageSize.value);
});

const updateBangunanPerPage = () => {
	currentPage.value = 1;
	pageSize.value = perPage.value;
};

watch(perPage, updateBangunanPerPage);

const getAllIstana = async () => {
	try {
		const response = await api.get(
			`${import.meta.env.VITE_APP_RESTFUL_BASE_URL}/istana/get-all-istana`
		);
		listIstana.value = response.data.data;
	} catch (error) {
		console.error(error);
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
	const loader = $loading.show();
	let paramForm = {
		idIstana: id,
	};
	try {
		const response = await api.post(
			`${
				import.meta.env.VITE_APP_RESTFUL_BASE_URL
			}/bangunan/list-bangunan`,
			paramForm,
			{
				withCredentials: true,
			}
		);
		let data = response.data.data;
		Bangunan.value = data;
		updateBangunanPerPage();
	} catch (error) {
		console.error(error);
	} finally {
		loader.hide();
	}
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

watch(
	() => $router.currentRoute.value.params.id,
	async (newId) => {
		getCurrentIstana();
		await fetchBangunan(newId);
	}
);

onMounted(async () => {
	await getAllIstana();
	await fetchBangunan($router.currentRoute.value.params.id);
	getCurrentIstana();
	idIstana.value = $router.currentRoute.value.params.id;
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
</style>
