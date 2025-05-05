<template>
    <v-card elevation="0" rounded="0">
        <v-toolbar color="primary" extension-height="0">
            <template v-slot:prepend>
                <v-btn icon="mdi-arrow-left" @click="router.push('Administracion')"></v-btn>
            </template>

            <v-toolbar-title>Galería</v-toolbar-title>

            <v-spacer></v-spacer>

            <template v-slot:extension>
                <v-fab class="mr-4" color="cyan-accent-2" icon="mdi-plus" location="bottom right" size="40" absolute
                    offset>
                    <v-file-input accept="image/*" prepend-icon="mdi-plus" hide-input @change="onFilePicked">
                    </v-file-input>
                </v-fab>
            </template>
        </v-toolbar>

        <!-- Fotos -->
        <v-container>
            <v-row>
                <v-col v-for="foto in fotos" :key="foto" class="d-flex child-flex" cols="6">

                    <v-img :src="foto" aspect-ratio="1" class="bg-grey-lighten-2" cover>

                        <div class="position-absolute bottom-0 right-0 pa-2">
                            <v-btn icon="mdi-magnify" size="small" color="white"
                                @click="verFoto(foto)"></v-btn>

                            <v-btn icon="mdi-delete" size="small" color="red"
                                @click="console.log('Borrar')"></v-btn>
                        </div>

                        <template v-slot:placeholder>
                            <v-container class="fill-height" fluid>
                                <v-row justify="center">
                                    <v-col cols="12">
                                        <div class="text-center">
                                            <v-progress-circular color="grey-lighten-5"
                                                indeterminate></v-progress-circular>
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

        <!-- <v-container fluid>
            <v-row dense>
                <v-col v-for="foto in fotos" :key="foto" :cols="6">
                    <v-card>
                        <v-img :src="foto" aspect-ratio="1" class="bg-grey-lighten-2" cover @click="verFoto(foto)">
                            <v-btn color="medium-emphasis" icon="mdi-delete" size="small"></v-btn>
                            <template v-slot:placeholder>
                                <v-container class="fill-height" fluid>
                                    <v-row justify="center">
                                        <v-col cols="12">
                                            <div class="text-center">
                                                <v-progress-circular color="grey-lighten-5"
                                                    indeterminate></v-progress-circular>
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
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="medium-emphasis" icon="mdi-delete" size="small"></v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container> -->

        <!-- Dialog -->
        <div class="text-center pa-4">
            <v-dialog v-model="dialog" max-width="500">
                <v-img cover aspect-ratio="1" :src="fotoSeleccionada"></v-img>
            </v-dialog>
        </div>
    </v-card>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const dialog = ref(false)
const fotoSeleccionada = ref('')
const foto = ref('')
const image = ref('');

const fotos = ref([
    'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
    'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
])

function verFoto(foto) {
    fotoSeleccionada.value = foto;
    dialog.value = true;
}

function onFilePicked(event) {
    const files = event.target.files;
    let filename = files[0].name;
    const fileReader = new FileReader();
    fileReader.addEventListener('load', () => {
        // foto.value = fileReader.result;
        fotos.value.push(fileReader.result);
    });
    fileReader.readAsDataURL(files[0]);
    // image.value = files[0];
}

</script>