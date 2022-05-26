<template>
  <q-page class="bg-primary">
    <q-parallax style="height: 100vh">
      <template v-slot:media>
        <img src="images/schrecksee.jpg">
      </template>

      <template v-slot:content="scope">
        <div
          class="absolute column items-center"
          :style="{
            opacity: 0.45 + (1 - scope.percentScrolled) * 0.55,
            top: (scope.percentScrolled * 60) + '%',
            left: 0,
            right: 0
          }"
        >
          <div class=" text-3d">- Madavoary -</div>
          <div class="text-center text-h5 text-weight-thin">
            Découvrez l'environnement de Madagascar
          </div>
          <div class="flex q-gutter-md q-mt-md">
            <q-btn color="orange" label="Se connecter" />
            <q-btn color="deep-orange" label="S'inscrire" />
          </div>
        </div>
      </template>
    </q-parallax>
  </q-page>
</template>
<script lang='ts'>
  import {defineComponent} from 'vue';

  export default defineComponent({
    name: 'Home',
    setup() {
      return {
      }
    },
  })
</script>
<style lang="scss" scoped>
  .text-3d {
    text-transform: uppercase;
    font-family: verdana;
    font-size: 8em;
    font-weight: 700;
    color: #f5f5f5;
    text-shadow: 1px 1px 1px #919191,
    1px 2px 1px #919191,
    1px 3px 1px #919191,
    1px 4px 1px #919191,
    1px 5px 1px #919191,
    1px 6px 1px #919191,
    1px 7px 1px #919191,
    1px 8px 1px #919191,
    1px 9px 1px #919191,
    1px 10px 1px #919191,
    1px 18px 6px rgba(16,16,16,0.4),
    1px 22px 10px rgba(16,16,16,0.2),
    1px 25px 35px rgba(16,16,16,0.2),
    1px 30px 60px rgba(16,16,16,0.4);
  }

  @media only screen and (max-width: 768px) {
    .text-3d {
      font-size: 3em;
      margin-bottom: 5%;
    }
  }
</style>
