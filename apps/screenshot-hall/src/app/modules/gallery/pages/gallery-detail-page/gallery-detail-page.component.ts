import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IGallery } from '@screenshot-hall/models';

@Component({
  selector: 'screenshot-hall-gallery-detail-page',
  templateUrl: './gallery-detail-page.component.html',
  styleUrls: ['./gallery-detail-page.component.scss'],
})
export class GalleryDetailPageComponent {
  gallery: IGallery;
  constructor(private route: ActivatedRoute) {
    this.gallery = this.route.snapshot.data.gallery;
  }
}
