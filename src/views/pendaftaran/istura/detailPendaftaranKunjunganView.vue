<template>
    <body style="--bs-primary: #E1CD75;--bs-primary-rgb: 225,205,117;background: var(--bs-body-bg);--bs-body-color: #151515;">
        <div class="container d-flex flex-column pt-4" style="background: var(--bs-white);">
            <ol class="breadcrumb mb-2">
                <li class="breadcrumb-item"><a href="#"><span style="color: var(--bs-body-color); font-weight: 600;">Beranda</span></a></li>
                <li class="breadcrumb-item"><a href="#"><span style="color: var(--bs-body-color);">Pendaftaran</span></a></li>
                <li class="breadcrumb-item"><a href="#"><span style="color: var(--bs-body-color);">Detail Pendaftaran Istura</span></a></li>
            </ol>
            <div class="col d-flex align-items-center">
                <router-link class="d-flex justify-content-center align-items-center me-3" to="/pendaftaran/kunjungan"><img src="@/assets/img/svg/chevron_left.svg"><span style="color: #AF9B43;">Kembali</span></router-link>
                <h4 class="align-items-center mb-0">Detail Pendaftaran Istura</h4>
            </div>
            <form ref="root" @submit.prevent="onSumbit"></form>
            <div class="row mb-5">
                <div class="col d-flex flex-column align-items-center gap-3">
                    <!-- ISTANA KEPRESIDENAN -->
                    <div class="d-flex flex-column justify-content-center align-items-start w-100">
                        <span class="mb-1">Istana Kepresidenan</span>
                        <div class="input-group">
                            <input class="form-control p-2" type="text" style="font-size: 14px;" v-model="istana" readonly>
                        </div>
                    </div>

                    <!-- NAMA ROMBONGAN -->
                    <div class="d-flex flex-column justify-content-center align-items-start w-100">
                        <span class="mb-1">Nama Rombongan</span>
                        <div class="input-group">
                            <input class="form-control p-2" type="text" style="font-size: 14px;" v-model="rombongan" readonly>
                        </div>
                    </div>

                    <!-- NAMA PENANGGUNG JAWAB -->
                    <div class="d-flex flex-column justify-content-center align-items-start w-100">
                        <span class="mb-1">Nama Penanggung Jawab</span>
                        <div class="input-group">
                            <input class="form-control p-2" type="text" style="font-size: 14px;" v-model="namaPJ" readonly>
                        </div>
                    </div>

                    <!-- TELEPON PENANGGUNG JAWAB -->
                    <div class="d-flex flex-column justify-content-center align-items-start w-100">
                        <span class="mb-1">No. Telepon Penanggung Jawab</span>
                        <div class="input-group">
                            <input class="form-control p-2" type="text" style="font-size: 14px;" v-model="telpPJ" readonly>
                        </div>
                    </div>

                    <!-- KATEGORI ROMBONGAN -->
                    <div class="d-flex flex-column justify-content-center align-items-start w-100">
                        <span class="mb-1">Kategori Rombongan</span>
                        <div class="input-group">
                            <input class="form-control p-2" type="text" style="font-size: 14px;" v-model="kategoriRombongan" readonly>
                        </div>
                    </div>

                    <!-- TANGGAL KUNJUNGAN -->
                    <div class="d-flex flex-column justify-content-center align-items-start w-100">
                        <span class="mb-1">Tanggal Kunjungan</span>
                        <div class="input-group">
                            <input class="form-control p-2" type="text" style="font-size: 14px;" v-model="tglKunjungan" readonly>
                        </div>
                    </div>
                </div>
                <div class="col d-flex flex-column justify-content-start align-items-center gap-3">

                    <!-- JAM KUNJUNGAN -->
                    <div class="d-flex flex-column justify-content-center align-items-start w-100">
                        <span class="mb-1">Jam Kunjungan</span>
                        <div class="input-group">
                            <input class="form-control p-2" type="text" style="font-size: 14px;" v-model="jamKunjungan" readonly>
                        </div>
                    </div>

                    <!-- JUMLAH PESERTA -->
                    <div class="d-flex flex-column justify-content-center align-items-start w-100">
                        <span class="mb-1">Jumlah Peserta</span>
                        <div class="input-group">
                            <input class="form-control p-2" type="text" style="font-size: 14px;" v-model="jumlahPeserta" readonly>
                        </div>
                    </div>

                    <!-- UPLOAD DAFTAR PESERTA -->
                    <div class="d-flex flex-column justify-content-center align-items-start w-100">
                        <span class="mb-1">File Daftar Peserta</span>
                        <div class="input-group">
                            <input class="form-control p-2" type="text" style="font-size: 14px;" v-model="namaFileDaftarPeserta" readonly>
                            <a :href="fileDaftarpeserta">
                                <button class="form-control">
                                    Lihat File
                                </button>
                            </a>
                        </div>
                    </div>

                    <!-- NO SURAT PERMOHONAN -->
                    <div class="d-flex flex-column justify-content-center align-items-start w-100">
                        <span class="mb-1">No. Surat Permohonan</span>
                        <div class="input-group">
                            <input class="form-control p-2" type="text" style="font-size: 14px;" v-model="noSurat" readonly>
                        </div>
                    </div>

                    <!-- TANGGAL SURAT PERMOHONAN -->
                    <div class="d-flex flex-column justify-content-center align-items-start w-100">
                        <span class="mb-1">Tanggal Surat Permohonan Kunjungan</span>
                        <div class="input-group">
                            <input class="form-control p-2" type="text" style="font-size: 14px;" v-model="tglSurat" readonly>
                        </div>
                    </div>

                    <!-- UPLOAD SURAT PERMOHONAN -->
                    <div class="d-flex flex-column justify-content-center align-items-start w-100">
                        <span class="mb-1">File Surat Permohonan</span>
                        <div class="input-group">
                            <input class="form-control p-2" type="text" style="font-size: 14px;" v-model="namaFileSurat" readonly>
                            <a :href="fileSurat">
                                <button class="form-control">
                                    Lihat File
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </body>
    
