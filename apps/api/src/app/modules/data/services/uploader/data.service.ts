import { Injectable } from '@nestjs/common';
import { Client as MinioClient } from 'minio';
import { AppConfig } from '../../../../../configuration/app.config';
import { IFile } from '../../../../utils/interfaces/file';
import { v4 } from 'uuid';
import { Readable as ReadableStream } from 'stream';
import { ResizeOptions } from 'sharp';
import { ScreenshotSize, ScreenshotFiles } from '@screenshot-hall/models';
import sharp = require('sharp');
import { extension } from 'mime-types';

@Injectable()
export class DataService {
  private readonly minioClient: MinioClient;

  constructor(private readonly config: AppConfig) {
    this.minioClient = new MinioClient({ ...config.minio, useSSL: false });
  }

  async uploadScreenshot(
    bucket: string,
    file: IFile
  ): Promise<ScreenshotFiles> {
    if (!(await this.minioClient.bucketExists(bucket))) {
      await this.minioClient.makeBucket(bucket, '');
    }
    return this.uploadImages(file, bucket);
  }

  async resize(image: Buffer, resizeOptions?: ResizeOptions): Promise<Buffer> {
    return await sharp(image).resize(resizeOptions).toBuffer();
  }

  async downloadScreenshot(bucket, filename): Promise<ReadableStream> {
    return this.minioClient.getObject(bucket, filename);
  }

  private async uploadImages(
    file: IFile,
    bucket: string
  ): Promise<ScreenshotFiles> {
    const id = v4().toString();
    const filenames = this.getFilename(file, id);
    await Promise.all([
      this.resize(file.buffer, {
        width: 300,
        height: 300,
      }).then((img: Buffer) => this.uploadImage(bucket, filenames.small, img)),
      this.resize(file.buffer, { width: 600 }).then((img: Buffer) =>
        this.uploadImage(bucket, filenames.medium, img)
      ),
      this.resize(file.buffer, { width: 1920 }).then((img: Buffer) =>
        this.uploadImage(bucket, filenames.large, img)
      ),
      Promise.resolve(file.buffer).then((img: Buffer) =>
        this.uploadImage(bucket, filenames.original, img)
      ),
    ]);

    return {
      small: {
        filename: filenames.small,
        size: ScreenshotSize.SMALL,
        mimetype: file.mimetype,
      },

      medium: {
        filename: filenames.medium,
        size: ScreenshotSize.MEDIUM,
        mimetype: file.mimetype,
      },

      large: {
        filename: filenames.large,
        size: ScreenshotSize.LARGE,
        mimetype: file.mimetype,
      },
      original: {
        filename: filenames.original,
        size: ScreenshotSize.ORIGINAL,
        mimetype: file.mimetype,
      },
    };
  }

  private async uploadImage(
    bucket: string,
    filename: string,
    file: Buffer
  ): Promise<void> {
    await this.minioClient.putObject(bucket, filename, file);
  }

  private getFilename(
    file: IFile,
    id: string
  ): { small: string; medium: string; large: string; original: string } {
    function generateForSize(size: ScreenshotSize): string {
      return `${id}.${size}.${extension(file.mimetype)}`;
    }

    return {
      small: generateForSize(ScreenshotSize.SMALL),
      medium: generateForSize(ScreenshotSize.MEDIUM),
      large: generateForSize(ScreenshotSize.LARGE),
      original: generateForSize(ScreenshotSize.ORIGINAL),
    };
  }
}
