<template>
    <v-sheet class="mx-auto" elevation="8" max-width="800">
        <v-slide-group v-model="model" class="pa-2" selected-class="bg-primary" :show-arrows="true" :mobile="true" center-active>
            <v-slide-group-item v-for="item in itemsStore.sugeridos" :key="item.id"
                v-slot="{ isSelected, toggle, selectedClass }">

                <v-card :class="['ma-2', selectedClass]" color="grey-lighten-1" height="100" width="100"
                    @click="toggle">
                    <v-img :src="item.foto" aspect-ratio="1" class="bg-grey-lighten-2" cover>
                        <template v-slot:placeholder>
                            <v-container class="fill-height" fluid>
                                <v-row justify="center">
                                    <v-col cols="12">
                                        <div class="text-center">
                                            <v-progress-circular color="grey-lighten-5"
                                                indeterminate></v-progress-circular>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </template>

                        <template v-slot:error>
                            <v-img cover aspect-ratio="1" src="https://picsum.photos/500/300?image=232">
                            </v-img>
                        </template>
                    </v-img>

                    <!-- <div class="d-flex fill-height align-center justify-center">
                        <v-scale-transition>
                            <v-icon v-if="isSelected" color="white" icon="mdi-close-circle-outline" size="48"></ v-icon>
                        </v-scale-transition>
                    </div> -->
                </v-card>
            </v-slide-group-item>
        </v-slide-group>

        <!-- <v-expand-transition>
            <v-sheet v-if="model != null" height="200">
                <div class="d-flex fill-height align-center justify-center">
                    <h3 class="text-h6">
                        Selected {{ model }}
                    </h3>
                </div>
            </v-sheet>
        </v-expand-transition> -->
    </v-sheet>
</template>


<script setup>
import { ref } from 'vue';
// Stores
import { useItemsStore } from "@/stores/items";

// Stores
const itemsStore = useItemsStore()

const model = ref(null)
</script>