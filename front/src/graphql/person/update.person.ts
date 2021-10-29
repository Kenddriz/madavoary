import {MutationUpdatePersonAvatarArgs, Person} from 'src/graphql/types';
import {useMutation} from '@vue/apollo-composable';
import {gql} from '@apollo/client';
import {useLoading} from 'src/graphql/utils/utils';

type UpdatePersonAvatarData = {
  updatePersonAvatar: Person;
}
const UPDATE_PERSON_AVATAR = gql`
  mutation UpdatePersonAvatar($avatar: Upload!, $id: Int!) {
    updatePersonAvatar(avatar: $avatar, id: $id){
      id
      updatedAt
      avatar
    }
  }
`
export const useUpdatePersonAvatar = () => {
  const { loading } = useLoading();
  const { mutate, onDone } = useMutation<
    UpdatePersonAvatarData,
    MutationUpdatePersonAvatarArgs
    >(UPDATE_PERSON_AVATAR, { context: {hasUpload: true}});
  onDone(({ data }) => {
    loading(`update.${data?.updatePersonAvatar ? 'success' : 'failed'}`, true);
  })
  function updateAvatar(file: File, id: number) {
    loading('loading.upload');
    void mutate({ avatar: file, id });
  }
  return { updateAvatar }
}
