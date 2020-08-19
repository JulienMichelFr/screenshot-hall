import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { IGallery } from '@screenshot-hall/models';

@Component({
  selector: 'screenshot-hall-gallery-detail',
  templateUrl: './gallery-detail.component.html',
  styleUrls: ['./gallery-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryDetailComponent {
  @Input() gallery: IGallery;

  constructor() {}
}
