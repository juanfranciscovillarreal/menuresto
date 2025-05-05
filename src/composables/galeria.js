import { ref, onMounted, onUnmounted } from 'vue';
import { supabase } from '@/lib/supabase'

export function useGaleria() {
  const fotos = ref([]);

  async function insertFoto(data) {
    const { error } = await supabase.from('Galeria').insert(data);

    if (error) throw error;
  }

  async function removeFoto(id) {
    const response = await supabase.from('Galeria').delete().eq('id', id);

    if (response.error) throw response.error;
  }

  async function getFotos(id) {
    let { data, error, status } = await supabase
    .from('Galeria')
    .select('id, foto')
    .eq('user_id', id)
    .order('id', { ascending: true });

    if (error) throw error;
    return data;
  }

  return { getFotos, insertFoto, removeFoto };
}