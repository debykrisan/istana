<template>
	<HeroCarousel />
	<div class="container-lg" style="background: white">
		<div class="p-3 p-md-5">
			<div class="row">
				<div class="col-12 order-2" v-if="beritaHeadline != null">
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
									object-position: top;
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
		<div class="p-3 p-md-5">
			<div class="row">
				<div class="col-lg-6 mb-3 mb-lg-0">
					<img
						class="position-relative w-100 h-100"
						:src="imgTentangIstana"
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
						<p
							class="text-truncate-2 fs-5"
							v-html="descIstana.deskripsi"
						></p>
					</div>
					<div
						class="d-flex align-items-center justify-content-md-center justify-content-lg-start"
					>
						<router-link
							to="/istana/sejarah/df065cf0-622f-49f8-8d4f-b66eef2ebce5"
							style="color: var(--bs-body-color); font-size: 20px"
							><span style="text-decoration: underline"
								>Selengkapnya</span
							></router-link
						><img src="@/assets/img/svg/arrow_right.svg" />
					</div>
				</div>
			</div>
		</div>
		<div class="p-3 p-md-5" v-if="isLoading">
			<div class="row gy-3 gx-xl-5">
				<div
					class="col-12 d-flex justify-content-between align-items-baseline"
				>
					<h2 class="fw-bold">Artikel</h2>
				</div>
			</div>
			<div class="loader-container">
				<div class="loader"></div>
			</div>
		</div>
		<div class="p-3 p-md-5" v-else>
			<div class="row gy-3 gx-xl-5">
				<div
					class="col-12 d-flex justify-content-between align-items-baseline"
				>
					<h2 class="fw-bold">Artikel</h2>
					<router-link
						:to="{
							name: 'semuaBerita',
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
									object-position: top;
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
								style="
									object-fit: cover;
									object-position: top; 
									border-radius: 5px
								"
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
							class="berita d-flex align-items-start justify-content-center w-100 h-100 mb-3 pb-3"
							style="max-height: 170px"
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
										object-position: top;
										border-radius: 3px;
									"
								/>
							</div>
							<div
								class="d-flex flex-column w-100 h-100 justify-content-between text-body"
							>
								<h6
									style="
										height: 58px;
										overflow: hidden;
										display: -webkit-box;
										-webkit-line-clamp: var(
											--line-clamp,
											3
										);
										-webkit-box-orient: vertical;
										word-break: var(--word-break, 'none');
										overflow: hidden;
										hyphens: auto;
									"
								>
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
							class="berita d-flex align-items-start justify-content-center w-100 h-100 mb-3 pb-3"
							style="max-height: 170px"
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
										object-position: top;
										border-radius: 3px;
									"
								/>
							</div>
							<div
								class="d-flex flex-column w-100 h-100 justify-content-between text-body"
							>
								<h6
									style="
										height: 58px;
										overflow: hidden;
										display: -webkit-box;
										-webkit-line-clamp: var(
											--line-clamp,
											3
										);
										-webkit-box-orient: vertical;
										word-break: var(--word-break, 'none');
										overflow: hidden;
										hyphens: auto;
									"
								>
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
		</div>
		<div class="p-3 p-md-5">
			<h2 class="text-center fw-bold">Istana Kepresidenan Republik Indonesia</h2>
			<p class="text-center" style="font-size: 20px">
				Istana Kepresidenan tersebar di berbagai wilayah, Jakarta,
				Bogor, Cipanas, Daerah Istimewa Yogyakarta (DIY), dan Bali. Di
				wilayah Jakarta, terdapat dua Istana Kepresidenan, yaitu Istana
				Merdeka yang menghadap Jl. Merdeka Utara dan Istana Negara yang
				menghadap Jl. Veteran. 
			</p>
			<div
				class="row gy-5 row-cols-1 row-cols-md-2 row-cols-lg-3 justify-content-center"
			>
				<div
					class="col d-flex flex-column justify-content-center align-items-center mx-auto"
				>
					<img
						class="w-100 mb-4"
						:src="imgIstanaJakarta"
						style="height: 250px; border-radius: 2%;"
					/>
					<h4 class="text-center">Istana Kepresidenan Jakarta</h4>
					<p
						class="text-truncate-2"
						v-html="sejarahIstanaJakarta"
					></p>
					<router-link
						:to="{
							name: 'istanaLandingPage',
							params: {
								id: 'df065cf0-622f-49f8-8d4f-b66eef2ebce5',
							},
						}"
						class="btn"
						role="button"
						style="
							background: var(--bs-primary);
							color: var(--bs-body-color);
						"
						>Kunjungi</router-link
					>
				</div>
				<div
					class="col d-flex flex-column justify-content-center align-items-center mx-auto"
				>
					<img
						class="w-100 mb-4"
						:src="imgIstanaBogor"
						style="height: 250px; border-radius: 2%;"
					/>
					<h4 class="text-center">Istana Kepresidenan Bogor</h4>
					<p class="text-truncate-2" v-html="sejarahIstanaBogor"></p>
					<router-link
						:to="{
							name: 'istanaLandingPage',
							params: {
								id: 'c0785194-c033-414f-961c-52461e794b0b',
							},
						}"
						class="btn"
						role="button"
						style="
							background: var(--bs-primary);
							color: var(--bs-body-color);
						"
						>Kunjungi</router-link
					>
				</div>
				<div
					class="col d-flex flex-column justify-content-center align-items-center mx-auto"
				>
					<img
						class="w-100 mb-4"
						:src="imgIstanaCipanas"
						style="height: 250px; border-radius: 2%;"
					/>
					<h4 class="text-center">Istana Kepresidenan Cipanas</h4>
					<p
						class="text-truncate-2"
						v-html="sejarahIstanaCipanas"
					></p>
					<router-link
						:to="{
							name: 'istanaLandingPage',
							params: {
								id: 'ad779b6f-6af6-4974-ad2e-9385be62a0cd',
							},
						}"
						class="btn"
						role="button"
						style="
							background: var(--bs-primary);
							color: var(--bs-body-color);
						"
						>Kunjungi</router-link
					>
				</div>
				<div
					class="col d-flex flex-column justify-content-center align-items-center mx-auto"
				>
					<img
						class="w-100 mb-4"
						:src="imgIstanaTampaksiring"
						style="height: 250px; border-radius: 2%;"
					/>
					<h4 class="text-center">
						Istana Kepresidenan Tampaksiring
					</h4>
					<p
						class="text-truncate-2"
						v-html="sejarahIstanaTampaksiring"
					></p>
					<router-link
						:to="{
							name: 'istanaLandingPage',
							params: {
								id: 'ea48432d-127a-458a-903b-d7d5bfd0cb66',
							},
						}"
						class="btn"
						role="button"
						style="
							background: var(--bs-primary);
							color: var(--bs-body-color);
						"
						>Kunjungi</router-link
					>
				</div>
				<div
					class="col d-flex flex-column justify-content-center align-items-center mx-auto"
				>
					<img
						class="w-100 mb-4"
						:src="imgIstanaYogyakarta"
						style="height: 250px; border-radius: 2%;"
					/>
					<h4 class="text-center">Istana Kepresidenan Yogyakarta</h4>
					<p
						class="text-truncate-2"
						v-html="sejarahIstanaYogyakarta"
					></p>
					<router-link
						:to="{
							name: 'istanaLandingPage',
							params: {
								id: '393c9f8c-5ca8-49bc-9a57-df572389f275',
							},
						}"
						class="btn"
						role="button"
						style="
							background: var(--bs-primary);
							color: var(--bs-body-color);
						"
						>Kunjungi</router-link
					>
				</div>
			</div>
		</div>
		<div class="p-3 p-md-5">
			<div class="row gx-5 gy-5 mb-3">
				<div class="col-lg-6">
					<div v-if="foto.length > 0">
						<div
							class="d-flex justify-content-between align-items-center"
							style="margin-bottom: 16px"
						>
							<h4 class="fw-bold" style="margin: 0">Foto</h4>
							<router-link to="/foto/semua">
								<a href="#" style="color: #af9b43">Lihat Semua</a>
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
					<div v-else>
						<div
							class="d-flex justify-content-between align-items-center"
							style="margin-bottom: 16px"
						>
							<h4 class="fw-bold" style="margin: 0">Foto</h4>
							<router-link to="/foto/semua" style="color: #af9b43">
								Lihat Semua
							</router-link>
						</div>
						<div class="row">
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
					</div>
				</div>
				<div class="col-lg-6">
					<div v-if="video.length > 0">
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
					<div v-else>
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
			role="document"
		>
			<div class="modal-content">
				<div class="modal-body">
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
								delay: 5000,
								disableOnInteraction: false,
							}"
							:modules="modules"
							:pagination="{
								clickable: true,
								el: '.swiper-pagination',
							}"
							:thumbs="{
								swiper: thumbsSwiper,
							}"
						>
							<div
								class="swiper-button-prev"
								style="color: #c8b44b"
							></div>
							<div
								class="swiper-button-next"
								style="color: #c8b44b"
							></div>
							<swiper-slide
								v-for="(item, index) in linkGambar"
								:key="index"
							>
								<a :href="item.n_link" target="_blank">
									<img
										:src="item.c_gambar"
										alt=""
										class="w-100 h-100"
										style="
											max-height: 500px;
											border-radius: 50px;
											object-fit: contain;
										"
									/>
								</a>
								<div
									class="d-flex justify-content-between align-items-center"
								>
									<hr class="m-0 w-25" />
									<span
										class="d-inline-flex align-items-center justify-content-center"
										style="height: 50px; width: 150px"
										>{{ index + 1 }} dari
										{{ linkGambar.length }}</span
									>
									<hr class="m-0 w-25" />
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
import { onMounted, ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

const modules = [Autoplay, Navigation];

const listIstana = ref([]);
const descIstana = ref("");

const sejarahIstanaJakarta = ref("");
const sejarahIstanaBogor = ref("");
const sejarahIstanaCipanas = ref("");
const sejarahIstanaTampaksiring = ref("");
const sejarahIstanaYogyakarta = ref("");

const imgTentangIstana = ref("");
const imgIstanaJakarta = ref("");
const imgIstanaBogor = ref("");
const imgIstanaCipanas = ref("");
const imgIstanaTampaksiring = ref("");
const imgIstanaYogyakarta = ref("");

const beritaHeadline = ref(null);
const beritaFeatured = ref(null);
const beritaCol1 = ref(null);
const beritaCol2 = ref(null);
const beritaCol3 = ref(null);
const col2IsEmpty = ref(null);
const col3IsEmpty = ref(null);
const foto = ref({});
const video = ref({});

const isLoading = ref(false);

const getAllIstana = async () => {
	try {
		const response = await api.get(
			`${import.meta.env.VITE_APP_RESTFUL_BASE_URL}/istana/get-all-istana`
		);
		listIstana.value = response.data.data;
		getSejarahIstana();
		getImgIstana();
	} catch (error) {}
};

const getIstanaName = (idIstana) => {
	if (idIstana == 'deb3a401-232f-4525-8a7b-9afdb354df6f') {
		idIstana = 'df065cf0-622f-49f8-8d4f-b66eef2ebce5'; // id istana jakarta
	}
	return listIstana.value.find((item) => item.id === idIstana).nama_istana;
};

const getSejarahIstana = () => {
	sejarahIstanaJakarta.value = listIstana.value.find(
		(item) => item.id === 'df065cf0-622f-49f8-8d4f-b66eef2ebce5'
	).deskripsi_istana;
	sejarahIstanaBogor.value = listIstana.value.find(
		(item) => item.id === 'c0785194-c033-414f-961c-52461e794b0b'
	).deskripsi_istana;
	sejarahIstanaCipanas.value = listIstana.value.find(
		(item) => item.id === 'ad779b6f-6af6-4974-ad2e-9385be62a0cd'
	).deskripsi_istana;
	sejarahIstanaTampaksiring.value = listIstana.value.find(
		(item) => item.id === 'ea48432d-127a-458a-903b-d7d5bfd0cb66'
	).deskripsi_istana;
	sejarahIstanaYogyakarta.value = listIstana.value.find(
		(item) => item.id === '393c9f8c-5ca8-49bc-9a57-df572389f275'
	).deskripsi_istana;
};

const getImgIstana = () => {
	imgIstanaJakarta.value = listIstana.value.find(
		(item) => item.id === 'df065cf0-622f-49f8-8d4f-b66eef2ebce5'
	).gambar;
	imgIstanaBogor.value = listIstana.value.find(
		(item) => item.id === 'c0785194-c033-414f-961c-52461e794b0b'
	).gambar;
	imgIstanaCipanas.value = listIstana.value.find(
		(item) => item.id === 'ad779b6f-6af6-4974-ad2e-9385be62a0cd'
	).gambar;
	imgIstanaTampaksiring.value = listIstana.value.find(
		(item) => item.id === 'ea48432d-127a-458a-903b-d7d5bfd0cb66'
	).gambar;
	imgIstanaYogyakarta.value = listIstana.value.find(
		(item) => item.id === '393c9f8c-5ca8-49bc-9a57-df572389f275'
	).gambar;
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
		.catch((error) => {});
};

const getVideo = async () => {
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
		})
		.catch((error) => {});
};

