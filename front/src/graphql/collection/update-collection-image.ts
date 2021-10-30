import {Collection, MutationUpdateCollectionImageArgs} from 'src/graphql/types';
import {gql} from '@apollo/client';
import {useMutation} from '@vue/apollo-composable';

type UpdateCollectionImageData = {
  updateCollectionImage: Collection;
}
const UPDATE_COLLECTION_IMAGE = gql`
  mutation UpdateCollectionImage($image: Upload!, $input: UpdateCollectionImageInput!){
    updateCollectionImage(image: $image, input: $input){
      id
      images
      updatedAt
    }
  }
`;

export const useUpdateCollectionImage = () => {
  const { mutate, loading } = useMutation<
    UpdateCollectionImageData,
    MutationUpdateCollectionImageArgs
    >(UPDATE_COLLECTION_IMAGE, { context: {hasUpload: true}});
  function updateImage(image: File, collectionId: number, imageIndex: number) {
    void mutate({ image, input: { collectionId, imageIndex } });
  }
  return { loading, updateImage }
}
