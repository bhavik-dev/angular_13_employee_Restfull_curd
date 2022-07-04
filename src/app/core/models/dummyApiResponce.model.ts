import { Employee } from "./employee.model";

export class ApiResponce {
    status: string;
    message: string;
    data: Employee[];

    constructor(data: ApiResponce) {
        this.status = data?.status || '';
        this.data = [];
        this.message = data?.message || '';
    }
}