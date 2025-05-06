<template>
		<!-- <div
        style="
            padding-top: 100px;
            background-image: url('../assets/ornamen_kiri.png'), url('../assets/ornamen_kanan.png');
        "
        :style="
            {
                backgroundImage: 'url(' + bg_left + '), url(' + bg_right + ')',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'top left, top right',
                backgroundSize: '9%, 9%',
            }
        "
    >
    </div> -->

	<div :class="show">
		<body
			style="
				--bs-primary: #e1cd75;
				--bs-primary-rgb: 225, 205, 117;
				background: var(--bs-body-bg);
				--bs-body-color: #151515;
			"
		>
			<div
				class="container-fluid d-flex flex-column gap-3 pt-5"
				style="background: var(--bs-white)"
			>
			
				<div class="row g-0 justify-content-center">
					<div class="col-4 text-center mx-auto mt-2">
						<h2>Registrasi Akun</h2>
					</div>
				</div>
				<div class="row g-0 d-flex justify-content-center">
					<div
						class="col-4 d-flex justify-content-between align-items-center mx-auto gap-2"
					>
						<div class="d-flex gap-2">
							<div
								class="d-flex justify-content-center align-items-center"
								style="
									width: 24px;
									background: var(--bs-primary);
									border-radius: 4px;
									height: 24px;
								"
							>
								<span>1</span>
							</div>
							<span>Akun</span>
						</div>
						<div
							class="flex-fill"
							style="
								width: 10px;
								height: 1px;
								border-bottom-style: dotted;
							"
						></div>
						<div class="d-flex gap-2" style="opacity: 0.25">
							<div
								class="d-flex justify-content-center align-items-center"
								style="
									width: 24px;
									border-radius: 4px;
									height: 24px;
									border: 1px solid var(--bs-body-color);
								"
							>
								<span>2</span>
							</div>
							<span>Profil</span>
						</div>
						<div
							class="flex-fill"
							style="
								width: 10px;
								height: 1px;
								border-bottom-style: dotted;
							"
						></div>
						<div class="d-flex gap-2" style="opacity: 0.25">
							<div
								class="d-flex justify-content-center align-items-center"
								style="
									width: 24px;
									border-radius: 4px;
									height: 24px;
									border: 1px solid var(--bs-body-color);
								"
							>
								<span>3</span>
							</div>
							<span>Verifikasi</span>
						</div>
					</div>
				</div>
				<div class="row g-0 d-flex justify-content-center w-100 gap-3">
					<div class="col-4 gap-2">
						<form
							class="d-flex flex-column justify-content-center w-100 gap-3"
						>
							<div
								class="d-flex flex-column justify-content-center align-items-start w-100"
							>
								<span class="mb-1">Email</span>
								<div class="input-group">
									<input
										class="form-control p-2"
										type="text"
										placeholder="johndoe@example.com"
										style="font-size: 14px"
										v-model="email"
									/>
								</div>
							</div>
							<div
								class="d-flex flex-column justify-content-center align-items-start w-100"
							>
								<span class="mb-1">Password</span>
								<div class="input-group">
									<input
										:type="passwordFieldType"
										class="form-control"
										v-model="password"
									/>
									<button
										class="input-group-text"
										style="background: transparent"
										type="button"
										@click="hidePassword = !hidePassword"
									>
										<img
											v-if="
												passwordFieldType == 'password'
											"
											src="@/assets/img/svg/eye.svg"
										/>
										<img
											v-else
											src="@/assets/img/svg/eye-slash.svg"
										/>
									</button>
								</div>
							</div>
							<div
								class="d-flex flex-column justify-content-center align-items-start w-100"
							>
								<span class="mb-1">Konfirmasi Password</span>
								<div class="input-group">
									<input
										:type="confirmPassFieldType"
										class="form-control"
										v-model="confirmPassword"
									/>
									<button
										class="input-group-text"
										style="background: transparent"
										type="button"
										@click="
											hideConfirmPass = !hideConfirmPass
										"
									>
										<img
											v-if="
												confirmPassFieldType ==
												'password'
											"
											src="@/assets/img/svg/eye.svg"
										/>
										<img
											v-else
											src="@/assets/img/svg/eye-slash.svg"
										/>
									</button>
								</div>
							</div>
							<button
								class="btn btn-primary d-flex justify-content-center align-items-center p-2"
								type="button"
								style="
									background: var(--bs-primary);
									color: var(--bs-body-color);
									border-style: none;
								"
								@click="changePage()"
							>
								<span class="me-1" style="font-weight: 600"
									>Lanjut</span
								><img
									src="@/assets/img/svg/chevron_right.svg"
								/>
							</button>
							<div style="text-align: center">
								<span class="me-1">Sudah punya akun?</span
								><router-link to="/login" style="color: #af9b43"
									><span style="text-decoration: underline"
										>Masuk di sini</span
									></router-link
								>
							</div>
						</form>
					</div>
				</div>
			</div>
		</body>
	</div>

	<div :class="!show" v-if="show">
		<body
			class="min-vh-100"
			style="
				--bs-primary: #e1cd75;
				--bs-primary-rgb: 225, 205, 117;
				background: var(--bs-body-bg);
				--bs-body-color: #151515;
				font-family: Manrope, sans-serif;
			"
		>
			<div
				class="container-fluid text-center d-flex flex-column gap-3 pt-5"
				style="background: var(--bs-white)"
			>
				<div class="row g-0 justify-content-center">
					<div class="col-4 d-flex">
						<a
							class="d-flex justify-content-center align-items-center"
							type="button"
							@click="change = !change"
							><img
								src="@/assets/img/svg/chevron_left.svg"
							/><span style="color: #af9b43">Kembali</span></a
						>
						<h2 class="text-center m-auto" style="flex: 1 1 auto">
							Registrasi Akun
						</h2>
						<a
							class="d-flex justify-content-center align-items-center invisible"
							type="button"
							@click="change = !change"
							><img
								src="@/assets/img/svg/chevron_left.svg"
							/><span style="color: #af9b43">Kembali</span></a
						>
					</div>
				</div>
				<div class="row g-0 d-flex justify-content-center">
					<div
						class="col-4 d-flex justify-content-between align-items-center gap-2"
					>
						<div class="d-flex gap-2" style="opacity: 0.25">
							<div
								class="d-flex justify-content-center align-items-center"
								style="
									width: 24px;
									border-radius: 4px;
									height: 24px;
									border: 1px solid var(--bs-body-color);
								"
							>
								<span>1</span>
							</div>
							<span>Akun</span>
						</div>
						<div
							class="flex-fill"
							style="
								width: 10px;
								height: 1px;
								border-bottom-style: dotted;
							"
						></div>
						<div class="d-flex gap-2">
							<div
								class="d-flex justify-content-center align-items-center"
								style="
									width: 24px;
									background: var(--bs-primary);
									border-radius: 4px;
									height: 24px;
								"
							>
								<span>2</span>
							</div>
							<span>Profil</span>
						</div>
						<div
							class="flex-fill"
							style="
								width: 10px;
								height: 1px;
								border-bottom-style: dotted;
							"
						></div>
						<div class="d-flex gap-2" style="opacity: 0.25">
							<div
								class="d-flex justify-content-center align-items-center"
								style="
									width: 24px;
									border-radius: 4px;
									height: 24px;
									border: 1px solid var(--bs-body-color);
								"
							>
								<span>3</span>
							</div>
							<span>Verifikasi</span>
						</div>
					</div>
				</div>
				<div class="row g-0 d-flex justify-content-center w-100 gap-3">
					<div class="col-4">
						<form
							class="d-flex flex-column justify-content-center w-100 gap-3"
						>
							<div
								class="d-flex flex-column justify-content-center align-items-start w-100"
							>
								<div
									class="d-flex justify-content-center align-items-center mb-1"
								>
									<span class="me-1">Kartu Identitas</span
									><img src="@/assets/img/svg/info.svg" />
								</div>
								<div class="dropdown w-100">
									<select
										class="dropdown-toggle d-flex justify-content-between align-items-center w-100 p-2"
										v-model="kartu_identitas"
										aria-expanded="false"
										data-bs-toggle="dropdown"
										style="
											background: transparent;
											border-radius: 4px;
											border: 1px solid #ced4da;
											font-size: 14px;
										"
									>
										<span>Kartu Tanda Penduduk</span
										><img
											src="@/assets/img/svg/chevron_down.svg"
										/>
										<option value="0" selected>
											Kartu Tanda Penduduk
										</option>
										<option value="1">
											Surat Izin Mengemudi
										</option>
										<option value="2">Paspor</option>
									</select>
								</div>
							</div>
							<div
								class="d-flex flex-column justify-content-center align-items-start w-100"
							>
								<span class="mb-1">No. Identitas</span>
								<div class="input-group">
									<input
										class="form-control p-2"
										type="text"
										style="font-size: 14px"
										maxlength="16"
										oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');"
										v-model="nomer_identitas"
									/>
								</div>
							</div>
							<div
								class="d-flex flex-column justify-content-center align-items-start w-100"
							>
								<span class="mb-1">Nama Lengkap</span>
								<div class="input-group">
									<input
										class="form-control p-2"
										type="text"
										style="font-size: 14px"
										v-model="nama_lengkap"
									/>
								</div>
							</div>
							<div
								class="d-flex flex-column justify-content-center align-items-start w-100"
							>
								<span class="mb-1">No. Telepon</span>
								<div class="input-group">
									<input
										class="form-control p-2"
										type="text"
										style="font-size: 14px"
										maxlength="14"
										oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');"
										v-model="phone"
									/>
								</div>
							</div>
							<div
								class="d-flex flex-column justify-content-center align-items-start w-100"
							>
								<span class="mb-1">Alamat</span>
								<div class="input-group">
									<input
										class="form-control p-2"
										type="text"
										style="font-size: 14px"
										v-model="alamat"
									/>
								</div>
							</div>
							<button
								class="btn btn-primary d-flex justify-content-center align-items-center p-2"
								@click="onSubmit()"
								type="button"
								style="
									background: var(--bs-primary);
									color: var(--bs-body-color);
									border-style: none;
								"
							>
								<span class="me-1" style="font-weight: 600"
									>Daftar</span
								><img
									src="@/assets/img/svg/chevron_right.svg"
								/>
							</button>
							<div>
								<span class="me-1">Sudah punya akun?</span
								><router-link to="/login" style="color: #af9b43"
									><span style="text-decoration: underline"
										>Masuk di sini</span
									></router-link
								>
							</div>
						</form>
					</div>
				</div>
			</div>
		</body>
	</div>
	<!-- <div class="my-5 py-5" >
            <img :src="bg_bottom" style="width: 100%; height: auto; margin: 0; object-fit: fill">
        </div> -->
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import api from "@/shared/services/api";
import cookie from "cookiejs";
import { useToast } from "vue-toast-notification";
import { useRouter } from "vue-router";
import { useLoading } from "vue-loading-overlay";
import bg_right from "@/assets/ornamen_kanan.png";
import bg_left from "@/assets/ornamen_kiri.png";
import bg_bottom from "@/assets/ornamen_bawah.png";

