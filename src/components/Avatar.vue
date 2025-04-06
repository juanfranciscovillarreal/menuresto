<template>
    <div class="d-flex align-center justify-space-around mt-2">
        <v-avatar size="100">
            <v-img :width="100" aspect-ratio="1/1" cover :src="logo"></v-img>
        </v-avatar>
    </div>

    <div class="d-flex align-center justify-space-around position-relative" style="top: -1em; left: 3em;">
        <v-file-input accept="image/*" prepend-icon="mdi-plus-box" hide-input @change="onFilePicked">
        </v-file-input>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useErrorHandler } from '@/composables/errorHandler'

const emit = defineEmits(['onUpdateAvatar'])
const image = ref('');
const preview = ref('');
const props = defineProps({
    avatar: {
        type: String,
        default:''
    },
})

const logo = ref(props.avatar);

function onFilePicked(event) {
  const files = event.target.files;
  let filename = files[0].name;
  const fileReader = new FileReader();
  fileReader.addEventListener('load', () => {
    preview.value = fileReader.result;
    logo.value = fileReader.result;
    emit('onUpdateAvatar', logo.value)
  });
  fileReader.readAsDataURL(files[0]);
  image.value = files[0];
}

</script>