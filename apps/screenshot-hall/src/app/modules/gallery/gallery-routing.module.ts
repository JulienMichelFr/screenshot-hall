import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryListPageComponent } from './pages/gallery-list-page/gallery-list-page.component';

const routes: Routes = [
  {
    path: '',
    component: GalleryListPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GalleryRoutingModule {}
