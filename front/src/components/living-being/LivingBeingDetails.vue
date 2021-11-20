<template>
  <q-card flat bordered>
    <q-carousel
      animated
      v-model="slide"
      arrows
      navigation
      infinite
      height="184px"
      control-color="warning"
    >
      <q-carousel-slide v-if="!item.images.length" :name="0" img-src="sign-in.svg">
        <div class="absolute-center custom-caption text-h6">
          nom local : Sifaka
        </div>
      </q-carousel-slide>
      <q-carousel-slide
        v-for="(img, index) in item.images"
        :name="index"
        :img-src="uri + img"
        :key="index"
      >
        <div class="absolute-center custom-caption text-h6">
          {{item.localNames[0] }}
        </div>
      </q-carousel-slide>
    </q-carousel>

    <q-separator />

    <q-list>
      <q-item v-for="(name, index) in $tm('names')" :key="index">
        <q-item-section>
          <q-item-label>{{name}}</q-item-label>
          <q-item-label caption>
            {{ index === 0 ? item.localNames.join(' - ') : item.names[index - 1] }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <CommonActionsDetails
      :created-at="item.createdAt"
      :updated-at="item.updatedAt"
      :user="item.user"
    />
  </q-card>
</template>

<script lang="ts">
import {defineComponent, PropType, ref} from 'vue';
import {LivingBeing} from 'src/graphql/types';
import {formatDate} from 'src/graphql/utils/utils';
import CommonActionsDetails from 'components/shared/CommonActionsDetails.vue';

export default defineComponent({
  name: 'LivingBeingDetails',
  components: { CommonActionsDetails  },
  props: {
    item: {
      type: Object as PropType<LivingBeing>,
      required: true
    }
  },
  setup() {
    return {
      slide: ref<number>(0),
      uri: process.env.uri + 'livingBeings/',
      formatDate
    }
  }
})
</script>

<style scoped>
.custom-caption {
  color: white;
  background-color: rgba(0, 0, 0, .3);
  padding: 12px
}
</style>
