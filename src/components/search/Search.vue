<template>
    <div class="bg-white container-md">
        <div class="p-5">
            <div class="row ">
                <div class="col-4 border-end border-2 pe-5">
                    <div class="pt-4">
                        <h6>PENCARIAN SPESIFIK</h6>
                        <hr>
                        <form @submit.prevent="search">
                            <div class="d-flex flex-column justify-content-center align-items-start w-100 mt-4">
                                <span class="mb-1" style="font-size: 13px;">Kata Kunci</span>
                                <div class="input-group">
                                    <input class="form-control" type="text" style="font-size: 14px" v-model="searchQuery" />
                                </div>
                            </div>

                            <div class="dropdown w-100 mt-4">
                                <span class="mb-1" style="font-size: 13px;">Kanal</span>
                                <select class="dropdown-toggle d-flex justify-content-between align-items-center w-100 p-2"
                                    v-model="kanal" aria-expanded="false" data-bs-toggle="dropdown"
                                    style="background: transparent; border-radius: 4px; border: 1px solid #ced4da; font-size: 14px;">
                                    <option value="">Semua Kanal</option>
                                    <option value="berita">Artikel</option>
                                    <option value="foto">Foto</option>
                                    <option value="video">Video</option>
                                    <option value="serba-serbi">Serba-Serbi</option>
                                </select>
                            </div>

                            <div class="dropdown w-100 mt-4">
                                <span class="mb-1" style="font-size: 13px;">Istana Kepresidenan</span>
                                <select class="dropdown-toggle d-flex justify-content-between align-items-center w-100 p-2"
                                    v-model="istanaSelected" aria-expanded="false" data-bs-toggle="dropdown"
                                    style="background: transparent; border-radius: 4px; border: 1px solid #ced4da; font-size: 14px;">
                                    <option v-if="!loadIstana" value="">Semua Istana</option>
                                    <option v-for="item in istana" :key="item.id" :value="item.id">
                                        {{ item.nama_istana }}
                                    </option>
                                    <option v-if="loadIstana" disabled>Memuat Istana...</option>
                                </select>
                            </div>

                            <div
                                class="d-flex flex-column justify-content-center align-items-start w-100 mt-4"
                            >
                                <span class="mb-1" style="font-size: 13px;">Tanggal Publikasi</span>
                                <div class="input-group">
                                    <Datepicker
                                        v-model="tanggalPublikasi"
                                        format="yyyy-MM-dd"
                                        class="form-control p-0 border-0"
                                        placeholder="Pilih tanggal"
                                        auto-apply
                                        :enable-time-picker="false"
                                        max-date="new Date()"
                                    />
                                </div>
                            </div>

                            <button
                                class="btn btn-primary d-flex justify-content-center align-items-center p-2 w-100 mb-3 mt-5"
                                type="submit"
                                style="
                                    background: var(--bs-primary);
                                    color: var(--bs-body-color);
                                    border-style: none;
                                "
                            >
                                <span class="me-1" style="font-weight: 600">Cari</span>
                            </button>
                        </form>
                    </div>
                </div>
                <div class="col-8">
                    <div class="ps-2 pe-3 vertical-scrollable">
                        <div class="ms-3 pt-4">
                            <h6 class="text-truncate">HASIL PENCARIAN SPESIFIK UNTUK "{{ kataCari }}" </h6>
                            <hr>
                        </div>
                        <div v-if="!loadResult">
                            <div v-if="result.length > 0">
                                <div class="ms-3" v-for="(data, index) in result">
                                    <div class="mt-4">
                                        <div class="row">
                                            <router-link
                                                v-if="data.kategori.toLowerCase() == 'berita'"
                                                :to="{
                                                    name: 'berita',
                                                    params: { 
                                                        id: data.id,
                                                        idIstana: data.id_istana 
                                                    },
                                                }"
                                                class="text-decoration-none text-dark fw-bold text-truncate pb-2"
                                                style="letter-spacing: 0.02em;"
                                            >
                                                {{ data.judul }}
                                            </router-link>
                                            <router-link
                                                v-if="data.kategori.toLowerCase() == 'foto'"
                                                :to="{
                                                    name: 'foto',
                                                    params: { 
                                                        id: data.id 
                                                    },
                                                }"
                                                class="text-decoration-none text-dark fw-bold text-truncate pb-2"
                                                style="letter-spacing: 0.02em;"
                                            >
                                                {{ data.judul }}
                                            </router-link>
                                            <router-link
                                                v-if="data.kategori.toLowerCase() == 'video'"
                                                :to="{
                                                    name: 'video',
                                                    params: { 
                                                        id: data.id 
                                                    },
                                                }"
                                                class="text-decoration-none text-dark fw-bold text-truncate pb-2"
                                                style="letter-spacing: 0.02em;"
                                            >
                                                {{ data.judul }}
                                            </router-link>
                                            <router-link
                                                v-if="data.kategori.toLowerCase() == 'serba-serbi'"
                                                :to="{
                                                    name: 'bangunan',
                                                    params: { 
                                                        id: data.id,
                                                        idIstana: data.id_istana 
                                                    },
                                                }"
                                                class="text-decoration-none text-dark fw-bold text-truncate pb-2"
                                                style="letter-spacing: 0.02em;"
                                            >
                                                {{ data.judul }}
                                            </router-link>
                                        </div>
                                        <div class="row">
                                            <p style="font-size: 12px; color: #878c91;">{{ data.tanggal_publikasi }}&nbsp;&nbsp;|&nbsp;
                                                <router-link
                                                    v-if="data.kategori.toLowerCase() == 'berita'" 
                                                    :to="{
                                                        name: 'semuaBerita'
                                                    }"
                                                    class="text-decoration-none pb-2 kategori-router"
                                                >
                                                    {{ data.kategori }}
                                                </router-link>
                                                <router-link
                                                    v-if="data.kategori.toLowerCase() == 'foto'" 
                                                    :to="{
                                                        name: 'semuaFoto'
                                                    }"
                                                    class="text-decoration-none pb-2 kategori-router"
                                                >
                                                    {{ data.kategori }}
                                                </router-link>
                                                <router-link
                                                    v-if="data.kategori.toLowerCase() == 'video'" 
                                                    :to="{
                                                        name: 'semuaVideo'
                                                    }"
                                                    class="text-decoration-none pb-2 kategori-router"
                                                >
                                                    {{ data.kategori }}
                                                </router-link>
                                                <router-link
                                                    v-if="data.kategori.toLowerCase() == 'serba-serbi'" 
                                                    :to="{
                                                        name: 'bangunanSemua',
                                                        params: { 
                                                            id: data.id_istana 
                                                        },
                                                    }"
                                                    class="text-decoration-none pb-2 kategori-router"
                                                >
                                                    {{ data.kategori }}
                                                </router-link>
                                            </p>
                                        </div>
                                    </div>
                                    <hr>
                                </div>
                            </div>
                            <div class="ms-3" v-else>
                                Tidak Ada Data
                            </div>
                            <div v-if="loadMoreResult">
                                <div class="loader-container">
                                    <div class="loader"></div>
                                </div>
                            </div>
                            <div v-else-if="totalLength > result.length">
                                <button
                                    ref="muatLagiButton"
                                    class="btn btn-primary muat-lagi-button d-flex justify-content-center align-items-center p-2 w-100 mb-3 mt-5"
                                    type="button"
                                    @click.prevent="muatLagi"
                                >
                                    <span class="me-1" style="font-weight: 600">Muat Lagi</span>
                                </button>
                            </div>
                            <div v-else></div> 
                        </div>
                        <div v-else>
                            <div class="loader-container">
                                <div class="loader"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onUpdated, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
