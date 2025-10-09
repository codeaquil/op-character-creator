#!/usr/bin/env ruby
# compile_data.rb
#
# USAGE: scripts/compile_data.rb
#   Will read data/data.csv and convert it into the proper out/data.json

require 'csv'
require 'json'

# hard code traits
TRAITS = [
	{
		id: 1,
		code: 'facial_trait',
		title: 'Hair & Facial Features',
		sentence: 'They have %XXX%.',
	},
	{
		id: 2,
		code: 'body_trait',
		title: 'Body, Clothes, or Accessories',
		sentence: 'They don %XXX%.',
	},
	{
		id: 3,
		code: 'personality_trait',
		title: 'Personality Quirk',
		sentence: 'They are %XXX%.',
	},
	{
		id: 4,
		code: 'voice_trait',
		title: 'Voice or Vocal Quirk',
		sentence: 'Their voice is %XXX%.',
	},
	{
		id: 5,
		code: 'weapon_trait',
		title: 'Weaponry',
		sentence: 'They attack using %XXX%.',
  }
]

def blank?(str)
  str.nil? || str.strip.length == 0
end

def codes
  TRAITS.map { |h| h[:code] }
end

class TraitValue
  @@repository = []
  @@id_counter = 1

  attr_reader :id, :trait_code, :value

  def initialize(trait_code, value)
    raise StandardError, "Value is blank" if blank? value
    raise StandardError, "Code #{trait_code} not found" if !codes.include? trait_code

    @id = @@id_counter
    @@id_counter += 1

    @trait_code = trait_code
    @value = value
  end

  def self.create(trait_code, value)
    @@repository << TraitValue.new(trait_code, value)
    @@repository.last
  end

  def self.repository
    @@repository
  end

  # for debugging
  def to_s
    "#<TraitValue #{trait_code.ljust(17)}:#{value}>"
  end

  def to_h
    { id: @id, trait_code: @trait_code, value: @value }
  end
end

data_path = File.expand_path("../data/data.csv", __dir__)
puts "Parsing data file: #{data_path}"

raw_data = File.read(data_path)
matrix_data = CSV.parse(raw_data, skip_blanks: true)
matrix_data.each_with_index do |row, i|
  next if i < 2
  
  TRAITS.each do |hash|
    idx = hash[:id]
    trait_code = hash[:code]
    maybe_value = row[idx]    
    
    if !blank? maybe_value
      TraitValue.create(trait_code, maybe_value)
    end
  end
end

out_data = {
  "meta" => { "data_schema_version": "0.0.1" },
  "traits" => TRAITS,
  "trait_values" => TraitValue.repository.map(&:to_h) 
}
out_path = File.expand_path("../out/data.json", __dir__)
File.write(out_path, JSON.generate(out_data))
