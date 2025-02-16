import { DownOutlined } from "@ant-design/icons";
import { Col, Collapse, Divider, Flex, Row, Space, Typography } from "antd";
import { CSSProperties } from "react";
import { ApiResSearchFlights } from "../model/api_res_model";
import Utils from "../utils/utils";
import FlightBriefDetails from "./brief_details";
const { Title } = Typography;

const titleCSS: CSSProperties = { margin: 0, fontSize: "1.5em" };
const subTitleCSS: CSSProperties = { margin: 0, color: "gray", fontSize: "1em" };

function formatStop(stops: number) {
    if (stops === 0) return "Non-stop";
    else return `${stops} stop`;
}

function getCardLabel(details: ApiResSearchFlights) {
    return <Row gutter={3} justify="center" align="middle" style={{ width: "100%" }}>
        {/* logo */}
        <Col span={2}>
            <img
                src={details.legs[0].carriers.marketing[0].logoUrl}
                alt="NA"
                style={{ maxWidth: "100%", margin: "0 auto" }}
            />
        </Col>

        {/* flight name */}
        <Col span={7}>
            <Space direction="vertical" size="small">
                <Title level={4} style={titleCSS}>{Utils.formatDate(details.legs[0].departure)} - {Utils.formatDate(details.legs[0].arrival)}</Title>
                <Title level={5} style={subTitleCSS}>{details.legs[0].carriers.marketing[0].name}</Title>
            </Space>
        </Col>

        {/* flight duration  */}
        <Col span={4}>
            <Space direction="vertical" size="small">
                <Title level={4} style={titleCSS}>
                    {Utils.calcHoursMins(details.legs[0].durationInMinutes)}
                </Title>
                <Title level={5} style={subTitleCSS}>
                    {details.legs[0].origin.displayCode} - {details.legs[0].destination.displayCode}
                </Title>
            </Space>
        </Col>

        {/* stops */}
        <Col span={4}>
            <Space direction="vertical" size="small">
                <Title level={4} style={titleCSS}>{formatStop(details.legs[0].stopCount)}</Title>
                <Title level={5} style={subTitleCSS}>
                    {
                        details.legs[0].segments.map((_, idx) => {
                            if (idx > 0) {
                                return (<>
                                    {
                                        Utils.calcHoursMins(Number.parseInt(
                                            Utils.calcSegmentTime([
                                                details.legs[0].segments[idx - 1],
                                                details.legs[0].segments[idx]
                                            ])
                                        )) + " " + details.legs[0].segments[idx - 1].destination.displayCode
                                    }
                                    <br />
                                </>);
                            } else {
                                return <></>;
                            }
                        })
                    }
                </Title>
            </Space>
        </Col>

        {/* price */}
        <Col span={4}>
            <Space direction="vertical" size="small">
                <Title level={5} style={titleCSS}>{details.price.formatted}</Title>
            </Space>
        </Col>
    </Row>
}

function mapFlightDetails(details: ApiResSearchFlights) {
    return {
        key: details.id,
        label: getCardLabel(details),
        children: <Flex vertical>
            {
                details.legs[0].segments.map((segment, idx) => {
                    let layover = <></>;
                    if (idx > 0) {
                        layover = <Space size="small" direction="vertical" style={{ marginLeft: "10%" }}>
                            <Divider />
                            <Title level={5} style={{ margin: 0 }}>{
                                Utils.calcHoursMins(Number.parseInt(
                                    Utils.calcSegmentTime([
                                        details.legs[0].segments[idx - 1],
                                        details.legs[0].segments[idx]
                                    ])
                                )) + ` • ${details.legs[0].segments[idx - 1].destination.name} (${details.legs[0].segments[idx - 1].destination.displayCode})`
                            }</Title>
                            <Divider />
                        </Space>
                    }

                    return <>
                        {layover}
                        <FlightBriefDetails segment={segment} />
                    </>
                })
            }
        </Flex>,
    }
}

export default function FlightResult(props: any) {
    if (props.flightDetails?.length > 0) {
        return <Collapse
            items={props.flightDetails.map(mapFlightDetails)}
            expandIcon={_ => <Flex align="center" style={{ height: "5em", padding: "1em", margin: "auto" }}><DownOutlined style={{ fontSize: "2em" }} /></Flex>}
            expandIconPosition="end"
        />;
    } else {
        return <></>;
    }
}