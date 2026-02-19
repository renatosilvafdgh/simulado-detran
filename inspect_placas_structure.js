
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uebewihyttehjdzazsku.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlYmV3aWh5dHRlaGpkemF6c2t1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExODI0NzUsImV4cCI6MjA4Njc1ODQ3NX0.6f_NJ8L_7ZydmrnNS8aOmdT5mquOytlc22ugsq-KU0o';

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspectPlacas() {
    console.log('--- INSPECTING PLACAS TABLE ---');

    const { data: placas, error } = await supabase
        .from('placas')
        .select('*')
        .limit(1);

    if (error) {
        console.error('Error fetching placas:', error);
    } else {
        if (placas && placas.length > 0) {
            console.log('Sample Row Keys:', Object.keys(placas[0]));
        } else {
            console.log('No rows found.');
        }
    }
}

inspectPlacas();
