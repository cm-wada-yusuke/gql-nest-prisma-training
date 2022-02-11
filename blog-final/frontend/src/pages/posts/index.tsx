import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { PostListView } from "@pb-components/post/PostListView";
import {
  PageInfoFragment,
  PostFragment,
  PostsAllPageDocument,
} from "@pb-graphql/generated.graphql";
import { urqlClient } from "@pb-libs/gql-requests";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import React from "react";

const TakeCount = 3;

type Props = {
  allPublished: PostFragment[];
  pageInfo: PageInfoFragment;
};

const PreviousLink: React.FC<{ pageInfo: PageInfoFragment }> = ({
  pageInfo,
}) => {
  return (
    <Link
      href={`/posts?cursor=${pageInfo.startCursor}&direction=last`}
      passHref
    >
      <Button
        variant="text"
        fullWidth
        sx={{
          backgroundColor: "#e5ddd3",
        }}
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography color="primary" variant="body2">
            前へ
          </Typography>
        </Box>
      </Button>
    </Link>
  );
};
const NextLink: React.FC<{ pageInfo: PageInfoFragment }> = ({ pageInfo }) => {
  return (
    <Link href={`/posts?cursor=${pageInfo.endCursor}&direction=first`} passHref>
      <Button
        variant="text"
        fullWidth
        sx={{
          backgroundColor: "#e5ddd3",
        }}
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography color="primary" variant="body2">
            次へ
          </Typography>
        </Box>
      </Button>
    </Link>
  );
};

const Page: NextPage<Props> = ({ allPublished, pageInfo }) => {
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
        }}
      >
        <Container fixed sx={{ mt: 8 }}>
          <PostListView posts={allPublished} />
          <Stack direction="row" spacing={2}>
            {pageInfo.hasPreviousPage ? (
              <PreviousLink pageInfo={pageInfo} />
            ) : (
              <Box width="100%"></Box>
            )}
            {pageInfo.hasNextPage ? (
              <NextLink pageInfo={pageInfo} />
            ) : (
              <Box width="100%"></Box>
            )}
          </Stack>
        </Container>
      </Box>
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.primary.dark,
          color: (theme) =>
            theme.palette.getContrastText(theme.palette.primary.dark),
          py: 3,
          textAlign: "center",
        }}
      >
        <footer>
          <a
            href="http://devcon.hakoika.jp/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by Hakodate
          </a>
        </footer>
      </Box>
    </>
  );
};
export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
  query,
}) => {
  try {
    // クエリパラメータからページ番号を取得
    const cursor =
      !query.cursor || query.cursor === "null" ? null : query.cursor; // null文字列が入るため注意
    const direction = (query.direction as string) || "first";

    const client = await urqlClient();

    // 変数なしでGraphQL呼び出し
    const args = {
      [direction]: TakeCount,
      cursor,
    };
    const result = await client.query(PostsAllPageDocument, args).toPromise();
    console.log(result);
    console.log( result.data.allPublished.pageInfo);

    return {
      props: {
        allPublished: result.data.allPublished.nodes,
        pageInfo: result.data.allPublished.pageInfo,
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
