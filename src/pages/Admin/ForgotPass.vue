<template>
    <ToolBar titulo="Recuperar clave" ruta="/Login"></ToolBar>

    <v-card class="mx-auto pa-6 mt-2" elevation="0" rounded="0" variant="text" max-width="448" min-width="360">
        <v-form v-model="form" @submit.prevent="onSubmit">
            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                Correo
            </div>

            <v-text-field v-model="email" density="compact" placeholder="Email address"
                prepend-inner-icon="mdi-email-outline" variant="outlined"
                :rules="[rules.required, rules.email]"></v-text-field>

            <v-btn class="mb-8" color="blue" size="large" variant="tonal" block type="submit">
                Recuperar
            </v-btn>
        </v-form>
    </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '@/lib/supabase'
// Components
import ToolBar from '@/components/ToolBar.vue';
// Composables
import { useErrorHandler } from '@/composables/errorHandler'
import { useReglas } from "@/composables/reglas";

const router = useRouter();
const form = ref(false);
const email = ref('juanfranciscovillarreal@hotmail.com');
const password = ref('supabase.4321');
const visible = ref(false);

// Composables
const { rules } = useReglas();

onMounted(() => { });

function onSubmit() {
    if (!form.value) return;

    restorePass();
}

async function restorePass() {
    try {
        const { error } = await supabase.auth.resetPasswordForEmail(email.value, {
            redirectTo: 'http://localhost:3000/updatePass',
        }
        );

        if (error) {
            throw error;
        }
        router.push('/');
    } catch (error) {
        console.log(`Error en restorePass: ${useErrorHandler(error)}`);
    }
}

async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) console.log(`Error: ${JSON.stringify(error)}`);
}
</script>