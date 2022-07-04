import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const appRoutes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'dashboard/new-employee',
    loadChildren: () => import('./view-employee/view-employee.module').then(m => m.ViewEmployeeModule)
  },
  {
    path: 'dashboard/view-employee/:id',
    loadChildren: () => import('./view-employee/view-employee.module').then(m => m.ViewEmployeeModule)
  },
  {
    path: 'dashboard/edit-employee/:id',
    loadChildren: () => import('./view-employee/view-employee.module').then(m => m.ViewEmployeeModule)
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
