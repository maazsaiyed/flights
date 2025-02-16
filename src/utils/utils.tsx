import dayjs from "dayjs";

export default class Utils {
    static formatDate(dateString: string): string {
        return dayjs(dateString).format("HH:mm");
    }

    static calcHoursMins(minutes: number): string {
        try {
            const hour: number = Math.floor(minutes / 60);
            return (hour > 0)
                ? `${hour} hr ${minutes % 60} min`
                : `${minutes} mins`;
        } catch (err) {
            console.error(err);
        }
        return `${minutes} min`;
    }

    static calcSegmentTime(segment: any[]): string {
        try {
            const first = dayjs(segment[0].arrival);
            const second = dayjs(segment[1].departure);
            return second.diff(first, "minutes", false).toString();
        } catch (err) {
            console.error(err);
        }
        return "";
    }
}