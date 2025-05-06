<template>
    <div
		class="container-fluid d-flex flex-column gap-3 pt-5"
		style="background: var(--bs-white)"
	>
		<div class="row g-0 justify-content-center">
			<div class="col-4 text-center mx-auto">
				<h2>Forgot Password</h2>
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
						<span class="mb-1">Email</span>
						<div class="input-group">
							<input
								class="form-control p-2"
								type="text"
								style="font-size: 14px"
								v-model="email"
							/>
						</div>
					</div>
					
					<button
						class="btn btn-primary d-flex justify-content-center align-items-center p-2"
						type="submit"
						v-on:click="onSubmit()"
						:disabled="submitStatus === 'PENDING'"
						style="
							background: var(--bs-primary);
							color: var(--bs-body-color);
							border-style: none;
							margin-bottom: 85px;
						"
					>
						<span class="me-1" style="font-weight: 600">Reset Password</span>
					</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "vue-toast-notification";
import { useRouter } from "vue-router";
import { useLoading } from "vue-loading-overlay";
import api from "@/shared/services/api";


const email = ref("")
const $router = useRouter()
const $loading = useLoading();

function onSubmit () {
    //validation email using regex
    const toast = useToast();
	const loader = $loading.show()

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;


    if (email.value == "") {
        toast.error("Email tidak boleh kosong!", {
            position: "top",
        });
		loader.hide();
        return;
    }

    if (!emailRegex.test(email.value)) {
        toast.error("Format email salah!", {
            position: "top",
        });
		loader.hide();
        return;
    }

	
	api.post(import.meta.env.VITE_APP_RESTFUL_BASE_URL + "/users/reset-password", {
		email: email.value,
	})
	.then((response) => {
		toast.success("Email terkirim! Silahkan check email untuk menerima link perubahaan password", {
			position: "top",
		});
		$router.push("/login");
	})
	.catch((error) => {
		toast.error(error.response.data.pesan, {
			position: "top",
		});
	})
	.finally(() => {
		loader.hide();
	});


}
</script>