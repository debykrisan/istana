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
			<h4>Data Akun Registrasi</h4>
			<div
				class="d-flex justify-content-between align-items-start px-3 py-2 mb-2"
				style="border-radius: 5px; border: 1px solid #d9d9d9"
			>
				<div>
					<ul class="list-unstyled">
						<li>Nama: {{ nama }}</li>
						<li>No. Telepon: {{ phone }}</li>
						<li>Email: {{ email }}</li>
					</ul>
				</div>
				<div>
					<p class="mb-0">Alamat:</p>
					<p class="mb-0">{{ alamat }}</p>
				</div>
			</div>
			<div class="d-flex flex-column">
				<span class="mb-2">Data Dokumentasi</span>
				<div class="d-flex justify-content-between mb-2">
					<form @submit.prevent="onSubmit">
						<div class="d-flex bd-highlight" style="width: 700px">
							<div class="input-group me-2">
								<input
									class="w-100 p-2"
									type="text"
									style="
										background: transparent;
										border-radius: 4px;
										border: 1px solid #ced4da;
										font-size: 14px;
									"
									placeholder="Nama Rombongan"
									v-model="namaRombongan"
								/>
							</div>
							<button
								class="px-3 me-2 bd-highlight"
								type="submit"
								style="
									background: var(--bs-dark);
									color: var(--bs-white);
									border-radius: 4px;
									font-size: 14px;
									border-style: none;
								"
							>
								Cari
							</button>
						</div>
					</form>
					<div class="d-flex">
						<div
							class="input-group me-2"
							style="width: 240px"
						></div>
					</div>
				</div>
			</div>
			<div class="table-responsive mb-5">
				<vue-good-table
					:columns="columns"
					:rows="rows"
					:totalRows="totalRecords"
					mode="remote"
					v-on:page-change="onPageChange"
					v-on:sort-change="onSortChange"
					v-on:per-page-change="onPerPageChange"
					:pagination-options="{
						enabled: true,
						perPage: 10,
						perPageDropdown: [20, 50, 100, 200],
						dropdownAllowAll: false,
						mode: 'pages',
					}"
					:search-options="{
						enabled: false,
					}"
					styleClass="vgt-table "
				>
					<template #table-row="props">
						<span v-if="props.column.field === 'detail'">
							<ul class="list-unstyled" style="margin-left: -90px;">
								<li class="mb-1">Istana Kepresidenan : {{ props.row.nama_istana }}</li>
								<li class="mb-1">Nama Rombongan : {{ props.row.rombongan }}</li>
								<li class="mb-1">Tanggal Kedatangan : {{ props.row.tanggal_kedatangan }}</li>
								<li>Jam Kedatangan : {{ props.row.jam_kedatangan }}</li>
							</ul>
						</span>
						<span v-if="props.column.field === 'link_foto'">
							<img :src="props.row.link_foto" alt="" style="height: 150px; border-radius: 5px;">
						</span>
						<span
							v-if="
								props.column.field == 'action' &&
								props.row.kirim_status == 1
							"
						>
							<router-link
								:to="{
									name: 'editPermintaanHasilDokumentasi',
									params: {
										path: 'edit-permintaan-hasil-dokumentasi',
										id: props.row.id_dokumentasi,
									},
								}"
							>
								<button
									type="button"
									class="d-flex justify-content-center btn"
								>
									<img
										src="@/assets/img/svg/pencil-square.svg"
										alt=""
										height="25"
										width="25"
									/>
								</button>
							</router-link>
						</span>
						<span
							v-if="
								props.column.field == 'action' &&
								props.row.kirim_status == 2
							"
						>
							<router-link
								:to="{
									name: 'editPermintaanHasilDokumentasi',
									params: {
										path: 'edit-permintaan-hasil-dokumentasi',
										id: props.row.id_dokumentasi,
									},
								}"
							>
								<button
									type="button"
									class="d-flex justify-content-center btn"
								>
									<img
										src="@/assets/img/svg/hamburger.svg"
										alt=""
										height="25"
										width="25"
									/>
								</button>
							</router-link>
						</span>
						<span
							v-if="
								props.column.field == 'action' &&
								props.row.kirim_status == 3
							"
						>
							<router-link
								:to="{
									name: 'editPermintaanHasilDokumentasi',
									params: {
										path: 'edit-permintaan-hasil-dokumentasi',
										id: props.row.id_dokumentasi,
									},
								}"
							>
								<button
									type="button"
									class="d-flex justify-content-center btn"
								>
									<img
										src="@/assets/img/svg/hamburger.svg"
										alt=""
										height="25"
										width="25"
									/>
								</button>
							</router-link>
						</span>
						<span
							v-if="
								props.column.field == 'action' &&
								props.row.kirim_status == 0
							"
						>
							<router-link
								:to="{
									name: 'formPermintaanHasilDokumentasi',
									params: {
										path: 'permintaan-hasil-dokumentasi',
										id: props.row.id_dokumentasi,
									},
								}"
							>
								<button
									type="button"
									class="d-flex justify-content-center btn"
								>
									<img
										src="@/assets/img/svg/card-image.svg"
										alt=""
										height="25"
										width="25"
									/>
								</button>
							</router-link>
						</span>
						<span
							v-if="
								props.column.field === 'status' &&
								props.row.kirim_status == 0
							"
						>
							<span
								style="
									display: inline-block;
									padding: 6px 12px;
									background: #b19722;
									border-radius: 50px;
									color: var(--bs-white);
									margin-right: -25px;
								"
								>Belum Pilih</span
							>
						</span>
						<span
							v-if="
								props.column.field === 'status' &&
								props.row.kirim_status == 1
							"
						>
							<span
								style="
									display: inline-block;
									padding: 6px 12px;
									background: #e6e30c;
									border-radius: 50px;
									color: var(--bs-white);
									margin-right: 25px;
								"
								>Konfirmasi</span
							>
						</span>
						<span
							v-if="
								props.column.field === 'status' &&
								props.row.kirim_status == 2
							"
						>
							<span
								style="
									display: inline-block;
									padding: 6px 12px;
									background: #198754;
									border-radius: 50px;
									color: var(--bs-white);
									margin-right: 25px;
								"
								>Selesai</span
							>
						</span>
						<span
							v-if="
								props.column.field === 'status' &&
								props.row.kirim_status == 3
							"
						>
							<span
								style="
									display: inline-block;
									padding: 6px 12px;
									background: #dc3545;
									border-radius: 50px;
									color: var(--bs-white);
									margin-right: 25px;
								"
								>Ditolak</span
							>
						</span>
					</template>
				</vue-good-table>
			</div>
		</div>
	</body>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/shared/services/api";
