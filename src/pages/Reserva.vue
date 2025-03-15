<template>
  <v-container>
    <v-row justify="space-around">
      <v-date-picker color="primary" width="400" :min="desde">
      </v-date-picker>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useDate } from 'vuetify'

const adapter = useDate()

var desde = ref('')
var hasta = ref('')

onMounted(() => {
  let hoy = new Date();
  let desdeISO = hoy.toISOString().slice(0, 10);

  desde.value = adapter.parseISO(desdeISO);
})
</script>