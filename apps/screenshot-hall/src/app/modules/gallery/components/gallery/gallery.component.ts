import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { IGallery } from '@screenshot-hall/models';

@Component({
  selector: 'screenshot-hall-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent implements OnInit {
  @Input() gallery: IGallery;

  constructor() {}

  ngOnInit(): void {}
}
