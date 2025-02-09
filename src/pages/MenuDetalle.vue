<!-- <template>
  <v-toolbar>
    <v-btn icon @click="router.push('/Menu')">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-toolbar-title>Title</v-toolbar-title>
  </v-toolbar>

  <v-card variant="flat">
    <v-img height="250" src="https://cdn.vuetifyjs.com/images/cards/cooking.png" cover></v-img>

    <v-card-item>
      <v-card-title>Cafe Badilico</v-card-title>

      <v-card-subtitle>
        <span class="me-1">Local Favorite</span>

        <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating :model-value="4.5" color="amber" density="compact" size="small" half-increments readonly></v-rating>

        <div class="text-grey ms-4">
          4.5 (413)
        </div>
      </v-row>

      <div class="my-4 text-subtitle-1">
        $ • Italian, Cafe
      </div>

      <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
    </v-card-text>

    <v-card-actions>
      <v-btn
          color="deep-purple-lighten-2"
          text="Reserve"
          block
          border
          @click="reserve"
        ></v-btn>
    </v-card-actions>
  </v-card>
</template> -->

<template>
  <div class="text-center pa-4">
    <v-dialog v-model="dialog" transition="dialog-bottom-transition" fullscreen>
      <v-card>
        <v-toolbar>
          <v-btn icon="mdi-close" @click="dialog = false"></v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
        </v-toolbar>

        <v-list lines="two" subheader>
          <v-list-subheader>User Controls</v-list-subheader>

          <v-list-item subtitle="Set the content filtering level to restrict apps that can be downloaded"
            title="Content filtering" link></v-list-item>

          <v-list-item subtitle="Require password for purchase or use password to restrict purchase" title="Password"
            link></v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { ref } from 'vue'

const router = useRouter()
const dialog = ref(false)

const props = defineProps({
  show: Boolean,
})

onMounted(() => {
  // console.log('Menu Detalle');
})
</script>