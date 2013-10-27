var level = require("level-hyper")

var source = level("./sourcedb")
var target = level("./slowcopy")

console.time("slowLoad")
source.readStream().pipe(target.writeStream())
  .on("close", function () {
    console.log(process.memoryUsage())
    console.timeEnd("slowLoad")
  })