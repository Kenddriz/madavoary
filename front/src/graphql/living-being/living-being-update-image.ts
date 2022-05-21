import {LivingBeing, MutationUpdateLivingImageArgs} from 'src/graphql/types';
import {gql} from '@apollo/client';
import {useMutation} from '@vue/apollo-composable';
import { ref } from 'vue';

type UpdateLivingBeingImageData = {
  updateLivingBeingImage: LivingBeing;
}
const UPDATE_LIVING_BEING_IMAGE = gql`
  mutation UpdateLivingBeingImage($image: Upload!, $input: UpdateImageInput!){
    updateLivingBeingImage(image: $image, input: $input){
      id
      images
      updatedAt
    }
  }
`;

export const useUpdateLivingBeingImage = () => {
  const dialog = ref<boolean>(false);
  const { mutate, loading, onDone } = useMutation<
    UpdateLivingBeingImageData,
    MutationUpdateLivingImageArgs
    >(UPDATE_LIVING_BEING_IMAGE, { context: {hasUpload: true}});
  onDone(({ data }) => {
    dialog.value = !data?.updateLivingBeingImage;
  })
  function updateImage(image: File, id: number, index: number) {
    void mutate({ image, input: { id, index } });
  }
  return { loading, updateImage, dialog }
}