const getDescIstana = async () => {
	try {
		const idIstanaJakarta = 'df065cf0-622f-49f8-8d4f-b66eef2ebce5'
		const response = await api.get(
			`${import.meta.env.VITE_APP_RESTFUL_BASE_URL}/istana/getbyid/${idIstanaJakarta}`
		);
		descIstana.value = response.data.data;
		await presigned(response.data.data.c_gambar);
	} catch (error) {}
};

const presigned = async (key) => {
	const response = await api.post(
		`${import.meta.env.VITE_APP_RESTFUL_BASE_URL}/istura/presignedurl`,
		{
			key_gambar: key,
		}
	);
	imgTentangIstana.value = response.data.imgProxyUrl;
};

const getPageViewMatomo = () => {
	window._paq.push(["setCustomUrl", window.location.href]);
	//trackpageview
	window._paq.push(["trackPageView"]);
};

const linkGambar = ref("");
//logika buat ngambil datanya
const getPopUp = () => {
	// id istana jakarta
	const idIstanaValue = 'df065cf0-622f-49f8-8d4f-b66eef2ebce5';

	const paramServe = {
		idIstana: idIstanaValue,
	};

	api.post(`${import.meta.env.VITE_APP_RESTFUL_BASE_URL}/popup`, paramServe)
		.then((response) => {
			linkGambar.value = response.data.data;
		})
		.catch((error) => {
			console.error(error);
		});
};

const getBerita = async () => {
	isLoading.value = true;
	try {
		const response = await api.get(
			`${import.meta.env.VITE_APP_RESTFUL_BASE_URL}/berita/getlistberita`
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
	} catch (error) {
		
	} finally {
		isLoading.value = false;
	}
}


onMounted(async () => {
	try {
		getAllIstana();
		getPageViewMatomo();
		await getDescIstana();
		getFoto();
		getVideo();
		getPopUp();
		await getBerita();
	} catch (error) {

	}
});
</script>

<style>
.text-truncate-2 {
	-webkit-line-clamp: 9;
	overflow: hidden;
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
	z-index: 1000;
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
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px; /* Adjust the height to make it bigger */
}
/* Spinner animation */
.loader {
	border: 4px solid rgba(255, 255, 255, 0.3);
	border-radius: 50%;
	border-top: 4px solid var(--bs-primary);
	width: 50px;
	height: 50px;
	animation: spin 1s linear infinite;
}

/* Spinner animation keyframes */
@keyframes spin {
	0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
}
</style>
