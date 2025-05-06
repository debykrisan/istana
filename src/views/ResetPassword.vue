<template>
    <div
		class="container-fluid d-flex flex-column gap-3 pt-5"
		style="background: var(--bs-white)"
	>
		<div class="row g-0 justify-content-center mt-1">
			<div class="col-4 text-center mx-auto">
				<h2>Reset Password</h2>
			</div>
		</div>
		<div class="row g-0 d-flex justify-content-center w-100 gap-3">
			<div class="col-sm-7 col-md-5 col-lg-4 col-xl-3 gap-2">
				<form
					class="d-flex flex-column justify-content-center w-100 gap-3"
					action=""
					@submit.prevent=""
				>
					<div
						class="d-flex flex-column justify-content-center align-items-start w-100"
					>
						<span class="mb-1">Password Baru</span>
						<div class="input-group">
							<input
								class="form-control p-2"
								:type="passwordFieldType"
								style="font-size: 14px"
								v-model="password"
							/>
							<button
								class="input-group-text"
								style="background: transparent"
								type="button"
								@click="hidePassword = !hidePassword"
							>
								<img
									v-if="passwordFieldType == 'password'"
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
						<span class="mb-1">Konfirmasi Password Baru</span>
						<div class="input-group">
							<input
								class="form-control p-2"
								:type="konfirmasiPassFieldType"
								style="font-size: 14px"
								v-model="new_password"
							/>
							<button
								class="input-group-text"
								style="background: transparent"
								type="button"
								@click="hideKonfirmasiPassword = !hideKonfirmasiPassword"
							>
								<img
									v-if="konfirmasiPassFieldType == 'password'"
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
						class="btn btn-primary d-flex justify-content-center align-items-center p-2 mb-3"
						type="submit"
						style="
							background: var(--bs-primary);
							color: var(--bs-body-color);
							border-style: none;"
						@click="onSubmit()"
					>
						<span class="me-1" style="font-weight: 600">Reset Password</span>
					</button>
				</form>
			</div>
		</div>
	</div>
</template>


<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { useLoading } from "vue-loading-overlay";
import api from "@/shared/services/api";
import { useToast } from "vue-toast-notification";
import { ref } from "vue";
import { computed } from "vue";


const $route = useRoute()
const $routing = useRouter()

const loading = useLoading()
const token = $route.params.token
const toast = useToast()

const id = ref("")
const password = ref("")
const new_password = ref("")

const hidePassword = ref(true);
const hideKonfirmasiPassword = ref(true);

const passwordFieldType = computed(() =>
	hidePassword.value ? "password" : "text"
);

const konfirmasiPassFieldType = computed(() =>
	hideKonfirmasiPassword.value ? "password" : "text"
);


onMounted(() => {
	
	validateToken()
})


const validateToken = async () => {
	const loader = loading.show()
	try {
		const response = await api.get(import.meta.env.VITE_APP_RESTFUL_BASE_URL + `/users/reset-password/${token}`)
		//get response data
		const data = response.data
		id.value = data.id
		

	} catch (error) {
		if (error.response.status === 403 || error.response.status === 401) {
			toast.error("Token expired", {
					position: "top",
				}	
			)
			$routing.push('/login')
		}
	} finally {
		loader.hide()
	}
}

function onSubmit() {
	const loader = loading.show()
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (password.value == "") {
        useToast().error("Password baru tidak boleh kosong", {
            position: "top",
        });
        loader.hide()
        return;
    } else if (new_password.value == "") {
        useToast().error("Konfirmasi Password baru tidak boleh kosong", {
            position: "top",
        });
        loader.hide()
        return;
    } 

    if (!regex.test(password.value)) {
        useToast().error("Password baru harus memiliki minimal 8 karakter, 1 huruf besar, 1 angka, dan 1 karakter spesial", {
            position: "top",
        });
        loader.hide()
        return;
    } else {
		api.put(import.meta.env.VITE_APP_RESTFUL_BASE_URL + `/users/update-password/${id.value}`, {password_baru: password.value}, {withCredentials: true})
		.then((response) => {
			
			useToast().success("Reset Password berhasil diubah!", {
				position: "top",
			});
			$routing.push("/login")
		})
		.catch((error) => {
			
			useToast().error("Reset Password gagal diubah!", {
				position: "top",
			});
		})
		.finally(() => {
			loader.hide()
		})
    }
}
</script>