import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import AppConfig from '../../../../../configuration/app.config';
import { IGallery } from '@screenshot-hall/models';
import { AuthService } from '../../../auth/services/auth/auth.service';
import * as UppyCore from '@uppy/core';
import Dashboard from '@uppy/dashboard';
import StatusBar from '@uppy/status-bar';
import XHRUpload from '@uppy/xhr-upload';

@Component({
  selector: 'screenshot-hall-upload-screenshot',
  templateUrl: './upload-screenshot.component.html',
  styleUrls: ['./upload-screenshot.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UploadScreenshotComponent
  implements OnInit, OnChanges, AfterViewInit {
  @Input()
  gallery: IGallery;
  uploader: UppyCore.Uppy<UppyCore.StrictTypes>;

  public readonly divId = 'file-upload';

  get endpoint(): string {
    return `${this.config.api}/api/galleries/${this.gallery?.id}/screenshots`;
  }

  constructor(private readonly config: AppConfig, private auth: AuthService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {}

  ngAfterViewInit() {
    this.uploader = new UppyCore.Uppy<UppyCore.StrictTypes>()
      .use(Dashboard, {
        trigger: '#' + this.divId,
      })
      .use(StatusBar)
      .use(XHRUpload, {
        endpoint: this.endpoint,
        formData: true,
        fieldName: 'files',
        headers: {
          Authorization: `Bearer ${this.auth.token}`,
        },
      });
  }
}
