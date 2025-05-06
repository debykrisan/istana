<template>
	<div
		class="container-fluid d-flex flex-column gap-3 pt-5"
		style="background: var(--bs-white)"
	>
		<div class="row g-0 justify-content-center">
			<h2 class="text-center m-auto" style="flex: 1 1 auto">
				Registrasi Akun
			</h2>
			<a
				class="d-flex justify-content-center align-items-center invisible"
				href="#"
				><img src="@/assets/img/svg/chevron_left.svg" /><span
					style="color: #af9b43"
					>Kembali</span
				></a
			>
		</div>
		<div class="row g-0 d-flex justify-content-center">
			<div
				class="col-4 text-center d-flex justify-content-between align-items-center gap-2"
			>
				<div class="d-flex gap-2" style="opacity: 0.25">
					<div
						class="d-flex justify-content-center align-items-center"
						style="
							width: 24px;
							border-radius: 4px;
							height: 24px;
							border: 1px solid var(--bs-body-color);
						"
					>
						<span>1</span>
					</div>
					<span>Akun</span>
				</div>
				<div
					class="flex-fill"
					style="
						width: 10px;
						height: 1px;
						border-bottom-style: dotted;
					"
				></div>
				<div class="d-flex gap-2" style="opacity: 0.25">
					<div
						class="d-flex justify-content-center align-items-center"
						style="
							width: 24px;
							border-radius: 4px;
							height: 24px;
							border: 1px solid var(--bs-body-color);
						"
					>
						<span>2</span>
					</div>
					<span>Profil</span>
				</div>
				<div
					class="flex-fill"
					style="
						width: 10px;
						height: 1px;
						border-bottom-style: dotted;
					"
				></div>
				<div class="d-flex gap-2" style="opacity: 1">
					<div
						class="d-flex justify-content-center align-items-center"
						style="
							width: 24px;
							background: var(--bs-primary);
							border-radius: 4px;
							height: 24px;
						"
					>
						<span>3</span>
					</div>
					<span>Verifikasi</span>
				</div>
			</div>
		</div>
		<div class="row g-0 d-flex justify-content-center w-100">
			<div class="col-4 text-center d-flex flex-column gap-3">
				<div class="d-flex flex-column">
					<h3 class="mb-0" style="font-weight: 500">
						Kode Verifikasi
					</h3>
					<p class="mb-0">
						Masukkan kode verifikasi yang sudah dikirim ke<br />{{
							email
						}}<br />
					</p>
				</div>
				<div class="inputs row gx-2 px-2">
					<div
						id="otp"
						class="inputs d-flex flex-row justify-content-center mt-2"
					>
						<input
							data-index="0"
							oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
							class="m-2 text-center form-control rounded"
							type="text"
							maxlength="1"
							id="input-0"
							@input="focusNextOncePopulated($event, 1)"
							v-model="codeInput1"
						/>
						<input
							data-index="1"
							oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
							class="m-2 text-center form-control rounded"
							type="text"
							maxlength="1"
							id="input-1"
							@input="focusNextOncePopulated($event, 1)"
							v-model="codeInput2"
						/>
						<input
							data-index="2"
							oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
							class="m-2 text-center form-control rounded"
							type="text"
							maxlength="1"
							id="input-2"
							@input="focusNextOncePopulated($event, 1)"
							v-model="codeInput3"
						/>
						<input
							data-index="3"
							oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
							class="m-2 text-center form-control rounded"
							type="text"
							maxlength="1"
							id="input-3"
							@input="focusNextOncePopulated($event, 1)"
							v-model="codeInput4"
						/>
						<input
							data-index="4"
							oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
							class="m-2 text-center form-control rounded"
							type="text"
							maxlength="1"
							id="input-4"
							@input="focusNextOncePopulated($event, 1)"
							v-model="codeInput5"
						/>
						<input
							data-index="5"
							oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
							class="m-2 text-center form-control rounded"
							type="text"
							maxlength="1"
							id="input-5"
							@input="focusNextOncePopulated($event, 1)"
							v-model="codeInput6"
						/>
					</div>
				</div>
				<div>
					<span class="me-1">Belum mendapatkan kode?</span
					><a @click="kirimUlangCode()" style="color: #af9b43"
						><span style="text-decoration: underline"
							>Kirim ulang kode</span
						></a
					>
				</div>
			</div>
		</div>
		<div class="row g-0 justify-content-center">
			<div class="col-4">
				<button
					class="btn btn-primary d-flex justify-content-center align-items-center p-2 w-100 mb-2"
					type="submit"
					@click="onSubmit()"
					style="
						background: var(--bs-primary);
						color: var(--bs-body-color);
						border-style: none;
					"
				>
					<span class="me-1" style="font-weight: 600"
						>Verifikasi</span
					>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import cookie from "cookiejs";
