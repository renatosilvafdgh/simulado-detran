import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uebewihyttehjdzazsku.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlYmV3aWh5dHRlaGpkemF6c2t1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExODI0NzUsImV4cCI6MjA4Njc1ODQ3NX0.6f_NJ8L_7ZydmrnNS8aOmdT5mquOytlc22ugsq-KU0o';

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyFetchAllStrategy() {
    console.log('--- VERIFYING FETCH ALL STRATEGY ---');
    const limit = 20;

    // 1. Bank Questions (Expected 0 for A)
    const { data: bankData } = await supabase
        .from('questions_bank')
        .select('*')
        .eq('category', 'A') // strict check to simulate empty bank
        .limit(limit);

    console.log(`Bank returned ${bankData?.length || 0} questions.`);

    // 2. Placas Questions (Fetch ALL)
    console.log('Fetching ALL Placas questions...');
    const { data: placasData } = await supabase
        .from('questions_placas_cores_e_caminhos')
        .select('*');

    console.log(`Placas returned ${placasData?.length || 0} total questions.`);

    // 3. Combine and Slice
    const combined = [...(bankData || []), ...(placasData || [])];
    const shuffled = combined.sort(() => Math.random() - 0.5);
    const finalResult = shuffled.slice(0, limit);

    console.log(`Final Result Count: ${finalResult.length}`);

    if (finalResult.length === limit) {
        console.log('SUCCESS: We met the requested limit of 20.');
    } else {
        console.error(`FAILURE: Returned ${finalResult.length}, expected ${limit}.`);
    }
}

verifyFetchAllStrategy();
