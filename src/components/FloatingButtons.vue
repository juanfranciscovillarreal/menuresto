<template>
  <v-app>
    <v-card :class="fabPosition === 'absolute' ? 'demo-panel-relative' : 'demo-panel-static'" border flat>
      <v-fab :key="fabPosition" :absolute="fabPosition === 'absolute'" :app="fabPosition === 'fixed'"
        :color="open ? '' : 'primary'" :location="fabLocation" size="large" icon>
        <v-icon>{{ open ? 'mdi-close' : 'mdi-crown' }}</v-icon>
        <v-speed-dial v-model="open" :location="menuLocation" :transition="transition" activator="parent">
          <v-btn key="1" color="success" icon>
            <v-icon size="24">$success</v-icon>
          </v-btn>

          <v-btn key="2" color="info" icon>
            <v-icon size="24">$info</v-icon>
          </v-btn>

          <v-btn key="3" color="warning" icon>
            <v-icon size="24">$warning</v-icon>
          </v-btn>

          <v-btn key="4" color="error" icon>
            <v-icon size="24">$error</v-icon>
          </v-btn>
        </v-speed-dial>
      </v-fab>
    </v-card>
  </v-app>
</template>
<script setup>
import { shallowRef, watch } from 'vue'

const open = shallowRef(false)
const fabPosition = shallowRef('fixed')
const menuLocation = shallowRef('bottom center')
const fabLocation = shallowRef('right bottom')
const transition = shallowRef('slide-y-reverse-transition')

watch(menuLocation, reopen)
watch(transition, reopen)
watch(fabLocation, () => open.value = false)
watch(fabPosition, () => open.value = false)

function reopen() {
  open.value = false
  setTimeout(() => open.value = true, 400)
}
</script>

<style scoped>
/* This is for documentation purposes and will not be needed in your application */
::v-deep(.v-application__wrap) {
  min-height: 0 !important;
}


.demo-panel-static,
.demo-panel-relative {
  margin: 10px;
  padding: 10px;
  min-height: 280px;
  min-height: 680px;
}

.demo-panel-static {
  position: static;
}

.demo-panel-relative {
  position: relative;
}

.v-selection-control--disabled,
.v-input--disabled .v-selection-control {
  opacity: .1;
}

.v-radio {
  flex-grow: 0 !important;
}

h5 {
  margin-bottom: 12px;
}

code {
  display: block;
  font-size: .8rem;
  margin-top: 12px;
}

::v-deep(.v-label) {
  margin-left: 8px;
}
</style>