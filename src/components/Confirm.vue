<template>
    <div class="text-center pa-4">
      <v-dialog v-model="props.show" width="auto">
        <v-card max-width="400">
          <v-card-title class="bg-surface-light">
            {{ props.titulo }}
          </v-card-title>
  
          <v-card-text>
            {{ props.mensaje }}
          </v-card-text>
  
          <v-divider></v-divider>
  
          <v-card-actions class="bg-surface-light">
            <v-btn
              class="ms-auto"
              text="Cancelar"
              @click="$emit('confirmarCerrar')"
            ></v-btn>
  
            <v-btn
              class="ms-auto"
              text="Aceptar"
              @click="$emit('confirmarAceptar')"
            ></v-btn>
          </v-card-actions>
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
      default: '',
    },
    mensaje: {
      type: String,
      default: '',
    },
  });
  </script>
  