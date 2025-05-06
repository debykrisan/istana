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
			class="container d-flex flex-column pt-4"
			style="background: var(--bs-white)"
		>
            <ol class="breadcrumb mb-2">
				<li class="breadcrumb-item">
					<a href="#"
						><span
							style="
								color: var(--bs-body-color);
								font-weight: 600;
							"
							>Beranda</span
						></a
					>
				</li>
				<li class="breadcrumb-item">
					<a href="#"
						><span style="color: var(--bs-body-color)"
							>Kontak</span
						></a
					>
				</li>
			</ol>
            <div class="row mb-5 px-4 py-4" style="background-color: #d9d9d9">
				<div class="col d-flex flex-column align-items-center gap-3 px-2 py-2" style="background-color: #ffff">
					<div
						class="d-flex flex-column justify-content-center align-items-start w-100"
					>
						<span class="mb-1">Nama</span>
						<div class="input-group">
							<input
								class="form-control p-2"
								type="text"
								style="font-size: 14px"
								v-model="rombongan"
							/>
						</div>
					</div>
					<div
						class="d-flex flex-column justify-content-center align-items-start w-100"
					>
						<span class="mb-1">Email</span>
						<div class="input-group">
							<input
								class="form-control p-2"
								type="text"
								style="font-size: 14px"
								v-model="rombongan"
							/>
						</div>
					</div>
					<div
						class="d-flex flex-column justify-content-center align-items-start w-100"
					>
						<span class="mb-1">Pesan</span>
						<div class="input-group">
							<textarea
								class="form-control p-2"
								type="text"
								style="font-size: 14px"
								v-model="rombongan"
							/>
						</div>
					</div>
					<div
						class="d-flex flex-column justify-content-center align-items-start w-100"
					>
						<div class="col-4 mx-auto">
							<button
								class="btn btn-primary d-flex justify-content-center align-items-center p-2 w-100 mb-2"
								type="submit"
								style="
									background: var(--bs-primary);
									color: var(--bs-body-color);
									border-style: none;
								"
							>
								<span class="me-1" style="font-weight: 600">Submit</span>
							</button>
						</div>
					</div>
				</div>
				<div
					class="col-md-5 d-flex flex-column justify-content-center align-items-center gap-3"
				>
					<div
						class="d-flex flex-column justify-content-center align-items-start w-100"
					>
						<h4 class="mb-3"><i class="fa fa-phone"></i> (0263) 511200</h4>
					</div>
					<div
						class="d-flex flex-column justify-content-center align-items-start w-100"
					>
						<h4 class="mb-3"><i class="fa fa-envelope"></i> setneg@gmail.com</h4>
					</div>
					<div
						class="d-flex flex-column justify-content-center align-items-start w-100"
					>
						<h4 class="mb-3"><i class="fa fa-brand  fa-whatsap"></i> 0811-2311-742</h4>
					</div>
				</div>
			</div>
        </div>
    </body>
</template>