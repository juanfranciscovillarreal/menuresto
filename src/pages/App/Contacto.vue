<template>
  <div class="d-flex align-center justify-space-around">
    <v-card variant="text">
      <v-avatar size="200">
        <v-img src="@/assets/Suss.png"></v-img>
      </v-avatar>
    </v-card>
  </div>

  <div class="d-flex align-center justify-space-around">
    <v-card variant="text">
      <v-card-item>
        <v-card-title class="text-center">
          Suss
        </v-card-title>

        <v-card-subtitle class="text-center">
          Cupcake Cafe
        </v-card-subtitle>
      </v-card-item>

    </v-card>
  </div>

  <div class="d-flex align-center justify-space-around">
    <v-list elevation="0" variant="text">
      <v-list-item v-for="(horario, i) in horarios" :key="i" >
        <v-list-item-title v-text="horario.dia" class="mr-4"></v-list-item-title>

        <template v-slot:append>
          {{ horario.horario }}
        </template>
      </v-list-item>
    </v-list>
  </div>

  <v-card elevation="0" rounded="0" class="position-absolute bottom-0 w-100" theme="dark">
    <v-container >
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
import { useContactoStore } from "@/stores/contacto";

const contactoStore = useContactoStore()

onMounted(async () => {
  console.log(`Data: ${JSON.stringify(contactoStore.contactos)}`)
})


const horarios = ref([
  { dia: 'Lunes', horario: '19:00 a 01:00' },
  { dia: 'Martes', horario: '19:00 a 01:00' },
  { dia: 'Miércoles', horario: '19:00 a 01:00' },
  { dia: 'Jueves', horario: '19:00 a 01:00' },
  { dia: 'Viernes', horario: '19:00 a 01:00' },
])


</script>