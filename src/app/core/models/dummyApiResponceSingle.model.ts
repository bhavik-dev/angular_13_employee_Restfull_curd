import { Employee } from "./employee.model";

export class SingleApiResponce {
    status: string;
    message: string;
    data: Employee;

    constructor(data: SingleApiResponce) {
        this.status = data?.status || '';
        this.data = new Employee;
        this.message = data?.message || '';
    }
}