<template>
  <form class="q-mb-md">
    <div class="text-h6">Remplir le formulaire</div>
    <q-stepper
      v-model="step"
      ref="stepper"
      animated
      class="no-border bg-transparent fit q-mt-none"
      flat
      active-color="positive"
    >
      <q-step
        :name="1"
        title="Description"
        icon="person"
      >
        <div class="q-gutter-md">
          <q-input
            label-color="white"
            dense
            label="Nom"
            class="register-input-field"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>

          <q-input
            label-color="white"
            dense
            label="Prénom(s)"
            class="register-input-field"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>

          <q-input
            label-color="white"
            dense
            label="Ville"
            class="register-input-field"
          >
            <template v-slot:prepend>
              <q-icon name="location_city" />
            </template>
          </q-input>

          <q-input
            label-color="white"
            dense
            label="Adresse"
            type="password"
            class="register-input-field"
          >
            <template v-slot:prepend>
              <q-icon name="directions"/>
            </template>
          </q-input>
        </div>
      </q-step>

      <q-step
        :name="2"
        title="Sécurité"
        icon="contacts"
      >
        <div class="q-gutter-md">
          <q-input
            label-color="white"
            dense
            label="Téléphone"
            mask="+261 ## ## ### ##"
            class="register-input-field"
          >
            <template v-slot:prepend>
              <q-icon name="phone"/>
            </template>
          </q-input>

          <q-input
            label-color="white"
            dense
            label="Adresse mail"
            class="register-input-field"
          >
            <template v-slot:prepend>
              <q-icon name="contact_mail"/>
            </template>
          </q-input>

          <q-input
            label-color="white"
            dense
            label="Mot de passe"
            type="password"
            class="register-input-field"
          >
            <template v-slot:prepend>
              <q-icon name="lock"/>
            </template>
          </q-input>

          <q-input
            label-color="white"
            dense
            label="Résaisir le mot de passe"
            type="password"
          >
            <template v-slot:prepend>
              <q-icon name="lock"/>
            </template>
          </q-input>
        </div>
      </q-step>

      <q-step
        :name="3"
        title="Vérification"
        icon="check"
      >
        <q-input
          label-color="white"
          dense
          label="Adresse"
          type="password"
          class="register-input-field"
        >
          <template v-slot:prepend>
            <q-icon name="directions"/>
          </template>
        </q-input>
      </q-step>
      <template v-slot:navigation>
        <q-stepper-navigation>

          <q-btn
            v-if="step === 2"
            color="primary"
            flat
            label="Sign Up"
          />
          <q-btn
            outline
            no-caps
            v-else
            @click="$refs.stepper.next()"
            label="Suivant"
            icon-right="navigate_next"
          />

          <q-btn
            v-if="step > 1"
            no-caps
            @click="$refs.stepper.previous()"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </form>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  //import ConfirmMail from './ConfirmMail.vue';

  export default defineComponent({
    name: 'SignUp',
    components: {
      //ConfirmMail
    },
    setup() {
      const step = ref(1);
      return {
        step,
      }
    }
  });
</script>

<style scoped>

</style>
