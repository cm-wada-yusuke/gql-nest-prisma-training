import { PrismaClient, Prisma, Post, Impression } from '@prisma/client';
const prisma = new PrismaClient();

// モデル投入用のデータ定義
const postData: Post[] = [
  {
    id: 'fa119cb6-9135-57f5-8a5a-54f28d566d0e',
    contentPath: '/storage/posts/articles/hello.md',
    emoji: '✅',
    excerpt: '本を書いています',
    md5Hash: '5ce6822c5efacf5791b7f46187451e73',
    title: '気持ちを落ち着かせる呼吸法',
    thumbNailUrl: 'http://exaample.com/image1.png',
    type: 'article',
    publishDate: new Date('2022-01-31'),
    published: true,
    createdAt: new Date('2022-01-31T04:34:22+09:00'),
    updatedAt: new Date('2022-01-31T04:34:22+09:00'),
  },
  {
    id: '545d5237-15ee-169c-13a2-30f8748e3d6e',
    contentPath: '/storage/posts/articles/graphql.md',
    emoji: '🛳',
    excerpt: '記事を書いています',
    md5Hash: 'b7ec2e1a2b1faaed120aeeccb1ffc587',
    title: '高ぶる気持ちを存分に発揮したいです',
    thumbNailUrl: 'http://exaample.com/image2.png',
    type: 'article',
    publishDate: new Date('2022-01-30'),
    published: true,
    createdAt: new Date('2022-01-31T04:34:22+09:00'),
    updatedAt: new Date('2022-01-31T04:34:22+09:00'),
  },
  {
    id: '95daa18f-90d0-390c-fb96-0d152312936c',
    contentPath: '/storage/posts/articles/nextjs.md',
    emoji: '😼',
    excerpt: '日記を書いています',
    md5Hash: 'e5f6dd3adc408b03fbac3faadb82947d',
    title: 'ゆっくり落ち着く気持ちを大事にしたいです',
    thumbNailUrl: 'http://exaample.com/image3.png',
    type: 'diary',
    publishDate: new Date('2022-01-29'),
    published: true,
    createdAt: new Date('2022-01-31T04:34:22+09:00'),
    updatedAt: new Date('2022-01-31T04:34:22+09:00'),
  },
  {
    id: 'fa119cb6-9135-57f5-8a5a-54f28d666d0e',
    contentPath: '/storage/posts/articles/poem.md',
    emoji: '🤔',
    excerpt: 'いろいろな考え方があります',
    md5Hash: '5ce6822c5efacf5791b7f46187451e73',
    title: '楽しく仕事する方法',
    thumbNailUrl: 'http://exaample.com/image1.png',
    type: 'article',
    publishDate: new Date('2022-02-01'),
    published: true,
    createdAt: new Date('2022-01-31T04:34:22+09:00'),
    updatedAt: new Date('2022-01-31T04:34:22+09:00'),
  },
  {
    id: '545d5237-15ee-169c-13a3-30f8748e3d6e',
    contentPath: '/storage/posts/articles/fire.md',
    emoji: '😋',
    excerpt: 'おいしい',
    md5Hash: 'b7ec2e1a2b1faaed120aeeccb1ffc587',
    title: 'おいしいコーヒーの淹れ方',
    thumbNailUrl: 'http://exaample.com/image2.png',
    type: 'diary',
    publishDate: new Date('2022-02-02'),
    published: true,
    createdAt: new Date('2022-01-31T04:34:22+09:00'),
    updatedAt: new Date('2022-01-31T04:34:22+09:00'),
  },
  {
    id: '95daa18f-90d0-390c-fb98-0d152312936c',
    contentPath: '/storage/posts/articles/nestjs.md',
    emoji: '💎',
    excerpt: 'たくさん',
    md5Hash: 'e5f6dd3adc408b03fbac3faadb82947d',
    title: '最強キーボード決定戦',
    thumbNailUrl: 'http://exaample.com/image3.png',
    type: 'diary',
    publishDate: new Date('2022-02-03'),
    published: true,
    createdAt: new Date('2022-01-31T04:34:22+09:00'),
    updatedAt: new Date('2022-01-31T04:34:22+09:00'),
  },
  {
    id: 'fc8c04d6-6007-03dc-da13-c9ac29fe66e7',
    contentPath: 'posts/articles/2022/rails-parallel-seed.md',
    emoji: '💎',
    excerpt: '便利ですよね',
    md5Hash: 'e5f6dd3adc408b03fbac3faadb82947d',
    title: 'Rails の db:seed で parallel を使って大量データの投入を高速化する',
    thumbNailUrl: 'http://exaample.com/image3.png',
    type: 'article',
    publishDate: new Date('2022-02-03'),
    published: true,
    createdAt: new Date('2022-01-31T04:34:22+09:00'),
    updatedAt: new Date('2022-01-31T04:34:22+09:00'),
  },
];

const impressionData: Impression[] = [
  {
    id: '8c573507-31ae-48bb-92bf-ba2d343e79a0',
    sticker: 'Good',
    comment: '今後ともよろしく！',
    postId: 'fc8c04d6-6007-03dc-da13-c9ac29fe66e7',
    twitterId: 'waddy_u',
    createdAt: new Date('2022-01-31T04:34:22+09:00'),
    updatedAt: new Date('2022-01-31T04:34:22+09:00'),
  },
  {
    id: '394474e1-51f4-4fe5-a498-e804cbceeadd',
    sticker: 'Thanks',
    comment: '参考になった',
    postId: 'fc8c04d6-6007-03dc-da13-c9ac29fe66e7',
    twitterId: 'waddy_u',
    createdAt: new Date('2022-01-31T04:34:22+09:00'),
    updatedAt: new Date('2022-01-31T04:34:22+09:00'),
  },
  {
    id: '94527f0a-c24b-4ff6-96da-968a51130354',
    sticker: 'Like',
    comment: null,
    postId: 'fc8c04d6-6007-03dc-da13-c9ac29fe66e7',
    twitterId: 'waddy_u',
    createdAt: new Date('2022-01-31T04:34:22+09:00'),
    updatedAt: new Date('2022-01-31T04:34:22+09:00'),
  },
];

const doSeed = async () => {
  const posts = [];
  for (const post of postData) {
    const createPosts = prisma.post.create({
      data: post,
    });
    posts.push(createPosts);
  }
  return await prisma.$transaction(posts);
};

const doSeedImpressions = async () => {
  if ((await prisma.impression.count()) < 3) {
    const impressions = [];
    for (const impression of impressionData) {
      const createImpressions = prisma.impression.upsert({
        create: impression,
        update: impression,
        where: { id: impression.id },
      });
      impressions.push(createImpressions);
    }
    await prisma.$transaction(impressions);
  }
};

const main = async () => {
  console.log(`Start seeding ...`);

  await doSeed();
  await doSeedImpressions();

  console.log(`Seeding finished.`);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
