import {reactive, ref} from 'vue';
import {CreateLivingBeingInput} from 'src/graphql/types';

export const useCreateLivingBeing = () => {
  const input = reactive<CreateLivingBeingInput>({
    characteristics: Array(2).fill(''),
    endangered: false,
    endemic: false,
    localizationInput: { areaId: 0, places: [] },
    names: Array(4).fill('')
  });
  const images = ref<any[]>([]);
  return { input, images }
}
