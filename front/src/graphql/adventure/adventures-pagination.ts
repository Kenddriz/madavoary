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
import {useI18n} from 'vue-i18n';

type PaginateAdventuresData = {
  paginateAdventures: AdventuresPagination
}

export const PAGINATE_ADVENTURES = gql`
  query PaginateAdventures($input: PaginateAdventuresInput!) {
    paginateAdventures(input: $input) {
      items {
        ${ADVENTURE_FIELDS}
      }
      ${PAGINATION_META}
    }
  }
`;

export const useAdventuresPagination= () => {
  const { tm, t } = useI18n();
  const natures = tm('adventure-subjects') as any[];
  const columns = [
      {
        name: 'naming',
        label: t('naming'),
        field: 'naming',
        align: 'left',
        sortable: true
      },
      {
        name: 'place',
        align: 'center',
        label: 'Endroit',
        field: 'place',
        sortable: true
      },
      {
        name: 'natureId',
        label: t('nature'),
        field: (row: any) => natures.find(n => n.id == row.natureId).title,
        sortable: true
      },
      {
        name: 'createdAt',
        label: t('createdAt'),
        field: 'createdAt',
        sortable: true
      }
  ];
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
    >(PAGINATE_ADVENTURES, { input: getInput() });

  const adventure = useResult<
    PaginateAdventuresData|undefined,
    AdventuresPagination,
    AdventuresPagination
    >(result, InitialPagination, res => {
    if(res?.paginateAdventures) {
      pagination.value.rowsNumber = res.paginateAdventures.meta.totalItems;
      return res.paginateAdventures;
    }
    return InitialPagination
  });

  function onRequest(props: any) {
    Object.assign(pagination.value, props.pagination);
    void refetch({ input: getInput() })
  }

  return { loading, adventure, onRequest, pagination, columns, filter }
}
