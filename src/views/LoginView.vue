<template>
	<!-- <div
        style="
            padding-top: 100px;
            background-image: url('../assets/ornamen_kiri.png'), url('../assets/ornamen_kanan.png');
        "
        :style="
            {
                backgroundImage: 'url(' + bg_left + '), url(' + bg_right + ')',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'top left, top right',
                backgroundSize: '9%, 9%',
            }
        "
    >
    </div> -->

	<div
		class="container-fluid d-flex flex-column gap-3 pt-5"
		style="background: var(--bs-white)"
	>
		<div class="row g-0 justify-content-center">
			<div class="col-4 text-center mx-auto mt-2">
				<h2>Masuk</h2>
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
								@focus="setStopFetch(false)"
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
								@click="hidePassword = !hidePassword"
							>
								<img
									v-if="passwordFieldType == 'password'"
									src="@/assets/img/svg/eye.svg"
								/>
								<img
									v-else
									src="@/assets/img/svg/eye-slash.svg"
								/>
							</button>
						</div>
					</div>
					<div class="row mb-form">
						<div class="col-6">
							<input
								type="text"
								class="form-control"
								placeholder="Ketik Captcha"
								v-model="captcha"
								maxlength="7"
								
							/>
						</div>
						<div class="col-6 text-center">
							<span
								class="form-control captcha"
								onselectstart="return false"
								onpaste="return false;"
								onCopy="return false"
								onCut="return false"
								onDrag="return false"
								onDrop="return false"
								style="font-family: 'Times New Roman', Times, serif"
								>{{ code }}</span
							>
						</div>
					</div>
					<div class="d-flex justify-content-between">
						<div class="form-check">
							<input
								class="form-check-input"
								type="checkbox"
								id="remember-me"
								style="border-radius: 2px"
							/>
							<label class="form-check-label" for="formCheck-1"
								>Ingat Saya</label
							>
						</div>
						<router-link to="/forgot-password" style="color: #af9b43">Lupa Password</router-link>
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
						"
					>
						<span class="me-1" style="font-weight: 600">Masuk</span>
					</button>
					<div style="text-align: center" class="mb-5">
						<span class="me-1">Belum punya akun?</span
						><router-link to="/register" style="color: #af9b43"
							><span style="text-decoration: underline"
								>Daftar di sini</span
							></router-link
						>
					</div>
				</form>
			</div>
		</div>
	</div>
	<!-- <div class="my-5 py-5" >
            <img :src="bg_bottom" style="width: 100%; height: auto; margin: 0; object-fit: fill">
        </div> -->
</template>
<script setup>
import axios from "axios";
import cookie from "cookiejs";
import { useToast } from "vue-toast-notification";
import { useLoading } from "vue-loading-overlay";
import { useRouter } from "vue-router";
import { dekripJwt } from "@/shared/services/util";
import bg_right from "@/assets/ornamen_kanan.png";
import bg_left from "@/assets/ornamen_kiri.png";
import bg_bottom from "@/assets/ornamen_bawah.png";
import { onMounted, ref, watchEffect, computed } from "vue";

const istanaAll = ref([]);
const company = ref("");

const $loading = useLoading();
const $router = useRouter();
const fullPage = false;
let submitStatus = null;
const password = ref("");
const email = ref("");
const stopFetch = ref(true);
const hidePassword = ref(true);

const passwordFieldType = computed(() =>
	hidePassword.value ? "password" : "text"
);

const formVal = {
	password: null,
	email: null,
};

onMounted(async () => {
	rememberMe();
});

const rememberMe = () => {
	if (localStorage.getItem("remember")) {
		email.value = localStorage.getItem("email");
		document.getElementById("remember-me").checked = true;
	}
}

const setStopFetch = (par) => {
	stopFetch.value = par;
};
// watchEffect(async () => {
// 	if (!stopFetch.value) {
// 		if (username.value.trim().length < 2) {
// 			formVal.username = "Wajib diisi!";
// 		} else {
// 			formVal.username = null;
// 		}

