export interface ApiResSearchAirport {
    presentation: {
        title: string,
        suggestionTitle: string,
        subtitle: string
    },
    navigation: {
        entityId: string,
        entityType: string,
        localizedName: string,
        relevantFlightParams: {
            skyId: string
        }
    }
}

export interface ApiResSearchFlights {
    id: string,
    price: {
        raw: string,
        formatted: string
    },
    legs: {
        origin: {
            name: string,
            displayCode: string,
            city: string
        },
        destination: {
            name: string,
            displayCode: string,
            city: string
        },
        durationInMinutes: number,
        stopCount: number,
        departure: string,
        arrival: string,
        carriers: {
            marketing: {
                logoUrl: string,
                name: string
            }[]
        },
        segments: {
            id: string,
            origin: {
                name: string,
                displayCode: string,
            },
            destination: {
                name: string,
                displayCode: string,
            },
            durationInMinutes: number,
            departure: string,
            arrival: string,
            operatingCarrier: {
                name: string
            }
        }[]
    }[]
}