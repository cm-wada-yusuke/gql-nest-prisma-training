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

export type PostModel = {
  __typename?: 'PostModel';
  contentPath: Scalars['String'];
  emoji?: Maybe<Scalars['String']>;
  excerpt?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  publishDate?: Maybe<Scalars['DateTime']>;
  published?: Maybe<Scalars['Boolean']>;
  thumbNailUrl?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  type: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  fixedPosts?: Maybe<Array<PostModel>>;
  posts?: Maybe<Array<PostModel>>;
  prismaPosts?: Maybe<Array<PostModel>>;
};


export type QueryPostsArgs = {
  type?: InputMaybe<Array<Scalars['String']>>;
};

export type PostIndexPageQueryVariables = Exact<{ [key: string]: never; }>;


export type PostIndexPageQuery = { __typename?: 'Query', posts?: Array<{ __typename?: 'PostModel', id: string, title: string, type: string, publishDate?: any | null }> | null };


export const PostIndexPageDocument = gql`
    query PostIndexPage {
  posts {
    id
    title
    type
    publishDate
  }
}
    `;

export function usePostIndexPageQuery(options?: Omit<Urql.UseQueryArgs<PostIndexPageQueryVariables>, 'query'>) {
  return Urql.useQuery<PostIndexPageQuery>({ query: PostIndexPageDocument, ...options });
};