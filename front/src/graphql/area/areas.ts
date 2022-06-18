import {Area} from 'src/graphql/types';
import {gql} from '@apollo/client';
import {AREA_FIELDS} from 'src/graphql/area/area';
import {useQuery, useResult} from '@vue/apollo-composable';

type AreasData = {
  areas: Area[];
}
const AREAS = gql`
  query Areas {
    areas {
      ${AREA_FIELDS}
    }
  }
`;
export const useAreas = () => {
  const { result, loading } = useQuery<AreasData>(AREAS);
  const areas = useResult<
    AreasData|undefined,
    Area[],
    Area[]
    >(result, [], res => res.areas);
  return { areas, loading }
}
