import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uebewihyttehjdzazsku.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlYmV3aWh5dHRlaGpkemF6c2t1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExODI0NzUsImV4cCI6MjA4Njc1ODQ3NX0.6f_NJ8L_7ZydmrnNS8aOmdT5mquOytlc22ugsq-KU0o';

const supabase = createClient(supabaseUrl, supabaseKey);

const categoriesToInsert = [
    { name: 'A', description: 'Veículos de duas ou três rodas', icon: 'Bike' },
    { name: 'B', description: 'Carros de passeio', icon: 'Car' },
    { name: 'C', description: 'Veículos de carga', icon: 'Truck' },
    { name: 'D', description: 'Ônibus e vans', icon: 'Bus' },
    { name: 'E', description: 'Veículos com unidades acopladas', icon: 'Container' }
];

async function insertCategories() {
    console.log('--- INSERTING CATEGORIES A, B, C, D, E ---');

    // First check what exists to avoid duplicates or use upsert
    for (const cat of categoriesToInsert) {
        const { data, error } = await supabase
            .from('categories')
            .upsert(cat, { onConflict: 'name' }) // Assuming 'name' matches a unique constraint or we just check
            .select();

        if (error) {
            console.error(`Error inserting ${cat.name}:`, error.message);
        } else {
            console.log(`Upserted ${cat.name}:`, data);
        }
    }
}

insertCategories();
