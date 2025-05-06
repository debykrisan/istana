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
							>Pendaftaran</span
						></a
					>
				</li>
				<li class="breadcrumb-item">
					<a href="#"
						><span style="color: var(--bs-body-color)"
							>List Pendaftaran Istura</span
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
				<span class="mb-2">Data Istura</span>
				<div class="d-flex justify-content-between mb-2">
					<div class="d-flex">
						<div class="input-group me-2" style="width: 240px">
							<input
								type="text"
								class="w-100 p-2"
								style="
									background: transparent;
									border-radius: 4px;
									border: 1px solid #ced4da;
									font-size: 14px;
								"
								placeholder="Nama rombongan"
								v-model="rombongan"
							/>
						</div>
						<div
							class="d-flex justify-content-start align-items-center me-2"
						>
							<Datepicker
								format="yyyy-MM-dd"
								class="form-control p-0 border-0"
								:disabled="del || posting"
								autoApply
								:textInputOptions="textInputOptions"
								:enable-time-picker="false"
								v-model="tanggal"
							/>
						</div
						><button
							class="px-3"
							type="button"
							style="
								background: var(--bs-dark);
								color: var(--bs-white);
								border-radius: 4px;
								font-size: 14px;
								border-style: none;
							"
							@click="onSubmit()"
						>
							Search
						</button>
					</div>
					<div class="d-flex">
						<div
							class="input-group me-2"
							style="width: 240px"
						></div>
						<router-link
							class="d-flex align-items-center px-3"
							type="button"
							style="
								background: var(--bs-primary);
								color: var(--bs-dark);
								border-radius: 4px;
								font-size: 14px;
								border-style: none;
							"
							to="/pendaftaran/kunjungan/add"
							><img
								class="me-2"
								src="@/assets/img/svg/add_box.svg"
							/>Tambah</router-link
						>
					</div>
				</div>
			</div>
			<div class="table-responsive">
				<vue-good-table
					:columns="columns"
					:rows="rows"
					:totalRows="totalRecords"
					mode="remote"
					:fixed-header="true"
					v-on:page-change="onPageChange"
					v-on:sort-change="onSortChange"
					v-on:per-page-change="onPerPageChange"
					compactMode
					:row-style-class="rowStyleClassFn"
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
						<span
							v-if="
								props.column.field === 'status_istura' &&
								props.row.status_istura === 0
							"
						>
							<span
								style="
									padding: 6px 12px;
									background: #ffc115;
									border-radius: 50px;
									color: var(--bs-white);
								"
								>Konfirmasi</span
							>
						</span>
						<span
							v-if="
								props.column.field === 'status_istura' &&
								props.row.status_istura === 1
							"
						>
							<span
								style="
									padding: 6px 12px;
									background: #198754;
									border-radius: 50px;
									color: var(--bs-white);
								"
								>Disetujui</span
							>
						</span>
						<span
							v-if="
								props.column.field === 'status_istura' &&
								props.row.status_istura === 2
							"
						>
							<span
								style="
									padding: 6px 12px;
									background: #dc3545;
									border-radius: 50px;
									color: var(--bs-white);
								"
								>Ditolak</span
							>
						</span>
						<span
							v-if="
								props.column.field === 'status_istura' &&
								props.row.status_istura === 3
							"
						>
							<span
								style="
									padding: 6px 12px;
									background: #546bca;
									border-radius: 50px;
									color: var(--bs-white);
								"
								>Selesai</span
							>
						</span>
						<span
							v-if="
								props.column.field === 'status_istura' &&
								props.row.status_istura === 4
							"
						>
							<span
								style="
									padding: 6px 12px;
									background: #800000;
									border-radius: 50px;
									color: var(--bs-white);
								"
								>Dibatalkan</span
							>
						</span>

						<span
							v-if="
								props.column.field === 'status_istura' &&
								props.row.status_istura === 5
							"
						>
							<span
								style="
									padding: 6px 12px;
									background: #546bca;
									border-radius: 50px;
									color: var(--bs-white);
								"
								>Selesai</span
							>
						</span>

						<span v-if="props.column.field == 'action'">
							<div class="nav-item d-flex justify-content-center align-items-center">
								<span v-if="props.row.status_istura === 0">
									<Popper
										placement="top"
										:hover="true"
										:arrow="true"
										class="dark"
										content="Hapus"
									>
										<button
											type="button"
											class="d-flex justify-content-center btn"
											:disabled="props.row.status_istura > 0"
											data-bs-target="#konfirmasiHapus"
											data-bs-toggle="modal"
											@click="getId(props.row.id)"
										>
											<img
												src="@/assets/img/svg/close.svg"
												alt=""
											/>
										</button>
									</Popper>
								</span>
								<span v-else-if="props.row.status_istura === 1">
									<Popper
										placement="top"
										:hover="true"
										:arrow="true"
										class="dark"
										content="Unduh Surat Izin"
									>	
										<a :href="props.row.surat_izin" target="_blank">
											<button
												class="d-flex justif-content-center btn"
												type="button"
											>
												<img
													src="@/assets/img/svg/download.svg"
													alt=""
												/>
											</button>
										</a>
									</Popper>
								</span>
								<span v-else> </span>
								<span v-if="props.row.status_istura === 0">
									<Popper
										placement="top"
										:hover="true"
										:arrow="true"
										class="dark"
										content="Edit"
									>
										<router-link
											:to="{
												path:
													'/pendaftaran/kunjungan/edit/' +
													props.row.id,
											}"
										>
											<button
												type="button"
												class="d-flex justify-content-center btn"
												:disabled="props.row.status_istura > 0"
											>
												<img
													src="@/assets/img/svg/add_box.svg"
													alt=""
												/>
											</button>
										</router-link>
									</Popper>
								</span>
								<span v-else>
									<Popper
										placement="top"
										:hover="true"
										:arrow="true"
										class="dark"
										content="Detail"
									>
										<router-link
											:to="{
												path:
													'/pendaftaran/kunjungan/detail/' +
													props.row.id,
											}"
										>
											<button
												type="button"
												class="d-flex justify-content-center btn"
											>
												<img
													src="@/assets/img/svg/hamburger.svg"
													alt=""
												/>
											</button>
										</router-link>
									</Popper>
								</span>
							</div>
						</span>

						<span
							v-if="props.column.field === 'jam_kedatangan'"
						>
							<span v-if="props.row.id_istana === 4">
								{{ props.row.jam_kedatangan }} WITA
							</span>
							<span v-else>
								{{ props.row.jam_kedatangan }} WIB
							</span>
						</span>
					</template>
				</vue-good-table>
			</div>
			<!-- modal konfirmasi hapus -->
			<div class="modal fade" role="dialog" tabindex="-1" id="konfirmasiHapus">
				<div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
						<div class="modal-body">
							<p>Apakah anda yakin menghapus istura?</p>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-danger" 
							style="
								background: var(--bs-white);
								color: var(--bs-dark);
								border-color: var(--bs-primary);
								border-radius: 4px;
								font-size: 14px;
							"  
							data-bs-dismiss="modal"
							>
							Tidak
							</button>
							<button type="button" class="btn btn-primary" @click="deleteData" data-bs-dismiss="modal" style="
							background: var(--bs-primary);
							color: var(--bs-dark);
							border-radius: 4px;
							font-size: 14px;
							border-style: none;
							"
							>
							Ya
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</body>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/shared/services/api";
import { hitungOffset } from "../../../shared/services/util";
import { useLoading } from "vue-loading-overlay";
import { useToast } from "vue-toast-notification";
import { useRouter } from "vue-router";
import cookie from "cookiejs";
import Popper from "vue3-popper";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import dayjs from "dayjs";

