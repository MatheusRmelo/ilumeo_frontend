
export default class Utils {
    public static differenceHoursBetweenDates(start: Date, end: Date) : number{
        const diffInMs = Math.abs(start.getTime() - end.getTime());
        const diffInHrs = diffInMs / 3600000;
        return diffInHrs;
    }
}

