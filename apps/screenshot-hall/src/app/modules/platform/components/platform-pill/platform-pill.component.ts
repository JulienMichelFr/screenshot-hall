import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IPlatform } from '@screenshot-hall/models';
import { PlatformService } from '../../services/platform/platform.service';

@Component({
  selector: 'screenshot-hall-platform-pill',
  templateUrl: './platform-pill.component.html',
  styleUrls: ['./platform-pill.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlatformPillComponent {
  @Input() platform: IPlatform;

  constructor(private platformService: PlatformService) {}

  get color(): string {
    return this.platformService.findColor(this.platform);
  }

  get name(): string {
    return this.platformService.findShortName(this.platform);
  }
}
