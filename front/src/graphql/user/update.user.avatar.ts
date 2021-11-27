import {MutationUpdateUserAvatarArgs, User} from 'src/graphql/types';
import {useMutation} from '@vue/apollo-composable';
import {gql} from '@apollo/client';
import {useLoading} from 'src/graphql/utils/utils';

type UpdateUserAvatarData = {
  updateUserAvatar: User;
}
const UPDATE_USER_AVATAR = gql`
  mutation UpdateUserAvatar($avatar: Upload!, $id: Int!) {
    updateUserAvatar(avatar: $avatar, id: $id){
      id
      updatedAt
      avatar
    }
  }
`
export const useUpdateUserAvatar = () => {
  const { loading } = useLoading();
  const { mutate, onDone } = useMutation<
    UpdateUserAvatarData,
    MutationUpdateUserAvatarArgs
    >(UPDATE_USER_AVATAR, { context: {hasUpload: true}});
  onDone(({ data }) => {
    loading(`update.${data?.updateUserAvatar ? 'success' : 'failed'}`, true);
  })
  function updateAvatar(file: File, id: number) {
    loading('loading.upload');
    void mutate({ avatar: file, id });
  }
  return { updateAvatar }
}