import api from "@/shared/services/api";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import dayjs from "dayjs";

const $router = useRouter();
const toast = useToast();

const searchQuery = ref($router.currentRoute.value.query.q);
const kataCari = ref($router.currentRoute.value.query.q);
const kanal = ref("");
const istana = ref([]);
const istanaSelected = ref("");
const tanggalPublikasi = ref("");

const result = ref([]);

const limit = ref(10);
const offset = ref(0);
const totalLength = ref(0);

const loadResult = ref(false);
const loadMoreResult = ref(false);
const loadIstana = ref(false);

const getIstana = () => {
    loadIstana.value = true;
	api.get(
		import.meta.env.VITE_APP_RESTFUL_BASE_URL + "/istana/get-id-nama-istana"
	)
    .then((response) => {
        istana.value = response.data.data; 
    })
    .catch(function (error) {
        console.log(error);
        toast.error("Error loading Istana Kepresidenan");
    }).finally(() => {
        loadIstana.value = false;
    })
}; 

const search = () => {
    result.value = [];
    offset.value = 0;
    
    if (tanggalPublikasi.value) {
        tanggalPublikasi.value = dayjs(tanggalPublikasi.value).format("YYYY-MM-DD");
    }
    
    if (searchQuery.value || kanal.value || istanaSelected.value || tanggalPublikasi.value) {
        const queryObject = {};
        
        if (searchQuery.value) queryObject.q = searchQuery.value;
        if (kanal.value) queryObject.kanal = kanal.value;
        if (istanaSelected.value) queryObject.istana = istanaSelected.value;
        if (tanggalPublikasi.value) queryObject.tanggal = tanggalPublikasi.value;

        $router.push({ query: queryObject });
        
        queryObject.limit = limit.value;
        queryObject.offset = offset.value;

        loadResult.value = true;
        api.post(
            import.meta.env.VITE_APP_RESTFUL_BASE_URL + "/search",
            queryObject
        ).then((response) => {
            let data = response.data.data;
            result.value = data;
            totalLength.value = response.data.totalLength;
        }).finally(() => {
            loadResult.value = false;
        })
        .catch(function (error) {
            loadResult.value = false;
            console.log(error);
        });
    } else {
        console.log("No search parameters provided");
    }
};

