import apiConfiguration from "./api_list";
import { ApiReqSeachFlights } from "../model/api_req_model";
import axiosHttp from "./interceptor";

export default class APIService {
    /**
     * Calls api to get list of airports.
     */
    static getAirport(searchString: string) {

        const url: string = `${apiConfiguration.getSearchAirports()}?query=${searchString}&locale=en-US`;

        return axiosHttp.get(url).then(data => data.data);
    }

    /**
     * Calls api get list of all the flights based on parameters.
     */
    static getFlights(searchFlightsParams: ApiReqSeachFlights) {

        let query = "";
        for (let [key, value] of Object.entries(searchFlightsParams)) {
            query = `${query}&${key}=${value}`;
        }

        const url: string = `${apiConfiguration.getSearchFlights()}?${query.substring(1)}`;

        return axiosHttp.get(url).then(data => data.data);
    }
}