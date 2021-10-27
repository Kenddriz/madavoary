import {reactive, ref} from 'vue';
import {CreateUserInput, MutationCreateUserArgs, User} from '../types';
import {gql} from '@apollo/client';
import {useMutation} from '@vue/apollo-composable';
import {Loading} from 'quasar';
import {notify} from 'src/graphql/utils/utils';
import {useI18n} from 'vue-i18n';

type CreateUserData = {
  createUser: User;
}
const CREATE_USER = gql`
    mutation CreateUser($avatar: Upload!, $input: CreateUserInput!) {
      createUser(avatar: $avatar, input: $input) {
        id
      }
    }
`;
export const useCreateUser = () => {
  const { t } = useI18n();
  const genders = [{ value: 0, label: t('male')}, { value: 1, label: t('female')}];
  const errorOn = ref<string>('');
  const { mutate, onDone } = useMutation<
    CreateUserData,
    MutationCreateUserArgs
    >(CREATE_USER, { context: {hasUpload: true}});
  onDone(({ data }) => {
    Loading.hide();
    if(data?.createUser)notify('Vous aurez un mail de vérification d\'administrateur!');
  });
  const input = reactive<CreateUserInput>({
    lastName: '',
    firstName: '',
    email: '',
    phone: '+261 00 00 000 00',
    gender: 0,
    password: ''
  });
  const avatar = ref<File[]>([]);
  const params = reactive({ step: 1, confirm: '' });
  const signForm = ref<any>(null);
  function onSubmit () {
    if(avatar.value.length) {
      Loading.show({ message: 'Création de votre compte ...'});
      void mutate({ avatar: avatar.value[0], input });
    }else notify('Vous devez mettre votre photo recente !', 'warning');
  }
  function validationError (reference: Record<string, any>) {
    errorOn.value =  '(' + t('register.errorOn') + ' ' + t(reference.name).toLowerCase() + ')';
    setTimeout(() => errorOn.value = '', 5000);
  }
  function resetValidation(){
    if (params.confirm === input.password) signForm.value.resetValidation();
  }
  return { input, avatar, onSubmit, errorOn, genders, validationError, params, resetValidation, signForm }
}
