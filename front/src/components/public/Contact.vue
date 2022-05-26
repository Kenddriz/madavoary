<template>
  <!--<q-img
    src="images/schrecksee.jpg"
    height="550px"
    :ratio="1"
  >

  </q-img>-->
  <q-card class="q-pa-md bg-secondary" square flat>
    <q-item>
      <q-item-section avatar>
        <q-avatar color="white">
          <img src="email_contact.svg">
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label align="center">
          Drop us aline
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator inset />

    <q-card-section :horizontal="$q.screen.gt.md">
      <q-card-section>
        <q-list>
          <q-item
            v-for="(cont, index) in contacts_list"
            :key="index"
          >
            <q-item-section avatar>
              <q-icon :name="cont.icon" size="lg" />
            </q-item-section>

            <q-item-section>{{ cont.label }}</q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-separator :vertical="$q.screen.gt.md" inset />

      <q-card-section class="col">
        <q-form class="q-gutter-md column justify-center">
          <q-input dense label="Titre" label-color="white" />
          <q-input dense label="Pays" label-color="white" />
          <q-input dense label="Email" label-color="white" />
          <q-input dense label="Message" label-color="white" type="textarea" />
          <div class="q-gutter-lg row justify-end q-mr-lg">
            <q-btn label="submit" color="white" type="submit" flat />
            <q-btn label="cancel" type="reset" color="white" flat />
          </div>
        </q-form>
      </q-card-section>

      <q-card-section>
        <img src="email_contact.svg" height="300">
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { contacts_list } from './contact-items';

export default defineComponent({
  name: 'Contact',
  setup() {
    return {
      contacts_list
    }
  }
});
</script>

<style scoped>

</style>
