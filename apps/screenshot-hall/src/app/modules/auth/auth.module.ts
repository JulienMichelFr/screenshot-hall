import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmPasswordDirective } from './directives/confirm-password/confirm-password.directive';
import { SigninPageComponent } from './pages/signin-page/signin-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { AuthErrorPipe } from './pipes/signup-error/signup-error.pipe';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    SigninPageComponent,
    SignupPageComponent,
    ConfirmPasswordDirective,
    AuthErrorPipe,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
  ],
})
export class AuthModule {}
