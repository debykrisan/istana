<template>
	<body
		style="
			--bs-primary: #e1cd75;
			--bs-primary-rgb: 225, 205, 117;
			background: var(--bs-body-bg);
			--bs-body-color: #151515;
		"
	>
		<div
			class="container d-flex flex-column pt-4"
			style="background: var(--bs-white)"
		>
			<ol class="breadcrumb mb-2">
				<li class="breadcrumb-item">
					<a href="#"
						><span
							style="
								color: var(--bs-body-color);
								font-weight: 600;
							"
							>Beranda</span
						></a
					>
				</li>
				<li class="breadcrumb-item">
					<a href="#"
						><span style="color: var(--bs-body-color)"
							>Pendaftaran</span
						></a
					>
				</li>
				<li class="breadcrumb-item">
					<a href="#"
						><span style="color: var(--bs-body-color)"
							>Form Pendaftaran Istura</span
						></a
					>
				</li>
			</ol>
			<div class="col d-flex align-items-center">
				<router-link
					class="d-flex justify-content-center align-items-center me-3"
					to="/pendaftaran/kunjungan"
					><img src="@/assets/img/svg/chevron_left.svg" /><span
						style="color: #af9b43"
						>Kembali</span
					></router-link
				>
				<h4 class="align-items-center mb-0">Form Pendaftaran Istura</h4>
			</div>
			<form ref="root" @submit.prevent="onSumbit"></form>
			<div class="row mb-5">
				<div class="col d-flex flex-column align-items-center gap-3">
					<!-- ISTANA KEPRESIDENAN -->
					<div
						class="d-flex flex-column justify-content-center align-items-start w-100"
					>
						<div
							class="d-flex justify-content-center align-items-center mb-1"
						>
							<span class="me-1">Pilih Istana Kepresidenan</span
							><img src="@/assets/img/svg/info.svg" />
						</div>
						<div class="dropdown w-100">
							<select
								class="dropdown-toggle d-flex justify-content-between align-items-center w-100 p-2"
								@change="onIstanaChange"
								v-model="idIstana"
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
								><img src="@/assets/img/svg/chevron_down.svg" />
								<option
									v-for="item in istana"
									:key="item.id"
									:value="item.id"
								>
									{{ item.nama_istana }}
								</option>
							</select>
						</div>
					</div>

					<!-- NAMA ROMBONGAN -->
					<div
						class="d-flex flex-column justify-content-center align-items-start w-100"
					>
						<span class="mb-1">Nama Rombongan</span>
						<div class="input-group">
							<input
								class="form-control p-2"
								type="text"
								style="font-size: 14px"
								v-model="rombongan"
							/>
						</div>
					</div>

					<!-- NAMA PENANGGUNG JAWAB -->
					<div
						class="d-flex flex-column justify-content-center align-items-start w-100 validaton-input"
					>
						<span class="mb-1">Nama Penanggung Jawab</span>
						<div class="input-group">
							<input
								class="form-control p-2"
								type="text"
								style="font-size: 14px"
								v-model="penanggungJawab"
							/>
						</div>
					</div>

					<!-- TELEPON PENANGGUNG JAWAB -->
					<div
						class="d-flex flex-column justify-content-center align-items-start w-100"
					>
						<span class="mb-1">No. Telepon Penanggung Jawab</span>
						<div class="input-group">
							<input
								class="form-control p-2"
								type="text"
								style="font-size: 14px"
								v-model="telpon"
								maxlength="14"
								required
								oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');"
							/>
						</div>
					</div>

					<!-- KATEGORI ROMBONGAN -->
					<div
						class="d-flex flex-column justify-content-center align-items-start w-100"
					>
						<div
							class="d-flex justify-content-center align-items-center mb-1"
						>
							<span class="me-1">Kategori Rombongan</span>
						</div>
						<div class="dropdown w-100">
							<select
								class="dropdown-toggle d-flex justify-content-between align-items-center w-100 p-2"
								v-model="kategori"
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
								><img src="@/assets/img/svg/chevron_down.svg" />
								<option value="0" selected>Umum</option>
								<option value="1">Mahasiswa / Pelajar</option>
								<option value="2">Asing</option>
							</select>
						</div>
					</div>

					<!-- TANGGAL KUNJUNGAN -->
					<div
						class="d-flex flex-column justify-content-center align-items-start w-100"
					>
						<span class="mb-1">Tanggal Kunjungan</span>
						<div class="input-group">
							<Datepicker
								v-model="tanggalKedatangan"
								format="yyyy-MM-dd"
								class="form-control p-0 border-0"
								placeholder="Pilih tanggal"
								:min-date="date"
								auto-apply
								:enable-time-picker="false"
								no-today
								:disabled-dates="allowDates"
								:disabled="idIstana === ''"
								:disabled-week-days="[6, 0]"
								@internal-model-change="onDateChange"
							/>
						</div>
					</div>
				</div>
				<div
					class="col d-flex flex-column justify-content-start align-items-center gap-3"
				>
					<!-- JAM KUNJUNGAN -->
					<div
						class="d-flex flex-column justify-content-center align-items-start w-100"
					>
						<div
							class="d-flex justify-content-center align-items-center mb-1"
						>
							<span class="me-1">Jam Kunjungan</span>
						</div>
						<div class="dropdown w-100">
							<select
								class="dropdown-toggle d-flex justify-content-between align-items-center w-100 p-2"
								v-model="jamKedatangan"
								aria-expanded="false"
								data-bs-toggle="dropdown"
								style="
									background: transparent;
									border-radius: 4px;
									border: 1px solid #ced4da;
									font-size: 14px;
								"
							>
								<img src="@/assets/img/svg/chevron_down.svg" />
								<option
									class="form-control"
									v-for="item in jam"
									:key="item.id"
									:value="item.id"
								>
									{{ item.jam }}
								</option>
							</select>
						</div>
					</div>

					<!-- JUMLAH PESERTA -->
					<div
						class="d-flex flex-column justify-content-center align-items-start w-100"
					>
						<span class="mb-1">Jumlah Peserta</span>
						<div class="input-group">
							<input
								class="form-control p-2"
								type="text"
								style="font-size: 14px"
								v-model="jumlahPeserta"
								oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');"
							/>
							<span class="form-control">
								Sisa kuota : {{ kuota }}
							</span>
						</div>
					</div>

					<!-- UPLOAD DAFTAR PESERTA -->
					<div
						class="d-flex flex-column justify-content-center align-items-start w-100"
					>
						<span class="mb-1"
							>Upload Daftar Peserta
							<span style="color: red; font-size: 12px"
								><i>(.docx, .xlsx | Maksimal 2mb)</i></span
							></span
						>
						<div class="input-group" :class="showPeserta">
                            <a :href="filePesertaUrl">
                                <button class="form-control">
                                    Lihat File
                                </button>
                            </a>
							<input 
								type="text" 
								class="form-control"
								id="fileDaftarPeserta"
								readonly
								v-model="namaFileDaftarPeserta"
							>
                            <a>
                                <button class="form-control btn-danger" @click="gantiPeserta">
                                    Ganti File
                                </button>
                            </a>
						</div>
						<div class="input-group" :class="!showPeserta" v-if="showPeserta">
							<input
								type="file"
								@change="onEventFilePicked"
								id="fileDaftarPeserta"
								class="form-control"
								accept=".xlsx,.xls,.doc,.docx"
							/>
                            <a>
                                <button class="form-control" @click="gantiPeserta">
                                    Batal
                                </button>
                            </a>
						</div>
					</div>

					<!-- NO SURAT PERMOHONAN -->
					<div
						class="d-flex flex-column justify-content-center align-items-start w-100"
					>
						<span class="mb-1">No. Surat Permohonan</span>
						<div class="input-group">
							<input
								class="form-control p-2"
								type="text"
								style="font-size: 14px"
								v-model="noPermohonan"
							/>
						</div>
					</div>

					<!-- TANGGAL SURAT PERMOHONAN -->
					<div
						class="d-flex flex-column justify-content-center align-items-start w-100"
					>
						<span class="mb-1"
							>Tanggal Surat Permohonan Kunjungan</span
						>
						<div class="input-group">
							<Datepicker
								v-model="tanggalSurat"
								format="yyyy-MM-dd"
								class="form-control p-0 border-0"
								autoApply
								:enable-time-picker="false"
								no-today
							/>
						</div>
					</div>

					<!-- UPLOAD SURAT PERMOHONAN -->
					<div
						class="d-flex flex-column justify-content-center align-items-start w-100"
					>
						<span class="mb-1"
							>Upload Surat Permohonan
							<span style="color: red; font-size: 12px"
								><i>(*image, .pdf | Maksimal 2mb)</i></span
							></span
						>
    
                        <div class="input-group" :class="showSurat">
                            <a :href="fileSuratUrl">
                                <button class="form-control">
                                    Lihat File
                                </button>
                            </a>
                            <input 
                                type="text" 
                                class="form-control"
                                id="fileSuratPermohonan"
                                readonly
                                v-model="namaFileSuratPermohonan"
                            >
                            <a>
                                <button class="form-control btn-danger" @click="gantiSurat">
                                    Ganti File
                                </button>
                            </a>
                        </div>

                        <div class="input-group" :class="!showSurat" v-if="showSurat">
                            <input
                                type="file"
                                @change="onEventFilePicked"
                                id="fileSuratPermohonan"
                                class="form-control"
                                accept=".pdf, .jpeg, .jpg, .png, .JPEG, .PNG"
                            />
                            <a>
                                <button class="form-control" @click="gantiSurat">
                                    Batal
                                </button>
                            </a>
                        </div>

					</div>
				</div>
			</div>

			<div class="col-4 mx-auto">
				<button
					class="btn btn-primary d-flex justify-content-center align-items-center p-2 w-100 mb-5"
					type="submit"
					style="
						background: var(--bs-primary);
						color: var(--bs-body-color);
						border-style: none;
					"
					@click="onSubmit()"
				>
					<span class="me-1" style="font-weight: 600">Submit</span>
				</button>
			</div>
		</div>
	</body>
