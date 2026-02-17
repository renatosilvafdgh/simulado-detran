import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://uebewihyttehjdzazsku.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlYmV3aWh5dHRlaGpkemF6c2t1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExODI0NzUsImV4cCI6MjA4Njc1ODQ3NX0.6f_NJ8L_7ZydmrnNS8aOmdT5mquOytlc22ugsq-KU0o"

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function fixCategoryDescriptions() {
    console.log('🔧 Corrigindo descrições das categorias...\n')

    const updates = [
        { name: 'A', description: 'Motos e veículos de 2-3 rodas' },
        { name: 'B', description: 'Carros de passeio' },
        { name: 'C', description: 'Caminhão' },
        { name: 'D', description: 'Ônibus' },
        { name: 'E', description: 'Caminhão' }
    ]

    for (const update of updates) {
        const { error } = await supabase
            .from('categories')
            .update({ description: update.description })
            .eq('name', update.name)

        if (error) {
            console.error(`❌ Erro ao atualizar ${update.name}:`, error.message)
        } else {
            console.log(`✅ ${update.name}: ${update.description}`)
        }
    }

    console.log('\n🎉 Descrições atualizadas com sucesso!')
}

fixCategoryDescriptions()
