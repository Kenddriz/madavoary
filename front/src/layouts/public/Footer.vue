<template>
  <q-footer class="bg-primary text-blue-grey-11 q-pa-md">
    <div class="q-gutter-lg row justify-around items-start">

      <div class="col-12 col-md-3">
        <q-card-section class="text-h6">
          Navigation
        </q-card-section>

        <q-separator :inset="true" />

        <q-card-section>
          <router-link
            v-for="(menu, index) in menuBar"
            :key="index"
            :to="`/${menu.to}`"
            class="text-white row items-center q-pb-sm no-text-decoration"
            exact
            exact-active-class="text-amber"
          >
            {{ $t(menu.label) }}
          </router-link>
        </q-card-section>
      </div>

      <div class="col-12 col-md-3">
        <q-card-section class="text-h6">
          {{$tm('contactUs')}}
        </q-card-section>
        <q-separator dark :inset="true" />
        <q-list flat>
          <q-item v-for="(contact, index) in contacts" :key="index">
            <q-item-section avatar>
              <q-icon color="white" :name="contact.icon" />
            </q-item-section>

            <q-item-section>{{contact.label}}</q-item-section>
          </q-item>
        </q-list>
      </div>

      <div class="col-12 col-md-3">
        <q-card-section class="text-h6">
            Don
        </q-card-section>

        <q-separator :inset="true" />

        <q-card-section>
          Veuillez nous faire un don, tout montant est accepté.
          Supportez-nous, supportez Madavoary! Merci de votre aide!
        </q-card-section>
        <q-card-section>
          <CreateSuscription />
        </q-card-section>
      </div>
    </div>
    <div class="row justify-center">
      <img src="images/madagascar-madavoary.ico" alt="madavory madagascar image" height="150">
      <h3 class="text-h3 text-weight-thin text-center">
        {{$tm('welcome')}}
      </h3>
    </div>
    <div class="row justify-center">
      <div class="text-h6">Register for free</div>
      <q-btn
        label="sign up"
        to="/authentication"
        rounded
        class="bg-warning
        q-ml-lg"
        text-color="primary"
      />
    </div>
  </q-footer>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import CreateSuscription from 'components/subscription/CreateSuscription.vue';
  import {contacts, menuBar} from 'layouts/public/data/data';

  export default  defineComponent({
    name: 'Footer',
    components: { CreateSuscription },
    data:() => ({ contacts, menuBar })
  });
</script>

<style lang="scss" scoped>
</style>
