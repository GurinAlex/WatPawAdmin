import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../shared/posts.service';
import {Post} from '../shared/interfaces';
import {Subscription} from 'rxjs';
import {AlertService} from '../shared/services/alert.service';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'app-accepted-posts',
  templateUrl: './accepted-posts.component.html',
  styleUrls: ['./accepted-posts.component.scss']
})
export class AcceptedPostsComponent implements OnInit, OnDestroy {

  posts: Post[];
  rSub: Subscription;
  pSub: Subscription;
  aSub: Subscription;
  dSub: Subscription;
  searchStr = '';
  constructor(
    private postsService: PostsService,
    private alert: AlertService,
    private auth: AuthService
  ) {
  }
  ngOnInit() {
    this.pSub = this.postsService.getAllAccepted().subscribe(posts => {
      this.posts = posts;
    });
  }
  removePost(id: number) {
    this.dSub = this.postsService.removeAdmin(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
      this.alert.danger('Пост был удален');
    });
  }
  removeUser(username: string) {
    this.rSub = this.postsService.removeUser(username).subscribe(() => {
      this.alert.danger('Пользователь был удален');
    });
  }
  approved(id: number) {
    this.aSub = this.postsService.approve(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
      this.alert.success('Пост был одобрен');
    });
  }
  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }

    if (this.dSub) {
      this.dSub.unsubscribe();
    }
  }
}
