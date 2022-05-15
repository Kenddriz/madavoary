import {Adventure, MutationUpdateAdventureImageArgs} from 'src/graphql/types';
import {gql} from '@apollo/client';
import {useMutation} from '@vue/apollo-composable';
import { ref } from 'vue';

type UpdateAdventureImageData = {
  updateAdventureImage: Adventure;
}
const UPDATE_COLLECTION_IMAGE = gql`
  mutation UpdateAdventureImage($image: Upload!, $input: UpdateAdventureImageInput!){
    updateAdventureImage(image: $image, input: $input){
      id
      images
      updatedAt
    }
  }
`;

export const useUpdateAdventureImage = () => {
  const dialog = ref<boolean>(false);
  const { mutate, loading, onDone } = useMutation<
    UpdateAdventureImageData,
    MutationUpdateAdventureImageArgs
    >(UPDATE_COLLECTION_IMAGE, { context: {hasUpload: true}});
  onDone(({ data }) => {
    dialog.value = !data?.updateAdventureImage;
  })
  function updateImage(image: File, adventureId: number, imageIndex: number) {
    void mutate({ image, input: { adventureId, imageIndex } });
  }
  return { loading, updateImage, dialog }
}
