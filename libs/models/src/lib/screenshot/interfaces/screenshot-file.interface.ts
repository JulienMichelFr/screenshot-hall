import { ScreenshotSize } from '@screenshot-hall/models';

export interface IScreenshotFile {
  filename: string;
  mimetype?: string;
  url?: string;
  size: ScreenshotSize;
}

export type SmallScreenshotFile = IScreenshotFile & {
  size: ScreenshotSize.SMALL;
};
export type MediumScreenshotFile = IScreenshotFile & {
  size: ScreenshotSize.MEDIUM;
};
export type LargeScreenshotFile = IScreenshotFile & {
  size: ScreenshotSize.LARGE;
};
export type OriginalScreenshotFile = IScreenshotFile & {
  size: ScreenshotSize.ORIGINAL;
};

export interface ScreenshotFiles {
  small: SmallScreenshotFile;
  medium: MediumScreenshotFile;
  large: LargeScreenshotFile;
  original: OriginalScreenshotFile;
}
