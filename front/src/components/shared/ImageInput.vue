<template>
  <q-img :src="urlList[0]||src||'travelers.svg'" spinner-color="amber">
    <div class="absolute-center bg-transparent">
      <q-btn-group outline v-if="images.length" rounded push>
        <q-btn
          outline
          color="positive"
          size="sm"
          icon="check"
          @click="$emit('upload', images); images.length = 0;"
          v-if="src"
        />
        <q-btn
          outline
          v-if="urlList.length"
          color="amber"
          size="sm"
          icon="close"
          @click="urlList.length = 0; images.length = 0"
        />
      </q-btn-group>
      <q-btn
        outline
        v-else
        color="amber"
        round
        size="sm"
        icon="photo_camera"
        @click="$refs.file.$el.click()"
      >
        <q-file
          :model-value="images"
          v-model="images"
          accept=".jpg, image/*"
          multiple
          :max-files="1"
          max-file-size="2048000"
          @update:model-value="preview($event)"
          v-show="false"
          ref="file"
        />
      </q-btn>
    </div>
  </q-img>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { useImageLoader } from 'src/graphql/utils/preview';

export default defineComponent({
    name: 'ImageInput',
    props: {
      modelValue: Object as PropType<FileList>,
      src: String
    },
    emits: ['update:modelValue', 'upload'],
    setup(_, { emit }) {
      const { urlList, previewImages} = useImageLoader();
      const preview = (e: FileList) => {
        if (e && e.length) {
          previewImages(e);
          emit('update:modelValue', e);
        }
      }
      return {
        images: ref<any[]>([]),
        preview,
        urlList
      }
    }
  })
</script>

<style scoped>

</style>
