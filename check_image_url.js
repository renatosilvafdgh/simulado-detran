
const urls = [
    'https://uebewihyttehjdzazsku.supabase.co/storage/v1/object/public/imagem-placas/A-1a.png',
    'https://uebewihyttehjdzazsku.supabase.co/storage/v1/object/public/imagem-placas/A-1a.jpg',
    'https://uebewihyttehjdzazsku.supabase.co/storage/v1/object/public/imagem-placas/A-1a.jpeg',
    'https://uebewihyttehjdzazsku.supabase.co/storage/v1/object/public/imagem-placas/a-1a.png',
    'https://uebewihyttehjdzazsku.supabase.co/storage/v1/object/public/imagem-placas/A-1A.png'
];

async function checkUrls() {
    console.log('--- START URL CHECK ---');
    for (const url of urls) {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            console.log(`${url}: ${response.status} ${response.statusText}`);
        } catch (error) {
            console.log(`${url}: Error - ${error.message}`);
        }
    }
    console.log('--- END URL CHECK ---');
}

checkUrls();
