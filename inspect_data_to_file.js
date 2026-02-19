
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = 'https://uebewihyttehjdzazsku.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlYmV3aWh5dHRlaGpkemF6c2t1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExODI0NzUsImV4cCI6MjA4Njc1ODQ3NX0.6f_NJ8L_7ZydmrnNS8aOmdT5mquOytlc22ugsq-KU0o';

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyData() {
    let output = '--- FINAL VERIFICATION ---';

    // Check R-14 specifically
    console.log('Checking R-14...');
    const { data: r14, error: r14Error } = await supabase
        .from('placas')
        .select('*')
        .eq('Código', 'R-14')
        .single();

    if (r14Error) {
        output += `\nERROR fetching R-14: ${r14Error.message}`;
    } else {
        output += `\n[R-14]: ${r14['Link_imagem_placa']}`;
    }

    // Check sample of updated rows
    console.log('Checking sample...');
    const { data: sample, error: sampleError } = await supabase
        .from('placas')
        .select('Código, Link_imagem_placa')
        .not('Link_imagem_placa', 'is', null)
        .limit(5);

    if (sampleError) {
        output += `\nERROR fetching sample: ${sampleError.message}`;
    } else {
        output += `\n\nSample of populated rows:`;
        sample.forEach(p => {
            output += `\n[${p['Código']}]: ${p['Link_imagem_placa']}`;
        });
    }

    fs.writeFileSync('verification_output.txt', output);
    console.log('Output written to verification_output.txt');
}

verifyData();
