import { Area, CreateAreaInput, MutationCreateAreaArgs } from 'src/graphql/types';
import { gql } from '@apollo/client';
import { AREA_FIELDS } from 'src/graphql/area/area';
import { useMutation } from '@vue/apollo-composable';
import { useLoading } from 'src/graphql/utils/utils';
import { reactive, ref } from 'vue';

type CreateAreaData = {
  createArea: Area;
}
const CREATE_AREA = gql`
  mutation CreateArea($banner: Upload!, $input: CreateAreaInput!){
    createArea(banner: $banner, input: $input){
      ${AREA_FIELDS}
    }
  }
`;
export const useCreateArea = () => {
  const input = reactive<CreateAreaInput>({
    name: '',
    type: 0,
    peripherals: [],
    region: '',
    surface: 0
  });
  const banner = ref([]);
  const { loading } = useLoading();

  const { mutate, onDone } = useMutation<
    CreateAreaData,
    MutationCreateAreaArgs
    >(CREATE_AREA, {
      context: {hasUpload: true},
      update(cache, { data }) {
        if(data?.createArea) {
          cache.modify({
            fields: {
              areas(existing: any[], {toReference}) {
                return [toReference(data.createArea), ...existing];
              }
            }
          })
        }
      }
    });
  onDone(({ data }) => {
    if (data?.createArea) {
      loading('create.success', true);
      input.name = '';
      input.type = 0;
      input.peripherals = [];
      input.region = '';
      input.surface = 0;
      banner.value = [];
    } else loading('create.failed', true);
  });
  function submitCreate() {
    loading('loading.create');
    void mutate({ input, banner: banner.value[0] });
  }
  return { submitCreate, input, banner }
}
