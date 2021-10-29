import {useQuery, useResult} from '@vue/apollo-composable';
import {
  Collection,
  CollectionPagination,
  PaginateCollectionInput,
  QueryPaginateCollectionsArgs,
} from 'src/graphql/types';
import {gql} from '@apollo/client';
import {InitialPagination, PAGINATION_META} from 'src/graphql/utils/pagination';
import {COLLECTION_FIELDS} from 'src/graphql/collection/collection';
import {USER_FIELDS} from 'src/graphql/user/user';
import {ref} from 'vue';

export type PaginateCollectionsData = {
  paginateCollections: CollectionPagination
}

export const PAGINATE_COLLECTIONS = (withUser = false) => gql`
  query PaginateCollections($input: PaginateCollectionInput!) {
    paginateCollections(input: $input) {
      items {
        ${COLLECTION_FIELDS}
        ${withUser ? `user{${USER_FIELDS}}` : 'userId'}
      }
      ${PAGINATION_META}
    }
  }
`;
export const usePaginateCollections = (id: number) => {
  const pagination = ref({
    sortBy: 'asc',
    descending: false,
    page: 1,
    rowsPerPage: 15,
    rowsNumber: 0,
    keyword: '',
    userId: id,
    natureId: -1,
  });
  function getInput(): PaginateCollectionInput {
    const { keyword, userId, natureId, rowsPerPage: limit, page } = pagination.value;
    return { keyword, userId, natureId, limit, page }
  }
  const selected = ref<Collection[]>([]);
  const { loading, refetch, result } = useQuery<
    PaginateCollectionsData,
    QueryPaginateCollectionsArgs
    >(PAGINATE_COLLECTIONS(id === 0), { input: getInput() });
  const collection = useResult<
    PaginateCollectionsData|undefined,
    CollectionPagination,
    CollectionPagination
    >(result, InitialPagination, res => {
    if(res?.paginateCollections) {
      const id = selected.value[0]?.id;
      const find = res.paginateCollections.items.find(item => item.id === id)||res.paginateCollections.items[0];
      if(find){
        if(id)selected.value[0] = find;
        else selected.value.push(find);
      }
      pagination.value.rowsNumber = res.paginateCollections.meta.totalItems;
      return res.paginateCollections;
    }
    selected.value.length = 0;
    return InitialPagination
  });
  function submitSearch() {
    void refetch({ input: getInput() })
  }
  return { loading, collection, submitSearch, selected, pagination }
}
