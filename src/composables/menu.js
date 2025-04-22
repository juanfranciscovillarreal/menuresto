import { ref, onMounted, onUnmounted } from 'vue';
import { supabase } from '../lib/supabase'

export function useMenu() {

  async function getMenu(id) {
    const { data, error } = await supabase
      .from('Categoria')
      .select(`id, nombre,
        Item (id, id_categoria, nombre, descripcion, precio, foto)`)
      .eq('user_id', id)
      .order('nombre', { ascending: true });
    if (error) throw error;
    return data;
  }

  return { getMenu };
}
