<template>
    <!-- Cerrar búsqueda-->
    <v-btn v-if="buscar == true && route.path.includes('Menu')" icon>
        <v-icon @click="cerrar()">mdi-close</v-icon>
    </v-btn>

    <!-- Buscar -->
    <v-menu transition="slide-x-reverse-transition">
        <template v-slot:activator="{ props }">
            <!-- Texto a buscar -->
            <v-text-field v-model="texto" v-if="buscar == true && route.path.includes('Menu')" hide-details single-line
                placeholder="Buscar" append-inner-icon="mdi-magnify">
            </v-text-field>

            <!-- Botón Buscar -->
            <v-btn v-bind="props" v-if="buscar == false && route.path.includes('Menu')" icon="mdi-magnify" variant="text"
                @click="buscar = true">
            </v-btn>
        </template>
    </v-menu>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMenuStore } from "@/stores/menu";
import { ref, watch } from 'vue'

const router = useRouter()
const route = useRoute()
const menuStore = useMenuStore()
const buscar = ref(false)
const texto = ref('')

onMounted(() => {

})

function cerrar() {
    buscar.value = false;
    texto.value = '';
}

watch(texto, (newValue, oldValue) => {
    texto.value = newValue;
    filtrar();
})

function filtrar() {
    var resultado = [];
    var itemsEncontrados = [];
    var textoBuscado = texto.value.toLowerCase();

    if (textoBuscado == '') {
        menuStore.menuFiltrado = menuStore.menuCompleto;
        return;
    }

    // Categorías
    for (var i = 0; i < menuStore.menuCompleto.length; i++) {
        var id_categoria = menuStore.menuCompleto[i].id;
        var nombre_categoria = menuStore.menuCompleto[i].nombre;

        // Items de la Categoría
        for (var j = 0; j < menuStore.menuCompleto[i].Item.length; j++) {
            var item = menuStore.menuCompleto[i].Item[j];
            var id_item = item.id;
            var nombre_item = item.nombre.toLowerCase();
            var precio = item.precio;
            var descripcion = item.descripcion;

            if (nombre_item.match(textoBuscado)) {

                itemsEncontrados.push({
                    id: id_item,
                    nombre: nombre_item,
                    precio: precio,
                    descripcion: descripcion
                });
            }
        }

        if (itemsEncontrados.length > 0) {
            resultado.push({
                id: id_categoria,
                nombre: nombre_categoria,
                Item: itemsEncontrados
            });
        }

        j = 0;
        itemsEncontrados = [];
    }
    menuStore.menuFiltrado = resultado;
    menuStore.expandirMenu();
}

</script>