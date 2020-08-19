import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SignUpDTO } from '@screenshot-hall/models';

@Component({
  selector: 'screenshot-hall-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent implements OnInit, OnDestroy {
  public error: string | null = null;
  public loading = false;

  public email = '';
  public displayName = '';
  public password = '';
  public confirmPassword = '';

  private sub: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router) {}

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public submit(form: SignUpDTO): void {
    this.loading = true;
    this.error = null;
    this.sub.add(
      this.authService.signUp(form).subscribe(
        () => {
          this.router.navigate(['']).catch();
        },
        (error) => {
          this.loading = false;
          this.error = error?.code ?? '';
        }
      )
    );
  }
}
