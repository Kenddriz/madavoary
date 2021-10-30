import {Collection, MutationAddCollectionImageArgs} from 'src/graphql/types';
import {gql} from '@apollo/client';
import {useMutation} from '@vue/apollo-composable';

type AddCollectionImageData = {
  addCollectionImage: Collection;
}
const ADD_COLLECTION_IMAGE = gql`
  mutation addCollectionImage($image: Upload!, $collectionId: Int!){
    addCollectionImage(image: $image, collectionId: $collectionId){
      id
      images
      updatedAt
    }
  }
`;

export const useAddCollectionImage = () => {
  const { mutate, loading } = useMutation<
    AddCollectionImageData,
    MutationAddCollectionImageArgs
    >(ADD_COLLECTION_IMAGE, { context: {hasUpload: true}});
  function addImage(image: File, collectionId: number) {
    void mutate({ image, collectionId });
  }
  return { loading, addImage }
}
