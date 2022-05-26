<template>
  <q-card class="bg-secondary">

    <q-card-section class="row wrap items-stretch">
      <q-card-section class="col-12 col-md-4">
        <div class="text-subtitle1 text-bold q-mb-md">
          {{ $tm(`parks.${page}.localization.title`) }}
        </div>
        <p>
          {{ $tm(`parks.${page}.localization.body`) }}
        </p>
        <q-list>
          <q-item
            v-for="(item, index) in $tm(`parks.${page}.localization.items`)"
            :key="index"
          >
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.label }}</q-item-label>
              <q-item-label caption>{{ item.value }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section >

      <q-card-section class="col-12 col-md-4" style="min-height: 350px">
        <!--<Mapper :position="position" />-->
      </q-card-section>

      <q-card-section class="col-12 col-md-3">

        <div class="text-subtitle1 text-bold q-mb-sm">
          {{ $tm(`parks.${page}.office.title`) }}
        </div>
        <q-item>
          <q-item-section avatar>
            <q-icon name="meeting_room" />
          </q-item-section>
          <q-item-section>
            {{ $tm(`parks.${page}.office.bp`) }}
          </q-item-section>
        </q-item>

        <q-separator inset spaced />

        <div class="text-subtitle1 text-bold q-mb-sm">
          {{ $tm(`parks.${page}.contact.title`) }}
        </div>
        <q-list>
          <q-item>
            <q-item-section avatar>
              <q-icon name="contact_mail" />
            </q-item-section>
            <q-item-section>
              {{ $tm(`parks.${page}.contact.email`) }}
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon name="phone" />
            </q-item-section>
            <q-item-section>
              {{ $tm(`parks.${page}.contact.phones`).join(' - ') }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card-section>
    <q-card-section>
      {{ position }}
      <q-btn @click="position = [49.9747222222, -15.7608333333]" label="Coordonne"/>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
  import { defineComponent,ref } from 'vue';

  export default defineComponent({
    name: 'ParkLocalisation',
    props: {
      page: String
    },
    components: {

    },
    setup() {

      return {
        position: ref<number[]>([49.7025000000, -14.4597222222])
      }
    },
  });
</script>

<style scoped>

</style>
