import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './components/gallery/gallery.component';
import { GalleryListPageComponent } from './pages/gallery-list-page/gallery-list-page.component';
import { MatCardModule } from '@angular/material/card';
import { GalleryRoutingModule } from './gallery-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { CreateGalleryPageComponent } from './pages/create-gallery-page/create-gallery-page.component';
import { CreateGalleryComponent } from './components/create-gallery/create-gallery.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    GalleryComponent,
    GalleryListPageComponent,
    CreateGalleryPageComponent,
    CreateGalleryComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    GalleryRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [GalleryListPageComponent, GalleryComponent],
})
export class GalleryModule {}
