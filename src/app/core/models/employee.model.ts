import { EmployeeInterface } from "../interfaces/employee.interface";

export class Employee {
    id: number;
    employee_name: string;
    employee_salary: number;
    employee_age: number;
    profile_image: string;

    constructor(data?: EmployeeInterface) {
        this.id = data?.id || -1
        this.employee_name = data?.employee_name || '';
        this.employee_salary = data?.employee_salary || -1;
        this.employee_age = data?.employee_age || -1;
        this.profile_image = data?.profile_image || '';
    }
}