<template>
  <q-card flat bordered>
    <q-card-section :horizontal="$q.screen.gt.sm">
      <q-avatar square size="150px">
        <q-img src="sign-in.svg">
          <div class="absolute-top-left bg-transparent flex flex-center">
            <q-badge
              style="border-radius: 50%;"
              color="positive"
            />
          </div>
        </q-img>
      </q-avatar>
      <q-separator :vertical="$q.screen.gt.sm" />
      <q-list>
        <q-item>
          <q-item-section>
            <q-item-label>Charlin RANDRIMANAJA</q-item-label>
            <q-item-label caption>
              {{$tm('roles')[0]}}, {{$tm('genders')[0]}}
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-uppercase">Sambava</q-item-label>
            <q-item-label caption>HME, Sambava centre</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section class="break-line">
            rcarandrcharlin@gmail.com
          </q-item-section>
          <q-item-section>
            +261 32 02 097 81
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>

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

    <q-card-section>
      <p class="text-h6 q-mb-sm">Analitiques</p>
      <div class="flex flex-center q-gutter-sm">
        <Alert
          v-for="(subject, index) in $tm('collection-subjects')"
          :key="index"
          :title="subject.title"
          :icon="subject.icon"
          :count="Number(subject.id)"
        />
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section class="q-pa-xs text-right">
      Aucune decouverte
    </q-card-section>

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
import Alert from 'components/shared/Alert.vue';

export default defineComponent({
  name: 'UserDetails',
  components: { Alert },
  setup() {
    return {

    }
  }
})
</script>

<style scoped>

</style>
