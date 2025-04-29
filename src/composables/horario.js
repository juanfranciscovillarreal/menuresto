import { ref, onMounted, onUnmounted } from 'vue';
import { supabase } from '@/lib/supabase'

export function useHorario() {

  async function getHorario(user_id) {

    const { data, error } = await supabase
      .from('Horario')
      .select(`horario, Dia( nombre)`)
      .eq('user_id', user_id)

    if (error) throw error;

    return data;
  }

  return { getHorario };
}
