
export default interface IRegisterByDay {
    day: string,
    registers: IRegisterAttributes[],
}
export interface IRegisterAttributes {
    id: number,
    usercode: string,
    status: string,
    register_at: string,
}