</template>

<script setup>
import api from "@/shared/services/api";
import { onMounted, ref, computed, watchEffect} from "vue";
import { useToast } from "vue-toast-notification";
import { useRoute, useRouter } from "vue-router";
import { useLoading } from "vue-loading-overlay";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import dayjs from "dayjs";
import cookie from "cookiejs";

let submitStatus = null;
const $loading = useLoading();
const $router = useRouter();
const $route = useRoute();
const stopFetch = ref(true);

const idIstana = ref("");
const rombongan = ref("");
const penanggungJawab = ref("");
const telpon = ref("");
const kategori = ref("");
const tanggalKedatangan = ref("");
const jamKedatangan = ref("");
const jumlahPeserta = ref(null);
const noPermohonan = ref("");
const tanggalSurat = ref("");
const fileDaftarPeserta = ref(null);
const fileSuratPermohonan = ref("");
const namaFileDaftarPeserta = ref("");
const namaFileSuratPermohonan = ref("");
const date = new Date();
date.setDate(date.getDate() + 2);
const idUser = localStorage.getItem('id')
const status = ref("");
const kuota = ref(null);
const filePesertaUrl = ref("");
const fileSuratUrl = ref("");
const showSurat = computed(() => (changeSurat.value ? "" : "d-none"));
const changeSurat = ref(true);
const showPeserta = computed(() => (changePeserta.value ? "" : "d-none"));
const changePeserta = ref(true);

