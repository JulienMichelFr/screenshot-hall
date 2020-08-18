import { Component } from '@angular/core';
import AppConfig from '../configuration/app.config';

@Component({
  selector: 'screenshot-hall-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public config: AppConfig) {}
}
