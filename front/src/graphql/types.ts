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
  cities: Array<Scalars['String']>;
  contacts: Array<Contact>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  name: Scalars['String'];
  office: Scalars['String'];
  surface: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  user: User;
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
};

export type Contact = {
  __typename?: 'Contact';
  list: Array<Scalars['String']>;
  type: Scalars['Float'];
};

export type Cost = {
  __typename?: 'Cost';
  ageSlice: Scalars['Int'];
  value: Scalars['Float'];
};

export type CreateAreaInput = {
  name: Scalars['String'];
};

export type CreateCollectionInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type CreateDiscoverInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type CreateLocalizationInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type CreatePriceInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type CreateSpeciesInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
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
  date: Scalars['String'];
  description: Array<Scalars['String']>;
  id: Scalars['Int'];
  person: Person;
  species: Species;
};

export type Localization = {
  __typename?: 'Localization';
  area: Area;
  places: Array<Scalars['String']>;
  species: Species;
};

export type Mutation = {
  __typename?: 'Mutation';
  createArea: Area;
  createCollection: Collection;
  createDiscover: Discover;
  createLocalization: Localization;
  createPrice: Price;
  createSpecies: Species;
  createSubscription: Subscription;
  createUser: Person;
  createVisit: Visit;
  removeArea: Area;
  removeCollection: Collection;
  removeDiscover: Discover;
  removeLocalization: Localization;
  removePrice: Price;
  removeSpecies: Species;
  removeSubscription: Subscription;
  removeVisit: Visit;
  updateCollection: Collection;
  updateDiscover: Discover;
  updateLocalization: Localization;
  updatePrice: Price;
  updateSpecies: Species;
  updateSubscription: Subscription;
  updateVisit: Visit;
};


export type MutationCreateAreaArgs = {
  input: CreateAreaInput;
};


export type MutationCreateCollectionArgs = {
  createCollectionInput: CreateCollectionInput;
};


export type MutationCreateDiscoverArgs = {
  createDiscoverInput: CreateDiscoverInput;
};


export type MutationCreateLocalizationArgs = {
  createLocalizationInput: CreateLocalizationInput;
};


export type MutationCreatePriceArgs = {
  createPriceInput: CreatePriceInput;
};


export type MutationCreateSpeciesArgs = {
  createSpeciesInput: CreateSpeciesInput;
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


export type MutationRemoveLocalizationArgs = {
  id: Scalars['Int'];
};


export type MutationRemovePriceArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveSpeciesArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveSubscriptionArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveVisitArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateCollectionArgs = {
  updateCollectionInput: UpdateCollectionInput;
};


export type MutationUpdateDiscoverArgs = {
  updateDiscoverInput: UpdateDiscoverInput;
};


export type MutationUpdateLocalizationArgs = {
  updateLocalizationInput: UpdateLocalizationInput;
};


export type MutationUpdatePriceArgs = {
  updatePriceInput: PriceOutput;
};


export type MutationUpdateSpeciesArgs = {
  updateSpeciesInput: UpdateSpeciesInput;
};


export type MutationUpdateSubscriptionArgs = {
  updateSubscriptionInput: UpdateSubscriptionInput;
};


export type MutationUpdateVisitArgs = {
  updateVisitInput: UpdateVisitInput;
};

export type Person = {
  __typename?: 'Person';
  avatar: Scalars['String'];
  createdAt: Scalars['DateTime'];
  discover: Array<Discover>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  gender: Scalars['Float'];
  id: Scalars['Int'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
};

export type Price = {
  __typename?: 'Price';
  foreigner: Array<Cost>;
  id: Scalars['Int'];
  malagasy: Array<Cost>;
};

export type PriceOutput = {
  /** Example field (placeholder) */
  exampleField?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  area: Area;
  collection: Collection;
  discover: Discover;
  localization: Localization;
  price: Price;
  species: Species;
  subscription: Subscription;
  visit: Visit;
};


export type QueryAreaArgs = {
  id: Scalars['Int'];
};


export type QueryCollectionArgs = {
  id: Scalars['Int'];
};


export type QueryDiscoverArgs = {
  id: Scalars['Int'];
};


export type QueryLocalizationArgs = {
  id: Scalars['Int'];
};


export type QueryPriceArgs = {
  id: Scalars['Int'];
};


export type QuerySpeciesArgs = {
  id: Scalars['Int'];
};


export type QuerySubscriptionArgs = {
  id: Scalars['Int'];
};


export type QueryVisitArgs = {
  id: Scalars['Int'];
};

export type Species = {
  __typename?: 'Species';
  description: Array<Scalars['String']>;
  discover?: Maybe<Discover>;
  id: Scalars['Int'];
  images: Array<Scalars['String']>;
  localizations: Array<Localization>;
  names: Array<Scalars['String']>;
  user: User;
  when: Array<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  verifiedAt: Scalars['DateTime'];
};

export type UpdateCollectionInput = {
  /** Example field (placeholder) */
  exampleField?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type UpdateDiscoverInput = {
  /** Example field (placeholder) */
  exampleField?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type UpdateLocalizationInput = {
  /** Example field (placeholder) */
  exampleField?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type UpdateSpeciesInput = {
  /** Example field (placeholder) */
  exampleField?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type UpdateSubscriptionInput = {
  /** Example field (placeholder) */
  exampleField?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type UpdateVisitInput = {
  /** Example field (placeholder) */
  exampleField?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  disabled: Scalars['Boolean'];
  id: Scalars['Int'];
  password: Scalars['String'];
  person: Person;
  role: Scalars['String'];
  verifiedAt?: Maybe<Scalars['DateTime']>;
};

export type Visit = {
  __typename?: 'Visit';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
};
