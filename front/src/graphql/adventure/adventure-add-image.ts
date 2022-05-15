import { Adventure, MutationAdventureAddImageArgs } from 'src/graphql/types';
import {gql} from '@apollo/client';
import {useMutation} from '@vue/apollo-composable';
import {ref} from 'vue';

type AdventureAddImageData = {
  adventureAddImage: Adventure;
}
const ADVENTURE_ADD_IMAGE = gql`
  mutation AdventureAddImage($image: Upload!, $adventureId: Int!){
    adventureAddImage(image: $image, adventureId: $adventureId){
      id
      images
      updatedAt
    }
  }
`;

export const useAdventureAddImage = () => {
  const dialog = ref<boolean>(false);
  const { mutate, loading, onDone } = useMutation<
    AdventureAddImageData,
    MutationAdventureAddImageArgs
    >(ADVENTURE_ADD_IMAGE, { context: {hasUpload: true}});
  onDone(({ data }) => {
    dialog.value = !data?.adventureAddImage;
  });
  function addImage(image: File, adventureId: number) {
    void mutate({ image, adventureId });
  }
  return { loading, addImage, dialog }
}
