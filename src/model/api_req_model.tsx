export interface ApiReqSeachFlights {
    originSkyId: string,
    destinationSkyId: string,
    originEntityId: string,
    destinationEntityId: string,
    date: string,
    cabinClass: string,
    adults: string,
    sortBy: string,
    currency: string,
    market: string,
    countryCode: string
}