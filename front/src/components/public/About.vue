<template>
  <q-card class="bg-secondary q-pa-md">
    <q-card-section class="text-h4 text-center">
      {{$tm('about.title')}}
    </q-card-section>
    <q-card-section :horizontal="$q.screen.width >= 1024">
      <q-img
        src="images/creek.jpg"
        basic
        class="col-12 col-md-4"
      >
        <div class="absolute-center transparent  text-h5">
          About
        </div>
      </q-img>
      <q-list class="bg-secondary col" style="max-width: 1000px">
        <q-expansion-item
          v-for="(about, index) in $tm('about.body')"
          :key="index"
          group="somegroup"
          :icon="about.icon"
          :label="about.question"
          :default-opened="index === 0"
        >
          <p class="q-ma-md">
            {{ about.response }}
          </p>
        </q-expansion-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script>
  export default {
    name: 'About',
  };
</script>

<style lang="scss" scoped>
  .about-margin {
    margin: 3% 5% 3% 5%;
    padding: 0 2% 2% 2%;
    border-bottom: 2px solid #26A69A;
  }
  @media only screen and (max-width: 1024px) {
    .about-margin {
      margin: 10% 0 15% 0;
    }
  }
</style>
