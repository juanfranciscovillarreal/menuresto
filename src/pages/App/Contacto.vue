<template>
  <!-- Avatar -->
  <div class="d-flex align-center justify-space-around">
    <v-card variant="text">
      <v-avatar size="200">
        <v-img :src="getImage()"></v-img>
      </v-avatar>
    </v-card>
  </div>

  <!-- Nombre / Descripción -->
  <div class="d-flex align-center justify-space-around">
    <v-card variant="text">
      <v-card-item>
        <v-card-title class="text-center">
          {{empresaStore.empresa.nombre}}
        </v-card-title>

        <v-card-subtitle class="text-center">
          {{empresaStore.empresa.descripcion}}
        </v-card-subtitle>
      </v-card-item>

    </v-card>
  </div>

  <!-- Horarios -->
  <div class="d-flex align-center justify-space-around">
    <v-list elevation="0" variant="text">
      <v-list-item v-for="(horario, i) in horarioStore.horarios" :key="i">
        <v-list-item-title v-text="horario.dia" class="mr-4"></v-list-item-title>

        <template v-slot:append>
          {{ horario.Dia.nombre }} {{ horario.horario }}
        </template>
      </v-list-item>
    </v-list>
  </div>

  <!-- Social -->
  <v-card elevation="0" rounded="0" class="position-absolute bottom-0 w-100" theme="dark">
    <v-container>
      <v-row justify="center" dense>
        <v-col v-for="(contacto, i) in contactoStore.contactos" :key="i" cols="auto">
          <v-card :href="contacto.href" class="pa-2" rel="noopener noreferer" target="_blank" width="50" flat>
            <v-avatar :icon="contacto.Social.icono" class="mb-2" color="white" variant="tonal"></v-avatar>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>

</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
// Stores
import { useContactoStore } from "@/stores/contacto";
import { useHorarioStore } from "@/stores/horario";
import { useEmpresaStore } from "@/stores/empresa";
// Assets
import imgUrl from '@/assets/InteliCarta.png'

const empresaStore = useEmpresaStore()
const contactoStore = useContactoStore()
const horarioStore = useHorarioStore()

onMounted(async () => {
  console.log(`Data: ${JSON.stringify(contactoStore.contactos)}`)
})

function getImage() {
  if (empresaStore.empresa.logo == '') {
    empresaStore.empresa.logo = imgUrl;
  }

  return empresaStore.empresa.logo;
}

</script>