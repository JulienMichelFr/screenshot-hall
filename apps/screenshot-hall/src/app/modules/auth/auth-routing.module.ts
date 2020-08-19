import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninPageComponent } from './pages/signin-page/signin-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { NotSignedInGuard } from '../../guards/not-signed-in/not-signed-in.guard';

const routes: Routes = [
  {
    path: 'signin',
    component: SigninPageComponent,
    canActivate: [NotSignedInGuard],
  },
  {
    path: 'signup',
    component: SignupPageComponent,
    canActivate: [NotSignedInGuard],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'signin',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
