<template>
    <q-card
      flat
      class="bg-secondary"
      style="border-top-left-radius: 80px; border-bottom-right-radius: 80px"
    >
      <q-img src="travelers.svg" height="300px" >
        <div class="absolute-center">
          <p class="text-h6 text-center text-bold">
            {{ $tm(`parks.${page}.travel.title`) }}
          </p>
          <q-item v-for="(t, index) in $tm(`parks.${page}.travel.body`)"
             :key="index"
             style="line-height: 2em"
          >
            <q-item-section avatar>
              <q-avatar icon="check" color="orange" text-color="white" size="md" />
            </q-item-section>
            <q-item-section>
              {{ t }}
            </q-item-section>
          </q-item>
        </div>
      </q-img>
    </q-card>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Travel',
    props: {
      page: String
    }
  });
</script>

<style scoped>

</style>
