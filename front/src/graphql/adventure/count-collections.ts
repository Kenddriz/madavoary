import {CountAdventuresOutput, QueryCountAdventuresArgs} from '../types';
import {gql} from '@apollo/client';
import {useQuery, useResult} from '@vue/apollo-composable';

type CountAdventuresData = {
  countAdventures: CountAdventuresOutput[];
}
const COUNT_COLLECTIONS = gql`
  query CountAdventures($input: CountAdventureInput!){
    countAdventures(input: $input) {
      natureId
      count
    }
  }
`;
export const useCountAdventures = (id: number) => {
  const { result, loading, refetch } = useQuery<
    CountAdventuresData,
    QueryCountAdventuresArgs
    >(COUNT_COLLECTIONS, { input: { id } });
  const counts = useResult<
    CountAdventuresData|undefined,
    CountAdventuresOutput[],
    CountAdventuresOutput[]
    >(result, [], res => res?.countAdventures || []);
  return { counts,loading, refetch }
}
