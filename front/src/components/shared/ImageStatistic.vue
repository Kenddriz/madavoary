<template>
  <q-card class="bg-primary q-my-lg" flat bordered>
    <q-card-section :horizontal="$q.screen.gt.sm">
      <q-card-actions align="center" class="col-4">
        <q-circular-progress
          show-value
          font-size="15px"
          :max="5"
          :min="0"
          class="text-white q-ma-md"
          :value="5"
          size="80px"
          :thickness="0.05"
        >
          <q-icon name="bar_chart" class="q-mr-xs" />
          {{ Math.ceil(imageLength * 100 / maxImagesAdventure) }} %
        </q-circular-progress>
      </q-card-actions>

      <q-separator :vertical="$q.screen.gt.sm" />

      <q-card-actions align="center" class="col-4">
        <div class="text-center">
          <q-item-label class="q-mb-md">
            Images publiées
          </q-item-label>
          <q-item-label class="text-h5">
            {{imageLength}}/{{maxImagesAdventure}}
          </q-item-label>
        </div>
      </q-card-actions>

      <q-separator :vertical="$q.screen.gt.sm" />

      <q-card-actions align="center" class="col-4 text-center">
        <q-item-section>
          <q-item-label class="q-mb-md">
            {{$t('createdAt')}}
          </q-item-label>
          <q-item-label>
            {{formatDate(createdAt, $t('dateTime'))}}
          </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label class="q-mb-md">
            {{$t('updatedAt')}}
          </q-item-label>
          <q-item-label>
            {{formatDate(updatedAt, $t('dateTime'))}}
          </q-item-label>
        </q-item-section>
      </q-card-actions>

    </q-card-section>
  </q-card>
</template>

<script lang="ts">
  import { formatDate } from '../../graphql/utils/utils';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'ImageStatistic',
    props: ['updatedAt', 'createdAt', 'imageLength', 'maxImagesAdventure'],
    setup(){
      return {
        formatDate,
      }
    }
  })
</script>

<style scoped>

</style>
