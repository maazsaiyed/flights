class APIConfiguration {
    private BASE_URL: string = "https://sky-scrapper.p.rapidapi.com";
    private FLIGHTS_V1 = "api/v1/flights";
    private SEARCH_AIRPORT: string = "searchAirport";
    private SEARCH_FLIGHTS: string = "searchFlights";

    getSearchAirports() {
        return `${this.BASE_URL}/${this.FLIGHTS_V1}/${this.SEARCH_AIRPORT}`;
    }

    getSearchFlights() {
        return `${this.BASE_URL}/${this.FLIGHTS_V1}/${this.SEARCH_FLIGHTS}`;
    }
}

const apiConfiguration: APIConfiguration = new APIConfiguration();

export default apiConfiguration;