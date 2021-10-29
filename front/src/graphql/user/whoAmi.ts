import { useQuery, useResult } from '@vue/apollo-composable';
import {USER_FIELDS} from 'src/graphql/user/user';
import {gql} from '@apollo/client';
import {User} from 'src/graphql/types';
import {PERSON_FIELDS} from 'src/graphql/person/person';

export type WhoAmIData = {
  whoAmI: User
}

export const CURRENT_USER = gql`
  query WhoAmI {
    whoAmI {
      ${USER_FIELDS}
      person{${PERSON_FIELDS}}
    }
  }
`;
export const getAvatar = (avatar: any) => {
  if(avatar)
    return process.env.uri + 'avatars/persons/' + avatar;
  return 'travelers.svg';
}
export const useWHoAmI = () => {
  const { loading, result } = useQuery<WhoAmIData>(CURRENT_USER);
  const user = useResult<WhoAmIData|undefined, User, User>(result, undefined, res => res?.whoAmI);
  function avatar() {
    return getAvatar(user.value?.person?.avatar);
  }
  return { loading, user, avatar }
}
