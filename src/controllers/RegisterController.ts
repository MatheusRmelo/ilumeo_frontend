import IRegisterByDay, { IRegisterAttributes } from "../models/RegisterModel";
import ResponsePaginateModel from "../models/responses/ResponsePaginateModel";
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
}