<template>
    <v-list v-model:selected="settingsSelection" lines="three" select-strategy="leaf">
        <v-list-subheader>General</v-list-subheader>

        <!-- Tema -->
        <v-list-item>
            <v-list-item-title>
                Tema
            </v-list-item-title>

            <v-list-item-subtitle>
                Modo claro / oscuro
            </v-list-item-subtitle>

            <template v-slot:prepend>
                <v-icon :icon="modo === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"></v-icon>
            </template>

            <template v-slot:append>
                <v-switch v-model="modo" color="primary" false-value="light" true-value="dark"
                    hide-details>
                </v-switch>
            </template>
        </v-list-item>

        <!-- Idioma -->
        <v-list-item>
            <v-list-item-title>
                Idioma
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
import { ref, watch, onMounted } from 'vue'
import { useLocale, useTheme } from 'vuetify'

const { current } = useLocale()
const theme = useTheme()
const ajustesStore = useAjustesStore()
const settingsSelection = ref([])
const idioma = ref('Español')
const dialog = ref(false)
const modo = ref('light')

onMounted(() => {
 modo.value = ajustesStore.modo;
})

watch(modo, (newValue, oldValue) => {
    ajustesStore.modo = newValue;
    theme.global.name.value = newValue;
})

function verIdiomas() {
    dialog.value = true;
}

function seleccionarIdioma() {
    //idioma.value = idioma.value.charAt(0).toUpperCase() + idioma.value.slice(1)
    console.log(idioma.value);
    dialog.value = false;
}

</script>