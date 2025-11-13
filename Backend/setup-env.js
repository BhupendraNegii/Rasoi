import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, '.env.example');

// Check if .env already exists
if (fs.existsSync(envPath)) {
    console.log('✅ .env file already exists');
    process.exit(0);
}

// Create .env file with default values
const envContent = `# Database Configuration
DB_NAME=foodDeliveryApp
DB_USER=root
DB_PASS=
DB_HOST=localhost
DB_DIALECT=mysql

# JWT Secret Key (change this to a secure random string)
# Generate a secure key: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_S=your-secret-jwt-key-change-this-in-production-${Date.now()}

# Stripe API Key (get this from https://dashboard.stripe.com/apikeys)
# For testing, use a test key that starts with sk_test_
STRIPE_KEY=sk_test_your_stripe_test_key_here
`;

try {
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file created successfully!');
    console.log('⚠️  Please update the following values:');
    console.log('   1. DB_PASS - Your MySQL password');
    console.log('   2. JWT_S - A secure random string (use the generated one or create your own)');
    console.log('   3. STRIPE_KEY - Your Stripe API key from https://dashboard.stripe.com/apikeys');
} catch (error) {
    console.error('❌ Error creating .env file:', error.message);
    process.exit(1);
}



