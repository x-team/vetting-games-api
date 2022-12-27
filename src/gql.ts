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
  Decimal: any;
};

export type Bug = {
  __typename?: "Bug";
  description: Scalars["String"];
  id: Scalars["Int"];
  name: Scalars["String"];
};

export type BugOnGame = {
  __typename?: "BugOnGame";
  bugId: Scalars["Int"];
  gameId: Scalars["ID"];
};

export type Game = {
  __typename?: "Game";
  bugs?: Maybe<Array<BugOnGame>>;
  finishedAt?: Maybe<Scalars["Date"]>;
  id: Scalars["ID"];
  mission?: Maybe<Mission>;
  score?: Maybe<Scalars["Decimal"]>;
  startedAt: Scalars["Date"];
};

export type Mission = {
  __typename?: "Mission";
  bugs?: Maybe<Array<Bug>>;
  description: Scalars["String"];
  id: Scalars["Int"];
  level: Scalars["Int"];
  releaseDate?: Maybe<Scalars["Date"]>;
  sourceCode?: Maybe<Array<MissionSourceCode>>;
  title: Scalars["String"];
  type: Scalars["String"];
};

export type MissionSourceCode = {
  __typename?: "MissionSourceCode";
  id: Scalars["String"];
  src: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  finishGame: Game;
  health: Scalars["String"];
  loginWithGitHub: TokenResponse;
  selectBug: Game;
  startGame: Game;
  unselectBug: Game;
};

export type MutationFinishGameArgs = {
  id: Scalars["ID"];
};

export type MutationLoginWithGitHubArgs = {
  code: Scalars["String"];
  redirectUrl?: InputMaybe<Scalars["String"]>;
};

export type MutationSelectBugArgs = {
  bugId: Scalars["Int"];
  gameId: Scalars["ID"];
};

export type MutationStartGameArgs = {
  missionId: Scalars["Int"];
};

export type MutationUnselectBugArgs = {
  bugId: Scalars["Int"];
  gameId: Scalars["ID"];
};

export type Query = {
  __typename?: "Query";
  game?: Maybe<Game>;
  getScoreboardPosition: Scalars["Int"];
  health: Scalars["String"];
  me: User;
  mission?: Maybe<Mission>;
  missionByTypeLevel?: Maybe<Mission>;
  missions: Array<Mission>;
  missionsByType: Array<Mission>;
  scoreboard?: Maybe<Scoreboard>;
  scoreboards: Array<Scoreboard>;
};

