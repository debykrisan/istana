<template>
	<body
		class="min-vh-100"
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
							>Dokumentasi</span
						></a
					>
				</li>
				<li class="breadcrumb-item">
					<a href="#"
						><span style="color: var(--bs-body-color)"
							>Permintaan Hasil Dokumentasi</span
						></a
					>
				</li>
			</ol>
			<h4>Kunjungan</h4>
			<div
				class="d-flex justify-content-between align-items-start px-3 py-2 mb-2"
				style="border-radius: 5px; border: 1px solid #d9d9d9"
			>
				<div>
					<ul class="list-unstyled">
						<li>Istana: {{ istana }}</li>
						<li>Nama Rombongan: {{ rombongan }}</li>
						<li>
							Tanggal Kunjungan:
							{{ dayjs(tanggal_kunjungan).format("DD-MM-YYYY") }}
						</li>
						<li>Jam Kunjungan: {{ jam_kunjungan }} WIB</li>
					</ul>
				</div>
				<div>
					<ul class="list-unstyled">
						<li>Data Akun Registrasi</li>
						<li>Nama: {{ nama }}</li>
						<li>No. Telepon: {{ phone }}</li>
						<li>Email: {{ email }}</li>
					</ul>
				</div>
			</div>
			<div class="d-flex flex-row justify-content-between mt-2">
				<div class="d-flex flex-column">
					<span class="mb-1">List Foto</span>
					<span style="color: red; font-size: 12px"
						>Pilih Foto maksimal 5</span
					>
				</div>
				<div class="my-2">
					<button
						class="px-3 py-2"
						type="button"
						style="
							background: var(--bs-blue);
							color: var(--bs-white);
							border-radius: 4px;
							font-size: 14px;
							border-style: none;
						"
						data-bs-toggle="modal"
						data-bs-target="#kirim"
					>
						Kirim
					</button>
				</div>
			</div>
			<div class="table-responsive">
				<table class="table">
					<thead>
						<tr>
							<th>No</th>
							<th>Foto</th>
							<th
								style="
									text-align: center;
									vertical-align: middle;
								"
							>
								Pilih Foto
							</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="opt in imageSrc" :key="opt.url">
							<td style="vertical-align: middle">
								{{ opt.num }}
							</td>
							<td>
								<img
									style="
										max-width: 100%;
										width: 238px;
										max-height: 300px;
										height: 151px;
									"
									:src="opt.imgProxyUrl"
								/>
							</td>
							<td
								style="
									text-align: -webkit-center;
									vertical-align: middle;
								"
							>
								<input
									v-model="groupChecked"
									:value="opt.key"
									v-on:change="onEventChange()"
									type="checkbox"
									class="form-check form-check-input"
								/>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<!-- <div
				class="d-flex justify-content-center align-items-start px-3 py-2 mb-2"
				style="background-color: #d9d9d9"
			>
				<div class="text-center px-3 py-2 mb-2">
					<p><strong>Catatan:</strong></p>
					<p>
						Apabila foto yang anda inginkan tidak ada pada daftar
						diatas, anda dapat mengirimkan
						<strong>surat permohonan foto</strong> ke Biro Pers,
						Media dan Informasi, Sekretariat Presiden dengan alamat
						Jl. Veteran No.16m Jakarta Pusat, 1011 atau melalui
						email:
						<strong>dokumentasi@istanakepresidenan.go.id</strong>
						dan melalui fax: 021-3860189
					</p>
					<p>
						Form surat permohonan foto dapat diunduh
						<a href="">disini</a>
					</p>
				</div>
			</div> -->
		</div>
		<!-- modal kirim -->
		<div
			v-if="groupChecked.length > 0"
			class="modal fade"
			role="dialog"
			tabindex="-1"
			id="kirim"
		>
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title w-100 text-center">
							Anda Yakin
						</h5>
					</div>
					<div class="modal-body text-center">
						<div
							class="d-flex justify-content-center align-items-start px-3 py-2"
						>
							<div class="px-3 py-2">
								<p class="fd-24">
									Konfirmasi Foto yang anda pilih
								</p>
								<p>
									Sekretariat Presiden memiliki kewenangan
									penuh untuk menyetujui atau menolak
									permohonan ini, tanpa memberitahukan alasan
									persetujuan maupun penolakan permohonan.
									Klik Ya jika setuju dan kirim permohonan
									atau Tidak untuk kembali
								</p>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button
							type="button"
							class="btn btn-secondary"
							data-bs-dismiss="modal"
						>
							Tidak
						</button>
						<button
							v-on:click="onClickYa"
							type="button"
							class="btn btn-primary"
							data-bs-dismiss="modal"
						>
							Ya
						</button>
					</div>
				</div>
			</div>
		</div>
	</body>
