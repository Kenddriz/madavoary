import {reactive, ref} from 'vue';
import { useMutation } from '@vue/apollo-composable';
import {Collection, MutationCreateCollectionArgs} from 'src/graphql/types';
import {gql} from '@apollo/client';
import {COLLECTION_FIELDS} from 'src/graphql/collection/collection';
import {useLoading} from 'src/graphql/utils/utils';
import {addPaginationCache} from 'src/graphql/utils/pagination';

export type CreateCollectionData = {
  createCollection: Collection
}
export const CREATE_COLLECTION = gql`
  mutation CreateCollection ($images: [Upload!]!, $detail: CreateCollectionInput!) {
    createCollection(images: $images, detail: $detail) {
      ${COLLECTION_FIELDS}
    }
  }
`
export const useCreateCollection = () => {
  const input = reactive<MutationCreateCollectionArgs>({
    images: [],
    detail: {
      naming: '',
      place: '',
      natureId: 0,
      description: ''
    }
  });
  const { loading } = useLoading();
  const { mutate, onDone } = useMutation<
    CreateCollectionData,
    MutationCreateCollectionArgs
    >(CREATE_COLLECTION, {
      context: { hasUpload: true },
      update: (cache, { data }) => {
        if(data?.createCollection) {
          cache.modify({
            fields: {
              paginateCollections(existingRef: any, { toReference }) {
                return addPaginationCache(data.createCollection, existingRef, toReference);
              }
            }
          })
        }
      }
  });
  onDone(({ data }) => {
    loading(`create.${data?.createCollection ? 'success' : 'failed' }`, true);
  });
  const formRef = ref<any>(null);

  function createCollection() {
    loading('loading.create');
    void mutate(input);
  }
  function validate () {
    formRef.value.validate().then((success: boolean) => {
      if (success) createCollection();
    })
  }

  function reset () {
    formRef.value.resetValidation()
  }
  return { createCollection, input, validate, reset, formRef }
}
