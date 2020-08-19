import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../../services/gallery/gallery.service';
import { Observable } from 'rxjs';
import { IGallery } from '@screenshot-hall/models';

@Component({
  selector: 'screenshot-hall-gallery-list-page',
  templateUrl: './gallery-list-page.component.html',
  styleUrls: ['./gallery-list-page.component.scss'],
})
export class GalleryListPageComponent implements OnInit {
  public galleries$: Observable<IGallery[]>;

  constructor(private galleryService: GalleryService) {}

  ngOnInit(): void {
    this.galleries$ = this.galleryService.getGalleries();
  }
}
