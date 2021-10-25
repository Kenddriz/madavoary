<template>
  <div>
    <p class="social-text">Réseaux sociaux</p>
    <div class="social-media q-gutter-md">
      <q-icon size="50px" name="facebook" />
      <q-icon size="50px" name="fab fa-twitter" />
      <q-icon size="50px" name="fab fa-google" />
      <q-icon size="50px" name="fab fa-linkedin-in" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SocialNetwork'
  };
</script>

<style lang="scss" scoped>
  .social-media {
    display: flex;
    justify-content: center;
  }
  .social-icon {
    height: 46px;
    width: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0.45rem;
    color: #333;
    border-radius: 50%;
    border: 1px solid #333;
    text-decoration: none;
    font-size: 1.1rem;
    transition: 0.3s;
  }

  .social-icon:hover {
    color: #4481eb;
    border-color: #4481eb;
  }
</style>
