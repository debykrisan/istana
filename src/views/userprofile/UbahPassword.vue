<template>
      <body style="--bs-primary: #E1CD75;--bs-primary-rgb: 225,205,117;background: var(--bs-body-bg);--bs-body-color: #151515;">
        <div class="container d-flex flex-column pt-4" style="background: var(--bs-white);">
            <ol class="breadcrumb mb-2">
                <li class="breadcrumb-item"><a href="/"><span style="color: var(--bs-body-color); font-weight: 600;">Beranda</span></a></li>
                <li class="breadcrumb-item"><a href=""><span style="color: var(--bs-body-color);">Ubah Password</span></a></li>
            </ol>
            <div class="col d-flex align-items-center mb-4">
                <!-- <router-link class="d-flex justify-content-center align-items-center me-3" to="/"><img src="@/assets/img/svg/chevron_left.svg"><span style="color: #AF9B43;">Kembali</span></router-link> -->
                <h4 class="align-items-center mb-0">Ubah Password</h4>
            </div>
            <form ref="root" ></form>
            <div class="row mb-5">
                <div class="col d-flex flex-column align-items-center gap-3">
                    <!-- PASSWORD LAMA -->
                    <div class="d-flex flex-column justify-content-center align-items-start w-100">
                        <span class="mb-1">Password Lama</span>
                        <div class="input-group">
                            <input class="form-control p-2" :type="passwordLamaFieldType" style="font-size: 14px;" v-model="password_lama" >
                            <button
								class="input-group-text"
								style="background: transparent"
								type="button"
								@click="hidePasswordLama = !hidePasswordLama"
							>
								<img
									v-if="passwordLamaFieldType == 'password'"
									src="@/assets/img/svg/eye.svg"
								/>
								<img
									v-else
									src="@/assets/img/svg/eye-slash.svg"
								/>
							</button>
                        </div>
                    </div>

                    <!-- PASSWORD BARU -->
                    <div class="d-flex flex-column justify-content-center align-items-start w-100">
                        <span class="mb-1">Password Baru</span>
                        <div class="input-group" >
                            <input class="form-control p-2" :type="passwordBaruFieldType" style="font-size: 14px;" v-model="password_baru">
                            <button
								class="input-group-text"
								style="background: transparent"
								type="button"
								@click="hidePasswordBaru = !hidePasswordBaru"
							>
								<img
									v-if="passwordBaruFieldType == 'password'"
									src="@/assets/img/svg/eye.svg"
								/>
								<img
									v-else
									src="@/assets/img/svg/eye-slash.svg"
								/>
							</button>
                        </div>
                    </div>

                    <!-- CONFIRM PASSWORD BARU -->
                    <div class="d-flex flex-column justify-content-center align-items-start w-100">
                        <span class="mb-1">Confirm Password Baru</span>
                        <div class="input-group" >
                            <input class="form-control p-2" :type="confirmPasswordBaruFieldType" style="font-size: 14px;" v-model="confirm_password_baru" >
                            <button
								class="input-group-text"
								style="background: transparent"
								type="button"
								@click="hideConfirmPasswordBaru = !hideConfirmPasswordBaru"
							>
								<img
									v-if="confirmPasswordBaruFieldType == 'password'"
									src="@/assets/img/svg/eye.svg"
								/>
								<img
									v-else
									src="@/assets/img/svg/eye-slash.svg"
								/>
							</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Button Batal dan Simpan saling menyamping di pojok kanan -->
            <div class="d-flex justify-content-end gap-3">
                <router-link to="/">
                    <button class="btn btn-primary" style="background: #F00505; border: none; width: 100px;"  >Batal</button>
                </router-link>
                <button class="btn btn-primary" style="background: var(--bs-primary); border: none; width: 100px;" @click="onSubmit()" >Simpan</button>
            </div>
        </div>
    </body>

</template>

<script setup>
import { ref, computed } from 'vue'
import api from "@/shared/services/api";
import { useToast } from "vue-toast-notification";
import { useLoading } from "vue-loading-overlay";
import { processLogout } from "@/shared/services/util";
import { useRouter } from "vue-router";

const password_lama = ref("")
const password_baru = ref("")
const confirm_password_baru = ref("")
const idUser = localStorage.getItem('id')
const $loading = useLoading();
const router = useRouter();
const hidePasswordBaru = ref(true);
const hideConfirmPasswordBaru = ref(true);
const hidePasswordLama = ref(true);

const passwordBaruFieldType = computed(() =>
	hidePasswordBaru.value ? "password" : "text"
);

const confirmPasswordBaruFieldType = computed(() =>
	hideConfirmPasswordBaru.value ? "password" : "text"
);

const passwordLamaFieldType = computed(() =>
	hidePasswordLama.value ? "password" : "text"
);

function onSubmit() {
    const loader = $loading.show()
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (password_lama.value == "") {
        useToast().error("Password lama tidak boleh kosong", {
            position: "top",
        });
        loader.hide()
        return;
    } else if (password_baru.value == "") {
        useToast().error("Password baru tidak boleh kosong", {
            position: "top",
        });
        loader.hide()
        return;
    } else if (confirm_password_baru.value == "") {
        useToast().error("Konfirmasi password baru tidak boleh kosong", {
            position: "top",
        });
        return;
    }

    if (!regex.test(password_baru.value)) {
        useToast().error("Password baru harus memiliki minimal 8 karakter, 1 huruf besar, 1 angka, dan 1 karakter spesial", {
            position: "top",
        });
        loader.hide()
        return;
    } else {
        api.post(import.meta.env.VITE_APP_RESTFUL_BASE_URL + `/users/check-password/${idUser}`, {password: password_lama.value})
        .then((_) => {
            if (password_baru.value != confirm_password_baru.value) {
                useToast().error("Konfirmasi password baru tidak sama", {
                    position: "top",
                });
            } else {
                api.put(import.meta.env.VITE_APP_RESTFUL_BASE_URL + `/users/update-password/${idUser}`, {password_baru: password_baru.value})
                .then((response) => { 
                    const statusCode = response.status;
                    if (statusCode === 201) {
                        useToast().success("Password berhasil diubah", {
                            position: "top",
                        });
                        submitLogout()
                    }
                })
                .finally(() => {
                    loader.hide()
                })
            }

        }).catch((error) => {
            if (error.response.status == 401) {
                useToast().error("Password lama salah", {
                    position: "top",
                });
            }
            loader.hide()
        })
    }
}

const submitLogout = () => {
	processLogout();
	if (!localStorage.getItem("remember")) {
		localStorage.clear();
	} 
	router.push({ path: "/login" });
	router.go(0);
};

</script>