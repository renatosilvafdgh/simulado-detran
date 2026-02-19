
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uebewihyttehjdzazsku.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlYmV3aWh5dHRlaGpkemF6c2t1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExODI0NzUsImV4cCI6MjA4Njc1ODQ3NX0.6f_NJ8L_7ZydmrnNS8aOmdT5mquOytlc22ugsq-KU0o';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testBucket() {
    console.log('--- TESTING BUCKET ACCESS: imagem-placas ---');

    const fileName = 'test-access.txt';
    const fileBody = 'Hello Supabase';

    // 1. Try Upload
    console.log('Attempting upload...');
    const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('imagem-placas')
        .upload(fileName, fileBody, { upsert: true });

    if (uploadError) {
        console.error('UPLOAD FAILED:', uploadError);
        return;
    }
    console.log('Upload successful:', uploadData);

    // 2. Try Get Public URL
    const { data: urlData } = supabase
        .storage
        .from('imagem-placas')
        .getPublicUrl(fileName);

    console.log('Public URL:', urlData.publicUrl);

    // 3. Try Fetching the URL
    console.log('Verifying URL access...');
    try {
        const response = await fetch(urlData.publicUrl);
        console.log(`Fetch Status: ${response.status} ${response.statusText}`);
        if (response.ok) {
            const text = await response.text();
            console.log('Content:', text);
        }
    } catch (err) {
        console.error('Fetch error:', err.message);
    }

    // 4. Clean up (Delete)
    console.log('Cleaning up...');
    const { error: deleteError } = await supabase
        .storage
        .from('imagem-placas')
        .remove([fileName]);

    if (deleteError) {
        console.error('Delete failed:', deleteError);
    } else {
        console.log('Delete successful.');
    }
}

testBucket();
