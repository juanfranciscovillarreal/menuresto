<template>
  <v-table density="compact">
    <thead style="background-color: lightblue;">
      <tr>
        <th class="text-left">
          Descripcion
        </th>
        <th class="pa-0" colspan="3">
          Cantidad
        </th>
        <th class="text-right">
          Subtotal
        </th>
        <th>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in menuStore.pedido" :key="item.id">
        <td>
          {{ item.nombre }}
        </td>
        <td style="padding: 0px; width: 1em;">
          <v-btn icon="mdi-minus" size="x-small" variant="text" @click="restarItem(item)"></v-btn>
        </td>
        <td style="padding: 0px; width: 1em; text-align: center;">
          <span class="text-caption">{{ item.cantidad }}</span>
        </td>
        <td style="padding: 0px; width: 1em;">
          <v-btn icon="mdi-plus" size="x-small" variant="text" @click="sumarItem(item)"></v-btn>
        </td>
        <td class="text-right" style="padding: 0px;">
          {{ toPesos(item.subtotal) }}
        </td>
        <td style="padding-left: 0.5em;">
          <v-icon size="small" @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </td>
      </tr>
    </tbody>
    <!-- <tfoot style="background-color: lightblue; font-weight: bold;">
      <tr class="xt-subtitle-1">
        <td v-text="'Total'"></td>
        <td style="padding: 0px;"></td>
        <td style="padding: 0px;"></td>
        <td style="padding: 0px;"></td>
        <td v-text="toPesos(menuStore.total)" style="text-align: end; padding: 0px;"></td>
        <td></td>
      </tr>
    </tfoot> -->
  </v-table>

  <v-toolbar density="compact" color="primary" style="position: fixed; bottom: 67px;" class="pr-4">
    <v-toolbar-title>Total</v-toolbar-title>

    <v-spacer></v-spacer>

    {{ toPesos(menuStore.total) }}
  </v-toolbar>

</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
// Composables
import { useFiltros } from '@/composables/filtros'
// Stores
import { useMenuStore } from "@/stores/menu";

const router = useRouter()
const menuStore = useMenuStore()
const itemIndex = ref(-1)
// Composables
const { toPesos } = useFiltros();

onMounted(() => {
  totalizar();
})

function sumarItem(item) {
  if (item.cantidad > 9) {
    return;
  }
  item.cantidad++;
  item.favorito = true;
  item.subtotal = (parseInt(item.cantidad) * parseFloat(item.precio)).toFixed(2);
  totalizar();
}

function restarItem(item) {
  if (item.cantidad < 2) {
    return;
  }
  item.cantidad--;
  item.subtotal = (parseInt(item.cantidad) * parseFloat(item.precio)).toFixed(2);
  totalizar();
}

function totalizar() {
  menuStore.total = menuStore.pedido.reduce(function (prev, cur) {
    return parseFloat(prev) + parseFloat(cur.subtotal);
  }, 0).toFixed(2);
}

function deleteItem(item) {
  item.favorito = false;
  item.subtotal = 0;
  totalizar();
  itemIndex.value = menuStore.pedido.indexOf(item);
  menuStore.pedido.splice(itemIndex.value, 1);
}

</script>

<style scoped></style>