function gantiSurat() {
    changeSurat.value = !changeSurat.value;
}

function gantiPeserta() {
	fileDaftarPeserta.value = null;
    changePeserta.value = !changePeserta.value;
}

const formVal = {
	idIstana: null,
	rombongan: null,
	penanggungJawab: null,
	telpon: null,
	kategori: null,
	tanggalKedatangan: null,
	jamKedatangan: null,
	noPermohonan: null,
	tanggalSurat: null,
	jumlahPeserta: null,
};

// upload
const onEventFilePicked = (event) => {
	const file = event.target.files;
	let fsize = file[0].size;


	if (fsize > 2000000) {
		useToast().error("Maximum file size (2mb)", {
			position: "top",
		});
		if (event.target.id == "fileSuratPermohonan") {
			document.getElementById("fileSuratPermohonan").value = "";
		}
		if (event.target.id == "fileDaftarPeserta") {
			document.getElementById("fileDaftarPeserta").value = "";
		}
	} else {
		if (event.target.id == "fileSuratPermohonan") {
			fileSuratPermohonan.value = file;
		}
		if (event.target.id == "fileDaftarPeserta") {
			fileDaftarPeserta.value = file;
		}
	}
};

// get jam kedatangan by tanggal
const jam = ref([]);
const onDateChange = (tanggalKedatangan) => {
	tanggalKedatangan = dayjs(tanggalKedatangan).format("YYYY-MM-DD");
	let param = {
		tanggal: tanggalKedatangan,
		idIstana: idIstana.value,
		id: idIstura.value
	};

	api.post(
		import.meta.env.VITE_APP_RESTFUL_BASE_URL + "/istura/get-jam-istura",
		param
	)
		.then((response) => {
			jam.value = response.data.data;
			// 
		})
		.catch(function (error) {
			// 
		})
		.finally(() => {
			getKuota();
		});
};

