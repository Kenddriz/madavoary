<template>
  <!--<q-img
    src="welcome.png"
    height="95vh"
    :ratio="1"
  >
    <div class="absolute-center column wrap items-center bg-transparent full-width">
      <div class="text-center text-h5 text-blue-grey-1">{{date}}</div>
      <div class=" text-3d">- Madavoary -</div>
      <div class="text-center text-h5 text-weight-thin text-blue-grey-1">{{ $tm('home.welcome') }}</div>
    </div>
  </q-img>-->
  <q-parallax :height="$q.screen.height - 100">
    <template v-slot:media>
      <img src="welcome.png">
    </template>

    <template v-slot:content="scope">
      <div
        class="absolute column items-center"
        :style="{
            opacity: 0.5 + (1 - scope.percentScrolled) * 0.8,
            top: (scope.percentScrolled * 60) + '%',
            left: 0,
            right: 0
          }"
      >
        <div class="text-center text-h5 text-blue-grey-1">{{date}}</div>
        <div class=" text-3d">- Madavoary -</div>
        <div class="text-center text-h5 text-weight-thin text-blue-grey-1">{{ $tm('home.welcome') }}</div>
      </div>
    </template>
  </q-parallax>
</template>

<script lang="ts">
  import {defineComponent, ref} from 'vue'
  import {formatDate} from 'src/graphql/utils/utils';

  export default defineComponent({
   name: 'HomeImage',
    setup() {
      const date = ref<string>('');
      const timeID = ref<NodeJS.Timeout>(setInterval(() => {return}, 0));
     return {
       date,
       timeID
     }
    },
    mounted(): void {
      this.timeID = setInterval(() => {
        this.date = formatDate(Date.now(), this.$tm('home.dateFormat.dateTime'));
      }, 1000)
    },
    beforeUnmount(): void {
      clearInterval(this.timeID);
    }
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
