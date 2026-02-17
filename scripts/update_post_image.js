import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://uebewihyttehjdzazsku.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlYmV3aWh5dHRlaGpkemF6c2t1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExODI0NzUsImV4cCI6MjA4Njc1ODQ3NX0.6f_NJ8L_7ZydmrnNS8aOmdT5mquOytlc22ugsq-KU0o"

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function updatePostImage() {
    console.log('Atualizando imagem do post...')

    // URL da imagem que você forneceu (vou usar um placeholder que você vai substituir)
    const imageUrl = "https://souhabilitado.com/images/cnh-2026-digital.jpg"

    const { data, error } = await supabase
        .from('posts')
        .update({ og_image: imageUrl })
        .eq('slug', 'cnh-2026-guia-estrategico-habilitacao-digital')
        .select()

    if (error) {
        console.error('Erro ao atualizar:', error)
        return
    }

    console.log('✅ Imagem atualizada com sucesso!')
    console.log('Nova URL:', imageUrl)
}

updatePostImage()
