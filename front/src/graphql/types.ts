export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Area = {
  __typename?: 'Area';
  banner: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  name: Scalars['String'];
  peripherals: Array<Peripheral>;
  region: Scalars['String'];
  surface: Scalars['Float'];
  type: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type AuthInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Collection = {
  __typename?: 'Collection';
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['Int'];
  images: Array<Scalars['String']>;
  naming: Scalars['String'];
  natureId: Scalars['Float'];
  place: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['Float'];
};

export type CollectionPagination = {
  __typename?: 'CollectionPagination';
  items: Array<Collection>;
  meta: Meta;
};

export type Cost = {
  __typename?: 'Cost';
  ageSlice: Scalars['Int'];
  value: Scalars['Float'];
};

export type CountCollectionInput = {
  id: Scalars['Float'];
};

export type CountCollectionsOutput = {
  __typename?: 'CountCollectionsOutput';
  count: Scalars['Int'];
  natureId: Scalars['Int'];
};

export type CreateAreaInput = {
  name: Scalars['String'];
  peripherals: Array<PeripheralInput>;
  region: Scalars['String'];
  surface: Scalars['Float'];
  type: Scalars['Int'];
};

export type CreateCollectionInput = {
  description: Scalars['String'];
  naming: Scalars['String'];
  natureId: Scalars['Int'];
  place: Scalars['String'];
};

export type CreateDiscoverInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type CreateLivingBeingInput = {
  characteristics: Array<Scalars['String']>;
  endangered: Scalars['Boolean'];
  endemic: Scalars['Boolean'];
  localNames: Array<Scalars['String']>;
  localizationInput: CreateLocalizationInput;
  names: Array<Scalars['String']>;
};

export type CreateLocalizationInput = {
  areaId: Scalars['Int'];
  places: Array<Scalars['String']>;
};

export type CreateSubscriptionInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  gender: Scalars['Float'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
};

export type CreateVisitInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type Discover = {
  __typename?: 'Discover';
  id: Scalars['Int'];
  livingBeing: LivingBeing;
  person: Person;
  validatedAt?: Maybe<Scalars['DateTime']>;
  when: Scalars['String'];
};

export type LivingBeing = {
  __typename?: 'LivingBeing';
  characteristics: Array<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  discover?: Maybe<Discover>;
  endangered: Scalars['Boolean'];
  endemic: Scalars['Boolean'];
  id: Scalars['Float'];
  images: Array<Scalars['String']>;
  localNames: Array<Scalars['Float']>;
  localizations: Array<Localization>;
  names: Array<Scalars['Float']>;
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type LivingBeingPagination = {
  __typename?: 'LivingBeingPagination';
  items: Array<LivingBeing>;
  meta: Meta;
};

export type Localization = {
  __typename?: 'Localization';
  area?: Maybe<Area>;
  id: Scalars['Int'];
  livingBeing: LivingBeing;
  places: Array<Scalars['String']>;
};

export type LoginDto = {
  __typename?: 'LoginDto';
  token: Scalars['String'];
  user: User;
};

export type Meta = {
  __typename?: 'Meta';
  currentPage: Scalars['Float'];
  itemCount: Scalars['Float'];
  itemsPerPage: Scalars['Float'];
  totalItems?: Maybe<Scalars['Float']>;
  totalPages?: Maybe<Scalars['Float']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addCollectionImage: Collection;
  createArea: Area;
  createCollection: Collection;
  createDiscover: Discover;
  createLivingBeing: LivingBeing;
  createSubscription: Subscription;
  createUser: User;
  createVisit: Visit;
  removeArea: Area;
  removeCollection: Collection;
  removeDiscover: Discover;
  removeLivingBeing: LivingBeing;
  removeLocalization: Localization;
  removeSubscription: Subscription;
  removeVisit: Visit;
  updateArea: Area;
  updateAreaBanner: Area;
  updateCollection: Collection;
  updateCollectionImage: Collection;
  updateDiscover: Discover;
  updatePassword?: Maybe<User>;
  updatePersonAvatar: Person;
  updateSubscription: Subscription;
  updateUser: User;
  updateVisit: Visit;
};


export type MutationAddCollectionImageArgs = {
  collectionId: Scalars['Int'];
  image: Scalars['Upload'];
};


export type MutationCreateAreaArgs = {
  banner: Scalars['Upload'];
  input: CreateAreaInput;
};


export type MutationCreateCollectionArgs = {
  detail: CreateCollectionInput;
  images: Array<Scalars['Upload']>;
};


export type MutationCreateDiscoverArgs = {
  createDiscoverInput: CreateDiscoverInput;
};


export type MutationCreateLivingBeingArgs = {
  images: Array<Scalars['Upload']>;
  input: CreateLivingBeingInput;
};


export type MutationCreateSubscriptionArgs = {
  createSubscriptionInput: CreateSubscriptionInput;
};


export type MutationCreateUserArgs = {
  avatar: Scalars['Upload'];
  input: CreateUserInput;
};


export type MutationCreateVisitArgs = {
  createVisitInput: CreateVisitInput;
};


export type MutationRemoveAreaArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveCollectionArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveDiscoverArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveLivingBeingArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveLocalizationArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveSubscriptionArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveVisitArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateAreaArgs = {
  input: UpdateAreaInput;
};


export type MutationUpdateAreaBannerArgs = {
  areaId: Scalars['Int'];
  banner: Scalars['Upload'];
};


export type MutationUpdateCollectionArgs = {
  input: UpdateCollectionInput;
};


export type MutationUpdateCollectionImageArgs = {
  image: Scalars['Upload'];
  input: UpdateCollectionImageInput;
};


export type MutationUpdateDiscoverArgs = {
  input: UpdateDiscoverInput;
};


export type MutationUpdatePasswordArgs = {
  input: UpdatePasswordInput;
};


export type MutationUpdatePersonAvatarArgs = {
  avatar: Scalars['Upload'];
  id: Scalars['Int'];
};


export type MutationUpdateSubscriptionArgs = {
  updateSubscriptionInput: UpdateSubscriptionInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationUpdateVisitArgs = {
  updateVisitInput: UpdateVisitInput;
};

export type PaginateCollectionInput = {
  keyword?: Maybe<Scalars['String']>;
  limit: Scalars['Float'];
  natureId: Scalars['Float'];
  page: Scalars['Float'];
  userId: Scalars['Float'];
};

export type PaginateLivingBeingsInput = {
  areaId: Scalars['Int'];
  keyword?: Maybe<Scalars['String']>;
  limit: Scalars['Float'];
  page: Scalars['Float'];
};

export type PaginateUserInput = {
  filter: Array<Scalars['String']>;
  keyword?: Maybe<Scalars['String']>;
  limit: Scalars['Float'];
  page: Scalars['Float'];
};

export type Peripheral = {
  __typename?: 'Peripheral';
  city: Scalars['String'];
  distance: Scalars['Float'];
};

export type PeripheralInput = {
  city: Scalars['String'];
  distance: Scalars['Float'];
};

export type Person = {
  __typename?: 'Person';
  avatar: Scalars['String'];
  createdAt: Scalars['DateTime'];
  discovers: Array<Discover>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  gender: Scalars['Float'];
  id: Scalars['Int'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
};

export type Query = {
  __typename?: 'Query';
  areas: Array<Area>;
  countCollections: Array<CountCollectionsOutput>;
  discover: Discover;
  findLivingBeingByName: LivingBeing;
  login: LoginDto;
  paginateCollections: CollectionPagination;
  paginateLivingBeings: LivingBeingPagination;
  paginateUsers: UserPagination;
  subscription: Subscription;
  visit: Visit;
  whoAmI: User;
};


export type QueryCountCollectionsArgs = {
  input: CountCollectionInput;
};


export type QueryDiscoverArgs = {
  id: Scalars['Int'];
};


export type QueryFindLivingBeingByNameArgs = {
  name: Scalars['String'];
};


export type QueryLoginArgs = {
  input: AuthInput;
};


export type QueryPaginateCollectionsArgs = {
  input: PaginateCollectionInput;
};


export type QueryPaginateLivingBeingsArgs = {
  input: PaginateLivingBeingsInput;
};


export type QueryPaginateUsersArgs = {
  input: PaginateUserInput;
};


export type QuerySubscriptionArgs = {
  id: Scalars['Int'];
};


export type QueryVisitArgs = {
  id: Scalars['Int'];
};

export type Subscription = {
  __typename?: 'Subscription';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  verifiedAt: Scalars['DateTime'];
};

export type UpdateAreaInput = {
  id: Scalars['Float'];
  name: Scalars['String'];
  peripherals: Array<PeripheralInput>;
  region: Scalars['String'];
  surface: Scalars['Float'];
  type: Scalars['Int'];
};

export type UpdateCollectionImageInput = {
  collectionId: Scalars['Float'];
  imageIndex: Scalars['Float'];
};

export type UpdateCollectionInput = {
  description: Scalars['String'];
  id: Scalars['Float'];
  naming: Scalars['String'];
  natureId: Scalars['Int'];
  place: Scalars['String'];
};

export type UpdateDiscoverInput = {
  /** Example field (placeholder) */
  exampleField?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type UpdatePasswordInput = {
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
};

export type UpdateSubscriptionInput = {
  /** Example field (placeholder) */
  exampleField?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type UpdateUserInput = {
  active: Scalars['Boolean'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  gender: Scalars['Float'];
  id: Scalars['Int'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
  role: Scalars['Int'];
};

export type UpdateVisitInput = {
  /** Example field (placeholder) */
  exampleField?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  active: Scalars['Boolean'];
  id: Scalars['Int'];
  password: Scalars['String'];
  person: Person;
  role: Scalars['Float'];
  verifiedAt?: Maybe<Scalars['DateTime']>;
};

export type UserPagination = {
  __typename?: 'UserPagination';
  items: Array<User>;
  meta: Meta;
};

export type Visit = {
  __typename?: 'Visit';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
};
