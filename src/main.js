import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/styles.css";
import "./assets/css/styles.css";
import "./assets/bootstrap/css/bootstrap.min.css";
import "./assets/bootstrap/js/bootstrap.min.js";
import axios from "axios";
import VueAxios from "vue-axios";
import VueGoodTablePlugin from "vue-good-table-next";
import "vue-good-table-next/dist/vue-good-table-next.css";
import VueLoading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import setupInterceptors from "./shared/services/setupInterceptors";
// vue-sweetalert2
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import 'vue2-editor/dist/vue2-editor.css';
import 'quill/dist/quill.core.js'
import 'quill/dist/quill.core.css'

import VueMatomo from 'vue-matomo'


const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_APP_RESTFUL_BASE_URL,
});

setupInterceptors();
const app = createApp(App);
app.use(router);

app.use(VueMatomo, {
	host: 'https://matomo.istanapresiden.go.id/',
	siteId: 3,
	trackerFileName: 'matomo',
	router: router,
	enableLinkTracking: true,
	requireConsent: false,
	trackInitialView: true,
	debug: true,

});
app.use(VueAxios, axiosInstance);
app.use(VueGoodTablePlugin);
app.use(VueLoading);
app.use(VueToast, {
	// One of the options
	position: "top",
});
app.use(VueSweetalert2);
app.mount("#app");
import "./assets/all";
