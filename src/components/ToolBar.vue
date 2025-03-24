<template>
    <v-toolbar color="primary">
        <template v-slot:prepend>
            <v-btn icon="mdi-arrow-left" @click="router.push(props.ruta)"></v-btn>
        </template>

        <v-toolbar-title>{{props.titulo}}</v-toolbar-title>

        <v-spacer></v-spacer>
    </v-toolbar>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const props = defineProps({
  titulo: String,
  ruta: String
})
</script>