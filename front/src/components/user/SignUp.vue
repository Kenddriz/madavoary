<template>
  <q-form
    autocorrect="off"
    autocapitalize="off"
    autocomplete="off"
    spellcheck="false"
    @validation-error="validationError"
    @submit.prevent="onSubmit"
    ref="signForm"
  >
    <q-item-section class="full-width">
      <q-item-label class="text-h6">Créer un compte</q-item-label>
      <q-item-label caption class="text-red">{{errorOn}}</q-item-label>
    </q-item-section>
    <q-stepper
      v-model="params.step"
      vertical
      color="white"
      animated
      active-color="amber"
      done-color="white"
      header-class="bg-primary"
      keep-alive
      class="no-border"
      header-nav
    >
      <q-step
        :name="1"
        title="Informations générales"
        icon="settings"
        :done="params.step > 1"
      >
        <div style="height: 280px;" class="q-gutter-y-sm flex q-pt-sm overflow-auto">
          <q-avatar color="positive" size="110px">
            <ImageInput v-model="avatar" />
          </q-avatar>
          <q-input
            rounded
            outlined
            label-color="white"
            dense
            label="Nom"
            class="register-input-field"
            :model-value="input.lastName"
            v-model="input.lastName"
            :lazy-rules="true"
            :rules="[v => v && v.length||'Champs requis']"
            hide-bottom-space
            hide-hint
            name="lastName"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
          <q-input
            rounded
            outlined
            label-color="white"
            dense
            label="Prénom"
            class="register-input-field"
            :model-value="input.firstName"
            v-model="input.firstName"
            name="firstName"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
          <q-select
            :model-value="input.gender"
            v-model="input.gender"
            :options="genders"
            rounded
            label-color="white"
            dense
            outlined
            label="Genre"
            options-selected-class="text-deep-orange"
            class="register-input-field"
            emit-value
            map-options
            popup-content-class="bg-primary"
          >
            <template v-slot:prepend>
              <q-icon class="q-ml-sm" name="transgenders" />
            </template>
          </q-select>
        </div>
        <q-stepper-navigation class="q-pb-none q-pt-sm">
          <q-btn
            no-caps
            @click="params.step = 2"
            color="primary"
            label="Continuer"
            text-color="color"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="Contacts"
        icon="contacts"
        :done="params.step > 2"
      >
        <div style="max-height: 160px;" class="q-gutter-y-lg flex q-pt-sm overflow-auto">
          <vue-tel-input
            mode="international"
            :value="input.phone"
            @validate="input.phone = $event.formatted"
            class="register-input-field"
            :inputOptions="{placeholder:'Votre numéro de téléphone'}"
            :style="`border:1px solid ${ input.phone ? 'gainsboro' : 'red'};`"
          />
          <q-input
            :model-value="input.phone"
            v-model="input.phone"
            :rules="[v => v && v.length || '']"
            name="phone"
            v-show="false"
          />
          <q-input
            :model-value="input.email"
            v-model="input.email"
            rounded
            outlined
            label-color="white"
            dense
            label="Adresse mail"
            class="register-input-field"
            :lazy-rules="true"
            :rules="[val => validMail(val)|| 'Email invalide']"
            name="email"
          >
            <template v-slot:prepend>
              <q-icon name="mail"/>
            </template>
          </q-input>
        </div>

        <q-stepper-navigation class="q-gutter-x-md q-pt-none">
          <q-btn
            no-caps
            @click="params.step = 3"
            color="primary"
            label="Continue"
          />
          <q-btn
            no-caps
            flat
            @click="params.step = 1"
            text-color="white"
            label="Retour"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="3"
        title="Sécurisation du compte"
        icon="password"
      >
        <div style="max-height: 150px;" class="q-gutter-y-lg flex q-pt-sm overflow-auto">
          <q-input
            :model-value="input.password"
            v-model="input.password"
            rounded
            outlined
            label-color="white"
            dense
            label="Mot de passe"
            type="password"
            class="register-input-field"
            :lazy-rules="true"
            :rules="[
              v => v && v.length <= 15 || 'Nombre de caractères <= 15',
              v => v === params.confirm || 'Mot de passe ne correspondent pas.'
            ]"
            hide-bottom-space
            name="password"
          >
            <template v-slot:prepend>
              <q-icon name="password"/>
            </template>
          </q-input>
          <q-input
            :model-value="params.confirm"
            v-model="params.confirm"
            rounded
            outlined
            label-color="white"
            dense
            label="Résaisir le mot de passe"
            type="password"
            class="register-input-field"
            @update:model-value="resetValidation"
          >
            <template v-slot:prepend>
              <q-icon name="password"/>
            </template>
          </q-input>
        </div>

        <q-stepper-navigation class="q-gutter-md">
          <q-btn
            type="submit"
            no-caps
            color="primary"
            label="S'inscrire"
          />
          <q-btn
            no-caps
            flat
            @click="params.step = 2"
            color="white"
            label="Retour"
          />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </q-form>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
  import {useCreateUser} from 'src/graphql/user/create.user';
  import ImageInput from 'components/shared/ImageInput.vue';
  import {validMail} from 'src/graphql/utils/utils';

  export default defineComponent({
    name: 'SignUp',
    components: {
      ImageInput
    },
    setup() {
      return {
        ...useCreateUser(),
        validMail
      }
    }
  });
</script>

<style lang="scss">
.vti__dropdown-list {
  background: $primary;
  max-width: 90vw;
}
.vti__dropdown-item.highlighted{background-color:$amber}
.vti__input{
  background: transparent;
  color: white;
  height: 40px;
  &::-webkit-input-placeholder {color: white;}
  &::-moz-placeholder          {color: white;}
  &::-ms-input-placeholder      {color: white;}
}
.vue-tel-input{
  border-radius: 20px;
  &:focus-within{
    -webkit-box-shadow: unset;
    box-shadow: unset;
    border-color: $primary
  }
}
</style>
