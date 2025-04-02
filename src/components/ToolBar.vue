<template>
    <v-toolbar color="primary" extension-height="0">
        <template v-slot:prepend>
            <v-btn icon="mdi-arrow-left" @click="router.push(props.ruta)"></v-btn>
        </template>

        <v-toolbar-title>{{ props.titulo }}</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-btn v-if="props.icono != null" :icon="props.icono" @click="$emit('evento_click')"></v-btn>

        <template v-slot:extension v-if="nuevo">
            <v-fab 
                class="mr-4" 
                color="cyan-accent-2" 
                icon="mdi-plus" 
                location="bottom right" 
                size="40" 
                absolute 
                offset
                @click="$emit('verDialogo')">
            </v-fab>
        </template>
    </v-toolbar>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const props = defineProps({
    titulo: String,
    ruta: String,
    icono: String,
    nuevo: Boolean,
})
</script>