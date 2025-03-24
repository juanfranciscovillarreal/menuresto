<template>
    <ToolBar titulo="Registrar cuenta" ruta="/Login"></ToolBar>

    <v-card class="mx-auto pa-6 mt-2" elevation="0" max-width="448" min-width="360">
        <v-form v-model="form" @submit.prevent="onSubmit">
            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                Correo
            </div>

            <v-text-field v-model="email" density="compact" placeholder="Email address"
                prepend-inner-icon="mdi-email-outline" variant="outlined" :rules="[rules.required, rules.email]">
            </v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                Clave
            </div>

            <v-text-field v-model="password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'" density="compact" placeholder="Ingrese su clave"
                prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="visible = !visible"
                :rules="[rules.required, rules.counter]">
            </v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                Reingresar clave
            </div>

            <v-text-field v-model="password1" :append-inner-icon="visibleCheck ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visibleCheck ? 'text' : 'password'" density="compact" placeholder="Ingrese su clave nuevamente"
                prepend-inner-icon="mdi-lock-outline" variant="outlined"
                @click:append-inner="visibleCheck = !visibleCheck"
                :rules="[rules.required, rules.counter, matchingPasswords]">
            </v-text-field>

            <v-btn class="mb-8" color="blue" size="large" variant="tonal" block type="submit">
                Registrarse
            </v-btn>
        </v-form>
    </v-card>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../lib/supabase'
import ToolBar from '@/components/ToolBar.vue';
import { useErrorHandler } from '@/composables/errorHandler'

const router = useRouter();
const form = ref(false);
const email = ref('juanfranciscovillarreal@hotmail.com');
const visible = ref(false);
const visibleCheck = ref(false);
const password = ref('')
const password1 = ref('')

const rules = ref({
    required: (value) => !!value || 'Obligatorio.',
    counter: (value) => value.length >= 6 || 'Mínimo 6 caracteres',
    email: (value) => {
        const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || 'Correo inválido.';
    },
});

function matchingPasswords() {
    if (password.value === password1.value) {
        return true;
    } else {
        return 'Las claves no son iguales.';
    }
}

function onSubmit() {
    if (!form.value) return;

    signUpNewUser();
}

async function signUpNewUser() {
    try {
        const { data, error } = await supabase.auth.signUp({
            email: email.value,
            password: password.value,

            // options: {
            //   emailRedirectTo: 'https://example.com/welcome',
            // },

        });

        if (error) {
            throw error;
        }

        if (data) {
            console.log(`Nuevo Usuario: ${data.user.email}`);
            router.push('/Administracion');
        }
    } catch (error) {
        console.log(`Error en signUpNewUser: ${useErrorHandler(error)}`);
    }
}
</script>