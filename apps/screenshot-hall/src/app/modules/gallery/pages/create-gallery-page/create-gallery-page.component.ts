import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../../services/gallery/gallery.service';
import { CreateGalleryDTO, IGallery } from '@screenshot-hall/models';
import { Router } from '@angular/router';

@Component({
  selector: 'screenshot-hall-create-gallery-page',
  templateUrl: './create-gallery-page.component.html',
  styleUrls: ['./create-gallery-page.component.scss'],
})
export class CreateGalleryPageComponent implements OnInit {
  constructor(private galleryService: GalleryService, private router: Router) {}

  ngOnInit(): void {}

  async create(createGalleryDTO: CreateGalleryDTO): Promise<boolean> {
    const gallery: IGallery = await this.galleryService
      .createGallery(createGalleryDTO)
      .toPromise();
    return this.router.navigate(['/galleries', gallery.id]);
  }

  async cancel(): Promise<boolean> {
    return this.router.navigate(['/galleries']);
  }
}
