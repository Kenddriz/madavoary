import {Classifier, CreateClassifierInput, MutationCreateClassifierArgs} from 'src/graphql/types';
import {gql} from '@apollo/client';
import {CLASSIFIER_FIELDS} from 'src/graphql/classifier/classifier';
import {useMutation} from '@vue/apollo-composable';
import {reactive, ref} from 'vue';
import {useLoading} from 'src/graphql/utils/utils';

type CreateClassifierData = {
  createClassifier: Classifier;
}

const CREATE_CLASSIFIER = gql`
  mutation CreateClassifier($input: CreateClassifierInput!){
      createClassifier(input: $input){
        ${CLASSIFIER_FIELDS}
      }
  }
`;

export const useCreateClassifier = (parentLevel = 0, parentId: number|null = null) => {
  const input = reactive<CreateClassifierInput>({
    label: '',
    level: parentLevel,
    translations: Array(2).fill(''),
    parentId
  });
  const modelIndex = ref(0);
  const { loading } = useLoading();
  const { mutate, onDone } = useMutation<
    CreateClassifierData,
    MutationCreateClassifierArgs
    >(CREATE_CLASSIFIER, {
      update(cache, { data }) {
      if(data?.createClassifier) {
        cache.modify({
          fields: {
            classifiers(existing: any [], { toReference }) {
              return [...existing, toReference(data.createClassifier)];
            }
          }
        })
      }
    }
    });
  onDone(({ data }) => {
    loading(`create.${data?.createClassifier ? 'success' : 'failed' }`, true);
  });
  function createClassifier() {
    loading('loading.create');
    void mutate({ input: { ...input, level: modelIndex.value + 1 + input.level } });
  }
  return { createClassifier, input, modelIndex }
}
