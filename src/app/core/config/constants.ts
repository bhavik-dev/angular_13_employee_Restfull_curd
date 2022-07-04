import { Injectable } from "@angular/core";
import { IpUrl } from "src/app/shared/enums/ip-url";

@Injectable()
export class Constants {
    private _ROOT_URL: string = "";

    private readonly UAT_URL: string = "http://uat.org:8080";  // Domain for UAT level
    private readonly PRD_URL: string = "http://prd.org:8080";   // Domain for Production level
    private readonly MOCK_URL: string = "http://192.168.6.128:4200";   // Domain for Moke level
    private readonly DEV_URL: string = "http://192.168.6.114:8080";  // Domain for Develpoment phase

    public get ROOT_URL(): string {
        return this._ROOT_URL;
    }

    public set ROOT_URL(v: IpUrl | string) {
        switch (v) {
            case IpUrl.DEV:
                this._ROOT_URL = this.DEV_URL
                break;
            case IpUrl.PRD:
                this._ROOT_URL = this.PRD_URL
                break;
            case IpUrl.UAT:
                this._ROOT_URL = this.UAT_URL
                break;
            case IpUrl.MOCK:
                this._ROOT_URL = this.MOCK_URL
                break;

            default: this._ROOT_URL = this.DEV_URL
                break;
        }
    }

}