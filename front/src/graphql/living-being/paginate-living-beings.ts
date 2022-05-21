import {useQuery, useResult} from '@vue/apollo-composable';
import {
  LivingBeing,
  LivingBeingPagination,
  PaginateLivingBeingsInput,
  QueryPaginateLivingBeingsArgs,
} from 'src/graphql/types';
import {gql} from '@apollo/client';
import {InitialPagination, PAGINATION_META} from 'src/graphql/utils/pagination';
import {ref} from 'vue';
import {LIVING_BEING_FIELDS} from 'src/graphql/living-being/living-being';
import {useI18n} from 'vue-i18n';

export type PaginateLivingBeingsData = {
  paginateLivingBeings: LivingBeingPagination
}

export const PAGINATE_LIVING_BEINGS = gql`
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
  const { t } = useI18n();
  const columns = [
    {
      name: 'names',
      label: t('livingBeing.names'),
      field: (row: LivingBeing) => row.names[0],
      align: 'left',
      sortable: true
    },
    {
      name: 'createdAt',
      label: t('createdAt'),
      field: 'createdAt',
      sortable: true
    }
  ];
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
    PaginateLivingBeingsData,
    QueryPaginateLivingBeingsArgs
    >(PAGINATE_LIVING_BEINGS, { input: getInput() });
  const livingBeing = useResult<
    PaginateLivingBeingsData|undefined,
    LivingBeingPagination,
    LivingBeingPagination
    >(result, InitialPagination, res => {
    if(res?.paginateLivingBeings) {
      pagination.value.rowsNumber = res.paginateLivingBeings.meta.totalItems;
      return res.paginateLivingBeings;
    }
    return InitialPagination
  });

  function onRequest(props: any) {
    Object.assign(pagination.value, props.pagination);
    void refetch({ input: getInput() })
  }

  return { loading, livingBeing, pagination, columns, onRequest }
}
