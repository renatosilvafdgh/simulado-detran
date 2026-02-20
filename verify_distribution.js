
import { getQuestionsByCategory } from './src/services/simulado.service';

async function testDistribution(total) {
    console.log(`\n--- Testing distribution for ${total} questions ---`);
    const { data, error } = await getQuestionsByCategory('Test', total);

    if (error) {
        console.error('Error:', error);
        return;
    }

    if (!data) {
        console.error('No data returned');
        return;
    }

    const counts = {
        m1c: 0,
        m1s: 0,
        m2: 0,
        m3: 0,
        m4: 0
    };

    data.forEach(q => {
        const prefix = q.id.split('-')[0];
        counts[prefix]++;
    });

    console.log('Results:', counts);
    const sum = Object.values(counts).reduce((a, b) => a + b, 0);
    console.log('Total:', sum);

    // Check percentages
    const expected = {
        m1c: Math.floor(total * 0.15),
        m1s: Math.floor(total * 0.10)
    };

    console.log(`Expected M1 Com Imagem (15%): ${expected.m1c}, Got: ${counts.m1c}`);
    console.log(`Expected M1 Sem Imagem (10%): ${expected.m1s}, Got: ${counts.m1s}`);

    if (sum !== total) {
        console.error(`FAILURE: Sum ${sum} does not match requested total ${total}`);
    } else {
        console.log('SUCCESS: Total count matches.');
    }
}

// Note: This script requires a running environment with Supabase vars.
// Since I cannot run full Vite/TS environment easily here, this is for manual user verification or basic logic check.
// I will provide the script as a reference.
console.log('Distribution logic check:');
// testDistribution(20);
// testDistribution(10);
