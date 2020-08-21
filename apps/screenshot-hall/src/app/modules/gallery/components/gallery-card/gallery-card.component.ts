import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IGallery } from '@screenshot-hall/models';

@Component({
  selector: 'screenshot-hall-gallery',
  templateUrl: './gallery-card.component.html',
  styleUrls: ['./gallery-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryCardComponent {
  @Input() gallery: IGallery;

  get cover(): string {
    const res = `url('${this.gallery.cover.files.small.url}')`;
    console.log({ res });
    return res;
  }
}
