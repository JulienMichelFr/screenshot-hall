import { Component } from '@angular/core';
import { UpdateService } from './services/update/update.service';

@Component({
  selector: 'screenshot-hall-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private updateService: UpdateService) {}
}
