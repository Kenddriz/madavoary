<template>
  <q-card flat class="bg-secondary">
    <q-card-section
      horizontal
      align="center"
      class="row justify-center q-gutter-md q-pt-lg"
    >
      <q-btn
        v-for="(notice, index) in $tm(`parks.${page}.notice`)"
        :key="index"
        :label="notice.title"
        @click="slide = index"
        :color="`${slide === index ? 'positive' : 'tertiary'}`"
        glossy
      />
    </q-card-section>

    <q-carousel
      animated
      v-model="slide"
      swipeable
      navigation
      infinite
      :autoplay="autoplay"
      transition-prev="slide-right"
      transition-next="slide-left"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
      class="bg-secondary q-ma-sm"
      height="460px"
    >
      <q-carousel-slide
        v-for="(notice, index) in $tm(`parks.${page}.notice`)"
        :key="index"
        :name="index"
      >
        <q-img src="https://cdn.quasar.dev/img/parallax1.jpg" height="440px">
          <div class="absolute-center">
            <q-timeline v-if="index === 0" color="orange">
              <q-timeline-entry class="text-h6">
                {{ notice.title }}
              </q-timeline-entry>

              <q-timeline-entry
                v-for="(entry, i) in notice.body"
                :key="i"
                :title="entry.label"
                icon="event"
              >
                {{ entry.value }}
              </q-timeline-entry>
            </q-timeline>
            <q-list v-else>
              <q-item-label class="text-white text-h6" header>{{ notice.title }}</q-item-label>
              <q-item
                v-for="(entry, i) in notice.body"
                :key="i"
              >
                <q-item-section avatar>
                  <q-icon name="check" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-subtitle1">{{ entry.label }}</q-item-label>
                  <q-item-label class="text-body2">{{ entry.value }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </q-img>
      </q-carousel-slide>
    </q-carousel>
  </q-card>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';

  export default defineComponent({
    name: 'Notice',
    props: {
      page: String
    },
    setup() {
      return {
        slide: ref(0),
        autoplay:ref(true)
      }
    }
  });
</script>

<style scoped>

</style>
