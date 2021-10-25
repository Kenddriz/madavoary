<template>
  <q-page class="bg-dark q-pa-sm">
    <q-card bordered flat>
      <q-card-section class="text-h5 text-center">
        Détails personnels
      </q-card-section>
      <q-separator />
      <q-card-section horizontal>
        <q-avatar square size="200px">
          <q-img src="travelers.svg" />
        </q-avatar>
        <q-separator :vertical="$q.screen.gt.sm" />
        <div class="flex justify-center items-center col q-gutter-md">
          <q-item v-for="(item, index) in basicInfos" :key="index">
            <q-item-section>
              <q-item-label>{{$t(item)}}</q-item-label>
              <q-item-label caption>{{item}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-btn
            class="col-12"
            rounded
            no-caps
            outline
            text-color="white"
            style="width: calc(100% - 50px)"
            label="Mettre à jour"
            icon-right="edit"
          />
        </div>
      </q-card-section>
    </q-card>
    <q-card bordered flat class="q-my-sm">
      <q-card-section horizontal class="q-py-md items-center">
        <q-list class="col">
          <q-item>
            <q-item-section>
              <q-item-label>{{$t('createdAt')}}</q-item-label>
              <q-item-label caption>02/10/2021</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>{{$t('updatedAt')}}</q-item-label>
              <q-item-label caption>02/10/2021</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <q-separator :vertical="$q.screen.gt.sm" />
        <p class="text-h5 text-center col">
          Sécurité <q-icon size="md" name="edit" />
        </p>
      </q-card-section>
    </q-card>

    <q-card v-ripple flat bordered class="q-py-md text-center cursor-pointer">
      Mes decouvertes
    </q-card>
  </q-page>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { date } from 'quasar';

  const basicInfos = ['id', 'role', 'lastName', 'city', 'address', 'gender', 'email', 'phone'];
  export default defineComponent({
    name: 'MyAccount',
    components: {  },
    setup() {
      const { formatDate } = date;
      return {
        formatDate,
        preview: ref<string[]>([]),
        confirmPwd: ref<string>(''),
        basicInfos
      }
    }
  })
</script>

<style lang="scss" scoped>
</style>
