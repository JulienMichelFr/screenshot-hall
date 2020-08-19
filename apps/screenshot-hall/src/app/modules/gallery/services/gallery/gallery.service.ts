import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import AppConfig from '../../../../../configuration/app.config';
import { IGallery } from '@screenshot-hall/models';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private readonly endpoint = `${this.config.api}/api/galleries`;

  constructor(private http: HttpClient, private config: AppConfig) {}

  public getGalleries(): Observable<IGallery[]> {
    return this.http.get<IGallery[]>(this.endpoint);
  }

  /*public getGalleryById(id: string): Observable<IGallery> {
    return this.collection.doc<IGallery>(id);
  }*/

  /*public async createGallery({
    name,
    game,
    isPublic,
  }: Partial<IGallery>): Promise<void> {
    const { uid }: User = await this.afa.currentUser;
    const id: string = this.createId();
    const createdAt = Timestamp.now();
    const result: IGallery = {
      id,
      name,
      isPublic,
      game,
      user: uid,
      createdAt,
      starredFrom: [],
    };
    return this.getGalleryById(id).set(result);
  }*/

  /*public updateGallery(
    id: string,
    { name, isPublic, game }: IGallery
  ): Promise<void> {
    return this.getGalleryById(id).update({ name, isPublic, game });
  }

  private createId(): string {
    return this.afs.createId();
  }*/
}
