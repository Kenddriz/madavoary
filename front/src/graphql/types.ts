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

export type Adventure = {
  __typename?: 'Adventure';
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

export type AdventurePagination = {
  __typename?: 'AdventurePagination';
  items: Array<Adventure>;
  meta: Meta;
};

export type AdventuresPagination = {
  __typename?: 'AdventuresPagination';
  items: Array<Adventure>;
  meta: Meta;
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
};

export type AuthInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Classification = {
  __typename?: 'Classification';
  classifierId: Scalars['Float'];
  livingBeingId: Scalars['Float'];
};

export type Classifier = {
  __typename?: 'Classifier';
  children: Array<Classifier>;
  id: Scalars['Int'];
  label: Scalars['String'];
  level: Scalars['Int'];
  parentId?: Maybe<Scalars['Int']>;
  translations: Array<Scalars['String']>;
};

export type CountAdventureInput = {
  id: Scalars['Float'];
};

export type CountAdventuresOutput = {
  __typename?: 'CountAdventuresOutput';
  count: Scalars['Int'];
  natureId: Scalars['Int'];
};

export type CreateAdventureInput = {
  description: Scalars['String'];
  naming: Scalars['String'];
  natureId: Scalars['Int'];
  place: Scalars['String'];
};

export type CreateAreaInput = {
  name: Scalars['String'];
  peripherals: Array<PeripheralInput>;
  region: Scalars['String'];
  surface: Scalars['Float'];
  type: Scalars['Int'];
};

export type CreateClassificationInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type CreateClassifierInput = {
  label: Scalars['String'];
  level: Scalars['Int'];
  parentId?: Maybe<Scalars['Int']>;
  translations: Array<Scalars['String']>;
};

export type CreateLivingBeingInput = {
  areaIds: Array<Scalars['Int']>;
  classifierIds: Array<Scalars['Int']>;
  descriptions: Array<Scalars['String']>;
  endemic: Scalars['Boolean'];
  names: Array<Scalars['String']>;
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

export type LivingBeing = {
  __typename?: 'LivingBeing';
  areas: Array<Area>;
  classifiers: Array<Classifier>;
  createdAt: Scalars['DateTime'];
  descriptions: Array<Scalars['String']>;
  endemic: Scalars['Boolean'];
  id: Scalars['Float'];
  images: Array<Scalars['String']>;
  names: Array<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type LivingBeingPagination = {
  __typename?: 'LivingBeingPagination';
  items: Array<LivingBeing>;
  meta: Meta;
};

export type Localization = {
  __typename?: 'Localization';
  areaId: Scalars['Float'];
  livingBeingId: Scalars['Float'];
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

export type MoveClassifierInput = {
  id: Scalars['Int'];
  parentId: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  adventureAddImage?: Maybe<Adventure>;
  adventureRemoveImage?: Maybe<Adventure>;
  createAdventure: Adventure;
  createArea: Area;
  createClassification: Classification;
  createClassifier: Classifier;
  createLivingBeing: LivingBeing;
  createSubscription: Subscription;
  createUser: User;
  createVisit: Visit;
  livingBeingAddImage?: Maybe<LivingBeing>;
  livingBeingRemoveImage?: Maybe<LivingBeing>;
  moveClassifier: Classifier;
  removeAdventure: Adventure;
  removeArea: Area;
  removeClassification: Classification;
  removeClassifier: Classifier;
  removeLivingBeing: LivingBeing;
  removeLocalization: Localization;
  removeSubscription: Subscription;
  removeVisit: Visit;
  updateAdventure: Adventure;
  updateAdventureImage?: Maybe<Adventure>;
  updateArea: Area;
  updateAreaBanner: Area;
  updateClassification: Classification;
  updateClassifier: Classifier;
  updateLivingBeing: LivingBeing;
  updateLivingImage?: Maybe<LivingBeing>;
  updatePassword?: Maybe<User>;
  updateSubscription: Subscription;
  updateUser: User;
  updateUserAvatar: User;
  updateVisit: Visit;
};


export type MutationAdventureAddImageArgs = {
  adventureId: Scalars['Int'];
  image: Scalars['Upload'];
};


export type MutationAdventureRemoveImageArgs = {
  input: UpdateAdventureImageInput;
};


export type MutationCreateAdventureArgs = {
  detail: CreateAdventureInput;
  images: Array<Scalars['Upload']>;
};


export type MutationCreateAreaArgs = {
  banner: Scalars['Upload'];
  input: CreateAreaInput;
};


export type MutationCreateClassificationArgs = {
  createClassificationInput: CreateClassificationInput;
};


export type MutationCreateClassifierArgs = {
  input: CreateClassifierInput;
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


export type MutationLivingBeingAddImageArgs = {
  id: Scalars['Int'];
  image: Scalars['Upload'];
};


export type MutationLivingBeingRemoveImageArgs = {
  input: UpdateImageInput;
};


export type MutationMoveClassifierArgs = {
  input: MoveClassifierInput;
};


export type MutationRemoveAdventureArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveAreaArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveClassificationArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveClassifierArgs = {
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


export type MutationUpdateAdventureArgs = {
  input: UpdateAdventureInput;
};


export type MutationUpdateAdventureImageArgs = {
  image: Scalars['Upload'];
  input: UpdateAdventureImageInput;
};


export type MutationUpdateAreaArgs = {
  banner?: Maybe<Scalars['Upload']>;
  input: UpdateAreaInput;
};


export type MutationUpdateAreaBannerArgs = {
  areaId: Scalars['Int'];
  banner: Scalars['Upload'];
};


export type MutationUpdateClassificationArgs = {
  updateClassificationInput: UpdateClassificationInput;
};


export type MutationUpdateClassifierArgs = {
  input: UpdateClassifierInput;
};


export type MutationUpdateLivingBeingArgs = {
  input: UpdateLivingBeingInput;
};


export type MutationUpdateLivingImageArgs = {
  image: Scalars['Upload'];
  input: UpdateImageInput;
};


export type MutationUpdatePasswordArgs = {
  input: UpdatePasswordInput;
};


export type MutationUpdateSubscriptionArgs = {
  updateSubscriptionInput: UpdateSubscriptionInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationUpdateUserAvatarArgs = {
  avatar: Scalars['Upload'];
  id: Scalars['Int'];
};


export type MutationUpdateVisitArgs = {
  updateVisitInput: UpdateVisitInput;
};

export type PaginateAdventureInput = {
  keyword?: Maybe<Scalars['String']>;
  limit: Scalars['Float'];
  natureId: Scalars['Float'];
  page: Scalars['Float'];
  userId?: Maybe<Scalars['Float']>;
};

export type PaginateAdventuresInput = {
  keyword?: Maybe<Scalars['String']>;
  limit: Scalars['Float'];
  natureIds: Array<Scalars['Float']>;
  order: Scalars['String'];
  page: Scalars['Float'];
  sortBy: Scalars['String'];
};

export type PaginateLivingBeingsInput = {
  keyword?: Maybe<Scalars['String']>;
  limit: Scalars['Float'];
  order: Scalars['String'];
  page: Scalars['Float'];
  sortBy: Scalars['String'];
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

export type Query = {
  __typename?: 'Query';
  _paginateAdventures: AdventurePagination;
  areas: Array<Area>;
  classification: Classification;
  classifiers: Array<Classifier>;
  countAdventures: Array<CountAdventuresOutput>;
  findAdventure?: Maybe<Adventure>;
  findArea?: Maybe<Area>;
  findLivingBeing?: Maybe<LivingBeing>;
  findLivingBeingByName?: Maybe<LivingBeing>;
  login: LoginDto;
  paginateAdventures: AdventuresPagination;
  paginateLivingBeings: LivingBeingPagination;
  paginateUsers: UserPagination;
  subscription: Subscription;
  visit: Visit;
  whoAmI: User;
};


export type Query_PaginateAdventuresArgs = {
  input: PaginateAdventureInput;
};


export type QueryClassificationArgs = {
  id: Scalars['Int'];
};


export type QueryCountAdventuresArgs = {
  input: CountAdventureInput;
};


export type QueryFindAdventureArgs = {
  id: Scalars['Int'];
};


export type QueryFindAreaArgs = {
  id: Scalars['Int'];
};


export type QueryFindLivingBeingArgs = {
  id: Scalars['Int'];
};


export type QueryFindLivingBeingByNameArgs = {
  name: Scalars['String'];
};


export type QueryLoginArgs = {
  input: AuthInput;
};


export type QueryPaginateAdventuresArgs = {
  input: PaginateAdventuresInput;
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

export type UpdateAdventureImageInput = {
  adventureId: Scalars['Float'];
  imageIndex: Scalars['Float'];
};

export type UpdateAdventureInput = {
  description: Scalars['String'];
  id: Scalars['Float'];
  naming: Scalars['String'];
  natureId: Scalars['Int'];
  place: Scalars['String'];
};

export type UpdateAreaInput = {
  id: Scalars['Float'];
  name: Scalars['String'];
  peripherals: Array<PeripheralInput>;
  region: Scalars['String'];
  surface: Scalars['Float'];
  type: Scalars['Int'];
};

export type UpdateClassificationInput = {
  /** Example field (placeholder) */
  exampleField?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type UpdateClassifierInput = {
  id: Scalars['Int'];
  label?: Maybe<Scalars['String']>;
  translations?: Maybe<Array<Scalars['String']>>;
};

export type UpdateImageInput = {
  id: Scalars['Float'];
  index: Scalars['Float'];
};

export type UpdateLivingBeingInput = {
  areaIds: Array<Scalars['Int']>;
  classifierIds: Array<Scalars['Int']>;
  descriptions: Array<Scalars['String']>;
  endemic: Scalars['Boolean'];
  id: Scalars['Int'];
  names: Array<Scalars['String']>;
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
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['Float']>;
  id: Scalars['Int'];
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
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
  avatar: Scalars['String'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  gender: Scalars['Float'];
  id: Scalars['Int'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
  role: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
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