import api from "@/shared/services/api";
import { useToast } from "vue-toast-notification";
import { useRouter } from "vue-router";
import { useLoading } from "vue-loading-overlay";

let submitStatus = null;
const $loading = useLoading();
const $router = useRouter();
const email = ref(cookie.get(import.meta.env.VITE_APP_EMAILUSER));
const nama = ref(cookie.get(import.meta.env.VITE_APP_NAMAUSER));
const alamat = ref("");
const phone = ref("");
const maxLength = ref(1);
const codeInput1 = ref();
const codeInput2 = ref();
const codeInput3 = ref();
const codeInput4 = ref();
const codeInput5 = ref();
const codeInput6 = ref();

onMounted(() => {
    if (email.value == null || email.value == '') {
		email.value = cookie.get('emailVerifikasi');
	}
	if (nama.value == null || nama.value == '') {
		nama.value = cookie.get('namaVerifikasi');
	}
});

const kirimUlangCode = async () => {
    let paramForm = {
        email: email.value,
        nama_lengkap: nama.value
    }
    submitStatus = 'PENDING'

    let loader = $loading.show({
      container: false,
      canCancel: true
    });

    let url = import.meta.env.VITE_APP_RESTFUL_BASE_URL + '/users/kirim-ulang-kode';
    api.post(url, paramForm)
        .then((response) => {
          if (response.data.data <= 0) {
            useToast().error(response.data.pesan, {
              position: "top"
            });
          } else {
            useToast().success(response.data.pesan, {
              position: "top"
            });
          }
        })
        .catch((error) => {
          
          useToast().error(error.message, {
            position: "top"
          });
        }).finally(() => {
            loader.hide();
            submitStatus = 'OK'
        })
}

const focusNextOncePopulated = (event, max) => {
	
	if (event.target.value.length === max) {
		const nextElement = document.getElementById(`input-${Number(event.target.dataset.index) + 1}`);
		if (nextElement) nextElement.focus();
	}

	if (event.target.value.length == 0) {
		const prevElement = document.getElementById(`input-${Number(event.target.dataset.index) - 1}`);
		if (prevElement) prevElement.focus();
	}
}

const onSubmit = async () => {
	let codeVerification = [
		codeInput1.value,
		codeInput2.value,
		codeInput3.value,
		codeInput4.value,
		codeInput5.value,
		codeInput6.value,
	];
	submitStatus = "PENDING";

	let loader = $loading.show({
		container: false,
		canCancel: true,
	});
	let paramForm = {
		finalCode: codeVerification.join(""),
		email: email.value,
	};
	let url = import.meta.env.VITE_APP_RESTFUL_BASE_URL + "/users/verifikasi";
	api.post(url, paramForm)
		.then((response) => {
			if (response.data.data == 0) {
				useToast().error(response.data.pesan, {
					position: "top",
				});
			} else {
				useToast().success(response.data.pesan, {
					position: "top",
				});
				cookie.remove('emailVerifikasi');
				cookie.remove('namaVerifikasi');
				$router.push({path: '/login' })
			}
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
};
</script>

<style>
/* .height-100 {
    height: 100vh
}

.card {
    width: 400px;
    border: none;
    height: 300px;
    box-shadow: 0px 5px 20px 0px #d2dae3;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center
}

.card h6 {
    color: red;
    font-size: 20px
}

.inputs input {
    width: 40px;
    height: 40px
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0
}

.card-2 {
    background-color: #fff;
    padding: 10px;
    width: 350px;
    height: 100px;
    bottom: -50px;
    left: 20px;
    position: absolute;
    border-radius: 5px
}

.card-2 .content {
    margin-top: 50px
}

.card-2 .content a {
    color: red
}

.form-control:focus {
    box-shadow: none;
    border: 2px solid red
}

.validate {
    border-radius: 20px;
    height: 40px;
    background-color: red;
    border: 1px solid red;
    width: 140px
} */
</style>