export type QueryGameArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryGetScoreboardPositionArgs = {
  missionId: Scalars["Int"];
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

export type QueryScoreboardArgs = {
  missionId: Scalars["Int"];
};

export type QueryScoreboardsArgs = {
  missionId: Scalars["Int"];
  pagination?: InputMaybe<ScoreboardPaginationInput>;
};

export type Scoreboard = {
  __typename?: "Scoreboard";
  game?: Maybe<Game>;
  id: Scalars["ID"];
  mission?: Maybe<Mission>;
  score: Scalars["Int"];
  user?: Maybe<User>;
};

export type ScoreboardPaginationInput = {
  skip: Scalars["Int"];
  take: Scalars["Int"];
};

export type TokenResponse = {
  __typename?: "TokenResponse";
  access_token: Scalars["String"];
};

export type User = {
  __typename?: "User";
  alias?: Maybe<Scalars["String"]>;
  games?: Maybe<Array<Game>>;
  id: Scalars["ID"];
  image?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  scoreboards?: Maybe<Array<Scoreboard>>;
};

export type UserGamesArgs = {
  missionId?: InputMaybe<Scalars["Int"]>;
};

export type UserScoreboardsArgs = {
  missionId?: InputMaybe<Scalars["Int"]>;
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
  Bug: ResolverTypeWrapper<Bug>;
  BugOnGame: ResolverTypeWrapper<BugOnGame>;
  Date: ResolverTypeWrapper<Scalars["Date"]>;
  Decimal: ResolverTypeWrapper<Scalars["Decimal"]>;
  Game: ResolverTypeWrapper<Game>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  Mission: ResolverTypeWrapper<Mission>;
  MissionSourceCode: ResolverTypeWrapper<MissionSourceCode>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Scoreboard: ResolverTypeWrapper<Scoreboard>;
  ScoreboardPaginationInput: ScoreboardPaginationInput;
  String: ResolverTypeWrapper<Scalars["String"]>;
  TokenResponse: ResolverTypeWrapper<TokenResponse>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars["Boolean"];
  Bug: Bug;
  BugOnGame: BugOnGame;
  Date: Scalars["Date"];
  Decimal: Scalars["Decimal"];
  Game: Game;
  ID: Scalars["ID"];
  Int: Scalars["Int"];
  Mission: Mission;
  MissionSourceCode: MissionSourceCode;
  Mutation: {};
  Query: {};
  Scoreboard: Scoreboard;
  ScoreboardPaginationInput: ScoreboardPaginationInput;
  String: Scalars["String"];
  TokenResponse: TokenResponse;
  User: User;
};

export type BugResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Bug"] = ResolversParentTypes["Bug"]
> = {
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BugOnGameResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["BugOnGame"] = ResolversParentTypes["BugOnGame"]
> = {
  bugId?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  gameId?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date";
}

export interface DecimalScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Decimal"], any> {
  name: "Decimal";
}

export type GameResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Game"] = ResolversParentTypes["Game"]
> = {
  bugs?: Resolver<
    Maybe<Array<ResolversTypes["BugOnGame"]>>,
    ParentType,
    ContextType
  >;
  finishedAt?: Resolver<Maybe<ResolversTypes["Date"]>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  mission?: Resolver<Maybe<ResolversTypes["Mission"]>, ParentType, ContextType>;
  score?: Resolver<Maybe<ResolversTypes["Decimal"]>, ParentType, ContextType>;
  startedAt?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MissionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mission"] = ResolversParentTypes["Mission"]
> = {
  bugs?: Resolver<Maybe<Array<ResolversTypes["Bug"]>>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  level?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  releaseDate?: Resolver<
    Maybe<ResolversTypes["Date"]>,
    ParentType,
    ContextType
  >;
  sourceCode?: Resolver<
    Maybe<Array<ResolversTypes["MissionSourceCode"]>>,
    ParentType,
    ContextType
  >;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  type?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MissionSourceCodeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["MissionSourceCode"] = ResolversParentTypes["MissionSourceCode"]
> = {
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  src?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  finishGame?: Resolver<
    ResolversTypes["Game"],
    ParentType,
    ContextType,
    RequireFields<MutationFinishGameArgs, "id">
  >;
  health?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  loginWithGitHub?: Resolver<
    ResolversTypes["TokenResponse"],
    ParentType,
    ContextType,
    RequireFields<MutationLoginWithGitHubArgs, "code">
  >;
  selectBug?: Resolver<
    ResolversTypes["Game"],
    ParentType,
    ContextType,
    RequireFields<MutationSelectBugArgs, "bugId" | "gameId">
  >;
  startGame?: Resolver<
    ResolversTypes["Game"],
    ParentType,
    ContextType,
    RequireFields<MutationStartGameArgs, "missionId">
  >;
  unselectBug?: Resolver<
    ResolversTypes["Game"],
    ParentType,
    ContextType,
    RequireFields<MutationUnselectBugArgs, "bugId" | "gameId">
  >;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  game?: Resolver<
    Maybe<ResolversTypes["Game"]>,
    ParentType,
    ContextType,
    Partial<QueryGameArgs>
  >;
  getScoreboardPosition?: Resolver<
    ResolversTypes["Int"],
    ParentType,
    ContextType,
    RequireFields<QueryGetScoreboardPositionArgs, "missionId">
  >;
  health?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  me?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
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
  scoreboard?: Resolver<
    Maybe<ResolversTypes["Scoreboard"]>,
    ParentType,
    ContextType,
    RequireFields<QueryScoreboardArgs, "missionId">
  >;
  scoreboards?: Resolver<
    Array<ResolversTypes["Scoreboard"]>,
    ParentType,
    ContextType,
    RequireFields<QueryScoreboardsArgs, "missionId">
  >;
};

export type ScoreboardResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Scoreboard"] = ResolversParentTypes["Scoreboard"]
> = {
  game?: Resolver<Maybe<ResolversTypes["Game"]>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  mission?: Resolver<Maybe<ResolversTypes["Mission"]>, ParentType, ContextType>;
  score?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TokenResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["TokenResponse"] = ResolversParentTypes["TokenResponse"]
> = {
  access_token?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
  alias?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  games?: Resolver<
    Maybe<Array<ResolversTypes["Game"]>>,
    ParentType,
    ContextType,
    Partial<UserGamesArgs>
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  scoreboards?: Resolver<
    Maybe<Array<ResolversTypes["Scoreboard"]>>,
    ParentType,
    ContextType,
    Partial<UserScoreboardsArgs>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Bug?: BugResolvers<ContextType>;
  BugOnGame?: BugOnGameResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Decimal?: GraphQLScalarType;
  Game?: GameResolvers<ContextType>;
  Mission?: MissionResolvers<ContextType>;
  MissionSourceCode?: MissionSourceCodeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Scoreboard?: ScoreboardResolvers<ContextType>;
  TokenResponse?: TokenResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};
