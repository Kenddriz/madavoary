import { LivingBeing, MutationLivingBeingAddImageArgs } from 'src/graphql/types';
import {gql} from '@apollo/client';
import {useMutation} from '@vue/apollo-composable';
import {ref} from 'vue';

type LivingBeingAddImageData = {
  livingBeingAddImage: LivingBeing;
}
const ADVENTURE_ADD_IMAGE = gql`
  mutation LivingBeingAddImage($image: Upload!, $id: Int!){
    livingBeingAddImage(image: $image, id: $id){
      id
      images
      updatedAt
    }
  }
`;

export const useLivingBeingAddImage = () => {
  const dialog = ref<boolean>(false);
  const { mutate, loading, onDone } = useMutation<
    LivingBeingAddImageData,
    MutationLivingBeingAddImageArgs
    >(ADVENTURE_ADD_IMAGE, { context: {hasUpload: true}});
  onDone(({ data }) => {
    dialog.value = !data?.livingBeingAddImage;
  });
  function addImage(image: File, id: number) {
    void mutate({ image, id });
  }
  return { loading, addImage, dialog }
}
