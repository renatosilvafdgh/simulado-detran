import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uebewihyttehjdzazsku.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlYmV3aWh5dHRlaGpkemF6c2t1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExODI0NzUsImV4cCI6MjA4Njc1ODQ3NX0.6f_NJ8L_7ZydmrnNS8aOmdT5mquOytlc22ugsq-KU0o';

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyQueryFix() {
    console.log('--- VERIFYING QUERY FIX ---');
    const category = 'A';

    console.log('Executing query with quotes...');
    const { data, error } = await supabase
        .from('questions_bank')
        .select('*')
        .or(`category.eq.${category},category.in.("Legislacao","Direcao Defensiva","Primeiros Socorros","Meio Ambiente","Mecanica")`)
        .limit(5);

    if (error) {
        console.error('FAILED with error:', error);
    } else {
        console.log('SUCCESS. Query executed without error.');
        console.log('Data found:', data.length);
    }
}

verifyQueryFix();
