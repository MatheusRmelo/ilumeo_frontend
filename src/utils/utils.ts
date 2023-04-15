import { IRegisterAttributes } from "../models/RegisterModel";

export default class Utils {
    public static differenceHoursBetweenDates(dates: Date[]) : string{
        if(dates.length < 2) return "";
        const diffInMs = Math.abs(dates[0].getTime() - dates[dates.length-1].getTime());
        const diffInHrs = diffInMs / 3600000;
        var n = new Date(0,0);
        n.setSeconds(+diffInHrs * 60 * 60);

        return `${parseInt(n.toTimeString().slice(0, 2))}h ${parseInt(n.toTimeString().slice(3, 5))}m`;
    }
}