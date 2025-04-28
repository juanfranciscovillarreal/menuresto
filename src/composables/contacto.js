import { ref, onMounted, onUnmounted } from 'vue';
import { supabase } from '@/lib/supabase'

export function useContacto() {

  async function getContacto(user_id) {

    const { data, error } = await supabase
      .from('Contacto')
      .select(`href, Social( nombre, icono)`)
      .eq('user_id', user_id)

    if (error) throw error;

    return data;
  }

  return { getContacto };
}
