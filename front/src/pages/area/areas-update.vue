<template>
    <q-page class="q-pa-md">
      <template v-if="area">
        <AreaForm
          cssClass="q-my-lg"
          v-model:name="input.name"
          v-model:type="input.type"
          v-model:region="input.region"
          v-model:surface="input.surface"
          v-model:peripherals="input.peripherals"
          v-model:banner="banner"
          v-model:geo-x="input.geo.x"
          v-model:geo-y="input.geo.y"
          v-model:descriptions="input.descriptions"
          v-model:slogans="input.slogans"
          @validate="updateArea"
          :src="src"
        >
          <template v-slot:button>
            <q-icon left name="save" />
            <div>{{ $t('save') }}</div>
          </template>
        </AreaForm>
        <q-card flat bordered class="q-mt-md bg-primary text-center">
          <q-card-section horizontal>
            <q-card-section class="col">
              {{ area.createdAt }}
            </q-card-section>
            <q-separator vertical />
            <q-card-section class="col">
              {{ area.updatedAt }}
            </q-card-section>
          </q-card-section>
        </q-card>
      </template>
      <q-inner-loading :showing="loadingFind">
        <q-skeleton class="bg-amber" size="200px" animation="pulse" />
        <div class="text-h5 q-mt-lg text-amber">
          Chargement ...
        </div>
      </q-inner-loading>
    </q-page>
</template>

<script  lang="ts">
  import { computed, defineComponent } from 'vue';
  import AreaForm from 'components/area/area-form.vue';
  import { Area } from 'src/graphql/types';
  import {useUpdateArea} from 'src/graphql/area/update-area';
  import {gql} from '@apollo/client';
  import {AREA_FIELDS} from 'src/graphql/area/area';
  import {useRouter} from 'vue-router';
  import {useQuery, useResult} from '@vue/apollo-composable';
  import { QueryFindAreaArgs } from 'src/graphql/types';
  import {getImage} from 'src/graphql/utils/utils';

  type FindAreaData = {
    findArea: Area;
  }

  const FIND_AREA = gql`
   query FindArea($id: Int!){
      findArea(id: $id){
          ${AREA_FIELDS}
      }
   }
`;

    export default defineComponent({
      name: 'areas-creation',
      components: { AreaForm },
      setup() {
        const router = useRouter();
        const id = Number(router.currentRoute.value.params.id);

        const { input, updateArea, banner } = useUpdateArea();

        function reset(val: any = null) {
          const { id, name, type, peripherals, region, surface, descriptions, slogans, geo } = val || area.value;
          Object.assign(input, { id, name, type, region, surface, descriptions, slogans });
          input.geo.x = geo.x;
          input.geo.y = geo.y;
          input.peripherals = peripherals.map((p :any) => ({ city: p.city, distance: p.distance }));
        }
        const { loading: loadingFind, result } = useQuery<
          FindAreaData,
          QueryFindAreaArgs
          >(FIND_AREA, { id });

        const area = useResult<
          FindAreaData | undefined,
          Area,
          Area
          >(result, undefined, res => {
          if(res.findArea) reset(res.findArea);
          return res.findArea;
        });

        return {
          area,
          input,
          banner,
          loadingFind,
          updateArea,
          src: computed(() => area.value ? getImage(area.value?.banner) : ''),
        }
      }
    })
</script>

<style scoped>

</style>
