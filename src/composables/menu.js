import { ref, onMounted, onUnmounted } from 'vue';
import { supabase } from '@/lib/supabase'

export function useMenu() {
  
  async function getMenu(user_id) {
    const { data, error } = await supabase
      .from('Categoria')
      .select(`id, nombre,
        Item (id, id_categoria, nombre, descripcion, precio, foto)`)
      .eq('user_id', user_id)
      .order('nombre', { ascending: true });
    if (error) throw error;
    return data;
  }

  return { getMenu };
}
