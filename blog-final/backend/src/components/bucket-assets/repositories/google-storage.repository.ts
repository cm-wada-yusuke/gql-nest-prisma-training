import { Metadata } from '@google-cloud/common';
import { Bucket, Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { PbEnv } from '@pb-config/environments/pb-env.service';

@Injectable()
export class GoogleStorageRepository {
  // コンテンツを管理するバケット
  contentsBucket: Bucket;

  constructor(private readonly env: PbEnv) {
    const storage = new Storage({
      projectId: this.env.GcpProjectId,
    });
    this.contentsBucket = storage.bucket(this.env.ContentsBucketName);
  }

  /**
   * CloudStorage上のマークダウンファイルパスを取得する AsyncGenerator
   * @param fields
   */
  async *getAllMarkdownPaths(): AsyncGenerator<string[]> {
    // Cloud Storage から ディレクトリも含む一覧を取得
    const [files] = await this.contentsBucket.getFiles({
      autoPaginate: false,
    });

    // 拡張子mdだけを抽出
    const fileKeys = files
      .filter((f) => f.name.endsWith('.md'))
      .map((f) => f.name);

    yield fileKeys;
  }

  /**
   * CloudStorage上のファイルのメタデータを取得する
   * @param fields
   */
  async getFileMetadata(gcsFilePath: string): Promise<Metadata> {
    const remoteFile = this.contentsBucket.file(gcsFilePath);

    // Cloud Storage のオブジェクトメタデータ
    // ref: https://cloud.google.com/storage/docs/viewing-editing-metadata#storage-set-object-metadata-nodejs
    const [gcsMetadata] = await remoteFile.getMetadata();

    console.log(gcsFilePath, gcsMetadata);

    return gcsMetadata;
  }

  async download(gcsFilePath: string): Promise<string> {
    const raw = await this.contentsBucket.file(gcsFilePath).download();
    return raw.toString();
  }
}
