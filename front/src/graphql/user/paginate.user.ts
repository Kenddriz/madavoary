import {InitialPagination, PAGINATION_META} from 'src/graphql/utils/pagination';
import {USER_FIELDS} from 'src/graphql/user/user';
import {PERSON_FIELDS} from 'src/graphql/person/person';
import {reactive, ref} from 'vue';
import {useQuery, useResult} from '@vue/apollo-composable';
import {User, UserPagination, PaginateUserInput, QueryPaginateUsersArgs} from 'src/graphql/types';
import {gql} from '@apollo/client';

type PaginateUsersData = {
  paginateUsers: UserPagination;
}
const PAGINATE_PROVIDERS = gql`
  query PaginateUsers($input:PaginateUserInput!){
    paginateUsers(input: $input){
      items{
        ${USER_FIELDS}
        person{${PERSON_FIELDS}}
      }
      ${PAGINATION_META}
    }
  }
`;

export const usePaginateUsers = () => {
  const pagination = ref({
    sortBy: 'asc',
    descending: false,
    page: 1,
    rowsPerPage: Math.ceil((screen.height - 80)/60),
    rowsNumber: 0
  });
  const input = reactive<PaginateUserInput>({
    keyword: '',
    page: 1,
    limit: pagination.value.rowsPerPage,
    filter: []
  });
  const checkboxes = ref([0]);
  const { loading, result, refetch } = useQuery<
    PaginateUsersData,
    QueryPaginateUsersArgs
    >(PAGINATE_PROVIDERS, { input: {...input} });
  const selected = ref<User[]>([]);
  function searchUser() {
    void refetch({ input });
  }
  function setFilter(value: number) {
    checkboxes.value = checkboxes.value.filter(v => v === value);
    switch (value) {
      case 0:
        input.filter = [];
        break;
      case 1:
        input.filter = ['verifiedAt'];
        break;
      case 2:
        input.filter = ['active'];
        break;
      default:
        input.filter = ['role', String(value - 3)];
        break;
    }
    searchUser();
  }
  const user = useResult<
    PaginateUsersData|undefined,
    UserPagination,
    UserPagination
    >(result, InitialPagination, res => {
    if(res?.paginateUsers) {
      const id = selected.value[0]?.id;
      const find = res.paginateUsers.items.find(item => item.id === id)||res.paginateUsers.items[0];
      if(find){
        if(id)selected.value[0] = find;
        else selected.value = [find];
      }
      pagination.value.rowsNumber = res.paginateUsers.meta.totalItems;
      return res.paginateUsers;
    }
    selected.value.length = 0;
    return InitialPagination
  });
  return {
    searchUser,
    loading,
    user,
    input,
    selected,
    checkboxes,
    setFilter,
    pagination
  }
}
