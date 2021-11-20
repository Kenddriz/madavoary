import {reactive, ref} from 'vue';
import {CreateLivingBeingInput, LivingBeing, MutationCreateLivingBeingArgs} from 'src/graphql/types';
import {gql} from '@apollo/client';
import {LIVING_BEING_FIELDS} from 'src/graphql/living-being/living-being';
import {useMutation} from '@vue/apollo-composable';
import {addPaginationCache} from 'src/graphql/utils/pagination';
import {useLoading} from 'src/graphql/utils/utils';
import {LOCALIZATION_FIELDS} from 'src/graphql/localization/localization';
import {AREA_FIELDS} from 'src/graphql/area/area';

type CreateLivingBeingData = {
  createLivingBeing: LivingBeing;
}
const CREATE_LIVING_BEING = gql`
  mutation CreateLivingBeing($images: [Upload!]!, $input: CreateLivingBeingInput!) {
    createLivingBeing(images:$images,input: $input){
      ${LIVING_BEING_FIELDS}
      localizations{${LOCALIZATION_FIELDS} area{${AREA_FIELDS}}}
    }
  }
`;
export const useCreateLivingBeing = () => {
  const input = reactive<CreateLivingBeingInput>({
    characteristics: Array(2).fill(''),
    endangered: false,
    endemic: false,
    areaId: 0,
    names: Array(4).fill('')
  });
  const images = ref<any[]>([]);
  const { loading } = useLoading();
  const { mutate, onDone } = useMutation<
    CreateLivingBeingData,
    MutationCreateLivingBeingArgs
    >(CREATE_LIVING_BEING, {
      variables: { input, images: images.value },
      context: { hasUpload: true },
      update: (cache, { data }) => {
        if(data?.createLivingBeing) {
          cache.modify({
            fields: {
              paginateLivingBeings(existingRef: any, { toReference }) {
                return addPaginationCache(data.createLivingBeing, existingRef, toReference);
              }
            }
          })
        }
      }
  });
  const showDialog = ref(false);
  onDone(({ data }) => {
    if(data?.createLivingBeing) {
      loading('create.success', true);
      input.names =  input.names.map(() => '');
      showDialog.value = false;
    }
    else loading('create.failed', true);
  });
  function submitCreation() {
    loading('loading.create');
    void mutate();
  }
  const formRef = ref<any>(null);
  function validate () {
    formRef.value.validate().then((success: boolean) => {
      if (success) submitCreation();
    })
  }
  return { input, images, submitCreation, validate, formRef, showDialog }
}
