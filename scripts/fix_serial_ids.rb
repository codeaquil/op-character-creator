#!/usr/bin/env ruby

# Fix Serial IDs Script
# This script reads data.json5 and makes all trait_values IDs sequential starting from 1

require 'fileutils'

# File paths
JSON5_PATH = File.join(__dir__, '../data/data.json5')

def fix_serial_ids
  puts "Reading data.json5..."
  
  # Read the file
  content = File.read(JSON5_PATH)
  
  puts "Extracting and fixing IDs..."
  
  # Find all trait_values entries and extract their IDs
  trait_values_section = content.match(/trait_values:\s*\[(.*?)\]/m)
  
  if trait_values_section.nil?
    puts "Error: Could not find trait_values section"
    exit 1
  end
  
  # Extract the trait_values content
  trait_values_content = trait_values_section[1]
  
  # Find all id entries and replace them with sequential numbers
  current_id = 1
  
  # Use gsub to replace all id values with sequential numbers
  new_trait_values_content = trait_values_content.gsub(/id:\s*\d+/) do |match|
    result = "id: #{current_id}"
    current_id += 1
    result
  end
  
  # Replace the trait_values section in the original content
  new_content = content.sub(
    /trait_values:\s*\[(.*?)\]/m,
    "trait_values: [#{new_trait_values_content}]"
  )
  
  puts "Writing updated data.json5..."
  
  # Write the updated content back to the file
  File.write(JSON5_PATH, new_content)
  
  total_entries = current_id - 1
  puts "✅ Successfully updated #{total_entries} trait value IDs"
  puts "🔢 IDs are now sequential from 1 to #{total_entries}"
end

# Run the script
if __FILE__ == $0
  fix_serial_ids
end
