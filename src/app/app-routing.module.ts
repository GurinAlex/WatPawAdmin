import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AnminLayoutComponent} from './shared/components/anmin-layout/anmin-layout.component';
import {LoginComponent} from './auth/login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from './shared/services/auth.guard';
import {UsersComponent} from './users/users.component';
import {AcceptedPostsComponent} from './accepted-posts/accepted-posts.component';


const routes: Routes = [
  // {
  //   path: '', component: AnminLayoutComponent, children: [
  //     {path: '', redirectTo: '/', pathMatch: 'full'},
  //     {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
  //     {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  //     {path: 'posts', component: AcceptedPostsComponent, canActivate: [AuthGuard]},
  //     {path: 'login', component: LoginComponent},
  //   ]
  // }
  {
    path: '', component: AnminLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: LoginComponent},
      {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
      {path: 'posts', component: AcceptedPostsComponent, canActivate: [AuthGuard]},
      {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
