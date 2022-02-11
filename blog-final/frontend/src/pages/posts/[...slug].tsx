import { Box, Stack, Typography } from "@mui/material";
import {
  PostDetailPageDocument,
  PostFragment,
} from "@pb-graphql/generated.graphql";
import { isoStringToJstDate } from "@pb-libs/date";
import { urqlClient } from "@pb-libs/gql-requests";
import { contentPath } from "@pb-libs/site";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import markdownToHtml from "zenn-markdown-html";
import 'zenn-content-css';


type Props = {
  post: PostFragment;
  bodyHtml: string;
};

const Page: NextPage<Props> = ({ post, bodyHtml }) => {
  return (
    <Box sx={{ p: 4 }}>
      <article>
        <Stack>
          <Typography display="block" variant="caption" color={"textSecondary"}>
            {isoStringToJstDate(post.publishDate)}
          </Typography>
          <Typography
            display="block"
            variant="h4"
            color="textPrimary"
            sx={{
              wordBreak: "break-word",
              whiteSpace: "normal",
              pb: 1,
              // このあたりは下にかっこよさげな線をひきたい
              borderBottom: "solid 5px #DEB887",
              position: "relative",
              "&::after": {
                position: "absolute",
                content: '""',
                display: "block",
                borderBottom: "solid 5px #B89061",
                bottom: "-5px",
                width: "20%",
              },
            }}
          >
            {post.title}
          </Typography>
          <Box mt={4}>
            <div
              className="znc"
              dangerouslySetInnerHTML={{
                __html: bodyHtml,
              }}
            ></div>
          </Box>
        </Stack>
      </article>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  try {
    // slug 配列を 検索用の contentPath に変換する
    const resolvedSlug = ["posts"].concat(params!.slug as string[]); // エラーなら404なので!使っちゃう
    const client = await urqlClient();
    const result = await client
      .query(PostDetailPageDocument, {
        contentPath: contentPath(resolvedSlug.join("/")),
      })
      .toPromise();

    const post = result.data.post;
    const bodyHtml = markdownToHtml(post.bodyMarkdown); // サーバー側で実行する必要あり
    console.log(post);

    return {
      props: {
        post: result.data.post,
        bodyHtml,
      },
    };
  } catch (e) {
    console.error(e);
    return {
      notFound: true,
    };
  }
};
export default Page;
