import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryCardComponent } from './components/gallery-card/gallery-card.component';
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
import { GalleryDetailPageComponent } from './pages/gallery-detail-page/gallery-detail-page.component';
import { GalleryResolver } from './resolvers/gallery/gallery.resolver';
import { GalleryDetailComponent } from './components/gallery-detail/gallery-detail.component';

@NgModule({
  declarations: [
    GalleryCardComponent,
    GalleryListPageComponent,
    CreateGalleryPageComponent,
    CreateGalleryComponent,
    GalleryDetailPageComponent,
    GalleryDetailComponent,
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
  providers: [GalleryResolver],
  exports: [GalleryListPageComponent, GalleryCardComponent],
})
export class GalleryModule {}
