import { Check, Favorite, Send, ThumbUp } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import {
  CreateImpressionInput,
  useImpressionMutation,
  useImpressionContainerQuery,
} from "@pb-graphql/generated.graphql";
import React, { useMemo, useState } from "react";
import { ImpressionView, StickerIcon } from "./ImpressionView";

type Props = {
  postId: string;
};

export function ImpressionContainer(props: Props): React.ReactElement {
  const [displaySticker, setDisplaySticker] = useState<"none" | "block">(
    "block"
  );
  const [displayForm, setDisplayForm] = useState<"none" | "flex">("none");

  // フォームの準備
  const [values, setValues] = React.useState<CreateImpressionInput>({
    postId: props.postId,
    sticker: "Good",
    comment: "",
    twitterId: "",
  });
  // インプレッションをGraphQLで読み出し
  // getServerSidePropsでやってもいいが、create => refetch の流れを実行してもらうためブラウザ側でクエリする
  // urql は __typename に反応してmutation後に自動でリフェッチする
  // 最初のフェッチが空データでも __typename が入るようにする措置
  // 
  const context = useMemo(
    () => ({ additionalTypenames: ["ImpressionModel"] }),
    []
  );
  const [queryRes] = useImpressionContainerQuery({
    variables: {
      postId: props.postId,
    },
    context,
  });
  const { fetching, data } = queryRes;

  const [, addImpression] = useImpressionMutation();

  // ステッカーボタンを押したとき
  // 1. ステッカーを非表示
  // 2. 入力フォームを表示
  // 3. 入力フォームのインプレッションに値をセット
  const handleClickSticker = (sticker: string) => {
    setDisplaySticker("none");
    setDisplayForm("flex");
    setValues((oldValues) => ({
      ...oldValues,
      sticker,
    }));
  };

  // フォーム入力があったとき
  // https://stackoverflow.com/questions/58675993/typescript-react-select-onchange-handler-type-error
  const handleChange = (
    event: React.ChangeEvent<{ name: string; value: string }>
  ) => {
    setValues((oldValues) => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  };

  // Submitされたとき
  // mutationを実行
  const handleSubmit = (e: any) => {
    e.preventDefault();
    addImpression({
      input: values,
    });
    setValues({
      postId: props.postId,
      sticker: "Good",
      comment: "",
      twitterId: "",
    });
    setDisplayForm("none");
    setDisplaySticker("block");
  };

  if (fetching) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!data || !data.impressions) {
    return <></>;
  }

  const StyledImpressionButton: React.FC<{ sticker: string }> = (props) => {
    return (
      <IconButton
        aria-label={props.sticker}
        sx={{
          color: grey[600],
        }}
        component="span"
        onClick={() => handleClickSticker(props.sticker)}
      >
        {props.children}
      </IconButton>
    );
  };

  return (
    <Stack>
      <ImpressionView impressions={data.impressions} />
      <Stack mt={2} direction="row" display={displaySticker}>
        <StyledImpressionButton sticker="Good">
          <ThumbUp />
        </StyledImpressionButton>
        <StyledImpressionButton sticker="Thanks">
          <Check />
        </StyledImpressionButton>
        <StyledImpressionButton sticker="Like">
          <Favorite />
        </StyledImpressionButton>
      </Stack>
      <Box
        component="form"
        sx={{
          mt: 2,
          display: displayForm,
          alignItems: "center",
          gap: 1,
        }}
        onSubmit={handleSubmit}
      >
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              error={!!values?.comment && values.comment.length > 200}
              id="comment"
              name="comment"
              value={values.comment}
              label="コメント（任意）"
              variant="outlined"
              size="small"
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <StickerIcon sticker={values.sticker} fontSize="medium" />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                style: { color: grey[500] },
              }}
            />
          </Grid>
          <Grid item xs={9} md={4}>
            <TextField
              fullWidth
              error={!!values?.twitterId && values.twitterId.length > 100}
              id="twitter-id"
              name="twitterId"
              value={values.twitterId}
              label="Twitter（任意）"
              variant="outlined"
              size="small"
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">@</InputAdornment>
                ),
              }}
              InputLabelProps={{
                style: { color: grey[500] },
              }}
            />
          </Grid>
          <Grid item xs={3} md={2}>
            <Button fullWidth variant="contained" color="info" type="submit">
              <Send fontSize="small" />
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
}
