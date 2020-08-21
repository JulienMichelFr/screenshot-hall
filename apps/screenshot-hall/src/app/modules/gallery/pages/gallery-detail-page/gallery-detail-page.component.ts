import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IGallery } from '@screenshot-hall/models';
import { AuthService } from '../../../auth/services/auth/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'screenshot-hall-gallery-detail-page',
  templateUrl: './gallery-detail-page.component.html',
  styleUrls: ['./gallery-detail-page.component.scss'],
})
export class GalleryDetailPageComponent {
  gallery: IGallery;

  isOwner$: Observable<boolean>;
  constructor(private route: ActivatedRoute, private auth: AuthService) {
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
}
