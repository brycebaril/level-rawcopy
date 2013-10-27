var rawcopy = require("../")

var level = require("level-hyper")

var db1 = level("./sourcedb")

db1.open(function () {
  console.time("hyperLoad")
  rawcopy(db1, "./hypercopy", function () {
      console.log(process.memoryUsage())
      console.timeEnd("hyperLoad")
  })
})