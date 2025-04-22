import { ref, onMounted, onUnmounted } from 'vue';
import { supabase } from '../lib/supabase'

export function useEmpresa() {

  async function getEmpresa(id) {
    const { data, error, status } = await supabase
      .from('Empresa')
      .select()
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async function getEmpresaPorNombre(nombre) {
    const { data, error, status } = await supabase
      .from('Empresa')
      .select('id, nombre')
      .eq('nombre', nombre)
      .single();

    if (error) throw error;
    return data;
  }

  async function updateEmpresa(empresa) {
    const { error } = await supabase
      .from('Empresa')
      .update(empresa)
      .eq('id', empresa.id);

    if (error) throw error;

    return true;
  }

  return { getEmpresa, getEmpresaPorNombre, updateEmpresa };
}
