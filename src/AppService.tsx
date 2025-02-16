import APIService from "./api_services/api_service";
import { ApiReqSeachFlights } from "./model/api_req_model";
import { ApiResSearchAirport, ApiResSearchFlights } from "./model/api_res_model";

export async function searchAirport(searchString: any) {
    if (searchString.length > 0) {
        const response = await APIService.getAirport(searchString);
        let data = response.data as ApiResSearchAirport[];
        data = data.filter(d => d.navigation.entityType === "AIRPORT");
        return data
    }
}

export async function searchFlights(searchFlightsParams: ApiReqSeachFlights) {
    const response = await APIService.getFlights(searchFlightsParams);
    console.log(response);
    let data = response.data.itineraries as ApiResSearchFlights[];
    return data
}