import { createRouter, createWebHistory } from "vue-router";
import cookie from "cookiejs";
import { dekripJwt } from "../shared/services/util";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	base: import.meta.env.BASE_URL,
	routes: [
		//------------------------Route for User Public--------------------------------
		{
			path: "/",
			name: "home",
			component: () => import("../views/HomeView.vue"),
			meta: {
				layout: "NavbarLayout",
				title: "Selamat Datang di Portal Istana Kepresidenan",
			},
		},
		{
			path: "/denied",
			name: "denied",
			component: () => import("../views/DeniedView.vue"),
			meta: {
				layout: "AuthLayout",
				title: "Akses Ditolak",
			},
		},
		{
			path: "/login",
			name: "login",
			component: () => import("../views/LoginView.vue"),
			meta: {
				layout: "AuthLayout",
				title: "Login User Public",
			},
		},
		{
			path: "/register",
			name: "register",
			component: () => import("../views/register/RegisterView.vue"),
			meta: {
				layout: "AuthLayout",
				title: "Register",
			},
		},
		{
			path: "/register/akun",
			name: "akun",
			component: () => import("../views/register/AkunView.vue"),
			meta: {
				layout: "AuthLayout",
				title: "Akun",
			},
		},
		{
			path: "/register/profil",
			name: "profil",
			component: () => import("../views/register/ProfilView.vue"),
			meta: {
				layout: "AuthLayout",
				title: "Profil",
			},
		},
		{
			path: "/register/verifikasi",
			name: "verifikasi",
			component: () => import("../views/register/VerifikasiView.vue"),
			meta: {
				layout: "AuthLayout",
				title: "Verifikasi",
			},
		},
		{
			path: "/berita/:idIstana/:id",
			name: "berita",
			component: () => import("../views/BeritaView.vue"),
			props: true,
			meta: {
				layout: "NavbarLayout",
				title: "Berita",
			},
		},
		{
			path: "/forgot-password",
			name: "forgot-password",
			component: () => import("../views/ForgotPassword.vue"),
			meta: {
				layout: "AuthLayout",
				title: "Forgot Password",
			},
		},
		{
			path: "/reset-password/:token",
			name: "reset-password",
			component: () => import("../views/ResetPassword.vue"),
			meta: {
				layout: "AuthLayout",
				title: "Reset Password",
			},
		},
		{
			path: "/kuisioner/:token",
			name: "kuisioner",
			component: () => import("../views/KuisionerView.vue"),
			meta: {
				layout: "NavbarLayout",
				title: "Kuisioner",
			},
		},
		{
			path: "/berita/semua",
			name: "semuaBerita",
			component: () => import("../views/SemuaBeritaView.vue"),
			meta: {
				layout: "NavbarLayout",
				title: "Semua Berita",
			},
		},
		{
			path: "/berita/semua/:idIstana",
			name: "semuaBeritaIstana",
			component: () => import("../views/SemuaBeritaView.vue"),
			meta: {
				layout: "NavbarLayout",
				title: "Semua Berita",
			},
		},
		{
			path: "/foto/semua",
			name: "semuaFoto",
			component: () => import("../views/galeri/foto/SemuaFotoView.vue"),
			meta: {
				layout: "NavbarLayout",
				title: "Semua Foto",
			},
		},
		{
			path: "/foto/:id",
			name: "foto",
			component: () => import("../views/galeri/foto/FotoView.vue"),
			meta: {
				layout: "NavbarLayout",
				title: "Foto",
			},
		},
		{
			path: "/video",
			name: "semuaVideo",
			component: () => import("../views/galeri/video/SemuaVideoView.vue"),
			meta: {
				layout: "NavbarLayout",
				title: "Video",
			},
		},
		{
			path: "/video/:id",
			name: "video",
			component: () => import("../views/galeri/video/SemuaVideoView.vue"),
			meta: {
				layout: "NavbarLayout",
				title: "Video",
			},
		},
		{
			path: "/istana/:id/bangunan",
			name: "bangunanSemua",
			component: () => import("../views/bangunan/SemuaBangunanView.vue"),
			meta: {
				layout: "NavbarLayout",
				title: "Semua Serba-serbi",
			},
		},
		{
			path: "/istana/:idIstana/bangunan/:id",
			name: "bangunan",
			component: () => import("../views/bangunan/BangunanView.vue"),
			meta: {
				layout: "NavbarLayout",
				title: "Serba-serbi",
			},
		},

		//------------------------Route for Sejarah Istana--------------------------------

		{
			path: "/istana/sejarah/:idIstana",
			name: "sejarahIstana",
			component: () => import("../views/sejarah-istana/SejarahIstanaView.vue"),
			meta: {
				layout: "NavbarLayout",
				title: "Sejarah Istana",
			},
		},
		
		//------------------------Route for Kebijakan Privasi--------------------------------

		{
			path: "/kebijakan-privasi",
			name: "kebijakanPrivasi",
			component: () => import("../views/kebijakan-privasi/KebijakanPrivasiView.vue"),
			meta: {
				layout: "NavbarLayout",
				title: "Sejarah Istana",
			},
		},
		
		//------------------------Route for Kontak Istana--------------------------------

		{
			path: "/kontak-istana",
			name: "kontakIstana",
			component: () => import("../views/kontak-istana/KontakIstanaView.vue"),
			meta: {
				layout: "NavbarLayout",
				title: "Kontak Istana	",
			},
		},
		//------------------------Route for Istana Landing Page--------------------------------
		{
			path: "/istana/:id",
			name: "istanaLandingPage",
			component: () => import("../views/IstanaLandingPageView.vue"),
			meta: {
				layout: "NavbarLayout",
				title: "Portal Istana",
			},
		},
		{
			path: "/pendaftaran/kunjungan",
			name: "listPendaftaranKunjungan",
			component: () =>
				import(
					"../views/pendaftaran/istura/listPendaftaranKunjunganView.vue"
				),
			meta: {
				layout: "NavbarLayout",
				title: "List Pendaftaran Kunjungan",
				authorize: ["up"],
			},
		},
		{
			path: "/pendaftaran/kunjungan/add",
			name: "formPendaftaranKunjungan",
			component: () =>
				import(
					"../views/pendaftaran/istura/formPendaftaranKunjunganView.vue"
				),
			meta: {
				layout: "NavbarLayout",
				title: "Form Pendaftaran Kunjungan",
				authorize: ["up"],
			},
		},
		{
			path: "/pendaftaran/kunjungan/detail/:id",
			name: "detailistana",
			component: () =>
				import(
					"../views/pendaftaran/istura/detailPendaftaranKunjunganView.vue"
				),
			meta: {
				layout: "NavbarLayout",
				title: "Form Pendaftaran Kunjungan",
				authorize: ["up"],
			},
		},
		{
			path: "/pendaftaran/kunjungan/edit/:id",
			name: "editistana",
			component: () =>
				import(
					"../views/pendaftaran/istura/editPendaftaranKunjunganView.vue"
				),
			meta: {
				layout: "NavbarLayout",
				title: "Form Pendaftaran Kunjungan",
				authorize: ["up"],
			},
		},
		{
			path: "/dokumentasi/:path/:id",
			name: "formPermintaanHasilDokumentasi",
			component: () =>
				import(
					"../views/pendaftaran/dokumentasi/formPermintaanHasilDokumentasi.vue"
				),
			meta: {
				layout: "NavbarLayout",
				title: "Form Permintaan Hasil Dokumentasi",
				authorize: ["up"],
			},
		},
		{
			path: "/dokumentasi/:path/:id",
			name: "editPermintaanHasilDokumentasi",
			component: () =>
				import(
					"../views/pendaftaran/dokumentasi/formPermintaanHasilDokumentasi.vue"
				),
			meta: {
				layout: "NavbarLayout",
				title: "Form Permintaan Hasil Dokumentasi",
				authorize: ["up"],
			},
		},
		{
			path: "/dokumentasi",
			name: "listDokumentasi",
			component: () =>
				import(
					"../views/pendaftaran/dokumentasi/listDokumentasiView.vue"
				),
			meta: {
				layout: "NavbarLayout",
				title: "List Dokumentasi",
				authorize: ["up"],
			},
		},
		{
			path: "/editprofile",
			name: "useredit",
			component: () => import("../views/userprofile/UserEdit.vue"),
			meta: {
				layout: "NavbarLayout",
				title: "Edit Profile",
				authorize: ["up"],
			},
		},
		{
			path: "/ubahpassword",
			name: "ubahpassword",
			component: () => import("../views/userprofile/UbahPassword.vue"),
			meta: {
				layout: "NavbarLayout",
				title: "Ubah Password",
				authorize: ["up"],
			},
		},
		// Search Page
		{
			path: "/search",
			name: "search",
			component: () => import("../views/SearchView.vue"),
			props: true,
			meta: {
				layout: "NavbarLayout",
				title: "Search",
			},
		},
	],
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else {
			return { top: 0 };
		}
	},
});

