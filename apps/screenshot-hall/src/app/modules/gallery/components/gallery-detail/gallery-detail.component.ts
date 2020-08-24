import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IGallery, IScreenshot } from '@screenshot-hall/models';

@Component({
  selector: 'screenshot-hall-gallery-detail',
  templateUrl: './gallery-detail.component.html',
  styleUrls: ['./gallery-detail.component.scss'],
})
export class GalleryDetailComponent {
  @Input() gallery: IGallery;
  @Input() isOwner = false;

  @Output() removeScreenshot: EventEmitter<IScreenshot> = new EventEmitter<
    IScreenshot
  >();

  constructor() {}
}
