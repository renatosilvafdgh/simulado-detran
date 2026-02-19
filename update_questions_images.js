
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uebewihyttehjdzazsku.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlYmV3aWh5dHRlaGpkemF6c2t1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExODI0NzUsImV4cCI6MjA4Njc1ODQ3NX0.6f_NJ8L_7ZydmrnNS8aOmdT5mquOytlc22ugsq-KU0o';

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateQuestionsImages() {
    console.log('--- STARTING QUESTIONS IMAGE UPDATE (WITH FALLBACK) ---');

    // 1. Fetch Placas Mapping (Code -> URL)
    console.log('Fetching placas...');
    const { data: placas, error: placasError } = await supabase
        .from('placas')
        .select('Código, Link_imagem_placa')
        .not('Link_imagem_placa', 'is', null);

    if (placasError) {
        console.error('Error fetching placas:', placasError);
        return;
    }

    const placasMap = new Map();
    placas.forEach(p => {
        placasMap.set(p['Código'].trim(), p['Link_imagem_placa']);
    });

    console.log(`Loaded ${placasMap.size} placas with images.`);

    // 2. Fetch Questions (1-158)
    console.log('Fetching questions (1-158)...');
    const { data: questions, error: questionsError } = await supabase
        .from('questions_placas_cores_e_caminhos')
        .select('id, alternative_1, alternative_2, alternative_3, alternative_4')
        .lte('id', 158)
        .order('id');

    if (questionsError) {
        console.error('Error fetching questions:', questionsError);
        return;
    }

    console.log(`Found ${questions.length} questions to process.`);

    let updatedCount = 0;
    const alternatives = ['alternative_1', 'alternative_2', 'alternative_3', 'alternative_4'];
    let noMatchCount = 0;

    for (const q of questions) {
        let hasUpdates = false;
        const updates = {};

        for (const altKey of alternatives) {
            const originalText = q[altKey];
            if (!originalText || typeof originalText !== 'string') continue;

            if (originalText.startsWith('http')) continue;

            const match = originalText.match(/^([A-Z0-9-a-z]+)(\s+-\s+|$)/);

            if (match) {
                const code = match[1].trim();
                let imageUrl = placasMap.get(code) || placasMap.get(code.toUpperCase());

                // Fallback: Try appending 'a' (e.g., A-28 -> A-28a)
                if (!imageUrl) {
                    imageUrl = placasMap.get(code + 'a') || placasMap.get(code.toUpperCase() + 'a');
                }

                if (imageUrl) {
                    updates[altKey] = imageUrl;
                    hasUpdates = true;
                } else {
                    // Only log first few failures to avoid spam
                    if (noMatchCount < 5) {
                        console.warn(`[MISSING PLACA] Q${q.id} ${altKey}: Code "${code}" (Tried "${code}a" too)`);
                    }
                    noMatchCount++;
                }
            }
        }

        if (hasUpdates) {
            const { error: updateError } = await supabase
                .from('questions_placas_cores_e_caminhos')
                .update(updates)
                .eq('id', q.id);

            if (updateError) {
                console.error(`Error updating Q${q.id}:`, updateError.message);
            } else {
                updatedCount++;
                if (updatedCount % 20 === 0) process.stdout.write('.');
            }
        }
    }

    console.log(`\n--- COMPLETED. Updated ${updatedCount} questions. ---`);
    console.log(`Total missing matches: ${noMatchCount}`);
}

updateQuestionsImages();
