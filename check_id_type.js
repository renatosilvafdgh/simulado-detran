import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uebewihyttehjdzazsku.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlYmV3aWh5dHRlaGpkemF6c2t1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExODI0NzUsImV4cCI6MjA4Njc1ODQ3NX0.6f_NJ8L_7ZydmrnNS8aOmdT5mquOytlc22ugsq-KU0o';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkIdType() {
    console.log('--- CHECKING ID TYPE ---');

    const { data: questions, error } = await supabase
        .from('questions_bank')
        .select('id')
        .limit(1);

    if (error) {
        console.error('Error:', error);
    } else {
        if (questions && questions.length > 0) {
            const idValue = questions[0].id;
            console.log('Sample ID:', idValue);
            console.log('Type of ID:', typeof idValue);
            if (typeof idValue === 'number') {
                console.log('WARNING: ID is a number. potential collision.');
            } else if (typeof idValue === 'string' && !isNaN(Number(idValue))) {
                console.log('WARNING: ID is a stringified number. potential collision.');
            } else {
                console.log('ID seems to be UUID or non-numeric string. Safe.');
            }
        } else {
            console.log('Questions bank is empty. Defaulting to safe prefix strategy anyway.');
        }
    }
}

checkIdType();
