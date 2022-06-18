import { LivingBeing, QueryFindLivingBeingByAreaArgs } from 'src/graphql/types';
import { gql } from '@apollo/client';
import {LIVING_BEING_FIELDS} from 'src/graphql/living-being/living-being';
import {useLazyQuery, useResult} from '@vue/apollo-composable';
import {CLASSIFIER_FIELDS} from 'src/graphql/classifier/classifier';
import {useI18n} from 'vue-i18n';

type FindLivingBeingByAreaData = {
  findLivingBeingByArea: LivingBeing[];
}
const QUERY = gql`
  query FindLivingBeingByArea($areaId: Int!){
    findLivingBeingByArea(areaId: $areaId){
      ${LIVING_BEING_FIELDS}
      classifiers{${CLASSIFIER_FIELDS}}
    }
  }
`;

export const useFindLivingBeingByArea = () => {
  const { t } = useI18n();
  const columns = [
    {
      name: 'names',
      label: t('livingBeing.names'),
      field: (row: LivingBeing) => row.names[0],
      align: 'left',
      sortable: true
    },
  ];
  const { loading, result, load } = useLazyQuery<
    FindLivingBeingByAreaData,
    QueryFindLivingBeingByAreaArgs
    >(QUERY);

  const livingBeings = useResult<
    FindLivingBeingByAreaData| undefined,
    LivingBeing[],
    LivingBeing[]
    >(result, [], res => res.findLivingBeingByArea);

  function loadData(areaId: number ) {
    void load(QUERY, { areaId })
  }
  return { loading, livingBeings, columns, loadData }
}
