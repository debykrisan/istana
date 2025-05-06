<template>
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<div class="well well-sm" style="background-color: #ffffff">
					<div class="col-sm-10 col-lg-12 p-3">
						<h4 class="h3 mt-2">Kontak Kami</h4>
					</div>
					<form @submit.prevent="onSubmit()">
						<div class="row p-3">
							<div class="col-md-6">
								<div class="form-group mb-3">
									<input
										type="text"
										class="form-control"
										id="name"
										placeholder="Nama"
										v-model="nama"
									/>
								</div>
								<div class="form-group mb-3">
									<div class="input-group">
										<input
											type="email"
											class="form-control"
											id="email"
											placeholder="Email"
											v-model="email"
										/>
									</div>
								</div>
								<div class="form-group">
									<textarea
										name="message"
										id="message"
										class="form-control"
										rows="6"
										cols="20"
										v-model="pesan"
										placeholder="Pesan"
									></textarea>
								</div>
								<div
									class="d-flex justify-content-end align-items-end mt-3"
								>
									<button
										type="submit"
										class="btn btn-primary"
										id="btnContactUs"
										style="
											background-color: #d7be4b;
											color: black;
										"
									>
										Kirim
									</button>
								</div>
							</div>
							<div class="col-md-6" style="margin-top: 2px">
								<div
									style="
										background-color: #f1f1f1;
										padding: 10px;
                                        height: 260px;
									"
								>

                                
									<div class="contact-info justify-align-center">
										<p
											class="text-muted"
											style="margin-top: 60px"
										>
											<strong>Jl. Veteran No. 16 ,</strong>
										</p>
										<p
											class="text-muted"
											style="margin-top: -10px"
										>
											<strong>Jakarta Pusat 10110</strong>
										</p>
										<p
											class="text-muted"
											style="margin-top: -10px"
										>
											<strong>Telp. 021-23545001</strong>
										</p>
										<p
											class="text-muted"
											style="margin-top: -10px"
										>
											<strong
												>Email :
												info@istanapresiden.go.id</strong
											>
										</p>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import api from "@/shared/services/api";
import { ref, watchEffect } from "vue";
import { useToast } from "vue-toast-notification";
import { useRouter } from "vue-router";
import { useLoading } from "vue-loading-overlay";

const $loading = useLoading();
const $router = useRouter();

const nama = ref("");
const email = ref("");
const pesan = ref("");

const formVal = {
    nama: null,
    email: null,
    pesan: null
}

const validasiForm = () => {
	if (!nama.value) {
		formVal.nama = "Nama wajib diisi!";
	}
    if (!email.value) {
		formVal.email = "Email wajib diisi!";
	}
	if (!pesan.value) {
		formVal.pesan = "Pesan wajib diisi!";
	}
}

const onSubmit = () => {
	watchEffect(() => {
        Object.keys(formVal).forEach((key) => {
            formVal[key] = null;
        });
        validasiForm();
    });

	if (
		!formVal.nama && 
		!formVal.email && 
		!formVal.pesan
	) {
		let loader = $loading.show({
			// Optional parameters
			container: null,
			canCancel: false,
			onCancel: () => {},
		});

		let data = {
			nama: nama.value,
			email: email.value,
			pesan: pesan.value
		}

		api.post(import.meta.env.VITE_APP_RESTFUL_BASE_URL + '/kontak', data)
			.then((response) => {
				useToast().success(response.data.message, {
					position: 'top'
				});
				$router.push({ name: 'home' });
			})
			.catch((error) => {
				useToast().error(error.response.data.message, {
					position: 'top'
				});
			})
			.finally(() => {
				loader.hide();
			})

	} else {
		let message = formVal.nama ? formVal.nama : 
                      formVal.email ? formVal.email : 
                      formVal.pesan ? formVal.pesan : "";

        useToast().error(message, {
            position: 'top'
        });
	}




}
</script>

<style scoped>
    .contact-info {
        text-align: center;
    }
</style>