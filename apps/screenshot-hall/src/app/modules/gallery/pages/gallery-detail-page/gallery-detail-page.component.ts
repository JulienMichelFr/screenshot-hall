import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IGallery, IScreenshot } from '@screenshot-hall/models';
import { AuthService } from '../../../auth/services/auth/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../../components/confirm-delete-dialog/confirm-delete-dialog.component';
import { ScreenshotService } from '../../services/screenshot/screenshot.service';

@Component({
  selector: 'screenshot-hall-gallery-detail-page',
  templateUrl: './gallery-detail-page.component.html',
  styleUrls: ['./gallery-detail-page.component.scss'],
})
export class GalleryDetailPageComponent {
  gallery: IGallery;

  isOwner$: Observable<boolean>;
  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private dialog: MatDialog,
    private screenshotService: ScreenshotService
  ) {
    this.gallery = this.route.snapshot.data.gallery;

    this.isOwner$ = auth.user$.pipe(
      map((user) => {
        if (!user) {
          return false;
        }
        return user.id === this.gallery.user.id;
      })
    );
  }

  async removeScreenshot(screenshot: IScreenshot) {
    const dialog = this.dialog.open<ConfirmDeleteDialogComponent>(
      ConfirmDeleteDialogComponent
    );
    try {
      const result = await dialog.afterClosed().toPromise();
      if (!result) {
        return;
      }
      await this.screenshotService.removeScreenshot(screenshot).toPromise();
      this.gallery.screenshots = this.gallery.screenshots.filter(
        (s) => s.id !== screenshot.id
      );
    } catch {}
  }
}
