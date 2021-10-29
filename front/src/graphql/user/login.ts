import {gql} from '@apollo/client';
import {useLazyQuery} from '@vue/apollo-composable';
import {reactive} from 'vue';
import {AuthInput, QueryLoginArgs} from 'src/graphql/types';
import {notify} from 'src/graphql/utils/utils';
import {useSession} from 'src/graphql/user/session';
import {LoginDto} from '../types';

type LoginData = {
  login: LoginDto;
}

const LOGIN = gql`
  query Login($input: AuthInput!){
    login(input: $input){
      token
      user{
        id
        role
      }
    }
  }
`;

export const useLogin = () => {
  const { login }  = useSession();
  const input = reactive<AuthInput>({ email: '', password: '' });
  const { loading, load, onResult } = useLazyQuery<
    LoginData,
    QueryLoginArgs
    >(LOGIN);
  onResult(({ data }) => {
    if(data?.login?.user) {
      notify('Connexion reussie !');
      login(data.login.token, data.login.user);
    }
  });
  function submitLogin() {
    void load(LOGIN, { input }, { fetchPolicy: 'no-cache' });
  }
  return { loading, submitLogin, input }
}


