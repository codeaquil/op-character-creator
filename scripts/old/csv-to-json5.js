#!/usr/bin/env node

/**
 * CSV to JSON5 Data Injector
 * 
 * This script parses the One Piece character traits CSV file and injects
 * the values into data.json5 following its existing format.
 */

import fs from 'fs';
import path from 'path';
import { createReadStream } from 'fs';
import { parse } from 'csv-parse';
import { fileURLToPath } from 'url';
import JSON5 from 'json5';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// File paths
const CSV_PATH = path.join(__dirname, '../vendor/data/D&D NPC Randomized Table inspired by One Piece - Sheet1.csv');
const JSON5_PATH = path.join(__dirname, '../data/data.json5');

// Column mapping from CSV headers to trait codes
const COLUMN_MAPPING = {
  'Hair & Facial Features': 'facial_trait',
  'Body / Clothes / Accessory': 'body_trait',
  'Personality / Quirk': 'personality_trait',
  'Voice / Vocal Quirk': 'voice_trait',
  'Weaponry': 'weapon_trait'
};

/**
 * Clean and normalize a trait value
 */
function cleanValue(value) {
  if (!value || typeof value !== 'string') return null;
  
  // Remove surrounding quotes and trim whitespace
  let cleaned = value.trim();
  if ((cleaned.startsWith('"') && cleaned.endsWith('"')) || 
      (cleaned.startsWith("'") && cleaned.endsWith("'"))) {
    cleaned = cleaned.slice(1, -1);
  }
  
  // Remove extra quotes that might be inside
  cleaned = cleaned.replace(/^"+|"+$/g, '').trim();
  
  return cleaned || null;
}

/**
 * Check if a row should be skipped (header, arc divider, or empty)
 */
function shouldSkipRow(row, headers) {
  // Skip if it's the header row
  if (row['Hair & Facial Features'] === 'they have...') return true;
  
  // Skip if it's an arc divider (only has content in first column)
  const nonEmptyColumns = headers.filter(header => {
    const value = cleanValue(row[header]);
    return value && value.length > 0;
  });
  
  if (nonEmptyColumns.length <= 1) return true;
  
  // Skip if all trait columns are empty
  const traitColumns = Object.keys(COLUMN_MAPPING);
  const hasTraitData = traitColumns.some(col => {
    const value = cleanValue(row[col]);
    return value && value.length > 0;
  });
  
  return !hasTraitData;
}

/**
 * Parse CSV and extract trait values
 */
async function parseCsv() {
  return new Promise((resolve, reject) => {
    const results = [];
    const headers = Object.keys(COLUMN_MAPPING);
    
    createReadStream(CSV_PATH)
      .pipe(parse({ 
        columns: true,
        skip_empty_lines: true,
        trim: true
      }))
      .on('data', (row) => {
        if (shouldSkipRow(row, headers)) return;
        
        // Extract trait values from this row
        const traitValues = [];
        
        for (const [csvColumn, traitCode] of Object.entries(COLUMN_MAPPING)) {
          const value = cleanValue(row[csvColumn]);
          if (value) {
            traitValues.push({
              trait_code: traitCode,
              value: value
            });
          }
        }
        
        if (traitValues.length > 0) {
          results.push(...traitValues);
        }
      })
      .on('end', () => {
        console.log(`Parsed ${results.length} trait values from CSV`);
        resolve(results);
      })
      .on('error', reject);
  });
}

/**
 * Read and parse the existing JSON5 file
 */
function readJson5File() {
  try {
    const content = fs.readFileSync(JSON5_PATH, 'utf8');
    return JSON5.parse(content);
  } catch (error) {
    console.error('Error reading data.json5:', error.message);
    process.exit(1);
  }
}

/**
 * Find the highest existing ID in trait_values
 */
function getMaxId(data) {
  if (!data.trait_values || data.trait_values.length === 0) return 0;
  return Math.max(...data.trait_values.map(item => item.id || 0));
}

/**
 * Check if a trait value already exists
 */
function valueExists(data, traitCode, value) {
  return data.trait_values.some(item => 
    item.trait_code === traitCode && 
    item.value.toLowerCase().trim() === value.toLowerCase().trim()
  );
}

/**
 * Generate new trait value entries
 */
function generateNewEntries(existingData, csvData) {
  let currentId = getMaxId(existingData);
  const newEntries = [];
  
  for (const csvEntry of csvData) {
    // Skip if this exact value already exists
    if (valueExists(existingData, csvEntry.trait_code, csvEntry.value)) {
      console.log(`Skipping duplicate: ${csvEntry.trait_code} - "${csvEntry.value}"`);
      continue;
    }
    
    currentId++;
    newEntries.push({
      id: currentId,
      trait_code: csvEntry.trait_code,
      value: csvEntry.value
    });
  }
  
  return newEntries;
}

/**
 * Write the updated data back to JSON5 file
 */
function writeJson5File(data) {
  try {
    // Convert to JSON5 with proper formatting
    const json5Content = JSON5.stringify(data, null, '\t');
    
    // Read the original file to preserve the header comment
    const originalContent = fs.readFileSync(JSON5_PATH, 'utf8');
    const headerMatch = originalContent.match(/^\/\*[\s\S]*?\*\//);
    
    let finalContent = json5Content;
    if (headerMatch) {
      finalContent = headerMatch[0] + '\n' + json5Content;
    }
    
    fs.writeFileSync(JSON5_PATH, finalContent, 'utf8');
    console.log('Successfully updated data.json5');
  } catch (error) {
    console.error('Error writing data.json5:', error.message);
    process.exit(1);
  }
}

/**
 * Main execution function
 */
async function main() {
  try {
    console.log('Starting CSV to JSON5 conversion...');
    
    // Check if files exist
    if (!fs.existsSync(CSV_PATH)) {
      console.error(`CSV file not found: ${CSV_PATH}`);
      process.exit(1);
    }
    
    if (!fs.existsSync(JSON5_PATH)) {
      console.error(`JSON5 file not found: ${JSON5_PATH}`);
      process.exit(1);
    }
    
    // Parse CSV data
    console.log('Parsing CSV file...');
    const csvData = await parseCsv();
    
    // Read existing JSON5 data
    console.log('Reading existing data.json5...');
    const existingData = readJson5File();
    
    // Generate new entries
    console.log('Generating new trait value entries...');
    const newEntries = generateNewEntries(existingData, csvData);
    
    if (newEntries.length === 0) {
      console.log('No new entries to add. All CSV data already exists in data.json5');
      return;
    }
    
    // Add new entries to existing data
    existingData.trait_values.push(...newEntries);
    
    // Write updated data back to file
    console.log(`Adding ${newEntries.length} new trait values...`);
    writeJson5File(existingData);
    
    console.log('\n✅ Conversion completed successfully!');
    console.log(`📊 Added ${newEntries.length} new trait values`);
    console.log(`📁 Total trait values: ${existingData.trait_values.length}`);
    
  } catch (error) {
    console.error('❌ Error during conversion:', error.message);
    process.exit(1);
  }
}

// Run the script
main();

export { main, cleanValue, shouldSkipRow };