let submitStatus = null;
const $loading = useLoading();
const $router = useRouter();
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const kartu_identitas = ref("");
const nomer_identitas = ref("");
const nama_lengkap = ref("");
const phone = ref("");
const alamat = ref("");
const hidePassword = ref(true);
const hideConfirmPass = ref(true);
const change = ref(true);
const show = computed(() => (change.value ? "" : "d-none"));
const passwordFieldType = computed(() =>
	hidePassword.value ? "password" : "text"
);
const confirmPassFieldType = computed(() =>
	hideConfirmPass.value ? "password" : "text"
);

onMounted(async () => {});

function changePage() {
	const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

	
	if (email.value == "" || password.value == "") {
		useToast().error("Email dan Password tidak boleh kosong!", {
			position: "top",
		});
		return;
	}

	if (!emailRegex.test(email.value)) {
		useToast().error("Email tidak valid!", {
			position: "top",
		});
		return;
	}

	if (!passwordRegex.test(password.value)) {
		useToast().error(
			"Password harus mengandung minimal 8 karakter, 1 huruf besar, 1 huruf kecil, 1 angka, dan 1 karakter spesial!",
			{
				position: "top",
			}
		);
		return;
	}

	if (confirmPassword.value != password.value) {
		useToast().error("Password tidak sesuai!", {
			position: "top",
		});
		return;
	} else {
		change.value = !change.value;
	}

}

