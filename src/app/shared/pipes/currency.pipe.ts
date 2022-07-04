import { Pipe, PipeTransform } from '@angular/core';
import { GlobalVariable } from '../classes/globalVariable';

@Pipe({ name: 'currencyPipe' })
export class CurrencyPipe implements PipeTransform {

    constructor(public globalVariable: GlobalVariable) { }

    transform(salary: number): string {
        if (this.globalVariable.newViewEditDeleteApplication != 1 && salary != null)
            return salary.toString();
        else
            return this.getLocalVal(salary);
    }

    // Indian Currency Formeter
    getLocalVal(amount: number): string {
        if (amount == undefined) return amount;
        else return `${amount.toLocaleString('en-US')}.00`
    };
}