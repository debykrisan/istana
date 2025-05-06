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
			class="container-fluid d-flex flex-column gap-3 pt-5"
			style="background: var(--bs-white)"
		>
			<div class="row g-0 justify-content-center">
				<div class="col-4 text-center mx-auto">
					<h2>Registrasi Akun</h2>
				</div>
			</div>
			<div class="row g-0 d-flex justify-content-center">
				<div
					class="col-4 d-flex justify-content-between align-items-center mx-auto gap-2"
				>
					<div class="d-flex gap-2">
						<div
							class="d-flex justify-content-center align-items-center"
							style="
								width: 24px;
								background: var(--bs-primary);
								border-radius: 4px;
								height: 24px;
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
							<span>3</span>
						</div>
						<span>Verifikasi</span>
					</div>
				</div>
			</div>
			<div class="row g-0 d-flex justify-content-center w-100 gap-3">
				<div class="col-4 gap-2">
					<form
						class="d-flex flex-column justify-content-center w-100 gap-3"
					>
						<div
							class="d-flex flex-column justify-content-center align-items-start w-100"
						>
							<span class="mb-1">Email</span>
							<div class="input-group">
								<input
									class="form-control p-2"
									type="text"
									placeholder="johndoe@example.com"
									style="font-size: 14px"
									v-model="email"
								/>
							</div>
						</div>
						<div
							class="d-flex flex-column justify-content-center align-items-start w-100"
						>
							<span class="mb-1">Password</span>
							<div class="input-group">
								<input
									v-if="passwordVisible"
									class="form-control"
									type="text"
									v-model="password"
								/>
								<input
									v-else
									class="form-control"
									type="password"
									v-model="password"
								/>
								<button
									class="input-group-text"
									style="background: transparent"
									type="button"
									@click="switchPassVisibility()"
								>
									<img
										v-if="!passwordVisible"
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
							<span class="mb-1">Konfirmasi Password</span>
							<div class="input-group">
								<input
									v-if="confirmPassVisible"
									class="form-control"
									type="text"
									v-model="confirmPass"
								/>
								<input
									v-else
									class="form-control"
									type="password"
									v-model="confirmPass"
								/>
								<button
									class="input-group-text"
									style="background: transparent"
									type="button"
									@click="switchConfirmPassVisibility()"
								>
									<img
										v-if="!confirmPassVisible"
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
							class="btn btn-primary d-flex justify-content-center align-items-center p-2"
							type="button"
							style="
								background: var(--bs-primary);
								color: var(--bs-body-color);
								border-style: none;
							"
						>
							<span class="me-1" style="font-weight: 600"
								>Lanjut</span
							><img src="@/assets/img/svg/chevron_right.svg" />
						</button>
						<div style="text-align: center">
							<span class="me-1">Sudah punya akun?</span
							><router-link to="/login" style="color: #af9b43"
								><span style="text-decoration: underline"
									>Masuk di sini</span
								></router-link
							>
						</div>
					</form>
				</div>
			</div>
		</div>
	</body>
</template>

<script setup>
import { ref } from "vue";

const passwordVisible = ref(false);
const confirmPassVisible = ref(false);
const email = ref("");
const password = ref("");
const confirmPass = ref("");

function switchPassVisibility() {
	this.passwordVisible = !this.passwordVisible;
}

function switchConfirmPassVisibility() {
	this.confirmPassVisible = !this.confirmPassVisible;
}
</script>
