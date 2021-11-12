import { Multipart } from 'fastify-multipart';

// export interface MultipartFile {
//   toBuffer: () => Promise<Buffer>;
//   file: NodeJS.ReadableStream;
//   filepath: string;
//   fieldname: string;
//   filename: string;
//   encoding: string;
//   mimetype: string;
//   fields: import('fastify-multipart').MultipartFields;
// }

export type AsyncMultipartFiles = AsyncIterableIterator<Multipart>;

declare module 'fastify' {
  interface FastifyRequest {
    incomingFiles: AsyncMultipartFiles;
  }
}
