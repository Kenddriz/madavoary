import {Classifier, MutationMoveClassifierArgs} from 'src/graphql/types';
import {gql} from '@apollo/client';
import {CLASSIFIER_FIELDS} from 'src/graphql/classifier/classifier';
import {useMutation} from '@vue/apollo-composable';
import {reactive, ref} from 'vue';
import {useLoading} from 'src/graphql/utils/utils';

type MoveClassifierData = {
  moveClassifier: Classifier;
}

const MOVE_CLASSIFIER = gql`
  mutation MoveClassifier($input: MoveClassifierInput!) {
    moveClassifier(input: $input){
      ${CLASSIFIER_FIELDS}
    }
  }
`;
export const useMoveClassifier = () => {
  const moveInput = reactive<{id: number, parentId: number|null}>({ id: 0, parentId: null });
  const { loading } = useLoading();
  const { mutate, onDone } = useMutation<
    MoveClassifierData,
    MutationMoveClassifierArgs
    >(MOVE_CLASSIFIER);
  onDone(({ data }) => {
    loading(`update.${data?.moveClassifier ? 'success' : 'failed' }`, true);
    moveInput.id = 0;
  });
  function setCutId(id: number, parentId: number) {
    moveInput.id = moveInput.id === id ? 0 : id;
    moveInput.parentId = parentId;
  }
  function moveClassifier(parentId: number) {
    if(parentId !== moveInput.id && moveInput.id > 0 && parentId !== moveInput.parentId) {
      loading('loading.update');
      void mutate({ input: { id: moveInput.id, parentId }});
    }
  }
  return { setCutId, moveClassifier, moveInput }
}
