import { RoomType } from '@/generated/prisma/client';
import { UserRole } from '@/generated/prisma/client';
import { BookingStatus } from '@/generated/prisma/client';
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from '../context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type EnumResolverSignature<T, AllowedValues = any> = { [key in keyof T]?: AllowedValues };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type AuthResponsePayload = ResponsePayload & {
  __typename?: 'AuthResponsePayload';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Booking = {
  __typename?: 'Booking';
  checkIn: Scalars['DateTime']['output'];
  checkOut: Scalars['DateTime']['output'];
  customer: User;
  customerId: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  logs: Array<RoomLog>;
  room: Room;
  roomId: Scalars['Int']['output'];
  staff?: Maybe<User>;
  staffId?: Maybe<Scalars['String']['output']>;
  status: BookingStatus;
};

export type BookingInput = {
  checkIn: Scalars['DateTime']['input'];
  checkOut: Scalars['DateTime']['input'];
  customerId: Scalars['String']['input'];
  roomId: Scalars['Int']['input'];
};

export type BookingResponsePayload = {
  __typename?: 'BookingResponsePayload';
  code: Scalars['Int']['output'];
  status: BookingStatus;
  success: Scalars['Boolean']['output'];
};

export { BookingStatus };

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBooking: BookingResponsePayload;
  createRoom?: Maybe<Room>;
  createRoomLog: RoomLog;
  login: AuthResponsePayload;
  register: RegisterResponsePayload;
  updateBookingStatus: Booking;
};


export type MutationCreateBookingArgs = {
  input: BookingInput;
};


export type MutationCreateRoomArgs = {
  input: CreateRoomInput;
};


