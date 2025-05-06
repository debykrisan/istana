<template>
	<div class="row">
		<div class="card shadow-lg border-0 rounded-lg">
			<div class="card-body">
				<form @submit.prevent="onSubmit" ref="root">
					<div class="form-floating mb-3 w-25 linput">
						<select
							:disabled="del"
							@blur="validasiForm"
							class="form-control form-select"
							v-model="company"
						>
							<option
								v-for="opt in istanaAll"
								:key="opt.id"
								:value="opt.id"
							>
								{{ opt.n_istana }}
							</option>
						</select>
						<label>Nama Istana</label>
						<p v-if="!company">Wajib Diisi</p>
					</div>
					<div class="form-floating mb-3 w-25 linput">
						<input
							class="form-control"
							v-model="identity"
							@focus="setStopFetch(false)"
							:disabled="del"
							:readonly="id > 0"
						/>
						<label>Nama Pengguna </label>
						<p v-if="formVal.identity">{{ formVal.identity }}</p>
					</div>
					<div class="form-floating mb-3 w-25 linput">
						<input
							class="form-control"
							type="password"
							v-model="password"
							:disabled="del"
						/>
						<label>Password </label>
						<p v-if="formVal.password">{{ formVal.password }}</p>
					</div>
					<div class="form-floating mb-3 w-25 linput">
						<input
							class="form-control"
							type="password"
							v-model="passwordDua"
							:disabled="del"
						/>
						<label>Password </label>
						<p v-if="passwordDua.password">
							{{ passwordDua.password }}
						</p>
					</div>
					<div class="form-floating mb-3 w-25 linput">
						<input
							class="form-control"
							v-model="firstName"
							:disabled="del"
						/>
						<label>Nama Depan </label>
						<p v-if="formVal.firstName">{{ formVal.firstName }}</p>
					</div>
					<div class="form-floating mb-3 w-25 linput">
						<input
							class="form-control"
							v-model="lastName"
							:disabled="del"
						/>
						<label>Nama Belakang </label>
					</div>
					<div class="form-floating mb-3 w-25 linput">
						<input
							class="form-control"
							v-model="jabatan"
							:disabled="del"
						/>
						<label>Jabatan </label>
					</div>
					<div class="form-floating mb-3 w-25 linput">
						<input
							class="form-control"
							v-model="email"
							:disabled="del"
							:readonly="id > 0"
						/>
						<label>Email </label>
					</div>
					<div class="form-floating mb-3 w-25 linput">
						<input
							class="form-control"
							v-model="phone"
							:disabled="del"
						/>
						<label>No Telp </label>
					</div>
					<div class="d-flex align-items-center float-end mt-4 mb-0">
						<button
							:class="
								del === 'del'
									? 'btn btn-danger'
									: 'btn btn-primary'
							"
							type="submit"
							:disabled="submitStatus === 'PENDING'"
						>
							<span v-if="del && id > 0">Hapus</span>
							<span v-else-if="id > 0 && !del">Ubah</span>
							<span v-else>Simpan </span>
						</button>
						&nbsp; &nbsp;
						<router-link
							class="btn btn-secondary"
							to="/useradm/list"
							>Kembali</router-link
						>
					</div>
				</form>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="card shadow-lg border-0 rounded-lg">
			<div class="card-body">
				<table
					class="table table-striped table-responsive table-bordered"
				>
					<thead class="table-dark">
						<tr>
							<th>Nama Otoritas</th>
							<th>Keterangan</th>
							<th>#</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="opt in grupAll" :key="opt.group_id">
							<td>{{ opt.name }}</td>
							<td>{{ opt.description }}</td>
							<td>
								<input
									type="checkbox"
									v-model="grupChecked"
									:value="opt.group_id"
									class="form-check form-check-input"
								/>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>
<script setup>
import api from "@/shared/services/api";
import { computed, onMounted, ref, watch, watchEffect } from "vue";
import { useToast } from "vue-toast-notification";
import { useLoading } from "vue-loading-overlay";
import { useRoute, useRouter } from "vue-router";
import cookie from "cookiejs";

const id = ref(null);
const del = ref(null);

let submitStatus = null;
const $loading = useLoading();
const $router = useRouter();
const $route = useRoute();
let statusForm = 0;
const grupAll = ref([]);
const istanaAll = ref([]);
const identity = ref("");
const password = ref("");
const firstName = ref("");
const lastName = ref("");
const company = ref("");
const phone = ref("");
const email = ref("");
const jabatan = ref("");
const passwordDua = ref("");
const stopFetch = ref(true);
const grupChecked = ref([]);
const formVal = {
	identity: null,
	password: null,
	firstName: null,
	passwordDua: null,
};

