<template>
  <div class="bg-primary text-blue-grey-11 q-pa-md">
    <div class="q-gutter-lg row justify-around items-start">
      <!--links -->
      <div class="col-12 col-md-3">
        <q-card-section class="text-h6">
          Navigation
        </q-card-section>

        <q-separator inset />

        <q-card-section>
          <a
            v-for="(menu, index) in $tm('home.menuBar')"
            :key="index"
            :href="`${menu.to.charAt(0) === '/' ? '' : '#'}${menu.to}`"
            class="text-white row items-center q-pb-sm no-text-decoration"
          >
            {{ menu.label }}
          </a>
        </q-card-section>
      </div>
      <!--Contact -->
      <div class="col-12 col-md-3">
        <q-card-section class="text-h6">
          {{$tm('home.footer.contact.title')}}
        </q-card-section>
        <q-separator dark inset />
        <q-list flat>
          <q-item v-for="(contact, index) in contacts" :key="index">
            <q-item-section avatar>
              <q-icon color="white" :name="contact.icon" />
            </q-item-section>

            <q-item-section>{{contact.label}}</q-item-section>
          </q-item>
        </q-list>
      </div>
      <!--About-->
      <div class="col-12 col-md-3">
        <q-card-section class="text-h6">
            Abonnement
        </q-card-section>

        <q-separator inset />

        <q-card-section>
          Abonnez-vous pour ne rater aucune actualité sur Madavoary .
        </q-card-section>
        <q-card-section>
          <CreateSuscription />
        </q-card-section>
      </div>
    </div>
    <div class="row justify-center">
      <img src="images/madagascar-madavoary.ico" alt="madavory madagascar image" height="150">
      <h3 class="text-h3 text-weight-thin text-center">
        {{$tm('home.footer.welcome')}}
      </h3>
    </div>
    <div class="row justify-center">
      <div class="text-h6">Register for free</div>
      <q-btn
        label="sign up"
        to="/private/users/authentication"
        rounded
        class="bg-warning
        q-ml-lg"
        text-color="primary"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import CreateSuscription from 'components/subscription/CreateSuscription.vue';
  import {contacts} from 'layouts/public/data/contact-items';

  export default  defineComponent({
    name: 'Footer',
    components: { CreateSuscription },
    data:() => ({ contacts })
  });
</script>

<style scoped>

</style>