// get tanggal by id istana
let tanggalIstura = [new Date()];
const id = ref();
const onIstanaChange = (event) => {
	id.value = event.target.value;
	let idIstana = {
		idIstana: id.value,
	};

	if (tanggalIstura.length > 0) {
		tanggalIstura.length = 0;
		tanggalIstura.push(new Date());
	}

	api.post(
		import.meta.env.VITE_APP_RESTFUL_BASE_URL +
			"/istura/get-tanggal-istura",
		idIstana
	)
		.then((response) => {
			let dt = response.data.data;
			for (var i = 0; i < dt.length; i++) {
				tanggalIstura.push(dt[i].tanggal);
			}
			// 
		})
		.catch(function (error) {
			// 
		});
};

const getKuota = () => {

	let tgl =  dayjs(tanggalKedatangan.value).format(
			"YYYY-MM-DD"
		);
	let param = {
		idIstana: idIstana.value,
		tanggal: tgl,
		id: idIstura.value
	};
	// 
	api.post(
		import.meta.env.VITE_APP_RESTFUL_BASE_URL + "/istura/get-kuota-istura",
		param
	)
		.then((response) => {
			kuota.value = response.data.data[0].kuota;
			// 
		})
		.catch(function (error) {
			// 
		});
};

// get active istana
const istana = ref([]);
const getIstana = () => {
	api.get(
		import.meta.env.VITE_APP_RESTFUL_BASE_URL + "/istana/get-active-istana"
	)
		.then((response) => {
			istana.value = response.data.data;
			
		})
		.catch(function (error) {
			// 
		}).finally(() => {
			getKuota()
		})
}; 

const allowDates = computed(() => {
	return tanggalIstura;
});

const idIstura = ref("");
onMounted(async () => {
	
	idIstura.value = $route.params.id;
	
	fetchGroup(idIstura.value);
	onDateChange(tanggalKedatangan.value);
	
});

