import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { IGallery } from '@screenshot-hall/models';

@Component({
  selector: 'screenshot-hall-gallery',
  templateUrl: './gallery-card.component.html',
  styleUrls: ['./gallery-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryCardComponent implements OnInit {
  @Input() gallery: IGallery;

  constructor() {}

  ngOnInit(): void {}
}
