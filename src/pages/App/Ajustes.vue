<template>
    <v-list v-model:selected="settingsSelection" lines="three" select-strategy="leaf">
        <v-list-subheader>General</v-list-subheader>

        <!-- Tema -->
        <v-list-item>
            <v-list-item-title>
                Tema del Menú
            </v-list-item-title>

            <v-list-item-subtitle>
                Seleccione entre un modo claro o uno oscuro
            </v-list-item-subtitle>

            <template v-slot:prepend>
                <v-icon :icon="ajustesStore.modo === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"></v-icon>
            </template>

            <template v-slot:append>
                <v-switch v-model="ajustesStore.modo" color="primary" false-value="light" true-value="dark"
                    hide-details>
                </v-switch>
            </template>
        </v-list-item>

        <!-- Idioma -->
        <v-list-item>
            <v-list-item-title>
                Idioma del Menú
            </v-list-item-title>

            <v-list-item-subtitle>
                {{ idioma }}
            </v-list-item-subtitle>

            <template v-slot:prepend>
                <v-icon icon="mdi-earth"></v-icon>
            </template>

            <template v-slot:append>
                <v-btn @click="verIdiomas(item)" icon="mdi-dots-horizontal" size="x-small" variant="text"></v-btn>
            </template>
        </v-list-item>

    </v-list>

    <!-- Diálogo Idiomas -->
    <v-bottom-sheet v-model="dialog">
        <v-card>
            <v-card-text class="px-4">
                <v-radio-group v-model="idioma" messages="Seleccione un idioma">
                    <v-radio label="Español" value="Español"></v-radio>
                    <v-radio label="Inglés" value="Inglés"></v-radio>
                    <v-radio label="Frances" value="Frances"></v-radio>
                    <v-radio label="Portugues" value="Portugues"></v-radio>
                </v-radio-group>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="surface-variant" text="Aceptar" variant="flat" @click="seleccionarIdioma()"></v-btn>
            </v-card-actions>
        </v-card>
    </v-bottom-sheet>

</template>

<script setup>
import { useAjustesStore } from "@/stores/ajustes";
import { ref } from 'vue'
import { useLocale } from 'vuetify'

const { current } = useLocale()

const ajustesStore = useAjustesStore()
const settingsItems = ref([
    { value: 'modo', title: 'Modo', subtitle: 'Seleccione entre un modo claro / oscuro' },
    { value: 'idioma', title: 'Idioma', subtitle: 'Español' },
    { value: 'ayuda', title: 'Ayuda', subtitle: 'Ayuda sobre el menú' },
])

const settingsSelection = ref([])

const idioma = ref('Español')
const dialog = ref(false)

function onClick() {
    ajustesStore.modo = ajustesStore.modo === 'light' ? 'dark' : 'light'
}

function verIdiomas() {
    dialog.value = true;
}

function seleccionarIdioma() {
    //idioma.value = idioma.value.charAt(0).toUpperCase() + idioma.value.slice(1)
    console.log(idioma.value);
    dialog.value = false;
}

function changeLocale(locale) {
    current.value = locale
}

</script>