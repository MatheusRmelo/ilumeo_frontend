import axios, { AxiosError, AxiosInstance } from "axios";
import ResponseModel from "../models/responses/ResponseModel";

export default class Controller {
    private client: AxiosInstance;

    constructor(){
        this.client = axios.create({
            baseURL: 'http://localhost:3333',
        });
    }

    protected async get<T>(path: string) : Promise<ResponseModel<T>> {
        try {
            let token : string = localStorage.getItem("token") ?? "";
            var response = await this.client.get(path, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return {
                data: response.data,
                message: 'Sucesso',
                success: true
            }
        }catch(err){
            if(err instanceof AxiosError){
                let response = err.response;
                return {
                    message: response?.data.message ?? err.message,
                    success: false,
                    errors: response?.data.errors ?? [],
                }
            }
            return {
                message: "Falha desconhecida",
                success: false,
            }
        }
    }

    protected async post<T>(path: string, body: any) : Promise<ResponseModel<T>> {
        try {
            let token : string = localStorage.getItem("token") ?? "";
            var response = await this.client.post(path, body, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return {
                data: response.data,
                message: 'Sucesso',
                success: true
            }
        }catch(err){
            if(err instanceof AxiosError){
                let response = err.response;
                return {
                    message: response?.data.message ?? err.message,
                    success: false,
                    errors: response?.data.errors ?? [],
                }
            }
            return {
                message: "Falha desconhecida",
                success: false,
            }
        }
    }
}