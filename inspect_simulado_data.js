import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uebewihyttehjdzazsku.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlYmV3aWh5dHRlaGpkemF6c2t1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExODI0NzUsImV4cCI6MjA4Njc1ODQ3NX0.6f_NJ8L_7ZydmrnNS8aOmdT5mquOytlc22ugsq-KU0o';

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspectSimuladoData() {
    console.log('--- INSPECTING SIMULADO DATA ---');

    console.log('1. Categories Table:');
    const { data: categories, error: catError } = await supabase
        .from('categories')
        .select('*');
    if (catError) console.error(catError);
    else console.log(JSON.stringify(categories, null, 2));

    console.log('\n2. Questions Bank:');
    const { count: bankCount, error: countError } = await supabase
        .from('questions_bank')
        .select('*', { count: 'exact', head: true });

    if (countError) console.error(countError);
    else console.log('Total Questions in Bank:', bankCount);

    console.log('\n3. Distinct Categories in Bank (Sample):');
    const { data: bankData, error: bankError } = await supabase
        .from('questions_bank')
        .select('category')
        .limit(200);

    if (bankError) console.error(bankError);
    else {
        const distinctCats = [...new Set(bankData.map(q => q.category))];
        console.log('Distinct Categories found in first 200 rows:', distinctCats);
    }
}

inspectSimuladoData();
