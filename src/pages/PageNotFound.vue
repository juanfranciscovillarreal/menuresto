<template>
  <v-toolbar>
    <v-btn icon>
      <v-icon @click="router.push('/')">mdi-arrow-left</v-icon>
    </v-btn>

    <v-toolbar-title>InteliCarta</v-toolbar-title>
  </v-toolbar>


  <div class="d-flex align-self-center">
    <v-sheet class="ma-2 pa-2">
      El menú al que quiere acceder no existe
    </v-sheet>
  </div>

  <!-- <v-container>

    <v-row justify="space-around">
      <h1>El menú al que quiere acceder no existe</h1>
    </v-row>
  </v-container> -->

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

onMounted(() => {

})
</script>