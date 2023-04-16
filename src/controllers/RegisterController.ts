import IRegisterByDay, { IRegisterAttributes } from "../models/RegisterModel";
import ResponsePaginateModel from "../models/responses/ResponsePaginateModel";
import Utils from "../utils/utils";
import Controller from "./Controller";

export default class RegisterController extends Controller {
    constructor(){
        super();
    }

    public async getRegisters(){
        var response = await this.get<ResponsePaginateModel<IRegisterByDay>>(`/registers`);
        return response;
    }

    public async create(status: string){
        var response = await this.post<IRegisterAttributes>(`/registers`, {status});
        return response;
    }

    public currentStatus (day: IRegisterByDay | null) : string {
        if(day == null || day.registers.length == 0) return "entry";
        return day.registers[0].status == 'entry' ? 'leave' : 'entry';
    }

    public getHoursByDay(day: IRegisterByDay) : string {
        let hours: number = 0;
        let entries = day.registers.filter((element)=>element.status == 'entry').sort((a,b)=>a.register_at - b.register_at);
        let leaves = day.registers.filter((element)=>element.status == 'leave').sort((a,b)=>a.register_at - b.register_at);
        for(let i=0;i<leaves.length;i++){
            hours += Utils.differenceHoursBetweenDates(new Date(entries[i].register_at), new Date(leaves[i].register_at));
        }
        if(entries.length > leaves.length){
            if(!this.isCurrentDay(day.day)){
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

    public isCurrentDay(day: string) : boolean {
        return day == new Date().toLocaleDateString('pt-BR');
    }

    public isInProgress(registers: IRegisterAttributes[]) : boolean {
        let entries = registers.filter((element)=>element.status == 'entry');
        let leaves = registers.filter((element)=>element.status == 'leave');
        return entries.length > leaves.length;
    }
}