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
      <q-carousel-slide :name="0" img-src="sign-in.svg">
        <div class="absolute-center custom-caption text-h6">
          nom local : Sifaka
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="2" img-src="sign-in.svg">
        <div class="absolute-center custom-caption text-h6">
          nom local : Sifaka
        </div>
      </q-carousel-slide>
    </q-carousel>

    <q-separator />

    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label>Nom scientifique</q-item-label>
          <q-item-label caption>
            Sifakum
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>Nom vernaculaire en anglais</q-item-label>
          <q-item-label caption>
            45 550
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>Nom vernaculaire en français</q-item-label>
          <q-item-label caption>
            45 550
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-separator />

    <q-item class="row justify-between">
      <q-item-section>
        <q-item-label>{{$t('createdAt')}}</q-item-label>
        <q-item-label caption>10/12/2021</q-item-label>
      </q-item-section>
      <q-item-section class="text-right">
        <q-item-label>{{$t('updatedAt')}}</q-item-label>
        <q-item-label caption>10/12/2021</q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-list dense>
      <q-item-label class="q-py-sm" header>Autheur</q-item-label>
      <q-item>
        <q-item-section avatar>
          <q-avatar size="lg">
            <q-icon name="person" color="white" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>RANDRIAMANAJA Charlin</q-item-label>
          <q-item-label caption>{{$tm('roles')[0]}}</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-btn icon="read_more" round flat dense color="white" />
        </q-item-section>
      </q-item>
    </q-list>

    <q-separator />

    <q-card-actions align="between">
      <q-btn outline color="brown" text-color="white" icon="edit" />
      <q-btn outline color="brown" text-color="white" icon="delete_forever"/>
      <q-btn outline color="brown" text-color="white" icon="info" />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';

export default defineComponent({
  name: 'SpeciesDetails',
  components: {  },
  setup() {
    return {
      slide: ref<number>(0)
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
