import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import AppConfig from '../configuration/app.config';
import config from './../assets/config.json';
import { JwtModule } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './modules/auth/auth.module';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { TOKEN_KEY } from '../utils/constantes';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [AppComponent, NavbarComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter() {
          return localStorage.getItem(TOKEN_KEY);
        },
        allowedDomains: [config.api.replace(/https?:\/\//, '')],
        disallowedRoutes: [`${config.api}/api/auth/login`],
      },
    }),
    BrowserAnimationsModule,
    AuthModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  providers: [
    {
      provide: AppConfig,
      useFactory() {
        return AppConfig.fromPlain(config);
      },
      deps: [],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
