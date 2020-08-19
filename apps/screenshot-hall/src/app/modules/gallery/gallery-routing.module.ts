import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryListPageComponent } from './pages/gallery-list-page/gallery-list-page.component';
import { CreateGalleryPageComponent } from './pages/create-gallery-page/create-gallery-page.component';
import { SignedInGuard } from '../../guards/signed-in/signed-in.guard';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GalleryRoutingModule {}
