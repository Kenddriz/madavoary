<template>
  <q-form
    class="q-gutter-md"
  >
    <div class="q-pb-md text-center text-h5">
      Authentification
    </div>
    <q-input
      v-model="input.identity"
      label-color="white"
      square
      dense
      label="Identifiant"
      class="register-input-field full-width"
    >
      <template v-slot:prepend>
        <q-icon name="person" />
      </template>
    </q-input>
    <q-input
      v-model="input.password"
      label-color="white"
      square
      dense
      type="password"
      label="Mot de passe"
      class="register-input-field full-width"
    >
      <template v-slot:prepend>
        <q-icon name="lock" />
      </template>
    </q-input>

    <q-btn
      outline
      rounded
      label="se connecter"
      type="submit"
      icon-right="login"
      :loading="loading"
    />

    <q-btn
      flat
      no-caps
      label="Mot de passe oublié ?"
      type="button"
    />
    <social-network />
  </q-form>
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue'
  import SocialNetwork from './SocialNetwork.vue';

  export default defineComponent({
    name: 'SignIn',
    components: {SocialNetwork},
    setup() {
      return {
        input: reactive({ identity: '', password: ''})
      }
    }
  })
</script>

