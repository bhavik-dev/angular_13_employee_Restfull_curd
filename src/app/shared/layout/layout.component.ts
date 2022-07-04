import { Component, OnInit, ChangeDetectorRef, OnDestroy, AfterViewInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { timer } from 'rxjs';
import { Subscription } from 'rxjs';

import { AuthenticationService } from './../../core/services/auth.service';
import { SpinnerService } from '../../core/services/spinner.service';
import { GlobalVariable } from '../classes/globalVariable';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy, AfterViewInit {

    private _mobileQueryListener: () => void;
    mobileQuery: MediaQueryList;
    showSpinner: boolean = false;
    userName: string | null = "";
    isAdmin: boolean = false;

    private autoLogoutSubscription: Subscription = new Subscription;

    constructor(private changeDetectorRef: ChangeDetectorRef,
        private media: MediaMatcher,
        public globalVariable: GlobalVariable,
        public spinnerService: SpinnerService,
        private authService: AuthenticationService) {

        this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        // tslint:disable-next-line: deprecation
        this.mobileQuery.addListener(this._mobileQueryListener);

        this.userName = JSON.stringify(localStorage.getItem('user'));
    }

    ngOnInit(): void {


        // Auto log-out subscription
        // const timer$ = timer(2000, 5000);
        // this.autoLogoutSubscription = timer$.subscribe(() => {
        //     this.authGuard.canActivate();
        // });
    }

    ngOnDestroy(): void {
        // tslint:disable-next-line: deprecation
        this.mobileQuery.removeListener(this._mobileQueryListener);
        this.autoLogoutSubscription.unsubscribe();
    }

    ngAfterViewInit(): void {
        this.changeDetectorRef.detectChanges();
    }

    clearStorage() {
        localStorage.clear();
    }
}
