import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uebewihyttehjdzazsku.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlYmV3aWh5dHRlaGpkemF6c2t1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExODI0NzUsImV4cCI6MjA4Njc1ODQ3NX0.6f_NJ8L_7ZydmrnNS8aOmdT5mquOytlc22ugsq-KU0o';

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyLogic() {
    console.log('--- VERIFYING LOGIC FOR CATEGORY "A" ---');

    // 1. Bank Questions
    console.log('Fetching Bank Questions (A or Legislacao/etc)...');
    const { data: bankData, error: bankError } = await supabase
        .from('questions_bank')
        .select('*')
        .or('category.eq.A,category.in.(Legislacao,Direcao Defensiva,Primeiros Socorros,Meio Ambiente,Mecanica)')
        .limit(5);

    if (bankError) {
        console.error('Bank Error:', bankError.message);
    } else {
        console.log(`Bank returned ${bankData.length} questions.`);
        if (bankData.length > 0) console.log('Sample Bank Category:', bankData[0].category);
    }

    // 2. Placas Questions
    console.log('\nFetching Placas Questions...');
    const { data: placasData, error: placasError } = await supabase
        .from('questions_placas_cores_e_caminhos')
        .select('*')
        .limit(5);

    if (placasError) {
        console.error('Placas Error:', placasError.message);
    } else {
        console.log(`Placas returned ${placasData.length} questions.`);
        if (placasData.length > 0) console.log('Sample Placas Question:', placasData[0].question);
    }
}

verifyLogic();
