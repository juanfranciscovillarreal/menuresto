<template>
    <v-toolbar color="primary">
        <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
        <v-toolbar-title>Title</v-toolbar-title>

        <v-spacer></v-spacer>

        <!-- Cerrar -->
        <v-btn v-if="buscar == true && route.path == '/Menu'" icon>
            <v-icon @click="buscar = false">mdi-close</v-icon>
        </v-btn>

        <v-menu transition="slide-x-reverse-transition">
            <template v-slot:activator="{ props }">
                <v-text-field v-if="buscar == true && route.path == '/Menu'" hide-details single-line></v-text-field>

                <v-btn v-bind="props" v-if="route.path == '/Menu'" icon="mdi-magnify" variant="text"
                    @click="buscar = true"></v-btn>                    
            </template>

            <!-- <v-btn v-if="route.path == '/Menu'" icon="mdi-magnify" variant="text" @click="buscar = true"></v-btn> -->
        </v-menu>
    </v-toolbar>
</template>

<!-- <template>
    <v-card rounded="0" flat>
        <v-toolbar>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-toolbar-title>Title</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon @click="extendedToolBar = !extendedToolBar">extendedToolBar ? mdi-magnify-plus : magnify-minus</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
            <template v-if="extendedToolBar" v-slot:extension extension-height="400">
                <v-btn icon @click="extendedToolBar = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>

                <v-text-field append-inner-icon="mdi-magnify" density="compact" label="Buscar" variant="solo"
                    hide-details single-line></v-text-field>

            </template>
        </v-toolbar>
    </v-card>
</template> -->

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const props = defineProps(['foo'])
const selection = ref([])
const items = ref(['Foo', 'Bar', 'Fizz', 'Buzz'])
const extendedToolBar = ref(false)
const buscar = ref(false)

</script>