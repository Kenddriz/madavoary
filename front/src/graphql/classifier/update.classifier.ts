import {Classifier, MutationUpdateClassifierArgs, UpdateClassifierInput} from 'src/graphql/types';
import {gql} from '@apollo/client';
import {CLASSIFIER_FIELDS} from 'src/graphql/classifier/classifier';
import {useMutation} from '@vue/apollo-composable';
import {reactive} from 'vue';
import {useLoading} from 'src/graphql/utils/utils';

type UpdateClassifierData = {
  updateClassifier: Classifier;
}

const UPDATE_CLASSIFIER = gql`
  mutation UpdateClassification($input: UpdateClassifierInput!){
    updateClassifier(input: $input){
      ${CLASSIFIER_FIELDS}
    }
  }
`;

export const useUpdateClassifier = (classifier: Classifier) => {
  const { id, label, translations } = classifier;
  const input = reactive<UpdateClassifierInput>({
    id, label, translations: [ ...translations ]
  });
  const { loading } = useLoading();
  const { mutate, onDone } = useMutation<
    UpdateClassifierData,
    MutationUpdateClassifierArgs
    >(UPDATE_CLASSIFIER, { variables: { input }});
  onDone(({ data }) => {
    loading(`update.${data?.updateClassifier ? 'success' : 'failed' }`, true);
  });
  function updateClassifier() {
    loading('loading.update');
    void mutate();
  }
  return { input, updateClassifier }
}
