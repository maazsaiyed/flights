import { Space, Timeline, Typography } from "antd";
import Utils from "../utils/utils";

const { Text } = Typography;

export default function FlightBriefDetails(props: any) {
    return (
        <Space size="small" direction="vertical" style={{ paddingTop: "5%", marginLeft: "10%" }}>
            <Timeline
                items={[
                    {
                        color: "gray",
                        children: <Text style={{ fontSize: "1.25em", fontWeight: 600 }}>
                            {Utils.formatDate(props.segment.departure)} {props.segment.origin.name}
                        </Text>
                    },
                    {
                        color: "none",
                        children: <Space size="large">
                            <Text style={{ fontSize: "1em", fontWeight: 400 }}>
                                Travel time: {props.segment.durationInMinutes} min
                            </Text>
                            <Text style={{ fontSize: "1em", fontWeight: 400 }}>
                                {props.segment.operatingCarrier.name}
                            </Text>
                        </Space>
                    },
                    {
                        color: "gray",
                        children: <Text style={{ fontSize: "1.25em", fontWeight: 600 }}>
                            {Utils.formatDate(props.segment.arrival)} {props.segment.destination.name}
                        </Text>
                    },
                ]}
            />
        </Space>
    );
}