</template>

<script setup>
import { ref, onMounted } from "vue";
import cookie from "cookiejs";
import api from "@/shared/services/api";
import { useRoute, useRouter } from "vue-router";
import { inject } from "vue";
import dayjs from "dayjs";
import { useLoading } from "vue-loading-overlay";
import { useToast } from "vue-toast-notification";

const $route = useRoute();
const $router = useRouter();
const $loading = useLoading();
const Swal = inject("$swal");

const nama = ref(cookie.get(import.meta.env.VITE_APP_NAMAUSER));
const phone = ref(cookie.get(import.meta.env.VITE_APP_PHONEUSER));
const email = ref(cookie.get(import.meta.env.VITE_APP_EMAILUSER));
const istana = ref("");
const rombongan = ref("");
const tanggal_kunjungan = ref("");
const jam_kunjungan = ref("");
const kirimStatus = ref("");
const imageSrc = ref([]);

const groupChecked = ref([]);
const idDokumentasi = ref("");
const idIstura = ref("");
const path = ref("");

// get data kunjungan
const getDataKunjungan = (idDokumentasi) => {
	api.get(
		import.meta.env.VITE_APP_RESTFUL_BASE_URL +
			"/dokumentasi/getbyid/" +
			idDokumentasi
	).then((response) => {
		idIstura.value = response.data.data.id_istura;
		istana.value = response.data.data.nama_istana;
		rombongan.value = response.data.data.rombongan;
		tanggal_kunjungan.value = response.data.data.tanggal_kedatangan;
		jam_kunjungan.value = response.data.data.jam_kedatangan;
		kirimStatus.value = response.data.data.kirim_status;
		loadImage(response.data.foto);
	});
};

function onEventChange() {
	if (groupChecked.value.length > 5) {
		selectFotoAlert();
	}
}

const selectFotoAlert = () => {
	Swal.fire({
		title: "Warning",
		text: "Foto Yang anda Pilih Lebih dari 5",
		icon: "warning",
		confirmButtonColor: "#3085d6",
		confirmButtonText: "OK",
		allowOutsideClick: false,
	}).then((result) => {
		if (result.isConfirmed) {
			groupChecked.value.pop();
		}
	});
};

const onClickYa = () => {
	let param = {
		listPilihFoto: groupChecked.value,
		idIstura: idIstura.value,
	};
	const loader = $loading.show();

	let url = "/dokumentasi/list-permintaan-foto";
	if (path.value == "edit-permintaan-hasil-dokumentasi") {
		url = "/dokumentasi/ubah-permintaan-foto";
		param["idDokumentasi"] = idDokumentasi.value;
		param["kirimStatus"] = kirimStatus.value;
	}

	api.post(import.meta.env.VITE_APP_RESTFUL_BASE_URL + url, param).then(
		(response) => {
			useToast().success(response.data.pesan, {
				position: "top",
			});
			$router.push({
				path: "/dokumentasi",
			});
			loader.hide();
		}
	);
};

const loadImage = (key) => {
	if (key.length > 0) {
		for (let i = 0; i < key.length; i++) {
			api.post(
				import.meta.env.VITE_APP_RESTFUL_BASE_URL +
					"/dokumentasi/presignedurl",
				key[i]
			).then((response) => {
				imageSrc.value[i] = response.data;
				imageSrc.value[i].num = i + 1;
			});

			if (path.value == "edit-permintaan-hasil-dokumentasi") {
				if (key[i].c_user_pilih == 1) {
					groupChecked.value[i] = key[i].c_key_foto;
				}
			}
		}
	}
	
};

onMounted(async () => {
	try {
		idDokumentasi.value = $route.params.id;
		path.value = $route.params.path;
		getDataKunjungan(idDokumentasi.value);
	} catch (error) {
		console.log(error);
	}
});
</script>
