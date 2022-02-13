---
title: "GitHub Actions で今日の日付のファイル（日記）を作成する"
emoji: "📔"
publishDate: "2021-12-20"
type: "article"
excerpt: 怠惰を求めて
published: true
---

このブログの日記の話です。もともとは Alfred のワークフローを定義してファイルを生成し、スニペットでmatter（title とか emojiとかの記事のメタ情報）を挿入できるようにしていました。PCを使う分にはいいのですが、iPadから作る分にはやや面倒なままです。Magic Keyboardを買ったのもあり（！？）、より積極的にiPadで日記を書きたいと思いました。そこで、GitHubワークフローを手動実行してその日の日記ファイルを生成することにしました。

```yml:.github/workflows/create-diary.yml
name: Create Today Diary File (if not exists)
on:
  workflow_dispatch:
    branches:
      - main
    paths:
      - "*/**"
defaults:
  run:
    working-directory: ./*
jobs:
  create:
    name: Create Today Diary File
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v2
        with:
          ref: main
      - name: Get today diary file name
        id: diary_filename
        run: |
          echo "::set-output name=date_meta::$(date +'%Y-%m-%d')"
          echo "::set-output name=date::$(date +'%Y/%m/%d')"
          echo "::set-output name=dirname::diary/$(date +'%Y/%m')"
          echo "::set-output name=filename::diary/$(date +'%Y/%m/%d').md"
      - name: Check file existence
        id: check_files
        uses: andstor/file-existence-action@v1
        with:
          files: ${{ steps.diary_filename.outputs.filename }}
      - name: Today Diary
        if: steps.check_files.outputs.files_exists == 'false'
        run: |
          mkdir -p ${{ steps.diary_filename.outputs.dirname }}
          cat << EOF >> ${{ steps.diary_filename.outputs.filename }}
          ---
          title: ""
          emoji: "🗒"
          publishDate: "${{ steps.diary_filename.outputs.date_meta }}"
          type: "diary"
          published: false
          ---
          EOF
      - name: git setting
        if: steps.check_files.outputs.files_exists == 'false'
        run: |
          git config --local user.email "あなたのメールアドレス"
          git config --local user.name "あなたのGitHubユーザー名"
      - name: Commit files
        if: steps.check_files.outputs.files_exists == 'false'
        run: |
          git add .
          git commit -m "Add diary" -a
          git pull
          git push origin main
```

やっていることは、その日の日付で`2021/12/20.md`のようなファイルを作成することになっているので、ファイルの存在をチェックし、なければディレクトリと一緒にファイルを生成、`echo` で書き込んでいるだけです。確実にもっといいやり方があると思うのでもしわかればTwitterで教えてください。ちなみに[create-file](https://github.com/marketplace/actions/create-file)のActionsは試しましたが、ディレクトリが存在しない時に動作せずうまくいきませんでした。

ともあれこれでiPadからもワークフローを手動実行することで日記ファイルが作れます。`github.dev`で編集すればある程度の執筆体験は得られるのでしばらくこの運用で行ってみようと思います。この記事も`github.dev`で書きました。