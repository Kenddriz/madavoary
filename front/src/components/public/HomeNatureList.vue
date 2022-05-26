<template>

  <div class="q-gutter-lg row justify-center q-pa-lg bg-secondary">
    <h1 class="text-h4 text-center col-12">
      {{$tm('home.nature.title')}}
    </h1>

    <q-card
      flat
      class="col-12 col-md-3 box bg-transparent"
      v-for="(env, index) in $tm('home.nature.body')"
      :key="index"
    >
      <q-img src="bg-home.svg">
        <div class="absolute-top text-subtitle1 text-center bg-transparent">
          {{env.title}}
        </div>
      </q-img>

      <q-card-section>
        <q-btn
          fab
          color="primary"
          :icon="env.icon"
          class="absolute"
          style="top: 0; right: 12px; transform: translateY(-50%);"
        />
      </q-card-section>

      <q-card-section>
        {{ env.description }}
      </q-card-section>

    </q-card>
  </div>
</template>

<script>
  export default {
    name: 'HomeNatureList'
  };
</script>

<style lang="scss" scoped>
  .box {
    box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.05);
  &:hover {
     box-shadow: 2px 2px 30px rgba(4, 15, 49, 0.1);
     transform: scale(1.01);
     transition: all ease 0.1s;
   }
  }
</style>
