app = require 'berliner'
coffee = require 'coffee-script'
fs = require 'fs'

app.public = __dirname + '/public' # where to find static files
app.views  = __dirname + '/views'  # where to find view templates
app.session_secret = 'abcde12345'  # key for encrypting sessions

app.get "/", () ->
  @haml "index", locals: {}

app.get "/coffee/:file", (file) ->
  base = file.split(".")[0...-1].join "."
  @headers 'Content-Type': 'text/javascript'
  name = "#{__dirname}/public/#{base}.coffee"
  coffee.compile(fs.readFileSync name, encoding:"ascii")

app.run 4567
