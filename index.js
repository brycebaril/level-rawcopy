module.exports = rawcopy

var bufferstreams = require("level-bufferstreams")
var levelup = require("levelup")

function rawcopy(sourceDB, target, options, callback) {
  if (typeof options == "function") {
    callback = options
    options = {}
  }
  if (options == null && callback == null) {
    options = {}
    callback = function () {}
  }

  if (sourceDB.db.liveBackup && typeof target == "string") {
    // TODO this doesn't yet seem to work!!!
    return sourceDB.db.liveBackup(target, callback)
  }

  if (typeof target == "string") {
    target = levelup(target, options)
  }

  bufferstreams.rawReader(sourceDB, options)
    .pipe(bufferstreams.rawWriter(target, options))
    .on("finish", callback)
}