import {CountCollectionsOutput, QueryCountCollectionsArgs} from '../types';
import {gql} from '@apollo/client';
import {useQuery, useResult} from '@vue/apollo-composable';

type CountCollectionsData = {
  countCollections: CountCollectionsOutput[];
}
const COUNT_COLLECTIONS = gql`
  query CountCollections($input: CountCollectionInput!){
    countCollections(input: $input) {
      natureId
      count
    }
  }
`;
export const useCountCollections = (id: number) => {
  const { result, loading, refetch } = useQuery<
    CountCollectionsData,
    QueryCountCollectionsArgs
    >(COUNT_COLLECTIONS, { input: { id } });
  const counts = useResult<
    CountCollectionsData|undefined,
    CountCollectionsOutput[],
    CountCollectionsOutput[]
    >(result, [], res => res?.countCollections || []);
  return { counts,loading, refetch }
}
