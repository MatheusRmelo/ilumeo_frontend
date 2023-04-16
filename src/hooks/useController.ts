import Controller from "../controllers/Controller";

export default function useController<T extends Controller>(type: { new(): T ;} ): T{
    return new type();
}