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
            v-if="isValid"
			class="container d-flex flex-column pt-4"
			style="background: var(--bs-white)"
		>
            <div class="d-flex align-items-center justify-content-center mt-4 mb-2">
                <h6 class="fw-bold mb-0 text-center" style="color: #895700">
                    Kuisioner Pengunjung Istana Kepresidenan <br> {{ dataIstura.nama_istana }}
                </h6>
            </div>
			<div
				class="d-flex justify-content-between align-items-start px-3 py-2 mb-3"
				style="border-radius: 5px; border: 1px solid #d9d9d9"
			>
				<div>
                    <h4>Data Istura</h4>
					<ul class="list-unstyled">
						<li>Penanggung Jawab: {{ dataIstura.penanggung_jawab }}</li>
						<li>Nama Rombongan: {{ dataIstura.rombongan }}</li>
					</ul>
				</div>
				<div>
                    <ul class="list-unstyled mt-4">
						<li>Tanggal Kunjungan: {{ dataIstura.tanggal_kedatangan }}</li>
						<li>Jam Kunjungan: {{ dataIstura.jam_kedatangan }}</li>
					</ul>
				</div>
			</div>
			<div class="row mb-5">
                <div 
                    class="d-flex flex-column justify-content-center align-items-start w-100 mb-5"
                    v-for="(pertanyaan, index) in kuisioner.slice(startIndex, endIndex)" :key="pertanyaan.id">
                    <span class="mb-1">{{ startIndex + index + 1 }}. {{ pertanyaan.pertanyaan }}</span>

                    <div class="input-group" v-if="pertanyaan.opsi_jawaban === 1">
                        <div class="form-check form-check-inline">
                            <input v-model="jawaban[startIndex + index]" value="1" type="radio" class="form-check-input" />
                            <label class="form-check-label">Ya</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input v-model="jawaban[startIndex + index]" value="2" type="radio" class="form-check-input" />
                            <label class="form-check-label">Tidak</label>
                        </div>
                    </div>

                    <div class="input-group" v-if="pertanyaan.opsi_jawaban === 2">
                        <div class="form-check form-check-inline">
                            <input v-model="jawaban[startIndex + index]" value="1" type="radio" class="form-check-input" />
                            <label class="form-check-label">Ya</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input v-model="jawaban[startIndex + index]" value="2" type="radio" class="form-check-input" />
                            <label class="form-check-label">Tidak</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input v-model="jawaban[startIndex + index]" value="3" type="radio" class="form-check-input" />
                            <label class="form-check-label">Lainnya</label>
                        </div>
                        <div class="form-group">
                            <input v-if="jawaban[startIndex + index] === '3'" type="text" class="form-control" v-model="jawabanText[startIndex + index]">
                        </div>
                    </div>

                    <div class="input-group" v-if="pertanyaan.opsi_jawaban === 3">
                        <input type="text" class="form-control" v-model="jawabanText[startIndex + index]">
                    </div>
                </div>

                <div
                    v-if="endIndex >= kuisioner.length"
                    class="d-flex flex-column justify-content-center align-items-start w-100"
                >
                    <span class="mb-1">Kritik dan Saran</span>
                    <div class="input-group">
                        <input
                            class="form-control p-2"
                            type="textarea"
                            v-model="kritikSaran"
                            style="font-size: 14px"
                        />
                    </div>
                </div>
			</div>

            <div class="col-4 mx-auto d-flex flex-row justify-content-between">
                <button 
                    class="btn btn-primary d-flex justify-content-center align-items-center p-2 w-100 mb-2"
                    type="submit"
                    style="background: var(--bs-primary); color: var(--bs-body-color); border-style: none;"
                    @click="backPage()"
                >
                    <span class="me-1" style="font-weight: 600">Kembali</span>
                </button>
                <button class="btn btn-primary d-flex justify-content-center align-items-center p-2 w-100 mb-2 ms-2"
                    type="submit"
                    style="background: var(--bs-primary); color: var(--bs-body-color); border-style: none;"
                    @click="submit()"
                    v-if="endIndex >= kuisioner.length"
                >
                    <span class="me-1" style="font-weight: 600">Simpan</span>
                </button>
                <button class="btn btn-primary d-flex justify-content-center align-items-center p-2 w-100 mb-2 ms-2"
                    type="submit"
                    style="background: var(--bs-primary); color: var(--bs-body-color); border-style: none;"
                    @click="nextPage()"
                    v-else
                >
                    <span class="me-1" style="font-weight: 600">Selanjutnya</span>
                </button>
            </div>
		</div>
        <div v-else-if="!isValid && isFilled"
            class="container d-flex flex-column pt-4"
			style="background: var(--bs-white)"
        >
            <div class="d-flex align-items-center justify-content-center mt-4 mb-2">
                <h6 class="fw-bold mb-0 text-center" style="color: #895700">
                    Kuisioner Pengunjung Istana Kepresidenan
                </h6>
            </div>
			<div
				class="d-flex justify-content-between align-items-start px-3 py-2 mb-3"
				style="border-radius: 5px; border: 1px solid #d9d9d9"
			>
                <div class="px-3 py-2 mb-2">
                    <h2 class="fw-bold mb-3">
                        Terima Kasih
                    </h2>
                    <p>Terima kasih telah mengisi kuisioner ini, jawaban anda sudah kami terima.</p>
                </div>
			</div>
            
        </div>
        <div v-else-if="!isValid && !isFilled"
            class="container d-flex flex-column pt-4"
			style="background: var(--bs-white)"
        >
            <div class="d-flex align-items-center justify-content-center mt-4 mb-2">
                <h6 class="fw-bold mb-0 text-center" style="color: #895700">
                    Kuisioner Pengunjung Istana Kepresidenan
                </h6>
            </div>
			<div
				class="d-flex justify-content-between align-items-start px-3 py-2 mb-3"
				style="border-radius: 5px; border: 1px solid #d9d9d9"
			>
                <div class="px-3 py-2 mb-2">
                    <h2 class="fw-bold mb-3">
                        Link Tidak Valid
                    </h2>
                    <p>Maaf, Link yang anda gunakan sudah kedaluwarsa atau tidak valid.</p>
                </div>
			</div>
            
        </div>
	</body>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useToast } from "vue-toast-notification";
