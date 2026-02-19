
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uebewihyttehjdzazsku.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlYmV3aWh5dHRlaGpkemF6c2t1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExODI0NzUsImV4cCI6MjA4Njc1ODQ3NX0.6f_NJ8L_7ZydmrnNS8aOmdT5mquOytlc22ugsq-KU0o';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testFetch() {
    console.log('--- TESTING FRONTEND FETCH ---');

    // Simulate getQuestionsFromPlacasTable(10)
    const limit = 10;

    const { data, error } = await supabase
        .from('questions_placas_cores_e_caminhos')
        .select('*')
        .lte('id', 158)
        .limit(limit);

    if (error) {
        console.error('FETCH ERROR:', error.message);
        console.error('Details:', error);
    } else {
        console.log(`FETCH SUCCESS. Got ${data.length} rows.`);
        if (data.length === 0) {
            console.log('WARNING: Returned 0 rows. RLS likely blocking SELECT for anon.');
        } else {
            console.log('Sample ID:', data[0].id);
        }
    }
}

testFetch();
