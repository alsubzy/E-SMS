const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '../.env');
console.log('Checking .env at:', envPath);

if (fs.existsSync(envPath)) {
    console.log('.env file exists.');
    const content = fs.readFileSync(envPath, 'utf8');
    if (content.includes('DATABASE_URL=')) {
        console.log('DATABASE_URL is found in .env.');
    } else {
        console.log('DATABASE_URL is NOT found in .env.');
    }
} else {
    console.log('.env file does NOT exist.');
}
