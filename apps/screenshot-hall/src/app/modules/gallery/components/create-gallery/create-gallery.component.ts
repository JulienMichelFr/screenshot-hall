import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { CreateGalleryDTO } from '@screenshot-hall/models';

@Component({
  selector: 'screenshot-hall-create-gallery',
  templateUrl: './create-gallery.component.html',
  styleUrls: ['./create-gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateGalleryComponent implements OnInit {
  gallery = new CreateGalleryDTO();

  @Output() create: EventEmitter<CreateGalleryDTO> = new EventEmitter<
    CreateGalleryDTO
  >();

  constructor() {}

  ngOnInit(): void {}
}
