import {reactive, ref} from 'vue';
import { useMutation } from '@vue/apollo-composable';
import {Adventure, MutationCreateAdventureArgs} from 'src/graphql/types';
import {gql} from '@apollo/client';
import { ADVENTURE_FIELDS } from 'src/graphql/adventure/adventure';
import {useLoading} from 'src/graphql/utils/utils';
import {addPaginationCache} from 'src/graphql/utils/pagination';
import {useImageLoader} from 'src/graphql/utils/preview';

export type CreateAdventureData = {
  createAdventure: Adventure
}
export const CREATE_COLLECTION = gql`
  mutation CreateAdventure ($images: [Upload!]!, $detail: CreateAdventureInput!) {
    createAdventure(images: $images, detail: $detail) {
      ${ADVENTURE_FIELDS}
    }
  }
`

export const useCreateAdventure = () => {
  const { previewImages, urlList } = useImageLoader();
  const input = reactive<MutationCreateAdventureArgs>({
    images: [],
    detail: {
      naming: '',
      place: '',
      natureId: 0,
      description: ''
    }
  });
  function onPreview(event: any) {
    input.images = event;
    previewImages(event);
  }
  const { loading } = useLoading();
  const { mutate, onDone } = useMutation<
    CreateAdventureData,
    MutationCreateAdventureArgs
    >(CREATE_COLLECTION, {
      context: { hasUpload: true },
      update: (cache, { data }) => {
        if(data?.createAdventure) {
          cache.modify({
            fields: {
              paginateAdventures(existingRef: any, { toReference }) {
                return addPaginationCache(data.createAdventure, existingRef, toReference);
              }
            }
          })
        }
      }
  });
  onDone(({ data }) => {
    loading(`create.${data?.createAdventure ? 'success' : 'failed' }`, true);
  });
  function createAdventure() {
    loading('loading.create');
    void mutate(input);
  }
  function reset() {
    input.images = [];
    input.detail.naming = '';
    input.detail.place = '';
    input.detail.description = '';
    input.detail.natureId = 0;
  }
  return { input, createAdventure, reset, onPreview, urlList, slide: ref(0) }
}
