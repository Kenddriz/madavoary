export const LIVING_BEING_FIELDS = `
  id
  names
  images
  descriptions
  endemic
  createdAt
  updatedAt
`;

export const defaultLivingBeingInput = {
  descriptions: Array(2).fill(''),
  endemic: false,
  areaIds: [],
  classifierIds: Array(32).fill(null),
  names: Array(4).fill('')
};
