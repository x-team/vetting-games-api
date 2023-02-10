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

export type BugType = {
  __typename?: "BugType";
  description: Scalars["String"];
  id: Scalars["Int"];
  name: Scalars["String"];
};

export type File = {
  __typename?: "File";
  content: Scalars["String"];
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type Game = {
  __typename?: "Game";
  finishedAt?: Maybe<Scalars["Date"]>;
  id: Scalars["ID"];
  mission?: Maybe<Mission>;
  pickedBugs?: Maybe<Array<GameBug>>;
  /** Score value between 0 and 1 */
  score?: Maybe<Scalars["Decimal"]>;
  startedAt: Scalars["Date"];
};

export type GameBug = {
  __typename?: "GameBug";
  bugType?: Maybe<BugType>;
  bugTypeId: Scalars["Int"];
  game?: Maybe<Game>;
  gameId: Scalars["ID"];
};

export type GameSettings = {
  __typename?: "GameSettings";
  showTutorial: Scalars["Boolean"];
};

export type GameSettingsInput = {
  showTutorial: Scalars["Boolean"];
};

export type Mission = {
  __typename?: "Mission";
  bugTypes?: Maybe<Array<BugType>>;
  description: Scalars["String"];
  id: Scalars["Int"];
  level: Scalars["Int"];
  releaseDate?: Maybe<Scalars["Date"]>;
  title: Scalars["String"];
  type: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  /** Player finishes a game */
  finishGame: Game;
  health: Scalars["String"];
  /**
   * Login with GitHub
   *
   * Requires the code from the GitHub OAuth flow and the redirect URL
   */
  loginWithGitHub: TokenResponse;
  /** Player selects a bug type for a game */
  selectBug: Game;
  /** Player starts a game */
  startGame: Game;
  /** Player unselects a bug type for a game */
  unselectBug: Game;
  /** Update the settings of the user */
  updateSettings: Settings;
};

export type MutationFinishGameArgs = {
  id: Scalars["ID"];
};

export type MutationLoginWithGitHubArgs = {
  code: Scalars["String"];
  redirectUrl?: InputMaybe<Scalars["String"]>;
};

export type MutationSelectBugArgs = {
  bugTypeId: Scalars["Int"];
  gameId: Scalars["ID"];
};

export type MutationStartGameArgs = {
  missionId: Scalars["Int"];
};

export type MutationUnselectBugArgs = {
  bugTypeId: Scalars["Int"];
  gameId: Scalars["ID"];
};

export type MutationUpdateSettingsArgs = {
  settings: SettingsInput;
};

export type Query = {
  __typename?: "Query";
  /** Get a game by id */
  game?: Maybe<Game>;
  /** Get all files for a game (including bugs) */
  gameFiles: Array<File>;
  /** Get the scoreboard position of the user */
  getScoreboardPosition: Scalars["Int"];
  health: Scalars["String"];
  /** Get the current user */
  me: User;
  mission?: Maybe<Mission>;
  missionByTypeLevel?: Maybe<Mission>;
  missions: Array<Mission>;
  missionsByType: Array<Mission>;
  /** Get a scoreboard by mission id */
  scoreboard?: Maybe<Scoreboard>;
  /** Get all scoreboards by mission id */
  scoreboards: Array<Scoreboard>;
};

export type QueryGameArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryGameFilesArgs = {
  gameId: Scalars["ID"];
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

export type Settings = {
  __typename?: "Settings";
  gameSettings?: Maybe<GameSettings>;
  id: Scalars["ID"];
};

export type SettingsInput = {
  gameSettings?: InputMaybe<GameSettingsInput>;
};

/** Response from GitHub login */
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
  settings?: Maybe<Settings>;
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
  BugType: ResolverTypeWrapper<BugType>;
  Date: ResolverTypeWrapper<Scalars["Date"]>;
  Decimal: ResolverTypeWrapper<Scalars["Decimal"]>;
  File: ResolverTypeWrapper<File>;
  Game: ResolverTypeWrapper<Game>;
  GameBug: ResolverTypeWrapper<GameBug>;
  GameSettings: ResolverTypeWrapper<GameSettings>;
  GameSettingsInput: GameSettingsInput;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  Mission: ResolverTypeWrapper<Mission>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Scoreboard: ResolverTypeWrapper<Scoreboard>;
  ScoreboardPaginationInput: ScoreboardPaginationInput;
  Settings: ResolverTypeWrapper<Settings>;
  SettingsInput: SettingsInput;
  String: ResolverTypeWrapper<Scalars["String"]>;
  TokenResponse: ResolverTypeWrapper<TokenResponse>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars["Boolean"];
  BugType: BugType;
  Date: Scalars["Date"];
  Decimal: Scalars["Decimal"];
  File: File;
  Game: Game;
  GameBug: GameBug;
  GameSettings: GameSettings;
  GameSettingsInput: GameSettingsInput;
  ID: Scalars["ID"];
  Int: Scalars["Int"];
  Mission: Mission;
  Mutation: {};
  Query: {};
  Scoreboard: Scoreboard;
  ScoreboardPaginationInput: ScoreboardPaginationInput;
  Settings: Settings;
  SettingsInput: SettingsInput;
  String: Scalars["String"];
  TokenResponse: TokenResponse;
  User: User;
};

export type BugTypeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["BugType"] = ResolversParentTypes["BugType"]
> = {
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
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

export type FileResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["File"] = ResolversParentTypes["File"]
> = {
  content?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GameResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Game"] = ResolversParentTypes["Game"]
> = {
  finishedAt?: Resolver<Maybe<ResolversTypes["Date"]>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  mission?: Resolver<Maybe<ResolversTypes["Mission"]>, ParentType, ContextType>;
  pickedBugs?: Resolver<
    Maybe<Array<ResolversTypes["GameBug"]>>,
    ParentType,
    ContextType
  >;
  score?: Resolver<Maybe<ResolversTypes["Decimal"]>, ParentType, ContextType>;
  startedAt?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GameBugResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["GameBug"] = ResolversParentTypes["GameBug"]
> = {
  bugType?: Resolver<Maybe<ResolversTypes["BugType"]>, ParentType, ContextType>;
  bugTypeId?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  game?: Resolver<Maybe<ResolversTypes["Game"]>, ParentType, ContextType>;
  gameId?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GameSettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["GameSettings"] = ResolversParentTypes["GameSettings"]
> = {
  showTutorial?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MissionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mission"] = ResolversParentTypes["Mission"]
> = {
  bugTypes?: Resolver<
    Maybe<Array<ResolversTypes["BugType"]>>,
    ParentType,
    ContextType
  >;
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
    RequireFields<MutationSelectBugArgs, "bugTypeId" | "gameId">
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
    RequireFields<MutationUnselectBugArgs, "bugTypeId" | "gameId">
  >;
  updateSettings?: Resolver<
    ResolversTypes["Settings"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateSettingsArgs, "settings">
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
  gameFiles?: Resolver<
    Array<ResolversTypes["File"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGameFilesArgs, "gameId">
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

export type SettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Settings"] = ResolversParentTypes["Settings"]
> = {
  gameSettings?: Resolver<
    Maybe<ResolversTypes["GameSettings"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
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
  settings?: Resolver<
    Maybe<ResolversTypes["Settings"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  BugType?: BugTypeResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Decimal?: GraphQLScalarType;
  File?: FileResolvers<ContextType>;
  Game?: GameResolvers<ContextType>;
  GameBug?: GameBugResolvers<ContextType>;
  GameSettings?: GameSettingsResolvers<ContextType>;
  Mission?: MissionResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Scoreboard?: ScoreboardResolvers<ContextType>;
  Settings?: SettingsResolvers<ContextType>;
  TokenResponse?: TokenResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};
