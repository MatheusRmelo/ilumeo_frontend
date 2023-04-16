export default interface ResponseModel<T> {
    data?: T|null,
    success: boolean,
    message: string,
    errors?: ResponseError[] | null,
    status: number,
}

interface ResponseError {
    message: string,
    code: string,
}