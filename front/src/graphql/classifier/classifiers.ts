import {Classifier} from 'src/graphql/types';
import {gql} from '@apollo/client';
import {useQuery, useResult} from '@vue/apollo-composable';
import {CLASSIFIER_FIELDS} from 'src/graphql/classifier/classifier';
import {ref} from 'vue';

type ClassifiersData = {
  classifiers: Classifier[];
}

const CLASSIFIERS = gql`
  query Classifiers {
    classifiers {
      ${CLASSIFIER_FIELDS}
    }
  }
`;
export const useClassifiers = () => {
  const { loading, result } = useQuery<ClassifiersData>(CLASSIFIERS);
  const selected = ref<number|null>(null);
  const classifiers = useResult<
    ClassifiersData|undefined,
    Classifier[],
    Classifier[]
    >(result, [], res => {
      if(res?.classifiers) {
        selected.value = (res.classifiers.find(item => item.id === selected.value)||res.classifiers[0])?.id||null;
        return res.classifiers;
      }
      selected.value = null;
      return [];
  });
  function findClassifier(id: number) {
    return classifiers.value.find( x => x.id === id);
  }
  return { loading, classifiers, selected, findClassifier };
}
