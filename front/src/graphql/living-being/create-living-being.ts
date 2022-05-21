import {reactive, ref} from 'vue';
import {CreateLivingBeingInput, LivingBeing, MutationCreateLivingBeingArgs} from 'src/graphql/types';
import {gql} from '@apollo/client';
import {defaultLivingBeingInput, LIVING_BEING_FIELDS} from 'src/graphql/living-being/living-being';
import {useMutation} from '@vue/apollo-composable';
import {addPaginationCache} from 'src/graphql/utils/pagination';
import {useLoading} from 'src/graphql/utils/utils';
import {useImageLoader} from 'src/graphql/utils/preview';

type CreateLivingBeingData = {
  createLivingBeing: LivingBeing;
}
const CREATE_LIVING_BEING = gql`
  mutation CreateLivingBeing($images: [Upload!]!, $input: CreateLivingBeingInput!) {
    createLivingBeing(images:$images,input: $input){
      ${LIVING_BEING_FIELDS}
    }
  }
`;

export const useCreateLivingBeing = () => {
  const { urlList, previewImages, emptyPreviewImageList } = useImageLoader();
  const input = reactive<CreateLivingBeingInput>({ ...defaultLivingBeingInput });
  function reset() {
    Object.assign(input, { ...defaultLivingBeingInput });
    emptyPreviewImageList()
  }
  const images = ref<any[]>([]);
  const { loading } = useLoading();
  const { mutate, onDone } = useMutation<
    CreateLivingBeingData,
    MutationCreateLivingBeingArgs
    >(CREATE_LIVING_BEING, {
      context: { hasUpload: true },
      update: (cache, { data }) => {
        if(data?.createLivingBeing) {
          cache.modify({
            fields: {
              paginateLivingBeings(existingRef: any, { toReference }) {
                return addPaginationCache(data.createLivingBeing, existingRef, toReference);
              }
            }
          })
        }
      }
  });
  onDone(({ data }) => {
    if(data?.createLivingBeing) {
      loading('create.success', true);
      reset();
    }
    else loading('create.failed', true);
  });
  function submitCreation() {
    loading('loading.create');
    void mutate({
      images: images.value,
      input: {
        ...input,
        classifierIds: input.classifierIds.filter(c => c !== null)
      }
    });
  }
  return {
    input,
    images,
    submitCreation,
    urlList,
    previewImages,
    slide: ref(0),
  }
}
