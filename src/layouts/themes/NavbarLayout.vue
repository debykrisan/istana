<template>
	<body
		:style="{
			backgroundImage: `linear-gradient(
					rgba(0, 0, 0, 0.05) 0%,
					rgba(0, 0, 0, 0.05)
				),
				${backgroundBatik}`,
		}"
	>
		<nav
			class="navbar navbar-light navbar-expand-md sticky-top bg-white pt-3"
			style="border-bottom: 1px solid #d9d9d9; padding-bottom: 20px"
		>
		<img :src="bg_right" alt="" class="bg-right">
 		<img :src="bg_left" alt="" class="bg-left">
				<div class="container">
				<button
					data-bs-toggle="collapse"
					class="navbar-toggler"
					data-bs-target="#navcol-2"
				>
					<span class="visually-hidden">Toggle navigation</span
					><span class="navbar-toggler-icon"></span>
				</button>
				<div
					class="collapse navbar-collapse position-relative"
					id="navcol-2"
				>
					<div class="d-flex flex-column align-items-center w-100">
						<div
							class="d-flex justify-content-between align-items-center w-100 gap-3 mb-1"
						>
							<div class="d-flex align-items-center">
								<img
									class="me-2"
									src="@/assets/img/setneg_logo.png"
									style="width: 48px; height: 48px"
								/>
								<h6 class="mb-0" style="color: #895700; font-size: smaller; font-weight: 700;">
									KEMENTERIAN SEKRETARIAT NEGARA<br />REPUBLIK
									INDONESIA<br /> SEKRETARIAT PRESIDEN
								</h6>
							</div>
							<div
								class="d-none d-lg-flex align-items-center invisible"
							>
								<img
									class="me-2"
									src="@/assets/img/setneg_logo.png"
									style="width: 48px; height: 48px"
								/>
								<h6 class="mb-0" style="color: #895700; font-size: smaller; font-weight: 700;">
									KEMENTERIAN SEKRETARIAT NEGARA<br />REPUBLIK
									INDONESIA<br /> SEKRETARIAT PRESIDEN
								</h6>
							</div>
						</div>
						<div
							class="text-center text-sm-center d-flex justify-content-center align-items-center w-100"
						>
							<ul
								class="navbar-nav justify-content-center align-items-center flex-wrap"
							>
								<li class="nav-item">
									<router-link class="nav-link active" to="/"
										>Beranda</router-link
									>
								</li>
								<li class="nav-item dropdown">
									<a
										class="nav-link d-flex justify-content-center align-items-center"
										href="#"
										data-bs-toggle="dropdown"
										><span class="me-1"
											>Istana Kepresidenan</span
										><img
											src="@/assets/img/svg/chevron_down.svg"
											style="opacity: 0.55"
									/></a>
									<ul class="list-unstyled dropdown-menu">
										<li
											class="dropdown-item"
										>
											<router-link
												:to="{
													name: 'istanaLandingPage',
													params: {
														id: 'df065cf0-622f-49f8-8d4f-b66eef2ebce5',
													},
												}"
												class="text-body"
												>Istana Kepresidenan Jakarta</router-link
											>
										</li>
										<li
											class="dropdown-item"
										>
											<router-link
												:to="{
													name: 'istanaLandingPage',
													params: {
														id: 'c0785194-c033-414f-961c-52461e794b0b',
													},
												}"
												class="text-body"
												>Istana Kepresidenan Bogor</router-link
											>
										</li>
										<li
											class="dropdown-item"
										>
											<router-link
												:to="{
													name: 'istanaLandingPage',
													params: {
														id: 'ad779b6f-6af6-4974-ad2e-9385be62a0cd',
													},
												}"
												class="text-body"
												>Istana Kepresidenan Cipanas</router-link
											>
										</li>
										<li
											class="dropdown-item"
										>
											<router-link
												:to="{
													name: 'istanaLandingPage',
													params: {
														id: 'ea48432d-127a-458a-903b-d7d5bfd0cb66',
													},
												}"
												class="text-body"
												>Istana Kepresidenan Tampaksiring</router-link
											>
										</li>
										<li
											class="dropdown-item"
										>
											<router-link
												:to="{
													name: 'istanaLandingPage',
													params: {
														id: '393c9f8c-5ca8-49bc-9a57-df572389f275',
													},
												}"
												class="text-body"
												>Istana Kepresidenan Yogyakarta</router-link
											>
										</li>
									</ul>
								</li>
								<li class="nav-item dropdown">
									<a
										class="nav-link d-flex justify-content-center align-items-center"
										href="#"
										data-bs-toggle="dropdown"
										><span class="me-1">Galeri</span
										><img
											src="@/assets/img/svg/chevron_down.svg"
											style="opacity: 0.55"
									/></a>
									<ul class="list-unstyled dropdown-menu">
										<li
											class="dropdown-item"
											v-for="item in listMenuGaleri"
											:key="item.id_submenu"
										>
											<router-link
												:to="{ path: item.link }"
												style="
													color: var(--bs-body-color);
												"
												>{{
													item.nama_submenu
												}}</router-link
											>
										</li>
									</ul>
								</li>
								<li class="nav-item dropdown">
									<a
										class="nav-link d-flex justify-content-center align-items-center"
										href="#"
										data-bs-toggle="dropdown"
										><span class="me-1">Pendaftaran</span
										><img
											src="@/assets/img/svg/chevron_down.svg"
											style="opacity: 0.55"
									/></a>
									<ul class="list-unstyled dropdown-menu">
										<li
											class="dropdown-item"
											v-for="item in listMenuPendaftaran"
											:key="item.id_submenu"
										>
											<router-link
												:to="{ path: item.link }"
												style="
													color: var(--bs-body-color);
												"
												>{{
													item.nama_submenu
												}}</router-link
											>
										</li>
									</ul>
								</li>
								<li class="nav-item dropdown">
									<a
										class="nav-link d-flex justify-content-center align-items-center"
										href="#"
										data-bs-toggle="dropdown"
										><span class="me-1">Layanan</span
										><img
											src="@/assets/img/svg/chevron_down.svg"
											style="opacity: 0.55"
									/></a>
									<ul class="list-unstyled dropdown-menu">
										<li
											class="dropdown-item"
											v-for="item in listMenuLayanan"
											:key="item.id_submenu"
										>
											<router-link
												:to="{ path: item.link }"
												style="
													color: var(--bs-body-color);
												"
												>{{
													item.nama_submenu
												}}</router-link
											>
										</li>
									</ul>
								</li>
								<li class="nav-item nav-break w-100"></li>
								<li class="nav-item d-flex justify-content-center align-items-center search-bar">
									<form @submit.prevent="search" class="d-flex">
										<input
											class="form-control border-end-0 border rounded-pill"
											type="text"
											id="search-input"
											placeholder="Search"
										/>
										<button type="submit" class="btn btn-link rounded-pill" style="color: #000000aa">
											<i class="fa fa-search"></i>
										</button>
									</form>
								</li>
								<li
									class="nav-item d-flex justify-content-center align-items-center register"
									v-if="email"
								>
									<div class="nav-item dropdown">
										<a
											class="nav-link d-flex justify-content-center align-items-center"
											href="#"
											data-bs-toggle="dropdown"
											><img
												class="me-2"
												src="@/assets/img/svg/user_circle.svg"
												style="opacity: 0.55" />
											<span class="me-1">{{ nama }}</span
											><img
												src="@/assets/img/svg/chevron_down.svg"
												style="opacity: 0.55"
										/></a>
										<ul class="list-unstyled dropdown-menu">
											<router-link to="/editprofile">
												<li class="dropdown-item">
													<a
														style="
															color: var(
																--bs-body-color
															);
														"
														>Edit Profile</a
													>
												</li>
											</router-link>
											<router-link to="/ubahpassword">
												<li class="dropdown-item">
													<a
														style="
															color: var(
																--bs-body-color
															);
														"
														>Ubah Password</a
													>
												</li>
											</router-link>
											<router-link to="">
												<li
													class="dropdown-item"
													@click="submitLogout()"
												>
													<a
														style="
															color: var(
																--bs-body-color
															);
														"
													>
														Logout
													</a>
												</li>
											</router-link>
										</ul>
									</div>
								</li>
								<div
									class="nav-item d-flex justify-content-center align-items-center"
									v-else
								>
									<li
										class="nav-item d-flex justify-content-center align-items-center register"
									>
										<router-link
											to="/register"
											class="btn m-auto"
											role="button"
											style="
												background: var(--bs-primary);
												padding: 4px 10px;
											"
											>Daftar</router-link
										>
									</li>
									<li
										class="nav-item d-flex justify-content-center align-items-center login"
									>
										<router-link
											class="nav-link"
											to="/login"
											style="
												color: #af9b43;
												padding: 4px 10px;
											"
											>Masuk</router-link
										>
									</li>
								</div>
							</ul>
						</div>
						<div
							class="d-flex justify-content-center align-items-center bg-white"
							id="logo-istana"
						>
							<img
								:src="imageUrl"
								alt="img"
								style="height: 40px"
							/>
						</div>
					</div>
				</div>
			</div>
		</nav>

		<slot />

		
		
		<footer style="background: white">
			<img :src="bg_bottom" alt="" class="bg-bottom"/>
			<div class="container py-4 py-lg-5">
				<div class="row justify-content-center">
					<div
						class="col text-center text-lg-start d-flex flex-column item"
					>
						<h3 class="fs-6 fw-bold">Pendaftaran</h3>
						<ul class="list-unstyled">
							<li
								v-for="item in listMenuPendaftaran"
								:key="item.id_submenu"
							>
								<router-link
									class="link-secondary"
									:to="{ path: item.link }"
									>{{
										item.nama_submenu
									}}</router-link
								>
							</li>
						</ul>
					</div>
					<div
						class="col text-center text-lg-start d-flex flex-column item"
					>
						<h3 class="fs-6 fw-bold">Layanan</h3>
						<ul class="list-unstyled">
							<li
								v-for="item in listMenuLayanan"
								:key="item.id_submenu"
							>
								<router-link
									class="link-secondary"
									:to="{ path: item.link }"
									>{{
										item.nama_submenu
									}}</router-link
								>
							</li>
						</ul>
					</div>
					<div class="col text-center text-lg-start d-flex flex-column item">
						<h3 class="fs-6 fw-bold">Links</h3>
						<div class="row">
							<div class="col-md-12">
							<ul class="list-unstyled">
								<li v-for="(item) in listAppLayanan.slice(0,5)" :key="item.n_nama">
								<a class="link-secondary" :href="item.n_link">{{ item.n_nama }}</a>
								</li>
							</ul>
							</div>
						</div>
					</div>
					<div class="col text-center text-lg-start d-flex flex-column item" v-if="listAppLayanan.length > 5">
						<br>
						<div class="row">
							<div class="col-md-12">
							<ul class="list-unstyled">
								<li v-for="(item) in listAppLayanan.slice(5,10)" :key="item.n_nama">
								<a class="link-secondary" :href="item.n_link">{{ item.n_nama }}</a>
								</li>
							</ul>
							</div>
						</div>
					</div>
					<div
						class="col text-center text-lg-start d-flex flex-column align-items-center align-items-lg-start item social"
					>
						<div class="fw-bold d-flex align-items-center mb-2">
							<span>Portal Istana Kepresidenan</span>
						</div>
						<!-- <p class="text-muted copyright">
							Sem eleifend donec molestie, integer quisque orci
							aliquam.
						</p> -->
						<router-link
							:to="{
								name: 'sejarahIstana',
								params: {
									idIstana: 'df065cf0-622f-49f8-8d4f-b66eef2ebce5'
								},
							}"
						>
							<p class="text-muted copyright">Tentang Istana</p>
						</router-link>
						<router-link
							:to="{
								name: 'kebijakanPrivasi'
							}"
						>
							<p class="text-muted copyright" style="margin-top: -10px ;">Kebijakan Privasi</p>
						</router-link>
						<router-link
							:to="{
								name: 'kontakIstana'
							}"
						>
							<p class="text-muted copyright" style="margin-top: -10px;">Kontak</p>
						</router-link>
					</div>
				</div>
				<hr />
				<div
					class="d-flex justify-content-between align-items-center pt-3"
				>
					<p class="text-muted mb-0">
						Copyright © 2022 Sekretariat Presiden
					</p>
					<ul class="list-inline mb-0">
						<li class="list-inline-item">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="1em"
								height="1em"
								fill="currentColor"
								viewBox="0 0 16 16"
								class="bi bi-facebook"
							>
								<path
									d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"
								></path>
							</svg>
						</li>
						<li class="list-inline-item">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="1em"
								height="1em"
								fill="currentColor"
								viewBox="0 0 16 16"
								class="bi bi-twitter"
							>
								<path
									d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"
								></path>
							</svg>
						</li>
						<li class="list-inline-item">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="1em"
								height="1em"
								fill="currentColor"
								viewBox="0 0 16 16"
								class="bi bi-instagram"
							>
								<path
									d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
								></path>
							</svg>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	</body>
