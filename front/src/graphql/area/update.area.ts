import {Area, MutationUpdateAreaArgs, UpdateAreaInput} from 'src/graphql/types';
import {useMutation} from '@vue/apollo-composable';
import {AREA_FIELDS} from 'src/graphql/area/area';
import {gql} from '@apollo/client';
import {useLoading} from 'src/graphql/utils/utils';

export type UpdateAreaData = {
  updateArea: Area
}

export const UPDATE_AREA = gql`
  mutation UpdateArea($input: UpdateAreaInput!) {
    updateArea(input: $input) {
      ${AREA_FIELDS}
    }
  }
`;

export const useUpdateArea = () => {
  const { loading } = useLoading();
  const { mutate,onDone } = useMutation<
    UpdateAreaData,
    MutationUpdateAreaArgs
    >(UPDATE_AREA);

  onDone(({ data }) => {
    loading(`update.${data?.updateArea ? 'success' : 'failed'}`, true);
  })
  function updateArea(input: UpdateAreaInput) {
    loading('loading.update');
    void mutate({input});
  }
  return { updateArea }
}
