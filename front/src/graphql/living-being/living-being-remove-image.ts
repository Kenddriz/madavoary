import {LivingBeing, MutationLivingBeingRemoveImageArgs} from 'src/graphql/types';
import { gql } from '@apollo/client';
import {useMutation} from '@vue/apollo-composable';
import {Dialog} from 'quasar';
import {useLoading} from 'src/graphql/utils/utils';
import {useI18n} from 'vue-i18n';

type LivingBeingRemoveImage = {
  livingBeingRemoveImage: LivingBeing;
}

const LIVING_BEING_REMOVE_IMAGE = gql`
  mutation LivingBeingRemoveImage($input:UpdateImageInput!){
    livingBeingRemoveImage(input:$input){
      id
      images
      updatedAt
    }
  }
`;
export const useLivingBeingRemoveImage = (callback: () => void) => {
  const { loading } = useLoading();
  const { t } = useI18n();
  const { mutate, onDone } = useMutation<
    LivingBeingRemoveImage,
    MutationLivingBeingRemoveImageArgs
    >(LIVING_BEING_REMOVE_IMAGE);
  onDone(({ data }) => {
    if (data?.livingBeingRemoveImage) {
      callback();
      loading('remove.success', true);
    } else loading('remove.failed', true);
  })
  function removeImage(id: number, index: number) {
    Dialog.create({
      title: 'Suppression',
      message: 'Etes-vous sûr de vouloir supprimer cette image ?',
      cancel: t('cancel'),
      ok: t('confirm'),
      persistent: true
    }).onOk(() => {
      loading('loading.update');
      void mutate({
        input: { id, index }
      })
    })
  }
  return { removeImage }
}
