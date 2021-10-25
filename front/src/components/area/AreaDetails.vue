<template>
  <q-card flat bordered>
    <q-img height="184px" src="sign-in.svg">
      <div class="absolute-center text-h6 flex flex-center">
        Marojejy
      </div>
    </q-img>

    <q-separator />

    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label>Surface</q-item-label>
          <q-item-label caption>
            45 550
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>Bureau</q-item-label>
          <q-item-label caption>
            FT-485 Andapa
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>Contacts</q-item-label>
          <q-item-label caption>
            45 550
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-separator />

    <q-item class="row justify-between">
      <q-item-section>
        <q-item-label>{{$t('createdAt')}}</q-item-label>
        <q-item-label caption>10/12/2021</q-item-label>
      </q-item-section>
      <q-item-section class="text-right">
        <q-item-label>{{$t('updatedAt')}}</q-item-label>
        <q-item-label caption>10/12/2021</q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-list dense>
      <q-item-label class="q-py-sm" header>Autheur</q-item-label>
      <q-item>
        <q-item-section avatar>
          <q-avatar size="lg">
            <q-icon name="person" color="white" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>RANDRIAMANAJA Charlin</q-item-label>
          <q-item-label caption>{{$tm('roles')[0]}}</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-btn icon="read_more" round flat dense color="white" />
        </q-item-section>
      </q-item>
    </q-list>

    <q-separator />

    <q-card-actions align="between">
      <q-btn outline color="brown" text-color="white" icon="edit" />
      <q-btn outline color="brown" text-color="white" icon="delete_forever"/>
      <q-btn outline color="brown" text-color="white" icon="explore" />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'AreaDetails',
  components: {  },
  setup() {
    return {

    }
  }
})
</script>

<style scoped>

</style>
