import IRegisterByDay, { IRegisterAttributes } from "../models/RegisterModel";

export default class Utils {
    public static differenceHoursBetweenDates(start: Date, end: Date) : number{
        const diffInMs = Math.abs(start.getTime() - end.getTime());
        const diffInHrs = diffInMs / 3600000;
        return diffInHrs;
    }

    public static getHoursByDay(day: IRegisterByDay) : string {
        let hours: number = 0;
        let entries = day.registers.filter((element)=>element.status == 'entry').sort((a,b)=>a.register_at - b.register_at);
        let leaves = day.registers.filter((element)=>element.status == 'leave').sort((a,b)=>a.register_at - b.register_at);
        for(let i=0;i<leaves.length;i++){
            hours += Utils.differenceHoursBetweenDates(new Date(entries[i].register_at), new Date(leaves[i].register_at));
        }
        if(entries.length > leaves.length){
            if(!Utils.isCurrentDay(day.day)){
                const endOfDay = new Date(entries[entries.length-1].register_at);
                endOfDay.setHours(23, 59, 59, 999);
                hours += Utils.differenceHoursBetweenDates(new Date(entries[entries.length-1].register_at), endOfDay);
            }else{
                hours += Utils.differenceHoursBetweenDates(new Date(entries[entries.length-1].register_at), new Date());
            }
        }
        var n = new Date(0,0);
        n.setSeconds(+hours * 60 * 60);

        return `${parseInt(n.toTimeString().slice(0, 2))}h ${parseInt(n.toTimeString().slice(3, 5))}m`
    }

    public static isCurrentDay(day: string) : boolean {
        return day == new Date().toLocaleDateString('pt-BR');
    }

    public static isInProgress(registers: IRegisterAttributes[]) : boolean {
        let entries = registers.filter((element)=>element.status == 'entry');
        let leaves = registers.filter((element)=>element.status == 'leave');
        return entries.length > leaves.length;
    }
}

