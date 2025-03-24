<template>
    <v-app>
        <v-app-bar color="grey">
            <!-- Título -->
            <v-app-bar-title>InteliCarta</v-app-bar-title>
            <!-- Espacio -->
            <v-spacer></v-spacer>

            <!-- Ususario -->
            <v-btn icon>
                <v-icon @click="router.push('/Login')">mdi-account-circle</v-icon>
            </v-btn>

        </v-app-bar>

        <v-main>
            <router-view />
            <!-- <v-container>
                <v-row>
                    <v-col v-for="empresa in empresas" :key="n" cols="4">
                        <v-card height="100" class="mx-auto" color="surface-variant"
                            image="https://cdn.vuetifyjs.com/docs/images/cards/dark-beach.jpg" max-width="150"
                            :subtitle="empresa.nombre" :title="empresa.nombre" @click="goHome(empresa.nombre)">
                        </v-card>
                    </v-col>
                </v-row>
            </v-container> -->
        </v-main>
    </v-app>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'
import { supabase } from '../lib/supabase'
import { useErrorHandler } from '@/composables/errorHandler'

const router = useRouter()
const route = useRoute()
const empresas = ref([])

onMounted(() => {
    getEmpresas();
})

async function getEmpresas() {
    try {
        const { data, error } = await supabase
            .from('Empresa')
            .select('id, nombre');

        if (error) {
            throw error;
        }

        if (data.length > 0) {
            empresas.value = data;
        }
    } catch (error) {
        console.log(`Error en getEmpresas: ${useErrorHandler(error)}`);
    }
}

function goHome(empresa) {
    router.push(`/${empresa}`);
}
</script>