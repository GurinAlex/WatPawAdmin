import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AuthInterceptor} from '../../shared/auth.interceptor';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  message = '';
  error: any;
  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.auth.logout();
    this.route.queryParams.subscribe((params: Params) => {
      // if (params['loginAgain']) {
      //   this.message = 'Пожалуйста, введите данные'
      // } else
        if (params['authFailed']) {
        this.message = 'Сессия истекла. Введите данные заново';
      }
    });

    this.form = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
      ]),
      password: new FormControl(null, [
        Validators.required,
        // Validators.minLength(6)
      ])
    })
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    if (this.message === 'Извините, вы не кролик') {
      this.message = '';
    }
    if (this.message === 'Неверный логин или пароль') {
      this.message = '';
    }
    this.submitted = true;

    const user: User = {
      username: this.form.value.username,
      password: this.form.value.password
    };
    if (user.username !== 'rabbit') {
      this.form.reset();
      this.submitted = false;
      this.message = 'Извините, вы не кролик';
    } else {
      this.error = this.auth.error$;
      if (this.error) {
        this.submitted = false;
      }
      this.auth.login(user).subscribe((response) => {
        this.form.reset();
        this.router.navigate(['/dashboard']);
        this.submitted = false;
      }, () => {
        this.submitted = false;
      });
    }
  }

}
