<template>
  <q-card flat style="min-width: 150px" class="bg-secondary">
    <q-card-section class="q-pb-none">
      {{title}}
    </q-card-section>
    <q-card-section>
      <div class="row no-wrap items-center justify-between text-white">
        <q-icon size="25px" :name="icon" />
        <div>
          {{ count }}
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
  export default {
    name: 'Alert',
    props: {
      icon: String,
      count: Number,
      title: String
    }
  };
</script>

<style scoped>

</style>
