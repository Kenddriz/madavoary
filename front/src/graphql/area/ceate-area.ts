import {Area, CreateAreaInput, MutationCreateAreaArgs} from 'src/graphql/types';
import {gql} from '@apollo/client';
import {AREA_FIELDS} from 'src/graphql/area/area';
import {USER_FIELDS} from 'src/graphql/user/user';
import {useMutation} from '@vue/apollo-composable';
import {useLoading} from 'src/graphql/utils/utils';

type CreateAreaData = {
  createArea: Area;
}
const CREATE_AREA = gql`
  mutation CreateArea($banner: Upload!, $input: CreateAreaInput!){
    createArea(banner: $banner, input: $input){
      ${AREA_FIELDS}
      user{${USER_FIELDS}}
    }
  }
`;
export const useCreateArea = () => {
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
    loading(`create.${data?.createArea ? 'success' : 'failed'}`, true);
  });
  function submitCreate(input: CreateAreaInput, banner: File) {
    loading('loading.create');
    void mutate({ input, banner });
  }
  return { submitCreate }
}
