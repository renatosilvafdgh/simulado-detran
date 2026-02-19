
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uebewihyttehjdzazsku.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlYmV3aWh5dHRlaGpkemF6c2t1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExODI0NzUsImV4cCI6MjA4Njc1ODQ3NX0.6f_NJ8L_7ZydmrnNS8aOmdT5mquOytlc22ugsq-KU0o';

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspectQuestions() {
    console.log('--- INSPECTING QUESTIONS TABLE (questions_placas_cores_e_caminhos) ---');

    const { data: questions, error } = await supabase
        .from('questions_placas_cores_e_caminhos')
        .select('*')
        .range(0, 2); // Get first 3 rows

    if (error) {
        console.error('Error fetching questions:', error);
    } else {
        if (questions && questions.length > 0) {
            console.log('Sample Row Keys:', Object.keys(questions[0]));
            console.log('Sample Rows:', JSON.stringify(questions, null, 2));
        } else {
            console.log('No rows found or RLS blocking.');
        }
    }
}

inspectQuestions();
