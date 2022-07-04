import { EmployeeInterface } from "../interfaces/employee.interface";

export class NewEmployee {
    id: number;
    name: string;
    salary: number;
    age: number;

    constructor(data?: NewEmployee) {
        this.id = data?.id || -1
        this.name = data?.name || '';
        this.salary = data?.salary || -1;
        this.age = data?.age || -1;
    }
}