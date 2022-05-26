<template>
  <q-img height="350px" src="https://cdn.quasar.dev/img/parallax2.jpg">
    <div class="absolute-center text-center">
      <h1 class="text-h2 q-mb-none">{{ $tm(`parks.${page}.title`) }}</h1>
      <p class="text-subtitle1 text-italic">
        « {{ $tm(`parks.${page}.devise`) }} »
      </p>
    </div>
  </q-img>
</template>

<script lang="ts">
  export default {
    name: 'Welcome',
    props: {
      page: String
    }
  };
</script>

<style scoped>

</style>
