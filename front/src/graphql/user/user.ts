import {PERSON_FIELDS} from 'src/graphql/person/person';

export const USER_FIELDS = `
  id
  verifiedAt
  role
  active
  person{${PERSON_FIELDS}}
`;
