<template>
  <v-table density="compact">
    <thead style="background-color: lightblue;">
      <tr>
        <th class="text-left">
          Descripcion
        </th>
        <th class="text-right pa-0">
          Cantidad
        </th>
        <th class="text-right">
          Subtotal
        </th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in orden" :key="item.id">
        <td>{{ item.title }}</td>
        <td style="padding: 0px;" class="text-right">
          <v-btn icon="mdi-minus" size="x-small" variant="text" @click="restarItem(item)"></v-btn>
          <span class="text-caption">{{ item.cantidad }}</span>
          <v-btn icon="mdi-plus" size="x-small" variant="text" @click="sumarItem(item)"></v-btn>
        </td>
        <td class="text-right">{{ $filters.toPesos(item.subtotal) }}</td>
        <td>
          <v-icon size="small" @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </td>
      </tr>
    </tbody>
    <tfoot style="background-color: lightblue; font-weight: bold;">
      <tr class="xt-subtitle-1">
        <td v-text="'Total'"></td>
        <td></td>
        <td v-text="$filters.toPesos(total)" style="text-align: end;"></td>
        <td></td>
      </tr>
    </tfoot>
  </v-table>
</template>


<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMenuStore } from "../stores/menu";
import Cantidad from '@/components/Cantidad.vue';

const router = useRouter()
const menuStore = useMenuStore()
const orden = ref([])
const itemIndex = ref(-1)
const headers = ref([
  {
    title: 'Descripción',
    align: 'start',
    sortable: false,
    key: 'title',
    class: "text-h6"
  },
  { title: 'Cantidad', align: 'center', key: 'cantidad', sortable: false, },
  // { title: 'Precio', align: 'end', key: 'precio', sortable: false },
  { title: 'Importe', align: 'end', key: 'subtotal', sortable: false },
  { title: '', key: 'actions', sortable: false },
])

const total = ref(0)

onMounted(() => {
  orden.value = menuStore.menuCompleto.filter((item) => {
    return item.favorito == true;
  })
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
  total.value = orden.value.reduce(function (prev, cur) {
    return parseFloat(prev) + parseFloat(cur.subtotal);
  }, 0).toFixed(2);
}

function deleteItem(item) {
  item.favorito = false;
  item.subtotal = 0;
  totalizar();
  itemIndex.value = orden.value.indexOf(item);
  orden.value.splice(itemIndex.value, 1);
}

</script>

<style scoped></style>