const onSubmit = async () => {
	if (
		!formVal.idIstana &&
		!formVal.rombongan &&
		!formVal.penanggungJawab &&
		!formVal.telpon &&
		!formVal.kategori &&
		!formVal.tanggalKedatangan &&
		!formVal.jamKedatangan &&
		!formVal.noPermohonan &&
		!formVal.tanggalSurat &&
		!formVal.jumlahPeserta
	) {
		if (Number(jumlahPeserta.value) < 1) {
			useToast().error("Jumlah peserta tidak valid", {
				position: "top",
			});
			return;
		}
		
		const jumlahPesertaInt = parseInt(jumlahPeserta.value, 10);
		const kuotaInt = parseInt(kuota.value, 10);

		if (jumlahPesertaInt > kuotaInt) {
			useToast().error("Jumlah peserta melebihi batas kuota!", {
				position: "top",
			});
		} else {
			submitStatus = "PENDING";

			let loader = $loading.show({
				conainer: false,
				canCancel: true,
			});
			
			const tgl_kedatangan = dayjs(tanggalKedatangan.value).format(
				"YYYY-MM-DD"
			);
			const tgl_surat = dayjs(tanggalSurat.value).format("YYYY-MM-DD");

			let data = new FormData();

			let paramForm = {
				idIstana: idIstana.value,
				rombongan: rombongan.value,
				penanggungJawab: penanggungJawab.value,
				telpon: telpon.value,
				kategori: kategori.value,
				tanggalKedatangan: tgl_kedatangan,
				jamKedatangan: jamKedatangan.value,
				jumlahPeserta: jumlahPeserta.value,
				noPermohonan: noPermohonan.value,
				tanggalSurat: tgl_surat,
				idUser: idUser,
				id: idIstura.value
			}

			if (fileDaftarPeserta.value) {
				for (var i = 0; i < fileDaftarPeserta.value.length; i++) {
					data.append("c_file_peserta", fileDaftarPeserta.value[i]);
				}
			}
			if (fileSuratPermohonan.value) {
				for (var i = 0; i < fileSuratPermohonan.value.length; i++) {
					data.append("c_file_surat_permohonan", fileSuratPermohonan.value[i]);
				}
			}

			let url =
				import.meta.env.VITE_APP_RESTFUL_BASE_URL + "/istura/addistura";
			let urlUpload =
				import.meta.env.VITE_APP_RESTFUL_BASE_URL + "/istura/do-upload";		

			api.post(urlUpload, data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
				.then((response) => {
					if (response.data.key) {
						paramForm["key"] = response.data.key;
						// 
					} else {
						// 
						paramForm["key"] = [
							fileDaftarPeserta.value[0],
							fileSuratPermohonan.value[0],
						];
					}

					api.post(url, paramForm)
						.then((response) => {
							useToast().success(response.data.pesan, {
								position: "top",
							});
							$router.push({ path: "/pendaftaran/kunjungan" });
						})
						.finally(() => {
							loader.hide();
							submitStatus = "OK";
						})
					
				})
		}
	} else {

	}
}

// validasi form
const validasiForm = () => {
	if (!idIstana.value) {
		formVal.idIstana = "Wajib diisi!";
	}

	if (!rombongan.value) {
		formVal.rombongan = "Wajib diisi!";
	} else {
		if (rombongan.value.trim().length < 3) {
			formVal.rombongan = "Masukan minimal 3 karakter!";
		} else {
			formVal.rombongan = null;
		}
	}

	if (!penanggungJawab.value) {
		formVal.penanggungJawab = "Wajib diisi!";
	} else {
		if (penanggungJawab.value.trim().length < 3) {
			formVal.penanggungJawab = "Masukan minimal 3 karakter!";
		} else {
			formVal.penanggungJawab = null;
		}
	}

	if (!telpon.value) {
		formVal.telpon = "Wajib diisi!";
	} else {
		if (telpon.value.trim().length < 11) {
			formVal.telpon = "Masukan minimal 11 karakter!";
		} else {
			formVal.telpon = null;
		}
	}

	if (!kategori.value) {
		formVal.kategori = "Wajib diisi!";
	}

	if (!jamKedatangan.value) {
		formVal.jamKedatangan = "Wajib diisi!";
	}

	if (!jumlahPeserta.value) {
		formVal.jumlahPeserta = "Wajib diisi!";
	}

	if (!noPermohonan.value) {
		formVal.noPermohonan = "Wajib diisi!";
	} else {
		if (noPermohonan.value.trim().length < 3) {
			formVal.noPermohonan = "Masukan minimal 3 karakter!";
		} else {
			formVal.noPermohonan = null;
		}
	}

	if (!tanggalSurat.value) {
		formVal.tanggalSurat = "Wajib diisi!";
	}
};

watchEffect(async () => {
	if (!stopFetch.value) {
		validasiForm();
	}
});

const setStopFetch = (par) => {
	stopFetch.value = par;
};

const fetchGroup = (idIstura) => {
	const loader = $loading.show();
	// 
	api.get(
		import.meta.env.VITE_APP_RESTFUL_BASE_URL +
			"/istura/getbyid/" +
			idIstura
	)
		.then((response) => {
			let dt = response.data.data[0];
			idIstana.value = dt.id_istana;
			istana.value = dt.nama_istana;
			rombongan.value = dt.rombongan;
			penanggungJawab.value = dt.penanggung_jawab;
			telpon.value = dt.telpon;
			jamKedatangan.value = dt.id_jam;
			tanggalKedatangan.value = dt.tanggal_kedatangan;
			jumlahPeserta.value = dt.jumlah_peserta;
			kategori.value = dt.kategori;
			status.value = dt.status_istura;
			tanggalSurat.value = dt.tanggal_surat;
			noPermohonan.value = dt.no_permohonan;
			filePesertaUrl.value = dt.file_peserta;
			fileSuratUrl.value = dt.file_surat_permohonan;
			namaFileDaftarPeserta.value = dt.nama_file_peserta;
			namaFileSuratPermohonan.value = dt.nama_file_surat_permohonan;
			
			// 
			// 
			// 
		})
		.finally(() => {
			loader.hide();
			getIstana();
		});
};
</script>
