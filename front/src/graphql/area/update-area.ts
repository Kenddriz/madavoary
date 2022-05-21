import {Area, MutationUpdateAreaArgs, UpdateAreaInput} from 'src/graphql/types';
import {useMutation} from '@vue/apollo-composable';
import {AREA_FIELDS} from 'src/graphql/area/area';
import {gql} from '@apollo/client';
import {useLoading} from 'src/graphql/utils/utils';
import {reactive, ref} from 'vue';

export type UpdateAreaData = {
  updateArea: Area
}

export const UPDATE_AREA = gql`
  mutation UpdateArea($input: UpdateAreaInput!, $banner: Upload) {
    updateArea(input: $input,  banner: $banner) {
      ${AREA_FIELDS}
    }
  }
`;

export const useUpdateArea = () => {
  const { loading } = useLoading();
  const input = reactive<UpdateAreaInput>({
    id: 0,
    name: '',
    type: 0,
    peripherals: [],
    region: '',
    surface: 0
  });
  const banner = ref([]);
  const { mutate,onDone } = useMutation<
    UpdateAreaData,
    MutationUpdateAreaArgs
    >(UPDATE_AREA, { context: {hasUpload: true} });

  onDone(({ data }) => {
    loading(`update.${data?.updateArea ? 'success' : 'failed'}`, true);
  })
  function updateArea() {
    loading('loading.update');
    void mutate({ input, banner: banner.value[0] });
  }
  return { updateArea, input, banner }
}
