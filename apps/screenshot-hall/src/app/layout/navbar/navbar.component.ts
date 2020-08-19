import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../modules/auth/services/auth/auth.service';
import { Observable } from 'rxjs';
import { IUser } from '@screenshot-hall/models';

@Component({
  selector: 'screenshot-hall-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  loggedIn$: Observable<boolean> = this.auth.loggedIn$;
  profile$: Observable<IUser> = this.auth.user$;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}
}
