import {LivingBeing, MutationUpdateLivingBeingArgs, UpdateLivingBeingInput} from 'src/graphql/types';
import {gql} from '@apollo/client';
import {LIVING_BEING_FIELDS} from 'src/graphql/living-being/living-being';
import {useLoading} from 'src/graphql/utils/utils';
import {useMutation} from '@vue/apollo-composable';

type UpdateLivingBeingData = {
  updateLivingBeing: LivingBeing;
}

const UPDATE_LIVING_BEING = gql`
  mutation UpdateLivingBeing($input: UpdateLivingBeingInput!){
    updateLivingBeing(input: $input){
      ${LIVING_BEING_FIELDS}
      areas{id}
      classifiers{id level}
    }
  }
`;

export const useUpdateLivingBeing = () => {
  const { loading } = useLoading();
  const { mutate,onDone } = useMutation<
    UpdateLivingBeingData,
    MutationUpdateLivingBeingArgs
    >(UPDATE_LIVING_BEING);
  onDone(({ data }) => {
    loading(`update.${data?.updateLivingBeing ? 'success' : 'failed'}`, true);
  })
  function updateLivingBeing(input: UpdateLivingBeingInput) {
    loading('loading.update');
    void mutate({
      input: {
        ...input,
        classifierIds: input.classifierIds.filter(c => c !== null)
      }
    });
  }
  return { updateLivingBeing }
}