</template>

<script setup>
import { onMounted, ref } from "vue";
import cookie from "cookiejs";
import { processLogout } from "@/shared/services/util";
import api from "@/shared/services/api";
import { useRouter } from "vue-router";
import imageUrl from "@/assets/img/svg/logo_istana_5.svg";
import bg_right from "@/assets/ornamen_kanan.png";
import bg_left from "@/assets/ornamen_kiri.png";
import bg_bottom from "@/assets/ornamen_bawah.png";

const email = ref("");
const backgroundBatik = ref("");
const listMenuGaleri = ref([]);
const listMenuPendaftaran = ref([]);
const listMenuLayanan = ref([]);
const listAppLayanan = ref([]);
const $router = useRouter();
const nama = ref(cookie.get(import.meta.env.VITE_APP_NAMAUSER));

function bukaTutup() {
	const sidebarToggle = document.body.querySelector("#sidebarToggle");
	if (sidebarToggle) {
		document.body.classList.toggle("sb-sidenav-toggled");
		localStorage.setItem(
			"sb|sidebar-toggle",
			document.body.classList.contains("sb-sidenav-toggled")
		);
	}
}
function dropDown() {
	// let dropdowns = document.querySelectorAll('#navbarDropdown');
	let dropdownDiv = document.getElementById("dropdown-menu-head");
	if (dropdownDiv.style.display == "block") {
		dropdownDiv.style.display = "none";
	} else {
		dropdownDiv.style.display = "block";
		dropdownDiv.style.left = "-98px";
	}
}

