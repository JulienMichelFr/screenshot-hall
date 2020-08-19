import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SignInDTO } from '@screenshot-hall/models';

@Component({
  selector: 'screenshot-hall-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss'],
})
export class SigninPageComponent implements OnInit, OnDestroy {
  public error: string | null = null;
  public loading = false;
  public email: string;
  public password: string;

  private sub: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router) {}

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public async submit(credentials: SignInDTO): Promise<void> {
    this.loading = true;
    this.error = null;
    try {
      await this.authService.signIn(credentials);
    } catch (error) {
      this.error = error?.error;
    }
    this.loading = false;
  }
}
