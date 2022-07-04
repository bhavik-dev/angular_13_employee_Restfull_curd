import { NewEmployee } from "./newEmployee.model";

export class SingleNewApiResponce {
    status: string;
    message: string;
    data: NewEmployee;

    constructor(data: SingleNewApiResponce) {
        this.status = data?.status || '';
        this.data = new NewEmployee;
        this.message = data?.message || '';
    }
}