// 		if (password.value.trim().length < 2) {
// 			formVal.password = "Wajib diisi!";
// 		} else {
// 			formVal.password = null;
// 		}
// 	}
// });

const onSubmit = async () => {
	if (code.value === captcha.value) {
		if (!formVal.email && !formVal.password) {
			const paramForm = {
				email: email.value,
				password: password.value,
			};
			submitStatus = "PENDING";

			let loader = $loading.show({
				container: fullPage,
				canCancel: true,
			});
			axios
				.post(
					import.meta.env.VITE_APP_RESTFUL_BASE_URL +
						"/auth/authorize",
					paramForm
				)
				.then((response) => {
					if (response.data.allowed != false) {
						cookie.set(
							import.meta.env.VITE_APP_ACCESSTOKEN,
							btoa(JSON.stringify(response.data))
						);
	
						const tokenJwt = dekripJwt(response.data);
	
						cookie.set(
							import.meta.env.VITE_APP_EMAILUSER,
							tokenJwt.email
						);
						cookie.set(
							import.meta.env.VITE_APP_NAMAUSER,
							tokenJwt.nama
						);
						cookie.set(
							import.meta.env.VITE_APP_PHONEUSER,
							tokenJwt.phone
						);
						cookie.set(
							import.meta.env.VITE_APP_ALAMATUSER,
							tokenJwt.alamat
						);
						cookie.set(
							import.meta.env.VITE_APP_ROLES, 
							tokenJwt.roles
						);
	
						
						
						
						//save idUser to local storage
						localStorage.setItem('id', tokenJwt.idUser);
	
						let roles = "";
	
						for (let k in tokenJwt.roles) {
							if (k == 0) {
								roles += tokenJwt.roles[k].n_role;
							} else {
								roles += "," + tokenJwt.roles[k].n_role;
							}
						}
						
						cookie.set(import.meta.env.VITE_APP_ROLES, roles);


						window._paq.push(['setCustomDimension', 1, `login_success, email: ${email.value}, nama: ${tokenJwt.nama}, roles: ${roles}`]);
						window._paq.push(['trackEvent', 'Login', 'Berhasil', `Email: ${email.value}`, { 'nama': tokenJwt.nama, 'roles': roles }]);

						useToast().success("Login Berhasil", {
							position: "top",
						});
						$router.push({ path: "/" });
					} else {
						useToast().error(response.data.message, {
							position: "top",
						});
						randomString();
						captcha.value = null;
					}
				})
				.catch((error) => {
					if (error.response.status == 401) {
						useToast().error(error.response.data.message, {
							position: "top"
						});
						cookie.set(
							'emailVerifikasi', 
							error.response.data.email
						)
						cookie.set(
							'namaVerifikasi', 
							error.response.data.nama
						)
						$router.push({path: '/register/verifikasi'})
					} 

					if (error.response.status == 403){
						useToast().error(error.response.data.message, {
							position: "top"
						});
						randomString();
						captcha.value = null;
						window._paq.push(['setCustomDimension', 1, `login_failed, email: ${email.value}`]);
					}
				})
				.finally(() => {
					//get value remember-me checkbox
					let rememberMe = document.getElementById("remember-me");
					if (rememberMe.checked) {
						localStorage.setItem(
							import.meta.env.VITE_APP_EMAILUSER,
							email.value
						);
						localStorage.setItem(
							'remember',
							rememberMe.checked
						);
					} else {
						localStorage.removeItem(import.meta.env.VITE_APP_EMAILUSER);
						localStorage.removeItem('remember');
					}
					loader.hide();
					submitStatus = "OK";
				});
		} else {
			useToast().error("Form wajib dilengkapi", {
				position: "top",
			});
			randomString();
			captcha.value = null;
		}
	} else {
		useToast().error("Captha salah!", {
			position: "top",
		});
		randomString();
		captcha.value = null;
	}
};