router.beforeEach((to, from, next) => {
	const { authorize } = to.meta;
	const kukiToken = cookie.get(import.meta.env.VITE_APP_ACCESSTOKEN);
	document.title = to.meta.title;
	const isLoggedIn = !!kukiToken;

	const logoutAndRedirectToLogin = () => {
        cookie.remove(import.meta.env.VITE_APP_ACCESSTOKEN);
        next({ path: "/login", query: { returnUrl: to.path } });
    };

	if (to.path !== "/login") {
		// 
		if (authorize) {
			if (!isLoggedIn) {
				return logoutAndRedirectToLogin();
			} else {
				try {
					const kukiDekrip = JSON.parse(atob(kukiToken));
					const kuki = dekripJwt(kukiDekrip);

					if (isTokenExpired(kuki.exp)) {
                        return logoutAndRedirectToLogin();
                    }
					
					if (authorize.length && !checkIsMember(authorize, kuki.roles)) {
						return next({ path: "/denied" });
					}
				} catch (error) {
					return logoutAndRedirectToLogin();
				}
			}
		}
	} else if (to.path === "/login" && isLoggedIn) {
		router.push({ path: "/" });
	} else if (to.path === "/admin/login" && isLoggedIn) {
		router.push({ path: "/admin" });
	}
	next();
});

function checkIsMember(authorize, roles) {
	for (let i = 0; i < authorize.length; i++) {
		for (let j = 0; j < roles.length; j++) {
			
			if (roles[j].n_role === authorize[i]) {
				return true;
			}
		}
	}
	return false;
}

function isTokenExpired(unix) {
    const date = new Date();
    const unixTimestamp = Math.round(date.getTime() / 1000);
    return unixTimestamp > unix;
}

export default router;
