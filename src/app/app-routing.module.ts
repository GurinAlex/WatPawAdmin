import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AnminLayoutComponent} from './shared/components/anmin-layout/anmin-layout.component';
import {LoginComponent} from './auth/login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from './shared/services/auth.guard';
import {UsersComponent} from './users/users.component';


const routes: Routes = [
  {
    path: '', component: AnminLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
      {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
      {path: 'login', component: LoginComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
