<template>
    <q-page class="q-pa-md">
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
        @validate="submitCreate"
      >
        <template v-slot:button>
          <q-icon left name="add" />
          <div>{{ $t('create.btn') }}</div>
        </template>
      </AreaForm>
    </q-page>
</template>

<script  lang="ts">
    import {defineComponent} from 'vue';
    import AreaForm from 'components/area/area-form.vue';
    import {useCreateArea} from 'src/graphql/area/ceate-area';

    export default defineComponent({
      name: 'areas-creation',
      components: { AreaForm },
      setup() {
        return {
          ...useCreateArea()
        }
      }
    })
</script>

<style scoped>

</style>
