import { Injectable } from '@nestjs/common';
import { Client as MinioClient } from 'minio';
import { AppConfig } from '../../../../../configuration/app.config';
import { IFile } from '../../../../utils/interfaces/file';
import { v4 } from 'uuid';
import { extension } from 'mime-types';
import { Readable as ReadableStream, Stream } from 'stream';

@Injectable()
export class DataService {
  private readonly minioClient: MinioClient;

  constructor(private readonly config: AppConfig) {
    this.minioClient = new MinioClient({ ...config.minio, useSSL: false });
  }

  async uploadScreenshot(bucket: string, file: IFile): Promise<string> {
    if (!(await this.minioClient.bucketExists(bucket))) {
      await this.minioClient.makeBucket(bucket, '');
    }
    const fileId = `${v4().toString()}.${extension(file.mimetype)}`;
    await this.minioClient.putObject(bucket, fileId, file.buffer, {});
    return fileId;
  }

  async downloadScreenshot(bucket, filename): Promise<ReadableStream> {
    return this.minioClient.getObject(bucket, filename);
  }
}
