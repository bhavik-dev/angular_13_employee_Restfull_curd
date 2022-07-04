export class CommonFunctions {
    public validateNumber(e: any) {
        let input = String.fromCharCode(e.charCode);
        const reg = /^\d*(?:[.,]\d{1,2})?$/;
        if (!reg.test(input)) {
            e.preventDefault();
        }
    }

    public decimalFilter(event: any) {
        let input = event.target.value + String.fromCharCode(event.charCode);
        const reg = /^\d*(\.\d{0,2})?$/;
        if (!reg.test(input)) {
            event.preventDefault();
        }
     }
}