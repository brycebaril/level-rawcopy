// npm install level-hyper through2 multibuffer binary-split

var level = require("level-hyper")
var through2 = require("through2")
var bufstream = require("level-bufferstreams")
var multibuffer = require("multibuffer")
var split = require("binary-split")
var fs = require("fs")

var input = process.argv[2]
if (!input) throw new Error("Please provide a file to copy line-wise into a level instance")

var idSource = Date.now()

var db = level("./sourcedb")
var ws = bufstream.rawWriter(db)

var toRecord = function (chunk, encoding, callback) {
  var id = Buffer((idSource--).toString())
  this.push(multibuffer.pack([id, chunk]))
  return callback()
}

fs.createReadStream(input)
  .pipe(split())
  .pipe(through2(toRecord))
  .pipe(ws)