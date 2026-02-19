
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uebewihyttehjdzazsku.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlYmV3aWh5dHRlaGpkemF6c2t1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExODI0NzUsImV4cCI6MjA4Njc1ODQ3NX0.6f_NJ8L_7ZydmrnNS8aOmdT5mquOytlc22ugsq-KU0o';

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspectData() {
  console.log('--- START INSPECTION ---');

  // Test 1: Fetch from 'placas'
  console.log('\nFetching from table: placas');
  const { data: placas, error: tableError } = await supabase
    .from('placas')
    .select('*')
    .limit(5);

  if (tableError) {
    console.error('ERROR fetching table data:', JSON.stringify(tableError, null, 2));
  } else {
    console.log(`Successfully fetched ${placas.length} rows.`);
    if (placas.length > 0) {
      console.log('Sample Row:', JSON.stringify(placas[0], null, 2));
    } else {
      console.log('Table is empty or RLS is hiding rows.');
    }
  }

  // Test 2: List from 'imagem-placas'
  console.log('\nListing files from bucket: imagem-placas');
  const { data: files, error: storageError } = await supabase
    .storage
    .from('imagem-placas')
    .list();

  if (storageError) {
    console.error('ERROR listing storage files:', JSON.stringify(storageError, null, 2));
  } else {
    console.log(`Successfully listed ${files ? files.length : 0} files.`);
    if (files && files.length > 0) {
      console.log('Sample File:', JSON.stringify(files[0], null, 2));
    } else {
      console.log('Bucket is empty or RLS is hiding files.');
    }
  }
  console.log('--- END INSPECTION ---');
}

inspectData();
