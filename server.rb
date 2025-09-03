require "bundler/setup"
require 'webrick'

root = File.expand_path 'out'
server = WEBrick::HTTPServer.new :Port => 3000, :DocumentRoot => root

server.mount_proc '/op-character-creator/data.json' do |req, res|
  res.body = File.readlines(File.join(root, 'data.json'))
  res.status = 200
end

trap 'INT' do server.shutdown end

server.start
