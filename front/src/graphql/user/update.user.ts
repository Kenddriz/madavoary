import {useMutation} from '@vue/apollo-composable';
import {MutationUpdateUserArgs, UpdateUserInput, User} from 'src/graphql/types';
import {gql} from '@apollo/client';
import {USER_FIELDS} from 'src/graphql/user/user';
import {useLoading} from 'src/graphql/utils/utils';
import {reactive} from 'vue';

export type UpdateUserData = {
  updateUser: User;
}
const UPDATE_USER = gql`
    mutation UpdateUser($input: UpdateUserInput!) {
      updateUser(input: $input) {
        ${USER_FIELDS}
      }
    }
`;
export const useUpdateUser = (user: User) => {
  const { loading } = useLoading();
  const input = reactive<UpdateUserInput>({
    email: user.email,
    firstName: user.firstName,
    gender: user.gender,
    id: user.id,
    lastName: user.lastName,
    phone: user.phone,
    role: user.role,
    active: user.active
  });
  const { onDone, mutate } = useMutation<
    UpdateUserData,
    MutationUpdateUserArgs
    >(UPDATE_USER, {variables: { input } });
  onDone(({ data }) => {
    loading(`update.${data?.updateUser ? 'success' : 'failed'}`, true);
  })
  function submitUpdate() {
    loading('loading.update');
    void mutate();
  }
  return { submitUpdate, input }
}
