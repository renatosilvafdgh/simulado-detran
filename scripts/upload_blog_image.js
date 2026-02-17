import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { basename } from 'path'

const SUPABASE_URL = "https://uebewihyttehjdzazsku.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlYmV3aWh5dHRlaGpkemF6c2t1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExODI0NzUsImV4cCI6MjA4Njc1ODQ3NX0.6f_NJ8L_7ZydmrnNS8aOmdT5mquOytlc22ugsq-KU0o"

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function uploadImage() {
    const imagePath = 'public/images/cnh-2026-digital.jpg'
    const fileName = 'cnh-2026-digital.jpg'

    try {
        console.log('📤 Fazendo upload da imagem...')

        // Ler o arquivo
        const fileBuffer = readFileSync(imagePath)

        // Upload para o bucket 'blog-images'
        const { data, error } = await supabase.storage
            .from('blog-images')
            .upload(fileName, fileBuffer, {
                contentType: 'image/jpeg',
                upsert: true // Sobrescrever se já existir
            })

        if (error) {
            // Se o bucket não existe, vamos criar
            if (error.message.includes('bucket')) {
                console.log('🪣 Bucket não existe, criando...')
                const { error: bucketError } = await supabase.storage.createBucket('blog-images', {
                    public: true
                })

                if (bucketError && !bucketError.message.includes('already exists')) {
                    throw bucketError
                }

                // Tentar upload novamente
                const { data: retryData, error: retryError } = await supabase.storage
                    .from('blog-images')
                    .upload(fileName, fileBuffer, {
                        contentType: 'image/jpeg',
                        upsert: true
                    })

                if (retryError) throw retryError
                console.log('✅ Bucket criado e imagem enviada!')
            } else {
                throw error
            }
        } else {
            console.log('✅ Imagem enviada com sucesso!')
        }

        // Obter URL pública
        const { data: urlData } = supabase.storage
            .from('blog-images')
            .getPublicUrl(fileName)

        const publicUrl = urlData.publicUrl
        console.log('🔗 URL pública:', publicUrl)

        // Atualizar o post
        console.log('\n📝 Atualizando post no banco de dados...')
        const { error: updateError } = await supabase
            .from('posts')
            .update({ og_image: publicUrl })
            .eq('slug', 'cnh-2026-guia-estrategico-habilitacao-digital')

        if (updateError) throw updateError

        console.log('✅ Post atualizado com sucesso!')
        console.log('\n🎉 Tudo pronto! Acesse o post para ver a nova imagem.')

    } catch (err) {
        console.error('❌ Erro:', err.message)
        console.error('\n💡 Verifique se:')
        console.error('   1. A imagem existe em: public/cnh-2026-digital.jpg')
        console.error('   2. Você tem permissões corretas no Supabase')
    }
}

uploadImage()
