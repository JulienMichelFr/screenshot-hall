import { Injectable } from '@angular/core';
import { IPlatform } from '@screenshot-hall/models';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  constructor() {}

  findColor(platform: IPlatform): string {
    switch (platform?.id) {
      default:
        return '#ccc';
    }
  }

  findShortName(platform: IPlatform): string {
    switch (platform?.id) {
      default:
        return platform?.name ?? '';
    }
  }
}
