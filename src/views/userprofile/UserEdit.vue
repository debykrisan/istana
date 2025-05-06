<template>
     <body style="--bs-primary: #E1CD75;--bs-primary-rgb: 225,205,117;background: var(--bs-body-bg);--bs-body-color: #151515;">
        <div class="container d-flex flex-column pt-4" style="background: var(--bs-white);">
            <ol class="breadcrumb mb-2">
                <li class="breadcrumb-item"><a href="/"><span style="color: var(--bs-body-color); font-weight: 600;">Beranda</span></a></li>
                <li class="breadcrumb-item"><a href=""><span style="color: var(--bs-body-color);">Profile</span></a></li>
            </ol>
            <div class="col d-flex align-items-center">
                <!-- <router-link class="d-flex justify-content-center align-items-center me-3" to="/"><img src="@/assets/img/svg/chevron_left.svg"><span style="color: #AF9B43;">Kembali</span></router-link> -->
                <h4 class="align-items-center mb-0">Data Akun Register</h4>
            </div>
            <form ref="root" ></form>
            <div class="row mb-5">
                <div class="col d-flex flex-column align-items-center gap-3">
                    <!-- EMAIL ADDRESS -->
                    <div class="d-flex flex-column justify-content-center align-items-start w-100">
                        <span class="mb-1">Address Email</span>
                        <div class="input-group">
                            <input class="form-control p-2" type="email" style="font-size: 14px;" v-model="email">
                        </div>
                    </div>

                    <!-- KARTU IDENTITAS -->
                    <div class="dropdown w-100">
                        <span class="mb-1">Kartu Identitas</span>
                        <select class="form-select" aria-label="Default select example" v-model="kartu_identitas">
                            <option selected>Pilih Kartu Identitas</option>
                            <option value="0">Kartu Tanda Penduduk</option>
                            <option value="1">Surat Izin Mengemudi</option>
                            <option value="2">Passport</option>
                        </select>
                    </div>

                    <!-- NOMOR IDENTITAS -->
                    <div class="d-flex flex-column justify-content-center align-items-start w-100">
                        <span class="mb-1">Nomor Identitas</span>
                        <div class="input-group">
                            <input class="form-control p-2" type="text" style="font-size: 14px;" v-model="nomor_identitas">
                        </div>
                    </div>

                    <!-- Nama Lengkap -->
                    <div class="d-flex flex-column justify-content-center align-items-start w-100">
                        <span class="mb-1">Nama Lengkap</span>
                        <div class="input-group">
                            <input class="form-control p-2" type="text" style="font-size: 14px;" v-model="nama_lengkap">
                        </div>
                    </div>

                    <!-- NOMOR TELEPON -->
                    <div class="d-flex flex-column justify-content-center align-items-start w-100">
                        <span class="mb-1">Nomor Telepon</span>
                        <div class="input-group">
                            <input class="form-control p-2" type="text" style="font-size: 14px;" v-model="nomor_telpon">
                        </div>
                    </div>

                    <!-- ALAMAT -->
                    <div class="d-flex flex-column justify-content-center align-items-start w-100">
                        <span class="mb-1">Alamat</span>
                        <div class="input-group">
                            <input class="form-control p-2" type="text" style="font-size: 14px;" v-model="alamat">
                        </div>
                    </div>
                </div>
            </div>

            <!-- Button Simpan -->
            <div class="d-flex justify-content-center align-items-center gap-3 mb-5">
                <button class="btn btn-primary" style="background: var(--bs-primary); border: none; width: 100px;" @click="updateUser()">Simpan</button>
                <!-- <button class="btn btn-primary" style="background: var(--bs-primary); border: none; width: 100px;" @click="cancel">Batal</button> -->
            </div>
        </div>
    </body>
</template>

<script setup>
import { useLoading } from "vue-loading-overlay";
import { useToast } from "vue-toast-notification";
import api from "@/shared/services/api";
import { onMounted, ref } from "vue";
import cookie from "cookiejs";
import { useRouter } from "vue-router";

const $router = useRouter();

const email = ref("")
const kartu_identitas = ref("")
const nomor_identitas = ref("")
const nama_lengkap = ref("")
const nomor_telpon = ref("")
const alamat = ref("")
const id = localStorage.getItem('id')



const $loading = useLoading();


onMounted(() => {
    //get local storage value
    fetchUserDetail(id);
});

const fetchUserDetail = (id) => {
    const loader = $loading.show();
    api.get(import.meta.env.VITE_APP_RESTFUL_BASE_URL + "/users/" + id)
        .then((res) => {
            email.value = res.data.data[0].email;
            kartu_identitas.value = res.data.data[0].kartu_identitas;
            nomor_identitas.value = res.data.data[0].nomor_identitas;
            nama_lengkap.value = res.data.data[0].nama_lengkap;
            nomor_telpon.value = res.data.data[0].nomor_telpon;
            alamat.value = res.data.data[0].alamat;
        })
        .catch((err) => {
            
        })
        .finally(() => {
            loader.hide();
        });
}

function updateUser() {
   
    const regex = /^[^\s].*[^\s]$/;
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    //validation email
    if (!regexEmail.test(email.value)) {
        useToast().error("Email tidak valid", {
            position: "top"
        });
        return;
    }

    if (!regex.test(email.value)) {
        email.value = email.value.trim();
        useToast().error("Email tidak boleh kosong", {
            position: "top"
        });
        return;
    }
    if (!regex.test(nomor_identitas.value)) {
        nomor_identitas.value = nomor_identitas.value.trim();
        useToast().error("Nomor Identitas tidak boleh kosong", {
            position: "top"
        });
        return;
    }
    if (!regex.test(nama_lengkap.value)) {
        nama_lengkap.value = nama_lengkap.value.trim();
        useToast().error("Nama Lengkap tidak boleh kosong", {
            position: "top"
        });
        return;
    }
    if (!regex.test(nomor_telpon.value)) {
        nomor_telpon.value = nomor_telpon.value.trim();
        useToast().error("Nomor Telepon tidak boleh kosong", {
            position: "top"
        });
        return;
    }
    if (!regex.test(alamat.value)) {
        alamat.value = alamat.value.trim();
        useToast().error("Alamat tidak boleh kosong", {
            position: "top"
        });
        return;
    }

    const loader = $loading.show();
    api.put(import.meta.env.VITE_APP_RESTFUL_BASE_URL + "/users/" + id, {
        email: email.value,
        kartu_identitas: kartu_identitas.value,
        nomor_identitas: nomor_identitas.value,
        nama_lengkap: nama_lengkap.value,
        nomor_telpon: nomor_telpon.value,
        alamat: alamat.value,
    })
        .then((res) => {
            
            cookie.set(
                import.meta.env.VITE_APP_EMAILUSER,
                email.value
            );
            cookie.set(
                import.meta.env.VITE_APP_NAMAUSER,
                nama_lengkap.value
            );
            cookie.set(
                import.meta.env.VITE_APP_PHONEUSER,
                nomor_telpon.value
            );
            cookie.set(
                import.meta.env.VITE_APP_ALAMATUSER,
                alamat.value
            );
        })
        .then(() => {
            useToast().success("Berhasil mengubah data", {
                position: "top"
            });
            setTimeout(() => {
                $router.go(0);
            }, 1000);
        })
        .catch((err) => {
            useToast().error("Gagal mengubah data", {
                position: "top"
            });
            
        })
        .finally(() => {
            loader.hide();
        });
}

</script>