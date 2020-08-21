import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { CreateGalleryDTO, IGame } from '@screenshot-hall/models';

@Component({
  selector: 'screenshot-hall-create-gallery',
  templateUrl: './create-gallery.component.html',
  styleUrls: ['./create-gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateGalleryComponent implements OnInit {
  gallery = new CreateGalleryDTO();
  game: any;

  @Output() create: EventEmitter<CreateGalleryDTO> = new EventEmitter<
    CreateGalleryDTO
  >();

  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  setName(game: IGame): void {
    if (!this.gallery.name?.length) {
      this.gallery.name = game?.name;
    }
  }
}
