import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninPageComponent } from './pages/signin-page/signin-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';

const routes: Routes = [
  {
    path: 'signin',
    component: SigninPageComponent,
  },
  {
    path: 'signup',
    component: SignupPageComponent,
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
