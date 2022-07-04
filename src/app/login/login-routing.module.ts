import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginScreenComponent } from './login-screen/login-screen.component';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./../dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: '',
    component: LoginScreenComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
