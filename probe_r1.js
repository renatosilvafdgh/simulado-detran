
const code = 'R-1';
const description = 'Pare';
const baseUrl = 'https://uebewihyttehjdzazsku.supabase.co/storage/v1/object/public/imagem-placas';

const variations = [
    `${code}.png`,
    `${code}.jpg`,
    `${code}.jpeg`,
    `${description}.png`,
    `${description}.jpg`,
    `${description.toLowerCase()}.png`,
    `${description.toLowerCase()}.jpg`,
    `Placa ${description}.png`,
    `Sinalizacao ${code}.png`,
    `placa-pare.png`,
    `placa_pare.png`
];

async function probe() {
    console.log(`Probing ${code} (${description}) with ${variations.length} variations...`);

    for (const filename of variations) {
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
