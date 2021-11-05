import {useQuery, useResult} from '@vue/apollo-composable';
import {
  LivingBeing,
  LivingBeingPagination,
  PaginateLivingBeingsInput,
  QueryPaginateLivingBeingsArgs,
} from 'src/graphql/types';
import {gql} from '@apollo/client';
import {InitialPagination, PAGINATION_META} from 'src/graphql/utils/pagination';
import {USER_FIELDS} from 'src/graphql/user/user';
import {ref} from 'vue';
import {LIVING_BEING_FIELDS} from 'src/graphql/living-being/living-being';
import {LOCALIZATION_FIELDS} from 'src/graphql/localization/localization';
import {AREA_FIELDS} from 'src/graphql/area/area';

export type PaginateLivingBeingsData = {
  paginateLivingBeings: LivingBeingPagination
}

export const PAGINATE_LIVING_BEINGS = (withUser: boolean) => gql`
  query PaginateLivingBeings($input: PaginateLivingBeingsInput!) {
    paginateLivingBeings(input: $input) {
      items {
        ${LIVING_BEING_FIELDS}
        localizations{${LOCALIZATION_FIELDS} area{${AREA_FIELDS}}}
        ${withUser ? `user{${USER_FIELDS}}` : ''}
      }
      ${PAGINATION_META}
    }
  }
`;
export const usePaginateLivingBeings = (id = 0, withUser = false) => {
  const pagination = ref({
    sortBy: 'asc',
    descending: false,
    page: 1,
    rowsPerPage: 10,
    rowsNumber: 0,
    keyword: '',
    areaId: id,
  });
  function getInput(): PaginateLivingBeingsInput {
    const { keyword, areaId, rowsPerPage: limit, page } = pagination.value;
    return { keyword, areaId, limit, page }
  }
  const selected = ref<LivingBeing[]>([]);
  const { loading, refetch, result } = useQuery<
    PaginateLivingBeingsData,
    QueryPaginateLivingBeingsArgs
    >(PAGINATE_LIVING_BEINGS(withUser), { input: getInput() });
  const livingBeing = useResult<
    PaginateLivingBeingsData|undefined,
    LivingBeingPagination,
    LivingBeingPagination
    >(result, InitialPagination, res => {
    if(res?.paginateLivingBeings) {
      const id = selected.value[0]?.id;
      const find = res.paginateLivingBeings.items.find(item => item.id === id)||res.paginateLivingBeings.items[0];
      if(find){
        if(id)selected.value[0] = find;
        else selected.value.push(find);
      }
      pagination.value.rowsNumber = res.paginateLivingBeings.meta.totalItems;
      return res.paginateLivingBeings;
    }
    selected.value.length = 0;
    return InitialPagination
  });
  function submitSearch() {
    void refetch({ input: getInput() })
  }
  return { loading, livingBeing, submitSearch, selected, pagination }
}
