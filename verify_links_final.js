
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uebewihyttehjdzazsku.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlYmV3aWh5dHRlaGpkemF6c2t1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExODI0NzUsImV4cCI6MjA4Njc1ODQ3NX0.6f_NJ8L_7ZydmrnNS8aOmdT5mquOytlc22ugsq-KU0o';

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyLinks() {
    console.log('--- VERIFYING IMAGE LINKS ---');

    const idsToCheck = [1, 20, 50, 100, 150];
    const { data: questions, error } = await supabase
        .from('questions_placas_cores_e_caminhos')
        .select('id, alternative_1, alternative_2, alternative_3, alternative_4')
        .in('id', idsToCheck);

    if (error) {
        console.error('Error:', error);
    } else {
        questions.forEach(q => {
            console.log(`\nQ${q.id}:`);
            console.log(`  Alt1: ${q.alternative_1.substring(0, 60)}...`);
            console.log(`  Alt2: ${q.alternative_2.substring(0, 60)}...`);
            console.log(`  Alt3: ${q.alternative_3.substring(0, 60)}...`);
            console.log(`  Alt4: ${q.alternative_4.substring(0, 60)}...`);
        });
    }
}

verifyLinks();