const nama = ref(cookie.get(import.meta.env.VITE_APP_NAMAUSER));
const email = ref(cookie.get(import.meta.env.VITE_APP_EMAILUSER));
const alamat = ref(cookie.get(import.meta.env.VITE_APP_ALAMATUSER));
const phone = ref(cookie.get(import.meta.env.VITE_APP_PHONEUSER));
const idUser = ref(localStorage.getItem('id'));
const linkSuratIzin = ref("");
const rombongan = ref("");
const tanggal = ref("");
const $loading = useLoading();
const $router = useRouter();
const idIstura = ref("");

let serverParams = {
	columnFilters: {},
	sort: {
		field: "",
		type: "",
	},
	page: 0,
	perPage: 10,
	id: idUser.value
};

let rows = ref([]);
let totalRecords = ref(0);

const getId = (id) => {
    idIstura.value = id;
};

const columns = ref([
	{
		label: "Istana",
		field: "nama_istana",
	},
	{
		label: "Nama Rombongan",
		field: "rombongan",
	},
	{
		label: "Tanggal Kunjungan",
		field: "tanggal_kedatangan",
		thClass: "text-center",
		tdClass: "text-center",
	},
	{
		label: "Jam Kunjungan",
		field: "jam_kedatangan",
		thClass: "text-center",
		tdClass: "text-center",
	},
	{
		label: "Jumlah Rombongan",
		field: "jumlah_peserta",
		thClass: "text-center",
		tdClass: "text-center",
	},
	{
		label: "Status",
		field: "status_istura",
		thClass: "text-center",
		tdClass: "text-center",
	},
	{
		label: "Action",
		field: "action",
		thClass: "text-center",
		tdClass: "text-center",
		sortable: false,
		tooltip: "A simple tooltip",
	},
	{
		label: "",
		field: "id",
		hidden: true,
	},
]);

const fetchGroups = () => {
	const loader = $loading.show();
	
	api.post(
		import.meta.env.VITE_APP_RESTFUL_BASE_URL + "/istura/lististura",
		serverParams
	)
		.then((response) => {
			
			rows.value = response.data.data;
			totalRecords.value = response.data.recordsTotal;
			linkSuratIzin.value = response.data.data.surat_izin;
		})
		.catch(function (error) {
			
		})
		.finally(() => {
			loader.hide();
		});
};

const rowStyleClassFn = (rows) => {
	return rows.status > 2 ? "green" : "red";
};

const onPageChange = (params) => {
  //this.updateParams({page: params.currentPage});*/
	serverParams.page = hitungOffset(params.currentPage, params.currentPerPage); //ref(params.currentPage)
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
	if (rombongan.value) {
		serverParams.columnFilters["rombongan"] = rombongan.value
	}
	if (tanggal.value) {
		const tgl = dayjs(tanggal.value).format("YYYY-MM-DD");
		serverParams.columnFilters["tanggal"] = tgl
	}
	
	fetchGroups();

}

const deleteData = () => {
	const loader = $loading.show();

    let param = {
        id: idIstura.value,
		idUser: idUser.value
    }

    api.post(import.meta.env.VITE_APP_RESTFUL_BASE_URL + '/istura/delete', param)
        .then((response) => {
            useToast().success(response.data.pesan, {
                position: "top"
            })
        }).finally(() => {
            loader.hide()
			fetchGroups()
        })
}

onMounted(() => {
	fetchGroups();
	
	
});
</script>
