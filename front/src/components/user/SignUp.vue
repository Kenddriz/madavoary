<template>
  <form>
    <div class="text-h6">Remplir le formulaire</div>
    <q-list bordered class="full-width" separator>
      <q-expansion-item
        group="info"
        icon="info"
        label="Informations basiques"
        default-opened
        header-class="bg-primary"
      >
        <div class="q-pa-md q-gutter-y-sm flex flex-center">
          <q-input
            rounded
            outlined
            label-color="white"
            dense
            label="Nom"
            class="register-input-field"
            :model-value="input.lastName"
            v-model="input.lastName"
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
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>

          <q-select
            v-model="input.gender"
            :options="genders"
            rounded
            label-color="white"
            dense
            outlined
            label="Genre"
            options-selected-class="text-deep-orange"
            class="register-input-field"
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  {{$t(scope.opt.label)}}
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
      </q-expansion-item>

      <q-expansion-item
        group="info"
        icon="contacts"
        label="Contacts"
        header-class="bg-primary"
      >
        <div class="q-pa-md q-gutter-y-sm flex flex-center">
          <vue-tel-input
            mode="international"
            :value="phone"
            @validate="phone = $event.formatted"
            class="register-input-field"
            :inputOptions="{placeholder:'Votre numéro de téléphone'}"
          />
          <q-input
            rounded
            outlined
            label-color="white"
            dense
            label="Adresse mail"
            class="register-input-field"
          >
            <template v-slot:prepend>
              <q-icon name="mail"/>
            </template>
          </q-input>
        </div>
      </q-expansion-item>

      <q-expansion-item
        group="info"
        icon="lock"
        label="Sécurité"
        header-class="bg-primary"
      >
        <div class="q-pa-md q-gutter-y-sm flex flex-center">
          <q-input
            rounded
            outlined
            label-color="white"
            dense
            label="Mot de passe"
            type="password"
            class="register-input-field"
          >
            <template v-slot:prepend>
              <q-icon name="password"/>
            </template>
          </q-input>
          <q-input
            rounded
            outlined
            label-color="white"
            dense
            label="Résaisir le mot de passe"
            type="password"
            class="register-input-field"
          >
            <template v-slot:prepend>
              <q-icon name="password"/>
            </template>
          </q-input>
        </div>
      </q-expansion-item>
    </q-list>
    <q-btn
      rounded
      color="grey-5"
      no-caps
      outline
      class="register-input-field q-mt-lg"
      label="S'inscrire"
      icon="save"
    />
  </form>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import {useCreateUser} from 'src/graphql/user/create.user';

  export default defineComponent({
    name: 'SignUp',
    components: {
      //ConfirmMail
    },
    setup() {
      const step = ref(1);
      return {
        step,
        ...useCreateUser(),
        genders: [{ value: 0, label: 'male'}, { value: 1, label: 'female'}]
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
  border-radius: 20px;border:1px solid gainsboro;
  &:focus-within{
    -webkit-box-shadow: unset;
    box-shadow: unset;
    border-color: $primary
  }
}
</style>
