<template>
    <v-menu min-width="200px">
        <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props" class="mr-2">
                <v-icon icon="mdi-account"></v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-text>
                <div class="mx-auto text-center">
                    <v-avatar color="black">
                        <v-icon icon="mdi-account"></v-icon>
                    </v-avatar>
                    <h3>{{ props.nombre }}</h3>
                    <p class="text-caption mt-1">
                        {{ props.email }}
                    </p>
                    <v-divider></v-divider>
                </div>
            </v-card-text>


            <v-list :lines="false" density="compact" nav>
                <v-list-item to="/Empresa" link>
                    <template v-slot:prepend>
                        <v-icon icon="mdi-account"></v-icon>
                    </template>
                    <v-list-item-title>Mi cuenta</v-list-item-title>
                </v-list-item>

                <v-list-item link @click="signOut()">
                    <template v-slot:prepend>
                        <v-icon icon="mdi-logout"></v-icon>
                    </template>
                    <v-list-item-title>Cerrar sesión</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-card>
    </v-menu>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '../lib/supabase'
import { useRouter, useRoute } from 'vue-router'
import { useErrorHandler } from '@/composables/errorHandler'
import { useEmpresaStore } from "../stores/empresa";

const empresaStore = useEmpresaStore()
const router = useRouter()
const route = useRoute()
const nombre = ref('')
const email = ref('')
const user = ref({
    initials: 'JD',
})

onMounted(() => {

});

const props = defineProps({
    show: Boolean,
    nombre: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
})

async function signOut() {
    try {
        const { error } = await supabase.auth.signOut();
        router.push('/');

        if (error) throw error
    } catch (error) {
        console.log(`Error en signOut: ${useErrorHandler(error)}`);
    }
}
</script>