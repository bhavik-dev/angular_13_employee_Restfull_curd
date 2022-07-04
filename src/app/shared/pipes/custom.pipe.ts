import { Pipe, PipeTransform } from '@angular/core';
import { GlobalVariable } from '../classes/globalVariable';

@Pipe({ name: 'customPipe' })
export class CustomPipe implements PipeTransform {

    constructor(public globalVariable: GlobalVariable) { }

    transform(age: number): string {
        if (this.globalVariable.newViewEditDeleteApplication != 1 && age != null)
            return age.toString();
        else
            return age + ' years old';
    }
}