</template>

<script setup>
import api from '@/shared/services/api';
import {onMounted, ref } from "vue";
import { useLoading } from 'vue-loading-overlay';
import { useRoute } from 'vue-router';

const $route = useRoute();
const $loading = useLoading();

const id = ref('');

const istana = ref('');
const rombongan = ref('');
const namaPJ = ref('');
const telpPJ = ref('');
const kategoriRombongan = ref('');
const tglKunjungan = ref('');
const jamKunjungan = ref('');
const jumlahPeserta = ref('');
const fileDaftarpeserta = ref('');
const namaFileDaftarPeserta = ref('');
const noSurat = ref('');
const tglSurat = ref('');
const fileSurat = ref('');
const namaFileSurat = ref('');

onMounted(async () => {
    id.value = $route.params.id;
    fetchGroup(id.value)
});

const fetchGroup = (id) => {
    const loader = $loading.show();
    api.get(import.meta.env.VITE_APP_RESTFUL_BASE_URL + '/istura/getbyid/' + id)
        .then((response) => {
            
            let dt = response.data.data[0]
            istana.value = dt.nama_istana;
            rombongan.value = dt.rombongan;
            namaPJ.value = dt.penanggung_jawab;
            telpPJ.value = dt.telpon;
            jamKunjungan.value = dt.jam_kedatangan;
            jumlahPeserta.value = dt.jumlah_peserta;
            noSurat.value = dt.no_permohonan;
            fileSurat.value = dt.file_surat_permohonan;
            namaFileSurat.value = dt.nama_file_surat_permohonan;
            fileDaftarpeserta.value = dt.file_peserta;
            namaFileDaftarPeserta.value = dt.nama_file_peserta;
            
            const options = { day: 'numeric', month: 'long', year: 'numeric' }
            let tglKunjunganTemp = dt.tanggal_kedatangan;
            let tglSuratTemp = dt.tanggal_surat;
            tglKunjungan.value = new Date(tglKunjunganTemp).toLocaleDateString('id-ID', options);
            tglSurat.value = new Date(tglSuratTemp).toLocaleDateString('id-ID', options);


            switch (dt.kategori) {
                case 0:
                    kategoriRombongan.value = "Umum";
                    break;
                case 1:
                    kategoriRombongan.value = "Mahasiswa / Pelajar";
                    break;
                case 2:
                    kategoriRombongan.value = "Asing";
                    break;
                default:
                    kategoriRombongan.value = "Umum";
                    break;
            }

            
        }).finally(() => {
            loader.hide();
        })
}
</script>