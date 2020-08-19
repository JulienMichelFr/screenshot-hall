import { GalleryComponent } from './gallery.component';
import { moduleMetadata } from '@storybook/angular';
import { GalleryModule } from '../../gallery.module';
import { Timestamp } from '../../../../utils';
import { array, select, text } from '@storybook/addon-knobs';
import { GamePlatform } from '../../../../utils/enums/game-platform.enum';

export default {
  title: 'gallery/gallery',
  component: GalleryComponent,
  decorators: [
    moduleMetadata({
      imports: [GalleryModule],
    }),
  ],
};

export const Gallery = () => ({
  component: GalleryComponent,
  props: {
    gallery: {
      createdAt: Timestamp.fromDate(new Date()),
      isPublic: false,
      user: '',
      name: text('Name', 'Gallery Name'),
      id: 'id-123',
      game: text('Game', 'Game name'),
      starredFrom: array('Starrers', []),
      platform: select(
        'Platform',
        [
          GamePlatform.PS4,
          GamePlatform.XONE,
          GamePlatform.SWITCH,
          GamePlatform.PC,
          GamePlatform.OTHER,
        ],
        GamePlatform.PC
      ),
      cover: text(
        'Cover url',
        'https://images.unsplash.com/photo-1512428197675-daae5d4e1e43?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80'
      ),
    },
  },
});
