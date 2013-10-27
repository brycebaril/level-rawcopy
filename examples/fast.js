var rawcopy = require("../")

var level = require("level-hyper")

var db1 = level("./sourcedb")
var db2 = level("./fastcopy")

// this db1.open shouldn't be needed, but level-hyper is acting up...
db1.open(function () {
  console.time("fastLoad")
  rawcopy(db1, db2, function () {
      console.log(process.memoryUsage())
      console.timeEnd("fastLoad")
  })
})