
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uebewihyttehjdzazsku.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlYmV3aWh5dHRlaGpkemF6c2t1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExODI0NzUsImV4cCI6MjA4Njc1ODQ3NX0.6f_NJ8L_7ZydmrnNS8aOmdT5mquOytlc22ugsq-KU0o';

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugUpdate() {
    console.log('--- DEBUG UPDATE R-14 ---');

    const targetCode = 'R-14';
    const testUrl = 'https://uebewihyttehjdzazsku.supabase.co/storage/v1/object/public/imagem-placas/Regulamentacao/R-14.png';

    const { data, error } = await supabase
        .from('placas')
        .update({ Link_imagem_placa: testUrl })
        .eq('Código', targetCode)
        .select();

    if (error) {
        console.error('UPDATE ERROR:', error);
    } else {
        console.log('UPDATE SUCCESS? Data:', data);
        if (data && data.length === 0) {
            console.log('WARNING: Update returned 0 rows. (RLS might be blocking UPDATE or row not found)');
        }
    }
}

debugUpdate();
