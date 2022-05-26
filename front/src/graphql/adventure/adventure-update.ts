import {Adventure, MutationUpdateAdventureArgs, UpdateAdventureInput} from 'src/graphql/types';
import {useMutation} from '@vue/apollo-composable';
import { ADVENTURE_FIELDS } from 'src/graphql/adventure/adventure';
import {gql} from '@apollo/client';
import {useLoading} from 'src/graphql/utils/utils';

export type UpdateAdventureData = {
  updateAdventure: Adventure
}

export const UPDATE_COLLECTION = gql`
  mutation UpdateAdventure($input: UpdateAdventureInput!) {
    updateAdventure(input: $input) {
      ${ADVENTURE_FIELDS}
    }
  }
`;

export const useUpdateAdventure = () => {
  const { loading } = useLoading();
  const { mutate,onDone } = useMutation<
    UpdateAdventureData,
    MutationUpdateAdventureArgs
    >(UPDATE_COLLECTION);
  onDone(({ data }) => {
    loading(`update.${data?.updateAdventure ? 'success' : 'failed'}`, true);
  })
  function updateAdventure(input: UpdateAdventureInput) {
    loading('loading.update');
    void mutate({input});
  }
  return { updateAdventure }
}
