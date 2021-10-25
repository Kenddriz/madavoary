import {reactive} from 'vue';
import {CreateUserInput} from '../types';

export const useCreateUser = () => {
  const input = reactive<CreateUserInput>({
    lastName: '',
    firstName: '',
    email: '',
    phone: '+261 00 00 000 00',
    gender: 0,
    password: ''
  });
  return { input }
}
