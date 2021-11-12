import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { Present } from './present';
import { FastifyRequest } from 'fastify';
import * as util from 'util';
import * as stream from 'stream';
import * as fs from 'fs';
import { AppResponseDto } from '@dto/app-response-dto';
import { AsyncMultipartFiles } from '@typings/file';
import { pipeline } from 'stream/promises';
import sharp = require('sharp');

@Injectable()
export class PresentService {
  private readonly presents: Present[] = [];

  findAll(): Present[] {
    this.presents.push({
      name: 'happy_birthday_pack',
      prize: 1,
    });
    this.presents.push({
      name: 'good',
      prize: 2,
    });
    return this.presents;
  }

  async upload(files: AsyncMultipartFiles): Promise<void> {
    for await (const file of files) {
      try {
        const roundedCorners = Buffer.from(
          '<svg><rect x="0" y="0" width="200" height="200" rx="50" ry="50"/></svg>',
        );
        const roundedCornerResizer = sharp()
          .resize(200, 200)
          .composite([
            {
              input: roundedCorners,
              blend: 'dest-in',
            },
          ])
          .png();
        const writeStream = fs.createWriteStream(`upload/${file.filename}`); // File path
        await pipeline(file.file, roundedCornerResizer, writeStream);
      } catch (e) {
        console.error(e);
        throw new HttpException('Internal server error', 500);
      }
    }
  }

  // upload file
  async uploadFile(req: FastifyRequest): Promise<any> {
    //Check request is multipart
    if (!req.isMultipart()) {
      return new BadRequestException(
        new AppResponseDto(400, undefined, 'Request is not multipart'),
      );
    }
    const mp = await req.multipart(this.handler, onEnd);
    // for key value pairs in request
    mp.on('field', function (key: any, value: any) {
      console.log('form-data', key, value);
    });

    // Uploading finished
    async function onEnd(err: any) {
      console.log(err);
      if (err) {
        throw new HttpException('Internal server error', 500);
      }
      return;
    }
  }

  //Save files in directory
  async handler(
    field: string,
    file: any,
    filename: string,
    encoding: string,
    mimetype: string,
  ): Promise<void> {
    const pipeline = util.promisify(stream.pipeline);
    const writeStream = fs.createWriteStream(`upload/${filename}`); //File path
    try {
      await pipeline(file, writeStream);
    } catch (err) {
      console.error('Pipeline failed', err);
    }
  }
}
