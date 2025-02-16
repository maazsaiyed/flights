import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Button, DatePicker, Flex, Select, Space, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import './App.css';
import { searchAirport, searchFlights } from './AppService';
import FlightResult from './components/flights_details';
import { ApiResSearchAirport, ApiResSearchFlights } from './model/api_res_model';
import { displayClassType, displayPassengerCount, displayTripType } from './model/select_model';
import { ReactComponent as AircraftSVG } from './undraw_aircraft.svg';
const { RangePicker } = DatePicker;
const { Title } = Typography;

interface FlightDatePicker {
  start: Dayjs | null | undefined,
  end: Dayjs | null | undefined,
}

interface SearchAirportString {
  searchString: string,
  airportList: ApiResSearchAirport[]
}

function mapSearchAirport(modelAirportList: ApiResSearchAirport[]) {
  return modelAirportList.map((d) => {
    return {
      value: `${d.navigation.entityId}|${d.navigation.relevantFlightParams.skyId}`,
      label: `${d.presentation.suggestionTitle}, ${d.presentation.subtitle}`
    }
  });
}


function App() {

  const [srcAirportList, setSrcAirportList] = useState<SearchAirportString>({ searchString: "", airportList: [] });
  const [destAirportList, setDestAirportList] = useState<SearchAirportString>({ searchString: "", airportList: [] });
  const [srcAirport, setSrcAirport] = useState<string>();
  const [destAirport, setDestAirport] = useState<string>();
  const [tripType, setTripType] = useState<string>("round_trip");
  const [passengersCount, setPassengersCount] = useState<string>("1");
  const [cabinClass, setCabinClass] = useState<string>("economy");
  const [flightDates, setFlightDates] = useState<FlightDatePicker>({ start: dayjs(), end: dayjs() });
  const [flightDetails, setFlightDetails] = useState<ApiResSearchFlights[] | undefined>(undefined);

  return (
    <div>
      {/* banner image */}
      <AircraftSVG style={{ width: "100%" }} />

      <Title level={1} style={{ textAlign: "center" }}>Flights</Title>

      <Flex vertical style={{ maxWidth: "1024px", margin: "0 auto" }}>
        <Space direction="vertical" size="large" className="search-header">
          <Flex gap="large">
            {/* Trip Type */}
            <Select
              style={{ width: 150 }}
              defaultValue={tripType}
              options={displayTripType}
              onChange={(value) => setTripType(value)}
            />

            {/* Passengers Count */}
            <Select
              style={{ width: 150 }}
              defaultValue={passengersCount}
              options={displayPassengerCount}
              onChange={(value) => setPassengersCount(value)}
              prefix={<UserOutlined />}
            />

            {/* Class Type */}
            <Select
              style={{ width: 200 }}
              defaultValue={cabinClass}
              options={displayClassType}
              onChange={(value) => setCabinClass(value)}
            />
          </Flex>

          <Flex gap="small" justify="space-between">
            {/* Source */}
            <Select
              showSearch
              style={{ width: 400 }}
              placeholder="Source"
              optionFilterProp="label"
              options={mapSearchAirport(srcAirportList.airportList)}
              onKeyUp={(e: any) => {
                const val = e.target.value;
                if (val.length >= 3 && (!srcAirportList.searchString || !val.includes(srcAirportList.searchString))) {
                  searchAirport(val).then(d => {
                    if (d) setSrcAirportList({
                      searchString: val,
                      airportList: d
                    });
                  })
                }
              }}
              onChange={(value) => setSrcAirport(value)}
            />

            {/* Destination */}
            <Select
              showSearch
              style={{ width: 400 }}
              placeholder="Destination"
              optionFilterProp="label"
              options={mapSearchAirport(destAirportList.airportList)}
              onKeyUp={(e: any) => {
                const val = e.target.value;
                if (val.length >= 3 && (!destAirportList.searchString || !val.includes(destAirportList.searchString))) {
                  searchAirport(val).then(d => {
                    if (d) setDestAirportList({
                      searchString: val,
                      airportList: d
                    });
                  })
                }
              }}
              onChange={(value) => setDestAirport(value)}
            />

            <RangePicker
              style={{ width: 400 }}
              defaultValue={[flightDates.start, flightDates.end]}
              format={value => `${value.format("ddd")} ${value.date()} ${value.format("MMM")}`}
              onChange={e => setFlightDates({ start: e?.[0], end: e?.[1] })}
            />
          </Flex>

          <Flex gap="large" justify="center">
            <Button
              type="primary"
              loading={flightDetails?.length === 0}
              icon={<SearchOutlined />}
              onClick={() => {
                if (srcAirport && destAirport && flightDates.start) {
                  setFlightDetails([]);
                  searchFlights({
                    originSkyId: srcAirport.split("|")[1],
                    destinationSkyId: destAirport.split("|")[1],
                    originEntityId: srcAirport.split("|")[0],
                    destinationEntityId: destAirport.split("|")[0],
                    date: flightDates.start.format("YYYY-MM-DD"),
                    cabinClass: cabinClass,
                    adults: passengersCount,
                    sortBy: "best",
                    currency: "USD",
                    market: "en-US",
                    countryCode: "US"
                  }).then(d => setFlightDetails(d))
                    .catch(err => console.error(err));
                }
              }}
              style={{ width: 150 }}
            >Search</Button>
          </Flex>
        </Space>

        <br /><br />

        <FlightResult flightDetails={flightDetails} />
      </Flex>

    </div>
  );
}

export default App;
