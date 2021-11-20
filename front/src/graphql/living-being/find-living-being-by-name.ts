import {LivingBeing, QueryFindLivingBeingByNameArgs} from 'src/graphql/types';
import {gql} from '@apollo/client';
import {LIVING_BEING_FIELDS} from 'src/graphql/living-being/living-being';
import {useLazyQuery, useResult} from '@vue/apollo-composable';
import {ref} from 'vue';

type FindLivingBeingByNameData = {
  findLivingBeingByName: LivingBeing;
}
const FIND_LIVING_BEING_BY_NAME = gql`
    query FindLivingBeingByName($name: String!) {
      findLivingBeingByName(name: $name){
        ${LIVING_BEING_FIELDS}
      }
    }
`;

export const useFindLivingBeingByName = () => {
  const exist = ref(false);
  const existName = ref('');
  const { loading: fLoading, load, result } = useLazyQuery<
    FindLivingBeingByNameData,
    QueryFindLivingBeingByNameArgs
    >(FIND_LIVING_BEING_BY_NAME);
  function findByName(name: string) {
    existName.value = name;
    load(FIND_LIVING_BEING_BY_NAME, { name });
  }
  const livingBeing = useResult(result, undefined, res => {
    exist.value = !!res?.findLivingBeingByName;
    return res?.findLivingBeingByName;
  });

  return { fLoading, findByName, livingBeing, exist, existName }
}
