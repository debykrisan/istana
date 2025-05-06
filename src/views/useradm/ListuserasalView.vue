<template>
	<div class="card-body">
		<div class="row">
			<div class="card-body">
				<form @submit.prevent="onSubmit">
					<div class="form-floating mb-3 w-25 linput">
						<select
							v-model="company"
							class="form-control form-select"
						>
							<option></option>
							<option
								v-for="opt in istanaAll"
								:key="opt.id"
								:value="opt.id"
							>
								{{ opt.n_istana }}
							</option>
						</select>
						<label>Nama Istana</label>
					</div>
					<div class="form-floating mb-3 w-25">
						<input
							class="form-control"
							placeholder="nama pengguna"
							v-model="namaUser"
						/>
						<label>Nama Pengguna</label>
					</div>
					<div class="form-floating mb-3 w-25">
						<input
							class="form-control"
							placeholder="nama depan"
							v-model="namaDepan"
						/>
						<label>Nama Depan</label>
					</div>

					<div
						class="d-flex align-items-center justify-content-between mt-4 mb-0"
					>
						<button class="btn btn-primary" type="submit">
							Cari
						</button>
					</div>
				</form>
			</div>
		</div>
		<div class="row">
			<div class="d-flex justify-content-end">
				<router-link
					to="/useradm/add"
					class="w-20 btn btn-primary btn-sm"
				>
					<i class="fa fa-plus" aria-hidden="true"></i>Tambah Data
				</router-link>
			</div>
			<p>&nbsp;</p>
			<div class="col-md-12">
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
					:pagination-options="{
						enabled: true,
						perPage: 10,
						perPageDropdown: [20, 50, 100, 200],
						dropdownAllowAll: false,
					}"
					:search-options="{
						enabled: false,
					}"
					styleClass="table vgt-table condensed bordered striped"
				>
					<template #table-row="props">
						<span v-if="props.column.field === 'edit'">
							<router-link
								:to="{ path: '/useradm/edit/' + props.row.id }"
								class="d-flex justify-content-center"
							>
								<i class="fas fa-edit"></i>
							</router-link>
						</span>
						<span
							v-if="props.column.field === 'delete'"
							class="d-flex justify-content-center"
						>
							<router-link
								:to="{ path: '/useradm/del/' + props.row.id }"
							>
								<i class="fas fa-trash-alt"></i>
							</router-link>
						</span>
					</template>
				</vue-good-table>
			</div>
		</div>
	</div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import api from "@/shared/services/api";
import { hitungOffset } from "@/shared/services/util";
import { useLoading } from "vue-loading-overlay";
import { useToast } from "vue-toast-notification";

const $loading = useLoading();
const namaUser = ref("");
const namaDepan = ref("");
const istanaAll = ref([]);
const company = ref("");

let totalRecords = ref(0);
let rows = ref([]);
let serverParams = {
	columnFilters: {},
	sort: {
		field: "",
		type: "",
	},
	page: 0,
	perPage: 10,
};

const listIstana = () => {
	api.get(
		import.meta.env.VITE_APP_RESTFUL_BASE_URL + "/users/lististana"
	).then((response) => {
		istanaAll.value = response.data.data;
	});
};

const onSortChange = (params) => {
	serverParams.sort = params;
	fetchUsers();
};

const onPageChange = (params) => {
	serverParams.page = hitungOffset(params.currentPage, params.currentPerPage); //ref(params.currentPage)
	fetchUsers();
};
const onPerPageChange = (params) => {
	serverParams.perPage = params.currentPerPage;
	fetchUsers();
};
const fetchUsers = () => {
	const loader = $loading.show();
	api.post(
		import.meta.env.VITE_APP_RESTFUL_BASE_URL + "/users/listusersdt",
		serverParams
	)
		.then((response) => {
			rows.value = response.data.data;
			totalRecords.value = response.data.recordsTotal;
		})
		.catch(function (error) {
			useToast().error(error.message, {
				position: "top",
			});
		})
		.finally(() => {
			loader.hide();
		});
};
const onSubmit = () => {
	serverParams.columnFilters = {
		namaUser: namaUser.value,
		namaDepan: namaDepan.value,
		istana: company.value,
	};
	fetchUsers();
};
const columns = ref([
	{
		label: "Nama",
		field: "username",
	},
	{
		label: "Email",
		field: "email",
	},
	{
		label: "Nama Depan",
		field: "first_name",
	},
	{
		label: "Nama Belakang",
		field: "last_name",
	},
	{
		label: "Asal Istana",
		field: "n_istana",
	},
	{
		label: " ",
		field: "edit",
		sortable: false,
	},
	{
		label: " ",
		field: "delete",
		sortable: false,
	},
]);

onMounted(() => {
	listIstana();
	fetchUsers();
});
</script>
