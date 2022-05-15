import {Adventure, MutationAdventureRemoveImageArgs} from 'src/graphql/types';
import { gql } from '@apollo/client';
import {useMutation} from '@vue/apollo-composable';
import {Dialog} from 'quasar';
import {useLoading} from 'src/graphql/utils/utils';
import {useI18n} from 'vue-i18n';

type AdventureRemoveImage = {
  adventureRemoveImage: Adventure;
}

const ADVENTURE_REMOVE_IMAGE = gql`
  mutation AdventureRemoveImage($input:UpdateAdventureImageInput!){
    adventureRemoveImage(input:$input){
      id
      images
      updatedAt
    }
  }
`;
export const useAdventureRemoveImage = (callback: () => void) => {
  const { loading } = useLoading();
  const { t } = useI18n();
  const { mutate, onDone } = useMutation<
    AdventureRemoveImage,
    MutationAdventureRemoveImageArgs
    >(ADVENTURE_REMOVE_IMAGE);
  onDone(({ data }) => {
    if (data?.adventureRemoveImage) {
      callback();
      loading('remove.success', true);
    } else loading('remove.failed', true);
  })
  function removeImage(adventureId: number, imageIndex: number) {
    Dialog.create({
      title: 'Suppression',
      message: 'Etes-vous sûr de vouloir supprimer cette image ?',
      cancel: t('cancel'),
      ok: t('confirm'),
      persistent: true
    }).onOk(() => {
      loading('loading.update');
      void mutate({
        input: { adventureId, imageIndex }
      })
    })
  }
  return { removeImage }
}
