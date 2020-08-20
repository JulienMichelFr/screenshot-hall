import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformPillComponent } from './components/platform-pill/platform-pill.component';

@NgModule({
  declarations: [PlatformPillComponent],
  imports: [CommonModule],
  exports: [PlatformPillComponent],
})
export class PlatformModule {}
