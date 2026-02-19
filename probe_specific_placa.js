
const code = 'A-1a';
const baseUrl = 'https://uebewihyttehjdzazsku.supabase.co/storage/v1/object/public/imagem-placas';

const variations = [
    `${code}.png`,
    `${code}.jpg`,
    `${code}.jpeg`,
    `${code.toLowerCase()}.png`,
    `${code.toLowerCase()}.jpg`,
    `${code.toUpperCase()}.png`,
    `${code.toUpperCase()}.jpg`,
    `${code.replace('-', '')}.png`,         // A1a.png
    `${code.replace('-', '')}.jpg`,
    `${code.replace('-', '_')}.png`,         // A_1a.png
    `${code.replace('-', '_')}.jpg`,
    `Placa ${code}.png`,
    `Placa-${code}.png`,
    `placa_${code.toLowerCase()}.png`,
    `placa_${code.toLowerCase()}.jpg`
];

async function probe() {
    console.log(`Probing ${code} with ${variations.length} variations...`);

    for (const filename of variations) {
        const url = `${baseUrl}/${filename}`;
        // Encoding URI component for spaces
        const encodedUrl = `${baseUrl}/${encodeURIComponent(filename)}`;

        try {
            const response = await fetch(encodedUrl, { method: 'HEAD' });
            console.log(`${response.status} - ${filename}`);
            if (response.ok) {
                console.log(`!!! MATCH FOUND: ${filename}`);
                break;
            }
        } catch (err) {
            console.log(`Error - ${filename}: ${err.message}`);
        }
    }
}

probe();
