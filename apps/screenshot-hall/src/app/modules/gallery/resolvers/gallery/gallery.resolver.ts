import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { IGallery } from '@screenshot-hall/models';
import { GalleryService } from '../../services/gallery/gallery.service';
import { Injectable } from '@angular/core';

@Injectable()
export class GalleryResolver implements Resolve<IGallery> {
  constructor(private galleryService: GalleryService) {}

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<IGallery> {
    return await this.galleryService
      .getGalleryById(route.paramMap.get('id'))
      .toPromise();
  }
}
