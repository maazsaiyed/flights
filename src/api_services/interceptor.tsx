import axios from "axios";

const axiosHttp = axios.create();

axiosHttp.interceptors.request.use(
    (config: any) => {
        const rapidapiKey = process.env.REACT_APP_RAPIDAPI_KEY;
        const rapidapiHost = "sky-scrapper.p.rapidapi.com";
        return {
            ...config,
            headers: {
                ...({
                    "x-rapidapi-key": rapidapiKey,
                    "x-rapidapi-host": rapidapiHost
                }),
                ...config.headers,
            },
        };
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosHttp;