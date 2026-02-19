
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uebewihyttehjdzazsku.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlYmV3aWh5dHRlaGpkemF6c2t1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExODI0NzUsImV4cCI6MjA4Njc1ODQ3NX0.6f_NJ8L_7ZydmrnNS8aOmdT5mquOytlc22ugsq-KU0o';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createCategory() {
    console.log('--- CREATING PLACAS CATEGORY ---');

    const { data, error } = await supabase
        .from('categories')
        .insert([
            { name: 'Placas', description: 'Simulado de Placas e Sinalização', icon: '🛑' }
        ])
        .select();

    if (error) {
        if (error.code === '23505') { // Unique violation
            console.log('Category "Placas" already exists (or conflict).');
        } else {
            console.error('Error creating category:', error.message);
        }
    } else {
        console.log('Category created:', data);
    }
}

createCategory();
