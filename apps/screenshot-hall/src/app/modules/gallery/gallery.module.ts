import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './components/gallery/gallery.component';
import { GalleryListPageComponent } from './pages/gallery-list-page/gallery-list-page.component';
import { MatCardModule } from '@angular/material/card';
import { GalleryRoutingModule } from './gallery-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  declarations: [GalleryComponent, GalleryListPageComponent],
  imports: [
    CommonModule,
    MatCardModule,
    GalleryRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
  ],
  exports: [GalleryListPageComponent, GalleryComponent],
})
export class GalleryModule {}
