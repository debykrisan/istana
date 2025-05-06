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
				<Wizard
					squared-tabs
					card-background
					navigable-tabs
					scrollable-tabs
					:beforeChange="onTabBeforeChange"
					@change="onChangeCurrentTab"
					@complete:wizard="wizardCompleted"
				>
					<div
						class="row g-0 d-flex justify-content-center w-100 gap-3"
					>
						<div class="col-4 gap-2">
							<form
								class="d-flex flex-column justify-content-center w-100 gap-3"
								v-if="currentTabIndex === 0"
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
											:type="passwordFieldType"
											class="form-control"
											v-model="password"
										/>
										<button
											class="input-group-text"
											style="background: transparent"
											type="button"
											@click="
												hidePassword = !hidePassword
											"
										>
											<img
												v-if="
													passwordFieldType ==
													'password'
												"
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
									<span class="mb-1"
										>Konfirmasi Password</span
									>
									<div class="input-group">
										<input
											:type="confirmPassFieldType"
											class="form-control"
											v-model="confirmPassword"
										/>
										<button
											class="input-group-text"
											style="background: transparent"
											type="button"
											@click="
												hideConfirmPass =
													!hideConfirmPass
											"
										>
											<img
												v-if="
													confirmPassFieldType ==
													'password'
												"
												src="@/assets/img/svg/eye.svg"
											/>
											<img
												v-else
												src="@/assets/img/svg/eye-slash.svg"
											/>
										</button>
									</div>
								</div>
							</form>
							<form
								class="d-flex flex-column justify-content-center w-100 gap-3"
								v-if="currentTabIndex === 1"
							>
								<div
									class="d-flex flex-column justify-content-center align-items-start w-100"
								>
									<div
										class="d-flex justify-content-center align-items-center mb-1"
									>
										<span class="me-1">Kartu Identitas</span
										><img src="@/assets/img/svg/info.svg" />
									</div>
									<div class="dropdown w-100">
										<select
											class="dropdown-toggle d-flex justify-content-between align-items-center w-100 p-2"
											v-model="kartu_identitas"
											aria-expanded="false"
											data-bs-toggle="dropdown"
											style="
												background: transparent;
												border-radius: 4px;
												border: 1px solid #ced4da;
												font-size: 14px;
											"
										>
											<span>Kartu Tanda Penduduk</span
											><img
												src="@/assets/img/svg/chevron_down.svg"
											/>
											<option value="0" selected>
												Kartu Tanda Penduduk
											</option>
											<option value="1">
												Surat Izin Mengemudi
											</option>
											<option value="2">Paspor</option>
										</select>
									</div>
								</div>
								<div
									class="d-flex flex-column justify-content-center align-items-start w-100"
								>
									<span class="mb-1">No. Identitas</span>
									<div class="input-group">
										<input
											class="form-control p-2"
											type="text"
											style="font-size: 14px"
											v-model="nomer_identitas"
										/>
									</div>
								</div>
								<div
									class="d-flex flex-column justify-content-center align-items-start w-100"
								>
									<span class="mb-1">Nama Lengkap</span>
									<div class="input-group">
										<input
											class="form-control p-2"
											type="text"
											style="font-size: 14px"
											v-model="nama_lengkap"
										/>
									</div>
								</div>
								<div
									class="d-flex flex-column justify-content-center align-items-start w-100"
								>
									<span class="mb-1">No. Telepon</span>
									<div class="input-group">
										<input
											class="form-control p-2"
											type="text"
											style="font-size: 14px"
											v-model="phone"
										/>
									</div>
								</div>
								<div
									class="d-flex flex-column justify-content-center align-items-start w-100"
								>
									<span class="mb-1">Alamat</span>
									<div class="input-group">
										<input
											class="form-control p-2"
											type="text"
											style="font-size: 14px"
											v-model="alamat"
										/>
									</div>
								</div>
							</form>
							<div v-if="currentTabIndex === 2">
								Tab 2
								<input type="text" />
							</div>
						</div>
					</div>
				</Wizard>
			</div>
		</div>
	</body>
</template>

<script>
import Wizard from "form-wizard-vue3";

export default {
	name: "App",
	components: {
		Wizard,
	},
	data() {
		return {
			currentTabIndex: 0,
		};
	},
	methods: {
		onChangeCurrentTab(index, oldIndex) {
			
			this.currentTabIndex = index;
		},
		onTabBeforeChange() {
			if (this.currentTabIndex === 0) {
				
			}
			
		},
		wizardCompleted() {
			
		},
	},
};
</script>