export type MutationCreateRoomLogArgs = {
  bookingId?: InputMaybe<Scalars['Int']['input']>;
  note: Scalars['String']['input'];
  roomId: Scalars['Int']['input'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationUpdateBookingStatusArgs = {
  id: Scalars['Int']['input'];
  status: BookingStatus;
};

export type PasswordResetToken = {
  __typename?: 'PasswordResetToken';
  createdAt: Scalars['DateTime']['output'];
  expires: Scalars['String']['output'];
  id: Scalars['String']['output'];
  token: Scalars['String']['output'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  booking?: Maybe<Booking>;
  bookings: Array<Booking>;
  me?: Maybe<User>;
  room?: Maybe<Room>;
  roomHistory: Array<RoomLog>;
  rooms: Array<Room>;
  searchAvailableRooms: Array<Room>;
  users: Array<User>;
};


export type QueryBookingArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRoomArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRoomHistoryArgs = {
  roomId: Scalars['Int']['input'];
};


export type QueryRoomsArgs = {
  category?: InputMaybe<RoomType>;
};


export type QuerySearchAvailableRoomsArgs = {
  input: SearchRoomInput;
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type RegisterResponsePayload = ResponsePayload & {
  __typename?: 'RegisterResponsePayload';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type ResponsePayload = {
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Room = {
  __typename?: 'Room';
  bookings: Array<Booking>;
  category: RoomType;
  id: Scalars['Int']['output'];
  logs: Array<RoomLog>;
  number: Scalars['String']['output'];
  price: Scalars['Float']['output'];
};

export type RoomLog = {
  __typename?: 'RoomLog';
  booking?: Maybe<Booking>;
  bookingId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  note: Scalars['String']['output'];
  room: Room;
  roomId: Scalars['Int']['output'];
};

export { RoomType };

export type SearchRoomInput = {
  category?: InputMaybe<RoomType>;
  checkIn: Scalars['DateTime']['input'];
  checkOut: Scalars['DateTime']['input'];
};

export type Session = {
  __typename?: 'Session';
  createdAt: Scalars['DateTime']['output'];
  expires: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  token: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type User = {
  __typename?: 'User';
  bookings: Array<Booking>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  role: UserRole;
  staffBookings: Array<Booking>;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export { UserRole };

export type CreateRoomInput = {
  category: RoomType;
  number: Scalars['String']['input'];
  price: Scalars['Float']['input'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;




/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = ResolversObject<{
  ResponsePayload:
    | ( Partial<AuthResponsePayload> )
    | ( Partial<Omit<RegisterResponsePayload, 'user'> & { user?: Maybe<_RefType['User']> }> )
  ;
}>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AuthResponsePayload: ResolverTypeWrapper<Partial<AuthResponsePayload>>;
  Booking: ResolverTypeWrapper<Partial<Omit<Booking, 'customer' | 'logs' | 'room' | 'staff' | 'status'> & { customer: ResolversTypes['User'], logs: Array<ResolversTypes['RoomLog']>, room: ResolversTypes['Room'], staff?: Maybe<ResolversTypes['User']>, status: ResolversTypes['BookingStatus'] }>>;
  BookingInput: ResolverTypeWrapper<Partial<BookingInput>>;
  BookingResponsePayload: ResolverTypeWrapper<Partial<Omit<BookingResponsePayload, 'status'> & { status: ResolversTypes['BookingStatus'] }>>;
  BookingStatus: ResolverTypeWrapper<BookingStatus>;
  Boolean: ResolverTypeWrapper<Partial<Scalars['Boolean']['output']>>;
  DateTime: ResolverTypeWrapper<Partial<Scalars['DateTime']['output']>>;
  Float: ResolverTypeWrapper<Partial<Scalars['Float']['output']>>;
  ID: ResolverTypeWrapper<Partial<Scalars['ID']['output']>>;
  Int: ResolverTypeWrapper<Partial<Scalars['Int']['output']>>;
  LoginInput: ResolverTypeWrapper<Partial<LoginInput>>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  PasswordResetToken: ResolverTypeWrapper<Partial<Omit<PasswordResetToken, 'user'> & { user: ResolversTypes['User'] }>>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  RegisterInput: ResolverTypeWrapper<Partial<RegisterInput>>;
  RegisterResponsePayload: ResolverTypeWrapper<Partial<Omit<RegisterResponsePayload, 'user'> & { user?: Maybe<ResolversTypes['User']> }>>;
  ResponsePayload: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['ResponsePayload']>;
  Room: ResolverTypeWrapper<Partial<Omit<Room, 'bookings' | 'category' | 'logs'> & { bookings: Array<ResolversTypes['Booking']>, category: ResolversTypes['RoomType'], logs: Array<ResolversTypes['RoomLog']> }>>;
  RoomLog: ResolverTypeWrapper<Partial<Omit<RoomLog, 'booking' | 'room'> & { booking?: Maybe<ResolversTypes['Booking']>, room: ResolversTypes['Room'] }>>;
  RoomType: ResolverTypeWrapper<RoomType>;
  SearchRoomInput: ResolverTypeWrapper<Partial<SearchRoomInput>>;
  Session: ResolverTypeWrapper<Partial<Omit<Session, 'user'> & { user: ResolversTypes['User'] }>>;
  String: ResolverTypeWrapper<Partial<Scalars['String']['output']>>;
  User: ResolverTypeWrapper<Partial<Omit<User, 'bookings' | 'role' | 'staffBookings'> & { bookings: Array<ResolversTypes['Booking']>, role: ResolversTypes['UserRole'], staffBookings: Array<ResolversTypes['Booking']> }>>;
  UserRole: ResolverTypeWrapper<UserRole>;
  createRoomInput: ResolverTypeWrapper<Partial<CreateRoomInput>>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AuthResponsePayload: Partial<AuthResponsePayload>;
  Booking: Partial<Omit<Booking, 'customer' | 'logs' | 'room' | 'staff'> & { customer: ResolversParentTypes['User'], logs: Array<ResolversParentTypes['RoomLog']>, room: ResolversParentTypes['Room'], staff?: Maybe<ResolversParentTypes['User']> }>;
  BookingInput: Partial<BookingInput>;
  BookingResponsePayload: Partial<BookingResponsePayload>;
  Boolean: Partial<Scalars['Boolean']['output']>;
  DateTime: Partial<Scalars['DateTime']['output']>;
  Float: Partial<Scalars['Float']['output']>;
  ID: Partial<Scalars['ID']['output']>;
  Int: Partial<Scalars['Int']['output']>;
  LoginInput: Partial<LoginInput>;
  Mutation: Record<PropertyKey, never>;
  PasswordResetToken: Partial<Omit<PasswordResetToken, 'user'> & { user: ResolversParentTypes['User'] }>;
  Query: Record<PropertyKey, never>;
  RegisterInput: Partial<RegisterInput>;
  RegisterResponsePayload: Partial<Omit<RegisterResponsePayload, 'user'> & { user?: Maybe<ResolversParentTypes['User']> }>;
  ResponsePayload: ResolversInterfaceTypes<ResolversParentTypes>['ResponsePayload'];
  Room: Partial<Omit<Room, 'bookings' | 'logs'> & { bookings: Array<ResolversParentTypes['Booking']>, logs: Array<ResolversParentTypes['RoomLog']> }>;
  RoomLog: Partial<Omit<RoomLog, 'booking' | 'room'> & { booking?: Maybe<ResolversParentTypes['Booking']>, room: ResolversParentTypes['Room'] }>;
  SearchRoomInput: Partial<SearchRoomInput>;
  Session: Partial<Omit<Session, 'user'> & { user: ResolversParentTypes['User'] }>;
  String: Partial<Scalars['String']['output']>;
  User: Partial<Omit<User, 'bookings' | 'staffBookings'> & { bookings: Array<ResolversParentTypes['Booking']>, staffBookings: Array<ResolversParentTypes['Booking']> }>;
  createRoomInput: Partial<CreateRoomInput>;
}>;

export type AuthResponsePayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AuthResponsePayload'] = ResolversParentTypes['AuthResponsePayload']> = ResolversObject<{
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BookingResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Booking'] = ResolversParentTypes['Booking']> = ResolversObject<{
  checkIn?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  checkOut?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  customer?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  customerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  logs?: Resolver<Array<ResolversTypes['RoomLog']>, ParentType, ContextType>;
  room?: Resolver<ResolversTypes['Room'], ParentType, ContextType>;
  roomId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  staff?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  staffId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['BookingStatus'], ParentType, ContextType>;
}>;

export type BookingResponsePayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BookingResponsePayload'] = ResolversParentTypes['BookingResponsePayload']> = ResolversObject<{
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['BookingStatus'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
}>;

export type BookingStatusResolvers = EnumResolverSignature<{ BOOKED?: any, CANCELLED?: any, CHECKED_OUT?: any }, ResolversTypes['BookingStatus']>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createBooking?: Resolver<ResolversTypes['BookingResponsePayload'], ParentType, ContextType, RequireFields<MutationCreateBookingArgs, 'input'>>;
  createRoom?: Resolver<Maybe<ResolversTypes['Room']>, ParentType, ContextType, RequireFields<MutationCreateRoomArgs, 'input'>>;
  createRoomLog?: Resolver<ResolversTypes['RoomLog'], ParentType, ContextType, RequireFields<MutationCreateRoomLogArgs, 'note' | 'roomId'>>;
  login?: Resolver<ResolversTypes['AuthResponsePayload'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
  register?: Resolver<ResolversTypes['RegisterResponsePayload'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'input'>>;
  updateBookingStatus?: Resolver<ResolversTypes['Booking'], ParentType, ContextType, RequireFields<MutationUpdateBookingStatusArgs, 'id' | 'status'>>;
}>;

export type PasswordResetTokenResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PasswordResetToken'] = ResolversParentTypes['PasswordResetToken']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  expires?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  booking?: Resolver<Maybe<ResolversTypes['Booking']>, ParentType, ContextType, RequireFields<QueryBookingArgs, 'id'>>;
  bookings?: Resolver<Array<ResolversTypes['Booking']>, ParentType, ContextType>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  room?: Resolver<Maybe<ResolversTypes['Room']>, ParentType, ContextType, RequireFields<QueryRoomArgs, 'id'>>;
  roomHistory?: Resolver<Array<ResolversTypes['RoomLog']>, ParentType, ContextType, RequireFields<QueryRoomHistoryArgs, 'roomId'>>;
  rooms?: Resolver<Array<ResolversTypes['Room']>, ParentType, ContextType, Partial<QueryRoomsArgs>>;
  searchAvailableRooms?: Resolver<Array<ResolversTypes['Room']>, ParentType, ContextType, RequireFields<QuerySearchAvailableRoomsArgs, 'input'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
}>;

export type RegisterResponsePayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['RegisterResponsePayload'] = ResolversParentTypes['RegisterResponsePayload']> = ResolversObject<{
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResponsePayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ResponsePayload'] = ResolversParentTypes['ResponsePayload']> = ResolversObject<{
  __resolveType: TypeResolveFn<'AuthResponsePayload' | 'RegisterResponsePayload', ParentType, ContextType>;
}>;

export type RoomResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Room'] = ResolversParentTypes['Room']> = ResolversObject<{
  bookings?: Resolver<Array<ResolversTypes['Booking']>, ParentType, ContextType>;
  category?: Resolver<ResolversTypes['RoomType'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  logs?: Resolver<Array<ResolversTypes['RoomLog']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
}>;

export type RoomLogResolvers<ContextType = Context, ParentType extends ResolversParentTypes['RoomLog'] = ResolversParentTypes['RoomLog']> = ResolversObject<{
  booking?: Resolver<Maybe<ResolversTypes['Booking']>, ParentType, ContextType>;
  bookingId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  note?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  room?: Resolver<ResolversTypes['Room'], ParentType, ContextType>;
  roomId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
}>;

export type RoomTypeResolvers = EnumResolverSignature<{ DOUBLE?: any, LUXURY?: any, SINGLE?: any }, ResolversTypes['RoomType']>;

export type SessionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Session'] = ResolversParentTypes['Session']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  expires?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  bookings?: Resolver<Array<ResolversTypes['Booking']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['UserRole'], ParentType, ContextType>;
  staffBookings?: Resolver<Array<ResolversTypes['Booking']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type UserRoleResolvers = EnumResolverSignature<{ CUSTOMER?: any, STAFF?: any }, ResolversTypes['UserRole']>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  AuthResponsePayload?: AuthResponsePayloadResolvers<ContextType>;
  Booking?: BookingResolvers<ContextType>;
  BookingResponsePayload?: BookingResponsePayloadResolvers<ContextType>;
  BookingStatus?: BookingStatusResolvers;
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  PasswordResetToken?: PasswordResetTokenResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RegisterResponsePayload?: RegisterResponsePayloadResolvers<ContextType>;
  ResponsePayload?: ResponsePayloadResolvers<ContextType>;
  Room?: RoomResolvers<ContextType>;
  RoomLog?: RoomLogResolvers<ContextType>;
  RoomType?: RoomTypeResolvers;
  Session?: SessionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserRole?: UserRoleResolvers;
}>;

