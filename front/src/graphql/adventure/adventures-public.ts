import {useQuery, useResult} from '@vue/apollo-composable';
import {
  AdventuresPagination,
  PaginateAdventuresInput,
  QueryPaginateAdventuresArgs,
} from 'src/graphql/types';
import {gql} from '@apollo/client';
import {InitialPagination, PAGINATION_META} from 'src/graphql/utils/pagination';
import {ADVENTURE_FIELDS} from 'src/graphql/adventure/adventure';
import { ref } from 'vue';

type PaginateAdventuresData = {
  paginateAdventures: AdventuresPagination
}

const QUERY = gql`
  query PaginateAdventures($input: PaginateAdventuresInput!) {
    paginateAdventures(input: $input) {
      items {
        ${ADVENTURE_FIELDS}
      }
      ${PAGINATION_META}
    }
  }
`;

export const useAdventuresPublic = () => {
  const pagination = ref({
    sortBy: 'naming',
    descending: false,
    page: 1,
    rowsPerPage: 20,
    rowsNumber: 0,
    keyword: '',
    natureIds: [0,1,2,3,4,5],
  });
  const filter = ref('');

  function getInput(): PaginateAdventuresInput {
    const { keyword, natureIds, descending, rowsPerPage: limit, page, sortBy } = pagination.value;
    return {
      keyword,
      natureIds,
      limit,
      page,
      sortBy,
      order: descending ? 'DESC' : 'ASC',
    }
  }

  const { loading, refetch, result } = useQuery<
    PaginateAdventuresData,
    QueryPaginateAdventuresArgs
    >(QUERY, { input: getInput() });

  const adventure = useResult<
    PaginateAdventuresData|undefined,
    AdventuresPagination,
    AdventuresPagination
    >(result, InitialPagination, res => res.paginateAdventures);

  function submitSearch() {
    void refetch({ input: getInput() })
  }

  return { loading, adventure, submitSearch, pagination, filter }
}
