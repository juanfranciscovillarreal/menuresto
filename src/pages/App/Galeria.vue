<template>
    <!-- Fotos -->
    <v-container>
        <v-row>
            <v-col v-for="foto in fotos" :key="foto" class="d-flex child-flex" cols="6">
                <v-img :src="foto" aspect-ratio="1"
                    class="bg-grey-lighten-2" cover @click="verFoto(foto.src)">

                    <template v-slot:placeholder>
                        <v-container class="fill-height" fluid>
                            <v-row justify="center">
                                <v-col cols="12">
                                    <div class="text-center">
                                        <v-progress-circular color="grey-lighten-5" indeterminate></v-progress-circular>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-container>
                    </template>

                    <template v-slot:error>
                        <v-img cover aspect-ratio="1" src="https://picsum.photos/500/300?image=232">
                        </v-img>
                    </template>
                </v-img>
            </v-col>
        </v-row>
    </v-container>

    <!-- Dialog -->
    <div class="text-center pa-4">
        <v-dialog v-model="dialog" max-width="500">
            <v-img cover aspect-ratio="1" :src="fotoSeleccionada"></v-img>
        </v-dialog>
    </div>

</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
const dialog = ref(false)
const fotoSeleccionada = ref('https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg')
const fotos = ref([
    {
        src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
    },
    {
        src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
    },
    {
        src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
    },
    {
        src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
    },
    {
        src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
    },
    {
        src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
    },
    {
        src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
    },
    {
        src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
    },
    {
        src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
    },
    {
        src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
    },
    {
        src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
    },
    {
        src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
    },
])

function verFoto(foto){
    fotoSeleccionada.value = foto;
    dialog.value = true;
}
</script>