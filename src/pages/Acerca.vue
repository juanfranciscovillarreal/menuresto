<template>
    <div class="d-flex align-center justify-space-around">
      <v-card variant="text">
        <!-- <v-avatar size="200">
          <v-img src="../assets/Suss.png"></v-img>
        </v-avatar> -->
        <v-icon icon="mdi-ballot" size="x-large" style="font-size: 15em;"></v-icon>
      </v-card>
    </div>
  
    <div class="d-flex align-center justify-space-around">
      <v-card variant="text">
        <v-card-item>
          <v-card-title class="text-center">
            InteliCarta
          </v-card-title>
  
          <v-card-subtitle class="text-center">
            La carta inteligente
          </v-card-subtitle>
        </v-card-item>
  
      </v-card>
    </div>
  
  
    <v-list>
      <v-list-subheader>Horarios</v-list-subheader>
  
      <v-list-item v-for="(item, i) in items" :key="i" :value="item" color="primary">
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>
  
        <v-list-item-title v-text="item.text"></v-list-item-title>
      </v-list-item>
    </v-list>
  
    <v-divider></v-divider>
  
  
      <v-card class="position-absolute bottom-0 w-100" theme="dark">
        <v-container class="text-center">
          <v-row justify="center" dense>
            <v-col v-for="(shortcut, i) in contactos" :key="i" cols="auto">
              <v-card :href="shortcut.href" class="pa-2" rel="noopener noreferer" target="_blank" width="50" flat>
                <v-avatar :icon="shortcut.icon" class="mb-2" color="white" variant="tonal"></v-avatar>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
  
  
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const items = ref([
    { text: 'Lunes', icon: 'mdi-web' },
    { text: 'Martes', icon: 'mdi-instagram' },
    { text: 'Miércoles', icon: 'mdi-facebook' },
    { text: 'Whatsapp', icon: 'mdi-whatsapp' },
    { text: 'Correo', icon: 'mdi-mail' },
  ])
  
  const contactos = ref([
    {
      icon: 'mdi-web',
      title: 'www.suss.com.ar',
      href: 'www.suss.com.ar',
    },
    {
      icon: 'mdi-instagram',
      title: 'Instagram',
      href: '@suss.com.ar',
    },
    {
      icon: 'mdi-facebook',
      title: 'Facebook',
      href: 'https://facebook.com/suss',
    },
    {
      icon: 'mdi-whatsapp',
      title: 'Whatsapp',
      href: '01160591399',
    },
    {
      icon: 'mdi-mail',
      title: 'Correo',
      href: 'mailTo:',
    },
  ])
  
  </script>