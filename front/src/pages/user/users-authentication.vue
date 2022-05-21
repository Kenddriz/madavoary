<template>
  <div :class="`container bg-dark ${sign_up_mode ? 'sign-up-mode' : ''}`">
      <div class="forms-container">
        <div class="signin-signup">
          <CreateUserForm class="sign-up-form" />
          <SignIn class="sign-in-form" />
        </div>
      </div>

      <div class="panels-container">
        <div class="panel left-panel">
          <div class="content">
            <div class="text-h5">Vous êtes nouveau ?</div>
            <p class="text-left">
             Créer votre compte Madavoary pour avoir un espace de travail.
             Cet espace vous permet d'enregistrer vos collections de natures de
             Madagascar ( l'eau, la forêt, les roches, etc ).
            <!-- Sachez que le compte Madavoary est <strong>réservé à la nationalité Malagasy seulement</strong> ...--->
            </p>
            <button class="btn transparent" id="sign-up-btn" @click="sign_up_mode = true">
              S'inscrire
            </button>
          </div>
          <img src="sign-up.svg" class="image" alt="" />
        </div>
        <div class="panel right-panel">
          <div class="content">
            <div class="text-h5">Un des nôtres ?</div>
            <p class="text-left">
              Avez-vous déjà un <strong>compte Madavoary</strong> ? Eh bien, connectez-vous avec
              votre identification ( N°Tél ou adresse éléctronique ) et votre mot de passe ...
            </p>
            <button class="btn transparent" id="sign-in-btn" @click="sign_up_mode = false">
              Se connecter
            </button>
          </div>
          <img src="sign-in.svg" class="image" alt="" />
        </div>
      </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import CreateUserForm from 'components/user/CreateUserForm.vue';
  import SignIn from 'components/user/SingIn.vue';

  export default defineComponent({
    name: 'users-authentication',
    components: {
      CreateUserForm,
      SignIn
    },
    setup() {
      const sign_up_mode = ref(false);
      return {
        sign_up_mode
      }
    }
  });
</script>
<style lang="scss" scoped>
  @import '../../assets/register';
  * {
    color: white;
  }
</style>
