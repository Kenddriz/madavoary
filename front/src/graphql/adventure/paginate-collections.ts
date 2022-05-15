import {useQuery, useResult} from '@vue/apollo-composable';
import {
  Adventure,
  AdventurePagination,
  PaginateAdventureInput,
  QueryPaginateAdventuresArgs,
} from 'src/graphql/types';
import {gql} from '@apollo/client';
import {InitialPagination, PAGINATION_META} from 'src/graphql/utils/pagination';
import {COLLECTION_FIELDS} from 'src/graphql/adventure/collection';
import {USER_FIELDS} from 'src/graphql/user/user';
import {ref} from 'vue';

export type PaginateAdventuresData = {
  paginateAdventures: AdventurePagination
}

export const PAGINATE_COLLECTIONS = (withUser = false) => gql`
  query PaginateAdventures($input: PaginateAdventureInput!) {
    paginateAdventures(input: $input) {
      items {
        ${COLLECTION_FIELDS}
        ${withUser ? `user{${USER_FIELDS}}` : 'userId'}
      }
      ${PAGINATION_META}
    }
  }
`;
export const usePaginateAdventures = (id: number) => {
  const pagination = ref({
    sortBy: 'asc',
    descending: false,
    page: 1,
    rowsPerPage: 20,
    rowsNumber: 0,
    keyword: '',
    userId: id,
    natureId: -1,
  });
  function getInput(): PaginateAdventureInput {
    const { keyword, userId, natureId, rowsPerPage: limit, page } = pagination.value;
    return { keyword, userId, natureId, limit, page }
  }
  const selected = ref<Adventure[]>([]);
  const { loading, refetch, result } = useQuery<
    PaginateAdventuresData,
    QueryPaginateAdventuresArgs
    >(PAGINATE_COLLECTIONS(id === 0));
  const collection = useResult<
    PaginateAdventuresData|undefined,
    AdventurePagination,
    AdventurePagination
    >(result, InitialPagination, res => {
    if(res?.paginateAdventures) {
      const id = selected.value[0]?.id;
      const find = res.paginateAdventures.items.find(item => item.id === id)||res.paginateAdventures.items[0];
      if(find){
        if(id)selected.value[0] = find;
        else selected.value.push(find);
      }
      pagination.value.rowsNumber = res.paginateAdventures.meta.totalItems;
      return res.paginateAdventures;
    }
    selected.value.length = 0;
    return InitialPagination
  });
  function submitSearch() {
    void refetch()
  }
  return { loading, collection, submitSearch, selected, pagination }
}
