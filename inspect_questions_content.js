
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = 'https://uebewihyttehjdzazsku.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlYmV3aWh5dHRlaGpkemF6c2t1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExODI0NzUsImV4cCI6MjA4Njc1ODQ3NX0.6f_NJ8L_7ZydmrnNS8aOmdT5mquOytlc22ugsq-KU0o';

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspectAlternatives() {
    console.log('--- INSPECTING ALTERNATIVES (1-4) ---');

    const { data: questions, error } = await supabase
        .from('questions_placas_cores_e_caminhos')
        .select('id, alternative_1, alternative_2, alternative_3, alternative_4')
        .range(0, 4);

    let output = '';

    if (error) {
        output = `ERROR: ${error.message}`;
        console.error(output);
    } else {
        output = JSON.stringify(questions, null, 2);
        console.log('Successfully fetched sample rows.');
    }

    fs.writeFileSync('questions_inspection.json', output);
    console.log('Output written to questions_inspection.json');
}

inspectAlternatives();
