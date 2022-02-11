import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type CreateImpressionInput = {
  comment?: InputMaybe<Scalars['String']>;
  postId: Scalars['String'];
  sticker: Scalars['String'];
  twitterId?: InputMaybe<Scalars['String']>;
};

export type ImpressionModel = {
  __typename?: 'ImpressionModel';
  comment?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  postId: Scalars['String'];
  sticker: Scalars['String'];
  twitterId?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addImpression: ImpressionModel;
};


export type MutationAddImpressionArgs = {
  input: CreateImpressionInput;
};

export type PostModel = {
  __typename?: 'PostModel';
  bodyMarkdown: Scalars['String'];
  contentPath: Scalars['String'];
  emoji?: Maybe<Scalars['String']>;
  excerpt?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  impressions: Array<ImpressionModel>;
  publishDate?: Maybe<Scalars['DateTime']>;
  published?: Maybe<Scalars['Boolean']>;
  thumbNailUrl?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  type: Scalars['String'];
};

export type ProfileModel = {
  __typename?: 'ProfileModel';
  github: Scalars['String'];
  handleName: Scalars['String'];
  position: Scalars['String'];
  summary?: Maybe<Scalars['String']>;
  twitter: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  findPost: PostModel;
  fixedPosts?: Maybe<Array<PostModel>>;
  impressions?: Maybe<Array<ImpressionModel>>;
  posts?: Maybe<Array<PostModel>>;
  prismaPosts?: Maybe<Array<PostModel>>;
  profile?: Maybe<ProfileModel>;
};


export type QueryFindPostArgs = {
  contentPath?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};


export type QueryImpressionsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  postId?: InputMaybe<Scalars['String']>;
  sortAs?: InputMaybe<Scalars['String']>;
};


export type QueryPostsArgs = {
  type?: InputMaybe<Array<Scalars['String']>>;
};

export type PostFragment = { __typename?: 'PostModel', id: string, title: string, type: string, publishDate?: any | null, emoji?: string | null, contentPath: string };

export type ProfileFragment = { __typename?: 'ProfileModel', handleName: string, position: string, summary?: string | null, twitter: string, github: string };

export type ImpressionFragment = { __typename?: 'ImpressionModel', id: string, comment?: string | null, createdAt?: any | null, sticker: string, twitterId?: string | null, postId: string };

export type PostIndexPageQueryVariables = Exact<{ [key: string]: never; }>;


export type PostIndexPageQuery = { __typename?: 'Query', articles?: Array<{ __typename?: 'PostModel', id: string, title: string, type: string, publishDate?: any | null, emoji?: string | null, contentPath: string }> | null, diaries?: Array<{ __typename?: 'PostModel', id: string, title: string, type: string, publishDate?: any | null, emoji?: string | null, contentPath: string }> | null, profile?: { __typename?: 'ProfileModel', handleName: string, position: string, summary?: string | null, twitter: string, github: string } | null };

export type PostDetailPageQueryVariables = Exact<{
  contentPath?: InputMaybe<Scalars['String']>;
}>;


export type PostDetailPageQuery = { __typename?: 'Query', post: { __typename?: 'PostModel', bodyMarkdown: string, id: string, title: string, type: string, publishDate?: any | null, emoji?: string | null, contentPath: string, impressions: Array<{ __typename?: 'ImpressionModel', id: string, comment?: string | null, createdAt?: any | null, sticker: string, twitterId?: string | null, postId: string }> } };

export type ImpressionContainerQueryVariables = Exact<{
  postId: Scalars['String'];
}>;


export type ImpressionContainerQuery = { __typename?: 'Query', impressions?: Array<{ __typename?: 'ImpressionModel', id: string, comment?: string | null, createdAt?: any | null, sticker: string, twitterId?: string | null, postId: string }> | null };

export type ImpressionMutationVariables = Exact<{
  input: CreateImpressionInput;
}>;


export type ImpressionMutation = { __typename?: 'Mutation', addImpression: { __typename?: 'ImpressionModel', id: string, comment?: string | null, createdAt?: any | null, sticker: string, twitterId?: string | null, postId: string } };

export const PostFragmentDoc = gql`
    fragment Post on PostModel {
  id
  title
  type
  publishDate
  emoji
  contentPath
}
    `;
export const ProfileFragmentDoc = gql`
    fragment Profile on ProfileModel {
  handleName
  position
  summary
  twitter
  github
}
    `;
export const ImpressionFragmentDoc = gql`
    fragment Impression on ImpressionModel {
  id
  comment
  createdAt
  sticker
  twitterId
  postId
}
    `;
export const PostIndexPageDocument = gql`
    query PostIndexPage {
  articles: posts(type: ["article"]) {
    ...Post
  }
  diaries: posts(type: ["diary"]) {
    ...Post
  }
  profile {
    ...Profile
  }
}
    ${PostFragmentDoc}
${ProfileFragmentDoc}`;

export function usePostIndexPageQuery(options?: Omit<Urql.UseQueryArgs<PostIndexPageQueryVariables>, 'query'>) {
  return Urql.useQuery<PostIndexPageQuery>({ query: PostIndexPageDocument, ...options });
};
export const PostDetailPageDocument = gql`
    query PostDetailPage($contentPath: String) {
  post: findPost(contentPath: $contentPath) {
    ...Post
    bodyMarkdown
    impressions {
      ...Impression
    }
  }
}
    ${PostFragmentDoc}
${ImpressionFragmentDoc}`;

export function usePostDetailPageQuery(options?: Omit<Urql.UseQueryArgs<PostDetailPageQueryVariables>, 'query'>) {
  return Urql.useQuery<PostDetailPageQuery>({ query: PostDetailPageDocument, ...options });
};
export const ImpressionContainerDocument = gql`
    query ImpressionContainer($postId: String!) {
  impressions(postId: $postId, sortAs: "asc") {
    ...Impression
  }
}
    ${ImpressionFragmentDoc}`;

export function useImpressionContainerQuery(options: Omit<Urql.UseQueryArgs<ImpressionContainerQueryVariables>, 'query'>) {
  return Urql.useQuery<ImpressionContainerQuery>({ query: ImpressionContainerDocument, ...options });
};
export const ImpressionDocument = gql`
    mutation Impression($input: CreateImpressionInput!) {
  addImpression(input: $input) {
    ...Impression
  }
}
    ${ImpressionFragmentDoc}`;

export function useImpressionMutation() {
  return Urql.useMutation<ImpressionMutation, ImpressionMutationVariables>(ImpressionDocument);
};