import api from "@/shared/services/api";
import { useRoute, useRouter } from "vue-router";
import { useLoading } from "vue-loading-overlay";

const $route = useRoute();
const $router = useRouter();
const $loading = useLoading();

const kuisioner = ref([]);
const jawaban = ref([]);
const jawabanText = ref([]);
const kritikSaran = ref('');
const dataIstura = ref('');
const idIstura = ref('');
const token = $route.params.token;
const isValid = ref(true);
const isFilled = ref(false);

const lastIndex = ref(kuisioner.length - 1);
const startIndex = ref(0);
const endIndex = ref(4);

const nextPage = () => {
    const last = kuisioner.value.length - 1;

    if (last < endIndex.value) {
        return;
    } else {
        startIndex.value += 4;
        endIndex.value += 4;
    }
}

const backPage = () => {
    if(startIndex.value === 0) {
        return;
    } else {
        startIndex.value -= 4
        endIndex.value -= 4
    }
}

onMounted(() => {
    validateToken($route.params.token)
})

const validateToken = async (token) => {
    const loader = $loading.show()
	try {
		const response = await api.get(import.meta.env.VITE_APP_RESTFUL_BASE_URL + `/kuisioner/validate/${token}`)
        
        if (response.data.kode == 5) {
            isValid.value = false;
            isFilled.value = true;
        } else {
            getPertanyaan(response.data.id_istana, response.data.id_istura);
            idIstura.value = response.data.id_istura;
            isValid.value = true;
        }
	} catch (error) {
        if (error.response.data.status === 'invalid') {
            isValid.value = false;
        }
        return
	} finally {
		loader.hide()
	}
}

const getPertanyaan = async (idIstana, idIstura) => {
    const loader = $loading.show()
	try {
		const response = await api.get(import.meta.env.VITE_APP_RESTFUL_BASE_URL + `/kuisioner/get-pertanyaan/${idIstana}/${idIstura}`)
        kuisioner.value = response.data.data
        dataIstura.value = response.data.istura[0]
	} finally {
		loader.hide()
	}
}

const submit = async () => {
    console.log(kritikSaran.value)
    let data = []
    var isComplete = true;

    for (let i = 0; i < kuisioner.value.length; i++) {
        data.push({
            idIstura: idIstura.value,
            idPertanyaan: kuisioner.value[i].id,
            jawaban: kuisioner.value[i].opsi_jawaban == 3 ? 3 : jawaban.value[i],
            jawabanText: jawabanText.value[i] !== undefined ? jawabanText.value[i] : null
        })
    }

    for (let i = 0; i < data.length; i++) {
        if (data[i].jawaban === undefined) {
            isComplete = false
        }
        if (data[i].jawaban === "3" && data[i].jawabanText === undefined) {
            isComplete = false
        }
    }

    if (!kritikSaran.value || kritikSaran.value.trim() === '') {
        isComplete = false
    }

    if (!isComplete) {
        useToast().error("Isi semua jawaban dengan benar", {
            position: "top",
        });
    } else {
        const loader = $loading.show()
        let paramForm = {
            pertanyaan: data,
            kritikSaran: kritikSaran.value
        }
        
        api.post(import.meta.env.VITE_APP_RESTFUL_BASE_URL + `/kuisioner/submit`, paramForm)
		.then((response) => {
			useToast().success(response.data.pesan, {
				position: "top",
			});
		})
		.catch((error) => {
            
			useToast().error(error, {
				position: "top",
			});
		})
		.finally(() => {
			loader.hide()
            isValid.value = false
            isFilled.value = true
		})
    }
    
}



</script>