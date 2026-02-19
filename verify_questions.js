
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uebewihyttehjdzazsku.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlYmV3aWh5dHRlaGpkemF6c2t1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExODI0NzUsImV4cCI6MjA4Njc1ODQ3NX0.6f_NJ8L_7ZydmrnNS8aOmdT5mquOytlc22ugsq-KU0o';

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyQuestions() {
    console.log('--- VERIFYING QUESTIONS ---');

    const { data: questions, error } = await supabase
        .from('questions_placas_cores_e_caminhos')
        .select('id, alternative_1, alternative_2')
        .in('id', [1, 22, 100]);

    if (error) {
        console.error('Error:', error);
    } else {
        questions.forEach(q => {
            console.log(`Q${q.id} Alt1: ${q.alternative_1}`);
            console.log(`Q${q.id} Alt2: ${q.alternative_2}`);
        });
    }
}

verifyQuestions();
