import {Collection, MutationUpdateCollectionArgs, UpdateCollectionInput} from 'src/graphql/types';
import {reactive, ref} from 'vue';
import {useMutation} from '@vue/apollo-composable';
import {COLLECTION_FIELDS} from 'src/graphql/collection/collection';
import {gql} from '@apollo/client';
import {useLoading} from 'src/graphql/utils/utils';

export type UpdateCollectionData = {
  updateCollection: Collection
}

export const UPDATE_COLLECTION = gql`
  mutation UpdateCollection($input: UpdateCollectionInput!) {
    updateCollection(input: $input) {
      ${COLLECTION_FIELDS}
    }
  }
`;

export const useUpdateCollection = (collection: Collection) => {
  const { id, naming, place, description, natureId } = collection;
  const { loading } = useLoading();
  const input = reactive<UpdateCollectionInput>({
    natureId,
    id, naming, place, description
  });
  const { mutate,onDone } = useMutation<
    UpdateCollectionData,
    MutationUpdateCollectionArgs
    >(UPDATE_COLLECTION);

  onDone(({ data }) => {
    loading(`update.${data?.updateCollection ? 'success' : 'failed'}`, true);
  })
  const formRef = ref<any>(null);
  function updateCollection() {
    loading('loading.update');
    void mutate({input});
  }
  function validate () {
    formRef.value.validate().then((success: boolean) => {
      if (success) updateCollection();
    })
  }
  return { input, updateCollection, validate, formRef }
}
