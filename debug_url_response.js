
const url = 'https://uebewihyttehjdzazsku.supabase.co/storage/v1/object/public/imagem-placas/A-1a.png';

async function debugUrl() {
    console.log(`Fetching ${url}...`);
    try {
        const response = await fetch(url);
        console.log(`Status: ${response.status} ${response.statusText}`);
        const text = await response.text();
        console.log('Body:', text);
    } catch (err) {
        console.error('Error:', err.message);
    }
}

debugUrl();
