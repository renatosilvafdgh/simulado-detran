
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = 'https://uebewihyttehjdzazsku.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlYmV3aWh5dHRlaGpkemF6c2t1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExODI0NzUsImV4cCI6MjA4Njc1ODQ3NX0.6f_NJ8L_7ZydmrnNS8aOmdT5mquOytlc22ugsq-KU0o';

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspectBuckets() {
    let output = '--- START BUCKET INSPECTION ---\n';

    const { data: buckets, error } = await supabase
        .storage
        .listBuckets();

    if (error) {
        output += `ERROR listing buckets: ${JSON.stringify(error, null, 2)}\n`;
    } else {
        output += `Successfully listed ${buckets ? buckets.length : 0} buckets.\n`;
        if (buckets && buckets.length > 0) {
            output += `Buckets: ${JSON.stringify(buckets, null, 2)}\n`;
        } else {
            output += 'No buckets found. (RLS might be blocking listing)\n';
        }
    }

    output += '--- END BUCKET INSPECTION ---\n';

    fs.writeFileSync('bucket_inspection.txt', output);
    console.log('Output written to bucket_inspection.txt');
}

inspectBuckets();
