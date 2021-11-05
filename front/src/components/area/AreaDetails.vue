<template>
  <q-card flat bordered>
    <q-img height="184px" :src="uri + area.banner">
      <div class="absolute-center text-h6 flex flex-center">
        {{area.name}}
      </div>
    </q-img>

    <q-separator />

    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label>{{$t('surface')}}</q-item-label>
          <q-item-label caption>
            {{area.surface}}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>{{$t('region')}}</q-item-label>
          <q-item-label caption>
            {{area.region}}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>{{$t('area.type')}}</q-item-label>
          <q-item-label caption>
            {{$tm('area.longTypes')[area.type]}}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-separator />

    <q-item class="row justify-between">
      <q-item-section>
        <q-item-label>{{$t('createdAt')}}</q-item-label>
        <q-item-label caption>
          {{formatDate(area.createdAt, $t('dateTime'))}}
        </q-item-label>
      </q-item-section>
      <q-item-section class="text-right">
        <q-item-label>{{$t('updatedAt')}}</q-item-label>
        <q-item-label caption>
          {{formatDate(area.updatedAt, $t('dateTime'))}}
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-list dense>
      <q-item-label class="q-py-sm" header>{{$t('author')}}</q-item-label>
      <q-item>
        <q-item-section avatar>
          <q-avatar size="lg">
            <q-icon name="person" color="white" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>
            {{area.user.person.lastName}}
            {{area.user.person.firstName}}
          </q-item-label>
          <q-item-label caption>{{$tm('roles')[area.user.role]}}</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-btn
            @click="authorDetails"
            icon="read_more"
            round
            flat
            dense
            color="white"
          />
        </q-item-section>
      </q-item>
    </q-list>

    <q-separator />

    <q-card-actions align="between">
      <q-btn
        outline
        color="brown"
        text-color="white"
        icon="edit"
        @click="openForm"
      />
      <q-btn outline color="brown" text-color="white" icon="delete_forever"/>
      <q-btn
        outline
        color="brown"
        text-color="white"
        icon="more_vert"
      />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import AreaForm from 'components/area/AreaForm.vue';
import {useQuasar} from 'quasar';
import {formatDate} from 'src/graphql/utils/utils';
import EditUserParams from 'components/user/update/EditUserParams.vue';

export default defineComponent({
  name: 'AreaDetails',
  components: {  },
  props: ['area'],
  setup(props) {
    const { dialog } = useQuasar();
    return {
      uri: process.env.uri + 'areas/',
      openForm: () => {
        dialog({
          component: AreaForm,
          componentProps: { area: props.area }
        })
      },
      authorDetails: () => dialog({
        component: EditUserParams,
        componentProps: { user: props.area.user }
      }),
      formatDate
    }
  }
})
</script>

<style scoped>

</style>
