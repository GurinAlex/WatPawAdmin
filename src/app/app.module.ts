import { BrowserModule } from '@angular/platform-browser';
import {NgModule, Provider} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnminLayoutComponent } from './shared/components/anmin-layout/anmin-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AlertComponent} from './shared/components/alert/alert.component';
import {SharedModule} from './shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthGuard} from './shared/services/auth.guard';
import {registerLocaleData} from '@angular/common';
import ruLocale from '@angular/common/locales/ru';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './shared/auth.interceptor';
import {SearchPipe} from './shared/search.pipe';
import { UsersComponent } from './users/users.component';
import {AlertService} from './shared/services/alert.service';
import { AcceptedPostsComponent } from './accepted-posts/accepted-posts.component';


registerLocaleData(ruLocale, 'ru');

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
};

@NgModule({
  declarations: [
    SearchPipe,
    AppComponent,
    AnminLayoutComponent,
    LoginComponent,
    DashboardComponent,
    AlertComponent,
    UsersComponent,
    AcceptedPostsComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AuthGuard, INTERCEPTOR_PROVIDER, AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