function collapse(par) {
	let collapseLayoutsDiv = document.getElementById(par);
	if (collapseLayoutsDiv.style.display == "block") {
		collapseLayoutsDiv.style.display = "none";
	} else {
		collapseLayoutsDiv.style.display = "block";
	}
}

const submitLogout = () => {
	const dataCookie = {
		email: cookie.get(import.meta.env.VITE_APP_EMAILUSER),
		nama: cookie.get(import.meta.env.VITE_APP_NAMAUSER),
		roles: cookie.get(import.meta.env.VITE_APP_ROLES),
	};
	//get data form cache

	window._paq.push(['trackEvent', 'Logout', 'Berhasil', `Email: ${dataCookie.email}`, { 'nama': dataCookie.nama, 'roles': dataCookie.roles }]);
	window._paq.push(['setCustomDimension', 1, `logout`]);
	processLogout();
	if (!localStorage.getItem("remember")) {
		localStorage.clear();
	}
	$router.push({ path: "/" });
	$router.go(0);
};

const setReqUser = () => {
	email.value = cookie.get(import.meta.env.VITE_APP_EMAILUSER);
	// 
};

const getBackgroundBatik = async () => {
  const formData = new FormData();
  formData.append('key_gambar', '444862b2-e7e6-4cf5-ba69-a94f9e4d6ab0.png');

  try {
    const response = await api.post(
      `${import.meta.env.VITE_APP_RESTFUL_BASE_URL}/istura/presignedurl`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    const backgroundUrl = response.data.imgProxyUrl;
    if (backgroundUrl) {
      backgroundBatik.value = `url(${backgroundUrl})`;
    } else {
      backgroundBatik.value = '';
    }
  } catch (error) {
    console.error('Error getting background:', error);
  }
};

const search = () => {
    const searchInput = document.getElementById("search-input");
    const searchValue = searchInput.value;
    if (searchValue) {
        // Assuming $router is available in your component
        $router.push({ path: "/search", query: { q: searchValue } });
    }
    return false; // Prevents default form submission behavior
};


onMounted(async () => {
	try {
		setReqUser();
		await getBackgroundBatik();
		
		const menu = await api.get(
			`${import.meta.env.VITE_APP_RESTFUL_BASE_URL}/menu/get-active-menu`
		);
		const dataMenu = menu.data;
		

		if (dataMenu) {
			listMenuGaleri.value = dataMenu.galeri;
			listMenuPendaftaran.value = dataMenu.pendaftaran;
			listMenuLayanan.value = dataMenu.layanan;
			listAppLayanan.value = dataMenu.app;
		} else {
			listMenuGaleri.value = [];
			listMenuPendaftaran.value = [];
			listMenuLayanan.value = [];
			listAppLayanan.value = [];
		}
	} catch (error) {
		
	}
});
</script>

<style scoped>
@media (min-width: 768px) {
	#logo-istana {
		border-bottom: 1.5px solid #d9d9d9;
		border-bottom-right-radius: 10px;
		border-bottom-left-radius: 10px;
		position: absolute;
		padding: 16px;
	}
}

@media (min-width: 768px) {
	#logo-istana {
		top: 150px !important;
		display: block !important;
	}
}

@media (min-width: 992px) {
	#logo-istana {
		top: 165px !important;
	}
}

@media (min-width: 1200px) {
	#logo-istana {
		top: 101px !important;
	}
}

.bg-right {
  width: 8%;
  position: absolute;
  top: 0;
  right: 0;
}

.bg-left {
  width: 8%;
  position: absolute;
  top: 0;
  left: 0;
}

.bg-bottom {
  width: 100%;
}
.bg-container {
  background-repeat: no-repeat;
  background-position: top left, top right;
  background-size: 9%, 9%;
}

@media (max-width: 991px) {
  .bg-container {
    background-size: 20%, 20%;
  }
}

@media (max-width: 768px) {
  .bg-container {
    background-size: 30%, 30%;
  }
}

@media (max-width: 576px) {
  .bg-container {
    background-size: 50%, 50%;
  }
}
</style>
