import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { LimitToPipe } from './pipes/limit-to.pipe';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ContentPlaceholderAnimationComponent } from './content-placeholder-animation/content-placeholder-animation.component';
import { LocalDatePipe } from './pipes/local-date.pipe';
import { YesNoPipe } from './pipes/yes-no.pipe';
import { LayoutComponent } from './layout/layout.component';
import { GlobalVariable } from './classes/globalVariable';
import { CommonFunctions } from './common-functions/commonFunctions';
import { CustomPipe } from './pipes/custom.pipe';
import { CurrencyPipe } from './pipes/currency.pipe';
import { ElementHighlightDirective } from './directives/element-highlight.directive';

@NgModule({
  imports: [
    RouterModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  declarations: [
    ConfirmDialogComponent,
    ContentPlaceholderAnimationComponent,
    LimitToPipe,
    LocalDatePipe,
    CustomPipe,
    CurrencyPipe,
    YesNoPipe,
    LayoutComponent,
    ElementHighlightDirective,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CustomMaterialModule,
    LimitToPipe,
    ConfirmDialogComponent,
    CurrencyPipe,
    CustomPipe,
    ContentPlaceholderAnimationComponent,
    LocalDatePipe,
    YesNoPipe,
    ElementHighlightDirective
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  providers: [GlobalVariable, CommonFunctions]
})
export class SharedModule { }
