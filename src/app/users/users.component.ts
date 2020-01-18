import { Component, OnInit } from '@angular/core';
import {PostsService} from '../shared/posts.service';
import {Post, User} from '../shared/interfaces';
import {Subscription} from 'rxjs';
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  pSub: Subscription;
  dSub: Subscription;
  searchStr = '';
  constructor(
    private postService: PostsService,
    private alert: AlertService,
  ) { }

  ngOnInit() {
    this.pSub = this.postService.getUsersList().subscribe((data) => {
      this.users = data;
    });
  }

  remove(username: string) {
    this.dSub = this.postService.removeUser(username).subscribe(() => {
      this.users = this.users.filter(post => post.username !== username);
    });
  }

}
