<template>
  <q-card flat square class="bg-secondary">
    <q-card-section class="text-h4 text-center">
      Nos actualités
    </q-card-section>
    <q-carousel
      swipeable
      animated
      v-model="slide"
      navigation
      infinite
      :autoplay="autoplay"
      arrows
      transition-prev="slide-right"
      transition-next="slide-left"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
      control-color="deep-orange"
      class="bg-secondary"
    >
      <q-carousel-slide :name="1">
        <q-img
          src="images/creek.jpg"
          height="100%"
        >
          <div class="absolute-center column wrap items-center">
            <div class="text-h2 text-center">First stop</div>
            <div class="text-subtitle1 text-center">Mountains</div>
          </div>
        </q-img>
      </q-carousel-slide>
      <q-carousel-slide :name="2">
        <q-img
          src="images/mountain.jpg"
          height="100%"
        >
          <div class="absolute-center column wrap items-center">
            <div class="text-h2 text-center">First stop</div>
            <div class="text-subtitle1 text-center">Mountains</div>
          </div>
        </q-img>
      </q-carousel-slide>
      <q-carousel-slide :name="4">
        <q-img
          src="images/schrecksee.jpg"
          height="100%"
        >
          <div class="absolute-center column wrap items-center">
            <div class="text-h2 text-center">First stop</div>
            <div class="text-subtitle1 text-center">Mountains</div>
          </div>
        </q-img>
      </q-carousel-slide>
    </q-carousel>
  </q-card>
</template>

<script lang="ts">
  import { ref } from 'vue';

  export default {
    name: 'ActualiteParallax',
    setup () {
      return {
        slide: ref(1),
        autoplay: ref(true)
      }
    }
  };
</script>

<style scoped>

</style>
