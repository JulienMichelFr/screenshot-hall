import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import AppConfig from '../configuration/app.config';
import config from './../assets/config.json';
import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter() {
          return localStorage.getItem('accessToken');
        },
        allowedDomains: [config.api],
        disallowedRoutes: [`${config.api}/api/auth/login`],
      },
    }),
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