const setStopFetch = (par) => {
	stopFetch.value = par;
};

const listGroupById = (id) => {
	let loader = $loading.show({
		container: false,
		canCancel: true,
	});
	api.get(
		import.meta.env.VITE_APP_RESTFUL_BASE_URL +
			"/users/listgroupbyuserid/" +
			id
	)
		.then((response) => {
			const grupVal = response.data.data;
			grupAll.value = response.data.data;
			//
			for (let i = 0; i < grupVal.length; i++) {
				if (grupVal[i].checked) {
					grupChecked.value[i] = grupVal[i].group_id;
				}
			}
			//
		})
		.finally(() => {
			fetchUserData();
			loader.hide();
		});
};

const listIstana = () => {
	api.get(
		import.meta.env.VITE_APP_RESTFUL_BASE_URL + "/users/lististana"
	).then((response) => {
		istanaAll.value = response.data.data;
	});
};

watchEffect(async () => {
	if (!stopFetch.value) {
		if (identity.value.trim().length < 6) {
			formVal.identity = "Minimal 6 karakter";
		} else {
			formVal.identity = null;
		}
		if (password.value.trim().length < 6) {
			formVal.password = "Wajib diisi, Minimal 6 karakter!";
		} else {
			formVal.password = null;
		}

		if (passwordDua.value.trim().length < 6) {
			formVal.password = "Wajib diisi, Minimal 6 karakter!";
		} else {
			if (passwordDua.value.trim() !== password.value.trim()) {
				formVal.password = "Password tidak sesuai !";
				formVal.passwordDua = "Password tidak sesuai !";
			} else {
				formVal.password = null;
			}
		}

		if (firstName.value.trim().length < 3) {
			formVal.firstName = "Wajib diisi, Minimal 3 karakter!";
		} else {
			formVal.firstName = null;
		}
	}
});

onMounted(() => {
	const paramId = $route.params.id;
	id.value = paramId;
	del.value = $route.params.delete;
	listIstana();

	if (id.value > 0) {
		stopFetch.value = false;
		listGroupById(id.value);
	}
});

const fetchUserData = () => {
	api.get(
		import.meta.env.VITE_APP_RESTFUL_BASE_URL +
			"/users/getuserbyid/" +
			id.value
	)
		.then((response) => {
			if (response.data.data) {
				identity.value = response.data.data.username;
				// password.value = response.data.data.password
				firstName.value = response.data.data.first_name;
				lastName.value = response.data.data.last_name;
				company.value = response.data.data.company;
				phone.value = response.data.data.phone;
				email.value = response.data.data.email;
				jabatan.value = response.data.data.jabatan;
			} else {
				useToast().info("Data Tidak Ditemukan", {
					position: "top",
				});
				$router.push({ path: "/useradm/list" });
			}
		})
		.catch((error) => {
			useToast().error(error.message, {
				position: "top",
			});
			$router.push({ path: "/" });
		})
		.finally(() => {});
};

const onSubmit = async () => {
	if (!formVal.ketHewanAsal && !formVal.namaHewanAsal) {
		submitStatus = "PENDING";

		let loader = $loading.show({
			container: false,
			canCancel: true,
		});
		const namaUser = cookie.get(import.meta.env.VITE_APP_EMAILUSER);
		let paramForm = {
			identity: identity.value,
			password: password.value,
			firstName: firstName.value,
			lastName: lastName.value,
			company: company.value,
			phone: phone.value,
			email: email.value,
			jabatan: jabatan.value,
			id_entry: namaUser,
		};
		if (id) {
			paramForm["id"] = id.value;
			//
			paramForm["groups"] = grupChecked.value;
		}
		let url =
			import.meta.env.VITE_APP_RESTFUL_BASE_URL + "/users/adduserjson";
		if (id && del.value === "del") {
			url =
				import.meta.env.VITE_APP_RESTFUL_BASE_URL +
				"/users/deleteuserbyid";
		}
		api.post(url, paramForm)
			.then((response) => {
				if (response.data.data === -1) {
					useToast().error(response.data.pesan, {
						position: "top",
					});
				} else {
					useToast().success(response.data.pesan, {
						position: "top",
					});
				}

				$router.push({ path: "/useradm/list" });
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
