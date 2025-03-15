<template>
    <v-app>
        <v-app-bar color="grey">
            <v-app-bar-title>InteliCarta</v-app-bar-title>
        </v-app-bar>

        <v-main>
            <v-container>
                <v-row>
                    <v-col v-for="empresa in empresas" :key="n" cols="4">
                        <v-card height="100" class="mx-auto" color="surface-variant"
                            image="https://cdn.vuetifyjs.com/docs/images/cards/dark-beach.jpg" max-width="150"
                            :subtitle="empresa.nombre" :title="empresa.nombre" @click="goHome(empresa.nombre)">
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'
import { supabase } from '../lib/supabase'

const router = useRouter()
const route = useRoute()
const empresas = ref([])

onMounted(() => {
    getEmpresas();
})

async function getEmpresas() {
    const { data, error } = await supabase
        .from('Empresa')
        .select('id, nombre');

    if (error) {
        router.push('/');
        console.log(`Error en getEmpresas: ${error.message}`);
    }

    if (data) {
        empresas.value = data;
    } else {
        router.push('/');
    }
}

function goHome(empresa) {
    router.push(`/${empresa}`);
}
</script>