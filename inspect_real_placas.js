import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uebewihyttehjdzazsku.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlYmV3aWh5dHRlaGpkemF6c2t1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExODI0NzUsImV4cCI6MjA4Njc1ODQ3NX0.6f_NJ8L_7ZydmrnNS8aOmdT5mquOytlc22ugsq-KU0o';

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspectQuestionsBank() {
    console.log('--- INSPECTING questions_bank TABLE ---');

    const { data: questions, error } = await supabase
        .from('questions_bank')
        .select('*')
        .limit(1);

    if (error) {
        console.error('Error fetching questions_bank:', error);
    } else {
        if (questions && questions.length > 0) {
            console.log('Sample Row Keys:', Object.keys(questions[0]));
            // Check for image column
            const hasImage = Object.keys(questions[0]).some(k => k.includes('image') || k.includes('img') || k.includes('url'));
            console.log('Has Image Column?', hasImage);
        } else {
            console.log('Table found but is EMPTY.');
        }
    }
}

inspectQuestionsBank();
