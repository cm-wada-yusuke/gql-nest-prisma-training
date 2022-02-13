---
title: "Rails の db:seed で parallel を使って大量データの投入を高速化する"
emoji: "💎"
publishDate: "2021-08-18"
type: "article"
published: true
---

`db:seed`、便利ですよね。 [Faker](https://github.com/faker-ruby/faker) と組み合わせれば以下のような感じで `Article` データを作成できます。

```ruby:seeds.rb
Faker::Config.locale = "ja"
100.times do |_i|
  Article.create!(
    title: Faker::Coffee.blend_name,
    body: Faker::Markdown.sandwich,
    published: true
  )
end
```

ただ、負荷テスト目的なので大量のフェイクデータを作成したい場合、ループ処理だと時間がかかります。そこでスレッドを作成して並列実行できる [parallel](https://github.com/grosser/parallel) を使います。子プロセスを立ち上げる方式だと環境変数の共有やらが大変そうなので、大抵の場合はマルチスレッドモードでよさそうな気がしますね。

```ruby:sample.rb
# maybe helps: explicitly use connection pool
Parallel.each(User.all, in_threads: 8) do |user|
  ActiveRecord::Base.connection_pool.with_connection do
    user.update_attribute(:some_attribute, some_value)
  end
end
```

上の例のようにコネクションプールは使い回すようにします。そうしないとスレッドごとにコネクションプールが貼られてしまい、オーバーするとスレッドが中断され、最初の数件しか処理されない、という結果になります。では seeds に適用してみます。


```ruby:seeds.rb
Faker::Config.locale = "ja"

Parallel.each(0...10000, in_threads: 5) do |item|
  ActiveRecord::Base.connection_pool.with_connection do
    Article.create!(
        title: Faker::Coffee.blend_name,
        body: Faker::Markdown.sandwich,
        published: true
    )
  end
end
```

これで並列にフェイクデータが作成できます。並列化なしだとだいたい千件投入するのに5分くらいかかってしまっていたのですが（1万件いれようとすると途中でDBコネクションが閉じられる）、並列化を行うと1万件投入に2,3分くらいで完了します。圧倒的速さ。

テストデータで大量のフェイクを作りたい場合に、参考になれば幸いです。