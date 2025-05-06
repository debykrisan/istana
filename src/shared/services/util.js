import cookie from "cookiejs";

const hitungOffset = (pageNumber, itemPerPage) => {
	return Math.abs((parseInt(pageNumber) - 1) * parseInt(itemPerPage) + 1 - 1);
};

const dekripJwt = (token) => {
	const base64Url = token.split(".")[1];
	let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
	let jsonPayload = decodeURIComponent(
		atob(base64)
			.split("")
			.map(function (c) {
				return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join("")
	);

	return JSON.parse(jsonPayload);
};

const processLogout = () => {
	const kukiToken = cookie.get(import.meta.env.VITE_APP_ACCESSTOKEN);
	if (kukiToken) {
		const kukiDekrip = JSON.parse(atob(kukiToken));
		const kuki = dekripJwt(kukiDekrip);
		if (kuki) {
			cookie.remove(import.meta.env.VITE_APP_ACCESSTOKEN);
			cookie.clear();
			// window.location.href = "../digivet/login"
			/* api.post(process.env.VUE_APP_BASEAPI + '/gold/alumni/users/logout?token='+token )
                .then((response) => {
                    if(response.status == 200){
                        useToast().success(response.data.message);
                        this.$router.push("/login");
                    }
                })
                .catch((error) => {
                    
                    useToast().error(error.data.message);
                }).finally(( ) => {

            });*/
		}
	}
};


export { hitungOffset, dekripJwt, processLogout};