onMounted(() => {
	randomString();
});

const captcha = ref("");
const code = ref("");
const a = ref("");
const b = ref("");
const c = ref("");
const d = ref("");
const e = ref("");
const f = ref("");
const g = ref("");

const randomString = () => {
	var alpha = new Array(
		"A",
		"B",
		"C",
		"D",
		"E",
		"F",
		"G",
		"H",
		"I",
		"J",
		"K",
		"L",
		"M",
		"N",
		"O",
		"P",
		"Q",
		"R",
		"S",
		"T",
		"U",
		"V",
		"W",
		"X",
		"Y",
		"Z",
		"a",
		"b",
		"c",
		"d",
		"e",
		"f",
		"g",
		"h",
		"i",
		"j",
		"k",
		"l",
		"m",
		"n",
		"o",
		"p",
		"q",
		"r",
		"s",
		"t",
		"u",
		"v",
		"w",
		"x",
		"y",
		"z",
		"0",
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9"
	);

	for (let i = 0; i < 6; i++) {
		a.value = alpha[Math.floor(Math.random() * alpha.length)];
		b.value = alpha[Math.floor(Math.random() * alpha.length)];
		c.value = alpha[Math.floor(Math.random() * alpha.length)];
		d.value = alpha[Math.floor(Math.random() * alpha.length)];
		e.value = alpha[Math.floor(Math.random() * alpha.length)];
		f.value = alpha[Math.floor(Math.random() * alpha.length)];
		g.value = alpha[Math.floor(Math.random() * alpha.length)];
	}

	code.value =
		a.value + b.value + c.value + d.value + e.value + f.value + g.value;
	
};

// function Captcha(){
//   var alpha = new Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
// 	 	'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
//  	    	'0','1','2','3','4','5','6','7','8','9');
//   var i;
//    for (i=0;i<6;i++){
//          var a = alpha[Math.floor(Math.random() * alpha.length)];
//          var b = alpha[Math.floor(Math.random() * alpha.length)];
//          var c = alpha[Math.floor(Math.random() * alpha.length)];
//          var d = alpha[Math.floor(Math.random() * alpha.length)];
//          var e = alpha[Math.floor(Math.random() * alpha.length)];
//          var f = alpha[Math.floor(Math.random() * alpha.length)];
//          var g = alpha[Math.floor(Math.random() * alpha.length)];
//                       }
//          var code = a + ' ' + b + ' ' + ' ' + c + ' ' + d + ' ' + e + ' '+ f + ' ' + g;
//          document.getElementById("mainCaptcha").innerHTML = code
// 		 document.getElementById("mainCaptcha").value = code
//    }
// function ValidateCaptcha(){
//   var string1 = removeSpaces(document.getElementById('mainCaptcha').value);
//   var string2 = removeSpaces(document.getElementById('txtInput').value);
//    if (string1 == string2){
//         return true;
//    }else{
//         return false;
//      }
// }

// function removeSpaces(string){
//   return string.split(' ').join('');
// }
</script>

<style scoped>
/* .bg-top-left {
    background-image: url("../assets/ornamen_kiri.png");
    background-repeat: no-repeat;
    background-position: top left;
}
.bg-top-right {
    background-image: url("../assets/ornamen_kanan.png");
    background-repeat: no-repeat;
    background-position: top right;
}
.bg-top-bottom {
    background-image: url("../assets/ornamen_bawah.png");
    background-repeat: no-repeat;
    background-position: bottom;
}
.bg-container {
    background-repeat: no-repeat;
    background-position: top left, top right;
    background-size: 9%, 9%;
}
@media (max-width: 991px) {
    .bg-container {
        background-size: 20%, 20%;
    }
}
@media (max-width: 768px) {
    .bg-container {
        background-size: 30%, 30%;
    }
}
@media (max-width: 576px) {
    .bg-container {
        background-size: 50%, 50%;
    }
} */
</style>

