// const OGP_SITE_HOME = process.env.NEXT_PUBLIC_OGP_SITE_HOME!;
// const CONTENTS_BUCKET_NAME = process.env.NEXT_PUBLIC_CONTENTS_BUCKET_NAME!;
// const NEXT_PUBLIC_GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!;
// console.log('OGP_SITE_HOME', OGP_SITE_HOME);
// console.log('CONTENTS_BUCKET_NAME', CONTENTS_BUCKET_NAME);


/**
 * /posts/articles/2021/github-actions-create-diary => posts/articles/2021/github-actions-create-diary.md
 * @param resolvedUrl
 * @returns href のリンク設定などで使う
 */
export function contentPath(resolvedUrl: string): string {
  // スラッシュがついていたら除去する
  const relative = resolvedUrl.replace(/^\/|\/$/g, '');

  // 拡張子がついていたら除去する
  const relativeFilePath = relative.replace(/\.[^/.]+$/, '');
  return `${relativeFilePath}.md`;
}

/**
 * posts/articles/2021/github-actions-create-diary.md => /posts/articles/2021/github-actions-create-diary
 * @param contentPath
 * @returns href のリンク設定などで使う
 */
export function contentUrl(contentPath: string): string {
  // スラッシュがついていたら除去する
  const relative = contentPath.replace(/^\/|\/$/g, '');

  // 拡張子がついていたら除去する
  const relativeFilePath = relative.replace(/\.[^/.]+$/, '');
  return `/${relativeFilePath}`;
}
