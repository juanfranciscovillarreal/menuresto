import { ref, onMounted, onUnmounted } from 'vue';
import { supabase } from '../lib/supabase'
// import { supabase } from '../supabaseClient';

export function useMenu() {

  async function getMenu() {
    const { data, error } = await supabase.from('Categoria').select(`id, nombre,
        Item (id, id_categoria, nombre, descripcion, precio, foto)`);
    if (error) throw error;
    return data;
  }

  return { getMenu};
}
