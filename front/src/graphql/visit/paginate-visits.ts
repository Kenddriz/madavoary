import {gql} from '@apollo/client';
import {InitialPagination, PAGINATION_META} from 'src/graphql/utils/pagination';
import {VISIT_FIELDS} from 'src/graphql/visit/visit';
import {
  PaginateLivingBeingsInput,
  QueryPaginateVisitsArgs,
  VisitPagination
} from '../types';
import {ref} from 'vue';
import {useQuery, useResult} from '@vue/apollo-composable';

type PaginateVisitsData = {
  paginateVisits: VisitPagination;
}

const QUERY = gql`
  query PaginateVisits($input: PaginateLivingBeingsInput!){
     paginateVisits(input: $input) {
      items {
        ${VISIT_FIELDS}
      }
      ${PAGINATION_META}
    }
  }
`;
const columns = [
  {
    name: 'id',
    label: 'N°',
    field: 'id',
    align: 'left',
    sortable: true
  },
  {
    name: 'ip',
    label: 'IP',
    field: 'ip',
    align: 'left',
    sortable: true
  },
  {
    name: 'country',
    label: 'Pays',
    field: 'country',
    align: 'left',
    sortable: true
  },
  {
    name: 'countryCode',
    label: 'Code Pays',
    field: 'countryCode',
    align: 'left',
    sortable: true
  },
  {
    name: 'region',
    label: 'Region',
    field: 'region',
    align: 'left',
    sortable: true
  },
  {
    name: 'entered_at',
    label: 'Entrée',
    field: 'enteredAt',
    sortable: true
  },
  {
    name: 'lived_at',
    label: 'Sortie',
    field: 'livedAt',
    align: 'left',
    sortable: true
  },
];

export const usePaginateVisits = () => {
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
    PaginateVisitsData,
    QueryPaginateVisitsArgs
    >(QUERY, { input: getInput() });
  const visit = useResult<
    PaginateVisitsData|undefined,
    VisitPagination,
    VisitPagination
    >(result, InitialPagination, res => {
    if(res?.paginateVisits) {
      pagination.value.rowsNumber = res.paginateVisits.meta.totalItems;
      return res.paginateVisits;
    }
    return InitialPagination
  });

  function onRequest(props: any = null) {
    if(props)Object.assign(pagination.value, props.pagination);
    void refetch({ input: getInput() })
  }
  return {
    columns,
    pagination,
    visit,
    loading,
    onRequest,
  }
}
