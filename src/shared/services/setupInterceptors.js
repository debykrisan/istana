import cookie from "cookiejs";
import axiosInstance from "./api";

const setup = () => {
	axiosInstance.interceptors.request.use(
		(config) => {
			const kukiToken = cookie.get(import.meta.env.VITE_APP_ACCESSTOKEN);
			if (kukiToken) {
				const kukiDekrip = JSON.parse(atob(kukiToken));
				// 

				if (kukiDekrip) {
					// config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
					// config.headers["token"] =    token;  // for Spring Boot back-end
					config.headers["x-access-token"] = kukiDekrip; // for Node.js Express back-end
				}
			}
			//
			return config;
		},
		(error) => {
			// 
			return Promise.reject(error);
		}
	);

	axiosInstance.interceptors.response.use(
		(res) => {
			return res;
		},
		async (err) => {
			const originalConfig = err.config;

			if (originalConfig.url !== "/auth/signin" && err.response) {
				if (
					err.response.status === 401 ||
					err.response.status === 403 ||
					err.response.status === 400 ||
					err.response.status === 405
				) {
					// await   router.push("/login") ;
				}
			}

			return Promise.reject(err);
		}
	);
};

export default setup;