const formVal = {
	email: null,
	password: null,
	kartu_identitas: null,
	nomer_identitas: null,
	nama_lengkap: null,
	phone: null,
	alamat: null,
};

const onSubmit = async () => {
	if (
		!formVal.email &&
		!formVal.password &&
		!formVal.kartu_identitas &&
		!formVal.nomer_identitas &&
		!formVal.nama_lengkap &&
		!formVal.phone &&
		!formVal.alamat
	) {
		submitStatus = "PENDING";

		let loader = $loading.show({
			container: false,
			canCancel: true,
		});
		let paramForm = {
			email: email.value,
			password: password.value,
			kartu_identitas: kartu_identitas.value,
			nomer_identitas: nomer_identitas.value,
			nama_lengkap: nama_lengkap.value,
			phone: phone.value,
			alamat: alamat.value,
		};
		let url =
			import.meta.env.VITE_APP_RESTFUL_BASE_URL + "/users/adduserjson";
		api.post(url, paramForm)
			.then((response) => {
				if (response.data.data === -1) {
					useToast().error(response.data.pesan, {
						position: "top",
					});
				} else {
					cookie.set(
						'emailVerifikasi', 
						email.value
					);
					cookie.set(
						'namaVerifikasi',
						response.data.data[0].nama_lengkap
					);
					useToast().success(response.data.pesan, {
						position: "top",
					});
					$router.push({ name: "verifikasi" });
				}
			})
			.catch((error) => {
				
				useToast().error(error.message, {
					position: "top",
				});
			})
			.finally(() => {
				loader.hide();
				submitStatus = "OK";
			});
	} else {
		useToast().error("Form wajib dilengkapi", {
			position: "top",
		});
	}
};
</script>

<style scoped>
/* .bg-top-left {
    background-image: url("../assets/ornamen_kiri.png");
    background-repeat: no-repeat;
    background-position: top left;
}
.bg-top-right {
    background-image: url("../assets/ornamen_kanan.png");
    background-repeat: no-repeat;
    background-position: top right;
}
.bg-top-bottom {
    background-image: url("../assets/ornamen_bawah.png");
    background-repeat: no-repeat;
    background-position: bottom;
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
} */
</style>
