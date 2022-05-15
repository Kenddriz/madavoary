import {Classifier} from 'src/graphql/types';
import {gql} from '@apollo/client';
import {useQuery, useResult} from '@vue/apollo-composable';
import {CLASSIFIER_FIELDS} from 'src/graphql/classifier/classifier';

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
  const classifiers = useResult<
    ClassifiersData|undefined,
    Classifier[],
    Classifier[]
    >(result, [], res => res?.classifiers);
  function findClassifier(id: number) {
    return classifiers.value.find( x => x.id === id);
  }
  return { loading, classifiers, findClassifier };
}
