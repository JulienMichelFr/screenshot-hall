import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import AppConfig from '../configuration/app.config';
import * as config from './../assets/config.json';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [
    {
      provide: AppConfig,
      useFactory() {
        // @ts-ignore
        return AppConfig.fromPlain(config.default);
      },
      deps: [],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
