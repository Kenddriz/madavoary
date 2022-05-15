<template>
  <q-img :src="urlList[0]||src||'travelers.svg'" spinner-color="amber">
    <div class="absolute-center bg-transparent">
      <q-btn-group outline v-if="images.length" rounded push>
        <q-btn
          outline
          color="positive"
          size="sm"
          icon="check"
          @click="onUpload()"
        />
        <q-btn
          outline
          v-if="urlList.length"
          color="amber"
          size="sm"
          icon="close"
          @click="close()"
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
         :max-file-size="maxFileSize"
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
      const images = ref<any[]>([]);
      return {
        images,
        preview,
        urlList,
        close: function () {
          urlList.value.length = 0; images.value.length = 0;
        },
        onUpload: function () {
          emit('upload', images.value);
          images.value.length = 0;
        },
        maxFileSize: Number(process.env.maxFileSize)
      }
    }
  })
</script>

<style scoped>

</style>
