import { Injectable } from '@nestjs/common';
import { PageInfoModel, Node } from './interfaces/pagination';
import { ConnectionArgs } from './interfaces/pagination.args';

@Injectable()
export class ConnectionService {
  // クエリパラメータと結果から、PageInfoを生成する
  pageInfo(args: ConnectionArgs, nodes: Node[]): PageInfoModel {
    if (!args.first && !args.last) {
      throw new Error('firstかlastいずれかが必要です');
    }

    // 進むの場合と戻るの場合で hasNextの意味合いがかわる
    // 例えば最初のページでも、
    // 進む場合は最初の１ページ目にはcursorを指定しないだろうし、
    // 戻ってきた場合はカーソルありでlastが入っているはず
    const hasNextPage: boolean = (() => {
      if (args.first) {
        return args.first === nodes.length;
      } else {
        return !!args.cursor;
      }
    })();
    const hasPreviousPage: boolean = (() => {
      if (args.first) {
        return !!args.cursor;
      } else {
        return args.last === nodes.length;
      }
    })();
    return {
      startCursor: nodes?.[0]?.id,
      endCursor: nodes?.[nodes.length - 1]?.id,
      hasNextPage,
      hasPreviousPage,
    };
  }
}