import { hitungOffset } from "../../../shared/services/util";
import { useLoading } from "vue-loading-overlay";
import cookie from "cookiejs";

const nama = ref(cookie.get(import.meta.env.VITE_APP_NAMAUSER));
const email = ref(cookie.get(import.meta.env.VITE_APP_EMAILUSER));
const alamat = ref(cookie.get(import.meta.env.VITE_APP_ALAMATUSER));
const phone = ref(cookie.get(import.meta.env.VITE_APP_PHONEUSER));
const idUser = ref(localStorage.getItem('id'));
const namaRombongan = ref("");
const $loading = useLoading();
const rows = ref([]);
const totalRecords = ref(0);

let serverParams = {
	columnFilters: {},
	sort: {
		field: "",
		type: "",
	},
	page: 0,
	perPage: 10,
	idUser: idUser.value,
};

const columns = ref([
	{
		label: "No.",
		field: "rn",
		sortable: false,
		width: "50px",
	},
	{
		label: "Foto",
		field: "link_foto",
		sortable: false,
	},
	{
		label: "Detail Informasi",
		field: "detail",
		width: "300px",
		sortable: false,
	},
	{
		label: "Status",
		field: "status",
		sortable: false,
		width: "150px",
	},
	{
		label: "Aksi",
		field: "action",
		sortable: false,
	},
	{
		label: "",
		field: "id_dokumentasi",
		hidden: true,
	},
]);

const fetchGroups = () => {
	const loader = $loading.show();
	
	api.post(
		import.meta.env.VITE_APP_RESTFUL_BASE_URL + "/dokumentasi/listByIdUser",
		serverParams
	)
		.then((response) => {
			
			rows.value = response.data.data;
			totalRecords.value = response.data.recordsTotal;
		})
		.catch(function (error) {
			
		})
		.finally(() => {
			loader.hide();
		});
};

const onPageChange = (params) => {
	serverParams.page = hitungOffset(params.currentPage, params.currentPerPage);
	fetchGroups();
};

const onSortChange = (params) => {
	serverParams.sort = params;
	fetchGroups();
};

const onPerPageChange = (params) => {
	serverParams.perPage = params.currentPerPage;
	fetchGroups();
};

const onSubmit = () => {
    serverParams.columnFilters = {
        rombongan: namaRombongan.value,
    };
    fetchGroups();
};

onMounted(() => {
	fetchGroups();
});
</script>
