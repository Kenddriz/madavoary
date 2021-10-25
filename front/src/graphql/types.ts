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

export type CreateParkInput = {
  name: Scalars['String'];
};

export type CreateSpeciesInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type CreateSubscriptionInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
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
  parksId: Scalars['Float'];
  place: Scalars['String'];
  speciesId: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCollection: Collection;
  createDiscover: Discover;
  createLocalization: Localization;
  createPark: Park;
  createSpecies: Species;
  createSubscription: Subscription;
  createVisit: Visit;
  removeCollection: Collection;
  removeDiscover: Discover;
  removeLocalization: Localization;
  removePark: Park;
  removeSpecies: Species;
  removeSubscription: Subscription;
  removeVisit: Visit;
  updateCollection: Collection;
  updateDiscover: Discover;
  updateLocalization: Localization;
  updateSpecies: Species;
  updateSubscription: Subscription;
  updateVisit: Visit;
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


export type MutationCreateParkArgs = {
  input: CreateParkInput;
};


export type MutationCreateSpeciesArgs = {
  createSpeciesInput: CreateSpeciesInput;
};


export type MutationCreateSubscriptionArgs = {
  createSubscriptionInput: CreateSubscriptionInput;
};


export type MutationCreateVisitArgs = {
  createVisitInput: CreateVisitInput;
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


export type MutationRemoveParkArgs = {
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


export type MutationUpdateSpeciesArgs = {
  updateSpeciesInput: UpdateSpeciesInput;
};


export type MutationUpdateSubscriptionArgs = {
  updateSubscriptionInput: UpdateSubscriptionInput;
};


export type MutationUpdateVisitArgs = {
  updateVisitInput: UpdateVisitInput;
};

export type Park = {
  __typename?: 'Park';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  name: Scalars['String'];
  species: Array<Species>;
  updatedAt: Scalars['DateTime'];
};

export type Person = {
  __typename?: 'Person';
  address: Scalars['String'];
  avatar: Scalars['String'];
  city: Scalars['String'];
  createdAt: Scalars['DateTime'];
  discover: Array<Discover>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['Int'];
  images: Array<Scalars['String']>;
  lastName: Scalars['String'];
  phone: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
};

export type Query = {
  __typename?: 'Query';
  collection: Collection;
  discover: Discover;
  localization: Localization;
  park: Park;
  species: Species;
  subscription: Subscription;
  visit: Visit;
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


export type QueryParkArgs = {
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
  names: Array<Scalars['String']>;
  parks: Array<Park>;
  when: Scalars['DateTime'];
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
  id: Scalars['Int'];
  password: Scalars['String'];
  person: Person;
  role: Scalars['String'];
  verifiedAt: Scalars['DateTime'];
};

export type Visit = {
  __typename?: 'Visit';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
};
