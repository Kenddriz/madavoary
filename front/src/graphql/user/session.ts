import { useRouter } from 'vue-router';
import {User} from 'src/graphql/types';

export const USER_HOME = ['invited', 'admin'];
export const useSession = () => {

  const route = useRouter();

  const login = (token: string, user: User) => {
    localStorage.setItem('token', token);
    localStorage.setItem('id', String(user.id));
    void route.push('/' + USER_HOME[user.role]);
  }
  const logout = () => {
    void route.push('/');
  }
  return { login, logout };
}
