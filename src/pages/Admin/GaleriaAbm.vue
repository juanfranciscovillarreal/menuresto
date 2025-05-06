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
                <v-col v-for="galeria in galeriaStore.fotos" :key="galeria.id" class="d-flex child-flex" cols="6">

                    <v-img :src="galeria.foto" aspect-ratio="1" class="bg-grey-lighten-2" cover>

                        <div class="position-absolute bottom-0 right-0 pa-2">
                            <v-btn icon="mdi-magnify" size="small" color="white" @click="verFoto(galeria.foto)"></v-btn>

                            <v-btn icon="mdi-delete" size="small" color="red" @click="borrarFoto(galeria)"></v-btn>
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

        <!-- Dialog Ver Foto -->
        <div class="text-center pa-4">
            <v-dialog v-model="dialogVerFoto" max-width="500">
                <v-img cover aspect-ratio="1" :src="fotoSeleccionada"></v-img>
            </v-dialog>
        </div>
    </v-card>

    <Dialog :show="dialogShow" :titulo="dialogTitulo" :mensaje="dialogMensaje" @dialogCerrar="dialogShow = false">
    </Dialog>

</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// Components
import Dialog from '@/components/Dialog.vue';
// Composables
import { useErrorHandler } from '@/composables/errorHandler';

import { useGaleria } from '@/composables/galeria';
// Stores
import { useEmpresaStore } from "@/stores/empresa";
import { useGaleriaStore } from "@/stores/galeria";

const router = useRouter()
const route = useRoute()

const dialogVerFoto = ref(false)
const dialogShow = ref(false);
const dialogMensaje = ref('');
const dialogTitulo = ref('');
const fotoSeleccionada = ref('')
// Composables
const { getFotos, insertFoto, removeFoto } = useGaleria();
// Stores
const empresaStore = useEmpresaStore()
const galeriaStore = useGaleriaStore()

function verFoto(foto) {
    fotoSeleccionada.value = foto;
    dialogVerFoto.value = true;
}

async function borrarFoto(foto) {
    try {
        await removeFoto(foto.id);
        let itemIndex = galeriaStore.fotos.indexOf(foto);
        galeriaStore.fotos.splice(itemIndex, 1);
    } catch (error) {
        dialogTitulo.value = 'Error';
        dialogShow.value = true;
        dialogMensaje.value = useErrorHandler(error);
    }
}

function onFilePicked(event) {
    const files = event.target.files;
    let filename = files[0].name;
    const fileReader = new FileReader();

    fileReader.addEventListener('load', async () => {
        let foto = fileReader.result;
        let newFoto = {
            foto: foto,
        };

        try {
            await insertFoto(newFoto);
            await getGaleriaData();
        } catch (error) {
            dialogTitulo.value = 'Error';
            dialogShow.value = true;
            dialogMensaje.value = useErrorHandler(error);
        }
    });
    fileReader.readAsDataURL(files[0]);
}

async function getGaleriaData() {
    galeriaStore.fotos = await getFotos(empresaStore.empresa.id);
}

</script>