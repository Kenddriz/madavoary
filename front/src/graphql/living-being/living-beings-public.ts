import {useQuery, useResult} from '@vue/apollo-composable';
import {
  LivingBeingPagination,
  PaginateLivingBeingsInput,
  QueryPaginateLivingBeingsArgs,
} from 'src/graphql/types';
import { gql } from '@apollo/client';
import { InitialPagination, PAGINATION_META } from 'src/graphql/utils/pagination';
import { ref } from 'vue';
import { LIVING_BEING_FIELDS } from 'src/graphql/living-being/living-being';

export type LivingBeingsPublicData = {
  paginateLivingBeings: LivingBeingPagination
}

export const QUERY = gql`
  query PaginateLivingBeings($input: PaginateLivingBeingsInput!) {
    paginateLivingBeings(input: $input) {
      items {
        ${LIVING_BEING_FIELDS}
      }
      ${PAGINATION_META}
    }
  }
`;
export const usePaginateLivingBeings = () => {
  const pagination = ref({
    sortBy: 'id',
    descending: false,
    page: 1,
    rowsPerPage: 20,
    rowsNumber: 0,
    keyword: '',
  });
  function getInput(): PaginateLivingBeingsInput {
    const { keyword, rowsPerPage: limit, page, sortBy, descending } = pagination.value;
    return {
      keyword,
      limit,
      page,
      sortBy,
      order: descending ? 'DESC' : 'ASC',
    }
  }
  const { loading, result, refetch } = useQuery<
    LivingBeingsPublicData,
    QueryPaginateLivingBeingsArgs
    >(QUERY, { input: getInput() });
  const livingBeing = useResult<
    LivingBeingsPublicData|undefined,
    LivingBeingPagination,
    LivingBeingPagination
    >(result, InitialPagination, res => res.paginateLivingBeings);

  function submitSearch() {
    void refetch({ input: getInput() })
  }

  return { loading, livingBeing, pagination, submitSearch }
}
