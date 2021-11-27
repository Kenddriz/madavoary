import {Area} from 'src/graphql/types';
import {gql} from '@apollo/client';
import {AREA_FIELDS} from 'src/graphql/area/area';
import { USER_FIELDS } from 'src/graphql/user/user';
import {useQuery, useResult} from '@vue/apollo-composable';
import {ref} from 'vue';

type AreasData = {
  areas: Area[];
}
const AREAS = gql`
  query Areas {
    areas {
      ${AREA_FIELDS}
      user{
        ${USER_FIELDS}
      }
    }
  }
`;
export const useAreas = () => {
  const pagination = ref({
    sortBy: 'asc',
    descending: false,
    page: 1,
    rowsPerPage: 10,
  });
  const selected = ref<Area[]>([]);
  const filter = ref<string>('');
  const { result, loading } = useQuery<AreasData>(AREAS);
  const areas = useResult<
    AreasData|undefined,
    Area[],
    Area[]
    >(result, [], res => {
    if(res?.areas) {
      const id = selected.value[0]?.id;
      const find = res.areas.find(item => item.id === id)||res.areas[0];
      if(find){
        if(id)selected.value[0] = find;
        else selected.value = [find];
      }
      return res.areas;
    }
    selected.value.length = 0;
      return  []
  });
  return { areas, loading, pagination, selected, filter }
}
