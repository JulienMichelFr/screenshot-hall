import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryListPageComponent } from './pages/gallery-list-page/gallery-list-page.component';
import { CreateGalleryPageComponent } from './pages/create-gallery-page/create-gallery-page.component';
import { SignedInGuard } from '../../guards/signed-in/signed-in.guard';
import { GalleryDetailPageComponent } from './pages/gallery-detail-page/gallery-detail-page.component';
import { GalleryResolver } from './resolvers/gallery/gallery.resolver';

const routes: Routes = [
  {
    path: '',
    component: GalleryListPageComponent,
  },
  {
    path: 'new',
    component: CreateGalleryPageComponent,
    canActivate: [SignedInGuard],
  },
  {
    path: ':id',
    component: GalleryDetailPageComponent,
    resolve: {
      gallery: GalleryResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GalleryRoutingModule {}
