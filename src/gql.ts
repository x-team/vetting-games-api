import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Game = {
  __typename?: "Game";
  finishedAt?: Maybe<Scalars["Date"]>;
  id: Scalars["Int"];
  mission?: Maybe<Mission>;
  score?: Maybe<Scalars["Int"]>;
  startedAt: Scalars["Date"];
};

export type Mission = {
  __typename?: "Mission";
  description: Scalars["String"];
  id: Scalars["Int"];
  level: Scalars["Int"];
  releaseDate?: Maybe<Scalars["Date"]>;
  title: Scalars["String"];
  type: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  health: Scalars["String"];
  loginWithGitHub: TokenResponse;
  startGame: Game;
};

export type MutationLoginWithGitHubArgs = {
  code: Scalars["String"];
  redirectUrl?: InputMaybe<Scalars["String"]>;
};

export type MutationStartGameArgs = {
  missionId: Scalars["Int"];
};

export type Query = {
  __typename?: "Query";
  game?: Maybe<Game>;
  health: Scalars["String"];
  mission?: Maybe<Mission>;
  missionByTypeLevel?: Maybe<Mission>;
  missions: Array<Mission>;
  missionsByType: Array<Mission>;
};

export type QueryMissionArgs = {
  id: Scalars["Int"];
};

export type QueryMissionByTypeLevelArgs = {
  level: Scalars["Int"];
  type: Scalars["String"];
};

export type QueryMissionsByTypeArgs = {
  type: Scalars["String"];
};

export type TokenResponse = {
  __typename?: "TokenResponse";
  access_token: Scalars["String"];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Date: ResolverTypeWrapper<Scalars["Date"]>;
  Game: ResolverTypeWrapper<Game>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  Mission: ResolverTypeWrapper<Mission>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  TokenResponse: ResolverTypeWrapper<TokenResponse>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars["Boolean"];
  Date: Scalars["Date"];
  Game: Game;
  Int: Scalars["Int"];
  Mission: Mission;
  Mutation: {};
  Query: {};
  String: Scalars["String"];
  TokenResponse: TokenResponse;
};

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date";
}

export type GameResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Game"] = ResolversParentTypes["Game"]
> = {
  finishedAt?: Resolver<Maybe<ResolversTypes["Date"]>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  mission?: Resolver<Maybe<ResolversTypes["Mission"]>, ParentType, ContextType>;
  score?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  startedAt?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MissionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mission"] = ResolversParentTypes["Mission"]
> = {
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  level?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  releaseDate?: Resolver<
    Maybe<ResolversTypes["Date"]>,
    ParentType,
    ContextType
  >;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  type?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  health?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  loginWithGitHub?: Resolver<
    ResolversTypes["TokenResponse"],
    ParentType,
    ContextType,
    RequireFields<MutationLoginWithGitHubArgs, "code">
  >;
  startGame?: Resolver<
    ResolversTypes["Game"],
    ParentType,
    ContextType,
    RequireFields<MutationStartGameArgs, "missionId">
  >;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  game?: Resolver<Maybe<ResolversTypes["Game"]>, ParentType, ContextType>;
  health?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  mission?: Resolver<
    Maybe<ResolversTypes["Mission"]>,
    ParentType,
    ContextType,
    RequireFields<QueryMissionArgs, "id">
  >;
  missionByTypeLevel?: Resolver<
    Maybe<ResolversTypes["Mission"]>,
    ParentType,
    ContextType,
    RequireFields<QueryMissionByTypeLevelArgs, "level" | "type">
  >;
  missions?: Resolver<
    Array<ResolversTypes["Mission"]>,
    ParentType,
    ContextType
  >;
  missionsByType?: Resolver<
    Array<ResolversTypes["Mission"]>,
    ParentType,
    ContextType,
    RequireFields<QueryMissionsByTypeArgs, "type">
  >;
};

export type TokenResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["TokenResponse"] = ResolversParentTypes["TokenResponse"]
> = {
  access_token?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Date?: GraphQLScalarType;
  Game?: GameResolvers<ContextType>;
  Mission?: MissionResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  TokenResponse?: TokenResponseResolvers<ContextType>;
};