const muatLagi = () => {
    offset.value += limit.value;
    
    if (tanggalPublikasi.value) {
        tanggalPublikasi.value = dayjs(tanggalPublikasi.value).format("YYYY-MM-DD");
    }
    
    if (searchQuery.value || kanal.value || istanaSelected.value || tanggalPublikasi.value) {
        const queryObject = {};
        
        if (searchQuery.value) queryObject.q = searchQuery.value;
        if (kanal.value) queryObject.kanal = kanal.value;
        if (istanaSelected.value) queryObject.istana = istanaSelected.value;
        if (tanggalPublikasi.value) queryObject.tanggal = tanggalPublikasi.value;
        
        queryObject.limit = limit.value;
        queryObject.offset = offset.value;

        loadMoreResult.value = true;
        api.post(
            import.meta.env.VITE_APP_RESTFUL_BASE_URL + "/search",
            queryObject
        ).then((response) => {
            let data = response.data.data;
            result.value.push(...data);
            totalLength.value = response.data.totalLength;
        }).finally(() => {
            loadMoreResult.value = false;
        })
        .catch(function (error) {
            loadMoreResult.value = false;
            console.log(error);
        });
    } else {
        console.log("No search parameters provided");
    }
};

onMounted(() => {
    search();
    getIstana();
});

watch(() => $router.currentRoute.value.query.q, (newQuery, oldQuery) => {
    searchQuery.value = newQuery;
    kataCari.value = newQuery;
    search();
});
</script>
<style scoped>
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px; /* Adjust the height to make it bigger */
}
/* Spinner animation */
.loader {
	border: 4px solid rgba(255, 255, 255, 0.3);
	border-radius: 50%;
	border-top: 4px solid var(--bs-primary);
	width: 50px;
	height: 50px;
	animation: spin 1s linear infinite;
}

/* Spinner animation keyframes */
@keyframes spin {
	0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
}

.muat-lagi-button {
    background: var(--bs-body-background);
    color: var(--bs-primary);
    border: 1px solid var(--bs-primary);
}

.muat-lagi-button:hover {
    background: var(--bs-primary);
    color: rgb(0, 0, 0);
}

.kategori-router {
    color: #878c91;
}
.kategori-router:hover {
    color: var(--bs-primary);
}

.vertical-scrollable {
    max-height: 500px; /* Set a maximum height for the scrollable div */
    overflow-y: auto; /* Enable vertical scrolling */
    overflow-x: hidden; /* Disable horizontal scrolling */
}

.vertical-scrollable::-webkit-scrollbar {
    width: 5px; /* Adjust the width of the scrollbar */
}

.vertical-scrollable::-webkit-scrollbar-thumb {
    background-color: rgb(167, 160, 160); /* Set the color of the scrollbar thumb */
    border-radius: 5px; /* Set the border radius of the scrollbar thumb */
}
</style>
