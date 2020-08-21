import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import AppConfig from '../../../../../configuration/app.config';
import { IGallery } from '@screenshot-hall/models';
import { AngularFileUploaderConfig } from 'angular-file-uploader';
import { AuthService } from '../../../auth/services/auth/auth.service';

@Component({
  selector: 'screenshot-hall-upload-screenshot',
  templateUrl: './upload-screenshot.component.html',
  styleUrls: ['./upload-screenshot.component.scss'],
})
export class UploadScreenshotComponent implements OnInit, OnChanges {
  @Input()
  gallery: IGallery;

  get endpoint(): string {
    return `${this.config.api}/api/galleries/${this.gallery?.id}/screenshots`;
  }

  uploaderConfig: AngularFileUploaderConfig = {
    multiple: true,
    formatsAllowed: '.jpg,.png,.jpeg',
    uploadAPI: {
      url: this.endpoint,
      headers: {
        Authorization: `Bearer ${this.auth.token}`,
      },
    },
    fileNameIndex: false,
  };

  constructor(private readonly config: AppConfig, private auth: AuthService) {}

  ngOnInit() {
    this.uploaderConfig.uploadAPI.url = this.endpoint;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (changes?.gallery?.currentValue?.id) {
      this.uploaderConfig.uploadAPI.url = this.endpoint;
    }
  }
}
