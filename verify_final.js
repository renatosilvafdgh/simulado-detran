
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uebewihyttehjdzazsku.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlYmV3aWh5dHRlaGpkemF6c2t1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExODI0NzUsImV4cCI6MjA4Njc1ODQ3NX0.6f_NJ8L_7ZydmrnNS8aOmdT5mquOytlc22ugsq-KU0o';

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyFinal() {
    console.log('--- FINAL VERIFICATION ---');

    // 1. Check Q100
    const { data: q100, error: qError } = await supabase
        .from('questions_placas_cores_e_caminhos')
        .select('id, alternative_1, alternative_2')
        .eq('id', 100)
        .single();

    if (qError) console.log('Q100 Error:', qError.message);
    else {
        console.log('Q100 Alt1:', q100.alternative_1);
        console.log('Q100 Alt2:', q100.alternative_2); // Should be URL or text
    }

    // 2. Check Categories
    const { data: categories, error: cError } = await supabase
        .from('categories')
        .select('name')
        .ilike('name', '%Placa%');

    if (cError) console.log('Category Error:', cError.message);
    else {
        console.log('Categories with "Placa":', categories);
        if (categories.length === 0) console.log('NO "Placas" category found.');
    }
}

verifyFinal();
