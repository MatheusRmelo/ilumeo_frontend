import ResponseUserGetByCodeModel from "../models/responses/ResponseUserGetByCodeModel";
import Controller from "./Controller";

export default class AuthController extends Controller {
    constructor(){
        super();
    }

    public async getUserByCode(code: string){
        var response = await this.get<ResponseUserGetByCodeModel>(`/users/${code}`);
        if(response.success){
            localStorage.setItem('token', response.data!.token);
            localStorage.setItem('code', code);
        }
        return response;
    }
}