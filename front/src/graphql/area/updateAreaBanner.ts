import {Area, MutationUpdateAreaBannerArgs} from 'src/graphql/types';
import {gql} from '@apollo/client';
import {useMutation} from '@vue/apollo-composable';

type UpdateAreaBannerData = {
  updateAreaBanner: Area;
}
const UPDATE_COLLECTION_IMAGE = gql`
  mutation UpdateAreaBanner($banner: Upload!, $areaId: Int!){
    updateAreaBanner(banner: $banner, areaId: $areaId){
      id
      banner
      updatedAt
    }
  }
`;

export const useUpdateAreaBanner = () => {
  const { mutate, loading } = useMutation<
    UpdateAreaBannerData,
    MutationUpdateAreaBannerArgs
    >(UPDATE_COLLECTION_IMAGE, { context: {hasUpload: true}});
  function updateBanner(banner: File, areaId: number) {
    void mutate({ banner, areaId  });
  }
  return { loading, updateBanner }
}
