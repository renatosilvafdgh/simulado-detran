
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uebewihyttehjdzazsku.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlYmV3aWh5dHRlaGpkemF6c2t1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExODI0NzUsImV4cCI6MjA4Njc1ODQ3NX0.6f_NJ8L_7ZydmrnNS8aOmdT5mquOytlc22ugsq-KU0o';

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugMatch() {
    console.log('--- DEBUG MATCH "A-28" ---');

    // Check Placas
    const { data: placas, error } = await supabase
        .from('placas')
        .select('Código, Link_imagem_placa')
        .ilike('Código', 'A-28%');

    if (error) console.error('Placa Error:', error);
    else console.log('Placas found:', JSON.stringify(placas, null, 2));

    // Check Questions text
    const { data: questions, error: qError } = await supabase
        .from('questions_placas_cores_e_caminhos')
        .select('id, alternative_1')
        .eq('id', 100);

    if (qError) console.error('Question Error:', qError);
    else console.log('Question 100:', JSON.stringify(questions, null, 2));
}

debugMatch();
