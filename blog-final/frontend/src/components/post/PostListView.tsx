import {
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { PostFragment } from "@pb-graphql/generated.graphql";
import { isoStringToJstDate } from "@pb-libs/date";
import { contentUrl } from "@pb-libs/site";
import Link from "next/link";

type Props = {
  posts: PostFragment[];
};

export function PostListView(props: Props): React.ReactElement {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {props.posts.map((post) => (
        <ListItem key={post.id}>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: grey[300] }}> {post.emoji}</Avatar>
          </ListItemAvatar>
          <Link href={contentUrl(post.contentPath)}>
            <a>
              <ListItemText
                disableTypography
                primary={post.title}
                secondary={
                  <Stack direction="row" spacing={2}>
                    <Chip size="small" color="warning" label={post.type} />
                    <Typography>
                      {isoStringToJstDate(post.publishDate)}
                    </Typography>
                  </Stack>
                }
              />
            </a>
          </Link>
        </ListItem>
      ))}
    </List>
  );
}
