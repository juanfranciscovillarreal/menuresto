import { ref, onMounted, onUnmounted } from 'vue';
import { supabase } from '../lib/supabase'

export function useEmpresa() {

  async function getEmpresa(id) {
    const { data, error, status } = await supabase
      .from('profiles')
      .select()
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async function updateEmpresa(empresa) {
    const { error } = await supabase
      .from('profiles')
      .update(empresa)
      .eq('id', empresa.id);

    if (error) throw error;

    return true;
  }

  return { getEmpresa, updateEmpresa };
}
