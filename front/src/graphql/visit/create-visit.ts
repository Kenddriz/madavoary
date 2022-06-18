import { MutationCreateVisitArgs, Visit } from 'src/graphql/types';
import { gql } from '@apollo/client';
import {VISIT_FIELDS} from 'src/graphql/visit/visit';
import {useMutation} from '@vue/apollo-composable';
import axios from 'axios';

type CreateVisitData = {
  createVisit: Visit;
}

const MUTATION = gql`
  mutation CreateVisit($input: CreateVisitInput!){
    createVisit(input: $input){
      ${VISIT_FIELDS}
    }
  }
`;
/*type IpApiResponse = {
  status: string,
  country: string,
  countryCode: string,
  region: string,
  regionName: string,
  city: string,
  zip: string,
  lat: number,
  lon: number,
  timezone: string,
  isp: string,
  org: string,
  as: string,
  query: string
}*/
//const defaultData = {'status':'success','country':'Madagascar','countryCode':'MG','region':'','regionName':'Analamanga','city':'Antananarivo','zip':'','lat':-18.9137,'lon':47.5361,'timezone':'Indian/Antananarivo','isp':'Telecom Malagasy','org':'Telecom Malagasy','as':'AS37054 Telecom Malagasy','query':'154.126.11.190'}
export const useCreateVisit = () => {
  const api = axios.create({ baseURL: process.env.ipApi });
  const { loading, mutate, onDone } = useMutation<
    CreateVisitData,
    MutationCreateVisitArgs
    >(MUTATION);
  onDone(({ data }) => {
    sessionStorage.setItem('session', JSON.stringify(data?.createVisit));
  });
  if(!sessionStorage.getItem('session')) {
    api.get('/json').then(({ data }) => {
      void mutate({ input: {
          ip: data.query,
          region: data.regionName,
          country: data.country,
          city: data.city,
          countryCode: data.countryCode,
          geo: {
            x: data.lat,
            y: data.lon
          }
        }})
    }).catch(err => console.log(err))
  }
  return { loading }
}
