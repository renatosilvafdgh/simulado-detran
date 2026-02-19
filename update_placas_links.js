
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uebewihyttehjdzazsku.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlYmV3aWh5dHRlaGpkemF6c2t1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExODI0NzUsImV4cCI6MjA4Njc1ODQ3NX0.6f_NJ8L_7ZydmrnNS8aOmdT5mquOytlc22ugsq-KU0o';

const supabase = createClient(supabaseUrl, supabaseKey);

const BASE_STORAGE_URL = `${supabaseUrl}/storage/v1/object/public/imagem-placas`;

function getFolder(code) {
    if (code.startsWith('A')) return 'Advertencia';
    if (code.startsWith('R')) return 'Regulamentacao';
    return 'Indicacao';
}

async function updateLinks() {
    console.log('--- STARTING IMAGE LINK UPDATE (WITH FOLDERS) ---');

    const { data: placas, error } = await supabase
        .from('placas')
        .select('Código, Link_imagem_placa')
        .is('Link_imagem_placa', null);

    if (error) {
        console.error('Error fetching placas:', error);
        return;
    }

    console.log(`Found ${placas.length} rows to check.`);

    let updatedCount = 0;

    for (const placa of placas) {
        const code = placa['Código'].trim();
        if (!code) continue;

        const folder = getFolder(code);

        // Test multiple variations just in case
        const candidates = [
            `${code}.png`,
            `${code}.jpg`,
            `${code}.jpeg`,
            `${code.toLowerCase()}.png`,
            `${code.toLowerCase()}.jpg`,
            // Handle spaces -> dashes if needed
            `${code.replace(/\s+/g, '-')}.png`,
            `${code.replace(/\s+/g, '-')}.jpg`
        ];

        let foundUrl = null;

        for (const filename of candidates) {
            // Construct URL with folder
            const url = `${BASE_STORAGE_URL}/${folder}/${filename}`;
            // Encode for safety (spaces/chars)
            const encodedUrl = `${BASE_STORAGE_URL}/${folder}/${encodeURIComponent(filename)}`;

            try {
                const response = await fetch(encodedUrl, { method: 'HEAD' });
                if (response.status === 200) {
                    foundUrl = encodedUrl;
                    console.log(`[MATCH] ${code} -> ${folder}/${filename}`);
                    break;
                }
            } catch (err) {
                console.error(`Error checking ${url}:`, err.message);
            }
        }

        if (foundUrl) {
            const { error: updateError } = await supabase
                .from('placas')
                .update({ Link_imagem_placa: foundUrl })
                .eq('Código', code);

            if (updateError) {
                console.error(`Failed to update ${code}:`, updateError.message);
            } else {
                console.log(`[UPDATED] ${code}`);
                updatedCount++;
            }
        } else {
            console.log(`[NO MATCH] Could not find image for ${code} in ${folder}/`);
        }
    }

    console.log(`--- COMPLETED. Updated ${updatedCount} rows. ---`);
}

updateLinks();
