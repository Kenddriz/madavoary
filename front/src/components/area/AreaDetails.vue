<template>
  <q-card flat bordered>
    <q-img height="184px" :src="uri + area.banner">
      <div class="absolute-center text-h6 flex flex-center">
        {{area.name}}
      </div>
    </q-img>

    <q-separator />

    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label>{{$t('surface')}}</q-item-label>
          <q-item-label caption>
            {{area.surface}}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>{{$t('region')}}</q-item-label>
          <q-item-label caption>
            {{area.region}}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>{{$t('area.type')}}</q-item-label>
          <q-item-label caption>
            {{$tm('area.longTypes')[area.type]}}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <CommonActionsDetails
      :created-at="area.createdAt"
      :updated-at="area.updatedAt"
      :user="area.user"
      @back="$emit('back')"
    />
  </q-card>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {formatDate} from 'src/graphql/utils/utils';
import CommonActionsDetails from 'components/shared/CommonActionsDetails.vue';

export default defineComponent({
  name: 'AreaDetails',
  components: { CommonActionsDetails },
  props: ['area'],
  emits: ['back'],
  setup() {
    return {
      uri: process.env.uri + 'areas/',
      formatDate
    }
  }
})
</script>

<style scoped>

</style>
