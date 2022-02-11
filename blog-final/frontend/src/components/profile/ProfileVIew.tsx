import { GitHub, Twitter } from "@mui/icons-material";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { ProfileFragment } from "@pb-graphql/generated.graphql";
import React from "react";

type Props = ProfileFragment;

export function ProfileView(props: Props): React.ReactElement {
  return (
    <List dense>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={
            <Typography variant="h6" color="text.primary">
              {props.handleName}
            </Typography>
          }
          secondaryTypographyProps={{ variant: "caption" }}
          secondary={props.position}
        />
      </ListItem>
      <ListItem>
        <Stack justifyContent="flex-start">
          <Typography variant={"caption"} color={"textPrimary"}>
            {props.summary}
          </Typography>
          <Stack direction="row">
            <IconButton
              target="_blank"
              rel="noopener noreferrer"
              href={props.twitter}
              title={"Twitter profile link"}
            >
              <Twitter />
            </IconButton>
            <IconButton
              target="_blank"
              rel="noopener noreferrer"
              href={props.github}
              title={"GitHub profile link"}
            >
              <GitHub />
            </IconButton>
          </Stack>
        </Stack>
      </ListItem>
    </List>
  );
}
