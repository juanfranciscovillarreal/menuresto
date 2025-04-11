<template>
    <ToolBar titulo="Iniciar sesión" ruta="/"></ToolBar>

    <v-card class="mx-auto pa-6 mt-2" elevation="0" rounded="0" max-width="448" min-width="360">
        <v-form v-model="form" @submit.prevent="onSubmit">
            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                Correo
            </div>

            <v-text-field v-model="email" density="compact" placeholder="Email address"
                prepend-inner-icon="mdi-email-outline" variant="outlined"
                :rules="[rules.required, rules.email]"></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                Clave
            </div>

            <v-text-field v-model="password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'" density="compact" placeholder="Enter your password"
                prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="visible = !visible"
                :rules="[rules.required, rules.counter]"></v-text-field>

            <v-btn color="blue" size="large" variant="tonal" block type="submit">
                Ingresar
            </v-btn>

            <v-card-text class="text-center">
                <v-btn variant="plain" @click="router.push('/signUp')">
                    Registrarse
                </v-btn>
            </v-card-text>

            <div class="text-center">
                <v-btn size="x-small" variant="plain" @click="router.push('/forgotPass')">
                    ¿Olvidó la clave?
                </v-btn>
            </div>
        </v-form>
    </v-card>

    <Dialog :show="dialogShow" :titulo="dialogTitulo" :mensaje="dialogMensaje" @dialogCerrar="dialogShow = false">
    </Dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { supabase } from '../lib/supabase'
import ToolBar from '@/components/ToolBar.vue';
import { useErrorHandler } from '@/composables/errorHandler'
import Dialog from '@/components/Dialog.vue';
import { useUsuarioStore } from "../stores/usuario";
import { useEmpresaStore } from "../stores/empresa";
import imgUrl from '../assets/InteliCarta.png'
import { useEmpresa } from '../composables/empresa';

const { getEmpresa} = useEmpresa();
const usuarioStore = useUsuarioStore()
const empresaStore = useEmpresaStore()
const router = useRouter();
const form = ref(false);
const email = ref('juanfranciscovillarreal@hotmail.com');
const password = ref('123456');
const visible = ref(false);
const dialogShow = ref(false);
const dialogTitulo = ref('Inicio de sesión');
const dialogMensaje = ref('');

const rules = ref({
    required: (value) => !!value || 'Required.',
    counter: (value) => value.length <= 20 || 'Máximo 20 caracteres',
    email: (value) => {
        const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || 'Correo inválido.';
    },
});

onMounted(() => {
    signOut();
});

async function onSubmit() {
    if (!form.value) return;

    try {
        await signInWithEmail();
        await getEmpresaData();
    } catch (error) {
        dialogShow.value = true;
        dialogMensaje.value = useErrorHandler(error);
    }
}

async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
    });

    if (error) throw error

    empresaStore.empresa.id = data.user.id;
    usuarioStore.email = email.value;
    router.push('/Administracion');
}

async function getEmpresaData() {
    try {
        empresaStore.empresa = await getEmpresa(empresaStore.empresa.id);
        if (empresaStore.empresa.logo == '' || empresaStore.empresa.logo == null) {
            empresaStore.empresa.logo = imgUrl;
        }
    } catch (error) {
        dialogShow.value = true;
        dialogMensaje.value = useErrorHandler(error);
    }
}

async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) console.log(`Error: ${JSON.stringify(error)}`);
}
</script>