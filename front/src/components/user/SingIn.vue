<template>
  <q-form
    class="q-gutter-y-md"
    @submit.prevent="submitLogin"
  >
    <div class="q-pb-md text-center text-h5">
      {{$t('user.authentication')}}
    </div>
    <q-input
      :model-value="input.email"
      v-model="input.email"
      color="orange"
      square
      dense
      :label="$t('email')"
      class="register-input-field"
      :lazy-rules="true"
      :rules="[v => validMail(v)]"
      no-error-icon
    >
      <template v-slot:prepend>
        <q-icon  color="orange" name="mail" />
      </template>
    </q-input>
    <PasswordInput
      v-model="input.password"
      :label="$t('password')"
      class="register-input-field"
    />

    <q-btn
      outline
      rounded
      :label="$t('user.login')"
      type="submit"
      icon-right="login"
      :loading="loading"
    />

    <q-btn
      flat
      no-caps
      :label="$t('user.passwordForgotten')"
      type="button"
    />
    <social-network />
  </q-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SocialNetwork from './SocialNetwork.vue';
import {useLogin} from 'src/graphql/user/login';
import {validMail} from 'src/graphql/utils/utils';
import PasswordInput from './PasswordInput.vue';

export default defineComponent({
  name: 'SignIn',
  components: {SocialNetwork, PasswordInput},
  setup() {
    return {
      ...useLogin(),
      validMail
    }
  }
})
</script>

