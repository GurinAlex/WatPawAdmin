import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-anmin-layout',
  templateUrl: './anmin-layout.component.html',
  styleUrls: ['./anmin-layout.component.scss']
})
export class AnminLayoutComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    public auth: AuthService
  ) {
  }

  ngOnInit() {
  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.auth.logout();
  }
}
