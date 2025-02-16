import { ArrowRightOutlined, RadiusSettingOutlined, SwapOutlined } from "@ant-design/icons"
import { Space } from "antd";

export const displayTripType = [
    {
        value: "round_trip",
        label: <Space size="small">
            <SwapOutlined /> Round Trip
        </Space>
    },
    {
        value: "one_way",
        label: <Space size="small">
            <ArrowRightOutlined /> One Way
        </Space>
    },
    {
        value: "multi_city",
        label: <Space size="small">
            <RadiusSettingOutlined /> Multi City
        </Space>
    },
];

export const displayClassType = [
    { value: "economy", label: "Economy" },
    { value: "premium_economy", label: "Premium Economy" },
    { value: "business", label: "Business" },
    { value: "first", label: "First" },
];

export const displayPassengerCount = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "10", label: "10" },
]