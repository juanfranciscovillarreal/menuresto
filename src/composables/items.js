import { ref, onMounted, onUnmounted } from 'vue';
import { supabase } from '../lib/supabase'
// import { supabase } from '../supabaseClient';

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

  async function getItems() {
    let { data, error, status } = await supabase.from('Item').select();
    if (error) throw error;
    return data;
  }

  return { getItems, updateItem, insertItem, removeItem };
}
