import { ref, onMounted, onUnmounted } from 'vue';
import { supabase } from '@/lib/supabase'

export function useItem() {
  const isEditing = ref(false);
  const items = ref([]);
  const listaItems = ref([]);

  async function updateItem(recordItem) {
    const { error } = await supabase
      .from('Item')
      .update(recordItem.value)
      .eq('id', recordItem.value.id);

    if (error) throw error;

    return true;
  }

  async function insertItem(newitem) {
    /*
    const {
      data: { user, error },
    } = await supabase.auth.getUser();

    if (!user) throw 'Debe iniciar sesión';
*/
    const { error } = await supabase.from('Item').insert(newitem);

    if (error) throw error;
  }

  async function removeItem(id) {
    const response = await supabase.from('Item').delete().eq('id', id);

    if (response.error) throw response.error;
  }

  async function getItems(id) {
    let { data, error, status } = await supabase
    .from('Item')
    .select('id, nombre, descripcion, id_categoria, precio, foto')
    .eq('user_id', id)
    .order('nombre', { ascending: true });

    if (error) throw error;
    return data;
  }

  async function getSugeridos(id) {
    debugger
    let { data, error, status } = await supabase
    .from('Item')
    .select('id, nombre, descripcion, id_categoria, precio, foto')
    .eq('user_id', id)
    .eq('sugerido', true)
    .order('nombre', { ascending: true });

    if (error) throw error;
    return data;
  }

  return { getItems, updateItem, insertItem, removeItem, getSugeridos };
}
