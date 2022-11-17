import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Bug = {
  __typename?: 'Bug';
  bugOnGames: Array<BugOnGame>;
  description: Scalars['String'];
  id: Scalars['Int'];
  mission: Mission;
  missionId: Scalars['ID'];
  name: Scalars['String'];
  realBug: Scalars['Boolean'];
};

export type BugOnGame = {
  __typename?: 'BugOnGame';
  bug: Bug;
  bugId: Scalars['ID'];
  game: Game;
  gameId: Scalars['ID'];
};

export type Game = {
  __typename?: 'Game';
  bugOnGames: Array<BugOnGame>;
  finished: Scalars['Boolean'];
  finishedAt: Scalars['Date'];
  id: Scalars['Int'];
  mission: Mission;
  missionId: Scalars['ID'];
  score: Scalars['Int'];
  startedAt: Scalars['Date'];
  user: User;
  userId: Scalars['ID'];
};

export type Mission = {
  __typename?: 'Mission';
  description: Scalars['String'];
  id: Scalars['Int'];
  level: Scalars['Int'];
  title: Scalars['String'];
  type: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  bugs: Array<Bug>;
  game?: Maybe<Game>;
  games: Array<Game>;
  me?: Maybe<User>;
  mission?: Maybe<Mission>;
  missions: Array<Mission>;
};


export type QueryBugsArgs = {
  missionId: Scalars['Int'];
};


export type QueryGameArgs = {
  id: Scalars['Int'];
};


export type QueryMissionArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Bug: ResolverTypeWrapper<Bug>;
  BugOnGame: ResolverTypeWrapper<BugOnGame>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Game: ResolverTypeWrapper<Game>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mission: ResolverTypeWrapper<Mission>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Bug: Bug;
  BugOnGame: BugOnGame;
  Date: Scalars['Date'];
  Game: Game;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mission: Mission;
  Query: {};
  String: Scalars['String'];
  User: User;
};

export type BugResolvers<ContextType = any, ParentType extends ResolversParentTypes['Bug'] = ResolversParentTypes['Bug']> = {
  bugOnGames?: Resolver<Array<ResolversTypes['BugOnGame']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  mission?: Resolver<ResolversTypes['Mission'], ParentType, ContextType>;
  missionId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  realBug?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BugOnGameResolvers<ContextType = any, ParentType extends ResolversParentTypes['BugOnGame'] = ResolversParentTypes['BugOnGame']> = {
  bug?: Resolver<ResolversTypes['Bug'], ParentType, ContextType>;
  bugId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  game?: Resolver<ResolversTypes['Game'], ParentType, ContextType>;
  gameId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type GameResolvers<ContextType = any, ParentType extends ResolversParentTypes['Game'] = ResolversParentTypes['Game']> = {
  bugOnGames?: Resolver<Array<ResolversTypes['BugOnGame']>, ParentType, ContextType>;
  finished?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  finishedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  mission?: Resolver<ResolversTypes['Mission'], ParentType, ContextType>;
  missionId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  startedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MissionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mission'] = ResolversParentTypes['Mission']> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  level?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  bugs?: Resolver<Array<ResolversTypes['Bug']>, ParentType, ContextType, RequireFields<QueryBugsArgs, 'missionId'>>;
  game?: Resolver<Maybe<ResolversTypes['Game']>, ParentType, ContextType, RequireFields<QueryGameArgs, 'id'>>;
  games?: Resolver<Array<ResolversTypes['Game']>, ParentType, ContextType>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  mission?: Resolver<Maybe<ResolversTypes['Mission']>, ParentType, ContextType, RequireFields<QueryMissionArgs, 'id'>>;
  missions?: Resolver<Array<ResolversTypes['Mission']>, ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Bug?: BugResolvers<ContextType>;
  BugOnGame?: BugOnGameResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Game?: GameResolvers<ContextType>;
  Mission?: MissionResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

