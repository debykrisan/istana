<template>
	<nav
		class="navbar navbar-light navbar-expand-md justify-content-between justify-content-sm-start sticky-top bg-white shadow-sm pt-3"
		style="border-bottom: 1px solid #d9d9d9"
	>
		<div class="container">
			<div
				class="collapse navbar-collapse position-relative"
				id="navcol-2"
			>
				<div class="d-flex flex-column align-items-center w-100">
					<div
						class="d-flex justify-content-between align-items-center w-100 gap-3 mb-2 ms-5"
					>
						<div class="d-flex align-items-center">
							<img
								class="me-2"
								src="@/assets/img/setneg_logo.png"
								style="width: 48px; height: 48px"
							/>
							<h6 class="fw-bold mb-0" style="color: #895700">
								KEMENTERIAN SEKRETARIAT NEGARA<br />REPUBLIK
								INDONESIA<br /> SEKRETARIAT PRESIDEN
							</h6>
						</div>
						<div
							class="d-none d-lg-flex align-items-center invisible"
						>
							<img
								class="me-2"
								src="@/assets/img/setneg_logo.png"
								style="width: 48px; height: 48px"
							/>
							<h6 class="fw-bold mb-0" style="color: #895700">
								KEMENTERIAN SEKRETARIAT NEGARA<br />REPUBLIK
								INDONESIA<br /> SEKRETARIAT PRESIDEN
							</h6>
						</div>
						<button
							class="d-flex btn me-5 float-end"
							type="button"
							role="button"
							v-on:click="submitLogout()"
							style="
								background: var(--bs-primary);
								padding: 4px 10px;
							"
						>
							Kembali Ke Portal
						</button>
					</div>

					<div
						class="d-flex justify-content-center align-items-center position-absolute bg-white p-3"
						style="
							top: 30px;
							border-bottom: 1px solid #d9d9d9;
							border-bottom-right-radius: 10px;
							border-bottom-left-radius: 10px;
						"
					>
						<img
							src="@/assets/img/svg/Logo-2.svg"
							style="height: 40px"
						/>
					</div>
				</div>
			</div>
		</div>
	</nav>

	<slot />
</template>

<script setup></script>
