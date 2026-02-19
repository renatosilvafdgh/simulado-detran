import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uebewihyttehjdzazsku.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlYmV3aWh5dHRlaGpkemF6c2t1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExODI0NzUsImV4cCI6MjA4Njc1ODQ3NX0.6f_NJ8L_7ZydmrnNS8aOmdT5mquOytlc22ugsq-KU0o';

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyQuantityFallback() {
    console.log('--- VERIFYING QUANTITY FALLBACK FOR CATEGORY "A" ---');
    const limit = 20;

    // Simulate the service logic:
    // 1. Fetch Bank (expecting 0 for A)
    let bankQuery = supabase
        .from('questions_bank')
        .select('*')
        .or(`category.eq.A,category.in.(Legislacao,Direcao Defensiva,Primeiros Socorros,Meio Ambiente,Mecanica)`)
        .limit(limit);

    const { data: bankData, error: bankError } = await bankQuery;
    console.log(`Bank returned ${bankData?.length || 0} questions.`);

    // 2. Fetch Placas (Simulating service logic: limit = 20)
    const placasCount = limit;
    const randomStart = 1; // Simplification

    const { data: placasData } = await supabase
        .from('questions_placas_cores_e_caminhos')
        .select('*')
        .gte('id', randomStart)
        .limit(placasCount);

    console.log(`Placas returned ${placasData?.length || 0} questions.`);

    // 3. Combine
    const combined = [...(bankData || []), ...(placasData || [])];
    console.log(`Total Combined: ${combined.length}`);

    if (combined.length >= limit) {
        console.log('SUCCESS: We have enough questions to fill the limit.');
    } else {
        console.error('FAILURE: Not enough questions.');
    }
}

verifyQuantityFallback();
