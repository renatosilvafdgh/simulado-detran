import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://uebewihyttehjdzazsku.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlYmV3aWh5dHRlaGpkemF6c2t1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExODI0NzUsImV4cCI6MjA4Njc1ODQ3NX0.6f_NJ8L_7ZydmrnNS8aOmdT5mquOytlc22ugsq-KU0o"

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function updateImage() {
    // A imagem está em public/images/ e após o deploy estará acessível nesta URL
    const imageUrl = "https://souhabilitado.com/images/cnh-2026-digital.jpg"

    console.log('📝 Atualizando post com nova imagem...')
    console.log('URL:', imageUrl)

    const { data, error } = await supabase
        .from('posts')
        .update({ og_image: imageUrl })
        .eq('slug', 'cnh-2026-guia-estrategico-habilitacao-digital')
        .select()

    if (error) {
        console.error('❌ Erro:', error.message)
        return
    }

    console.log('✅ Imagem atualizada com sucesso!')
    console.log('Post atualizado:', data[0].title)
    console.log('\n🚀 Agora faça o deploy e a imagem aparecerá no blog!')
}

updateImage()
