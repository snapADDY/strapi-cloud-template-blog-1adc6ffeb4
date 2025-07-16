#!/usr/bin/env node

const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

console.log('🚀 Setting up your Strapi application...');

// Check if .env already exists
if (fs.existsSync('.env')) {
  console.log('✅ .env file already exists, skipping setup');
  process.exit(0);
}

// Check if .env.example exists
if (!fs.existsSync('.env.example')) {
  console.error('❌ .env.example file not found');
  process.exit(1);
}

// Generate secure random keys
const generateKey = () => crypto.randomBytes(32).toString('base64');

// Read .env.example
const envExample = fs.readFileSync('.env.example', 'utf8');

// Replace placeholder values with secure keys
let envContent = envExample
  .replace('APP_KEYS="toBeModified1,toBeModified2"', `APP_KEYS="${generateKey()},${generateKey()}"`)
  .replace('API_TOKEN_SALT=tobemodified', `API_TOKEN_SALT=${generateKey()}`)
  .replace('ADMIN_JWT_SECRET=tobemodified', `ADMIN_JWT_SECRET=${generateKey()}`)
  .replace('TRANSFER_TOKEN_SALT=tobemodified', `TRANSFER_TOKEN_SALT=${generateKey()}`)
  .replace('JWT_SECRET=tobemodified', `JWT_SECRET=${generateKey()}`);

// Write .env file
fs.writeFileSync('.env', envContent);

console.log('✅ Created .env file with secure keys');
console.log('🎉 Setup complete! You can now run:');
console.log('   npm run develop  # Start development server');
console.log('   npm run build    # Build for production');
console.log('   npm run start    # Start production server');