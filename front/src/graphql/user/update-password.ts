import {useMutation} from '@vue/apollo-composable';
import {gql} from '@apollo/client';
import {User, UpdatePasswordInput, MutationUpdatePasswordArgs} from 'src/graphql/types';
import {useLoading} from 'src/graphql/utils/utils';
import {reactive, ref} from 'vue';

export type UpdatePasswordData = {
  updatePassword: User;
}
export const UPDATE_PASSWORD = gql`
  mutation UpdatePassword($input: UpdatePasswordInput!){
    updatePassword(input: $input) {
      id
      person { id updatedAt }
    }
  }
`;

export const useUpdatePassword = () => {
  const { loading } = useLoading();
  const input = reactive<UpdatePasswordInput>({
    currentPassword: '',
    newPassword: ''
  });
  const dialog = ref(false);
  const { mutate, onDone } = useMutation<
    UpdatePasswordData,
    MutationUpdatePasswordArgs
    >(UPDATE_PASSWORD, { variables: {input} });
  onDone(({ data }) => {
    dialog.value = false;
    loading(`update.${data?.updatePassword ? 'success' : 'wrongCurPwd'}`, true);
  });
  function submitUpdate() {
    loading('loading.update')
    void mutate();
  }
  return { input, submitUpdate, dialog }
}
