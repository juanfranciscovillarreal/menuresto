<template>
    <div class="text-center pa-4">
        <v-dialog v-model="props.show" width="auto">
            <v-card max-width="400" :text="props.mensaje" :title="props.titulo">
                <template v-slot:actions>
                    <v-btn class="ms-auto" text="Aceptar" @click="$emit('dialogCerrar')"></v-btn>
                </template>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const props = defineProps({
    show: Boolean,
    titulo: {
        type: String,
        default: ''
    },
    mensaje: {
        type: String,
        default: ''
    },
})
</script>